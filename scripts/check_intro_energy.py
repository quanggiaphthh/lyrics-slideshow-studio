import subprocess, numpy as np, sys
sys.stdout.reconfigure(encoding='utf-8')

audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'

# Check audio between 0s and 65s in 1s steps
cmd = ['ffmpeg', '-y', '-ss', '0', '-t', '65', '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
data = np.frombuffer(proc.stdout, dtype=np.float32)
sr = 16000

print("Sec   RMS    Max")
for s in range(0, 65):
    chunk = data[s*sr:(s+1)*sr]
    rms = np.sqrt(np.mean(chunk**2)) if len(chunk) > 0 else 0
    mx = np.max(np.abs(chunk)) if len(chunk) > 0 else 0
    print(f"{s:02d}s:  {rms:.4f}  {mx:.4f}")
