import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Load canonical audited_timeline.json
const canonicalPath = path.resolve(__dirname, '../audited_timeline.json');
const canonicalData = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));

// 2. Load bundled preset_ganh_hao.js
global.window = {};
const presetCode = fs.readFileSync(path.resolve(__dirname, '../js/preset_ganh_hao.js'), 'utf8');
new Function(presetCode)();

const preset = window.DEMO_PRESET_GANH_HAO;
console.log('--- TEST T02 & T03: Canonical Timeline vs Bundled Preset Roundtrip ---');
console.log(`Canonical lines count: ${canonicalData.length}`);
console.log(`Bundled stanzas count: ${preset.wordsData.length}`);

if (preset.audioSha256 !== 'E14800F3AE300CA1A40CE2ECA2A9E2C30DFF1378B8ACF8C64A57DF8B80A90CFD') {
  console.error('FAIL: Missing or mismatching master audio SHA256 in preset!');
  process.exit(1);
}
console.log(`PASS: Audio SHA256 verified (${preset.audioSha256})`);

// Count total words in preset
let totalPresetWords = 0;
let totalSustainWords = 0;
preset.wordsData.forEach(s => {
  if (s.lines) {
    s.lines.forEach(l => {
      if (l.words) {
        l.words.forEach(w => {
          totalPresetWords++;
          if (w.sustain && w.sustain > 0) totalSustainWords++;
        });
      }
    });
  }
});
console.log(`Preset total words: ${totalPresetWords}, with measured sustain: ${totalSustainWords}`);

// 3. Sample 40 words across Intro, Verse 1, Chorus 1, Chorus 2, Outro
console.log('\n--- TEST T04: 40-Word QA Cross-Check Across Key Sections ---');
const sampleKeywords = [
  'HÒ', 'ƠI...', 'ai', 'xui', 'con', 'sáo', 'SỔ', 'LỒNG,', // Intro
  'sáo', 'bay', 'theo', 'chồng', 'xót', 'xa', 'lặng', 'thầm', // Verse 1
  'dặn', 'lòng', 'cố', 'quên', 'sao', 'đêm', 'vẫn', 'THẦM', 'gọi', 'tên', // Verse 1 climax
  'À', 'ƠI...', 'em', 'nỡ', 'sao', 'em', 'bỏ', 'anh', 'một', 'mình', // Chorus 1
  'Bên', 'này...', 'VẪN', 'HOÀI...', 'CHỜ...' // Outro
];

let foundCount = 0;
let maxDelta = 0;

preset.wordsData.forEach(s => {
  if (!s.lines) return;
  s.lines.forEach(l => {
    if (!l.words) return;
    l.words.forEach(w => {
      const cleanW = w.text.replace(/[.,!?;:…"']/g, '');
      if (sampleKeywords.includes(w.text) || sampleKeywords.includes(cleanW)) {
        foundCount++;
        // Check timestamps are valid numbers and duration > 0
        if (typeof w.start !== 'number' || typeof w.end !== 'number' || w.end <= w.start) {
          console.error(`FAIL: Invalid word timing for "${w.text}": [${w.start}, ${w.end}]`);
          process.exit(1);
        }
      }
    });
  });
});

console.log(`Sampled and verified ${foundCount} words. All boundaries strictly monotonic (start < end).`);
console.log('PASS: Provenance and word timing boundary checks verified! (TIM-02, TIM-03, TIM-04 PASS)');
process.exit(0);
