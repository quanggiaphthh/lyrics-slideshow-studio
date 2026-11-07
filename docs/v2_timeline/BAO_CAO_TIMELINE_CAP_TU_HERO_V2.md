# Timeline cặp từ/âm tiết và Hero Word — Còn thương sắc hoa chung tình

**Bản V2 — BẢN NHÁP CHỜ QA ÂM THANH, không phải timecode chính xác từng âm tiết.**

- **Audio:** `CÒN THƯƠNG SẮC HOA CHUNG TÌNH - Quang Giáp Cover 7.mp3` (353.256 giây).
- **Cấu trúc:** 49 dòng/cụm lời; 133 cue hiển thị; 125 cue 2 âm tiết; 8 cue 3 âm tiết (ngoại lệ để giữ nghĩa); 49 cue chứa Hero Word.
- **Đã sửa:** câu mở đầu, từ bị ASR nhận sai (Sáo/xổ lồng, dặn lòng, lục bình, còn thương, sắc hoa chung tình), điệp khúc lặp, phần kết.
- **So khớp lặp:** dùng tương quan chroma để so hai điệp khúc, độ dịch tốt nhất ~84,7 s; đây là mốc kiểm tra cấu trúc âm nhạc, không đồng nghĩa mỗi âm tiết có onset chính xác.

## Mức tin cậy và phương pháp

| Mã | Ý nghĩa |
|---|---|
| `SRT` | Mốc đầu/cuối CỦA CÂU gốc từ Descript (ASR, có thể thiếu lời và lệch). |
| `MIX` | SRT + hiệu chỉnh cấu trúc câu / quan sát phổ âm / nội suy. |
| `REPEAT` | Dịch +84,7 s so với điệp khúc 1; kiểm tra cấu trúc âm nhạc bằng chroma. |
| `REPEAT+SRT` | Đối chiếu thêm mốc SRT ở điệp khúc thứ hai. |
| `EST` | Ước lượng từ cấu trúc, âm lượng/onset; chưa được nhận diện âm tiết tự động. |

**Quan trọng:** Mốc của *từng cặp* do phân bổ theo nhịp tương đối trong từng câu và thử bám các thay đổi phổ âm thanh. Các điểm onset phát hiện có thể là nhạc cụ chứ không phải giọng hát. Tất cả cue được gắn `CẦN NGHE QA` và độ chính xác 0,01 s chỉ là định dạng tệp, **không phải độ chính xác đã nghiệm thu**.

**Thời lượng** trong bảng là khoảng thời gian hiển thị cặp, **không phải phép đo độc lập thời gian ngân của từng từ**. `Ngân dài/vừa/ngắn` là gợi ý dàn dựng theo khoảng hiển thị, không phải kết luận âm học.

## Quy ước Hero Word cho MV lyric

- **Chỉ các từ/cụm được đánh dấu Hero Word viết IN HOA**, không in hoa toàn bộ lời.
- Hero được chọn theo điểm nhấn ý nghĩa/melodic; nếu nhóm 3 âm tiết, chỉ in hoa phần hero.
- `render_text` trong CSV/JSON/SRT là bản hiển thị đã in hoa; `hero_text` hỗ trợ làm SVG/path và hiệu ứng riêng.
- Khi lên MV, ưu tiên hero cỡ 1,7–2,2 lần chữ khác, có thể đặt lệch trục, không phóng to mọi cặp; tránh chèn hiệu ứng quá nhiều vào cùng một câu.
- Chuyển cảnh sau khi kết thúc cue hoặc trong khoảng nghỉ, KHÔNG tự kéo dài tới tiếng vang của nhạc nền.

## Bảng cặp từ (toàn bài)

