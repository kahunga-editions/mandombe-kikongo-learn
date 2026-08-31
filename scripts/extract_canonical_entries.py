#!/usr/bin/env python3
"""Migration unique : construire la source canonique des entrees du livre.

Cette extraction ne tourne qu'une fois. Elle lit la derniere version ANTERIEURE
a la fusion automatique (v26) et ecrit data/dictionary-entries.json, qui devient
desormais la seule source des entrees du dictionnaire papier.

Regles appliquees ici :
  - aucune fusion : deux entrees de meme graphie restent deux entrees ;
  - les arbitrages de l'auteur (gloses, notes, coquilles) sont reportes
    comme donnees, plus jamais comme retouches de document ;
  - une correction de graphie s'applique au Lari ET au Mandombe ;
  - les notes de travail adressees a l'agent ne sont pas du contenu publie.

Usage : python scripts/extract_canonical_entries.py
"""
import html
import json
import os
import re
import sys
import unicodedata
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

SRC = "/mnt/documents/dictionnaire-lari-v26.odt"
OUT = os.path.join(os.path.dirname(HERE), "data", "dictionary-entries.json")
REPORT = os.path.join(os.path.dirname(HERE), "reports", "extraction-canonique.txt")

PARA_RE = re.compile(r'<text:p text:style-name="(\w+)">(.*?)</text:p>', re.S)
SPAN_RE = re.compile(r'<text:span text:style-name="(\w+)">(.*?)</text:span>')

# --- arbitrages de l'auteur, repris des correctifs v27 / v28 ----------------
GLOSS_FIX = {
    "Abe yandi ni na?": (None, "Qui est-il au juste?", "Who is he exactly?"),
    "Ama": (None, "Ma chère ; maat", "My dear ; maat"),
    "Badi bari (l).": ("Badi · bari", "Amarante (un légume).",
                       "Amaranth (a vegetable)."),
    # homographes separes sur instruction expresse de l'auteur
    "BA": ("Ba", "Être ; exister ; habiter", "To be ; to exist ; to inhabit"),
    "Mbote": (None, "Bonjour", "Hello"),
    "Mbote · bote": ("Mbote", "Bonjour", "Hello"),
    "Bawu diela ye nawu. · · Bau mayela me nawu.":
        ("Bawu diela ye nawu. · Bau mayela me nawu.", None, None),
}

# points laisses a l'arbitrage de l'auteur : signales, jamais tranches
TO_ARBITRATE = [
    "Ba (etre) portait aussi le sens 'dard / stinger' : sens retire de "
    "l'entree 'etre', a rattacher a une entree propre si l'auteur l'atteste.",
    "Mbote portait aussi 'bon ; bien' : conserve uniquement 'bonjour'. "
    "'Bote' = bon / bonne reste une entree distincte.",
]



NEW_NOTES = {
    "mundjula": "Prononc\u00e9 /mundzula/ ; pluriel /mindzula/ \u00b7 "
                "EN \u2014 Pronounced /mundzula/ ; plural /mindzula/.",
    "mundzula": "Prononc\u00e9 /mundzula/ ; pluriel /mindzula/ \u00b7 "
                "EN \u2014 Pronounced /mundzula/ ; plural /mindzula/.",
}

# coquilles de saisie du champ Lari, corrigees dans les DEUX colonnes
LARI_TYPO = {
    "b.awu": "bawu",
}

# notes de travail adressees a l'agent : elles ne s'impriment pas
EDITORIAL_NOTE = re.compile(
    r"\s*\((?:en\s+)?(?:deux|2)\s+mots\)"
    r"|\s*\(en\s+un\s+seul\s+mot\)"
    r"|\s*\((?:sans|avec)\s+espace\)",
    re.I)

REPORT_LINES = []


def log(section, line):
    REPORT_LINES.append("%-16s %s" % (section, line))


def txt(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or ""))


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def fix_lari_typos(text):
    """Corrige une coquille connue dans le texte latin lui-meme."""
    out = text
    for bad, good in LARI_TYPO.items():
        pattern = re.compile(re.escape(bad).replace(r"\.", r"\."), re.I)

        def keep_case(m):
            src = m.group(0)
            return good.capitalize() if src[:1].isupper() else good

        out = pattern.sub(keep_case, out)
    return out


def clean_public(text):
    """Retire les consignes de saisie qui ne concernent pas le lecteur."""
    new = EDITORIAL_NOTE.sub("", text)
    return re.sub(r"\s{2,}", " ", new).strip()


