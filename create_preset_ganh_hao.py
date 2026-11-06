import json, os, sys
sys.stdout.reconfigure(encoding='utf-8')

raw_stanzas_def = [
  # 0. Hò mở đầu 1
  {
    "id": "gh_0", "start": 14.5, "end": 28.5,
    "lines": [
      {"text": "HÒ ƠI...", "start": 14.5, "end": 18.0, "indent": 0, "upper": ["HÒ", "ƠI..."]},
      {"text": "ai xuôi con sáo", "start": 18.2, "end": 21.6, "indent": 1},
      {"text": "SỔ LỒNG,", "start": 21.8, "end": 24.6, "indent": 2, "upper": ["SỔ", "LỒNG,"], "highlight": ["SỔ", "LỒNG,"]},
      {"text": "cho em nỡ vội", "start": 24.8, "end": 28.2, "indent": 3}
    ]
  },
  # 1. Hò mở đầu 2
  {
    "id": "gh_1", "start": 28.8, "end": 48.0,
    "lines": [
      {"text": "HÒ ƠI...", "start": 29.0, "end": 33.5, "indent": 0, "upper": ["HÒ", "ƠI..."]},
      {"text": "cho em nỡ vội", "start": 34.0, "end": 38.5, "indent": 1},
      {"text": "LẤY CHỒNG", "start": 39.0, "end": 43.5, "indent": 2, "upper": ["LẤY", "CHỒNG"], "highlight": ["LẤY", "CHỒNG"]},
      {"text": "BỎ ANH...", "start": 44.0, "end": 47.8, "indent": 3, "upper": ["BỎ", "ANH..."]}
    ]
  },
  # 2. Lời 1 - Khổ 1
  {
    "id": "gh_2", "start": 78.5, "end": 85.0,
    "lines": [
      {"text": "sáo bay theo chồng", "start": 78.5, "end": 80.6, "indent": 0},
      {"text": "đâu biết là", "start": 80.7, "end": 82.0, "indent": 1},
      {"text": "ĐAU LÒNG", "start": 82.1, "end": 83.5, "indent": 2, "upper": ["ĐAU", "LÒNG"], "highlight": ["ĐAU", "LÒNG"]},
      {"text": "ANH LẮM", "start": 83.6, "end": 84.8, "indent": 3, "upper": ["ANH", "LẮM"]}
    ]
  },
  # 3. Lời 1 - Khổ 2
  {
    "id": "gh_3", "start": 85.2, "end": 92.5,
    "lines": [
      {"text": "xót xa lặng thầm", "start": 85.2, "end": 87.8, "indent": 0},
      {"text": "nhìn theo bước em", "start": 88.0, "end": 90.2, "indent": 1},
      {"text": "QUA CẦU", "start": 90.3, "end": 92.2, "indent": 2, "upper": ["QUA", "CẦU"], "highlight": ["QUA", "CẦU"]}
    ]
  },
  # 4. Lời 1 - Khổ 3
  {
    "id": "gh_4", "start": 92.8, "end": 99.5,
    "lines": [
      {"text": "ngày nào có nhau", "start": 92.8, "end": 95.0, "indent": 0},
      {"text": "ta trao ước hẹn", "start": 95.2, "end": 97.2, "indent": 1},
      {"text": "TRẦU CAU", "start": 97.4, "end": 99.2, "indent": 2, "upper": ["TRẦU", "CAU"], "highlight": ["TRẦU", "CAU"]}
    ]
  },
  # 5. Lời 1 - Khổ 4
  {
    "id": "gh_5", "start": 99.8, "end": 106.8,
    "lines": [
      {"text": "mong duyên ban đầu", "start": 99.8, "end": 102.2, "indent": 0},
      {"text": "trời thương", "start": 102.4, "end": 103.8, "indent": 1},
      {"text": "không đổ MƯA NGÂU", "start": 104.0, "end": 106.5, "indent": 2, "upper": ["MƯA", "NGÂU"], "highlight": ["MƯA", "NGÂU"]}
    ]
  },
  # 6. Lời 1 - Khổ 5
  {
    "id": "gh_6", "start": 107.0, "end": 114.0,
    "lines": [
      {"text": "bóng em xa dần", "start": 107.0, "end": 109.2, "indent": 0},
      {"text": "ANH biết là", "start": 109.4, "end": 111.0, "indent": 1, "upper": ["ANH"]},
      {"text": "một lần CHIA CÁCH", "start": 111.2, "end": 113.8, "indent": 2, "upper": ["CHIA", "CÁCH"], "highlight": ["CHIA", "CÁCH"]}
    ]
  },
  # 7. Lời 1 - Khổ 6
  {
    "id": "gh_7", "start": 114.2, "end": 121.2,
    "lines": [
      {"text": "trách ai vô tình", "start": 114.2, "end": 116.5, "indent": 0},
      {"text": "đành tâm", "start": 116.7, "end": 118.0, "indent": 1},
      {"text": "XẺ ĐÔI", "start": 118.2, "end": 119.5, "indent": 2, "upper": ["XẺ", "ĐÔI"], "highlight": ["XẺ", "ĐÔI"]},
      {"text": "TIM MÌNH", "start": 119.6, "end": 121.0, "indent": 3, "upper": ["TIM", "MÌNH"]}
    ]
  },
  # 8. Lời 1 - Khổ 7
  {
    "id": "gh_8", "start": 121.5, "end": 128.5,
    "lines": [
      {"text": "dặn lòng cố quên", "start": 121.5, "end": 123.8, "indent": 0},
      {"text": "sao đêm vẫn thường", "start": 124.0, "end": 126.0, "indent": 1},
      {"text": "gọi tên EM", "start": 126.2, "end": 128.2, "indent": 2, "upper": ["EM"], "highlight": ["EM"]}
    ]
  },
  # 9. Lời 1 - Khổ 8
  {
    "id": "gh_9", "start": 128.8, "end": 141.0,
    "lines": [
      {"text": "ai ru trong chiều", "start": 128.8, "end": 131.5, "indent": 0},
      {"text": "cho lòng càng nhớ", "start": 131.8, "end": 134.5, "indent": 1},
      {"text": "EM NHIỀU...", "start": 134.8, "end": 140.5, "indent": 2, "upper": ["EM", "NHIỀU..."], "highlight": ["EM", "NHIỀU..."]}
    ]
  },
  # 10. Điệp khúc 1 - Khổ 1
  {
    "id": "gh_10", "start": 144.5, "end": 156.8,
    "lines": [
      {"text": "À ƠI...", "start": 144.5, "end": 147.2, "indent": 0, "upper": ["À", "ƠI..."]},
      {"text": "EM nỡ sao em", "start": 147.4, "end": 149.8, "indent": 1, "upper": ["EM"]},
      {"text": "bỏ anh một mình", "start": 150.0, "end": 152.0, "indent": 2},
      {"text": "LỤC BÌNH TRÔI", "start": 152.2, "end": 154.5, "indent": 3, "upper": ["LỤC", "BÌNH", "TRÔI"], "highlight": ["LỤC", "BÌNH", "TRÔI"]},
      {"text": "chẳng biết nơi neo", "start": 154.7, "end": 156.5, "indent": 4}
    ]
  },
  # 11. Điệp khúc 1 - Khổ 2
  {
    "id": "gh_11", "start": 157.0, "end": 165.8,
    "lines": [
      {"text": "CÒN THƯƠNG", "start": 157.0, "end": 158.8, "indent": 0, "upper": ["CÒN", "THƯƠNG"]},
      {"text": "tóc em buông dài", "start": 159.0, "end": 160.8, "indent": 1},
      {"text": "TÍM HOA", "start": 161.0, "end": 162.2, "indent": 2, "upper": ["TÍM", "HOA"], "highlight": ["TÍM", "HOA"]},
      {"text": "anh cài em cười", "start": 162.4, "end": 163.8, "indent": 3},
      {"text": "XIẾT CHẶT VÒNG TAY", "start": 164.0, "end": 165.6, "indent": 4, "upper": ["XIẾT", "CHẶT", "VÒNG", "TAY"]}
    ]
  },
  # 12. Điệp khúc 1 - Khổ 3
  {
    "id": "gh_12", "start": 166.0, "end": 184.5,
    "lines": [
      {"text": "À ƠI...", "start": 166.0, "end": 170.0, "indent": 0, "upper": ["À", "ƠI..."]},
      {"text": "nói thương anh nhiều", "start": 170.5, "end": 174.0, "indent": 1},
      {"text": "đành lòng EM", "start": 174.5, "end": 177.0, "indent": 2, "upper": ["EM"]},
      {"text": "CẤT BƯỚC", "start": 177.5, "end": 180.5, "indent": 3, "upper": ["CẤT", "BƯỚC"], "highlight": ["CẤT", "BƯỚC"]},
      {"text": "SANG SÔNG...", "start": 181.0, "end": 184.2, "indent": 4, "upper": ["SANG", "SÔNG..."]}
    ]
  },
  # 13. Điệp khúc 1 - Khổ 4
  {
    "id": "gh_13", "start": 185.0, "end": 198.0,
    "lines": [
      {"text": "vì đâu dở dang duyên mình", "start": 185.0, "end": 188.5, "indent": 0},
      {"text": "SẮC HOA CHUNG TÌNH", "start": 188.8, "end": 192.5, "indent": 1, "upper": ["SẮC", "HOA", "CHUNG", "TÌNH"], "highlight": ["SẮC", "HOA", "CHUNG", "TÌNH"]},
      {"text": "chưa phai màu", "start": 192.8, "end": 194.8, "indent": 2},
      {"text": "NỠ NÀO NGƯỜI ĐI", "start": 195.0, "end": 197.8, "indent": 3, "upper": ["NỠ", "NÀO", "NGƯỜI", "ĐI"]}
    ]
  },
  # 14. Điệp khúc 2 - Cao trào 1
  {
    "id": "gh_14", "start": 228.5, "end": 242.0,
    "lines": [
      {"text": "À ƠI...", "start": 228.5, "end": 231.2, "indent": 0, "upper": ["À", "ƠI..."]},
      {"text": "EM nỡ sao em", "start": 231.5, "end": 234.0, "indent": 1, "upper": ["EM"]},
      {"text": "bỏ anh một mình", "start": 234.2, "end": 236.8, "indent": 2},
      {"text": "LỤC BÌNH TRÔI", "start": 237.0, "end": 239.5, "indent": 3, "upper": ["LỤC", "BÌNH", "TRÔI"], "highlight": ["LỤC", "BÌNH", "TRÔI"]},
      {"text": "chẳng biết nơi neo", "start": 239.8, "end": 241.8, "indent": 4}
    ]
  },
  # 15. Điệp khúc 2 - Cao trào 2
  {
    "id": "gh_15", "start": 242.2, "end": 253.8,
    "lines": [
      {"text": "CÒN THƯƠNG", "start": 242.2, "end": 244.5, "indent": 0, "upper": ["CÒN", "THƯƠNG"]},
      {"text": "tóc em buông dài", "start": 244.8, "end": 247.2, "indent": 1},
      {"text": "TÍM HOA", "start": 247.5, "end": 249.2, "indent": 2, "upper": ["TÍM", "HOA"], "highlight": ["TÍM", "HOA"]},
      {"text": "anh cài em cười", "start": 249.5, "end": 251.2, "indent": 3},
      {"text": "XIẾT CHẶT VÒNG TAY", "start": 251.5, "end": 253.5, "indent": 4, "upper": ["XIẾT", "CHẶT", "VÒNG", "TAY"]}
    ]
  },
  # 16. Điệp khúc 2 - Cao trào 3
  {
    "id": "gh_16", "start": 254.0, "end": 267.8,
    "lines": [
      {"text": "À ƠI...", "start": 254.0, "end": 257.5, "indent": 0, "upper": ["À", "ƠI..."]},
      {"text": "nói thương anh nhiều", "start": 258.0, "end": 261.2, "indent": 1},
      {"text": "đành lòng EM", "start": 261.5, "end": 263.5, "indent": 2, "upper": ["EM"]},
      {"text": "CẤT BƯỚC", "start": 263.8, "end": 265.8, "indent": 3, "upper": ["CẤT", "BƯỚC"], "highlight": ["CẤT", "BƯỚC"]},
      {"text": "SANG SÔNG...", "start": 266.0, "end": 267.5, "indent": 4, "upper": ["SANG", "SÔNG..."]}
    ]
  },
  # 17. Điệp khúc 2 - Cao trào 4
  {
    "id": "gh_17", "start": 268.0, "end": 281.8,
    "lines": [
      {"text": "vì đâu dở dang duyên mình", "start": 268.0, "end": 271.8, "indent": 0},
      {"text": "SẮC HOA CHUNG TÌNH", "start": 272.0, "end": 275.8, "indent": 1, "upper": ["SẮC", "HOA", "CHUNG", "TÌNH"], "highlight": ["SẮC", "HOA", "CHUNG", "TÌNH"]},
      {"text": "chưa phai màu", "start": 276.0, "end": 278.2, "indent": 2},
      {"text": "NỠ NÀO NGƯỜI ĐI", "start": 278.5, "end": 281.5, "indent": 3, "upper": ["NỠ", "NÀO", "NGƯỜI", "ĐI"]}
    ]
  },
  # 18. Đoạn kết 1
  {
    "id": "gh_18", "start": 282.0, "end": 295.5,
    "lines": [
      {"text": "dòng nhớ trong tim", "start": 282.0, "end": 287.0, "indent": 0},
      {"text": "LÀM SAO CHIA CẮT", "start": 287.5, "end": 295.0, "indent": 1, "upper": ["LÀM", "SAO", "CHIA", "CẮT"], "highlight": ["LÀM", "SAO", "CHIA", "CẮT"]}
    ]
  },
  # 19. Đoạn kết 2
  {
    "id": "gh_19", "start": 295.8, "end": 309.5,
    "lines": [
      {"text": "người thương", "start": 295.8, "end": 301.0, "indent": 0},
      {"text": "CÓ HAY...", "start": 301.5, "end": 309.0, "indent": 1, "upper": ["CÓ", "HAY..."], "highlight": ["CÓ", "HAY..."]}
    ]
  },
  # 20. Đoạn kết 3
  {
    "id": "gh_20", "start": 310.0, "end": 324.5,
    "lines": [
      {"text": "đêm dài mình anh", "start": 310.0, "end": 314.5, "indent": 0},
      {"text": "THAO THỨC,", "start": 315.0, "end": 319.0, "indent": 1, "upper": ["THAO", "THỨC,"], "highlight": ["THAO", "THỨC,"]},
      {"text": "em giờ biết lòng buồn vui", "start": 319.5, "end": 324.0, "indent": 2}
    ]
  },
  # 21. Đoạn kết 4
  {
    "id": "gh_21", "start": 324.8, "end": 339.5,
    "lines": [
      {"text": "em về làm dâu", "start": 324.8, "end": 330.0, "indent": 0},
      {"text": "BÊN ẤY...", "start": 330.5, "end": 339.0, "indent": 1, "upper": ["BÊN", "ẤY..."], "highlight": ["BÊN", "ẤY..."]}
    ]
  },
  # 22. Đoạn kết 5 (Outro)
  {
    "id": "gh_22", "start": 339.8, "end": 352.5,
    "lines": [
      {"text": "bên này", "start": 339.8, "end": 343.0, "indent": 0},
      {"text": "vẫn hoài", "start": 343.5, "end": 346.5, "indent": 1},
      {"text": "CHỜ MONG...", "start": 347.0, "end": 352.0, "indent": 2, "upper": ["CHỜ", "MONG..."], "highlight": ["CHỜ", "MONG..."]}
    ]
  }
]

