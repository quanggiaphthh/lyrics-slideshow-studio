# QA Evidence & Test Verification Registry — Lyrics Slideshow Studio

## Test Matrix

| Test ID | Task | Suite | Command | Result | Evidence Artifact |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **S01** | SEC-01 | Path traversal & LAN bind | `python tests/test_server_security.py` | PENDING | Pending execution |
| **S02** | SEC-01 | HTTP 206 Byte Range validation | `python tests/test_server_security.py` | PENDING | Pending execution |
| **S03** | SEC-02 | DOM XSS & Schema Validation | `node tests/test_dom_security.mjs` | PENDING | Pending execution |
| **T01** | TIM-01 | Stanza transition overlap (23 transitions) | `node tests/test_stanza_transitions.mjs` | PENDING | Pending execution |
| **E01** | EXP-01 | Cancel semantics (no file download) | `node tests/test_export_lifecycle.mjs` | PENDING | Pending execution |
| **E02** | EXP-01 | Partial save ("Lưu & Tải Đoạn Này") | `node tests/test_export_lifecycle.mjs` | PENDING | Pending execution |
| **E03** | EXP-02 | Audio failure / cleanup idempotency | `node tests/test_export_lifecycle.mjs` | PENDING | Pending execution |
| **E04** | EXP-03 | Export clip integrity & A/V probe | `ffprobe` analysis of exported clip | PENDING | Pending execution |
| **D01** | DATA-01 | Auto-save reload & restore | `node tests/test_persistence.mjs` | PENDING | Pending execution |
| **U01** | UX-02 | Responsive layout (16:9, 9:16, 1:1) | Browser screenshots | PENDING | Pending execution |
