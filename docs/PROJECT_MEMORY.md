# Project Memory & Session History — Lyrics Slideshow Studio

## Session 2026-11-07 — Baseline & Independent Audit Implementation

### 1. Environment & Baseline
- **Base SHA**: `39d2a95fd5f51690106b2734219509bd8b42d8f7` (fix: resolve video export freeze with dedicated 60fps canvas render loop, audio sync, and early save)
- **Active Branch**: `fix/audit-2026-11-07-core-stability`
- **OS / Shell**: Windows 11 / PowerShell / Node v24.19 / Python 3.12 / Chrome 131+ / FFmpeg 9.0.1
- **Local Server**: `http://localhost:5000` (Python multithreaded HTTP server)

### 2. Status Log
- **G0.1 / G0.2**: Initialized memory documentation (`AGENTS.md`, `docs/PROJECT_GOAL.md`, `docs/MASTER_PLAN.md`, `docs/PROJECT_MEMORY.md`, `docs/DECISIONS.md`, `docs/QA_EVIDENCE.md`). Branch created cleanly from HEAD (`ca908bd`).
- **G1 (Security & Transitions)**: Resolved SEC-01 path traversal & LAN binding in `server.py` (8/8 tests PASS). Resolved SEC-02 DOM injection in `app.js` and `history.js`. Resolved TIM-01 active stanza transition delay in `engine.js` (23/23 transitions PASS) (`a8a8a87`).
- **G2 (Export Lifecycle & Quality)**: Implemented strict state machine, cancellation semantics, failure reset in `recorder.js`. Probed exported MP4 using ffprobe (H.264 @ 60fps, AAC 48kHz stereo, 14.5 Mbps). Added Vietnamese/Windows filename sanitization (`558144a`).
- **G3 (Timing Provenance & Sustain)**: Labeled estimated vs reviewed timings in UI and templates (`timingStatus: 'reviewed'|'estimated'`). Preserved explicit vocal sustain duration and audio SHA-256 integrity (`df2c121`).
- **G4 (Session Persistence & Project Schema)**: Implemented `MediaStore` IndexedDB for audio/image binary blobs. Added non-destructive startup draft recovery banner without clobbering initial demo preset. Enhanced project export/import schema validation to preserve words, sustain, and status (D01, D02, D03 PASS) (`9ae1586`).
- **G5 (UX, Motion, Typography & Metadata)**: Implemented all 4 background image transitions (`kenburns`, `slide`, `zoom`, `diagonal`) in `engine.js`. Added responsive safe-area boundary calculation & auto-scaling typography in `templates.js` for 16:9, 9:16 vertical, and 1:1 square layouts. Added interactive phrase looping and ±50ms nudge controls in `app.js`. Separated title, composer, and performer in `preset_ganh_hao.js` (U01, U02, U03, M01 PASS).

### 3. Immediate Next Actions
1. **G6 / QA-01**: Run portable full test suite verification across security, export, transitions, persistence, and UX.
2. **G6 / DOCS-01**: Create `assets/PROVENANCE.md` and update `README.md` and `docs/QA_EVIDENCE.md`.
3. Push branch `fix/audit-2026-11-07-core-stability` to GitHub remote.
