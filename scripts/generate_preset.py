import json, sys
sys.stdout.reconfigure(encoding='utf-8')

# Define all 25 stanzas with exact audited timestamps
words_data = [
  # --- gh_0: Intro 1 ---
  {
    "id": "gh_0",
    "start": 3.5,
    "end": 24.5,
    "layout": "left",
    "text": "HÒ ƠI... ai xui con sáo SỔ LỒNG, cho em nỡ vội",
    "indent": 0,
    "lines": [
      {
        "text": "HÒ ƠI...",
        "start": 3.5,
        "end": 5.5,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "HÒ", "start": 3.5, "end": 4.5, "isUpperKey": True, "sustain": 1.0 },
          { "text": "ƠI...", "start": 4.5, "end": 5.5, "isUpperKey": True, "sustain": 1.0 }
        ]
      },
      {
        "text": "ai xui con sáo",
        "start": 15.5,
        "end": 17.8,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "ai", "start": 15.5, "end": 16.0 },
          { "text": "xui", "start": 16.0, "end": 16.5 },
          { "text": "con", "start": 16.5, "end": 17.0 },
          { "text": "sáo", "start": 17.0, "end": 17.8 }
        ]
      },
      {
        "text": "SỔ LỒNG,",
        "start": 17.8,
        "end": 20.2,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "SỔ", "start": 17.8, "end": 18.8, "isUpperKey": True, "boxHighlight": True },
          { "text": "LỒNG,", "start": 18.8, "end": 20.2, "isUpperKey": True, "sustain": 1.4 }
        ]
      },
      {
        "text": "cho em nỡ vội",
        "start": 20.5,
        "end": 24.0,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "cho", "start": 20.5, "end": 21.5 },
          { "text": "em", "start": 21.5, "end": 22.1 },
          { "text": "nỡ", "start": 22.1, "end": 22.8 },
          { "text": "vội", "start": 22.8, "end": 24.0, "sustain": 1.2 }
        ]
      }
    ]
  },

  # --- gh_1: Intro 2 ---
  {
    "id": "gh_1",
    "start": 36.5,
    "end": 48.0,
    "layout": "right",
    "text": "cho em nỡ vội LẤY CHỒNG BỎ ANH...",
    "indent": 0,
    "lines": [
      {
        "text": "cho em nỡ vội",
        "start": 37.0,
        "end": 40.0,
        "indent": 0,
        "align": "right",
        "words": [
          { "text": "cho", "start": 37.0, "end": 38.3 },
          { "text": "em", "start": 38.3, "end": 38.8 },
          { "text": "nỡ", "start": 38.8, "end": 39.4 },
          { "text": "vội", "start": 39.4, "end": 40.0 }
        ]
      },
      {
        "text": "LẤY CHỒNG",
        "start": 40.2,
        "end": 42.0,
        "indent": 1,
        "align": "right",
        "words": [
          { "text": "LẤY", "start": 40.2, "end": 41.2, "isUpperKey": True, "boxHighlight": True },
          { "text": "CHỒNG", "start": 41.2, "end": 42.0, "isUpperKey": True }
        ]
      },
      {
        "text": "BỎ ANH...",
        "start": 42.0,
        "end": 46.5,
        "indent": 2,
        "align": "right",
        "words": [
          { "text": "BỎ", "start": 42.0, "end": 43.5, "isUpperKey": True, "colorAccent": True },
          { "text": "ANH...", "start": 43.5, "end": 46.5, "isUpperKey": True, "sustain": 3.0 }
        ]
      }
    ]
  },

  # --- gh_2: Verse 1, Stanza 1 ---
  {
    "id": "gh_2",
    "start": 78.5,
    "end": 85.2,
    "layout": "left",
    "text": "sáo bay theo chồng đâu biết là ĐAU LÒNG ANH LẮM",
    "indent": 0,
    "lines": [
      {
        "text": "sáo bay theo chồng",
        "start": 78.8,
        "end": 81.3,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "sáo", "start": 78.8, "end": 79.7 },
          { "text": "bay", "start": 79.7, "end": 80.1 },
          { "text": "theo", "start": 80.1, "end": 80.6 },
          { "text": "chồng", "start": 80.6, "end": 81.3 }
        ]
      },
      {
        "text": "đâu biết là",
        "start": 81.5,
        "end": 82.8,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "đâu", "start": 81.5, "end": 82.2 },
          { "text": "biết", "start": 82.2, "end": 82.4 },
          { "text": "là", "start": 82.4, "end": 82.8 }
        ]
      },
      {
        "text": "ĐAU LÒNG",
        "start": 82.8,
        "end": 83.7,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "ĐAU", "start": 82.8, "end": 83.3, "isUpperKey": True, "boxHighlight": True },
          { "text": "LÒNG", "start": 83.3, "end": 83.7, "isUpperKey": True }
        ]
      },
      {
        "text": "ANH LẮM",
        "start": 83.7,
        "end": 85.0,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "ANH", "start": 83.7, "end": 84.2, "isUpperKey": True },
          { "text": "LẮM", "start": 84.2, "end": 85.0, "isUpperKey": True, "sustain": 0.8 }
        ]
      }
    ]
  },

  # --- gh_3: Verse 1, Stanza 2 ---
  {
    "id": "gh_3",
    "start": 85.5,
    "end": 93.2,
    "layout": "right",
    "text": "xót xa lặng thầm nhìn theo bước em QUA CẦU",
    "indent": 0,
    "lines": [
      {
        "text": "xót xa lặng thầm",
        "start": 85.8,
        "end": 88.3,
        "indent": 0,
        "align": "right",
        "words": [
          { "text": "xót", "start": 85.8, "end": 86.8 },
          { "text": "xa", "start": 86.8, "end": 87.2 },
          { "text": "lặng", "start": 87.2, "end": 87.6 },
          { "text": "thầm", "start": 87.6, "end": 88.3 }
        ]
      },
      {
        "text": "nhìn theo bước em",
        "start": 88.3,
        "end": 90.8,
        "indent": 1,
        "align": "right",
        "words": [
          { "text": "nhìn", "start": 88.3, "end": 89.2 },
          { "text": "theo", "start": 89.2, "end": 89.7 },
          { "text": "bước", "start": 89.7, "end": 90.2 },
          { "text": "em", "start": 90.2, "end": 90.8 }
        ]
      },
      {
        "text": "QUA CẦU",
        "start": 90.8,
        "end": 93.0,
        "indent": 2,
        "align": "right",
        "words": [
          { "text": "QUA", "start": 90.8, "end": 91.8, "isUpperKey": True, "boxHighlight": True },
          { "text": "CẦU", "start": 91.8, "end": 93.0, "isUpperKey": True, "sustain": 1.2 }
        ]
      }
    ]
  },

  # --- gh_4: Verse 1, Stanza 3 ---
  {
    "id": "gh_4",
    "start": 93.4,
    "end": 100.0,
    "layout": "left",
    "text": "ngày nào có nhau ta trao ước hẹn TRẦU CAU",
    "indent": 0,
    "lines": [
      {
        "text": "ngày nào có nhau",
        "start": 93.6,
        "end": 95.6,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "ngày", "start": 93.6, "end": 94.1 },
          { "text": "nào", "start": 94.1, "end": 94.4 },
          { "text": "có", "start": 94.4, "end": 94.7 },
          { "text": "nhau", "start": 94.7, "end": 95.6 }
        ]
      },
      {
        "text": "ta trao ước hẹn",
        "start": 95.6,
        "end": 97.5,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "ta", "start": 95.6, "end": 96.2 },
          { "text": "trao", "start": 96.2, "end": 96.7 },
          { "text": "ước", "start": 96.7, "end": 97.1 },
          { "text": "hẹn", "start": 97.1, "end": 97.5 }
        ]
      },
      {
        "text": "TRẦU CAU",
        "start": 97.5,
        "end": 99.8,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "TRẦU", "start": 97.5, "end": 98.6, "isUpperKey": True, "boxHighlight": True },
          { "text": "CAU", "start": 98.6, "end": 99.8, "isUpperKey": True, "sustain": 1.2 }
        ]
      }
    ]
  },

  # --- gh_5: Verse 1, Stanza 4 ---
  {
    "id": "gh_5",
    "start": 100.0,
    "end": 106.8,
    "layout": "center",
    "text": "mong duyên ban đầu trời thương không đổ MƯA NGÂU",
    "indent": 0,
    "lines": [
      {
        "text": "mong duyên ban đầu",
        "start": 100.2,
        "end": 102.5,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "mong", "start": 100.2, "end": 100.9 },
          { "text": "duyên", "start": 100.9, "end": 101.5 },
          { "text": "ban", "start": 101.5, "end": 101.8 },
          { "text": "đầu", "start": 101.8, "end": 102.5 }
        ]
      },
      {
        "text": "trời thương",
        "start": 102.8,
        "end": 103.8,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "trời", "start": 102.8, "end": 103.4 },
          { "text": "thương", "start": 103.4, "end": 103.8 }
        ]
      },
      {
        "text": "không đổ MƯA NGÂU",
        "start": 103.8,
        "end": 106.5,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "không", "start": 103.8, "end": 104.3 },
          { "text": "đổ", "start": 104.3, "end": 104.8 },
          { "text": "MƯA", "start": 104.8, "end": 105.5, "isUpperKey": True, "boxHighlight": True },
          { "text": "NGÂU", "start": 105.5, "end": 106.5, "isUpperKey": True, "sustain": 1.0 }
        ]
      }
    ]
  },

  # --- gh_6: Verse 1, Stanza 5 ---
  {
    "id": "gh_6",
    "start": 107.0,
    "end": 113.8,
    "layout": "left",
    "text": "bóng em xa dần ANH biết là một lần CHIA CÁCH",
    "indent": 0,
    "lines": [
      {
        "text": "bóng em xa dần",
        "start": 107.3,
        "end": 109.5,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "bóng", "start": 107.3, "end": 107.9 },
          { "text": "em", "start": 107.9, "end": 108.3 },
          { "text": "xa", "start": 108.3, "end": 108.8 },
          { "text": "dần", "start": 108.8, "end": 109.5 }
        ]
      },
      {
        "text": "ANH biết là",
        "start": 109.8,
        "end": 111.2,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "ANH", "start": 109.8, "end": 110.4, "isUpperKey": True, "colorAccent": True },
          { "text": "biết", "start": 110.4, "end": 110.8 },
          { "text": "là", "start": 110.8, "end": 111.2 }
        ]
      },
      {
        "text": "một lần CHIA CÁCH",
        "start": 111.2,
        "end": 113.5,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "một", "start": 111.2, "end": 111.7 },
          { "text": "lần", "start": 111.7, "end": 112.2 },
          { "text": "CHIA", "start": 112.2, "end": 112.8, "isUpperKey": True, "boxHighlight": True },
          { "text": "CÁCH", "start": 112.8, "end": 113.5, "isUpperKey": True, "sustain": 0.7 }
        ]
      }
    ]
  },

  # --- gh_7: Verse 1, Stanza 6 ---
  {
    "id": "gh_7",
    "start": 114.0,
    "end": 121.0,
    "layout": "right",
    "text": "trách ai vô tình đành tâm XẺ ĐÔI TIM MÌNH",
    "indent": 0,
    "lines": [
      {
        "text": "trách ai vô tình",
        "start": 114.4,
        "end": 116.8,
        "indent": 0,
        "align": "right",
        "words": [
          { "text": "trách", "start": 114.4, "end": 114.9 },
          { "text": "ai", "start": 114.9, "end": 115.4 },
          { "text": "vô", "start": 115.4, "end": 115.8 },
          { "text": "tình", "start": 115.8, "end": 116.8 }
        ]
      },
      {
        "text": "đành tâm",
        "start": 117.0,
        "end": 118.0,
        "indent": 1,
        "align": "right",
        "words": [
          { "text": "đành", "start": 117.0, "end": 117.5 },
          { "text": "tâm", "start": 117.5, "end": 118.0 }
        ]
      },
      {
        "text": "XẺ ĐÔI TIM MÌNH",
        "start": 118.0,
        "end": 120.8,
        "indent": 2,
        "align": "right",
        "words": [
          { "text": "XẺ", "start": 118.0, "end": 118.6, "isUpperKey": True, "boxHighlight": True },
          { "text": "ĐÔI", "start": 118.6, "end": 119.2, "isUpperKey": True },
          { "text": "TIM", "start": 119.2, "end": 119.8, "isUpperKey": True },
          { "text": "MÌNH", "start": 119.8, "end": 120.8, "isUpperKey": True, "sustain": 1.0 }
        ]
      }
    ]
  },

  # --- gh_8: Verse 1, Stanza 7 ---
  {
    "id": "gh_8",
    "start": 121.0,
    "end": 128.0,
    "layout": "left",
    "text": "dặn lòng cố quên sao đêm vẫn THẦM gọi tên",
    "indent": 0,
    "lines": [
      {
        "text": "dặn lòng cố quên",
        "start": 121.2,
        "end": 123.8,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "dặn", "start": 121.2, "end": 122.0 },
          { "text": "lòng", "start": 122.0, "end": 122.5 },
          { "text": "cố", "start": 122.5, "end": 122.9 },
          { "text": "quên", "start": 122.9, "end": 123.8 }
        ]
      },
      {
        "text": "sao đêm vẫn THẦM",
        "start": 124.0,
        "end": 126.0,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "sao", "start": 124.0, "end": 124.5 },
          { "text": "đêm", "start": 124.5, "end": 124.9 },
          { "text": "vẫn", "start": 124.9, "end": 125.3 },
          { "text": "THẦM", "start": 125.3, "end": 126.0, "isUpperKey": True, "boxHighlight": True }
        ]
      },
      {
        "text": "gọi tên",
        "start": 126.0,
        "end": 127.8,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "gọi", "start": 126.0, "end": 126.6 },
          { "text": "tên", "start": 126.6, "end": 127.8, "sustain": 1.2 }
        ]
      }
    ]
  },

  # --- gh_9: Verse 1, Stanza 8 ---
  {
    "id": "gh_9",
    "start": 128.0,
    "end": 140.0,
    "layout": "lower",
    "text": "ai ru trong chiều cho lòng càng nhớ EM NHIỀU...",
    "indent": 0,
    "lines": [
      {
        "text": "ai ru trong chiều",
        "start": 128.5,
        "end": 131.2,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "ai", "start": 128.5, "end": 129.2 },
          { "text": "ru", "start": 129.2, "end": 129.6 },
          { "text": "trong", "start": 129.6, "end": 130.0 },
          { "text": "chiều", "start": 130.0, "end": 131.2 }
        ]
      },
      {
        "text": "cho lòng càng nhớ",
        "start": 131.2,
        "end": 133.5,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "cho", "start": 131.2, "end": 131.9 },
          { "text": "lòng", "start": 131.9, "end": 132.5 },
          { "text": "càng", "start": 132.5, "end": 133.0 },
          { "text": "nhớ", "start": 133.0, "end": 133.5 }
        ]
      },
      {
        "text": "EM NHIỀU...",
        "start": 133.5,
        "end": 138.5,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "EM", "start": 133.5, "end": 134.5, "isUpperKey": True, "colorAccent": True },
          { "text": "NHIỀU...", "start": 134.5, "end": 138.5, "isUpperKey": True, "boxHighlight": True, "sustain": 4.0 }
        ]
      }
    ]
  },

  # --- gh_10: Chorus 1, Part 1 ---
  {
    "id": "gh_10",
    "start": 142.0,
    "end": 156.5,
    "layout": "left",
    "text": "À ƠI... em nỡ sao em bỏ anh một mình LỤC BÌNH TRÔI chẳng biết nơi neo",
    "indent": 0,
    "lines": [
      {
        "text": "À ƠI... em nỡ sao em",
        "start": 142.6,
        "end": 149.2,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "À", "start": 142.6, "end": 143.8, "isUpperKey": True, "sustain": 1.2 },
          { "text": "ƠI...", "start": 143.8, "end": 145.5, "isUpperKey": True, "sustain": 1.7 },
          { "text": "em", "start": 145.5, "end": 146.8 },
          { "text": "nỡ", "start": 146.8, "end": 147.3 },
          { "text": "sao", "start": 147.3, "end": 147.8 },
          { "text": "em", "start": 147.8, "end": 149.2, "sustain": 1.4 }
        ]
      },
      {
        "text": "bỏ anh một mình",
        "start": 149.5,
        "end": 151.8,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "bỏ", "start": 149.5, "end": 150.3 },
          { "text": "anh", "start": 150.3, "end": 150.7 },
          { "text": "một", "start": 150.7, "end": 151.0 },
          { "text": "mình", "start": 151.0, "end": 151.8 }
        ]
      },
      {
        "text": "LỤC BÌNH TRÔI",
        "start": 151.8,
        "end": 154.0,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "LỤC", "start": 151.8, "end": 152.7, "isUpperKey": True, "boxHighlight": True },
          { "text": "BÌNH", "start": 152.7, "end": 153.2, "isUpperKey": True },
          { "text": "TRÔI", "start": 153.2, "end": 154.0, "isUpperKey": True }
        ]
      },
      {
        "text": "chẳng biết nơi neo",
        "start": 154.0,
        "end": 156.2,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "chẳng", "start": 154.0, "end": 154.4 },
          { "text": "biết", "start": 154.4, "end": 154.8 },
          { "text": "nơi", "start": 154.8, "end": 155.3 },
          { "text": "neo", "start": 155.3, "end": 156.2, "sustain": 0.9 }
        ]
      }
    ]
  },

  # --- gh_11: Chorus 1, Part 2 ---
  {
    "id": "gh_11",
    "start": 156.8,
    "end": 170.5,
    "layout": "right",
    "text": "CÒN THƯƠNG tóc em buông dài TÍM HOA anh cài em cười SIẾT CHẶT VÒNG TAY",
    "indent": 0,
    "lines": [
      {
        "text": "CÒN THƯƠNG tóc em buông dài",
        "start": 157.0,
        "end": 163.0,
        "indent": 0,
        "align": "right",
        "words": [
          { "text": "CÒN", "start": 157.0, "end": 157.8, "isUpperKey": True, "boxHighlight": True },
          { "text": "THƯƠNG", "start": 157.8, "end": 159.5, "isUpperKey": True, "sustain": 1.7 },
          { "text": "tóc", "start": 159.5, "end": 160.7 },
          { "text": "em", "start": 160.7, "end": 161.2 },
          { "text": "buông", "start": 161.2, "end": 161.6 },
          { "text": "dài", "start": 161.6, "end": 163.0, "sustain": 1.4 }
        ]
      },
      {
        "text": "TÍM HOA anh cài",
        "start": 163.5,
        "end": 166.0,
        "indent": 1,
        "align": "right",
        "words": [
          { "text": "TÍM", "start": 163.5, "end": 164.5, "isUpperKey": True, "colorAccent": True },
          { "text": "HOA", "start": 164.5, "end": 165.2, "isUpperKey": True },
          { "text": "anh", "start": 165.2, "end": 165.5 },
          { "text": "cài", "start": 165.5, "end": 166.0 }
        ]
      },
      {
        "text": "em cười SIẾT CHẶT VÒNG TAY",
        "start": 166.0,
        "end": 170.0,
        "indent": 2,
        "align": "right",
        "words": [
          { "text": "em", "start": 166.0, "end": 166.5 },
          { "text": "cười", "start": 166.5, "end": 167.2 },
          { "text": "SIẾT", "start": 167.2, "end": 167.8, "isUpperKey": True, "boxHighlight": True },
          { "text": "CHẶT", "start": 167.8, "end": 168.2, "isUpperKey": True },
          { "text": "VÒNG", "start": 168.2, "end": 168.8, "isUpperKey": True },
          { "text": "TAY", "start": 168.8, "end": 170.0, "isUpperKey": True, "sustain": 1.2 }
        ]
      }
    ]
  },

  # --- gh_12: Chorus 1, Part 3 ---
  {
    "id": "gh_12",
    "start": 170.8,
    "end": 187.5,
    "layout": "left",
    "text": "À ƠI... nói thương anh nhiều đành lòng EM CẤT BƯỚC SANG SÔNG...",
    "indent": 0,
    "lines": [
      {
        "text": "À ƠI... em nỡ sao em",
        "start": 171.0,
        "end": 176.5,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "À", "start": 171.0, "end": 172.0, "isUpperKey": True },
          { "text": "ƠI...", "start": 172.0, "end": 174.2, "isUpperKey": True, "sustain": 2.2 },
          { "text": "em", "start": 174.5, "end": 175.0 },
          { "text": "nỡ", "start": 175.0, "end": 175.5 },
          { "text": "sao", "start": 175.5, "end": 176.0 },
          { "text": "em", "start": 176.0, "end": 176.5 }
        ]
      },
      {
        "text": "nói thương anh nhiều",
        "start": 176.5,
        "end": 180.2,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "nói", "start": 176.5, "end": 177.5 },
          { "text": "thương", "start": 177.5, "end": 178.5 },
          { "text": "anh", "start": 178.5, "end": 179.2 },
          { "text": "nhiều", "start": 179.2, "end": 180.2, "sustain": 1.0 }
        ]
      },
      {
        "text": "đành lòng EM CẤT BƯỚC",
        "start": 180.5,
        "end": 183.5,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "đành", "start": 180.5, "end": 181.1 },
          { "text": "lòng", "start": 181.1, "end": 181.5 },
          { "text": "EM", "start": 181.5, "end": 182.0, "isUpperKey": True, "colorAccent": True },
          { "text": "CẤT", "start": 182.0, "end": 182.6, "isUpperKey": True, "boxHighlight": True },
          { "text": "BƯỚC", "start": 182.6, "end": 183.5, "isUpperKey": True }
        ]
      },
      {
        "text": "SANG SÔNG...",
        "start": 183.5,
        "end": 187.2,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "SANG", "start": 183.5, "end": 184.8, "isUpperKey": True },
          { "text": "SÔNG...", "start": 184.8, "end": 187.2, "isUpperKey": True, "sustain": 2.4 }
        ]
      }
    ]
  },

  # --- gh_13: Chorus 1, Part 4 ---
  {
    "id": "gh_13",
    "start": 187.5,
    "end": 200.0,
    "layout": "center",
    "text": "vì đâu dở dang duyên mình SẮC HOA CHUNG TÌNH chưa phai màu NỠ NÀO NGƯỜI ĐI...",
    "indent": 0,
    "lines": [
      {
        "text": "vì đâu dở dang duyên mình",
        "start": 187.8,
        "end": 192.0,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "vì", "start": 187.8, "end": 188.5 },
          { "text": "đâu", "start": 188.5, "end": 189.2 },
          { "text": "dở", "start": 189.2, "end": 189.7 },
          { "text": "dang", "start": 189.7, "end": 190.2 },
          { "text": "duyên", "start": 190.2, "end": 190.8 },
          { "text": "mình", "start": 190.8, "end": 192.0, "sustain": 1.2 }
        ]
      },
      {
        "text": "SẮC HOA CHUNG TÌNH",
        "start": 192.2,
        "end": 194.5,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "SẮC", "start": 192.2, "end": 192.8, "isUpperKey": True, "boxHighlight": True },
          { "text": "HOA", "start": 192.8, "end": 193.4, "isUpperKey": True },
          { "text": "CHUNG", "start": 193.4, "end": 194.0, "isUpperKey": True },
          { "text": "TÌNH", "start": 194.0, "end": 194.5, "isUpperKey": True }
        ]
      },
      {
        "text": "chưa phai màu",
        "start": 194.5,
        "end": 196.0,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "chưa", "start": 194.5, "end": 195.0 },
          { "text": "phai", "start": 195.0, "end": 195.5 },
          { "text": "màu", "start": 195.5, "end": 196.0 }
        ]
      },
      {
        "text": "NỠ NÀO NGƯỜI ĐI...",
        "start": 196.0,
        "end": 199.5,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "NỠ", "start": 196.0, "end": 196.6, "isUpperKey": True, "colorAccent": True },
          { "text": "NÀO", "start": 196.6, "end": 197.2, "isUpperKey": True },
          { "text": "NGƯỜI", "start": 197.2, "end": 197.8, "isUpperKey": True },
          { "text": "ĐI...", "start": 197.8, "end": 199.5, "isUpperKey": True, "boxHighlight": True, "sustain": 1.7 }
        ]
      }
    ]
  },

  # --- gh_14: Chorus 2 Reprise, Part 1 ---
  {
    "id": "gh_14",
    "start": 234.5,
    "end": 241.0,
    "layout": "left",
    "text": "bỏ anh một mình LỤC BÌNH TRÔI chẳng biết nơi neo",
    "indent": 0,
    "lines": [
      {
        "text": "bỏ anh một mình",
        "start": 234.8,
        "end": 236.5,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "bỏ", "start": 234.8, "end": 235.1 },
          { "text": "anh", "start": 235.1, "end": 235.4 },
          { "text": "một", "start": 235.4, "end": 235.8 },
          { "text": "mình", "start": 235.8, "end": 236.5 }
        ]
      },
      {
        "text": "LỤC BÌNH TRÔI",
        "start": 236.8,
        "end": 238.8,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "LỤC", "start": 236.8, "end": 237.5, "isUpperKey": True, "boxHighlight": True },
          { "text": "BÌNH", "start": 237.5, "end": 238.0, "isUpperKey": True },
          { "text": "TRÔI", "start": 238.0, "end": 238.8, "isUpperKey": True }
        ]
      },
      {
        "text": "chẳng biết nơi neo",
        "start": 238.8,
        "end": 240.8,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "chẳng", "start": 238.8, "end": 239.2 },
          { "text": "biết", "start": 239.2, "end": 239.6 },
          { "text": "nơi", "start": 239.6, "end": 240.0 },
          { "text": "neo", "start": 240.0, "end": 240.8, "sustain": 0.8 }
        ]
      }
    ]
  },

  # --- gh_15: Chorus 2 Reprise, Part 2 ---
  {
    "id": "gh_15",
    "start": 241.2,
    "end": 255.0,
    "layout": "right",
    "text": "CÒN THƯƠNG tóc em buông dài TÍM HOA anh cài em cười SIẾT CHẶT VÒNG TAY",
    "indent": 0,
    "lines": [
      {
        "text": "CÒN THƯƠNG tóc em buông dài",
        "start": 241.5,
        "end": 247.5,
        "indent": 0,
        "align": "right",
        "words": [
          { "text": "CÒN", "start": 241.5, "end": 242.6, "isUpperKey": True, "boxHighlight": True },
          { "text": "THƯƠNG", "start": 242.6, "end": 244.5, "isUpperKey": True, "sustain": 1.9 },
          { "text": "tóc", "start": 244.5, "end": 245.8 },
          { "text": "em", "start": 245.8, "end": 246.3 },
          { "text": "buông", "start": 246.3, "end": 246.8 },
          { "text": "dài", "start": 246.8, "end": 247.5 }
        ]
      },
      {
        "text": "TÍM HOA anh cài",
        "start": 248.5,
        "end": 251.0,
        "indent": 1,
        "align": "right",
        "words": [
          { "text": "TÍM", "start": 248.5, "end": 249.5, "isUpperKey": True, "colorAccent": True },
          { "text": "HOA", "start": 249.5, "end": 250.0, "isUpperKey": True },
          { "text": "anh", "start": 250.0, "end": 250.4 },
          { "text": "cài", "start": 250.4, "end": 251.0 }
        ]
      },
      {
        "text": "em cười SIẾT CHẶT VÒNG TAY",
        "start": 251.0,
        "end": 254.5,
        "indent": 2,
        "align": "right",
        "words": [
          { "text": "em", "start": 251.0, "end": 251.5 },
          { "text": "cười", "start": 251.5, "end": 252.2 },
          { "text": "SIẾT", "start": 252.2, "end": 252.8, "isUpperKey": True, "boxHighlight": True },
          { "text": "CHẶT", "start": 252.8, "end": 253.2, "isUpperKey": True },
          { "text": "VÒNG", "start": 253.2, "end": 253.7, "isUpperKey": True },
          { "text": "TAY", "start": 253.7, "end": 254.5, "isUpperKey": True, "sustain": 0.8 }
        ]
      }
    ]
  },

  # --- gh_16: Chorus 2 Reprise, Part 3 ---
  {
    "id": "gh_16",
    "start": 255.2,
    "end": 272.0,
    "layout": "left",
    "text": "À ƠI... nói thương anh nhiều đành lòng EM CẤT BƯỚC SANG SÔNG...",
    "indent": 0,
    "lines": [
      {
        "text": "À ƠI... em nỡ sao em",
        "start": 255.5,
        "end": 261.0,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "À", "start": 255.5, "end": 256.9, "isUpperKey": True },
          { "text": "ƠI...", "start": 256.9, "end": 259.0, "isUpperKey": True, "sustain": 2.1 },
          { "text": "em", "start": 259.2, "end": 259.7 },
          { "text": "nỡ", "start": 259.7, "end": 260.1 },
          { "text": "sao", "start": 260.1, "end": 260.6 },
          { "text": "em", "start": 260.6, "end": 261.0 }
        ]
      },
      {
        "text": "nói thương anh nhiều",
        "start": 261.0,
        "end": 264.8,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "nói", "start": 261.0, "end": 262.0 },
          { "text": "thương", "start": 262.0, "end": 263.0 },
          { "text": "anh", "start": 263.0, "end": 263.8 },
          { "text": "nhiều", "start": 263.8, "end": 264.8, "sustain": 1.0 }
        ]
      },
      {
        "text": "đành lòng EM CẤT BƯỚC",
        "start": 264.8,
        "end": 268.0,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "đành", "start": 264.8, "end": 265.7 },
          { "text": "lòng", "start": 265.7, "end": 266.1 },
          { "text": "EM", "start": 266.1, "end": 266.6, "isUpperKey": True, "colorAccent": True },
          { "text": "CẤT", "start": 266.6, "end": 267.2, "isUpperKey": True, "boxHighlight": True },
          { "text": "BƯỚC", "start": 267.2, "end": 268.0, "isUpperKey": True }
        ]
      },
      {
        "text": "SANG SÔNG...",
        "start": 268.0,
        "end": 271.7,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "SANG", "start": 268.0, "end": 269.5, "isUpperKey": True },
          { "text": "SÔNG...", "start": 269.5, "end": 271.7, "isUpperKey": True, "sustain": 2.2 }
        ]
      }
    ]
  },

  # --- gh_17: Chorus 2 Reprise, Part 4 ---
  {
    "id": "gh_17",
    "start": 272.2,
    "end": 283.5,
    "layout": "center",
    "text": "vì đâu dở dang duyên mình SẮC HOA CHUNG TÌNH chưa phai màu NỠ NÀO NGƯỜI ĐI...",
    "indent": 0,
    "lines": [
      {
        "text": "vì đâu dở dang duyên mình",
        "start": 272.8,
        "end": 276.8,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "vì", "start": 272.8, "end": 273.5 },
          { "text": "đâu", "start": 273.5, "end": 274.0 },
          { "text": "dở", "start": 274.0, "end": 274.5 },
          { "text": "dang", "start": 274.5, "end": 275.0 },
          { "text": "duyên", "start": 275.0, "end": 275.6 },
          { "text": "mình", "start": 275.6, "end": 276.8, "sustain": 1.2 }
        ]
      },
      {
        "text": "SẮC HOA CHUNG TÌNH",
        "start": 276.8,
        "end": 279.0,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "SẮC", "start": 276.8, "end": 277.3, "isUpperKey": True, "boxHighlight": True },
          { "text": "HOA", "start": 277.3, "end": 277.8, "isUpperKey": True },
          { "text": "CHUNG", "start": 277.8, "end": 278.4, "isUpperKey": True },
          { "text": "TÌNH", "start": 278.4, "end": 279.0, "isUpperKey": True }
        ]
      },
      {
        "text": "chưa phai màu",
        "start": 279.0,
        "end": 280.2,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "chưa", "start": 279.0, "end": 279.4 },
          { "text": "phai", "start": 279.4, "end": 279.8 },
          { "text": "màu", "start": 279.8, "end": 280.2 }
        ]
      },
      {
        "text": "NỠ NÀO NGƯỜI ĐI...",
        "start": 280.2,
        "end": 283.0,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "NỠ", "start": 280.2, "end": 280.8, "isUpperKey": True, "colorAccent": True },
          { "text": "NÀO", "start": 280.8, "end": 281.3, "isUpperKey": True },
          { "text": "NGƯỜI", "start": 281.3, "end": 281.8, "isUpperKey": True },
          { "text": "ĐI...", "start": 281.8, "end": 283.0, "isUpperKey": True, "boxHighlight": True, "sustain": 1.2 }
        ]
      }
    ]
  },

  # --- gh_18: Climax Part 1 (EXCEL ROW 2-9) ---
  {
    "id": "gh_18",
    "start": 284.5,
    "end": 290.8,
    "layout": "left",
    "text": "Dòng nhớ trong tim LÀM SAO CHIA CÁCH",
    "indent": 0,
    "lines": [
      {
        "text": "Dòng nhớ trong tim",
        "start": 284.5,
        "end": 287.5,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "Dòng", "start": 284.5, "end": 285.0, "sustain": 0.5, "note": "Bắt đầu chuyển đoạn chậm dần (rit.)" },
          { "text": "nhớ", "start": 285.0, "end": 285.5, "sustain": 0.5, "note": "Nhả chữ vừa" },
          { "text": "trong", "start": 285.5, "end": 286.0, "sustain": 0.5, "note": "Lướt nhẹ" },
          { "text": "tim", "start": 286.0, "end": 287.5, "sustain": 1.5, "boxHighlight": True, "note": "Ngân sâu lắng" }
        ]
      },
      {
        "text": "LÀM SAO CHIA CÁCH",
        "start": 288.0,
        "end": 290.8,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "LÀM", "start": 288.0, "end": 288.5, "isUpperKey": True, "boxHighlight": True, "sustain": 0.5, "note": "Nhấn âm" },
          { "text": "SAO", "start": 288.5, "end": 289.0, "isUpperKey": True, "sustain": 0.5, "note": "Giữ nốt" },
          { "text": "CHIA", "start": 289.0, "end": 289.5, "isUpperKey": True, "sustain": 0.5, "note": "Lên nhẹ" },
          { "text": "CÁCH", "start": 289.5, "end": 290.8, "isUpperKey": True, "sustain": 1.3, "note": "Ngân dứt vế" }
        ]
      }
    ]
  },

  # --- gh_19: Climax Part 2 (EXCEL ROW 10-13) ---
  {
    "id": "gh_19",
    "start": 291.0,
    "end": 294.5,
    "layout": "right",
    "text": "Người thương CÓ HAY...",
    "indent": 0,
    "lines": [
      {
        "text": "Người thương",
        "start": 291.0,
        "end": 292.0,
        "indent": 0,
        "align": "right",
        "words": [
          { "text": "Người", "start": 291.0, "end": 291.5, "sustain": 0.5, "note": "Hát nấc tâm trạng" },
          { "text": "thương", "start": 291.5, "end": 292.0, "sustain": 0.5, "note": "Vuốt nốt" }
        ]
      },
      {
        "text": "CÓ HAY...",
        "start": 292.0,
        "end": 294.2,
        "indent": 1,
        "align": "right",
        "words": [
          { "text": "CÓ", "start": 292.0, "end": 292.5, "isUpperKey": True, "sustain": 0.5, "note": "Nhả nhanh" },
          { "text": "HAY...", "start": 292.5, "end": 294.2, "isUpperKey": True, "boxHighlight": True, "sustain": 1.7, "note": "Ngân rung nhẹ" }
        ]
      }
    ]
  },

  # --- gh_20: Climax Part 3 (EXCEL ROW 14-19) ---
  {
    "id": "gh_20",
    "start": 295.0,
    "end": 301.6,
    "layout": "left",
    "text": "Đêm dài Mình anh THAO THỨC",
    "indent": 0,
    "lines": [
      {
        "text": "Đêm dài",
        "start": 295.0,
        "end": 297.6,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "Đêm", "start": 295.0, "end": 296.0, "sustain": 1.0, "note": "Xuống thấp, nhấn mạnh" },
          { "text": "dài", "start": 296.0, "end": 297.6, "sustain": 1.6, "boxHighlight": True, "note": "Ngân trầm kéo dài" }
        ]
      },
      {
        "text": "Mình anh",
        "start": 298.0,
        "end": 299.2,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "Mình", "start": 298.0, "end": 298.6, "sustain": 0.6, "note": "Nhịp dằn" },
          { "text": "anh", "start": 298.6, "end": 299.2, "sustain": 0.6, "note": "Giữ âm" }
        ]
      },
      {
        "text": "THAO THỨC",
        "start": 299.2,
        "end": 301.4,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "THAO", "start": 299.2, "end": 299.8, "isUpperKey": True, "sustain": 0.6, "note": "Chuyển nốt" },
          { "text": "THỨC", "start": 299.8, "end": 301.4, "isUpperKey": True, "boxHighlight": True, "sustain": 1.6, "note": "Ngân ngắt nhịp" }
        ]
      }
    ]
  },

  # --- gh_21: Climax Part 4 (EXCEL ROW 20-25) ---
  {
    "id": "gh_21",
    "start": 302.0,
    "end": 308.8,
    "layout": "right",
    "text": "Em giờ Biết lòng BUỒN VUI",
    "indent": 0,
    "lines": [
      {
        "text": "Em giờ",
        "start": 302.0,
        "end": 304.6,
        "indent": 0,
        "align": "right",
        "words": [
          { "text": "Em", "start": 302.0, "end": 303.0, "colorAccent": True, "sustain": 1.0, "note": "Nhấn tiếng kêu gọi" },
          { "text": "giờ", "start": 303.0, "end": 304.6, "sustain": 1.6, "note": "Ngân nhẹ" }
        ]
      },
      {
        "text": "Biết lòng",
        "start": 305.0,
        "end": 306.2,
        "indent": 1,
        "align": "right",
        "words": [
          { "text": "Biết", "start": 305.0, "end": 305.6, "sustain": 0.6, "note": "Lấy nhịp" },
          { "text": "lòng", "start": 305.6, "end": 306.2, "sustain": 0.6, "note": "Hạ nốt" }
        ]
      },
      {
        "text": "BUỒN VUI",
        "start": 306.2,
        "end": 308.5,
        "indent": 2,
        "align": "right",
        "words": [
          { "text": "BUỒN", "start": 306.2, "end": 306.8, "isUpperKey": True, "sustain": 0.6, "note": "Nén cảm xúc" },
          { "text": "VUI", "start": 306.8, "end": 308.5, "isUpperKey": True, "boxHighlight": True, "sustain": 1.7, "note": "Ngân luyến buồn" }
        ]
      }
    ]
  },

  # --- gh_22: Climax Part 5 (EXCEL ROW 26-31) ---
  {
    "id": "gh_22",
    "start": 309.0,
    "end": 315.8,
    "layout": "left",
    "text": "Em về Làm dâu BÊN ẤY...",
    "indent": 0,
    "lines": [
      {
        "text": "Em về",
        "start": 309.0,
        "end": 311.4,
        "indent": 0,
        "align": "left",
        "words": [
          { "text": "Em", "start": 309.0, "end": 310.0, "colorAccent": True, "sustain": 1.0, "note": "Nhắc lại tên" },
          { "text": "về", "start": 310.0, "end": 311.4, "sustain": 1.4, "note": "Ngân buông thõng" }
        ]
      },
      {
        "text": "Làm dâu",
        "start": 312.0,
        "end": 313.2,
        "indent": 1,
        "align": "left",
        "words": [
          { "text": "Làm", "start": 312.0, "end": 312.6, "sustain": 0.6, "note": "Nhịp chậm" },
          { "text": "dâu", "start": 312.6, "end": 313.2, "sustain": 0.6, "note": "Tròn âm" }
        ]
      },
      {
        "text": "BÊN ẤY...",
        "start": 313.2,
        "end": 315.6,
        "indent": 2,
        "align": "left",
        "words": [
          { "text": "BÊN", "start": 313.2, "end": 313.8, "isUpperKey": True, "sustain": 0.6, "note": "Lướt" },
          { "text": "ẤY...", "start": 313.8, "end": 315.6, "isUpperKey": True, "boxHighlight": True, "sustain": 1.8, "note": "Ngân xa dần" }
        ]
      }
    ]
  },

  # --- gh_23: Outro Finale (EXCEL ROW 32-37) ---
  {
    "id": "gh_23",
    "start": 316.2,
    "end": 330.8,
    "layout": "center",
    "text": "Bên này... VẪN HOÀI... CHỜ... MONG...",
    "indent": 0,
    "lines": [
      {
        "text": "Bên này...",
        "start": 316.2,
        "end": 319.6,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "Bên", "start": 316.2, "end": 317.0, "sustain": 0.8, "note": "Bắt đầu câu kết bài" },
          { "text": "này...", "start": 317.0, "end": 319.6, "sustain": 2.6, "boxHighlight": True, "note": "Ngân dài trầm buồn" }
        ]
      },
      {
        "text": "VẪN HOÀI...",
        "start": 320.0,
        "end": 323.8,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "VẪN", "start": 320.0, "end": 320.6, "isUpperKey": True, "sustain": 0.6, "note": "Nhấn dấu ngã" },
          { "text": "HOÀI...", "start": 320.6, "end": 323.8, "isUpperKey": True, "boxHighlight": True, "sustain": 3.2, "note": "Ngân kéo dài da diết" }
        ]
      },
      {
        "text": "CHỜ... MONG...",
        "start": 324.6,
        "end": 330.8,
        "indent": 0,
        "align": "center",
        "words": [
          { "text": "CHỜ...", "start": 324.6, "end": 327.4, "isUpperKey": True, "colorAccent": True, "sustain": 2.8, "note": "Ngân rung, giảm dần âm lượng" },
          { "text": "MONG...", "start": 328.0, "end": 330.8, "isUpperKey": True, "boxHighlight": True, "sustain": 2.8, "note": "Tiếng hát dứt hẳn, tan vào nhạc" }
        ]
      }
    ]
  }
]

