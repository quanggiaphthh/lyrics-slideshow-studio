import csv, sys
sys.stdout.reconfigure(encoding='utf-8')

csv_path = r'C:\Users\dtron\Downloads\TIMELINE_TUNG_TU_CON_THUONG_SAC_HOA_CHUNG_TINH_SO_BO.csv'
with open(csv_path, 'r', encoding='utf-8-sig') as f:
    reader = list(csv.reader(f))

clusters = []
for r in reader[1:]:
    stt, word, start, end, sustain, phrase, basis, conf = r[:8]
    if not clusters or clusters[-1]['phrase'] != phrase:
        clusters.append({'phrase': phrase, 'words': []})
    clusters[-1]['words'].append({'stt': stt, 'word': word, 'start': start, 'end': end, 'sustain': sustain})

print(f'Total phrases: {len(clusters)}')
for i, c in enumerate(clusters):
    w_str = ' '.join(w['word'] for w in c['words'])
    t_start = c['words'][0]['start']
    t_end = c['words'][-1]['end']
    print(f'Phrase {i+1} [{t_start} -> {t_end}]: "{w_str}"')
