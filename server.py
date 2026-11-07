#!/usr/bin/env python3
"""
LYRICSTUDIO PRO - LOCAL SERVER & STATIC RUNNER
High-performance multithreaded server with full HTTP 206 Byte Range support for audio/video seeking.
"""

import http.server
import socketserver
import os
import sys
import urllib.parse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ThreadingHTTPServer(socketserver.ThreadingTCPServer, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class StudioHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and range requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.end_headers()

    def do_GET(self):
        self.handle_request(is_head=False)

    def do_HEAD(self):
        self.handle_request(is_head=True)

    def handle_request(self, is_head=False):
        parsed_path = urllib.parse.urlparse(self.path).path
        clean_path = urllib.parse.unquote(parsed_path).lstrip('/')
        if not clean_path or clean_path == '':
            clean_path = 'index.html'

        full_path = os.path.abspath(os.path.join(DIRECTORY, clean_path))

        if not full_path.startswith(DIRECTORY):
            self.send_error(403, "Forbidden")
            return

        if not os.path.exists(full_path) or os.path.isdir(full_path):
            if is_head:
                super().do_HEAD()
            else:
                super().do_GET()
            return

        file_size = os.path.getsize(full_path)
        content_type = self.guess_type(full_path)
        range_header = self.headers.get('Range')

        if range_header and range_header.startswith('bytes='):
            range_spec = range_header[6:].strip()
            parts = range_spec.split('-')
            try:
                if parts[0] == '':
                    suffix = int(parts[1])
                    start = max(0, file_size - suffix)
                    end = file_size - 1
                elif parts[1] == '':
                    start = int(parts[0])
                    end = file_size - 1
                else:
                    start = int(parts[0])
                    end = int(parts[1])

                if start > end or start >= file_size:
                    self.send_response(416, "Requested Range Not Satisfiable")
                    self.send_header('Content-Range', f'bytes */{file_size}')
                    self.send_header('Accept-Ranges', 'bytes')
                    self.end_headers()
                    return

                end = min(end, file_size - 1)
                content_length = end - start + 1

                self.send_response(206, "Partial Content")
                self.send_header('Content-Type', content_type)
                self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
                self.send_header('Content-Length', str(content_length))
                self.send_header('Cache-Control', 'no-cache')
                self.end_headers()

                if not is_head:
                    with open(full_path, 'rb') as f:
                        f.seek(start)
                        bytes_left = content_length
                        chunk_size = 64 * 1024
                        while bytes_left > 0:
                            chunk = f.read(min(chunk_size, bytes_left))
                            if not chunk:
                                break
                            self.wfile.write(chunk)
                            bytes_left -= len(chunk)
                return
            except (ValueError, IndexError):
                pass
            except (ConnectionResetError, BrokenPipeError):
                return

        try:
            self.send_response(200, "OK")
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(file_size))
            self.send_header('Accept-Ranges', 'bytes')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()

            if not is_head:
                with open(full_path, 'rb') as f:
                    chunk_size = 64 * 1024
                    while True:
                        chunk = f.read(chunk_size)
                        if not chunk:
                            break
                        self.wfile.write(chunk)
        except (ConnectionResetError, BrokenPipeError):
            return

    def guess_type(self, path):
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
            return 'application/javascript; charset=utf-8'
        elif path.endswith('.css'):
            return 'text/css; charset=utf-8'
        elif path.endswith('.html'):
            return 'text/html; charset=utf-8'
        elif path.endswith('.json'):
            return 'application/json; charset=utf-8'
        return super().guess_type(path)

    def log_message(self, format, *args):
        # Keep terminal log informative but concise
        if '206' in str(args) or '404' in str(args) or '500' in str(args):
            super().log_message(format, *args)

def run_server(port=PORT):
    for p in [port, 5001, 8080, 8000]:
        try:
            httpd = ThreadingHTTPServer(("", p), StudioHTTPHandler)
            print("==================================================")
            print(f"  LYRICSTUDIO PRO SERVER RUNNING (HTTP 206 SEEK SUPPORTED)")
            print(f"  URL: http://localhost:{p}")
            print(f"  Root: {DIRECTORY}")
            print("==================================================")
            httpd.serve_forever()
            break
        except OSError:
            print(f"Port {p} in use, trying next port...")

if __name__ == '__main__':
    run_server()
