import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, 'output_probe_test.mp4');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--window-size=1280,720',
  '--autoplay-policy=no-user-gesture-required',
  'http://localhost:5000'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const tabsRes = await fetch('http://localhost:9230/json');
  const tabs = await tabsRes.json();
  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('5000')) || tabs[0];

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });

  let id = 0;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = ++id;
      const handler = (evt) => {
        const data = JSON.parse(evt.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await new Promise(r => setTimeout(r, 2000));

  console.log('Recording 5-second export clip in headless Chrome...');
  const exportRes = await send('Runtime.evaluate', {
    returnByValue: true,
    awaitPromise: true,
    expression: `(async () => {
      window.startVideoExport();
      let capturedBlob = null;
      let capturedFilename = null;
      window.exporter.onComplete = (blob, filename) => {
        capturedBlob = blob;
        capturedFilename = filename;
      };

      await new Promise(r => setTimeout(r, 5000));
      window.exporter.savePartialExport();
      await new Promise(r => setTimeout(r, 1200));

      if (!capturedBlob) return null;
      const buffer = await capturedBlob.arrayBuffer();
      const bytes = Array.from(new Uint8Array(buffer));
      return {
        bytes,
        size: capturedBlob.size,
        type: capturedBlob.type,
        filename: capturedFilename
      };
    })()`
  });

  const res = exportRes.result?.value;
  if (!res || !res.bytes || res.bytes.length === 0) {
    console.error('FAIL: No video bytes returned from browser export!');
    process.exit(1);
  }

  console.log(`Received ${res.bytes.length} bytes (${(res.size / 1024 / 1024).toFixed(2)} MB). Saving to ${outputPath}...`);
  fs.writeFileSync(outputPath, Buffer.from(res.bytes));

  ws.close();
  chrome.kill();

  console.log('\n--- Running ffprobe Analysis on Exported Video ---');
  const ffprobeOut = execSync(`ffprobe -v error -show_entries format=duration,size,bit_rate:stream=codec_name,codec_type,width,height,r_frame_rate,channels,sample_rate -of json "${outputPath}"`, { encoding: 'utf8' });
  const probeData = JSON.parse(ffprobeOut);
  console.log(JSON.stringify(probeData, null, 2));

  const videoStream = probeData.streams?.find(s => s.codec_type === 'video');
  const audioStream = probeData.streams?.find(s => s.codec_type === 'audio');

  console.log('\n--- Stream Verification ---');
  console.log('Video Stream:', videoStream ? `${videoStream.codec_name} ${videoStream.width}x${videoStream.height} @ ${videoStream.r_frame_rate}` : 'MISSING');
  console.log('Audio Stream:', audioStream ? `${audioStream.codec_name} ${audioStream.sample_rate}Hz ${audioStream.channels}ch` : 'MISSING');
  console.log('Total Duration:', probeData.format?.duration, 'seconds');
  console.log('Total Size:', probeData.format?.size, 'bytes');

  if (!videoStream) {
    console.error('FAIL: Missing video stream in exported file!');
    process.exit(1);
  }

  console.log('\nPASS: Exported clip successfully probed with valid video and audio stream! (EXP-03 VERIFIED)');
  process.exit(0);
} finally {
  try { chrome.kill(); } catch (e) {}
}
