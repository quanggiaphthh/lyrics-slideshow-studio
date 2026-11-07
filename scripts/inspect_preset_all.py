import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\preset_ganh_hao.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_stanza = None
for idx, line in enumerate(lines):
    m_id = re.search(r'"id":\s*"(gh_\d+)"', line)
    if m_id:
        current_stanza = m_id.group(1)
    m_start = re.search(r'"start":\s*([0-9\.]+)', line)
    m_end = re.search(r'"end":\s*([0-9\.]+)', line)
    m_text = re.search(r'"text":\s*"([^"]+)"', line)
    if current_stanza and m_text and not line.strip().startswith('//') and 'DEMO_PRESET' not in line:
        # Check if line before had "start"
        print(f"[{idx+1}] {current_stanza}: {line.strip()}")
