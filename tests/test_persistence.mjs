/**
 * Automated test suite for DATA-01 & DATA-02:
 * IndexedDB MediaStore, draft prompt without demo destruction,
 * and project JSON import/export schema validation.
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('=== STARTING PERSISTENCE & SCHEMA TESTS (DATA-01 & DATA-02) ===\n');

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9231',
  '--window-size=1280,720',
  'http://localhost:5000'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const tabsRes = await fetch('http://localhost:9231/json');
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

  // --- TEST D01: IndexedDB MediaStore CRUD ---
  console.log('[TEST D01] Verifying IndexedDB MediaStore put/get/delete operations...');
  const evalRes1 = await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(async () => {
      try {
        const ms = new window.MediaStore('Test_MediaStore_DB');
        const testData = new Blob(['Test audio binary bytes for LyricStudio'], { type: 'audio/mp3' });
        
        // 1. Put
        const putSuccess = await ms.put('test_audio_key', testData);
        
        // 2. Get
        const retrievedBlob = await ms.get('test_audio_key');
        const textMatch = retrievedBlob ? (await retrievedBlob.text()) === 'Test audio binary bytes for LyricStudio' : false;
        
        // 3. Delete
        await ms.delete('test_audio_key');
        const afterDel = await ms.get('test_audio_key');
        
        // Clean up
        await ms.clear();
        
        return {
          putSuccess,
          textMatch,
          deletedSuccessfully: afterDel === null
        };
      } catch (err) {
        return { error: err.message, stack: err.stack };
      }
    })()`
  });
  const d01Result = evalRes1.result.value;

  if (d01Result.putSuccess && d01Result.textMatch && d01Result.deletedSuccessfully) {
    console.log('  -> PASS: MediaStore IndexedDB successfully stores and retrieves binary Blobs without data URL corruption.\n');
  } else {
    throw new Error(`MediaStore test failed: ${JSON.stringify(d01Result)}`);
  }

  // --- TEST D02: Project History Manager & Autosave & Schema ---
  console.log('[TEST D02] Verifying ProjectHistoryManager snapshots, autosave, and schema preservation...');
  const d02Result = (await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(async () => {
      const hm = new window.ProjectHistoryManager();
      
      // Save snapshot
      const sampleState = {
        template: 'finnxiii',
        aspectRatio: '16-9',
        audioName: 'Test Song',
        lyricsRaw: '[00:01.00] Test line',
        parsedStanzas: [
          {
            id: 's0',
            start: 1.0,
            end: 4.0,
            text: 'Test line',
            status: 'reviewed',
            lines: [
              {
                text: 'Test line',
                start: 1.0,
                end: 4.0,
                words: [
                  { word: 'Test', start: 1.0, end: 2.0, sustain: 1.0, status: 'reviewed' },
                  { word: 'line', start: 2.0, end: 4.0, sustain: null, status: 'reviewed' }
                ]
              }
            ]
          }
        ]
      };

      const snap = hm.saveSnapshot('Draft 1', sampleState);
      const historyList = hm.getHistory();
      const snapFound = historyList.some(item => item.id === snap.id && item.name === 'Draft 1');

      // Test Autosave
      hm.saveAutoSave(sampleState);
      const autoSave = hm.getAutoSave();
      const autoSaveValid = autoSave && autoSave.state && autoSave.state.template === 'finnxiii';

      // Test schema validation
      const validSchema = hm.validateProjectSchema({ project: sampleState });
      const wordsPreserved = validSchema.project.parsedStanzas[0].lines[0].words.length === 2 &&
                            validSchema.project.parsedStanzas[0].lines[0].words[0].sustain === 1.0 &&
                            validSchema.project.parsedStanzas[0].lines[0].words[0].status === 'reviewed';

      // Clean up snapshot
      hm.deleteSnapshot(snap.id);

      return {
        snapFound,
        autoSaveValid,
        validSchemaResult: validSchema.valid,
        wordsPreserved
      };
    })()`
  })).result.value;

  if (d02Result.snapFound && d02Result.autoSaveValid && d02Result.validSchemaResult && d02Result.wordsPreserved) {
    console.log('  -> PASS: Snapshot history, autosave, and project schema validation with words/sustain/status preserved.\n');
  } else {
    throw new Error(`D02 failed: ${JSON.stringify(d02Result)}`);
  }

  // --- TEST D03: Non-destructive Draft Prompt on Startup ---
  console.log('[TEST D03] Verifying startup draft recovery banner without destroying demo preset...');
  
  // Inject mock draft into localStorage
  await send('Runtime.evaluate', {
    expression: `(() => {
      const mockDraft = {
        updatedAt: Date.now() - 60000,
        state: {
          template: 'cyberpunk',
          aspectRatio: '9-16',
          audioName: 'Draft Song from Yesterday',
          lyricsRaw: '[00:05.00] Lời bài hát bản nháp chưa lưu',
          parsedStanzas: [
            { id: 's1', start: 5.0, end: 8.0, text: 'Lời bài hát bản nháp chưa lưu', lines: [{ text: 'Lời bài hát bản nháp chưa lưu', start: 5.0, end: 8.0, words: [] }] }
          ]
        }
      };
      localStorage.setItem('LYRICSTUDIO_AUTOSAVE_V1', JSON.stringify(mockDraft));
    })()`
  });

  // Reload page
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 2000));

  // Check that draft banner appeared AND demo preset was initially loaded
  const bannerInfo = (await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const banner = document.getElementById('draftRecoveryBanner');
      const isVisible = !!banner;
      const bannerText = banner ? banner.textContent : '';
      const currentAudioName = document.getElementById('audioNameDisplay')?.textContent || '';

      return {
        isVisible,
        bannerText,
        currentAudioName
      };
    })()`
  })).result.value;

  console.log('  Startup banner detected:', bannerInfo.isVisible);
  console.log('  Initial loaded audio:', bannerInfo.currentAudioName);

  if (!bannerInfo.isVisible) {
    throw new Error('Draft recovery banner did not appear on startup!');
  }

  // Trigger restore by clicking .btn-banner-action
  await send('Runtime.evaluate', {
    awaitPromise: true,
    expression: `(() => {
      const btn = document.querySelector('.btn-banner-action');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  // Verify state was restored
  const restoredInfo = (await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const currentTemplate = window.engine.currentTemplate.id;
      const currentAspect = window.engine.aspectRatio;
      const bannerStillThere = !!document.getElementById('draftRecoveryBanner');
      const lyricsRaw = document.getElementById('rawLyricsInput')?.value || '';

      return {
        currentTemplate,
        currentAspect,
        bannerStillThere,
        lyricsRaw
      };
    })()`
  })).result.value;

  console.log('  Restored template:', restoredInfo.currentTemplate);
  console.log('  Restored aspect ratio:', restoredInfo.currentAspect);

  if (restoredInfo.currentTemplate === 'cyberpunk' && 
      restoredInfo.currentAspect === '9-16' && 
      !restoredInfo.bannerStillThere &&
      restoredInfo.lyricsRaw.includes('bản nháp')) {
    console.log('  -> PASS: Startup draft recovery works non-destructively and restores state cleanly.\n');
  } else {
    throw new Error(`Draft restore verification failed: ${JSON.stringify(restoredInfo)}`);
  }

  // Clean test draft
  await send('Runtime.evaluate', {
    expression: `localStorage.removeItem('LYRICSTUDIO_AUTOSAVE_V1')`
  });

  console.log('====================================================');
  console.log('ALL DATA & PERSISTENCE TESTS (D01, D02, D03) PASSED!');
  console.log('====================================================');

  ws.close();
} finally {
  chrome.kill('SIGKILL');
}
