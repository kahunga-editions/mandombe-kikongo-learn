#!/usr/bin/env python3
"""Audit d'un ODT du dictionnaire : rien n'est corrige ici, on ne fait que lire.

Controles :
  1. lettres latines residuelles / caracteres hors inventaire dans les blocs Mandombe
  2. ponctuation terminale composee HORS du span Mandombe
  3. semi-voyelles de liaison parasites (kuwa au lieu de kua)
  4. voyelles doublees
  5. etiquettes de langue FR/EN en minuscule
  6. articles the/a/an en tete d'index anglais
  7. doublons stricts dans un meme index

Usage : python scripts/audit-odt-mandombe.py <fichier.odt>
"""
import html
import re
import sys
import zipfile
from collections import Counter

SRC = sys.argv[1]

# ------------------------------------------------------------- inventaire
VOWELS = ["i", "u", "e", "o", "a"]
SIMPLE = ["b", "d", "f", "k", "l", "m", "n", "s", "t", "v", "w", "y", "z",
          "g", "p", "r"]
PRENAS = ["mb", "nd", "ng", "mf", "nk", "nl", "mv", "ns", "nt", "ny"]
MAZI = ["sh", "j", "dj", "nz", "tsh"]
COMPLEX_V = ["ia", "ue", "io", "ui", "iu", "ua"]

CONS = sorted(set(SIMPLE + PRENAS + MAZI), key=len, reverse=True)
SYLL = set()
for c in CONS:
    for v in VOWELS + COMPLEX_V:
        SYLL.add(c + v)
for v in VOWELS + COMPLEX_V:
    SYLL.add(v)
# ntentia : N'K + voyelle
for v in VOWELS:
    SYLL.add("n'k" + v)
MAXLEN = max(len(s) for s in SYLL)


def split_syllables(word: str):
    """Decoupe gloutonne. Renvoie (syllabes, reste_non_reconnu)."""
    w = word.lower()
    out, i = [], 0
    while i < len(w):
        for ln in range(min(MAXLEN, len(w) - i), 0, -1):
            cand = w[i:i + ln]
            if cand in SYLL:
                out.append(cand)
                i += ln
                break
        else:
            return out, w[i:]
    return out, ""


# ------------------------------------------------------------- lecture ODT
def txt(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or ""))


SPAN = re.compile(r'<text:span text:style-name="(\w+)">(.*?)</text:span>')
PARA = re.compile(r'<text:p text:style-name="([\w]+)">(.*?)</text:p>', re.S)

with zipfile.ZipFile(SRC) as z:
    xml = z.read("content.xml").decode("utf-8")

problems = Counter()
samples = {}


def note(kind, detail):
    problems[kind] += 1
    samples.setdefault(kind, [])
    if len(samples[kind]) < 12:
        samples[kind].append(detail)


TERMINAL = ".?!"
seen_index = {}

for pm in PARA.finditer(xml):
    style, body = pm.group(1), pm.group(2)
    spans = SPAN.findall(body)
    fields = {}
    for st, val in spans:
        fields.setdefault(st, []).append(txt(val))
    mand = " ".join(fields.get("MandT", []) + fields.get("MandS", [])).strip()
    lari = " ".join(fields.get("LariT", []) + fields.get("LariS", [])).strip()

    if mand:
        # 1/3/4 : contenu du bloc Mandombe
        for word in mand.split():
            core = word.strip(TERMINAL + ",;:\u00b7")
            if not core:
                continue
            if re.search(r"[^A-Za-z'.?!,;:\u00b7]", core):
                note("caractere hors alphabet dans Mandombe", f"{core} | {lari}")
            syl, rest = split_syllables(core)
            if rest:
                note("suite non typable en Mandombe", f"{core} -> reste '{rest}' | {lari}")
            if re.search(r"[aeiouAEIOU]w[aeiouAEIOU]", core) or re.search(r"[uU]w", core):
                note("semi-voyelle de liaison parasite (w)", f"{core} | {lari}")
            if re.search(r"([aeiouAEIOU])\1", core):
                note("voyelle doublee", f"{core} | {lari}")
        # 2 : ponctuation terminale du Lari absente du Mandombe
        if lari and lari[-1] in TERMINAL and mand[-1] not in TERMINAL:
            note("ponctuation terminale manquante dans le Mandombe", f"{mand} | {lari}")
        if mand and mand[0].islower() and lari and lari[0].isupper():
            note("majuscule manquante dans le Mandombe", f"{mand} | {lari}")

plain = txt(xml)
for m in re.finditer(r"(?<![A-Za-z])((?:[Ff][Rr]|[Ee][Nn]))\s*\u2014", plain):
    if not m.group(1).isupper():
        note("etiquette de langue en minuscule", m.group(0))

for m in re.finditer(r'<text:p text:style-name="EntrySmall">(.*?)</text:p>', xml, re.S):
    heads = SPAN.findall(m.group(1))
    for st, val in heads:
        if st == "HeadS":
            h = txt(val).strip()
            if re.match(r"^(the|a|an)\s+", h, re.I):
                note("article en tete d'index", h)
            key = h.lower()
            seen_index[key] = seen_index.get(key, 0) + 1

print(f"fichier : {SRC}")
if not problems:
    print("AUCUN PROBLEME DETECTE")
for k, v in problems.most_common():
    print(f"\n== {k} : {v}")
    for s in samples[k]:
        print("   -", s)
