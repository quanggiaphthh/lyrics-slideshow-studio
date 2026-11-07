# Master Plan & Roadmap — Lyrics Slideshow Studio

## Milestones & Gates

| Gate | Task ID | Priority | Description | Status | Evidence / Notes |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **G0** | **G0.1** | P0 | Baseline inspection from HEAD `39d2a95` | **DONE** | git status & rev-parse verified (`ca908bd`) |
| **G0** | **G0.2** | P0 | Setup working branch & project memory docs | **DONE** | Branch `fix/audit-2026-11-07-core-stability` (`ca908bd`) |
| **G1** | **SEC-01** | P0 | Patch `server.py` path traversal, LAN bind & CORS | **DONE** | Path.resolve(), 127.0.0.1, 8/8 tests PASS (`a8a8a87`) |
| **G1** | **SEC-02** | P0 | Eliminate DOM injection / XSS in `app.js` & `history.js` | **DONE** | textContent, DOM APIs, JSON schema validation (`a8a8a87`) |
| **G1** | **TIM-01** | P0 | Fix active stanza selection & transition layering in `engine.js` | **DONE** | 23/23 transitions PASS without delay (`a8a8a87`) |
| **G2** | **EXP-01** | P0 | Explicit State Machine & Cancellation Intent in `recorder.js` | **DONE** | idle/recording/finalizing, cancel never downloads (`558144a`) |
| **G2** | **EXP-02** | P1 | Robust Export Cleanup & Error Handling | **DONE** | Idempotent cleanup, immediate retry capability (`558144a`) |
| **G2** | **EXP-03** | P1 | Codec detection, actual framerate & A/V sync probe | **DONE** | ffprobe: H.264 @ 60fps, AAC 48kHz, 14.5 Mbps (`558144a`) |
| **G2** | **EXP-04** | P2 | Dynamic Unicode & Windows-safe export file naming | **DONE** | Sanitize project & audio titles (`558144a`) |
| **G3** | **TIM-02** | P1 | Explicitly label `ESTIMATED` vs `ALIGNED` vs `REVIEWED` | **DONE** | Word timing provenance & UI badges (`df2c121`) |
| **G3** | **TIM-03** | P1 | Separate vocal sustain from hold duration & vibrato | **DONE** | Explicit sustain schema vs visual effects (`df2c121`) |
| **G3** | **TIM-04** | P1 | Canonical timeline dataset & QA sample metrics | **DONE** | Audio SHA-256 verified, 266 words, 69 sustains (`df2c121`) |
| **G4** | **DATA-01**| P1 | Auto-save recovery on startup & IndexedDB Blob storage | **DONE** | MediaStore IndexedDB + non-destructive banner (D01-D03 PASS) (`9ae1586`) |
| **G4** | **DATA-02**| P1 | Versioned `.lyricproj` schema validation & safe import | **DONE** | Validates schema, preserves words/sustain/status (D02 PASS) (`9ae1586`) |
| **G5** | **UX-01**  | P2 | Audit transition types (implement zoom/diagonal or hide) | **DONE** | 4 true transitions: kenburns, slide, zoom, diagonal (U01 PASS) |
| **G5** | **UX-02**  | P1 | Multi-ratio safe area & auto-reflow (16:9, 9:16, 1:1) | **DONE** | Safe boundaries, auto-scale font for 16:9, 9:16, 1:1 (U02 PASS) |
| **G5** | **UX-03**  | P1 | Visual word timing adjustment table (loop & nudge) | **DONE** | Interactive phrase loop + ±50ms nudge controls (U03 PASS) |
| **G5** | **META-01**| P2 | Separate song metadata fields & provenance | **DONE** | Composer (Lê Phương) vs Performer (Quang Giáp) (M01 PASS) |
| **G6** | **QA-01**  | P0 | Portable test runner (relative paths, no user dir hardcodes) | **DONE** | 7/7 suites PASS (`tests/run_all_tests.py`) |
| **G6** | **DOCS-01**| P1 | README & Provenance documentation | **DONE** | Created `assets/PROVENANCE.md`, updated `QA_EVIDENCE.md` |
| **V2** | **TIM-V2** | P0 | V2 Pair-Level & Hero Word Timeline (Quang Giáp Cover 7) | **DONE** | 26 stanzas, 133 cues, 49 lines, hero highlights & sustains |
