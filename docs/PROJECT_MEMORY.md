# Project Memory & Session History — Lyrics Slideshow Studio

## Session 2026-11-07 — Baseline & Independent Audit Implementation

### 1. Environment & Baseline
- **Base SHA**: `39d2a95fd5f51690106b2734219509bd8b42d8f7` (fix: resolve video export freeze with dedicated 60fps canvas render loop, audio sync, and early save)
- **Active Branch**: `fix/audit-2026-11-07-core-stability`
- **OS / Shell**: Windows 11 / PowerShell / Node v24.19 / Python 3.12 / Chrome 131+ / FFmpeg 9.0.1
- **Local Server**: `http://localhost:5000` (Python multithreaded HTTP server)

### 2. Status Log
- **G0.1 / G0.2**: Initialized memory documentation (`AGENTS.md`, `docs/PROJECT_GOAL.md`, `docs/MASTER_PLAN.md`, `docs/PROJECT_MEMORY.md`, `docs/DECISIONS.md`, `docs/QA_EVIDENCE.md`). Branch created cleanly from HEAD.

### 3. Immediate Next Actions
1. **G1 / SEC-01**: Secure `server.py` against path traversal, restrict LAN exposure to `127.0.0.1`, retain full HTTP 206 Byte Range streaming.
2. **G1 / SEC-02**: Sanitize DOM in `js/app.js` and `js/history.js` using safe DOM APIs.
3. **G1 / TIM-01**: Fix active stanza selection logic in `js/engine.js` to prioritize the latest started stanza, preventing transition overlap masking.
