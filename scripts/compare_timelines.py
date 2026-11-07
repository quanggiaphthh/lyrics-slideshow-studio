import csv, sys, zipfile, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

csv_path = r'C:\Users\dtron\Downloads\TIMELINE_TUNG_TU_CON_THUONG_SAC_HOA_CHUNG_TINH_SO_BO.csv'
xlsx_path = r'C:\Users\dtron\Downloads\Bổ sung thêm thời gian ngân của từng từ vào nội d....xlsx'

# Parse Excel
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
    for r in rows[1:]: # Skip header
        cells = {}
        for c in r.findall('s:c', ns):
            col_letter = ''.join(filter(str.isalpha, c.get('r')))
            val_elem = c.find('s:v', ns)
            val = val_elem.text if val_elem is not None else ''
            if c.get('t') == 's' and val.isdigit():
                val = shared_strings[int(val)]
            cells[col_letter] = val
        # A: Word, B: Start, C: End, D: Sustain, E: Note
        excel_words.append({
            'word': cells.get('A', ''),
            'start': cells.get('B', ''),
            'end': cells.get('C', ''),
            'sustain': cells.get('D', ''),
            'note': cells.get('E', '')
        })

print(f"Excel words count: {len(excel_words)}")
for ew in excel_words[:5]:
    print("  EW:", ew)

# Parse CSV
with open(csv_path, 'r', encoding='utf-8-sig') as f:
    csv_rows = list(csv.reader(f))[1:]

print(f"CSV words count: {len(csv_rows)}")
# Look at CSV words near 04:44
for i, r in enumerate(csv_rows):
    if r[2] >= '04:44.0':
        print(f"  CSV {i+1} [{r[2]} -> {r[3]}]: '{r[1]}' (sustain: {r[4]}s, phrase: '{r[5]}')")
