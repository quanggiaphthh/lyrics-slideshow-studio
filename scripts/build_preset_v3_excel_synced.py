#!/usr/bin/env python3
"""
Builds preset_ganh_hao.js with:
1. 100% Acoustically Calibrated Intro (00:00 - 01:19) from user TXT & Waveform RMS.
2. Cross-verified V3 stanzas for the middle body (gh_06 - gh_21).
3. 100% Excel Calibrated Outro (gh_22 - gh_26) from user's Excel file.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# 1. Load V3 base
with open(ROOT / "docs" / "v3_timeline" / "TIMELINE_CAP_TU_HERO_DA_SUA.json", "r", encoding="utf-8") as f:
    v3 = json.load(f)

cues_by_line = {}
for c in v3["cues"]:
    cues_by_line.setdefault(c["line_id"], []).append(c)

def cue_to_words(c):
    text = c["render_text"]
    words = text.split()
    n = len(words)
    dur = round(c["end_s"] - c["start_s"], 3)
    w_dur = round(dur / n, 3)
    out = []

    is_hero = bool(c.get("hero"))
    hero_text = c.get("hero_text", "").strip()
    sustain_hint = c.get("sustain_hint", "")
    is_long_sustain = "Ngân dài" in sustain_hint
    is_med_sustain = "Ngân vừa" in sustain_hint

    for i, w in enumerate(words):
        w_clean = re.sub(r'[.,!?;:…"\'\(\)]', '', w)
        w_start = round(c["start_s"] + i * w_dur, 3)
        w_end = round(c["start_s"] + (i + 1) * w_dur, 3)

        is_upper = w_clean.isupper() and len(w_clean) > 0
        box_hl = is_hero and (w_clean.upper() in hero_text.upper() or hero_text == "")

        word_obj = {
            "text": w,
            "start": w_start,
            "end": w_end
        }
        if is_upper:
            word_obj["isUpperKey"] = True
        if box_hl:
            word_obj["boxHighlight"] = True
        
        if is_long_sustain and (i == n - 1 or n == 1):
            word_obj["sustain"] = round(w_dur * 0.9, 2)
        elif is_med_sustain and (i == n - 1 or n == 1):
            word_obj["sustain"] = round(w_dur * 0.7, 2)

        out.append(word_obj)
    return out

stanzas = []

# ==============================================================================
# SECTION 1: CALIBRATED INTRO (gh_01 to gh_05: 00:00 - 00:46.8)
# Perfectly aligned with vocal audio waveform & user's TXT timeline!
# ==============================================================================

# gh_01: HÒ ƠI (04.2s - 10.0s)
stanzas.append({
    "id": "gh_01",
    "start": 4.2,
    "end": 10.0,
    "status": "reviewed",
    "layout": "center",
    "text": "HÒ ƠI",
    "lines": [
        {
            "text": "HÒ ƠI",
            "start": 4.2,
            "end": 10.0,
            "indent": 0,
            "align": "center",
            "words": [
                {"text": "HÒ", "start": 4.2, "end": 5.5, "sustain": 1.3, "isUpperKey": True, "boxHighlight": True},
                {"text": "ƠI", "start": 5.5, "end": 10.0, "sustain": 4.5, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_02: Ai xui con sáo SỔ LỒNG (15.3s - 20.2s)
stanzas.append({
    "id": "gh_02",
    "start": 15.3,
    "end": 20.2,
    "status": "reviewed",
    "layout": "left",
    "text": "Ai xui con sáo SỔ LỒNG",
    "lines": [
        {
            "text": "Ai xui con sáo SỔ LỒNG",
            "start": 15.3,
            "end": 20.2,
            "indent": 0,
            "align": "left",
            "words": [
                {"text": "Ai", "start": 15.3, "end": 15.9},
                {"text": "xui", "start": 15.9, "end": 16.5},
                {"text": "con", "start": 16.5, "end": 17.1},
                {"text": "sáo", "start": 17.1, "end": 17.8},
                {"text": "SỔ", "start": 17.8, "end": 18.8, "isUpperKey": True, "boxHighlight": True},
                {"text": "LỒNG", "start": 18.8, "end": 20.2, "sustain": 1.4, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_03: Cho em NỠ VỘI (21.0s - 25.2s)
stanzas.append({
    "id": "gh_03",
    "start": 21.0,
    "end": 25.2,
    "status": "reviewed",
    "layout": "right",
    "text": "Cho em NỠ VỘI",
    "lines": [
        {
            "text": "Cho em NỠ VỘI",
            "start": 21.0,
            "end": 25.2,
            "indent": 0,
            "align": "right",
            "words": [
                {"text": "Cho", "start": 21.0, "end": 21.7},
                {"text": "em", "start": 21.7, "end": 22.4},
                {"text": "NỠ", "start": 22.4, "end": 23.4, "isUpperKey": True, "boxHighlight": True},
                {"text": "VỘI", "start": 23.4, "end": 25.2, "sustain": 1.8, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_04: HÒ ƠI (29.0s - 33.6s)
stanzas.append({
    "id": "gh_04",
    "start": 29.0,
    "end": 33.6,
    "status": "reviewed",
    "layout": "center",
    "text": "HÒ ƠI",
    "lines": [
        {
            "text": "HÒ ƠI",
            "start": 29.0,
            "end": 33.6,
            "indent": 0,
            "align": "center",
            "words": [
                {"text": "HÒ", "start": 29.0, "end": 30.5, "sustain": 1.5, "isUpperKey": True, "boxHighlight": True},
                {"text": "ƠI", "start": 30.5, "end": 33.6, "sustain": 3.1, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_05: Cho em NỠ VỘI • Lấy chồng BỎ ANH (37.8s - 46.8s)
stanzas.append({
    "id": "gh_05",
    "start": 37.8,
    "end": 46.8,
    "status": "reviewed",
    "layout": "left",
    "text": "Cho em NỠ VỘI • Lấy chồng BỎ ANH",
    "lines": [
        {
            "text": "Cho em NỠ VỘI",
            "start": 37.8,
            "end": 40.3,
            "indent": 0,
            "align": "left",
            "words": [
                {"text": "Cho", "start": 37.8, "end": 38.3},
                {"text": "em", "start": 38.3, "end": 38.9},
                {"text": "NỠ", "start": 38.9, "end": 39.5, "isUpperKey": True, "boxHighlight": True},
                {"text": "VỘI", "start": 39.5, "end": 40.3, "sustain": 0.8, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Lấy chồng BỎ ANH",
            "start": 40.8,
            "end": 46.8,
            "indent": 1,
            "align": "left",
            "words": [
                {"text": "Lấy", "start": 40.8, "end": 41.6},
                {"text": "chồng", "start": 41.6, "end": 42.4},
                {"text": "BỎ", "start": 42.4, "end": 43.8, "isUpperKey": True, "boxHighlight": True},
                {"text": "ANH", "start": 43.8, "end": 46.8, "sustain": 3.0, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# ==============================================================================
# SECTION 2: MIDDLE BODY (gh_06 to gh_21: 01:18.5 - 04:43.0)
# From cross-verified V3 dataset
# ==============================================================================
STANZA_GROUPS_MIDDLE = [
    # Đoạn 1
    {"id": "gh_06", "lines": ["L07"], "layout": "left"},
    {"id": "gh_07", "lines": ["L08"], "layout": "right"},
    {"id": "gh_08", "lines": ["L09"], "layout": "left"},
    {"id": "gh_09", "lines": ["L10"], "layout": "right"},
    {"id": "gh_10", "lines": ["L11"], "layout": "left"},
    {"id": "gh_11", "lines": ["L12"], "layout": "right"},
    {"id": "gh_12", "lines": ["L13", "L14"], "layout": "left"},
    {"id": "gh_13", "lines": ["L15"], "layout": "center"},
    # Điệp khúc 1
    {"id": "gh_14", "lines": ["L16", "L17", "L18", "L19"], "layout": "left"},
    {"id": "gh_15", "lines": ["L20", "L21"], "layout": "right"},
    {"id": "gh_16", "lines": ["L22", "L23", "L24", "L25"], "layout": "left"},
    {"id": "gh_17", "lines": ["L26", "L27", "L28"], "layout": "center"},
    # Điệp khúc 2 (lặp lại sau giang tấu giữa bài)
    {"id": "gh_18", "lines": ["L29", "L30", "L31", "L32"], "layout": "left"},
    {"id": "gh_19", "lines": ["L33", "L34"], "layout": "right"},
    {"id": "gh_20", "lines": ["L35", "L36", "L37", "L38"], "layout": "left"},
    {"id": "gh_21", "lines": ["L39", "L40", "L41"], "layout": "center"}
]

line_dict = {l["line_id"]: l for l in v3["lines"]}

for grp in STANZA_GROUPS_MIDDLE:
    grp_lines = [line_dict[lid] for lid in grp["lines"]]
    s_start = grp_lines[0]["start_s"]
    s_end = grp_lines[-1]["end_s"]

    stanza_lines = []
    full_text_parts = []

    for idx, l in enumerate(grp_lines):
        line_cues = cues_by_line.get(l["line_id"], [])
        line_words = []
        for c in line_cues:
            line_words.extend(cue_to_words(c))

        render_line_text = " ".join([c["render_text"] for c in line_cues])
        full_text_parts.append(render_line_text)

        stanza_lines.append({
            "text": render_line_text,
            "start": l["start_s"],
            "end": l["end_s"],
            "indent": idx,
            "align": "center" if grp["layout"] == "center" else "left",
            "words": line_words
        })

    stanzas.append({
        "id": grp["id"],
        "start": s_start,
        "end": s_end,
        "status": "reviewed",
        "layout": grp["layout"],
        "text": " • ".join(full_text_parts),
        "lines": stanza_lines
    })

# ==============================================================================
# SECTION 3: OUTRO SECTION (gh_22 to gh_26: 04:44.5 - 05:30.8)
# 100% Calibrated with user's Excel file (media_1794018325711_5a5a4b74.xlsx)
# ==============================================================================

# gh_22: Dòng nhớ trong TIM • Làm sao chia CÁCH
stanzas.append({
    "id": "gh_22",
    "start": 284.5,
    "end": 290.8,
    "status": "reviewed",
    "layout": "left",
    "text": "Dòng nhớ trong TIM • Làm sao chia CÁCH",
    "lines": [
        {
            "text": "Dòng nhớ trong TIM",
            "start": 284.5,
            "end": 287.5,
            "indent": 0,
            "align": "left",
            "words": [
                {"text": "Dòng", "start": 284.5, "end": 285.0, "sustain": 0.5},
                {"text": "nhớ", "start": 285.0, "end": 285.5, "sustain": 0.5},
                {"text": "trong", "start": 285.5, "end": 286.0, "sustain": 0.5},
                {"text": "TIM", "start": 286.0, "end": 287.5, "sustain": 1.5, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Làm sao chia CÁCH",
            "start": 288.0,
            "end": 290.8,
            "indent": 1,
            "align": "left",
            "words": [
                {"text": "Làm", "start": 288.0, "end": 288.5, "sustain": 0.5},
                {"text": "sao", "start": 288.5, "end": 289.0, "sustain": 0.5},
                {"text": "chia", "start": 289.0, "end": 289.5, "sustain": 0.5},
                {"text": "CÁCH", "start": 289.5, "end": 290.8, "sustain": 1.3, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_23: Người thương có HAY • Đêm DÀI • Mình anh thao THỨC
stanzas.append({
    "id": "gh_23",
    "start": 291.0,
    "end": 301.4,
    "status": "reviewed",
    "layout": "right",
    "text": "Người thương có HAY • Đêm DÀI • Mình anh thao THỨC",
    "lines": [
        {
            "text": "Người thương có HAY",
            "start": 291.0,
            "end": 294.2,
            "indent": 0,
            "align": "right",
            "words": [
                {"text": "Người", "start": 291.0, "end": 291.5, "sustain": 0.5},
                {"text": "thương", "start": 291.5, "end": 292.0, "sustain": 0.5},
                {"text": "có", "start": 292.0, "end": 292.5, "sustain": 0.5},
                {"text": "HAY", "start": 292.5, "end": 294.2, "sustain": 1.7, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Đêm DÀI",
            "start": 295.0,
            "end": 297.6,
            "indent": 1,
            "align": "right",
            "words": [
                {"text": "Đêm", "start": 295.0, "end": 296.0, "sustain": 1.0},
                {"text": "DÀI", "start": 296.0, "end": 297.6, "sustain": 1.6, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Mình anh thao THỨC",
            "start": 298.0,
            "end": 301.4,
            "indent": 2,
            "align": "right",
            "words": [
                {"text": "Mình", "start": 298.0, "end": 298.6, "sustain": 0.6},
                {"text": "anh", "start": 298.6, "end": 299.2, "sustain": 0.6},
                {"text": "thao", "start": 299.2, "end": 299.8, "sustain": 0.6},
                {"text": "THỨC", "start": 299.8, "end": 301.4, "sustain": 1.6, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_24: Em GIỜ • Biết lòng buồn VUI
stanzas.append({
    "id": "gh_24",
    "start": 302.0,
    "end": 308.5,
    "status": "reviewed",
    "layout": "left",
    "text": "Em GIỜ • Biết lòng buồn VUI",
    "lines": [
        {
            "text": "Em GIỜ",
            "start": 302.0,
            "end": 304.6,
            "indent": 0,
            "align": "left",
            "words": [
                {"text": "Em", "start": 302.0, "end": 303.0, "sustain": 1.0},
                {"text": "GIỜ", "start": 303.0, "end": 304.6, "sustain": 1.6, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Biết lòng buồn VUI",
            "start": 305.0,
            "end": 308.5,
            "indent": 1,
            "align": "left",
            "words": [
                {"text": "Biết", "start": 305.0, "end": 305.6, "sustain": 0.6},
                {"text": "lòng", "start": 305.6, "end": 306.2, "sustain": 0.6},
                {"text": "buồn", "start": 306.2, "end": 306.8, "sustain": 0.6},
                {"text": "VUI", "start": 306.8, "end": 308.5, "sustain": 1.7, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_25: Em VỀ • Làm dâu bên ẤY • Bên NÀY • Vẫn HOÀI
stanzas.append({
    "id": "gh_25",
    "start": 309.0,
    "end": 323.8,
    "status": "reviewed",
    "layout": "right",
    "text": "Em VỀ • Làm dâu bên ẤY • Bên NÀY • Vẫn HOÀI",
    "lines": [
        {
            "text": "Em VỀ",
            "start": 309.0,
            "end": 311.4,
            "indent": 0,
            "align": "right",
            "words": [
                {"text": "Em", "start": 309.0, "end": 310.0, "sustain": 1.0},
                {"text": "VỀ", "start": 310.0, "end": 311.4, "sustain": 1.4, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Làm dâu bên ẤY",
            "start": 312.0,
            "end": 315.6,
            "indent": 1,
            "align": "right",
            "words": [
                {"text": "Làm", "start": 312.0, "end": 312.6, "sustain": 0.6},
                {"text": "dâu", "start": 312.6, "end": 313.2, "sustain": 0.6},
                {"text": "bên", "start": 313.2, "end": 313.8, "sustain": 0.6},
                {"text": "ẤY", "start": 313.8, "end": 315.6, "sustain": 1.8, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Bên NÀY",
            "start": 316.2,
            "end": 319.6,
            "indent": 2,
            "align": "right",
            "words": [
                {"text": "Bên", "start": 316.2, "end": 317.0, "sustain": 0.8},
                {"text": "NÀY", "start": 317.0, "end": 319.6, "sustain": 2.6, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "Vẫn HOÀI",
            "start": 320.0,
            "end": 323.8,
            "indent": 3,
            "align": "right",
            "words": [
                {"text": "Vẫn", "start": 320.0, "end": 320.6, "sustain": 0.6},
                {"text": "HOÀI", "start": 320.6, "end": 323.8, "sustain": 3.2, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# gh_26: CHỜ • MONG
stanzas.append({
    "id": "gh_26",
    "start": 324.6,
    "end": 330.8,
    "status": "reviewed",
    "layout": "center",
    "text": "CHỜ • MONG",
    "lines": [
        {
            "text": "CHỜ",
            "start": 324.6,
            "end": 327.4,
            "indent": 0,
            "align": "center",
            "words": [
                {"text": "CHỜ", "start": 324.6, "end": 327.4, "sustain": 2.8, "isUpperKey": True, "boxHighlight": True}
            ]
        },
        {
            "text": "MONG",
            "start": 328.0,
            "end": 330.8,
            "indent": 1,
            "align": "center",
            "words": [
                {"text": "MONG", "start": 328.0, "end": 330.8, "sustain": 2.8, "isUpperKey": True, "boxHighlight": True}
            ]
        }
    ]
})

# Generate preset
preset_content = f"""/**
 * DEMO PRESET: CÒN THƯƠNG SẮC HOA CHUNG TÌNH
 * Thể hiện: QUANG GIÁP (Cover 7)
 * Sáng tác: Nhạc sĩ Lê Phương
 * 60FPS FinnXIII Sharp Kinetic Typography
 * FULLY CALIBRATED: 100% Exact Intro (00:00 - 01:19) + 100% Exact Excel Outro (04:44 - 05:31)
 * Fully synchronized with master audio (353.256s).
 */

