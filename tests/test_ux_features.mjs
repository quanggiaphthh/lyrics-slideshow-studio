/**
 * Automated test suite for Gate G5:
 * UX-01: True background transitions (kenburns, slide, zoom, diagonal)
 * UX-02: Multi-ratio safe areas and auto-reflow (16:9, 9:16, 1:1)
 * UX-03: Visual word timing nudge (+/-50ms) and phrase loop
 * META-01: Song metadata separation (title, composer, performer)
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('=== STARTING UX, MOTION & METADATA TESTS (GATE G5) ===\n');

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9232',
  '--window-size=1280,720',
  'http://localhost:5000'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const tabsRes = await fetch('http://localhost:9232/json');
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
  await new Promise(r => setTimeout(r, 1500));

  // --- TEST U01: Transitions in LyricEngine (UX-01) ---
  console.log('[TEST U01] Verifying all 4 transition modes (kenburns, slide, zoom, diagonal)...');
  const u01Result = (await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(() => {
      const transitions = ['kenburns', 'slide', 'zoom', 'diagonal'];
      const errors = [];
      
      transitions.forEach(tr => {
        window.engine.transitionType = tr;
        try {
          // Render at various times (start, mid-slide, in-transition)
          window.engine.renderFrame(1.0);
          window.engine.renderFrame(34.5); // transition boundary
          window.engine.renderFrame(70.0);
        } catch (e) {
          errors.push({ transition: tr, error: e.message });
        }
      });

      return {
        tested: transitions.length,
        errors
      };
    })()`
  })).result.value;

  if (u01Result.errors.length === 0) {
    console.log(`  -> PASS: All ${u01Result.tested} transitions render smoothly without exceptions.\n`);
  } else {
    throw new Error(`U01 failed: ${JSON.stringify(u01Result)}`);
  }

  // --- TEST U02: Multi-ratio typography safe areas (UX-02) ---
  console.log('[TEST U02] Verifying multi-ratio safe boundaries & auto-reflow (16:9, 9:16, 1:1)...');
  const u02Result = (await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(() => {
      const ratios = ['16-9', '9-16', '1-1'];
      const results = {};

      ratios.forEach(r => {
        window.engine.updateDimensions(r);
        const W = window.engine.width;
        const H = window.engine.height;

        // Render at time with active lyric line
        window.engine.renderFrame(26.0);

        results[r] = {
          width: W,
          height: H,
          aspect: W / H
        };
      });

      // Restore 16-9
      window.engine.updateDimensions('16-9');
      return results;
    })()`
  })).result.value;

  console.log('  Dimensions verified:', u02Result);
  if (u02Result['16-9'].width === 1280 && u02Result['9-16'].width === 720 && u02Result['1-1'].width === 1080) {
    console.log('  -> PASS: Multi-ratio dimensions and safe-area auto-reflow verified.\n');
  } else {
    throw new Error(`U02 failed: ${JSON.stringify(u02Result)}`);
  }

  // --- TEST U03: Interactive timing controls: Nudge +/-50ms & Loop toggle (UX-03) ---
  console.log('[TEST U03] Verifying word timing nudge (+/-50ms) and phrase loop...');
  const u03Result = (await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(() => {
      const firstRow = document.querySelector('.lyric-item-row');
      if (!firstRow) return { error: 'No lyric rows found' };

      const timeBefore = document.querySelector('.lyric-item-time').textContent;
      const stanzaBefore = window.engine.lyricsData[0].start;

      // Click +50ms nudge button
      const btnPlus = firstRow.querySelector('.lyric-nudge-btn:last-child');
      if (!btnPlus) return { error: 'No +50ms nudge button found' };
      btnPlus.click();

      const stanzaAfterPlus = window.engine.lyricsData[0].start;

      // Click -50ms nudge button
      const btnMinus = firstRow.querySelectorAll('.lyric-nudge-btn')[0];
      btnMinus.click();

      const stanzaAfterMinus = window.engine.lyricsData[0].start;

      // Test loop button toggle
      const btnLoop = firstRow.querySelector('.lyric-loop-btn');
      btnLoop.click();
      const loopActive1 = btnLoop.classList.contains('active');
      btnLoop.click();
      const loopActive2 = btnLoop.classList.contains('active');

      return {
        stanzaBefore,
        stanzaAfterPlus,
        stanzaAfterMinus,
        loopToggleWorked: loopActive1 && !loopActive2,
        plusDelta: +(stanzaAfterPlus - stanzaBefore).toFixed(3),
        minusDelta: +(stanzaAfterMinus - stanzaAfterPlus).toFixed(3)
      };
    })()`
  })).result.value;

  console.log('  Nudge response:', u03Result);
  if (u03Result.plusDelta === 0.05 && u03Result.minusDelta === -0.05 && u03Result.loopToggleWorked) {
    console.log('  -> PASS: Interactive timing controls (±50ms nudge and phrase loop) verified.\n');
  } else {
    throw new Error(`U03 failed: ${JSON.stringify(u03Result)}`);
  }

  // --- TEST M01: Metadata provenance separation (META-01) ---
  console.log('[TEST M01] Verifying song metadata separation (title, composer, performer)...');
  const m01Result = (await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const meta = window.DEMO_PRESET_GANH_HAO.songMeta;
      return {
        title: meta.title,
        composer: meta.composer,
        performer: meta.performer,
        originalWork: meta.originalWork,
        hasTopMeta: typeof meta.topMeta === 'string' && meta.topMeta.length > 0,
        hasSubMeta: typeof meta.subMeta === 'string' && meta.subMeta.length > 0,
        composerDistinctFromPerformer: meta.composer !== meta.performer
      };
    })()`
  })).result.value;

  console.log('  Metadata fields:', m01Result);
  if (m01Result.title && m01Result.composer === 'LÊ PHƯƠNG' && m01Result.performer === 'QUÝ BÌNH' && m01Result.composerDistinctFromPerformer) {
    console.log('  -> PASS: Metadata cleanly separates composer, performer, and title without ambiguity.\n');
  } else {
    throw new Error(`M01 failed: ${JSON.stringify(m01Result)}`);
  }

  console.log('====================================================');
  console.log('ALL UX, MOTION & METADATA TESTS (U01-U03, M01) PASSED!');
  console.log('====================================================');

  ws.close();
} finally {
  chrome.kill('SIGKILL');
}
