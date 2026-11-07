import subprocess, numpy as np, sys
sys.stdout.reconfigure(encoding='utf-8')

audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'

# Check RMS energy in 1s windows for first 80s
cmd = ['ffmpeg', '-y', '-ss', '0', '-t', '80', '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
data = np.frombuffer(proc.stdout, dtype=np.float32)

sr = 16000
for sec in range(0, 80, 2):
    chunk = data[sec*sr:(sec+2)*sr]
    rms = np.sqrt(np.mean(chunk**2)) if len(chunk) > 0 else 0
    print(f"{sec:02d}s - {sec+2:02d}s: RMS = {rms:.4f}")
