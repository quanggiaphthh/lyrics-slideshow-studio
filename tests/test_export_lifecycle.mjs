import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--window-size=1280,720',
  '--autoplay-policy=no-user-gesture-required',
  'http://localhost:5000'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const tabsRes = await fetch('http://localhost:9229/json');
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

  console.log('--- TEST E01: Cancel Semantics (Must NOT download file or fire complete) ---');
  const cancelTestRes = await send('Runtime.evaluate', {
    returnByValue: true,
    awaitPromise: true,
    expression: `(async () => {
      window.__testDownloadTriggered = false;
      window.__testOnCompleteFired = false;

      // Mock download anchor click to catch any stray downloads
      const origCreateElement = document.createElement.bind(document);
      document.createElement = function(tag) {
        const el = origCreateElement(tag);
        if (tag.toLowerCase() === 'a') {
          el.click = function() {
            window.__testDownloadTriggered = true;
          };
        }
        return el;
      };

      window.exporter.onComplete = () => { window.__testOnCompleteFired = true; };

      window.startVideoExport();
      await new Promise(r => setTimeout(r, 1500)); // record for 1.5s

      // Trigger cancel
      document.getElementById('btnCancelExport').click();
      await new Promise(r => setTimeout(r, 500));

      return {
        state: window.exporter.exportState,
        chunksCount: window.exporter.recordedChunks.length,
        downloadTriggered: window.__testDownloadTriggered,
        completeFired: window.__testOnCompleteFired
      };
    })()`
  });
  console.log('E01 Cancel Test Result:', cancelTestRes.result?.value);
  const e1 = cancelTestRes.result?.value;
  if (e1.state !== 'cancelled' || e1.downloadTriggered || e1.completeFired || e1.chunksCount !== 0) {
    console.error('FAIL E01: Cancel leaked a download or failed to transition state cleanly!');
    process.exit(1);
  }
  console.log('PASS E01: Cancel semantics verified. Zero downloads, clean state reset.');

  console.log('\n--- TEST E02: Partial Save ("Lưu & Tải Đoạn Này") ---');
  const partialTestRes = await send('Runtime.evaluate', {
    returnByValue: true,
    awaitPromise: true,
    expression: `(async () => {
      window.__testBlobData = null;
      window.__testFilename = null;
      window.__testDownloadTriggered = false;

      window.startVideoExport();
      const origOnComplete = window.exporter.onComplete;
      window.exporter.onComplete = (blob, filename) => {
        window.__testBlobData = { size: blob.size, type: blob.type };
        window.__testFilename = filename;
        if (typeof origOnComplete === 'function') origOnComplete(blob, filename);
      };

      await new Promise(r => setTimeout(r, 2500)); // record for 2.5s

      // Click save partial
      document.getElementById('btnFinishEarlyExport').click();
      await new Promise(r => setTimeout(r, 1000));

      return {
        state: window.exporter.exportState,
        blob: window.__testBlobData,
        filename: window.__testFilename,
        downloadTriggered: window.__testDownloadTriggered
      };
    })()`
  });
  console.log('E02 Partial Save Result:', partialTestRes.result?.value);
  const e2 = partialTestRes.result?.value;
  if (e2.state !== 'completed' || !e2.blob || e2.blob.size <= 0) {
    console.error('FAIL E02: Partial save failed to produce valid non-empty video blob!');
    process.exit(1);
  }
  console.log(`PASS E02: Partial save created valid file (${(e2.blob.size / 1024).toFixed(1)} KB, filename: ${e2.filename})`);

  console.log('\n--- TEST E03: Failure Handling & Retry Idempotency ---');
  const failureTestRes = await send('Runtime.evaluate', {
    returnByValue: true,
    awaitPromise: true,
    expression: `(async () => {
      let errorReported = false;

      // Temporarily mock audio.play to reject
      const origPlay = window.coreAudio.play.bind(window.coreAudio);
      window.coreAudio.play = async () => { throw new Error('Simulated Audio Playback Error'); };

      window.startVideoExport();
      const origOnError = window.exporter.onError;
      window.exporter.onError = (err) => {
        errorReported = true;
        if (typeof origOnError === 'function') origOnError(err);
      };

      await new Promise(r => setTimeout(r, 600));

      const failedState = window.exporter.exportState;
      const isRecAfterFail = window.exporter.isRecording;

      // Restore play
      window.coreAudio.play = origPlay;

      // Verify immediate retry works cleanly
      window.startVideoExport();
      await new Promise(r => setTimeout(r, 1000));
      const retryState = window.exporter.exportState;

      // Clean up
      window.exporter.cancelExport();

      return {
        errorReported,
        failedState,
        isRecAfterFail,
        retryState
      };
    })()`
  });
  console.log('E03 Failure Handling Result:', failureTestRes.result?.value);
  const e3 = failureTestRes.result?.value;
  if (!e3.errorReported || e3.isRecAfterFail || e3.retryState !== 'recording') {
    console.error('FAIL E03: Failure handling or retry idempotency failed!');
    process.exit(1);
  }
  console.log('PASS E03: Failure handling cleanly reset state and allowed immediate retry.');

  ws.close();
  console.log('\nALL GATE G2 EXPORT LIFECYCLE TESTS PASS! (E01, E02, E03 VERIFIED)');
  process.exit(0);
} finally {
  chrome.kill();
}
