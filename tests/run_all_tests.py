#!/usr/bin/env python3
"""
Comprehensive, Portable Canonical Test Runner for Lyrics Slideshow Studio.
Runs all security, timeline, export, persistence, and UX test suites.
"""

import subprocess
import sys
import os
import time
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent

TEST_SUITES = [
    {
        "id": "SEC-01",
        "name": "Server Path Traversal & LAN Exposure",
        "cmd": [sys.executable, str(ROOT_DIR / "tests" / "test_server_security.py")]
    },
    {
        "id": "SEC-02",
        "name": "DOM Injection & XSS Sanitization",
        "cmd": ["node", str(ROOT_DIR / "tests" / "test_dom_security.mjs")]
    },
    {
        "id": "TIM-01",
        "name": "Active Stanza Resolution & 23/23 Transitions Overlap",
        "cmd": ["node", str(ROOT_DIR / "tests" / "test_stanza_transitions.mjs")]
    },
    {
        "id": "TIM-02/03/04",
        "name": "Timeline Provenance, Sustain Duration & Audio SHA-256",
        "cmd": ["node", str(ROOT_DIR / "tests" / "test_timeline_provenance.mjs")]
    },
    {
        "id": "DATA-01/02",
        "name": "IndexedDB MediaStore, Draft Recovery & Schema Validation",
        "cmd": ["node", str(ROOT_DIR / "tests" / "test_persistence.mjs")]
    },
    {
        "id": "UX-01/02/03",
        "name": "Transitions, Safe Areas, Word Nudge & Metadata Separation",
        "cmd": ["node", str(ROOT_DIR / "tests" / "test_ux_features.mjs")]
    },
    {
        "id": "EXP-03",
        "name": "ffprobe Video Codec, Actual Framerate & AAC Audio Probe",
        "cmd": ["node", str(ROOT_DIR / "tests" / "test_ffprobe_export.mjs")]
    }
]

def main():
    print("=" * 70)
    print("LYRICS SLIDESHOW STUDIO - CANONICAL TEST RUNNER (GATE G6)")
    print(f"Working Directory: {ROOT_DIR}")
    print(f"Python Executable: {sys.executable}")
    print("=" * 70)
    print()

    passed = 0
    failed = 0
    results = []

    for suite in TEST_SUITES:
        print(f"==> RUNNING [{suite['id']}] {suite['name']}...")
        start_time = time.time()
        try:
            res = subprocess.run(
                suite["cmd"],
                cwd=str(ROOT_DIR),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                timeout=120
            )
            elapsed = time.time() - start_time
            if res.returncode == 0:
                print(f"    RESULT: PASS ({elapsed:.2f}s)")
                passed += 1
                results.append((suite["id"], suite["name"], "PASS", elapsed, ""))
            else:
                print(f"    RESULT: FAIL (exit code {res.returncode})")
                print("--- Output ---")
                print(res.stdout[-1000:] if len(res.stdout) > 1000 else res.stdout)
                print("--------------")
                failed += 1
                results.append((suite["id"], suite["name"], "FAIL", elapsed, res.stdout))
        except Exception as e:
            elapsed = time.time() - start_time
            print(f"    RESULT: ERROR ({e})")
            failed += 1
            results.append((suite["id"], suite["name"], "ERROR", elapsed, str(e)))
        print()

    print("=" * 70)
    print("FINAL TEST SUMMARY")
    print("=" * 70)
    for suite_id, name, status, elapsed, _ in results:
        status_str = f"[\033[92m{status}\033[0m]" if status == "PASS" else f"[\033[91m{status}\033[0m]"
        print(f" {status:5s} | {suite_id:15s} | {elapsed:5.2f}s | {name}")

    print("-" * 70)
    print(f"Total Suites: {len(TEST_SUITES)} | Passed: {passed} | Failed: {failed}")
    print("=" * 70)

    if failed > 0:
        sys.exit(1)
    else:
        print("\nAll canonical verification suites PASSED! Ready for release gate.")
        sys.exit(0)

if __name__ == "__main__":
    main()
