# Coding Agent Guidelines — Lyrics Slideshow Studio

## 1. Scope & Stack
- **Repository**: [lyrics-slideshow-studio](https://github.com/quanggiaphthh/lyrics-slideshow-studio)
- **Stack**: HTML5 Canvas 2D, Vanilla JavaScript (ES6+), Web Audio API, MediaRecorder API, Python 3 HTTP Server with Byte-Range streaming.
- **Constraints**: No frameworks (no React/Next), no cloud backends/databases, no breaking changes to vanilla runtime. Keep all local paths relative and cross-platform.

## 2. Order of Documentation & Memory
Every agent starting or continuing work MUST read the following files in order:
1. `AGENTS.md` (this file)
2. `docs/PROJECT_GOAL.md` (Success criteria & 7 core goals)
3. `docs/MASTER_PLAN.md` (G0–G6 gates, task IDs, dependencies, owners)
4. `docs/PROJECT_MEMORY.md` (Session logs, baseline SHA, files modified, test logs, backlog)
5. `docs/DECISIONS.md` (Architectural Decision Records)
6. `docs/QA_EVIDENCE.md` (Test evidence, artifacts, and verification logs)

## 3. Operational Rules
1. **Practical Results First**: Code changes must directly advance the 7 project goals.
2. **Current State First**: Always verify `git status`, current `HEAD`, and recent commits before starting. Never assume stale audit status.
3. **Change Isolation**: One commit per cohesive problem/fix. Do not refactor untouched files.
4. **Targeted Tests**: Test what was changed. Full test suite is required at release gates.
5. **Evidence Over Claims**: Never mark `PASS` without raw logs, test outputs, screenshots, or probes. Use `PARTIAL`, `BLOCKED`, or `NOT_TESTED` honestly.
6. **No Fake Features**: If an alignment or feature is heuristic/estimated, label it `ESTIMATED` in UI/code.
7. **Session Memory**: Update `docs/PROJECT_MEMORY.md`, `docs/MASTER_PLAN.md`, and `docs/QA_EVIDENCE.md` at the end of each session or task group.
