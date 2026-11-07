# QA Evidence & Test Verification Registry — Lyrics Slideshow Studio

This document records the automated verification test results, cryptographic hashes, ffprobe media probes, and performance metrics validating all gates (G0 through G6) in accordance with the independent audit requirements.

---

## 1. Automated Verification Test Matrix

| Test ID | Task | Suite | Target / Scope | Result | Evidence Artifact |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **S01** | SEC-01 | Server Security | Path traversal (`../`, `%2e%2e`, `.git`), LAN bind (`127.0.0.1`) | **PASS** | 8/8 tests pass (`tests/test_server_security.py`) |
| **S02** | SEC-01 | HTTP Streaming | HTTP 206 Partial Content byte-range seeking | **PASS** | 206 responses verified with correct Content-Range |
| **S03** | SEC-02 | DOM Sanitization | Safe DOM APIs (`textContent`, `createElement`), XSS payload neutralization | **PASS** | `tests/test_dom_security.mjs` |
| **T01** | TIM-01 | Transition Overlap | 23/23 stanza transitions; incoming stanza priority over 0.85s exiting tail | **PASS** | 0/23 masked; `tests/test_stanza_transitions.mjs` |
| **T02** | TIM-02 | Timing Provenance | UI badges for reviewed (`[Chuẩn]`) vs estimated (`[Ước lượng]`) | **PASS** | `tests/test_timeline_provenance.mjs` |
| **T03** | TIM-03 | Vocal Sustain | Explicit measured sustain preserved across 69 sustained words | **PASS** | Schema verification `sustain !== null` |
| **T04** | TIM-04 | Audio Integrity | Master audio SHA-256 matches audited baseline | **PASS** | Hash: `E14800F3AE300CA1A40CE2ECA2A9E2C30DFF1378B8ACF8C64A57DF8B80A90CFD` |
| **E01** | EXP-01 | State Machine | Cancel export intent never downloads file or triggers completion callback | **PASS** | `tests/test_export_lifecycle.mjs` |
| **E02** | EXP-01 | Partial Export | Early save ("Lưu & Tải Đoạn Này") finalizes partial WebM/MP4 cleanly | **PASS** | Export completes with duration matching cut |
| **E03** | EXP-02 | Error Cleanup | Audio playback rejection triggers cleanup and resets state to idle for retry | **PASS** | Idempotent cleanup; state resets cleanly |
| **E04** | EXP-03 | ffprobe Probe | Codec, actual framerate, AAC audio probe | **PASS** | H.264 @ 60/1 fps, AAC 48kHz stereo, 14.5 Mbps |
| **D01** | DATA-01 | IndexedDB Media | Binary Blobs stored in `MediaStore` without localStorage quota crashes | **PASS** | `tests/test_persistence.mjs` |
| **D02** | DATA-01 | Draft Recovery | Startup draft recovery banner prompts user non-destructively | **PASS** | Rehydrates state & blobs; demo preset preserved |
| **D03** | DATA-02 | Project Schema | `.lyricproj` export & import schema validation | **PASS** | Full roundtrip preservation of words, sustain & status |
| **U01** | UX-01 | Motion Transitions | 4 distinct background transitions: `kenburns`, `slide`, `zoom`, `diagonal` | **PASS** | `tests/test_ux_features.mjs` |
| **U02** | UX-02 | Safe Boundaries | Multi-ratio safe areas and auto-reflow for 16:9, 9:16 vertical, and 1:1 square | **PASS** | Typography auto-scaling prevents clipping |
| **U03** | UX-03 | Timing Editor | Interactive phrase loop and ±50ms nudge controls | **PASS** | `tests/test_ux_features.mjs` |
| **M01** | META-01 | Metadata | Separation of Composer (Lê Phương) vs Performer (Quý Bình) | **PASS** | `tests/test_ux_features.mjs` |

---

## 2. Canonical FFprobe Video Stream Probe Output

Direct ffprobe inspection of browser exported video (`test_export.mp4`):

```json
{
  "streams": [
    {
      "index": 0,
      "codec_name": "h264",
      "codec_long_name": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",
      "profile": "Constrained Baseline",
      "codec_type": "video",
      "width": 1280,
      "height": 720,
      "r_frame_rate": "60/1",
      "avg_frame_rate": "60/1",
      "time_base": "1/1000",
      "duration_ts": 5017,
      "duration": "5.017000",
      "bit_rate": "14561000"
    },
    {
      "index": 1,
      "codec_name": "aac",
      "codec_long_name": "AAC (Advanced Audio Coding)",
      "profile": "LC",
      "codec_type": "audio",
      "sample_rate": "48000",
      "channels": 2,
      "channel_layout": "stereo",
      "r_frame_rate": "0/0",
      "avg_frame_rate": "0/0"
    }
  ],
  "format": {
    "format_name": "mov,mp4,m4a,3gp,3g2,mj2",
    "format_long_name": "QuickTime / MOV",
    "duration": "5.017000",
    "size": "9130761",
    "bit_rate": "14559714"
  }
}
```

---

## 3. Full Test Runner Output (Task 2686)

```
======================================================================
LYRICS SLIDESHOW STUDIO - CANONICAL TEST RUNNER (GATE G6)
Working Directory: C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio
Python Executable: C:\Users\dtron\AppData\Local\Programs\Python\Python312\python.exe
======================================================================

==> RUNNING [SEC-01] Server Path Traversal & LAN Exposure...
    RESULT: PASS (1.41s)

==> RUNNING [SEC-02] DOM Injection & XSS Sanitization...
    RESULT: PASS (0.12s)

==> RUNNING [TIM-01] Active Stanza Resolution & 23/23 Transitions Overlap...
    RESULT: PASS (0.10s)

==> RUNNING [TIM-02/03/04] Timeline Provenance, Sustain Duration & Audio SHA-256...
    RESULT: PASS (0.09s)

==> RUNNING [DATA-01/02] IndexedDB MediaStore, Draft Recovery & Schema Validation...
    RESULT: PASS (7.30s)

==> RUNNING [UX-01/02/03] Transitions, Safe Areas, Word Nudge & Metadata Separation...
    RESULT: PASS (5.08s)

==> RUNNING [EXP-03] ffprobe Video Codec, Actual Framerate & AAC Audio Probe...
    RESULT: PASS (22.76s)

======================================================================
FINAL TEST SUMMARY
======================================================================
 PASS  | SEC-01          |  1.41s | Server Path Traversal & LAN Exposure
 PASS  | SEC-02          |  0.12s | DOM Injection & XSS Sanitization
 PASS  | TIM-01          |  0.10s | Active Stanza Resolution & 23/23 Transitions Overlap
 PASS  | TIM-02/03/04    |  0.09s | Timeline Provenance, Sustain Duration & Audio SHA-256
 PASS  | DATA-01/02      |  7.30s | IndexedDB MediaStore, Draft Recovery & Schema Validation
 PASS  | UX-01/02/03     |  5.08s | Transitions, Safe Areas, Word Nudge & Metadata Separation
 PASS  | EXP-03          | 22.76s | ffprobe Video Codec, Actual Framerate & AAC Audio Probe
----------------------------------------------------------------------
Total Suites: 7 | Passed: 7 | Failed: 0
======================================================================

All canonical verification suites PASSED! Ready for release gate.
```
