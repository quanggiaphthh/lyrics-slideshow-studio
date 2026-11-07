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

  await new Promise(r => setTimeout(r, 2000));

  // Inspect state
  const stateRes = await send('Runtime.evaluate', {
    expression: `(() => {
      try {
        if (typeof selectPresetGanhHao === 'function') selectPresetGanhHao();
        const proj = window.getCurrentProjectState ? window.getCurrentProjectState() : {};
        const preset = window.DEMO_PRESET_GANH_HAO;
        const lyrics = (window.engine && window.engine.lyricsData && window.engine.lyricsData.length) ? window.engine.lyricsData : (preset ? preset.wordsData : []);
        const gh8 = lyrics ? lyrics.find(l => l.id === 'gh_8') : null;
        return JSON.stringify({
          audioDuration: proj.audioDuration || preset?.audioDuration,
          lyricsCount: lyrics ? lyrics.length : 0,
          gh8_text: gh8 ? gh8.text : null,
          gh8_lines: gh8 ? gh8.lines.map(l => l.text) : null,
          lastStanzaId: lyrics && lyrics.length ? lyrics[lyrics.length - 1].id : null,
          lastStanzaText: lyrics && lyrics.length ? lyrics[lyrics.length - 1].text : null
        });
      } catch (e) {
        return JSON.stringify({ error: e.message });
      }
    })()`
  });
  console.log('Evaluate result:', JSON.parse(stateRes.result.value));

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

  // 1. 00:19s Intro ("SỔ LỒNG")
  await snap(19.0, 'screenshot_intro_19s.png');

  // 2. 02:05s Verse 1 ("vẫn thầm gọi tên EM")
  await snap(125.5, 'screenshot_gh8_van_tham_125s.png');

  // 3. 02:24s Chorus 1 ("À ƠI... em nỡ sao em")
  await snap(144.0, 'screenshot_chorus1_144s.png');

  // 4. 04:49s Climax ("LÀM SAO CHIA CÁCH")
  await snap(289.0, 'screenshot_climax_289s.png');

  // 5. 05:22s Outro ("BÊN NÀY... VẪN HOÀI...")
  await snap(322.0, 'screenshot_outro_322s.png');

  // 6. 05:35s Instrumental Outro Solo (Should have NO TEXT!)
  await snap(335.0, 'screenshot_outro_solo_335s.png');

  ws.close();
} finally {
  chrome.kill();
  console.log('Chrome process closed.');
}
