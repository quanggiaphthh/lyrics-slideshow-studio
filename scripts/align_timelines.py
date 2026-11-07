import json, csv, sys, zipfile, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

# 1. Load Whisper transcription
with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\scripts\full_whisper_transcription.json', 'r', encoding='utf-8') as f:
    whisper_data = json.load(f)

# 2. Load CSV
csv_path = r'C:\Users\dtron\Downloads\TIMELINE_TUNG_TU_CON_THUONG_SAC_HOA_CHUNG_TINH_SO_BO.csv'
with open(csv_path, 'r', encoding='utf-8-sig') as f:
    csv_rows = list(csv.reader(f))[1:]

# 3. Load Excel
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

print("=== WHISPER SEGMENTS ===")
for i, seg in enumerate(whisper_data):
    print(f"Seg {i+1:2d} [{seg['start']:6.2f}s -> {seg['end']:6.2f}s]: {seg['text']}")
    # print first 3 words
    w_sample = " | ".join(f"{w['word']}({w['start']}-{w['end']})" for w in seg['words'][:5])
    print(f"       {w_sample}")
