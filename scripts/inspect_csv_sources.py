import csv, sys
sys.stdout.reconfigure(encoding='utf-8')

csv_path = r'C:\Users\dtron\Downloads\TIMELINE_TUNG_TU_CON_THUONG_SAC_HOA_CHUNG_TINH_SO_BO.csv'
with open(csv_path, 'r', encoding='utf-8-sig') as f:
    rows = list(csv.reader(f))

header = rows[0]
print("Header:", header)

# Check distinct values of column 6 'Căn cứ cụm' and col 7 'Độ tin cậy mốc từ'
can_cu = set()
do_tin_cay = set()
for r in rows[1:]:
    if len(r) >= 8:
        can_cu.add(r[6])
        do_tin_cay.add(r[7])

print("Căn cứ cụm values:", can_cu)
print("Độ tin cậy values:", do_tin_cay)

# Print row ranges for each 'Căn cứ cụm'
ranges = {}
for i, r in enumerate(rows[1:], start=1):
    cc = r[6] if len(r) >= 7 else ''
    if cc not in ranges:
        ranges[cc] = [i, i, r[2], r[3]]
    else:
        ranges[cc][1] = i
        ranges[cc][3] = r[3]

for cc, (st_i, en_i, st_t, en_t) in ranges.items():
    print(f"  [{cc}]: rows {st_i} -> {en_i} (time: {st_t} -> {en_t})")
