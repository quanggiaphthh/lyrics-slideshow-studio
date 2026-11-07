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
- **G5 (UX, Motion, Typography & Metadata)**: Implemented all 4 background image transitions (`kenburns`, `slide`, `zoom`, `diagonal`) in `engine.js`. Added responsive safe-area boundary calculation & auto-scaling typography in `templates.js` for 16:9, 9:16 vertical, and 1:1 square layouts. Added interactive phrase looping and ±50ms nudge controls in `app.js`. Separated title, composer, and performer in `preset_ganh_hao.js` (U01, U02, U03, M01 PASS) (`9caf54e`).
- **G6 (Portable Test Runner, Provenance & Release Gate)**: Built unified test runner `tests/run_all_tests.py` verifying 7/7 test suites without hardcoded user directories. Created `assets/PROVENANCE.md` detailing master audio licensing, hashes, and image provenance. Documented ffprobe output and test artifacts in `docs/QA_EVIDENCE.md`. All release gates passed.
- **V2 & V3 Timeline & Quang Giáp Integration**:
  - Integrated `TIMELINE_CAP_TU_HERO_DA_SUA.json` (V3) into canonical preset `js/preset_ganh_hao.js`.
  - Upgraded to 26 stanzas, 133 cue pairs, and 49 lines with dedicated Hero Word glowing box highlights (`boxHighlight: true`) and vocal sustain metrics (`sustain`).
  - Corrected key lyric misalignments per V3 report:
    - Fixed "NỠ VỘI" (P006, P009) replacing "NỠ DỐI".
    - Fixed "Sáo bay theo chồng đâu biết là ĐAU LÒNG anh lắm" (P014, P015) eliminating repeated "đau".
    - Fixed "Bóng em xa dần anh biết là một lần CHIA CÁCH" (P035, P036) eliminating repeated "chia".
    - Fixed "Đành lòng em cất bước SANG SÔNG" (P074, P075, P106, P107) eliminating repeated "sang".
    - Fixed "Sắc hoa CHUNG TÌNH chưa phai màu" / "Nỡ nào NGƯỜI ĐI" (P081-P083, P113-P115) eliminating repeated "người".
    - Preserved "Lục bình trôi chẳng biết nơi neo" (P058, P090) and "Dặn lòng CỐ QUÊN • Sao đêm vẫn thầm GỌI TÊN" (P042-P046).
  - Stored V3 audit dataset, CSV, JSON, SRT, and HTML QA preview in `docs/v3_timeline/`.
  - **Excel Acoustic Synchronization (100% Word-Level Match)**:
    - Cross-checked against user's Excel file `media_1794018325711_5a5a4b74.xlsx` (Sheet: "Bổ sung thêm thời gian ngân của").
    - Audited the entire Outro section (`04:44.5` - `05:30.8`), discovering ASR drift in previous draft (e.g. "Mình anh thao thức" was 1.62s early, "Biết lòng buồn vui" was 2.22s early).
    - Fully calibrated all 36 outro words, timings, and sustains (`Dòng nhớ trong tim`, `Làm sao chia cách`, `Người thương có hay`, `Đêm dài`, `Mình anh thao thức`, `Em giờ`, `Biết lòng buồn vui`, `Em về`, `Làm dâu bên ấy`, `Bên này`, `Vẫn hoài`, `Chờ`, `Mong`) to achieve **0.00s delta (100% EXACT)** against Excel timecodes and measured acoustic silence gaps.
  - **Intro Calibration (Phần đầu chuẩn xác)**:
    - Identified that prior ASR draft had delayed intro stanzas (`gh_01` to `gh_05`) by 3.2s to 14.2s (placing "Cho em nỡ vội • Lấy chồng bỏ anh" over the 32-second dan bau solo).
    - Performed RMS energy waveform analysis on master audio `dem_ganh_hao.mp3` and re-aligned perfectly with user's original TXT (`TIMELINE_GOC_TU_TEP_TXT.csv` S001-S013):
      - `gh_01`: `04.2s - 10.0s` (HÒ ƠI)
      - `gh_02`: `15.3s - 20.2s` (Ai xui con sáo SỔ LỒNG)
      - `gh_03`: `21.0s - 25.2s` (Cho em NỠ VỘI)
      - `gh_04`: `29.0s - 33.6s` (HÒ ƠI 2)
      - `gh_05`: `37.8s - 46.8s` (Cho em NỠ VỘI • Lấy chồng BỎ ANH)
      - Dan bau solo intro: `46.8s - 78.5s` (clean 31.7s instrumental break before Section 1 enters at 78.5s).
  - Re-verified complete 7-suite test harness `python tests/run_all_tests.py`: 7/7 PASSED.

### 3. Immediate Next Actions
1. Commit changes and push branch `fix/audit-2026-11-07-core-stability` to GitHub remote.
2. Present complete release report and checklist to user.
