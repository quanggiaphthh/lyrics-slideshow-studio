import subprocess, sys, numpy as np, json
sys.stdout.reconfigure(encoding='utf-8')

audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'

print("Extracting full audio to 16kHz float32...")
cmd = ['ffmpeg', '-y', '-i', audio_path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-']
proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
audio_data = np.frombuffer(proc.stdout, dtype=np.float32)
duration = len(audio_data) / 16000
print(f"Total audio duration: {duration:.2f}s")

from faster_whisper import WhisperModel
print("Loading Whisper model...")
model = WhisperModel('small', device='cpu', compute_type='int8')

print("Transcribing full song with word timestamps...")
segments, info = model.transcribe(audio_data, language='vi', word_timestamps=True, vad_filter=True)

transcription = []
for seg in segments:
    seg_dict = {
        'start': round(seg.start, 3),
        'end': round(seg.end, 3),
        'text': seg.text.strip(),
        'words': []
    }
    if seg.words:
        for w in seg.words:
            seg_dict['words'].append({
                'word': w.word.strip(),
                'start': round(w.start, 3),
                'end': round(w.end, 3),
                'prob': round(w.probability, 3)
            })
    transcription.append(seg_dict)
    print(f"[{seg_dict['start']:6.2f}s -> {seg_dict['end']:6.2f}s] {seg_dict['text']}")

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\scripts\full_whisper_transcription.json', 'w', encoding='utf-8') as f:
    json.dump(transcription, f, ensure_ascii=False, indent=2)

print("Transcription saved successfully!")
