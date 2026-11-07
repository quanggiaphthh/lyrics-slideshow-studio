import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\dtron\.gemini\antigravity\scratch\lyrics-slideshow-studio\js\preset_ganh_hao.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find each object in wordsData
import json
# Let's inspect stanzas and their lines/words
# Find all "id: 'gh_...'"
blocks = re.findall(r"\{\s*id:\s*'(gh_\d+)'[\s\S]*?lines:\s*\[[\s\S]*?\]\s*\}", content)
print(f"Total stanza blocks found: {len(blocks)}")

# Let's extract id, startTime, endTime and text of each
pattern = r"id:\s*'(gh_\d+)'[\s\S]*?startTime:\s*([0-9\.]+)[\s\S]*?endTime:\s*([0-9\.]+)"
for match in re.finditer(pattern, content):
    s_id, s_start, s_end = match.groups()
    # Also find text in this block
    print(f"Stanza {s_id}: {float(s_start):.2f}s -> {float(s_end):.2f}s")
