#!/usr/bin/env python3
"""Gloses manquantes : chaque entree doit exister en francais ET en anglais.

Traduction seule, depuis la langue presente. Aucun sens ajoute.
Sortie : reports/glosses-v27.json  { lari v26 : {"fr": ..., "en": ...} }
"""
import html
import json
import os
import re
import sys
import urllib.request
import zipfile

SRC = sys.argv[1] if len(sys.argv) > 1 else "/mnt/documents/dictionnaire-lari-v26.odt"
OUT = "reports/glosses-v27.json"
KEY = os.environ["LOVABLE_API_KEY"]
URL = "https://ai.gateway.lovable.dev/v1/chat/completions"
SPAN = re.compile(r'<text:span text:style-name="(\w+)">(.*?)</text:span>')

SYS = (
    "Tu completes un dictionnaire Kikongo Lari - francais - anglais.\n"
    "Pour chaque item tu recois la forme Lari et la glose presente dans une "
    "seule langue. Tu rends la glose manquante, traduction stricte de la glose "
    "fournie.\n"
    "- tu ne changes pas le sens, tu n'ajoutes rien, tu n'inventes rien ;\n"
    "- les mots Kikongo Lari restent tels quels ;\n"
    "- meme ponctuation, majuscule initiale, point final s'il y en a un ;\n"
    "- reponse : JSON {\"cle\": \"glose traduite\"} et rien d'autre."
)


def txt(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or ""))


def call(messages):
    req = urllib.request.Request(
        URL, data=json.dumps({"model": "google/gemini-2.5-flash",
                              "messages": messages}).encode(),
        headers={"Authorization": "Bearer %s" % KEY,
                 "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read())["choices"][0]["message"]["content"]


def main():
    x = zipfile.ZipFile(SRC).read("content.xml").decode("utf-8")
    todo = []
    for m in re.finditer(r'<text:p text:style-name="Entry">(.*?)</text:p>',
                         x, re.S):
        f = {}
        for st, val in SPAN.findall(m.group(1)):
            f.setdefault(st, []).append(txt(val))
        lari = (f.get("LariT") or [""])[0].strip()
        fr = " ; ".join(v.strip() for v in f.get("FrT", []) if v.strip())
        en = " ; ".join(v.strip() for v in f.get("EnT", []) if v.strip())
        if lari and bool(fr) != bool(en):
            todo.append((lari, fr, en))
    print("gloses a completer :", len(todo))
    out = {}
    B = 20
    for i in range(0, len(todo), B):
        chunk = todo[i:i + B]
        payload = {str(j): {"lari": l, "fr": fr, "en": en}
                   for j, (l, fr, en) in enumerate(chunk)}
        raw = call([{"role": "system", "content": SYS},
                    {"role": "user", "content": json.dumps(payload,
                                                           ensure_ascii=False)}])
        raw = re.sub(r"^```(?:json)?|```$", "", raw.strip(), flags=re.M).strip()
        try:
            got = json.loads(raw)
        except json.JSONDecodeError:
            print("lot illisible", i)
            continue
        for j, (l, fr, en) in enumerate(chunk):
            v = got.get(str(j))
            if isinstance(v, dict):
                v = v.get("en") or v.get("fr")
            if not v:
                continue
            out[l] = {"en": v.strip()} if fr else {"fr": v.strip()}
        print("lot", i // B + 1, len(out))
    os.makedirs("reports", exist_ok=True)
    json.dump(out, open(OUT, "w"), ensure_ascii=False, indent=1)
    print("ecrit", OUT, len(out))


main()
