import subprocess, sys, numpy as np
sys.stdout.reconfigure(encoding='utf-8')

from faster_whisper import WhisperModel
model = WhisperModel('small', device='cpu', compute_type='int8')
audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'

# Let's inspect 220s to 245s (03:40 to 04:05) with 5s steps
for start_t in range(220, 245, 5):
    cmd = ['ffmpeg', '-y', '-ss', str(start_t), '-t', '5', '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    data = np.frombuffer(proc.stdout, dtype=np.float32)
    segs, _ = model.transcribe(data, language='vi', word_timestamps=True)
    print(f"\n--- Range {start_t}s - {start_t+5}s ({start_t//60:02d}:{start_t%60:02d} -> {(start_t+5)//60:02d}:{(start_t+5)%60:02d}) ---")
    for s in segs:
        print(f"[{start_t + s.start:.2f}s -> {start_t + s.end:.2f}s] {s.text}")
        if s.words:
            for w in s.words:
                print(f"   {start_t + w.start:.2f}s - {start_t + w.end:.2f}s: {w.word} ({w.probability:.2f})")
