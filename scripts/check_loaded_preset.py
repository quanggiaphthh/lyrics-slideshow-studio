import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script\s+src="([^"]+)"></script>', html)
print("Scripts loaded in index.html:")
for s in scripts:
    print("  ", s)

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

print("\nOccurrences of DEMO_PRESET or audited_timeline in js/app.js:")
for line in app_js.splitlines():
    if 'DEMO_PRESET' in line or 'preset' in line.lower() or 'audited' in line.lower() or 'wordsData' in line:
        print("  ", line.strip()[:100])