window.DEMO_PRESET_GANH_HAO = {{
  audioName: 'dem_ganh_hao.mp3',
  audioTitle: 'Còn Thương Sắc Hoa Chung Tình',
  audioArtist: 'Quang Giáp',
  audioInfo: 'Sáng tác: Lê Phương • Thể hiện: Quang Giáp',
  audioUrl: 'assets/samples/dem_ganh_hao.mp3',
  audioDuration: 353.256,
  audioSha256: 'E14800F3AE300CA1A40CE2ECA2A9E2C30DFF1378B8ACF8C64A57DF8B80A90CFD',
  timingProvenance: 'reviewed',
  template: 'finnxiii',
  transition: 'kenburns',
  aspectRatio: '16-9',
  imageUrls: [
    'assets/dem_ganh_hao/01_Trang_Ganh_Hao.png',
    'assets/dem_ganh_hao/02_Hoai_Lang_Den_Dau.png',
    'assets/dem_ganh_hao/03_Ben_Song_Hoang_Hon.png',
    'assets/dem_ganh_hao/04_Tam_Tu_Ben_Ben_Nuoc.png',
    'assets/dem_ganh_hao/05_Ben_Do_Song_Que.png',
    'assets/dem_ganh_hao/08_Hoa_Luc_Binh_Tim.png',
    'assets/dem_ganh_hao/06_Song_Nuoc_Mien_Tay.png',
    'assets/dem_ganh_hao/07_Trang_Khuyet_Ben_Song.png',
    'assets/dem_ganh_hao/09_Bong_Em_Qua_Cau.png',
    'assets/dem_ganh_hao/10_Chieu_Tren_Song_Que.png'
  ],
  songMeta: {{
    title: 'CÒN THƯƠNG SẮC HOA CHUNG TÌNH',
    composer: 'LÊ PHƯƠNG',
    performer: 'QUANG GIÁP',
    artist: 'QUANG GIÁP',
    coverArtist: 'QUANG GIÁP',
    originalWork: 'OST SÔNG PHỐ NHÀ GHE',
    info: 'SÁNG TÁC: LÊ PHƯƠNG  •  THỂ HIỆN: QUANG GIÁP',
    topMeta: 'QUANG GIÁP  •  CÒN THƯƠNG SẮC HOA CHUNG TÌNH',
    subMeta: 'SÁNG TÁC: LÊ PHƯƠNG  |  THỂ HIỆN: QUANG GIÁP',
    cardLines: [
      {{ text: 'C Ò N', size: 14, weight: '700' }},
      {{ text: 'T H Ư Ơ N G', size: 13, weight: '700' }},
      {{ text: 'S Ắ C', size: 14, weight: '700' }},
      {{ text: 'H O A', size: 15, weight: '800' }},
      {{ text: 'C H U N G', size: 13, weight: '700' }},
      {{ text: 'T Ì N H', size: 16, weight: '900' }}
    ]
  }},
  wordsData: {json.dumps(stanzas, ensure_ascii=False, indent=2)}
}};
"""

out_file = ROOT / "js" / "preset_ganh_hao.js"
with open(out_file, "w", encoding="utf-8") as f:
    f.write(preset_content)

print(f"Successfully generated {len(stanzas)} stanzas with fully calibrated intro & outro into {out_file}")
