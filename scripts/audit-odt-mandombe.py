#!/usr/bin/env python3
"""Audit d'un ODT du dictionnaire. Ne corrige rien : lit et rapporte.

La verite terrain est la police elle-meme : chaque bloc Mandombe est mis en
forme avec HarfBuzz et la police masono_mandombe. Tout glyphe dont le nom
n'est pas prefixe par « _ » est une lettre latine residuelle.

Controles :
  1. lettres latines residuelles dans les blocs Mandombe (shaping reel)
  2. ponctuation terminale du Lari absente du bloc Mandombe
  3. majuscule initiale absente du bloc Mandombe
  4. semi-voyelle de liaison ajoutee par rapport au Lari (kua -> kuwa)
  5. voyelles doublees
  6. etiquettes de langue FR/EN en minuscule
  7. articles the/a/an en tete d'index anglais

Usage : python scripts/audit-odt-mandombe.py <fichier.odt> [rapport.txt]
"""
import html
import re
import sys
import zipfile
from collections import Counter

import uharfbuzz as hb
from fontTools.ttLib import TTFont

SRC = sys.argv[1]
REPORT = sys.argv[2] if len(sys.argv) > 2 else None
FONT_PATH = "/dev-server/public/fonts/masono_mandombe-webfont.ttf"

_blob = hb.Blob.from_file_path(FONT_PATH)
_face = hb.Face(_blob)
_font = hb.Font(_face)
_names = TTFont(FONT_PATH).getGlyphOrder()


def latin_residue(text: str):
    """Renvoie la liste des glyphes latins produits par le rendu Mandombe."""
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(_font, buf)
    out = []
    for info in buf.glyph_infos:
        name = _names[info.codepoint]
        if not name.startswith("_") and name not in ("space",):
            out.append(name)
    return out


def txt(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or ""))


SPAN = re.compile(r'<text:span text:style-name="(\w+)">(.*?)</text:span>')
PARA = re.compile(r'<text:p text:style-name="(\w+)">(.*?)</text:p>', re.S)
TERMINAL = ".?!"

problems = Counter()
samples = {}


def note(kind, detail, limit=25):
    problems[kind] += 1
    samples.setdefault(kind, [])
    if len(samples[kind]) < limit:
        samples[kind].append(detail)


def main():
    with zipfile.ZipFile(SRC) as z:
        xml = z.read("content.xml").decode("utf-8")

    for pm in PARA.finditer(xml):
        body = pm.group(2)
        fields = {}
        for st, val in SPAN.findall(body):
            fields.setdefault(st, []).append(txt(val))
        mand = " ".join(fields.get("MandT", []) + fields.get("MandS", [])).strip()
        lari = " ".join(fields.get("LariT", []) + fields.get("LariS", [])).strip()
        if not mand:
            continue

        res = latin_residue(mand)
        if res:
            note("lettre latine residuelle", f"{mand}   [{' '.join(res)}]   | {lari}")

        for w in mand.split():
            if re.search(r"([aeiouAEIOU])\1", w):
                note("voyelle doublee", f"{w} | {lari}")

        # semi-voyelle ajoutee : presente dans le Mandombe, absente du Lari
        mw = len(re.findall(r"[aeiou][wy][aeiou]", mand.lower()))
        lw = len(re.findall(r"[aeiou][wy][aeiou]", lari.lower()))
        if mw > lw:
            note("semi-voyelle de liaison ajoutee", f"{mand} | {lari}")

        if lari and lari[-1] in TERMINAL and mand[-1] not in TERMINAL:
            note("ponctuation terminale manquante dans le Mandombe", f"{mand} | {lari}")
        if lari and mand and lari[0].isupper() and mand[0].islower():
            note("majuscule manquante dans le Mandombe", f"{mand} | {lari}")

    plain = txt(xml)
    for m in re.finditer(r"(?<![A-Za-z])((?:[Ff][Rr]|[Ee][Nn]))\s*\u2014", plain):
        if not m.group(1).isupper():
            note("etiquette de langue en minuscule", m.group(0))

    for m in re.finditer(r'<text:p text:style-name="EntrySmall">(.*?)</text:p>', xml, re.S):
        for st, val in SPAN.findall(m.group(1)):
            if st == "HeadS" and re.match(r"^(the|a|an)\s+", txt(val).strip(), re.I):
                note("article en tete d'index", txt(val).strip())

    lines = [f"fichier : {SRC}"]
    if not problems:
        lines.append("AUCUN PROBLEME DETECTE")
    for k, v in problems.most_common():
        lines.append(f"\n== {k} : {v}")
        for s in samples[k]:
            lines.append("   - " + s)
    out = "\n".join(lines)
    print(out)
    if REPORT:
        open(REPORT, "w").write(out)
    return 1 if problems else 0


sys.exit(main())
