# Project Goals & Definition of Done — Lyrics Slideshow Studio

## 1. Core Success Criteria
The ultimate goal is a rock-solid, production-ready desktop web application for creating synchronized Vietnamese kinetic typography lyric slideshow videos.

1. **Millisecond-Accurate Lyric Timing**: Words and syllables appear exactly when sung without renderer delays, transition clipping, or masking across all 23+ stanza transitions.
2. **Honest Timing & Vocal Sustain**: Distinct data models separating word articulation from actual vocal sustain and visual hold duration. Heuristic or evenly split data must be labeled `ESTIMATED`.
3. **Reliable Video Export with Audio**: Seamless in-browser video export at smooth frame rates with synchronized audio, proper cancel semantics (no download on abort), partial clip download ("Lưu & Tải Đoạn Này"), and verifiable audio/video stream integrity without stalls.
4. **Resilient Project Persistence**: No project loss on page reload. Auto-save recovery on startup, robust IndexedDB blob persistence for media, schema validation for imported `.lyricproj` projects, and graceful warnings for missing assets.
5. **Multi-Aspect Ratio Typography**: Aesthetic, legible typography with safe areas and responsive word wrap / hero keyword reflow across `16:9` (horizontal), `9:16` (vertical Reels/TikTok/Shorts), and `1:1` (square).
6. **Local Execution Security**: Clean local runtime security. Prevent path traversal (`../`, URL-encoded paths, symlinks, `.git` leakage) in `server.py`, default to `127.0.0.1`, and eliminate DOM injection / XSS from untrusted lyrics, snapshot titles, or project JSON files.
7. **Maintainable Project Memory & Reproducible QA**: Comprehensive project documentation, ADRs, session logs, and automated regression test runners with portable relative paths so any agent or engineer can seamlessly continue development.

## 2. Out of Scope
- No framework migrations (React, Vue, Next.js, Electron, Tauri, WebGL).
- No cloud backend, database server, user accounts, authentication, or payment.
- No arbitrary replacement of original song, images, audio artist, or commit history.
- No paid third-party APIs/models.
- No re-verifying already proven items without code changes.
