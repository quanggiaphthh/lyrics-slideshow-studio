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
- **G4 (Session Persistence & Project Schema)**: Implemented `MediaStore` IndexedDB for audio/image binary blobs. Added non-destructive startup draft recovery banner without clobbering initial demo preset. Enhanced project export/import schema validation to preserve words, sustain, and status (D01, D02, D03 PASS).

### 3. Immediate Next Actions
1. **G5 / UX-01**: Implement actual image transitions (`zoom`, `diagonal`, `slide`, `kenburns`) in `js/engine.js`.
2. **G5 / UX-02**: Audit 9:16 and 1:1 layouts to prevent text truncation and ensure title safe areas.
3. **G5 / UX-03**: Add visual word timing adjustment (playback loop for phrase + ±20ms/±50ms keyboard/button nudge).
4. **G5 / META-01**: Cleanly separate `title`, `composer`, `original_performer`, `cover_performer` fields in `js/preset_ganh_hao.js`.
