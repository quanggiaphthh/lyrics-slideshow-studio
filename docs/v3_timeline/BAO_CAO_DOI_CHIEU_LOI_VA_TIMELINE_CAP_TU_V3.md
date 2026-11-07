# Timeline cặp từ và Hero Word — bản V3 đã đối chiếu lời

**Audio nguồn:** `CÒN THƯƠNG SẮC HOA CHUNG TÌNH - Quang Giáp Cover 7.mp3` — 05:53.256.  
**Phạm vi:** 49 câu/cụm hát, 133 cue; 125 cặp hai âm tiết, 8 cụm ba âm tiết để không lặp hoặc làm mất chữ.  
**Mốc TXT đầu vào:** 123 hàng, được lưu đầy đủ trong file `TIMELINE_GOC_TU_TEP_TXT.csv`.

## 1. Kết luận

Bảng TXT người dùng gửi được dùng làm **dữ liệu nguồn ưu tiên cho cách hát**, nhưng nhiều mốc sau 01:30 bị trôi so với transcript SRT của **chính bản thu 05:53**. Mốc làm MV trong bản này sử dụng căn chỉnh câu của bản V2 (kế thừa SRT Descript và so khớp nhạc lặp); phần mốc chữ **vẫn chỉ là phân bổ ước lượng**, không phải kết quả forced alignment từng âm tiết.

**Cần phân biệt:** `duration_s` là thời gian cue xuất hiện trên MV, không phải thời gian **ngân thực tế**. Phần sustain/ngân dài chỉ là hướng dẫn tạo hiệu ứng thị giác, cần đo thêm từ vocal nếu dùng làm video karaoke chính xác.

## 2. Các lỗi lời quan trọng đã sửa

| Trong TXT hoặc bản V2 | Lời sử dụng trong V3 | Lý do / độ chắc chắn |
|---|---|---|
| “NỠ DỐI” (2 lần) | **“NỠ VỘI”** | Sửa lỗi chắc chắn; các nguồn lời ca công bố và bản thu thống nhất |
| “Ai xui” và “SỔ LỒNG” | **Giữ “Ai xui”, “SỔ LỒNG”** | Ưu tiên TXT người dùng khi chưa phân biệt được phát âm; tài liệu lời ca công bố dùng “xuôi”, “xổ” |
| “là đau” + “ĐAU LÒNG” | **“đâu biết là” + “ĐAU LÒNG”** | Bỏ chữ “đau” bị lặp trong nhóm cặp từ |
| “lần chia” + “CHIA CÁCH” | **“là một” + “lần CHIA CÁCH”** | Bỏ âm tiết “chia” bị lặp; “một” đúng nội dung TXT/bản ASR, lời công bố dùng “muôn” |
| “Đành tâm” + “XÉ ĐÔI” | **“đành tâm” + “xé đôi”** | Giữ cách ghi ASR/bản TXT; lời công bố dùng “xẻ đôi” |
| “bước sang” + “SANG SÔNG” | **“cất bước” + “SANG SÔNG”** | Bỏ lặp “sang”, không bỏ từ “cất” |
| “biết nơi” + “NƠI NEO” | **“trôi chẳng biết” + “nơi neo”** | Không lặp chữ “nơi”, giữ nguyên 7 âm tiết của câu |
| “màu nỡ” + “nào người” + “NGƯỜI ĐI” | **“chưa phai màu” + “nỡ nào” + “NGƯỜI ĐI”** | Không lặp từ “người”; phân cặp theo cấu trúc câu |
| “Làm sao CHIA CÁCH” | **Giữ “Làm sao CHIA CÁCH”** | Nội dung TXT và transcript bản cover; lời công bố ghi “chia cắt” — cần nghe QA |
| “biết lòng / miếng lòng” | **“biết lòng”** | Đối chiếu lời viết công bố; bản ASR có lúc nhận sai |