# Validation
print(f"Total stanzas: {len(words_data)}")
for i, s in enumerate(words_data):
    assert s['start'] <= s['end'], f"Stanza {s['id']} start > end"
    if i > 0:
        prev = words_data[i-1]
        assert prev['end'] <= s['start'] + 0.1, f"Overlap between {prev['id']} ({prev['end']}) and {s['id']} ({s['start']})"
    for l in s['lines']:
        assert l['start'] <= l['end'], f"Line {l['text']} in {s['id']} start > end"
        assert l['words'][0]['start'] == l['start'], f"Line start {l['start']} != first word start {l['words'][0]['start']}"
        assert l['words'][-1]['end'] == l['end'], f"Line end {l['end']} != last word end {l['words'][-1]['end']}"
        for w in l['words']:
            assert w['start'] <= w['end'], f"Word {w['text']} in {s['id']} start > end"

print("All timing validations PASSED!")

# Build audited_timeline.json
audited_timeline = []
for s in words_data:
    for l in s['lines']:
        phrase_entry = {
            "sec": s["id"],
            "phrase": l["text"],
            "words": []
        }
        for w in l["words"]:
            w_obj = {
                "w": w["text"],
                "start": w["start"],
                "end": w["end"]
            }
            if "sustain" in w:
                w_obj["sustain"] = f"{w['sustain']}s"
            if "note" in w:
                w_obj["note"] = w["note"]
            if w.get("boxHighlight"):
                w_obj["boxHighlight"] = True
            if w.get("colorAccent"):
                w_obj["colorAccent"] = True
            if w.get("isUpperKey"):
                w_obj["isUpperKey"] = True
            phrase_entry["words"].append(w_obj)
        audited_timeline.append(phrase_entry)

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\audited_timeline.json', 'w', encoding='utf-8') as f:
    json.dump(audited_timeline, f, ensure_ascii=False, indent=2)

