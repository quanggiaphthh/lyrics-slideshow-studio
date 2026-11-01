#!/usr/bin/env python3
"""
LYRICSTUDIO PRO - LOCAL SERVER & STATIC RUNNER
Provides zero-configuration local server with optimized streaming headers for audio and canvas assets.
"""

import http.server
import socketserver
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class StudioHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and smooth audio streaming
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        # Ensure correct MIME types for audio and video
        if path.endswith('.mp3'):
            return 'audio/mpeg'
        elif path.endswith('.wav'):
            return 'audio/wav'
        elif path.endswith('.m4a'):
            return 'audio/mp4'
        elif path.endswith('.webm'):
            return 'video/webm'
        elif path.endswith('.mp4'):
            return 'video/mp4'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        return super().guess_type(path)

def run_server(port=PORT):
    socketserver.TCPServer.allow_reuse_address = True
    for p in [port, 5001, 8080, 8000]:
        try:
            with socketserver.TCPServer(("", p), StudioHTTPHandler) as httpd:
                print("==================================================")
                print(f"  LYRICSTUDIO PRO SERVER RUNNING")
                print(f"  URL: http://localhost:{p}")
                print(f"  Root: {DIRECTORY}")
                print("==================================================")
                httpd.serve_forever()
                break
        except OSError:
            print(f"Port {p} in use, trying next port...")

if __name__ == '__main__':
    run_server()

