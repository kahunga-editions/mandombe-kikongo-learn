#!/usr/bin/env python3
"""Traduit en coreen (hangul) les sens francais/anglais du corpus du livre.

Usage: python scripts/translate-book-korean.py /tmp/dico.json /tmp/ko-cache.json
Le cache est reutilisable : seules les nouvelles glosses sont envoyees a l'IA.
"""
import json
import os
import sys
import time
import threading
import requests

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/dico.json"
CACHE = sys.argv[2] if len(sys.argv) > 2 else "/tmp/ko-cache.json"
MODEL = os.environ.get("KO_MODEL", "google/gemini-3.6-flash")
URL = "https://ai.gateway.lovable.dev/v1/chat/completions"
KEY = os.environ["LOVABLE_API_KEY"]
BATCH = 40
WORKERS = 6

SYSTEM = (
    "Tu es traducteur professionnel francais/anglais -> coreen. "
    "On te donne des sens de mots d'une langue africaine (Kikongo Lari) deja traduits "
    "en francais et en anglais. Traduis UNIQUEMENT le sens en coreen naturel (hangul). "
    "Ne translittere JAMAIS le mot Kikongo en hangul. "
    "Pour un mot isole donne le mot coreen usuel (verbes a l'infinitif en -다). "
    "Pour une phrase donne une phrase coreenne naturelle et polie (해요체). "
    "Garde les noms propres tels quels en alphabet latin. "
    'Reponds en JSON strict : {"t":[{"i":<index>,"ko":"<coreen>"}, ...]} sans commentaire.'
)

entries = json.load(open(SRC))


def gloss(e):
    fr = (e.get("french") or "").strip()
    en = (e.get("english") or "").strip()
    return fr, en


keys = []
seen = set()
for e in entries:
    fr, en = gloss(e)
    if not fr:
        continue
    k = fr + "|" + en
    if k in seen:
        continue
    seen.add(k)
    keys.append((k, fr, en))

cache = {}
if os.path.exists(CACHE):
    cache = json.load(open(CACHE))
todo = [k for k in keys if k[0] not in cache]
print(f"{len(keys)} glosses uniques, {len(todo)} a traduire")

lock = threading.Lock()
done = [0]


def call(batch):
    lines = []
    for i, (_, fr, en) in enumerate(batch):
        lines.append(f"{i}. FR: {fr}" + (f" | EN: {en}" if en else ""))
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
                ko = (item.get("ko") or "").strip()
                if 0 <= idx < len(batch) and ko:
                    out[batch[idx][0]] = ko
            return out
        except Exception as exc:  # noqa: BLE001
            if attempt == 5:
                print("echec batch:", exc)
                return {}
            time.sleep(3 * (attempt + 1))
    return {}


batches = [todo[i:i + BATCH] for i in range(0, len(todo), BATCH)]


def worker(idx):
    while True:
        with lock:
            if not batches:
                return
            b = batches.pop()
        res = call(b)
        with lock:
            cache.update(res)
            done[0] += len(b)
            if done[0] % (BATCH * 10) < BATCH:
                json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
                print(f"  {done[0]}/{len(todo)}")


threads = [threading.Thread(target=worker, args=(i,)) for i in range(WORKERS)]
for t in threads:
    t.start()
for t in threads:
    t.join()

json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
missing = [k for k, _, _ in keys if k not in cache]
print(f"OK cache={len(cache)} manquants={len(missing)}")
