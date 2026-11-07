import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1280,720',
  'http://localhost:5000'
]);

await new Promise(r => setTimeout(r, 2500));

try {
  const tabsRes = await fetch('http://localhost:9222/json');
  const tabs = await tabsRes.json();
  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('5000')) || tabs[0];
  console.log('Connected to tab:', pageTab.title, pageTab.url);

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

  // Let preset load
  await new Promise(r => setTimeout(r, 2000));

  // Inspect state
  const stateRes = await send('Runtime.evaluate', {
    expression: `(() => {
      try {
        const proj = window.getCurrentProjectState ? window.getCurrentProjectState() : {};
        const lyrics = window.engine ? window.engine.lyricsData : [];
        return JSON.stringify({
          audioDuration: proj.audioDuration,
          lyricsCount: lyrics ? lyrics.length : 0,
          firstLyric: lyrics && lyrics[0] ? { id: lyrics[0].id, start: lyrics[0].start, end: lyrics[0].end, text: lyrics[0].text } : null,
          climaxLyric: lyrics && lyrics[18] ? { id: lyrics[18].id, start: lyrics[18].start, end: lyrics[18].end, text: lyrics[18].text } : null,
          outroLyric: lyrics && lyrics[23] ? { id: lyrics[23].id, start: lyrics[23].start, end: lyrics[23].end, text: lyrics[23].text } : null
        });
      } catch (e) {
        return JSON.stringify({ error: e.message });
      }
    })()`
  });
  console.log('Evaluate result:', stateRes.result.value);

  async function snap(sec, filename) {
    await send('Runtime.evaluate', {
      expression: `
        seekAudio(${sec});
        if (typeof renderCurrentFrame === 'function') renderCurrentFrame();
        else if (window.renderFinnxiii) window.renderFinnxiii(stageCtx, ${sec}, 1280, 720);
      `
    });
    await new Promise(r => setTimeout(r, 500));
    const snapRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(snapRes.data, 'base64'));
    console.log(`Saved screenshot at ${sec}s to ${filename}`);
  }

  // 1. 00:04s Intro ("HÒ ƠI...")
  await snap(4.0, 'test_intro_4s.png');

  // 2. 00:19s Intro ("SỔ LỒNG")
  await snap(19.0, 'test_intro_19s.png');

  // 3. 01:22s Verse 1 ("ĐAU LÒNG")
  await snap(83.0, 'test_verse1_83s.png');

  // 4. 02:25s Chorus 1 ("À ƠI... EM NỠ SAO EM")
  await snap(144.0, 'test_chorus1_144s.png');

  // 5. 04:46.5s Climax ("DÒNG NHỚ TRONG TIM")
  await snap(286.5, 'test_climax_286s.png');

  // 6. 05:22s Outro ("BÊN NÀY... VẪN HOÀI...")
  await snap(322.0, 'test_outro_322s.png');

  ws.close();
} finally {
  chrome.kill();
  console.log('Chrome process closed.');
}