# Generate detailed word objects for every line
processed_stanzas = []
for s in raw_stanzas_def:
    stanza_text_parts = []
    lines_list = []
    for line in s["lines"]:
        words_raw = line["text"].split()
        stanza_text_parts.append(line["text"])
        line_start = line["start"]
        line_end = line["end"]
        line_dur = max(0.4, line_end - line_start)
        word_dur = line_dur / max(1, len(words_raw))

        upper_set = set(line.get("upper", []))
        highlight_set = set(line.get("highlight", []))

        line_words = []
        for i, w in enumerate(words_raw):
            w_start = round(line_start + i * word_dur, 2)
            w_end = round(line_start + (i + 1) * word_dur, 2)
            clean_w = w.replace(",", "").replace(".", "").replace("!", "").replace("?", "").replace("…", "")
            is_up = (w in upper_set) or (clean_w in upper_set) or (clean_w == clean_w.upper() and len(clean_w) > 1)
            is_hl = (w in highlight_set) or (clean_w in highlight_set)

            word_obj = {
                "text": w,
                "start": w_start,
                "end": w_end
            }
            if is_up:
                word_obj["isUpperKey"] = True
            if is_hl:
                word_obj["isHighlight"] = True
            line_words.append(word_obj)

        lines_list.append({
            "text": line["text"],
            "start": line_start,
            "end": line_end,
            "indent": line.get("indent", 0),
            "words": line_words
        })

    processed_stanzas.append({
        "id": s["id"],
        "start": s["start"],
        "end": s["end"],
        "text": " ".join(stanza_text_parts),
        "indent": 0,
        "lines": lines_list
    })

