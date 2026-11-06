import sys, os, subprocess, json, numpy as np
sys.stdout.reconfigure(encoding='utf-8')
from faster_whisper import WhisperModel

audio_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\assets\samples\dem_ganh_hao.mp3'
cmd = ['ffmpeg', '-v', 'quiet', '-i', audio_path, '-f', 'f32le', '-acodec', 'pcm_f32le', '-ac', '1', '-ar', '16000', '-']
proc = subprocess.run(cmd, capture_output=True)
audio_data = np.frombuffer(proc.stdout, np.float32)

print('Transcribing full audio with faster-whisper (352.8s)...')
model = WhisperModel('base', device='cpu', compute_type='int8')
prompt = (
    'Còn thương sắc hoa chung tình. '
    'Hò ơi ai xuôi con sáo sổ lồng cho em nỡ vội lấy chồng bỏ anh. '
    'Sáo bay theo chồng đâu biết là đau lòng anh lắm. '
    'Xót xa lặng thầm nhìn theo bước em qua cầu. '
    'Ngày nào có nhau ta trao ước hẹn trầu cau. '
    'Mong duyên ban đầu trời thương không đổ mưa ngâu. '
    'Bóng em xa dần anh biết là một lần chia cách. '
    'Trách ai vô tình đành tâm xẻ đôi tim mình. '
    'Dặn lòng cố quên sao đêm vẫn thường gọi tên. '
    'Ai ru trong chiều cho lòng càng nhớ em nhiều. '
    'À ơi em nỡ sao em bỏ anh một mình lục bình trôi chẳng biết nơi neo. '
    'Còn thương tóc em buông dài tím hoa anh cài em cười xiết chặt vòng tay. '
    'À ơi em nỡ sao em nói thương anh nhiều đành lòng em cất bước sang sông. '
    'Vì đâu dở dang duyên mình sắc hoa chung tình chưa phai màu nỡ nào người đi.'
)

segments, info = model.transcribe(
    audio_data,
    language='vi',
    word_timestamps=True,
    initial_prompt=prompt,
    beam_size=5,
    vad_filter=False
)

results = []
for s in segments:
    words_list = []
    if s.words:
        for w in s.words:
            words_list.append({
                'word': w.word.strip(),
                'start': round(w.start, 2),
                'end': round(w.end, 2)
            })
    results.append({
        'start': round(s.start, 2),
        'end': round(s.end, 2),
        'text': s.text.strip(),
        'words': words_list
    })
    print(f'[{s.start:.1f}s -> {s.end:.1f}s] {s.text}')

out_path = r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\dem_ganh_hao_whisper.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print('Done! Saved', len(results), 'segments.')
