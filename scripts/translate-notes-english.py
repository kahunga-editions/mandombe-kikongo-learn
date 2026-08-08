#!/usr/bin/env python3
"""Traduit en anglais les notes culturelles du corpus du livre (FR -> EN).

Usage: python scripts/translate-notes-english.py /tmp/dico.json /tmp/notes-en.json
Le cache est reutilisable : seules les notes sans version anglaise sont envoyees a l'IA.
"""
import json
import os
import re
import sys
import threading
import requests

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/dico.json"
CACHE = sys.argv[2] if len(sys.argv) > 2 else "/tmp/notes-en.json"
MODEL = os.environ.get("EN_MODEL", "google/gemini-3.6-flash")
URL = "https://ai.gateway.lovable.dev/v1/chat/completions"
KEY = os.environ["LOVABLE_API_KEY"]
BATCH = 25
WORKERS = 6

SYSTEM = (
    "Tu es traducteur professionnel francais -> anglais. "
    "On te donne des notes culturelles ou grammaticales d'un dictionnaire de Kikongo Lari. "
    "Traduis la note en anglais naturel et concis. "
    "Ne traduis JAMAIS les mots en Kikongo Lari ni les transcriptions phonetiques entre / / : "
    "recopie-les tels quels. Garde les noms propres tels quels. "
    'Reponds en JSON strict : {"t":[{"i":<index>,"en":"<anglais>"}, ...]} sans commentaire.'
)

ASCII_ONLY = re.compile(r"^[\x00-\x7F]+$")


def looks_english(s: str) -> bool:
    low = " " + s.lower() + " "
    markers = (" the ", " is ", " it ", " they ", " meaning", "hidden", " one another",
               " plural ", " singular ", " used ", " to ")
    return any(m in low for m in markers)


entries = json.load(open(SRC))
todo = []
seen = set()
for e in entries:
    note = (e.get("note") or "").strip()
    if not note or note in seen:
        continue
    seen.add(note)
    if looks_english(note):
        continue
    todo.append(note)

cache = {}
if os.path.exists(CACHE):
    cache = json.load(open(CACHE))
todo = [n for n in todo if n not in cache]
print(f"notes a traduire: {len(todo)}")

lock = threading.Lock()
batches = [todo[i:i + BATCH] for i in range(0, len(todo), BATCH)]
done = 0


def run(batch):
    global done
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": json.dumps(
                [{"i": i, "fr": t} for i, t in enumerate(batch)], ensure_ascii=False)},
        ],
        "response_format": {"type": "json_object"},
    }
    for attempt in range(4):
        try:
            r = requests.post(URL, headers={"Authorization": f"Bearer {KEY}"},
                              json=payload, timeout=180)
            if r.status_code in (429, 500, 502, 503):
                continue
            data = r.json()["choices"][0]["message"]["content"]
            out = json.loads(data).get("t", [])
            with lock:
                for o in out:
                    i = int(o["i"])
                    en = (o.get("en") or "").strip()
                    if 0 <= i < len(batch) and en:
                        cache[batch[i]] = en
                done += len(batch)
                print(f"  {done}/{len(todo)}")
            return
        except Exception as ex:
            if attempt == 3:
                print("batch failed:", ex)


threads = []
for b in batches:
    t = threading.Thread(target=run, args=(b,))
    t.start()
    threads.append(t)
    while sum(1 for x in threads if x.is_alive()) >= WORKERS:
        pass
for t in threads:
    t.join()

json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
print("OK cache=", len(cache), "manquants=", sum(1 for n in todo if n not in cache))
