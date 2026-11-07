import zipfile, xml.etree.ElementTree as ET, re, sys
sys.stdout.reconfigure(encoding='utf-8')

xlsx_path = r'C:\Users\dtron\Downloads\Bổ sung thêm thời gian ngân của từng từ vào nội d....xlsx'
excel_words = []
with zipfile.ZipFile(xlsx_path, 'r') as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            text = ''.join(t.text for t in si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text)
            shared_strings.append(text)
    
    tree = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
    ns = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    rows = tree.findall('.//s:row', ns)
    for r in rows[1:]:
        cells = {}
        for c in r.findall('s:c', ns):
            col_letter = ''.join(filter(str.isalpha, c.get('r')))
            val_elem = c.find('s:v', ns)
            val = val_elem.text if val_elem is not None else ''
            if c.get('t') == 's' and val.isdigit():
                val = shared_strings[int(val)]
            cells[col_letter] = val
        excel_words.append({
            'word': cells.get('A', ''),
            'start': cells.get('B', ''),
            'end': cells.get('C', ''),
            'sustain': cells.get('D', ''),
            'note': cells.get('E', '')
        })

def parse_time(ts):
    if not ts: return 0.0
    ts = ts.strip()
    parts = ts.split(':')
    if len(parts) == 2:
        return float(parts[0]) * 60 + float(parts[1])
    return float(ts)

print("=== EXCEL TIMELINE IN SECONDS ===")
for i, ew in enumerate(excel_words):
    st = parse_time(ew['start'])
    et = parse_time(ew['end'])
    print(f"Excel {i+1:2d}: {ew['word']:10s} [{st:6.2f}s -> {et:6.2f}s] sust={ew['sustain']:5s} | note={ew['note']}")

# Now check preset_ganh_hao.js words from gh_18 onwards
with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\preset_ganh_hao.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find words in gh_18 to gh_23
print("\n=== PRESET_GANH_HAO.JS WORDS FROM GH_18 ONWARDS ===")
pattern = r'\{\s*"text":\s*"([^"]+)",\s*"start":\s*([0-9\.]+),\s*"end":\s*([0-9\.]+)(?:,\s*"sustain":\s*([0-9\.]+))?'
# Let's inspect each word in preset
gh_matches = re.finditer(r'"id":\s*"(gh_\d+)"', text)
gh_positions = [(m.group(1), m.start()) for m in gh_matches]

for sid, pos in gh_positions:
    if int(sid.replace('gh_', '')) >= 18:
        # find lines in this block
        print(f"\n--- {sid} ---")
        # search word objects
        sub = text[pos:pos+1500]
        # find all words
        words = re.findall(r'\{\s*"text":\s*"([^"]+)",\s*"start":\s*([0-9\.]+),\s*"end":\s*([0-9\.]+)', sub)
        for w, s, e in words:
            print(f"  Preset word: {w:10s} [{float(s):6.2f}s -> {float(e):6.2f}s]")
