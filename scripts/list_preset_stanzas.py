import json, re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\preset_ganh_hao.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract wordsData array by finding 'wordsData: [' to the end
idx_start = text.find('wordsData: [')
if idx_start != -1:
    sub = text[idx_start + len('wordsData: ['):]
    # Find matching closing bracket before the last closing of DEMO_PRESET_GANH_HAO
    # Let's use regex to find each stanza object
    stanzas = []
    # Each stanza starts with { "id": "gh_..."
    pattern = r'\{\s*"id":\s*"(gh_\d+)",\s*"start":\s*([0-9\.]+),\s*"end":\s*([0-9\.]+),\s*"layout":\s*"([^"]+)",\s*"text":\s*"([^"]+)"'
    for m in re.finditer(pattern, sub):
        sid, sstart, send, slayout, stext = m.groups()
        stanzas.append((sid, float(sstart), float(send), slayout, stext))

print(f"Stanzas in preset_ganh_hao.js ({len(stanzas)} total):")
for sid, sstart, send, slayout, stext in stanzas:
    print(f"  {sid:5s} [{sstart:6.2f}s -> {send:6.2f}s] {stext[:50]}")
