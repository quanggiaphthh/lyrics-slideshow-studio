# Architecture Decision Records (ADRs) — Lyrics Slideshow Studio

## ADR-001: In-Browser MediaRecorder vs Offline Video Rendering
- **Context**: The app needs to export 60FPS video with synced audio. An offline headless CLI was considered, but requires complex server orchestration.
- **Decision**: Primary export remains in-browser using `HTMLCanvasElement.captureStream(60)` + `HTMLAudioElement.captureStream()` / Web Audio destination with dedicated 60FPS render loop.
- **Consequences**: Zero server dependency for users; client-side download; requires tab to stay active and proper state-machine handling to avoid UI stalls.

## ADR-002: Timeline Data Canonical Source
- **Context**: Several json and js files contain word timings (`audited_timeline.json`, `preset_ganh_hao.js`, `audit_results.json`).
- **Decision**: `audited_timeline.json` is the canonical JSON source of truth. `preset_ganh_hao.js` is the bundled runtime presentation layer generated from it.
- **Consequences**: Single source of truth. Updates to timeline must be validated against `audited_timeline.json`.

## ADR-003: Media Persistence across Browser Reloads
- **Context**: Users loading audio and images lose references upon page reload because `blob:` URLs are ephemeral.
- **Decision**: Store media metadata in `localStorage` and persist media binary blobs in browser `IndexedDB`.
- **Consequences**: Persistent drafts survive page reloads without requiring an external database.
