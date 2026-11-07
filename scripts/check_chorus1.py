import subprocess, sys, numpy as np
sys.stdout.reconfigure(encoding='utf-8')

audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'

# Transcribe around 140s - 170s
cmd = ['ffmpeg', '-y', '-ss', '140', '-t', '35', '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
audio_data = np.frombuffer(proc.stdout, dtype=np.float32)

from faster_whisper import WhisperModel
model = WhisperModel('base', device='cpu', compute_type='int8')
segments, info = model.transcribe(audio_data, language='vi', word_timestamps=True)
for seg in segments:
    print(f'[{140 + seg.start:.2f}s -> {140 + seg.end:.2f}s] {seg.text}')
    if seg.words:
        for w in seg.words:
            print(f'   {140 + w.start:.2f}s - {140 + w.end:.2f}s: {w.word}')
