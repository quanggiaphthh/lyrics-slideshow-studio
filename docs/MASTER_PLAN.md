# Master Plan & Roadmap — Lyrics Slideshow Studio

## Milestones & Gates

| Gate | Task ID | Priority | Description | Status | Evidence / Notes |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **G0** | **G0.1** | P0 | Baseline inspection from HEAD `39d2a95` | **DONE** | git status & rev-parse verified |
| **G0** | **G0.2** | P0 | Setup working branch & project memory docs | **DONE** | Branch `fix/audit-2026-11-07-core-stability` |
| **G1** | **SEC-01** | P0 | Patch `server.py` path traversal, LAN bind & CORS | **TODO** | Path.resolve(), 127.0.0.1, targeted test suite |
| **G1** | **SEC-02** | P0 | Eliminate DOM injection / XSS in `app.js` & `history.js` | **TODO** | textContent, DOM APIs, JSON schema validation |
| **G1** | **TIM-01** | P0 | Fix active stanza selection & transition layering in `engine.js` | **TODO** | Prevent 18/23 transition overlap maskings |
| **G2** | **EXP-01** | P0 | Explicit State Machine & Cancellation Intent in `recorder.js` | **TODO** | idle/recording/finalizing, cancel never downloads |
| **G2** | **EXP-02** | P1 | Robust Export Cleanup & Error Handling | **TODO** | Idempotent cleanup, handle audio.play() reject |
| **G2** | **EXP-03** | P1 | Codec detection, actual framerate & A/V sync probe | **TODO** | ffprobe/ffmpeg analysis of exported files |
| **G2** | **EXP-04** | P2 | Dynamic Unicode & Windows-safe export file naming | **TODO** | Sanitize project & audio titles |
| **G3** | **TIM-02** | P1 | Explicitly label `ESTIMATED` vs `ALIGNED` vs `REVIEWED` | **TODO** | Word timing provenance & UI badges |
| **G3** | **TIM-03** | P1 | Separate vocal sustain from hold duration & vibrato | **TODO** | Explicit sustain schema vs visual effects |
| **G3** | **TIM-04** | P1 | Canonical timeline dataset & QA sample metrics | **TODO** | Define audited_timeline.json as canonical source |
| **G4** | **DATA-01**| P1 | Auto-save recovery on startup & IndexedDB Blob storage | **TODO** | Restore project and media across browser reload |
| **G4** | **DATA-02**| P1 | Versioned `.lyricproj` schema validation & safe import | **TODO** | Prevent state destruction on malformed files |
| **G5** | **UX-01**  | P2 | Audit transition types (implement zoom/diagonal or hide) | **TODO** | True Ken Burns, Slide, Zoom implementations |
| **G5** | **UX-02**  | P1 | Multi-ratio safe area & auto-reflow (16:9, 9:16, 1:1) | **TODO** | Safe boundaries for vertical & square aspect ratios |
| **G5** | **UX-03**  | P1 | Visual word timing adjustment table (loop & nudge) | **TODO** | Quick ±20ms/50ms nudge & phrase loop |
| **G5** | **META-01**| P2 | Separate song metadata fields & provenance | **TODO** | Title, Composer, Performer separation |
| **G6** | **QA-01**  | P0 | Portable test runner (relative paths, no user dir hardcodes) | **TODO** | Self-contained Node & Python test scripts |
| **G6** | **DOCS-01**| P1 | README & Provenance documentation | **TODO** | Update README with verified status and instructions |
