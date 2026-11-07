#!/usr/bin/env python3
"""
Builds preset_ganh_hao.js from TIMELINE_CAP_TU_HERO_DA_SUA.json (V3)
with Quang Giáp as performer (Cover 7), Lê Phương as composer,
and full Hero Word / Pair-level kinetic typography.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_V3 = ROOT / "docs" / "v3_timeline" / "TIMELINE_CAP_TU_HERO_DA_SUA.json"

with open(JSON_V3, "r", encoding="utf-8") as f:
    v3 = json.load(f)

lines = v3["lines"]
cues = v3["cues"]

cues_by_line = {}
for c in cues:
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
        
        # Sustain logic: only on sustained cues
        if is_long_sustain and (i == n - 1 or n == 1):
            word_obj["sustain"] = round(w_dur * 0.9, 2)
        elif is_med_sustain and (i == n - 1 or n == 1):
            word_obj["sustain"] = round(w_dur * 0.7, 2)

        out.append(word_obj)
    return out

STANZA_GROUPS = [
    # Mở đầu
    {"id": "gh_01", "lines": ["L01"], "layout": "center"},
    {"id": "gh_02", "lines": ["L02"], "layout": "left"},
    {"id": "gh_03", "lines": ["L03"], "layout": "right"},
    {"id": "gh_04", "lines": ["L04"], "layout": "center"},
    {"id": "gh_05", "lines": ["L05", "L06"], "layout": "left"},
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
    # Điệp khúc 2 (lặp lại sau giang tấu)
    {"id": "gh_18", "lines": ["L29", "L30", "L31", "L32"], "layout": "left"},
    {"id": "gh_19", "lines": ["L33", "L34"], "layout": "right"},
    {"id": "gh_20", "lines": ["L35", "L36", "L37", "L38"], "layout": "left"},
    {"id": "gh_21", "lines": ["L39", "L40", "L41"], "layout": "center"},
    # Kết
    {"id": "gh_22", "lines": ["L42", "L43"], "layout": "left"},
    {"id": "gh_23", "lines": ["L44", "L45"], "layout": "right"},
    {"id": "gh_24", "lines": ["L46"], "layout": "left"},
    {"id": "gh_25", "lines": ["L47", "L48"], "layout": "right"},
    {"id": "gh_26", "lines": ["L49"], "layout": "center"}
]

line_dict = {l["line_id"]: l for l in lines}

stanzas = []
for grp in STANZA_GROUPS:
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

# Format preset_ganh_hao.js
preset_content = f"""/**
 * DEMO PRESET: CÒN THƯƠNG SẮC HOA CHUNG TÌNH
 * Thể hiện: QUANG GIÁP (Cover 7)
 * Sáng tác: Nhạc sĩ Lê Phương
 * 60FPS FinnXIII Sharp Kinetic Typography with AUDITED V3 HERO WORD & PAIR-LEVEL TIMESTAMPS
 * Fully synchronized with master audio (353.256s) and cross-verified V3 dataset.
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

print(f"Successfully wrote {len(stanzas)} stanzas to {out_file}")