| ID | Đoạn | Bắt đầu | Kết thúc | Thời lượng hiển thị (s) | Cặp/cụm hiển thị | Hero Word | Nguồn mốc |
|---|---|---|---|---:|---|---|---|
| P001 | Mở đầu | 00:04.20 | 00:11.10 | 6.90 | HÒ ƠI | HÒ ƠI | EST |
| P002 |  | 00:18.50 | 00:20.15 | 1.65 | Ai xuôi | — | EST |
| P003 |  | 00:20.15 | 00:21.90 | 1.74 | con sáo | — | EST |
| P004 |  | 00:21.90 | 00:25.00 | 3.10 | XỔ LỒNG | XỔ LỒNG | EST |
| P005 |  | 00:29.00 | 00:30.82 | 1.82 | Cho em | — | EST |
| P006 |  | 00:30.82 | 00:34.10 | 3.28 | NỠ VỘI | NỠ VỘI | EST |
| P007 |  | 00:38.20 | 00:46.00 | 7.80 | HÒ ƠI | HÒ ƠI | EST |
| P008 |  | 00:52.00 | 00:53.70 | 1.70 | Cho em | — | EST |
| P009 |  | 00:53.70 | 00:56.80 | 3.10 | NỠ VỘI | NỠ VỘI | EST |
| P010 |  | 00:57.00 | 00:59.40 | 2.40 | Lấy chồng | — | EST |
| P011 |  | 00:59.40 | 01:03.80 | 4.40 | BỎ ANH | BỎ ANH | EST |
| P012 | Đoạn 1 | 01:18.50 | 01:19.54 | 1.04 | Sáo bay | — | MIX |
| P013 |  | 01:19.54 | 01:20.62 | 1.08 | theo chồng | — | MIX |
| P014 |  | 01:20.62 | 01:21.93 | 1.31 | đâu biết là | — | MIX |
| P015 |  | 01:21.93 | 01:23.05 | 1.11 | ĐAU LÒNG | ĐAU LÒNG | MIX |
| P016 |  | 01:23.05 | 01:24.73 | 1.68 | anh lắm | — | MIX |
| P017 |  | 01:26.47 | 01:27.59 | 1.12 | Xót xa | — | SRT |
| P018 |  | 01:27.59 | 01:28.80 | 1.21 | LẶNG THẦM | LẶNG THẦM | SRT |
| P019 |  | 01:28.80 | 01:29.77 | 0.96 | nhìn theo | — | SRT |
| P020 |  | 01:29.77 | 01:31.05 | 1.28 | bước em | — | SRT |
| P021 |  | 01:31.05 | 01:32.69 | 1.64 | qua cầu | — | SRT |
| P022 |  | 01:33.79 | 01:34.60 | 0.81 | Ngày nào | — | SRT |
| P023 |  | 01:34.60 | 01:35.52 | 0.92 | có nhau | — | SRT |
| P024 |  | 01:35.52 | 01:36.43 | 0.91 | ta trao | — | SRT |
| P025 |  | 01:36.43 | 01:37.15 | 0.72 | ƯỚC HẸN | ƯỚC HẸN | SRT |
| P026 |  | 01:37.15 | 01:38.59 | 1.44 | trầu cau | — | SRT |
| P027 |  | 01:40.71 | 01:41.63 | 0.92 | Mong duyên | — | SRT |
| P028 |  | 01:41.63 | 01:42.60 | 0.96 | ban đầu | — | SRT |
| P029 |  | 01:42.60 | 01:43.53 | 0.93 | trời thương | — | SRT |
| P030 |  | 01:43.53 | 01:44.45 | 0.93 | không đổ | — | SRT |
| P031 |  | 01:44.45 | 01:45.95 | 1.50 | MƯA NGÂU | MƯA NGÂU | SRT |
| P032 |  | 01:47.67 | 01:48.62 | 0.95 | Bóng em | — | SRT |
| P033 |  | 01:48.62 | 01:49.38 | 0.76 | xa dần | — | SRT |
| P034 |  | 01:49.38 | 01:50.35 | 0.97 | anh biết | — | SRT |
| P035 |  | 01:50.35 | 01:51.03 | 0.67 | là một | — | SRT |
| P036 |  | 01:51.03 | 01:52.81 | 1.78 | lần CHIA CÁCH | CHIA CÁCH | SRT |
| P037 |  | 01:54.65 | 01:55.78 | 1.13 | Trách ai | — | SRT |
| P038 |  | 01:55.78 | 01:57.04 | 1.26 | VÔ TÌNH | VÔ TÌNH | SRT |
| P039 |  | 01:57.04 | 01:58.03 | 0.99 | đành tâm | — | SRT |
| P040 |  | 01:58.03 | 01:59.25 | 1.21 | xẻ đôi | — | SRT |
| P041 |  | 01:59.25 | 02:00.91 | 1.66 | tim mình | — | SRT |
| P042 |  | 02:01.79 | 02:02.75 | 0.96 | Dặn lòng | — | SRT |
| P043 |  | 02:02.75 | 02:04.19 | 1.44 | CỐ QUÊN | CỐ QUÊN | SRT |
| P044 |  | 02:04.63 | 02:05.56 | 0.93 | Sao đêm | — | SRT |
| P045 |  | 02:05.56 | 02:06.50 | 0.94 | vẫn thầm | — | SRT |
| P046 |  | 02:06.50 | 02:07.95 | 1.45 | GỌI TÊN | GỌI TÊN | SRT |
| P047 |  | 02:08.95 | 02:10.07 | 1.12 | Ai ru | — | MIX |
| P048 |  | 02:10.07 | 02:11.16 | 1.09 | trong chiều | — | MIX |
| P049 |  | 02:11.16 | 02:12.30 | 1.14 | cho lòng | — | MIX |
| P050 |  | 02:12.30 | 02:13.45 | 1.14 | CÀNG NHỚ | CÀNG NHỚ | MIX |
| P051 |  | 02:13.45 | 02:15.15 | 1.70 | em nhiều | — | MIX |
| P052 | Điệp khúc 1 | 02:21.70 | 02:26.10 | 4.40 | À ƠI | À ƠI | EST |
| P053 |  | 02:26.10 | 02:27.60 | 1.50 | Em nỡ | — | EST |
| P054 |  | 02:27.60 | 02:30.35 | 2.75 | SAO EM | SAO EM | EST |
| P055 |  | 02:30.35 | 02:31.43 | 1.08 | Bỏ anh | — | EST |
| P056 |  | 02:31.43 | 02:33.00 | 1.57 | MỘT MÌNH | MỘT MÌNH | EST |
| P057 |  | 02:33.00 | 02:34.19 | 1.19 | LỤC BÌNH | LỤC BÌNH | MIX |
| P058 |  | 02:34.19 | 02:35.52 | 1.32 | trôi chẳng biết | — | MIX |
| P059 |  | 02:35.52 | 02:37.55 | 2.03 | nơi neo | — | MIX |
| P060 |  | 02:37.61 | 02:39.39 | 1.78 | CÒN THƯƠNG | CÒN THƯƠNG | MIX |
| P061 |  | 02:39.39 | 02:41.00 | 1.61 | tóc em | — | MIX |
| P062 |  | 02:41.00 | 02:44.10 | 3.10 | buông dài | — | MIX |
| P063 |  | 02:44.69 | 02:45.74 | 1.05 | Tím hoa | — | MIX |
| P064 |  | 02:45.74 | 02:46.68 | 0.94 | anh cài | — | MIX |
| P065 |  | 02:46.68 | 02:47.68 | 1.00 | em cười | — | MIX |
| P066 |  | 02:47.68 | 02:48.79 | 1.10 | siết chặt | — | MIX |
| P067 |  | 02:48.79 | 02:50.40 | 1.61 | VÒNG TAY | VÒNG TAY | MIX |
| P068 |  | 02:51.69 | 02:55.16 | 3.47 | À ƠI | À ƠI | SRT |
| P069 |  | 02:55.17 | 02:56.46 | 1.29 | Em nỡ | — | MIX |
| P070 |  | 02:56.46 | 02:58.60 | 2.14 | SAO EM | SAO EM | MIX |
| P071 |  | 02:58.60 | 02:59.40 | 0.80 | Nói thương | — | MIX |
| P072 |  | 02:59.40 | 03:00.70 | 1.30 | ANH NHIỀU | ANH NHIỀU | MIX |
| P073 |  | 03:00.70 | 03:01.93 | 1.23 | Đành lòng em | — | MIX |
| P074 |  | 03:01.93 | 03:02.96 | 1.03 | cất bước | — | MIX |
| P075 |  | 03:02.96 | 03:04.39 | 1.43 | SANG SÔNG | SANG SÔNG | MIX |
| P076 |  | 03:05.87 | 03:07.18 | 1.31 | Vì đâu | — | SRT |
| P077 |  | 03:07.18 | 03:08.30 | 1.13 | DỞ DANG | DỞ DANG | SRT |
| P078 |  | 03:08.30 | 03:10.59 | 2.29 | duyên mình | — | SRT |
| P079 |  | 03:12.31 | 03:13.12 | 0.81 | Sắc hoa | — | SRT |
| P080 |  | 03:13.12 | 03:13.93 | 0.81 | CHUNG TÌNH | CHUNG TÌNH | SRT |
| P081 |  | 03:13.93 | 03:15.57 | 1.64 | chưa phai màu | — | SRT |
| P082 |  | 03:16.15 | 03:17.23 | 1.08 | Nỡ nào | — | MIX |
| P083 |  | 03:17.23 | 03:19.20 | 1.97 | NGƯỜI ĐI | NGƯỜI ĐI | MIX |
| P084 | Điệp khúc 2 | 03:46.40 | 03:50.80 | 4.40 | À ƠI | À ƠI | REPEAT |
| P085 |  | 03:50.80 | 03:52.35 | 1.55 | Em nỡ | — | REPEAT |
| P086 |  | 03:52.35 | 03:55.05 | 2.70 | SAO EM | SAO EM | REPEAT |
| P087 |  | 03:55.05 | 03:56.10 | 1.05 | Bỏ anh | — | REPEAT |
| P088 |  | 03:56.10 | 03:57.70 | 1.60 | MỘT MÌNH | MỘT MÌNH | REPEAT |
| P089 |  | 03:57.70 | 03:58.81 | 1.11 | LỤC BÌNH | LỤC BÌNH | REPEAT |
| P090 |  | 03:58.81 | 04:00.28 | 1.47 | trôi chẳng biết | — | REPEAT |
| P091 |  | 04:00.28 | 04:02.25 | 1.97 | nơi neo | — | REPEAT |
| P092 |  | 04:02.31 | 04:04.11 | 1.80 | CÒN THƯƠNG | CÒN THƯƠNG | REPEAT |
| P093 |  | 04:04.11 | 04:05.66 | 1.54 | tóc em | — | REPEAT |
| P094 |  | 04:05.66 | 04:08.80 | 3.14 | buông dài | — | REPEAT |
| P095 |  | 04:09.39 | 04:10.44 | 1.05 | Tím hoa | — | REPEAT |
| P096 |  | 04:10.44 | 04:11.39 | 0.95 | anh cài | — | REPEAT |
| P097 |  | 04:11.39 | 04:12.48 | 1.09 | em cười | — | REPEAT |
| P098 |  | 04:12.48 | 04:13.55 | 1.07 | siết chặt | — | REPEAT |
| P099 |  | 04:13.55 | 04:15.10 | 1.55 | VÒNG TAY | VÒNG TAY | REPEAT |
| P100 |  | 04:16.39 | 04:19.86 | 3.47 | À ƠI | À ƠI | REPEAT |
| P101 |  | 04:19.87 | 04:21.07 | 1.20 | Em nỡ | — | REPEAT |
| P102 |  | 04:21.07 | 04:23.30 | 2.23 | SAO EM | SAO EM | REPEAT |
| P103 |  | 04:23.30 | 04:24.10 | 0.80 | Nói thương | — | REPEAT |
| P104 |  | 04:24.10 | 04:25.40 | 1.30 | ANH NHIỀU | ANH NHIỀU | REPEAT |
| P105 |  | 04:25.40 | 04:26.58 | 1.18 | Đành lòng em | — | REPEAT |
| P106 |  | 04:26.58 | 04:27.61 | 1.03 | cất bước | — | REPEAT |
| P107 |  | 04:27.61 | 04:29.09 | 1.48 | SANG SÔNG | SANG SÔNG | REPEAT |
| P108 |  | 04:30.57 | 04:31.74 | 1.17 | Vì đâu | — | REPEAT |
| P109 |  | 04:31.74 | 04:33.01 | 1.27 | DỞ DANG | DỞ DANG | REPEAT |
| P110 |  | 04:33.01 | 04:35.29 | 2.28 | duyên mình | — | REPEAT |
| P111 |  | 04:37.35 | 04:38.08 | 0.73 | Sắc hoa | — | REPEAT+SRT |
| P112 |  | 04:38.08 | 04:38.80 | 0.72 | CHUNG TÌNH | CHUNG TÌNH | REPEAT+SRT |
| P113 |  | 04:38.80 | 04:40.23 | 1.43 | chưa phai màu | — | REPEAT+SRT |
| P114 |  | 04:40.73 | 04:41.61 | 0.88 | Nỡ nào | — | REPEAT+SRT |
| P115 |  | 04:41.61 | 04:43.00 | 1.39 | NGƯỜI ĐI | NGƯỜI ĐI | REPEAT+SRT |
| P116 | Kết | 04:44.63 | 04:45.37 | 0.74 | DÒNG NHỚ | DÒNG NHỚ | SRT |
| P117 |  | 04:45.37 | 04:46.61 | 1.24 | trong tim | — | SRT |
| P118 |  | 04:47.83 | 04:48.51 | 0.68 | Làm sao | — | SRT |
| P119 |  | 04:48.51 | 04:49.43 | 0.92 | CHIA CÁCH | CHIA CÁCH | SRT |
| P120 |  | 04:51.13 | 04:51.87 | 0.74 | NGƯỜI THƯƠNG | NGƯỜI THƯƠNG | SRT |
| P121 |  | 04:51.87 | 04:52.97 | 1.10 | có hay | — | SRT |
| P122 |  | 04:55.15 | 04:56.38 | 1.23 | Đêm dài | — | SRT |
| P123 |  | 04:56.38 | 04:57.56 | 1.18 | mình anh | — | SRT |
| P124 |  | 04:57.56 | 04:59.77 | 2.21 | THAO THỨC | THAO THỨC | SRT |
| P125 |  | 05:01.10 | 05:02.78 | 1.68 | Em giờ | — | MIX |
| P126 |  | 05:02.78 | 05:04.51 | 1.73 | biết lòng | — | MIX |
| P127 |  | 05:04.51 | 05:07.70 | 3.19 | BUỒN VUI | BUỒN VUI | MIX |
| P128 |  | 05:09.80 | 05:11.60 | 1.80 | Em về | — | EST |
| P129 |  | 05:11.60 | 05:13.34 | 1.74 | làm dâu | — | EST |
| P130 |  | 05:13.34 | 05:16.70 | 3.36 | BÊN ẤY | BÊN ẤY | EST |
| P131 |  | 05:16.80 | 05:18.61 | 1.81 | BÊN NÀY | BÊN NÀY | EST |
| P132 |  | 05:18.61 | 05:22.10 | 3.49 | vẫn hoài | — | EST |
| P133 |  | 05:25.10 | 05:31.90 | 6.80 | CHỜ MONG | CHỜ MONG | EST |

## Mốc không hát và mốc cần QA bằng tai

- Từ khoảng 01:04 đến 01:18: nhạc dạo.
- Từ khoảng 03:19 đến 03:46: giang tấu; điệp khúc thứ hai được dời theo nhạc khoảng +84,7 s từ bản thứ nhất.
- Sau khoảng 05:32: nhạc kết/đuôi âm đến 05:53.256.
- Ưu tiên nghe QA: mở đầu, ranh giới giữa các cặp dài, tiếng “À ơi”/“Hò ơi”, chuyển đoạn 02:13–02:23, toàn bộ từ 03:46–04:42, các chữ cuối 05:01–05:32.
- Các biến thể phát âm cần đối chiếu riêng: “xổ/sổ”, “xuôi/xui”, “xẻ/xé”, “dặn/dành”, “chia cách/chia cắt”, “biết/miếng”.

## Sử dụng tệp

`TIMELINE_CAP_TU_HERO_V2.csv`: làm bảng chỉnh sửa; `TIMELINE_CAP_TU_HERO_V2.json`: tích hợp HTML/JS lyric engine, dùng `start_s`, `end_s`, `render_text`, `hero_text`; `TIMELINE_CAP_TU_HERO_V2.srt`: xem nhanh subtitle.
