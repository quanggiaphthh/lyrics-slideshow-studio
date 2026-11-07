import subprocess, numpy as np, sys
sys.stdout.reconfigure(encoding='utf-8')

from faster_whisper import WhisperModel
model = WhisperModel('small', device='cpu', compute_type='int8')
audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'

def transcribe_range(start_sec, dur_sec, label):
    cmd = ['ffmpeg', '-y', '-ss', str(start_sec), '-t', str(dur_sec), '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    data = np.frombuffer(proc.stdout, dtype=np.float32)
    segs, _ = model.transcribe(data, language='vi', word_timestamps=True, initial_prompt='Hò ơi ai xui con sáo sổ lồng cho em nỡ vội lấy chồng bỏ anh')
    print(f"\n--- {label} ({start_sec}s - {start_sec+dur_sec}s) ---")
    for s in segs:
        print(f"[{start_sec + s.start:.2f}s -> {start_sec + s.end:.2f}s] {s.text}")
        if s.words:
            for w in s.words:
                print(f"   {start_sec + w.start:.2f}s - {start_sec + w.end:.2f}s: {w.word} ({w.probability:.2f})")

transcribe_range(3, 8, "Hò ơi 1")
transcribe_range(14, 13, "Ai xui con sáo")
transcribe_range(28, 9, "Cho em nỡ vội")
transcribe_range(37, 12, "Hò ơi 2")
transcribe_range(50, 16, "Cho em nỡ vội lấy chồng bỏ anh")
transcribe_range(76, 12, "Sao bay theo chồng")
