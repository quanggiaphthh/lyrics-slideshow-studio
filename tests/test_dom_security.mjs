import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load history.js
global.window = {};
const historyCode = fs.readFileSync(path.resolve(__dirname, '../js/history.js'), 'utf8');
new Function(historyCode)();

const historyMgr = new window.ProjectHistoryManager();

console.log('--- Testing S03: DOM Security & Project Schema Validation ---');

// 1. Test Schema Validation with Valid Project
const validProject = {
  project: {
    audioName: 'test.mp3',
    audioDuration: 120,
    images: ['assets/samples/bg_clean_720p.jpg', 'https://example.com/photo.jpg'],
    template: 'finnxiii',
    transition: 'kenburns',
    aspectRatio: '16-9',
    lyricsRaw: '[00:01.00] test line',
    parsedStanzas: [
      {
        id: 's_0',
        start: 1.0,
        end: 5.0,
        text: 'test lyric line',
        lines: [{ text: 'test lyric line', start: 1.0, end: 5.0 }]
      }
    ]
  }
};

const v1 = historyMgr.validateProjectSchema(validProject);
if (!v1.valid) {
  console.error('FAIL: Valid project failed schema validation:', v1.error);
  process.exit(1);
}
console.log('PASS: Valid project passed schema validation.');

// 2. Test Rejection of Malicious Protocols in images
const maliciousProject = {
  project: {
    images: [
      'javascript:alert("XSS")',
      'vbscript:msgbox("XSS")',
      'data:text/html,<script>alert(1)</script>',
      'https://safe.example.com/valid.png'
    ]
  }
};

const v2 = historyMgr.validateProjectSchema(maliciousProject);
if (!v2.valid) {
  console.error('FAIL: Malicious project validation threw unexpected error:', v2.error);
  process.exit(1);
}
// Malicious protocols should be filtered out, leaving only the safe image
if (v2.project.images.length !== 1 || v2.project.images[0] !== 'https://safe.example.com/valid.png') {
  console.error('FAIL: Malicious URLs were not filtered out! Result:', v2.project.images);
  process.exit(1);
}
console.log('PASS: Malicious URL protocols (javascript:, vbscript:, data:text/html) successfully filtered out.');

// 3. Test Max Length / DoS limits
const hugeStanzas = [];
for (let i = 0; i < 2500; i++) {
  hugeStanzas.push({ id: `s_${i}`, start: i, end: i + 1, text: 'a' });
}
const v3 = historyMgr.validateProjectSchema({ parsedStanzas: hugeStanzas });
if (v3.valid) {
  console.error('FAIL: Oversized project with 2500 stanzas should have been rejected!');
  process.exit(1);
}
console.log('PASS: DoS protection rejected project exceeding 2000 stanzas:', v3.error);

// 4. Test Stanza Text with HTML payloads
const xssPayload = '<img src=x onerror=alert("XSS")><script>alert(1)</script>';
const xssProject = {
  project: {
    parsedStanzas: [
      { id: 'xss', start: 0, end: 1, text: xssPayload }
    ]
  }
};
const v4 = historyMgr.validateProjectSchema(xssProject);
if (!v4.valid || v4.project.parsedStanzas[0].text !== xssPayload) {
  console.error('FAIL: Text payload corrupted or invalid:', v4);
  process.exit(1);
}
console.log('PASS: Stanza text preserved as pure raw string for safe textContent rendering.');

console.log('\nALL DOM SECURITY & SCHEMA VALIDATION TESTS PASS! (SEC-02 VERIFIED)');
process.exit(0);
