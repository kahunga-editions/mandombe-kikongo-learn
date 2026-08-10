#!/usr/bin/env python3
"""Gloses francaises et anglaises pour chaque ligne des tableaux de conjugaison.

On ne traduit JAMAIS le Kikongo Lari : la glose est deduite du sens du verbe
(donne par le corpus Nzo Mikanda), du temps et de la personne du tableau.

Usage: python scripts/translate-conjugations.py /tmp/conjugaisons.json /tmp/conj-gloss.json
Le cache est reutilisable : seules les lignes absentes sont envoyees a l'IA.
"""
import json
import os
import sys
import threading
import time

import requests

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/conjugaisons.json"
CACHE = sys.argv[2] if len(sys.argv) > 2 else "/tmp/conj-gloss.json"
MODEL = os.environ.get("CONJ_MODEL", "google/gemini-3.6-flash")
URL = "https://ai.gateway.lovable.dev/v1/chat/completions"
KEY = os.environ["LOVABLE_API_KEY"]
WORKERS = 5

SYSTEM = (
    "Tu produis les gloses francaise et anglaise des lignes d'un tableau de conjugaison. "
    "On te donne le sens du verbe (francais et anglais), le temps du tableau et la personne "
    "de chaque ligne. Tu ne traduis PAS le Kikongo Lari et tu ne le translitteres jamais : "
    "tu conjugues simplement le sens du verbe a la personne et au temps demandes. "
    "Le francais et l'anglais doivent exprimer exactement la meme chose. "
    "Chaque glose commence par une majuscule et se termine par un point. "
    "Pour l'imperatif, pas de pronom sujet ('Prends du sel.' / 'Take salt.'). "
    'Reponds en JSON strict : {"t":[{"i":<index>,"fr":"<francais>","en":"<anglais>"}]} '
    "sans commentaire."
)

tables = json.load(open(SRC))
cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}


def key_of(table, row):
    return f"{table['verb']}|{table.get('tense','')}|{row.get('person','')}|{row.get('lari','')}"


todo = [t for t in tables if any(key_of(t, r) not in cache for r in t.get("rows") or [])]
print(f"{len(tables)} tableaux, {len(todo)} a gloser")

lock = threading.Lock()
done = [0]


def call(table):
    rows = table.get("rows") or []
    lines = [
        f"{i}. personne: {r.get('person') or '-'}"
        for i, r in enumerate(rows)
    ]
    user = (
        f"Verbe : {table['verb']} — sens FR : {table.get('meaningFr') or table.get('meaning')} "
        f"— sens EN : {table.get('meaningEn') or ''}\n"
        f"Temps : {table.get('tense')}\n"
        "Lignes :\n" + "\n".join(lines)
    )
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": user},
        ],
        "temperature": 0.1,
    }
    for attempt in range(5):
        try:
            r = requests.post(
                URL,
                headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
                json=payload,
                timeout=120,
            )
            if r.status_code in (429, 500, 502, 503):
                time.sleep(3 * (attempt + 1))
                continue
            r.raise_for_status()
            txt = r.json()["choices"][0]["message"]["content"]
            txt = txt[txt.find("{"): txt.rfind("}") + 1]
            data = json.loads(txt)
            out = {}
            for item in data.get("t", []):
                i = int(item["i"])
                if 0 <= i < len(rows):
                    out[key_of(table, rows[i])] = {
                        "fr": (item.get("fr") or "").strip(),
                        "en": (item.get("en") or "").strip(),
                    }
            with lock:
                cache.update(out)
                done[0] += 1
                if done[0] % 10 == 0:
                    print(f"  {done[0]}/{len(todo)}")
                    json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
            return
        except Exception as exc:  # noqa: BLE001
            if attempt == 4:
                print(f"  echec {table['verb']} / {table.get('tense')}: {exc}")
            time.sleep(2 * (attempt + 1))


threads = []
queue = list(todo)
qlock = threading.Lock()


def worker():
    while True:
        with qlock:
            if not queue:
                return
            t = queue.pop()
        call(t)


for _ in range(WORKERS):
    th = threading.Thread(target=worker)
    th.start()
    threads.append(th)
for th in threads:
    th.join()

json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
print(f"cache : {len(cache)} gloses -> {CACHE}")
