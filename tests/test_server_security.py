#!/usr/bin/env python3
"""
TEST SUITE: S01 & S02 - Server Security, Containment & HTTP 206 Streaming
"""

import unittest
import urllib.request
import urllib.error
import threading
import time
import socket
from pathlib import Path
import sys

# Import server components
ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))
import server

class TestServerSecurity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_port = 5892
        cls.test_host = '127.0.0.1'
        cls.httpd = server.ThreadingHTTPServer((cls.test_host, cls.test_port), server.StudioHTTPHandler)
        cls.server_thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.server_thread.start()
        time.sleep(0.5)

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()

    def get_url(self, path):
        return f"http://{self.test_host}:{self.test_port}{path}"

    # S01: Path Traversal Tests
    def test_s01_path_traversal_dot_dot(self):
        """Test ../ traversal blocked with 403 or 404"""
        for bad_path in ['/../server.py', '/../../windows/win.ini', '/assets/../../server.py']:
            with self.subTest(path=bad_path):
                req = urllib.request.Request(self.get_url(bad_path))
                with self.assertRaises(urllib.error.HTTPError) as ctx:
                    urllib.request.urlopen(req)
                self.assertIn(ctx.exception.code, [403, 404])

    def test_s01_path_traversal_url_encoded(self):
        """Test %2e%2e URL-encoded traversal blocked"""
        for bad_path in ['/%2e%2e/server.py', '/assets/%2e%2e/%2e%2e/server.py']:
            with self.subTest(path=bad_path):
                req = urllib.request.Request(self.get_url(bad_path))
                with self.assertRaises(urllib.error.HTTPError) as ctx:
                    urllib.request.urlopen(req)
                self.assertIn(ctx.exception.code, [403, 404])

    def test_s01_block_git_directory(self):
        """Test .git directory access blocked with 403"""
        for git_path in ['/.git/config', '/.git/HEAD']:
            with self.subTest(path=git_path):
                req = urllib.request.Request(self.get_url(git_path))
                with self.assertRaises(urllib.error.HTTPError) as ctx:
                    urllib.request.urlopen(req)
                self.assertEqual(ctx.exception.code, 403)

    def test_s01_valid_file_served(self):
        """Test normal static files served with 200"""
        req = urllib.request.Request(self.get_url('/index.html'))
        with urllib.request.urlopen(req) as resp:
            self.assertEqual(resp.status, 200)
            content = resp.read()
            self.assertIn(b'LyricStudio Pro', content)

    # S02: HTTP 206 Byte Range Streaming Tests
    def test_s02_http_range_bytes_valid(self):
        """Test HTTP 206 Partial Content for audio seeking"""
        req = urllib.request.Request(self.get_url('/index.html'), headers={'Range': 'bytes=0-99'})
        with urllib.request.urlopen(req) as resp:
            self.assertEqual(resp.status, 206)
            self.assertEqual(resp.headers.get('Content-Range'), f"bytes 0-99/{Path(ROOT_DIR / 'index.html').stat().st_size}")
            data = resp.read()
            self.assertEqual(len(data), 100)

    def test_s02_http_range_suffix(self):
        """Test HTTP 206 with suffix range (e.g. -500 for last 500 bytes)"""
        file_size = Path(ROOT_DIR / 'index.html').stat().st_size
        req = urllib.request.Request(self.get_url('/index.html'), headers={'Range': 'bytes=-50'})
        with urllib.request.urlopen(req) as resp:
            self.assertEqual(resp.status, 206)
            data = resp.read()
            self.assertEqual(len(data), 50)

    def test_s02_http_range_out_of_bounds(self):
        """Test HTTP 416 Range Not Satisfiable"""
        req = urllib.request.Request(self.get_url('/index.html'), headers={'Range': 'bytes=999999999-1000000000'})
        with self.assertRaises(urllib.error.HTTPError) as ctx:
            urllib.request.urlopen(req)
        self.assertEqual(ctx.exception.code, 416)

    def test_s02_head_request(self):
        """Test HEAD request returns headers without body"""
        req = urllib.request.Request(self.get_url('/index.html'), method='HEAD')
        with urllib.request.urlopen(req) as resp:
            self.assertEqual(resp.status, 200)
            self.assertTrue(resp.headers.get('Content-Length'))
            self.assertEqual(len(resp.read()), 0)

if __name__ == '__main__':
    unittest.main()
