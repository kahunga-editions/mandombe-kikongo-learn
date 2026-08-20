#!/usr/bin/env python3
"""Dictionnaire v25 — derive DIRECTEMENT du document v24 valide.

Pourquoi ne pas relancer toute la chaine ? Le contenu de la v24 (sens corriges
par l'auteur, ponctuation composee en Mandombe, index II/III reconstruits) est
valide. On ne veut donc PAS reappliquer le nettoyage, seulement :

  1. corriger la casse cassee des etiquettes bilingues (« eN — » -> « EN — ») ;
  2. produire la version coreenne en ajoutant une glose hangul par entree
     et un Index IV (coreen -> Kikongo Lari -> francais).

Usage:
  python scripts/build-dictionary-odt-v25.py <v24.odt> <out.odt>            # trilingue
  python scripts/build-dictionary-odt-v25.py <v24.odt> <out.odt> <ko.json>  # + coreen
"""
import html
import json
import os
import re
import shutil
import sys
import zipfile

SRC = sys.argv[1]
DST = sys.argv[2]
KO_CACHE = sys.argv[3] if len(sys.argv) > 3 else None

KO_FONT = "Noto Sans CJK KR"

# --------------------------------------------------------------------- correctifs
# « eN — », « fR — », « En — » : la regle de minuscule apres point-virgule avait
# abime les etiquettes de langue. Elles sont TOUJOURS en capitales.
LABEL_RE = re.compile(r"(?<![A-Za-z])([Ff][Rr]|[Ee][Nn])(\s*\u2014)")


def fix_labels(xml: str):
    """Retablit FR/EN en capitales devant un tiret cadratin. Renvoie (xml, n)."""
    n = 0

    def rep(m):
        nonlocal n
        if m.group(1).isupper():
            return m.group(0)
        n += 1
        return m.group(1).upper() + m.group(2)

    return LABEL_RE.sub(rep, xml), n


SPAN_RE = re.compile(
    r'<text:span text:style-name="(MandT|LariT|FrT|EnT|NoteT)">(.*?)</text:span>')
ENTRY_RE = re.compile(r'<text:p text:style-name="Entry">(.*?)</text:p>', re.S)