js_content = "/**\n * DEMO PRESET: ĐÊM GÀNH HÀO (CÒN THƯƠNG SẮC HOA CHUNG TÌNH - QUÝ BÌNH)\n * 60FPS FinnXIII Sharp Kinetic Typography with authentic photoreal slideshow\n */\n\n"
js_content += "window.DEMO_PRESET_GANH_HAO = {\n"
js_content += "  audioName: 'dem_ganh_hao.mp3',\n"
js_content += "  audioTitle: 'Còn Thương Sắc Hoa Chung Tình',\n"
js_content += "  audioArtist: 'Quý Bình',\n"
js_content += "  audioInfo: 'OST Sông Phố Nhà Ghe • Sáng tác: Lê Phương',\n"
js_content += "  audioUrl: 'assets/samples/dem_ganh_hao.mp3',\n"
js_content += "  audioDuration: 352.8,\n"
js_content += "  template: 'finnxiii',\n"
js_content += "  transition: 'kenburns',\n"
js_content += "  aspectRatio: '16-9',\n"
js_content += "  imageUrls: [\n"
js_content += "    'assets/dem_ganh_hao/01_Trang_Ganh_Hao.png',\n"
js_content += "    'assets/dem_ganh_hao/02_Hoai_Lang_Den_Dau.png',\n"
js_content += "    'assets/dem_ganh_hao/03_Ben_Song_Hoang_Hon.png',\n"
js_content += "    'assets/dem_ganh_hao/04_Tam_Tu_Ben_Ben_Nuoc.png',\n"
js_content += "    'assets/dem_ganh_hao/05_Ben_Do_Song_Que.png',\n"
js_content += "    'assets/dem_ganh_hao/08_Hoa_Luc_Binh_Tim.png',\n"
js_content += "    'assets/dem_ganh_hao/06_Song_Nuoc_Mien_Tay.png',\n"
js_content += "    'assets/dem_ganh_hao/07_Trang_Khuyet_Ben_Song.png',\n"
js_content += "    'assets/dem_ganh_hao/09_Bong_Em_Qua_Cau.png',\n"
js_content += "    'assets/dem_ganh_hao/10_Chieu_Tren_Song_Que.png'\n"
js_content += "  ],\n"
js_content += "  songMeta: {\n"
js_content += "    title: 'CÒN THƯƠNG SẮC HOA CHUNG TÌNH',\n"
js_content += "    artist: 'QUÝ BÌNH',\n"
js_content += "    info: 'OST SÔNG PHỐ NHÀ GHE  •  SÁNG TÁC: LÊ PHƯƠNG',\n"
js_content += "    cardLines: [\n"
js_content += "      { text: 'C Ò N', size: 14, weight: '700' },\n"
js_content += "      { text: 'T H Ư Ơ N G', size: 13, weight: '700' },\n"
js_content += "      { text: 'S Ắ C', size: 14, weight: '700' },\n"
js_content += "      { text: 'H O A', size: 15, weight: '800' },\n"
js_content += "      { text: 'C H U N G', size: 13, weight: '700' },\n"
js_content += "      { text: 'T Ì N H', size: 16, weight: '900' }\n"
js_content += "    ]\n"
js_content += "  },\n"
js_content += "  wordsData: " + json.dumps(processed_stanzas, ensure_ascii=False, indent=4) + "\n};\n"

out_file = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\preset_ganh_hao.js'
with open(out_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Generated js/preset_ganh_hao.js with', len(processed_stanzas), 'stanzas!')
