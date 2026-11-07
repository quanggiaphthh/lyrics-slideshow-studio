import subprocess, numpy as np, sys
sys.stdout.reconfigure(encoding='utf-8')

audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'

# Check RMS energy between 225s and 245s (03:45 to 04:05)
cmd = ['ffmpeg', '-y', '-ss', '225', '-t', '22', '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
data = np.frombuffer(proc.stdout, dtype=np.float32)

sr = 16000
for s in range(225, 245):
    idx = (s - 225) * sr
    chunk = data[idx:idx+sr]
    rms = np.sqrt(np.mean(chunk**2)) if len(chunk) > 0 else 0
    print(f"{s}s ({s//60:02d}:{s%60:02d}): RMS = {rms:.4f}")
