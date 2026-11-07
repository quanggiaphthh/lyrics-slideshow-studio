import json, re, sys, zipfile, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

# Read Excel
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

# Read preset_ganh_hao.js
with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\preset_ganh_hao.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Read audited_timeline.json
with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\audited_timeline.json', 'r', encoding='utf-8') as f:
    audited = json.load(f)

# Let's check audited_timeline.json for the climax
print("=== AUDITED_TIMELINE.JSON LAST ENTRIES ===")
for sec in audited[-10:]:
    print(f"Sec: {sec.get('sec')} | Phrase: {sec.get('phrase')}")
    for w in sec.get('words', []):
        print(f"   {w.get('w')} [{w.get('start')} -> {w.get('end')}] sust={w.get('sustain')} note={w.get('note')}")
