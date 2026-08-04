#!/usr/bin/env python3
"""Complete les sens anglais manquants du corpus du livre (FR -> EN).

Usage: python scripts/translate-book-english.py /tmp/dico.json /tmp/en-cache.json
Le cache est reutilisable : seules les glosses sans anglais sont envoyees a l'IA.
"""
import json
import os
import sys
import time
import threading
import requests

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/dico.json"
CACHE = sys.argv[2] if len(sys.argv) > 2 else "/tmp/en-cache.json"
MODEL = os.environ.get("EN_MODEL", "google/gemini-3.6-flash")
URL = "https://ai.gateway.lovable.dev/v1/chat/completions"
KEY = os.environ["LOVABLE_API_KEY"]
BATCH = 40
WORKERS = 6

SYSTEM = (
    "Tu es traducteur professionnel francais -> anglais. "
    "On te donne des sens de mots et de phrases d'une langue africaine (Kikongo Lari), "
    "donnes en francais. Traduis UNIQUEMENT le sens en anglais naturel. "
    "Ne translittere JAMAIS le mot Kikongo. "
    "Pour un mot isole donne le mot anglais usuel (verbes a l'infinitif avec 'to'). "
    "Pour une phrase donne une phrase anglaise naturelle et correcte. "
    "Garde les noms propres tels quels. "
    'Reponds en JSON strict : {"t":[{"i":<index>,"en":"<anglais>"}, ...]} sans commentaire.'
)

entries = json.load(open(SRC))

keys = []
seen = set()
for e in entries:
    fr = (e.get("french") or "").strip()
    en = (e.get("english") or "").strip()
    if not fr or en:
        continue
    if fr in seen:
        continue
    seen.add(fr)
    keys.append(fr)

cache = {}
if os.path.exists(CACHE):
    cache = json.load(open(CACHE))
todo = [k for k in keys if k not in cache]
print(f"{len(keys)} glosses sans anglais, {len(todo)} a traduire")

lock = threading.Lock()
done = [0]


def call(batch):
    lines = [f"{i}. {fr}" for i, fr in enumerate(batch)]
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": "\n".join(lines)},
        ],
        "response_format": {"type": "json_object"},
    }
    for attempt in range(6):
        try:
            r = requests.post(
                URL, json=payload, timeout=180,
                headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
            )
            if r.status_code == 429:
                time.sleep(5 * (attempt + 1))
                continue
            if r.status_code == 402:
                print("CREDITS EPUISES")
                sys.exit(2)
            r.raise_for_status()
            data = json.loads(r.json()["choices"][0]["message"]["content"])
            out = {}
            for item in data.get("t", []):
                idx = int(item["i"])
                en = (item.get("en") or "").strip()
                if 0 <= idx < len(batch) and en:
                    out[batch[idx]] = en
            return out
        except Exception as exc:  # noqa: BLE001
            if attempt == 5:
                print("echec batch:", exc)
                return {}
            time.sleep(3 * (attempt + 1))
    return {}


batches = [todo[i:i + BATCH] for i in range(0, len(todo), BATCH)]


def worker():
    while True:
        with lock:
            if not batches:
                return
            b = batches.pop()
        res = call(b)
        with lock:
            cache.update(res)
            done[0] += len(b)
            json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
            print(f"  {done[0]}/{len(todo)}")


threads = [threading.Thread(target=worker) for _ in range(WORKERS)]
for t in threads:
    t.start()
for t in threads:
    t.join()

json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
missing = [k for k in keys if k not in cache]
print(f"OK cache={len(cache)} manquants={len(missing)}")
