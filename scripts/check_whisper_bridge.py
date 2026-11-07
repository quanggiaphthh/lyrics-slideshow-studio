import subprocess, sys, numpy as np
sys.stdout.reconfigure(encoding='utf-8')

audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'
cmd = ['ffmpeg', '-y', '-ss', '225', '-t', '25', '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
audio_data = np.frombuffer(proc.stdout, dtype=np.float32)

from faster_whisper import WhisperModel
model = WhisperModel('base', device='cpu', compute_type='int8')
segments, info = model.transcribe(audio_data, language='vi', word_timestamps=True)
for seg in segments:
    print(f'[{225 + seg.start:.2f}s -> {225 + seg.end:.2f}s] {seg.text}')
    if seg.words:
        for w in seg.words:
            print(f'   {225 + w.start:.2f}s - {225 + w.end:.2f}s: {w.word}')
