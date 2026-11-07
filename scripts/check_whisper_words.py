import json, re, sys, zipfile, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

# Load Whisper transcription
with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\scripts\full_whisper_transcription.json', 'r', encoding='utf-8') as f:
    whisper_data = json.load(f)

# Flatten whisper words
w_words = []
for seg in whisper_data:
    for w in seg['words']:
        w_words.append(w)

print(f"Total whisper words: {len(w_words)}")
for w in w_words[:25]:
    print(f"  {w['word']:15s} [{w['start']:6.2f}s -> {w['end']:6.2f}s]")