print("Saved audited_timeline.json successfully!")

# Build js/preset_ganh_hao.js
preset_content = f"""/**
 * DEMO PRESET: ĐÊM GÀNH HÀO (CÒN THƯƠNG SẮC HOA CHUNG TÌNH - QUÝ BÌNH)
 * 60FPS FinnXIII Sharp Kinetic Typography with AUDITED ACOUSTIC TIMESTAMPS
 * Fully synchronized with master audio (353.23s) and standardized Excel timing.
 */

window.DEMO_PRESET_GANH_HAO = {{
  audioName: 'dem_ganh_hao.mp3',
  audioTitle: 'Còn Thương Sắc Hoa Chung Tình',
  audioArtist: 'Quý Bình',
  audioInfo: 'OST Sông Phố Nhà Ghe • Sáng tác: Lê Phương',
  audioUrl: 'assets/samples/dem_ganh_hao.mp3',
  audioDuration: 353.23,
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
    artist: 'QUÝ BÌNH',
    info: 'OST SÔNG PHỐ NHÀ GHE  •  SÁNG TÁC: LÊ PHƯƠNG',
    cardLines: [
      {{ text: 'C Ò N', size: 14, weight: '700' }},
      {{ text: 'T H Ư Ơ N G', size: 13, weight: '700' }},
      {{ text: 'S Ắ C', size: 14, weight: '700' }},
      {{ text: 'H O A', size: 15, weight: '800' }},
      {{ text: 'C H U N G', size: 13, weight: '700' }},
      {{ text: 'T Ì N H', size: 16, weight: '900' }}
    ]
  }},
  wordsData: {json.dumps(words_data, ensure_ascii=False, indent=2)}
}};
"""

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\preset_ganh_hao.js', 'w', encoding='utf-8') as f:
    f.write(preset_content)

print("Saved js/preset_ganh_hao.js successfully!")