def main():
    xml = zipfile.ZipFile(SRC).read("content.xml").decode("utf-8")
    start = xml.index('<text:section text:name="IndexLari"')
    end = xml.index("</text:section>", start)
    index_i = xml[start:end]

    entries = []
    pending_note_for = None
    for style, body in PARA_RE.findall(index_i):
        fields = {}
        for st, val in SPAN_RE.findall(body):
            fields.setdefault(st, []).append(txt(val))

        if style == "Entry":
            e = {
                "lari": (fields.get("LariT") or [""])[0].strip(),
                "mand": (fields.get("MandT") or [""])[0].strip(),
                "fr": " ; ".join(x.strip() for x in fields.get("FrT", []) if x.strip()),
                "en": " ; ".join(x.strip() for x in fields.get("EnT", []) if x.strip()),
                "note": "",
            }
            if not e["lari"]:
                continue
            entries.append(e)
            pending_note_for = e
        elif style == "EntryNote" and pending_note_for is not None:
            note = " ".join(x.strip() for x in fields.get("NoteT", []) if x.strip())
            if note:
                pending_note_for["note"] = note
            pending_note_for = None

    log("lecture", "%d entrees lues dans l'index I de la v26" % len(entries))

    # -- arbitrages de gloses
    for e in entries:
        fix = GLOSS_FIX.get(e["lari"])
        if not fix:
            continue
        lari_new, fr_new, en_new = fix
        if lari_new:
            log("arbitrage", "%s -> %s" % (e["lari"], lari_new))
            e["lari"] = lari_new
        if fr_new:
            e["fr"] = fr_new
        if en_new:
            e["en"] = en_new

    # -- gloses manquantes deja validees
    gpath = os.path.join(os.path.dirname(HERE), "reports", "glosses-v27.json")
    if os.path.exists(gpath):
        gmap = json.load(open(gpath, encoding="utf-8"))
        n = 0
        for e in entries:
            g = gmap.get(e["lari"])
            if not g:
                continue
            if g.get("fr") and not e["fr"].strip():
                e["fr"] = g["fr"]
                n += 1
            if g.get("en") and not e["en"].strip():
                e["en"] = g["en"]
                n += 1
        log("gloses", "%d gloses manquantes completees" % n)

    # -- notes bilingues deja validees
    npath = os.path.join(os.path.dirname(HERE), "reports", "notes-v27.json")
    if os.path.exists(npath):
        nmap = json.load(open(npath, encoding="utf-8"))
        n = 0
        for e in entries:
            new = nmap.get(e["note"].strip())
            if new:
                e["note"] = new
                n += 1
        log("notes", "%d notes rendues bilingues" % n)

    # -- notes de prononciation arbitrees
    for e in entries:
        first = strip_accents(
            e["lari"].split(",")[0].split("|")[0].split("\u00b7")[0].strip().lower())
        if first in NEW_NOTES and not e["note"]:
            e["note"] = NEW_NOTES[first]
            log("note", "prononciation ajoutee : %s" % e["lari"])

    # -- coquilles de saisie, Lari ET Mandombe
    for e in entries:
        for field in ("lari", "mand"):
            fixed = fix_lari_typos(e[field])
            fixed = re.sub(r"([Tt])hs", r"\1sh", fixed)
            fixed = re.sub(r"\b[MmNn][' \u2019]?[Ss]amu\b", "N'samu", fixed)
            if fixed != e[field]:
                log("coquille", "%s : %s -> %s" % (field, e[field], fixed))
                e[field] = fixed

    # -- consignes de saisie retirees du contenu publie
    for e in entries:
        for field in ("fr", "en", "note"):
            cleaned = clean_public(e[field])
            if cleaned != e[field]:
                log("note interne", "%s : %s -> %s" % (e["lari"], e[field], cleaned))
                e[field] = cleaned

    # -- formes vides laissees par les decoupes successives
    for e in entries:
        forms = [f.strip() for f in e["lari"].split("\u00b7")]
        keep = [f for f in forms if f]
        if len(keep) != len(forms):
            new = " \u00b7 ".join(keep)
            log("forme vide", "%s -> %s" % (e["lari"], new))
            e["lari"] = new



    # -- controle : aucune fusion d'homographes n'a ete heritee
    seen = {}
    for e in entries:
        key = strip_accents(e["lari"].lower())
        seen.setdefault(key, []).append(e)
    homographs = {k: v for k, v in seen.items() if len(v) > 1}
    for k, group in sorted(homographs.items()):
        log("homographe", "%s : %d entrees distinctes conservees"
            % (group[0]["lari"], len(group)))

    for line in TO_ARBITRATE:
        log("a arbitrer", line)

    # -- entrees sans sens complet : mises en attente, jamais devinees
    out = []
    for e in entries:
        rec = {"lari": e["lari"], "fr": e["fr"], "en": e["en"]}
        if e["note"]:
            rec["note"] = e["note"]
        if not e["fr"].strip() or not e["en"].strip():
            rec["pending"] = "sens incomplet dans la source : arbitrage auteur"
            log("a arbitrer", "%s : sens incomplet, entree mise en attente"
                % e["lari"])
        out.append(rec)
    held = sum(1 for r in out if r.get("pending"))

    # le Mandombe n'est plus stocke : il est toujours derive du Lari
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    os.makedirs(os.path.dirname(REPORT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    log("ecriture", "%s : %d entrees, dont %d en attente d'arbitrage"
        % (OUT, len(out), held))
    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(REPORT_LINES) + "\n")
    print("\n".join(REPORT_LINES[-10:]))
    print("source canonique : %d entrees, %d en attente" % (len(out), held))



if __name__ == "__main__":
    main()
