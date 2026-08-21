#!/usr/bin/env python3
"""Notes du dictionnaire : format bilingue unique FR · EN — ...

Lit les notes de la v26, recompose celles qui sont cassees (points-virgules
parasites) et traduit celles qui n'existent que dans une langue. Aucune
information ajoutee : traduction seule.

Sortie : reports/notes-v27.json  { note v26 : note bilingue }
"""
import html
import json
import os
import re
import sys
import urllib.request
import zipfile

SRC = sys.argv[1] if len(sys.argv) > 1 else "/mnt/documents/dictionnaire-lari-v26.odt"
OUT = "reports/notes-v27.json"
KEY = os.environ["LOVABLE_API_KEY"]
URL = "https://ai.gateway.lovable.dev/v1/chat/completions"

SEP = " \u00b7 EN \u2014 "


def txt(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or ""))


def call(messages):
    req = urllib.request.Request(
        URL,
        data=json.dumps({"model": "google/gemini-2.5-flash",
                         "messages": messages}).encode(),
        headers={"Authorization": "Bearer %s" % KEY,
                 "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read())["choices"][0]["message"]["content"]


SYS = (
    "Tu mets en forme les notes d'un dictionnaire Kikongo Lari - francais - anglais.\n"
    "Pour chaque note fournie tu renvoies une note bilingue au format exact :\n"
    "<francais> \u00b7 EN \u2014 <english>\n"
    "Regles strictes :\n"
    "- tu traduis, tu n'ajoutes AUCUNE information, tu n'inventes AUCUN sens ;\n"
    "- les mots Kikongo Lari restent tels quels, jamais traduits ni corriges ;\n"
    "- les notations phonetiques restent entre barres obliques /a/ ;\n"
    "- tu recomposes une phrase lisible quand la note d'origine est hachee par "
    "des points-virgules parasites, sans changer le contenu ;\n"
    "- une phrase commence par une majuscule et se termine par un point ;\n"
    "- reponse : un objet JSON {\"1\": \"...\", \"2\": \"...\"} avec les memes cles "
    "que l'entree, rien d'autre."
)


def main():
    x = zipfile.ZipFile(SRC).read("content.xml").decode("utf-8")
    notes = []
    seen = set()
    for m in re.finditer(r'<text:p text:style-name="EntryNote">(.*?)</text:p>',
                         x, re.S):
        t = txt(m.group(1)).strip()
        if t and t not in seen:
            seen.add(t)
            notes.append(t)
    todo = [n for n in notes if SEP not in n or " ; " in n.split(SEP)[0]]
    print("notes :", len(notes), "a retraiter :", len(todo))
    result = {}
    B = 25
    for i in range(0, len(todo), B):
        chunk = todo[i:i + B]
        payload = {str(j): s for j, s in enumerate(chunk)}
        raw = call([{"role": "system", "content": SYS},
                    {"role": "user", "content": json.dumps(payload,
                                                           ensure_ascii=False)}])
        raw = re.sub(r"^```(?:json)?|```$", "", raw.strip(), flags=re.M).strip()
        try:
            got = json.loads(raw)
        except json.JSONDecodeError:
            print("lot %d illisible, ignore" % i)
            continue
        for j, s in enumerate(chunk):
            v = got.get(str(j))
            if v and SEP in v:
                result[s] = v.strip()
        print("lot %d/%d ok (%d)" % (i // B + 1, (len(todo) + B - 1) // B,
                                     len(result)))
    os.makedirs("reports", exist_ok=True)
    json.dump(result, open(OUT, "w"), ensure_ascii=False, indent=1)
    print("ecrit", OUT, len(result))


main()