**Nguồn đối chứng chữ:** [Hồng Phượng Official — phần lyric đăng trong mô tả](https://www.youtube.com/watch?v=3VGvpkFIteY), [Hợp Âm Chuẩn](https://hopamchuan.com/song/78861/con-thuong-sac-hoa-chung-tinh-ost-song-pho-nha-ghe/). Đây là đối chứng *lời viết*, không chứng minh 100% cách phát âm trong MP3 Quang Giáp.

## 3. Mốc thời gian đã điều chỉnh

| Vị trí | Bảng TXT | Căn chỉnh V3 đề xuất |
|---|---|---|
| Bắt đầu câu “Ai xuôi” | 00:15.300 | 00:18.500 |
| Đầu câu “Ngày nào” | 01:40.200 | 01:33.789 |
| Bắt đầu điệp khúc 1 “À ơi” | 02:47.000 | 02:21.700 |
| Đầu câu “Sắc hoa chung tình” lần 1 | 03:52.000 | 03:12.314 |
| Bắt đầu điệp khúc 2 “À ơi” | 04:16.800 | 03:46.400 |
| Đầu câu “Sắc hoa chung tình” lần 2 | không có đủ nhóm trong TXT | 04:37.350 |

Các mốc V3 là **bản nháp nghe QA**, không được trình bày như timecode chính xác tuyệt đối; nguyên bản TXT vẫn được lưu riêng để phục hồi khi cần.

## 4. Timeline hoàn chỉnh theo cặp / cụm

| ID | Phần | Bắt đầu | Kết thúc | Thời lượng cue | Text cho MV | Hero | Mốc TXT (nếu khớp cặp) |
|---|---|---|---|---:|---|---|---|
| P001 | Mở đầu | 00:04.200 | 00:11.100 | 6.90s | HÒ ƠI | HÒ ƠI | — |
| P002 | Mở đầu | 00:18.500 | 00:20.150 | 1.65s | Ai xui | — | 00:15.3–00:16.5 |
| P003 | Mở đầu | 00:20.150 | 00:21.900 | 1.75s | con sáo | — | 00:16.5–00:17.8 |
| P004 | Mở đầu | 00:21.900 | 00:25.000 | 3.10s | SỔ LỒNG | SỔ LỒNG | 00:17.8–00:19.6 |
| P005 | Mở đầu | 00:29.000 | 00:30.820 | 1.82s | Cho em | — | 00:21.1–00:22.4 |
| P006 | Mở đầu | 00:30.820 | 00:34.100 | 3.28s | NỠ VỘI | NỠ VỘI | 00:22.4–00:25.5 |
| P007 | Mở đầu | 00:38.200 | 00:46.000 | 7.80s | HÒ ƠI | HÒ ƠI | — |
| P008 | Mở đầu | 00:52.000 | 00:53.700 | 1.70s | Cho em | — | 00:37.8–00:38.9 |
| P009 | Mở đầu | 00:53.700 | 00:56.800 | 3.10s | NỠ VỘI | NỠ VỘI | 00:38.9–00:40.3 |
| P010 | Mở đầu | 00:57.000 | 00:59.400 | 2.40s | Lấy chồng | — | 00:40.8–00:42.5 |
| P011 | Mở đầu | 00:59.400 | 01:03.800 | 4.40s | BỎ ANH | BỎ ANH | 00:42.5–00:46.8 |
| P012 | Đoạn 1 | 01:18.500 | 01:19.540 | 1.04s | Sáo bay | — | 01:19.4–01:20.4 |
| P013 | Đoạn 1 | 01:19.540 | 01:20.620 | 1.08s | theo chồng | — | 01:20.4–01:22.0 |
| P014 | Đoạn 1 | 01:20.620 | 01:21.930 | 1.31s | đâu biết là | — | — |
| P015 | Đoạn 1 | 01:21.930 | 01:23.050 | 1.12s | ĐAU LÒNG | ĐAU LÒNG | 01:24.0–01:25.0 |
| P016 | Đoạn 1 | 01:23.050 | 01:24.730 | 1.68s | anh lắm | — | 01:25.0–01:26.4 |
| P017 | Đoạn 1 | 01:26.470 | 01:27.590 | 1.12s | Xót xa | — | 01:26.5–01:27.8 |
| P018 | Đoạn 1 | 01:27.590 | 01:28.800 | 1.21s | LẶNG THẦM | LẶNG THẦM | 01:29.0–01:31.0 |
| P019 | Đoạn 1 | 01:28.800 | 01:29.770 | 0.97s | nhìn theo | — | 01:31.0–01:32.4 |
| P020 | Đoạn 1 | 01:29.770 | 01:31.050 | 1.28s | bước em | — | 01:32.4–01:34.2 |
| P021 | Đoạn 1 | 01:31.050 | 01:32.690 | 1.64s | qua cầu | — | 01:34.2–01:39.8 |
| P022 | Đoạn 1 | 01:33.790 | 01:34.600 | 0.81s | Ngày nào | — | 01:40.2–01:41.4 |
| P023 | Đoạn 1 | 01:34.600 | 01:35.520 | 0.92s | có nhau | — | 01:41.4–01:43.2 |
| P024 | Đoạn 1 | 01:35.520 | 01:36.430 | 0.91s | ta trao | — | 01:43.8–01:45.1 |
| P025 | Đoạn 1 | 01:36.430 | 01:37.150 | 0.72s | ƯỚC HẸN | ƯỚC HẸN | 01:45.1–01:46.6 |
| P026 | Đoạn 1 | 01:37.150 | 01:38.590 | 1.44s | trầu cau | — | 01:46.8–01:49.2 |
| P027 | Đoạn 1 | 01:40.710 | 01:41.630 | 0.92s | Mong duyên | — | 01:49.6–01:51.0 |
| P028 | Đoạn 1 | 01:41.630 | 01:42.600 | 0.97s | ban đầu | — | 01:51.0–01:53.0 |
| P029 | Đoạn 1 | 01:42.600 | 01:43.530 | 0.93s | trời thương | — | 01:53.5–01:55.0 |
| P030 | Đoạn 1 | 01:43.530 | 01:44.450 | 0.92s | không đổ | — | 01:55.0–01:56.5 |
| P031 | Đoạn 1 | 01:44.450 | 01:45.950 | 1.50s | MƯA NGÂU | MƯA NGÂU | 01:56.5–02:00.0 |
| P032 | Đoạn 1 | 01:47.670 | 01:48.620 | 0.95s | Bóng em | — | 02:00.4–02:01.6 |
| P033 | Đoạn 1 | 01:48.620 | 01:49.380 | 0.76s | xa dần | — | 02:01.6–02:03.4 |
| P034 | Đoạn 1 | 01:49.380 | 01:50.350 | 0.97s | anh biết | — | 02:03.8–02:05.0 |
| P035 | Đoạn 1 | 01:50.350 | 01:51.030 | 0.68s | là một | — | 02:05.0–02:06.2 |
| P036 | Đoạn 1 | 01:51.030 | 01:52.810 | 1.78s | lần CHIA CÁCH | CHIA CÁCH | — |
| P037 | Đoạn 1 | 01:54.650 | 01:55.780 | 1.13s | Trách ai | — | 02:10.2–02:11.8 |
| P038 | Đoạn 1 | 01:55.780 | 01:57.040 | 1.26s | VÔ TÌNH | VÔ TÌNH | 02:12.4–02:14.6 |
| P039 | Đoạn 1 | 01:57.040 | 01:58.030 | 0.99s | đành tâm | — | 02:15.0–02:16.4 |
| P040 | Đoạn 1 | 01:58.030 | 01:59.250 | 1.22s | xé đôi | — | 02:16.4–02:18.0 |
| P041 | Đoạn 1 | 01:59.250 | 02:00.910 | 1.66s | tim mình | — | 02:18.0–02:22.0 |
| P042 | Đoạn 1 | 02:01.790 | 02:02.750 | 0.96s | Dặn lòng | — | 02:22.2–02:23.4 |
| P043 | Đoạn 1 | 02:02.750 | 02:04.190 | 1.44s | CỐ QUÊN | CỐ QUÊN | 02:23.4–02:25.2 |
| P044 | Đoạn 1 | 02:04.630 | 02:05.560 | 0.93s | Sao đêm | — | 02:25.6–02:27.0 |
| P045 | Đoạn 1 | 02:05.560 | 02:06.500 | 0.94s | vẫn thầm | — | 02:27.0–02:28.6 |
| P046 | Đoạn 1 | 02:06.500 | 02:07.950 | 1.45s | GỌI TÊN | GỌI TÊN | 02:28.6–02:31.2 |
| P047 | Đoạn 1 | 02:08.950 | 02:10.070 | 1.12s | Ai ru | — | 02:31.6–02:33.0 |
| P048 | Đoạn 1 | 02:10.070 | 02:11.160 | 1.09s | trong chiều | — | 02:33.0–02:35.0 |
| P049 | Đoạn 1 | 02:11.160 | 02:12.300 | 1.14s | cho lòng | — | 02:35.4–02:36.8 |
| P050 | Đoạn 1 | 02:12.300 | 02:13.450 | 1.15s | CÀNG NHỚ | CÀNG NHỚ | 02:36.8–02:38.6 |
| P051 | Đoạn 1 | 02:13.450 | 02:15.150 | 1.70s | em nhiều | — | 02:38.6–02:42.5 |
| P052 | Điệp khúc 1 | 02:21.700 | 02:26.100 | 4.40s | À ƠI | À ƠI | 02:47.0–02:50.8 |
| P053 | Điệp khúc 1 | 02:26.100 | 02:27.600 | 1.50s | Em nỡ | — | 02:51.2–02:52.5 |
| P054 | Điệp khúc 1 | 02:27.600 | 02:30.350 | 2.75s | SAO EM | SAO EM | 02:52.5–02:54.6 |
| P055 | Điệp khúc 1 | 02:30.350 | 02:31.430 | 1.08s | Bỏ anh | — | 02:55.0–02:56.5 |
| P056 | Điệp khúc 1 | 02:31.430 | 02:33.000 | 1.57s | MỘT MÌNH | MỘT MÌNH | 02:56.5–02:58.8 |
| P057 | Điệp khúc 1 | 02:33.000 | 02:34.190 | 1.19s | LỤC BÌNH | LỤC BÌNH | 02:59.2–03:00.7 |
| P058 | Điệp khúc 1 | 02:34.190 | 02:35.520 | 1.33s | trôi chẳng biết | — | — |
| P059 | Điệp khúc 1 | 02:35.520 | 02:37.550 | 2.03s | nơi neo | — | 03:04.0–03:05.8 |
| P060 | Điệp khúc 1 | 02:37.610 | 02:39.390 | 1.78s | CÒN THƯƠNG | CÒN THƯƠNG | 03:06.2–03:09.6 |
| P061 | Điệp khúc 1 | 02:39.390 | 02:41.000 | 1.61s | tóc em | — | 03:10.0–03:11.6 |
| P062 | Điệp khúc 1 | 02:41.000 | 02:44.100 | 3.10s | buông dài | — | 03:11.6–03:14.6 |
| P063 | Điệp khúc 1 | 02:44.690 | 02:45.740 | 1.05s | Tím hoa | — | 03:15.0–03:16.5 |
| P064 | Điệp khúc 1 | 02:45.740 | 02:46.680 | 0.94s | anh cài | — | 03:16.5–03:18.6 |
| P065 | Điệp khúc 1 | 02:46.680 | 02:47.680 | 1.00s | em cười | — | 03:19.0–03:20.5 |
| P066 | Điệp khúc 1 | 02:47.680 | 02:48.790 | 1.11s | siết chặt | — | 03:20.5–03:22.0 |
| P067 | Điệp khúc 1 | 02:48.790 | 02:50.400 | 1.61s | VÒNG TAY | VÒNG TAY | 03:22.0–03:25.0 |
| P068 | Điệp khúc 1 | 02:51.690 | 02:55.160 | 3.47s | À ƠI | À ƠI | 03:25.2–03:28.8 |
| P069 | Điệp khúc 1 | 02:55.170 | 02:56.460 | 1.29s | Em nỡ | — | 03:29.2–03:30.6 |
| P070 | Điệp khúc 1 | 02:56.460 | 02:58.600 | 2.14s | SAO EM | SAO EM | 03:30.6–03:32.6 |
| P071 | Điệp khúc 1 | 02:58.600 | 02:59.400 | 0.80s | Nói thương | — | 03:33.0–03:34.5 |
| P072 | Điệp khúc 1 | 02:59.400 | 03:00.700 | 1.30s | ANH NHIỀU | ANH NHIỀU | 03:34.5–03:36.8 |
| P073 | Điệp khúc 1 | 03:00.700 | 03:01.930 | 1.23s | Đành lòng em | — | — |
| P074 | Điệp khúc 1 | 03:01.930 | 03:02.960 | 1.03s | cất bước | — | — |
| P075 | Điệp khúc 1 | 03:02.960 | 03:04.390 | 1.43s | SANG SÔNG | SANG SÔNG | 03:42.0–03:43.8 |
| P076 | Điệp khúc 1 | 03:05.870 | 03:07.180 | 1.31s | Vì đâu | — | 03:44.2–03:47.6 |
| P077 | Điệp khúc 1 | 03:07.180 | 03:08.300 | 1.12s | DỞ DANG | DỞ DANG | 03:48.0–03:49.6 |
| P078 | Điệp khúc 1 | 03:08.300 | 03:10.590 | 2.29s | duyên mình | — | 03:49.6–03:51.6 |
| P079 | Điệp khúc 1 | 03:12.310 | 03:13.120 | 0.81s | Sắc hoa | — | 03:52.0–03:53.6 |
| P080 | Điệp khúc 1 | 03:13.120 | 03:13.930 | 0.81s | CHUNG TÌNH | CHUNG TÌNH | 03:53.6–03:55.8 |
| P081 | Điệp khúc 1 | 03:13.930 | 03:15.570 | 1.64s | chưa phai màu | — | — |
| P082 | Điệp khúc 1 | 03:16.150 | 03:17.230 | 1.08s | Nỡ nào | — | — |
| P083 | Điệp khúc 1 | 03:17.230 | 03:19.200 | 1.97s | NGƯỜI ĐI | NGƯỜI ĐI | 04:01.0–04:04.2 |
| P084 | Điệp khúc 2 | 03:46.400 | 03:50.800 | 4.40s | À ƠI | À ƠI | 04:16.8–04:20.6 |
| P085 | Điệp khúc 2 | 03:50.800 | 03:52.350 | 1.55s | Em nỡ | — | 04:21.0–04:22.6 |
| P086 | Điệp khúc 2 | 03:52.350 | 03:55.050 | 2.70s | SAO EM | SAO EM | 04:22.6–04:24.6 |
| P087 | Điệp khúc 2 | 03:55.050 | 03:56.100 | 1.05s | Bỏ anh | — | 04:25.2–04:26.8 |
| P088 | Điệp khúc 2 | 03:56.100 | 03:57.700 | 1.60s | MỘT MÌNH | MỘT MÌNH | 04:26.8–04:29.0 |
| P089 | Điệp khúc 2 | 03:57.700 | 03:58.810 | 1.11s | LỤC BÌNH | LỤC BÌNH | 04:29.6–04:31.2 |
| P090 | Điệp khúc 2 | 03:58.810 | 04:00.280 | 1.47s | trôi chẳng biết | — | — |
| P091 | Điệp khúc 2 | 04:00.280 | 04:02.250 | 1.97s | nơi neo | — | 04:34.5–04:36.2 |
| P092 | Điệp khúc 2 | 04:02.310 | 04:04.110 | 1.80s | CÒN THƯƠNG | CÒN THƯƠNG | 04:36.6–04:39.8 |
| P093 | Điệp khúc 2 | 04:04.110 | 04:05.660 | 1.55s | tóc em | — | 04:40.2–04:41.8 |
| P094 | Điệp khúc 2 | 04:05.660 | 04:08.800 | 3.14s | buông dài | — | 04:41.8–04:44.2 |
| P095 | Điệp khúc 2 | 04:09.390 | 04:10.440 | 1.05s | Tím hoa | — | — |
| P096 | Điệp khúc 2 | 04:10.440 | 04:11.390 | 0.95s | anh cài | — | — |
| P097 | Điệp khúc 2 | 04:11.390 | 04:12.480 | 1.09s | em cười | — | — |
| P098 | Điệp khúc 2 | 04:12.480 | 04:13.550 | 1.07s | siết chặt | — | — |
| P099 | Điệp khúc 2 | 04:13.550 | 04:15.100 | 1.55s | VÒNG TAY | VÒNG TAY | — |
| P100 | Điệp khúc 2 | 04:16.390 | 04:19.860 | 3.47s | À ƠI | À ƠI | — |
| P101 | Điệp khúc 2 | 04:19.870 | 04:21.070 | 1.20s | Em nỡ | — | — |
| P102 | Điệp khúc 2 | 04:21.070 | 04:23.300 | 2.23s | SAO EM | SAO EM | — |
| P103 | Điệp khúc 2 | 04:23.300 | 04:24.100 | 0.80s | Nói thương | — | — |
| P104 | Điệp khúc 2 | 04:24.100 | 04:25.400 | 1.30s | ANH NHIỀU | ANH NHIỀU | — |
| P105 | Điệp khúc 2 | 04:25.400 | 04:26.580 | 1.18s | Đành lòng em | — | — |
| P106 | Điệp khúc 2 | 04:26.580 | 04:27.610 | 1.03s | cất bước | — | — |
| P107 | Điệp khúc 2 | 04:27.610 | 04:29.090 | 1.48s | SANG SÔNG | SANG SÔNG | — |
| P108 | Điệp khúc 2 | 04:30.570 | 04:31.740 | 1.17s | Vì đâu | — | — |
| P109 | Điệp khúc 2 | 04:31.740 | 04:33.010 | 1.27s | DỞ DANG | DỞ DANG | — |
| P110 | Điệp khúc 2 | 04:33.010 | 04:35.290 | 2.28s | duyên mình | — | — |
| P111 | Điệp khúc 2 | 04:37.350 | 04:38.080 | 0.73s | Sắc hoa | — | — |
| P112 | Điệp khúc 2 | 04:38.080 | 04:38.800 | 0.72s | CHUNG TÌNH | CHUNG TÌNH | — |
| P113 | Điệp khúc 2 | 04:38.800 | 04:40.230 | 1.43s | chưa phai màu | — | — |
| P114 | Điệp khúc 2 | 04:40.730 | 04:41.610 | 0.88s | Nỡ nào | — | — |
| P115 | Điệp khúc 2 | 04:41.610 | 04:43.000 | 1.39s | NGƯỜI ĐI | NGƯỜI ĐI | — |
| P116 | Kết | 04:44.630 | 04:45.370 | 0.74s | DÒNG NHỚ | DÒNG NHỚ | 04:44.5–04:45.5 |
| P117 | Kết | 04:45.370 | 04:46.610 | 1.24s | trong tim | — | 04:45.5–04:47.5 |
| P118 | Kết | 04:47.830 | 04:48.510 | 0.68s | Làm sao | — | 04:48.0–04:49.0 |
| P119 | Kết | 04:48.510 | 04:49.430 | 0.92s | CHIA CÁCH | CHIA CÁCH | 04:49.0–04:50.8 |
| P120 | Kết | 04:51.130 | 04:51.870 | 0.74s | NGƯỜI THƯƠNG | NGƯỜI THƯƠNG | 04:51.0–04:52.0 |
| P121 | Kết | 04:51.870 | 04:52.970 | 1.10s | có hay | — | 04:52.0–04:54.2 |
| P122 | Kết | 04:55.150 | 04:56.380 | 1.23s | Đêm dài | — | 04:55.0–04:57.6 |
| P123 | Kết | 04:56.380 | 04:57.560 | 1.18s | mình anh | — | 04:58.0–04:59.2 |
| P124 | Kết | 04:57.560 | 04:59.770 | 2.21s | THAO THỨC | THAO THỨC | 04:59.2–05:01.4 |
| P125 | Kết | 05:01.100 | 05:02.780 | 1.68s | Em giờ | — | 05:02.0–05:04.6 |
| P126 | Kết | 05:02.780 | 05:04.510 | 1.73s | biết lòng | — | 05:05.0–05:06.2 |
| P127 | Kết | 05:04.510 | 05:07.700 | 3.19s | BUỒN VUI | BUỒN VUI | 05:06.2–05:08.5 |
| P128 | Kết | 05:09.800 | 05:11.600 | 1.80s | Em về | — | 05:09.0–05:11.4 |
| P129 | Kết | 05:11.600 | 05:13.340 | 1.74s | làm dâu | — | 05:12.0–05:13.2 |
| P130 | Kết | 05:13.340 | 05:16.700 | 3.36s | BÊN ẤY | BÊN ẤY | 05:13.2–05:15.6 |
| P131 | Kết | 05:16.800 | 05:18.610 | 1.81s | BÊN NÀY | BÊN NÀY | 05:16.2–05:19.6 |
| P132 | Kết | 05:18.610 | 05:22.100 | 3.49s | vẫn hoài | — | 05:20.0–05:23.8 |
| P133 | Kết | 05:25.100 | 05:31.900 | 6.80s | CHỜ MONG | CHỜ MONG | — |

## 5. Cổng QA trước khi render video

1. **Đã hoàn thành:** tái sử dụng timeline TXT, sửa lời bị sai, loại các âm tiết lặp, dựng cặp và HERO, xuất CSV/JSON/SRT.
2. **Chưa đạt chuẩn:** chưa có biên bản xác nhận bằng tai cho từng cặp, nhất là các cặp không có SRT, giọng hát ngân luyến và điệp khúc lặp lại.
3. **Cần QA tập trung:** `00:04–01:04`, `02:21–03:19`, `03:46–04:43`, `05:01–05:32`; so sánh các biến thể phát âm nêu trên.
4. **Nguyên tắc hiển thị:** chỉ Hero Word in hoa; các chữ còn lại giữ chữ thường, chữ đầu câu có thể viết hoa. Không coi đuôi reverb nhạc nền là thời gian ngân của ca sĩ.

## 6. Cấu trúc dữ liệu xuất

- `TIMELINE_CAP_TU_HERO_DA_SUA.csv`: bảng V3, có 2 mốc sửa + mốc TXT (khi khớp cặp), Hero Word, tình trạng QA.
- `TIMELINE_CAP_TU_HERO_DA_SUA.json`: dùng trực tiếp cho trình phát lyric JS/HTML, chứa chi tiết theo từng câu và cue.
- `TIMELINE_CAP_TU_HERO_DA_SUA.srt`: xem trước chữ theo cặp, không phải phụ đề nghiệm thu.
- `TIMELINE_GOC_TU_TEP_TXT.csv`: 123 hàng gốc bảo toàn toàn bộ thời gian người dùng gửi.

