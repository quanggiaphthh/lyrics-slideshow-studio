import subprocess, time, json, base64, urllib.request, os, sys
sys.stdout.reconfigure(encoding='utf-8')

# Run Chrome headless with remote debugging
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
if not os.path.exists(chrome_path):
    chrome_path = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'

cmd = [
    chrome_path,
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,720',
    'http://localhost:5000'
]

proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(3)

try:
    # Get WebSocket debugger URL
    tabs = json.loads(urllib.request.urlopen('http://localhost:9222/json').read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    print(f"Connected to Chrome page: {tabs[0]['title']}")

    import websocket
    ws = websocket.create_connection(ws_url)

    msg_id = 0
    def send_cdp(method, params=None):
        global msg_id
        msg_id += 1
        msg = {'id': msg_id, 'method': method, 'params': params or {}}
        ws.send(json.dumps(msg))
        while True:
            res = json.loads(ws.recv())
            if res.get('id') == msg_id:
                return res.get('result', {})

    send_cdp('Page.enable')
    send_cdp('Runtime.enable')

    # Wait for page to finish loading preset
    time.sleep(2)

    # Check state
    eval_res = send_cdp('Runtime.evaluate', {
        'expression': 'JSON.stringify({ preset: !!window.DEMO_PRESET_GANH_HAO, stanzasCount: state.parsedStanzas ? state.parsedStanzas.length : 0, firstStanza: state.parsedStanzas ? state.parsedStanzas[0] : null, climaxStanza: state.parsedStanzas ? state.parsedStanzas[18] : null })'
    })
    info = json.loads(eval_res.get('result', {}).get('value', '{}'))
    print("State Info:", json.dumps(info, ensure_ascii=False, indent=2))

    # Test seek to 4.5s (Intro)
    send_cdp('Runtime.evaluate', {'expression': 'seekAudio(4.5); if (window.renderFinnxiii) window.renderFinnxiii(stageCtx, 4.5, 1280, 720);'})
    time.sleep(0.5)
    scr = send_cdp('Page.captureScreenshot')
    with open('test_sync_4s.png', 'wb') as f:
        f.write(base64.b64decode(scr['data']))
    print("Saved test_sync_4s.png")

    # Test seek to 19s (Sổ lồng)
    send_cdp('Runtime.evaluate', {'expression': 'seekAudio(19.0); if (window.renderFinnxiii) window.renderFinnxiii(stageCtx, 19.0, 1280, 720);'})
    time.sleep(0.5)
    scr = send_cdp('Page.captureScreenshot')
    with open('test_sync_19s.png', 'wb') as f:
        f.write(base64.b64decode(scr['data']))
    print("Saved test_sync_19s.png")

    # Test seek to 286.5s (04:46.5 Dòng nhớ trong tim)
    send_cdp('Runtime.evaluate', {'expression': 'seekAudio(286.5); if (window.renderFinnxiii) window.renderFinnxiii(stageCtx, 286.5, 1280, 720);'})
    time.sleep(0.5)
    scr = send_cdp('Page.captureScreenshot')
    with open('test_sync_286s.png', 'wb') as f:
        f.write(base64.b64decode(scr['data']))
    print("Saved test_sync_286s.png")

    # Test seek to 322s (05:22 VẪN HOÀI...)
    send_cdp('Runtime.evaluate', {'expression': 'seekAudio(322.0); if (window.renderFinnxiii) window.renderFinnxiii(stageCtx, 322.0, 1280, 720);'})
    time.sleep(0.5)
    scr = send_cdp('Page.captureScreenshot')
    with open('test_sync_322s.png', 'wb') as f:
        f.write(base64.b64decode(scr['data']))
    print("Saved test_sync_322s.png")

    ws.close()
finally:
    proc.terminate()
    print("Chrome terminated.")
