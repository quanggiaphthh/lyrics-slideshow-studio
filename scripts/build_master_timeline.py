import json, sys, os, zipfile, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

# Read Excel file
xlsx_path = r'C:\Users\dtron\Downloads\Bổ sung thêm thời gian ngân của từng từ vào nội d....xlsx'
excel_dict = {}
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
        w = cells.get('A', '').strip()
        st_str = cells.get('B', '').strip()
        et_str = cells.get('C', '').strip()
        sust_str = cells.get('D', '').strip()
        note_str = cells.get('E', '').strip()
        if w and st_str:
            def to_sec(s):
                p = s.split(':')
                return float(p[0])*60 + float(p[1]) if len(p)==2 else float(s)
            excel_dict[w.lower().replace('.', '')] = {
                'raw_word': w,
                'start': to_sec(st_str),
                'end': to_sec(et_str),
                'sustain': float(sust_str.replace('s', '')) if sust_str else None,
                'note': note_str
            }

print(f"Loaded {len(excel_dict)} entries from Excel file.")

# Load Whisper transcription
with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\scripts\full_whisper_transcription.json', 'r', encoding='utf-8') as f:
    whisper_data = json.load(f)

print(f"Loaded {len(whisper_data)} Whisper segments.")