def txt(s: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", s or "")).strip()


def esc(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def read_entries(xml: str):
    """Entrees de l'Index I : (position de fin du bloc, lari, fr, en)."""
    out = []
    for m in ENTRY_RE.finditer(xml):
        fields = {k: txt(v) for k, v in SPAN_RE.findall(m.group(1))}
        if not fields.get("LariT") or not fields.get("FrT"):
            continue
        out.append({
            "start": m.start(), "end": m.end(),
            "mandombe": fields.get("MandT", ""),
            "lari": fields["LariT"],
            "fr": fields["FrT"],
            "en": fields.get("EnT", ""),
        })
    return out


# --------------------------------------------------------------------- coreen
KO_STYLE = (
    '<style:style style:name="KoT" style:family="text">'
    '<style:text-properties style:font-name="{f}" style:font-name-asian="{f}" '
    'fo:font-size="9pt" style:font-size-asian="9pt" fo:color="#3c3c3c"/>'
    "</style:style>"
).format(f=KO_FONT)

KO_ENTRY_STYLE = (
    '<style:style style:name="KoEntry" style:family="paragraph" '
    'style:parent-style-name="Standard">'
    '<style:paragraph-properties fo:margin-bottom="0.10cm" fo:text-indent="0.35cm"/>'
    '<style:text-properties style:font-name="{f}" style:font-name-asian="{f}" '
    'fo:font-size="9pt" style:font-size-asian="9pt"/>'
    "</style:style>"
).format(f=KO_FONT)

FONT_DECL = ('<style:font-face style:name="{f}" svg:font-family="{f}" '
             'style:font-pitch="variable"/>').format(f=KO_FONT)


def add_korean(xml: str, ko_map: dict):
    """Insere la glose coreenne apres la glose anglaise de chaque entree."""
    entries = read_entries(xml)
    pieces, last, used = [], 0, 0
    for e in entries:
        ko = ko_map.get(ko_key(e))
        if not ko:
            continue
        block = xml[e["start"]:e["end"]]
        insert = '  \u00b7  <text:span text:style-name="KoT">%s</text:span>' % esc(ko)
        block = block[: block.rfind("</text:p>")] + insert + "</text:p>"
        pieces.append(xml[last:e["start"]])
        pieces.append(block)
        last = e["end"]
        used += 1
    pieces.append(xml[last:])
    return "".join(pieces), used, len(entries)


def ko_key(e) -> str:
    return (e["fr"].strip() + "|" + (e["en"] or "").strip())


def korean_index(entries, ko_map):
    """Index IV : coreen -> Kikongo Lari -> francais (une entree par ligne)."""
    rows = []
    seen = set()
    for e in entries:
        ko = ko_map.get(ko_key(e))
        if not ko:
            continue
        for sense in re.split(r"\s*;\s*", ko):
            sense = sense.strip(" .")
            if not sense or len(e["lari"].split()) > 4:
                continue
            k = (sense, e["lari"])
            if k in seen:
                continue
            seen.add(k)
            rows.append((sense, e["mandombe"] or e["lari"], e["lari"], e["fr"]))
    rows.sort(key=lambda r: r[0])

    out = ['<text:p text:style-name="Chapter">Index IV \u2014 \ud55c\uad6d\uc5b4 \u2192 '
           'Kikongo Lari \u2192 Fran\u00e7ais</text:p>']
    for ko, mand, lari, fr in rows:
        out.append(
            '<text:p text:style-name="KoEntry">'
            '<text:span text:style-name="KoT">%s</text:span>  \u00b7  '
            '<text:span text:style-name="MandT">%s</text:span>  '
            '<text:span text:style-name="LariT">%s</text:span>  '
            '<text:span text:style-name="FrT">%s</text:span></text:p>'
            % (esc(ko), esc(mand), esc(lari), esc(fr)))
    return "".join(out), len(rows)


def main():
    with zipfile.ZipFile(SRC) as z:
        names = z.namelist()
        blobs = {n: z.read(n) for n in names}

    xml = blobs["content.xml"].decode("utf-8")
    xml, fixed = fix_labels(xml)
    styles = blobs["styles.xml"].decode("utf-8")
    styles, fixed_styles = fix_labels(styles)
    ko_used = ko_rows = 0

    if KO_CACHE:
        ko_map = json.load(open(KO_CACHE))
        entries = read_entries(xml)
        xml, ko_used, total = add_korean(xml, ko_map)
        idx, ko_rows = korean_index(entries, ko_map)
        # styles + police
        xml = xml.replace("</office:automatic-styles>",
                          KO_STYLE + KO_ENTRY_STYLE + "</office:automatic-styles>", 1)
        if 'style:name="%s"' % KO_FONT not in xml:
            xml = xml.replace("</office:font-face-decls>",
                              FONT_DECL + "</office:font-face-decls>", 1)
        # Index IV avant l'annexe des conjugaisons (a defaut, en fin de corps)
        anchor = xml.find('<text:p text:style-name="Chapter">Annexe')
        if anchor < 0:
            anchor = xml.rfind("</office:text>")
        xml = xml[:anchor] + idx + xml[anchor:]
        # page de titre
        xml = xml.replace(
            "Dictionnaire Kikongo Lari \u2013 Fran\u00e7ais \u2013 English",
            "Dictionnaire Kikongo Lari \u2013 Fran\u00e7ais \u2013 English \u2013 \ud55c\uad6d\uc5b4")
        xml = xml.replace(
            "Kikongo Lari \u2013 French \u2013 English Dictionary",
            "Kikongo Lari \u2013 French \u2013 English \u2013 Korean Dictionary")
        xml = xml.replace(
            "Trois index de recherche : Lari \u00b7 Fran\u00e7ais \u00b7 English",
            "Quatre index de recherche : Lari \u00b7 Fran\u00e7ais \u00b7 English \u00b7 \ud55c\uad6d\uc5b4")
        xml = xml.replace(
            "Three search indexes: Lari \u00b7 French \u00b7 English",
            "Four search indexes: Lari \u00b7 French \u00b7 English \u00b7 Korean")

    blobs["content.xml"] = xml.encode("utf-8")
    blobs["styles.xml"] = styles.encode("utf-8")

    os.makedirs(os.path.dirname(DST) or ".", exist_ok=True)
    with zipfile.ZipFile(DST, "w", zipfile.ZIP_DEFLATED) as out:
        # mimetype doit rester en premier et non compresse
        out.writestr(zipfile.ZipInfo("mimetype"), blobs.pop("mimetype", b"application/vnd.oasis.opendocument.text"),
                     compress_type=zipfile.ZIP_STORED)
        for n in names:
            if n == "mimetype":
                continue
            out.writestr(n, blobs[n])

    print(f"source={SRC}\nsortie={DST}")
    print(f"etiquettes FR/EN corrigees = {fixed + fixed_styles}")
    if KO_CACHE:
        print(f"gloses coreennes inserees = {ko_used} ; index IV = {ko_rows} lignes")


main()
