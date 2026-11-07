import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load preset_ganh_hao.js
global.window = {};
const presetCode = fs.readFileSync(path.resolve(__dirname, '../js/preset_ganh_hao.js'), 'utf8');
new Function(presetCode)();

const stanzas = window.DEMO_PRESET_GANH_HAO.wordsData;
console.log(`Loaded ${stanzas.length} stanzas from preset_ganh_hao.js.`);

// New getActiveStanza method from LyricEngine
function getActiveStanza(lyricsData, time) {
  if (!lyricsData || lyricsData.length === 0) return null;
  const exitThreshold = 0.85;

  const candidates = [];
  for (let i = 0; i < lyricsData.length; i++) {
    const s = lyricsData[i];
    if (time >= s.start && time <= s.end + exitThreshold) {
      candidates.push(s);
    }
  }
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  const started = candidates.filter(s => time >= s.start);
  if (started.length > 0) {
    started.sort((a, b) => b.start - a.start);
    return started[0];
  }
  candidates.sort((a, b) => a.start - b.start);
  return candidates[0];
}

// Old buggy getActiveStanza
function getActiveStanzaOld(lyricsData, time) {
  const exitThreshold = 0.85;
  for (let i = 0; i < lyricsData.length; i++) {
    const s = lyricsData[i];
    if (time >= s.start && time <= s.end + exitThreshold) {
      return s;
    }
  }
  return null;
}

let oldFailedCount = 0;
let newPassedCount = 0;
const totalTransitions = stanzas.length - 1;

for (let i = 0; i < totalTransitions; i++) {
  const current = stanzas[i];
  const next = stanzas[i + 1];

  // Test at exact next.start
  const oldAtStart = getActiveStanzaOld(stanzas, next.start);
  const newAtStart = getActiveStanza(stanzas, next.start);

  // Test at next.start + 0.1s
  const oldAtStart100ms = getActiveStanzaOld(stanzas, next.start + 0.1);
  const newAtStart100ms = getActiveStanza(stanzas, next.start + 0.1);

  const oldFailed = (oldAtStart?.id !== next.id) || (oldAtStart100ms?.id !== next.id);
  const newPassed = (newAtStart?.id === next.id) && (newAtStart100ms?.id === next.id);

  if (oldFailed) {
    oldFailedCount++;
    console.log(`[OLD FAILED] Transition ${current.id} (${current.end}s) -> ${next.id} (${next.start}s): Old selected '${oldAtStart?.id}' at ${next.start}s, masked next stanza!`);
  }
  if (newPassed) {
    newPassedCount++;
  } else {
    console.error(`[NEW FAILED] Transition ${current.id} -> ${next.id} at ${next.start}s! Expected ${next.id}, got ${newAtStart?.id}`);
  }
}

console.log(`\n===========================================`);
console.log(`Total transitions tested: ${totalTransitions}`);
console.log(`Old logic masked/delayed: ${oldFailedCount} / ${totalTransitions} transitions`);
console.log(`New logic correctly resolved: ${newPassedCount} / ${totalTransitions} transitions`);
console.log(`===========================================`);

if (newPassedCount === totalTransitions) {
  console.log(`ALL ${totalTransitions} TRANSITIONS PASS WITH ZERO DELAY! (TIM-01 VERIFIED)`);
  process.exit(0);
} else {
  console.error(`FAILED: Only ${newPassedCount} / ${totalTransitions} transitions resolved.`);
  process.exit(1);
}
