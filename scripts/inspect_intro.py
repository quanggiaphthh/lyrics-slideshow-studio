import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\scripts\full_whisper_transcription.json', 'r', encoding='utf-8') as f:
    whisper_data = json.load(f)

print("=== SEGMENT 1 WORDS ===")
for w in whisper_data[0]['words']:
    print(f"  {w['word']:15s} [{w['start']:6.2f}s -> {w['end']:6.2f}s] prob={w['prob']}")

print("\n=== SEGMENT 2 WORDS ===")
for w in whisper_data[1]['words']:
    print(f"  {w['word']:15s} [{w['start']:6.2f}s -> {w['end']:6.2f}s] prob={w['prob']}")
