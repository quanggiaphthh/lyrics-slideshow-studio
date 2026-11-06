import json, os, sys
sys.stdout.reconfigure(encoding='utf-8')

raw_stanzas_def = [
  # 0. Hò mở đầu 1 (Left cascade)
  {
    "id": "gh_0", "start": 14.5, "end": 28.0, "layout": "left",
    "lines": [
      {"text": "HÒ ƠI...", "start": 14.8, "end": 17.5, "indent": 0, "upper": ["HÒ", "ƠI..."]},
      {"text": "ai xuôi con sáo", "start": 17.8, "end": 20.8, "indent": 1},
      {"text": "SỔ LỒNG,", "start": 21.0, "end": 24.5, "indent": 2, "upper": ["SỔ", "LỒNG,"], "boxHighlight": ["SỔ", "LỒNG,"]},
      {"text": "cho em nỡ vội", "start": 24.8, "end": 27.8, "indent": 3, "colorAccent": ["em"]}
    ]
  },
  # 1. Hò mở đầu 2 (Center stage)
  {
    "id": "gh_1", "start": 29.0, "end": 47.0, "layout": "center",
    "lines": [
      {"text": "HÒ ƠI...", "start": 29.2, "end": 34.0, "upper": ["HÒ", "ƠI..."]},
      {"text": "cho em nỡ vội", "start": 34.5, "end": 38.0, "colorAccent": ["em"]},
      {"text": "LẤY CHỒNG", "start": 38.2, "end": 42.0, "upper": ["LẤY", "CHỒNG"], "boxHighlight": ["LẤY", "CHỒNG"]},
      {"text": "BỎ ANH...", "start": 42.2, "end": 46.8, "upper": ["BỎ", "ANH..."], "colorAccent": ["ANH..."]}
    ]
  },
  # 2. Lời 1 - Khổ 1 (Left cascade)
  {
    "id": "gh_2", "start": 79.2, "end": 85.8, "layout": "left",
    "lines": [
      {"text": "sáo bay theo chồng", "start": 79.2, "end": 81.8, "indent": 0},
      {"text": "đâu biết là", "start": 81.8, "end": 83.0, "indent": 1},
      {"text": "ĐAU LÒNG", "start": 83.2, "end": 84.6, "indent": 2, "upper": ["ĐAU", "LÒNG"], "boxHighlight": ["ĐAU", "LÒNG"]},
      {"text": "ANH LẮM", "start": 84.6, "end": 85.8, "indent": 3, "upper": ["ANH", "LẮM"], "colorAccent": ["ANH"]}
    ]
  },
  # 3. Lời 1 - Khổ 2 (Right cascade)
  {
    "id": "gh_3", "start": 86.0, "end": 93.5, "layout": "right",
    "lines": [
      {"text": "xót xa lặng thầm", "start": 86.0, "end": 88.6, "indent": 0},
      {"text": "nhìn theo bước em", "start": 88.8, "end": 91.0, "indent": 1, "colorAccent": ["em"]},
      {"text": "QUA CẦU", "start": 91.2, "end": 93.3, "indent": 2, "upper": ["QUA", "CẦU"], "boxHighlight": ["QUA", "CẦU"]}
    ]
  },
  # 4. Lời 1 - Khổ 3 (Left cascade)
  {
    "id": "gh_4", "start": 93.6, "end": 99.8, "layout": "left",
    "lines": [
      {"text": "ngày nào có nhau", "start": 93.6, "end": 96.2, "indent": 0},
      {"text": "ta trao ước hẹn", "start": 96.4, "end": 98.2, "indent": 1},
      {"text": "TRẦU CAU", "start": 98.4, "end": 99.8, "indent": 2, "upper": ["TRẦU", "CAU"], "boxHighlight": ["TRẦU", "CAU"]}
    ]
  },
  # 5. Lời 1 - Khổ 4 (Right cascade)
  {
    "id": "gh_5", "start": 100.0, "end": 107.0, "layout": "right",
    "lines": [
      {"text": "mong duyên ban đầu", "start": 100.0, "end": 102.8, "indent": 0},
      {"text": "trời thương", "start": 103.0, "end": 104.5, "indent": 1},
      {"text": "không đổ MƯA NGÂU", "start": 104.8, "end": 106.8, "indent": 2, "upper": ["MƯA", "NGÂU"], "boxHighlight": ["MƯA", "NGÂU"]}
    ]
  },
  # 6. Lời 1 - Khổ 5 (Left cascade)
  {
    "id": "gh_6", "start": 107.2, "end": 114.0, "layout": "left",
    "lines": [
      {"text": "bóng em xa dần", "start": 107.2, "end": 109.8, "indent": 0, "colorAccent": ["em"]},
      {"text": "ANH biết là", "start": 110.0, "end": 111.4, "indent": 1, "upper": ["ANH"], "colorAccent": ["ANH"]},
      {"text": "một lần CHIA CÁCH", "start": 111.6, "end": 113.8, "indent": 2, "upper": ["CHIA", "CÁCH"], "boxHighlight": ["CHIA", "CÁCH"]}
    ]
  },
  # 7. Lời 1 - Khổ 6 (Right cascade)
  {
    "id": "gh_7", "start": 114.2, "end": 121.2, "layout": "right",
    "lines": [
      {"text": "trách ai vô tình", "start": 114.2, "end": 116.8, "indent": 0},
      {"text": "đành tâm", "start": 117.0, "end": 118.2, "indent": 1},
      {"text": "XẺ ĐÔI", "start": 118.4, "end": 119.8, "indent": 2, "upper": ["XẺ", "ĐÔI"], "boxHighlight": ["XẺ", "ĐÔI"]},
      {"text": "TIM MÌNH", "start": 120.0, "end": 121.2, "indent": 3, "upper": ["TIM", "MÌNH"], "colorAccent": ["TIM", "MÌNH"]}
    ]
  },
  # 8. Lời 1 - Khổ 7 (Left cascade)
  {
    "id": "gh_8", "start": 121.5, "end": 128.5, "layout": "left",
    "lines": [
      {"text": "dặn lòng cố quên", "start": 121.5, "end": 124.2, "indent": 0},
      {"text": "sao đêm vẫn thường", "start": 124.5, "end": 126.5, "indent": 1},
      {"text": "gọi tên EM", "start": 126.8, "end": 128.5, "indent": 2, "upper": ["EM"], "colorAccent": ["EM"]}
    ]
  },
  # 9. Lời 1 - Khổ 8 (Right cascade)
  {
    "id": "gh_9", "start": 128.8, "end": 141.2, "layout": "right",
    "lines": [
      {"text": "ai ru trong chiều", "start": 128.8, "end": 132.2, "indent": 0},
      {"text": "cho lòng càng nhớ", "start": 132.5, "end": 135.5, "indent": 1},
      {"text": "EM NHIỀU...", "start": 135.8, "end": 141.0, "indent": 2, "upper": ["EM", "NHIỀU..."], "boxHighlight": ["EM", "NHIỀU..."]}
    ]
  },
  # 10. Điệp khúc 1 - Khổ 1 (Center stage)
  {
    "id": "gh_10", "start": 142.0, "end": 157.0, "layout": "center",
    "lines": [
      {"text": "À ƠI...", "start": 142.2, "end": 146.5, "upper": ["À", "ƠI..."]},
      {"text": "EM nỡ sao em", "start": 146.8, "end": 149.8, "upper": ["EM"], "colorAccent": ["EM", "em"]},
      {"text": "bỏ anh một mình", "start": 150.0, "end": 152.8, "colorAccent": ["anh"]},
      {"text": "LỤC BÌNH TRÔI", "start": 153.0, "end": 155.8, "upper": ["LỤC", "BÌNH", "TRÔI"], "boxHighlight": ["LỤC", "BÌNH", "TRÔI"]},
      {"text": "chẳng biết nơi neo", "start": 156.0, "end": 157.0}
    ]
  },
  # 11. Điệp khúc 1 - Khổ 2 (Left cascade)
  {
    "id": "gh_11", "start": 157.5, "end": 165.5, "layout": "left",
    "lines": [
      {"text": "CÒN THƯƠNG", "start": 157.5, "end": 159.2, "indent": 0, "upper": ["CÒN", "THƯƠNG"]},
      {"text": "tóc em buông dài", "start": 159.4, "end": 161.2, "indent": 1, "colorAccent": ["em"]},
      {"text": "TÍM HOA", "start": 161.5, "end": 162.8, "indent": 2, "upper": ["TÍM", "HOA"], "boxHighlight": ["TÍM", "HOA"]},
      {"text": "anh cài em cười", "start": 163.0, "end": 164.2, "indent": 3, "colorAccent": ["em"]},
      {"text": "XIẾT CHẶT VÒNG TAY", "start": 164.4, "end": 165.5, "indent": 4, "upper": ["XIẾT", "CHẶT", "VÒNG", "TAY"]}
    ]
  },
  # 12. Điệp khúc 1 - Khổ 3 (Right cascade)
  {
    "id": "gh_12", "start": 166.0, "end": 182.5, "layout": "right",
    "lines": [
      {"text": "À ƠI...", "start": 166.0, "end": 171.5, "indent": 0, "upper": ["À", "ƠI..."]},
      {"text": "nói thương anh nhiều", "start": 172.0, "end": 175.5, "indent": 1, "colorAccent": ["anh"]},
      {"text": "đành lòng EM", "start": 176.0, "end": 177.8, "indent": 2, "upper": ["EM"], "colorAccent": ["EM"]},
      {"text": "CẤT BƯỚC", "start": 178.0, "end": 180.2, "indent": 3, "upper": ["CẤT", "BƯỚC"], "boxHighlight": ["CẤT", "BƯỚC"]},
      {"text": "SANG SÔNG...", "start": 180.5, "end": 182.5, "indent": 4, "upper": ["SANG", "SÔNG..."]}
    ]
  },
  # 13. Điệp khúc 1 - Khổ 4 (Center stage punchline)
  {
    "id": "gh_13", "start": 183.0, "end": 198.0, "layout": "center",
    "lines": [
      {"text": "vì đâu dở dang duyên mình", "start": 183.0, "end": 187.5},
      {"text": "SẮC HOA CHUNG TÌNH", "start": 188.0, "end": 192.5, "upper": ["SẮC", "HOA", "CHUNG", "TÌNH"], "boxHighlight": ["SẮC", "HOA", "CHUNG", "TÌNH"]},
      {"text": "chưa phai màu", "start": 193.0, "end": 195.0},
      {"text": "NỠ NÀO NGƯỜI ĐI...", "start": 195.2, "end": 198.0, "upper": ["NỠ", "NÀO", "NGƯỜI", "ĐI..."]}
    ]
  },
  # 14. Điệp khúc 2 - Cao trào 1 (Center stage)
  {
    "id": "gh_14", "start": 227.5, "end": 241.5, "layout": "center",
    "lines": [
      {"text": "À ƠI...", "start": 227.8, "end": 231.5, "upper": ["À", "ƠI..."]},
      {"text": "EM nỡ sao em", "start": 232.0, "end": 234.8, "upper": ["EM"], "colorAccent": ["EM", "em"]},
      {"text": "bỏ anh một mình", "start": 235.0, "end": 237.5, "colorAccent": ["anh"]},
      {"text": "LỤC BÌNH TRÔI", "start": 237.8, "end": 240.2, "upper": ["LỤC", "BÌNH", "TRÔI"], "boxHighlight": ["LỤC", "BÌNH", "TRÔI"]},
      {"text": "chẳng biết nơi neo", "start": 240.5, "end": 241.5}
    ]
  },
  # 15. Điệp khúc 2 - Cao trào 2 (Right cascade)
  {
    "id": "gh_15", "start": 242.0, "end": 253.2, "layout": "right",
    "lines": [
      {"text": "CÒN THƯƠNG", "start": 242.0, "end": 244.2, "indent": 0, "upper": ["CÒN", "THƯƠNG"]},
      {"text": "tóc em buông dài", "start": 244.5, "end": 247.0, "indent": 1, "colorAccent": ["em"]},
      {"text": "TÍM HOA", "start": 247.2, "end": 249.0, "indent": 2, "upper": ["TÍM", "HOA"], "boxHighlight": ["TÍM", "HOA"]},
      {"text": "anh cài em cười", "start": 249.2, "end": 251.2, "indent": 3, "colorAccent": ["em"]},
      {"text": "XIẾT CHẶT VÒNG TAY", "start": 251.5, "end": 253.2, "indent": 4, "upper": ["XIẾT", "CHẶT", "VÒNG", "TAY"]}
    ]
  },
  # 16. Điệp khúc 2 - Cao trào 3 (Left cascade)
  {
    "id": "gh_16", "start": 253.5, "end": 267.0, "layout": "left",
    "lines": [
      {"text": "À ƠI...", "start": 253.5, "end": 257.5, "indent": 0, "upper": ["À", "ƠI..."]},
      {"text": "nói thương anh nhiều", "start": 258.0, "end": 261.2, "indent": 1, "colorAccent": ["anh"]},
      {"text": "đành lòng EM", "start": 261.5, "end": 263.2, "indent": 2, "upper": ["EM"], "colorAccent": ["EM"]},
      {"text": "CẤT BƯỚC", "start": 263.5, "end": 265.5, "indent": 3, "upper": ["CẤT", "BƯỚC"], "boxHighlight": ["CẤT", "BƯỚC"]},
      {"text": "SANG SÔNG...", "start": 265.8, "end": 267.0, "indent": 4, "upper": ["SANG", "SÔNG..."]}
    ]
  },
  # 17. Điệp khúc 2 - Cao trào 4 (Center stage punchline)
  {
    "id": "gh_17", "start": 267.5, "end": 280.0, "layout": "center",
    "lines": [
      {"text": "vì đâu dở dang duyên mình", "start": 267.5, "end": 271.0},
      {"text": "SẮC HOA CHUNG TÌNH", "start": 271.2, "end": 275.5, "upper": ["SẮC", "HOA", "CHUNG", "TÌNH"], "boxHighlight": ["SẮC", "HOA", "CHUNG", "TÌNH"]},
      {"text": "chưa phai màu", "start": 275.8, "end": 277.5},
      {"text": "NỠ NÀO NGƯỜI ĐI...", "start": 277.8, "end": 280.0, "upper": ["NỠ", "NÀO", "NGƯỜI", "ĐI..."]}
    ]
  },
  # 18. Đoạn kết 1 (Cinematic Lower-Third)
  {
    "id": "gh_18", "start": 280.0, "end": 293.5, "layout": "lower",
    "lines": [
      {"text": "dòng nhớ trong tim", "start": 280.0, "end": 285.5},
      {"text": "LÀM SAO CHIA CẮT", "start": 286.0, "end": 293.5, "upper": ["LÀM", "SAO", "CHIA", "CẮT"], "boxHighlight": ["LÀM", "SAO", "CHIA", "CẮT"]}
    ]
  },
  # 19. Đoạn kết 2 (Center stage)
  {
    "id": "gh_19", "start": 294.0, "end": 308.5, "layout": "center",
    "lines": [
      {"text": "người thương...", "start": 294.0, "end": 299.5},
      {"text": "CÓ HAY...", "start": 300.0, "end": 308.5, "upper": ["CÓ", "HAY..."], "boxHighlight": ["CÓ", "HAY..."]}
    ]
  },
  # 20. Đoạn kết 3 (Left cascade)
  {
    "id": "gh_20", "start": 309.0, "end": 324.0, "layout": "left",
    "lines": [
      {"text": "đêm dài mình anh", "start": 309.0, "end": 313.5, "indent": 0, "colorAccent": ["anh"]},
      {"text": "THAO THỨC,", "start": 314.0, "end": 318.5, "indent": 1, "upper": ["THAO", "THỨC,"], "boxHighlight": ["THAO", "THỨC,"]},
      {"text": "em giờ biết lòng buồn vui", "start": 319.0, "end": 324.0, "indent": 2, "colorAccent": ["em"]}
    ]
  },
  # 21. Đoạn kết 4 (Right cascade)
  {
    "id": "gh_21", "start": 324.5, "end": 337.5, "layout": "right",
    "lines": [
      {"text": "em về làm dâu", "start": 324.5, "end": 329.5, "indent": 0, "colorAccent": ["em"]},
      {"text": "BÊN ẤY...", "start": 330.0, "end": 337.5, "indent": 1, "upper": ["BÊN", "ẤY..."], "boxHighlight": ["BÊN", "ẤY..."]}
    ]
  },
  # 22. Đoạn kết 5 (Center stage Outro)
  {
    "id": "gh_22", "start": 337.8, "end": 350.5, "layout": "center",
    "lines": [
      {"text": "bên này...", "start": 337.8, "end": 341.5},
      {"text": "vẫn hoài", "start": 341.8, "end": 344.2},
      {"text": "CHỜ MONG...", "start": 344.5, "end": 350.5, "upper": ["CHỜ", "MONG..."], "boxHighlight": ["CHỜ", "MONG..."]}
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
        box_set = set(line.get("boxHighlight", []))
        accent_set = set(line.get("colorAccent", []))

        line_words = []
        for i, w in enumerate(words_raw):
            w_start = round(line_start + i * word_dur, 2)
            w_end = round(line_start + (i + 1) * word_dur, 2)
            clean_w = w.replace(",", "").replace(".", "").replace("!", "").replace("?", "").replace("…", "")
            is_up = (w in upper_set) or (clean_w in upper_set) or (clean_w == clean_w.upper() and len(clean_w) > 1)
            is_box = (w in box_set) or (clean_w in box_set)
            is_acc = (w in accent_set) or (clean_w in accent_set)

            word_obj = {
                "text": w,
                "start": w_start,
                "end": w_end
            }
            if is_up:
                word_obj["isUpperKey"] = True
            if is_box:
                word_obj["boxHighlight"] = True
            if is_acc:
                word_obj["colorAccent"] = True
            line_words.append(word_obj)

        lines_list.append({
            "text": line["text"],
            "start": line_start,
            "end": line_end,
            "indent": line.get("indent", 0),
            "align": s.get("layout", "left"),
            "words": line_words
        })

    processed_stanzas.append({
        "id": s["id"],
        "start": s["start"],
        "end": s["end"],
        "layout": s.get("layout", "left"),
        "text": " ".join(stanza_text_parts),
        "indent": 0,
        "lines": lines_list
    })

js_content = "/**\n * DEMO PRESET: ĐÊM GÀNH HÀO (CÒN THƯƠNG SẮC HOA CHUNG TÌNH - QUÝ BÌNH)\n * 60FPS FinnXIII Sharp Kinetic Typography with dynamic layouts & authentic photoreal slideshow\n */\n\n"
js_content += "window.DEMO_PRESET_GANH_HAO = {\n"
js_content += "  audioName: 'dem_ganh_hao.mp3',\n"
js_content += "  audioTitle: 'Còn Thương Sắc Hoa Chung Tình',\n"
js_content += "  audioArtist: 'Quý Bình',\n"
js_content += "  audioInfo: 'OST Sông Phố Nhà Ghe • Sáng tác: Lê Phương',\n"
js_content += "  audioUrl: 'assets/samples/dem_ganh_hao.mp3',\n"
js_content += "  audioDuration: 355.05,\n"
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

print('Generated js/preset_ganh_hao.js successfully with', len(processed_stanzas), 'stanzas!')
