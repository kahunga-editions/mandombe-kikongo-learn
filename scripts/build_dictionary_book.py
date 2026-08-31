#!/usr/bin/env python3
"""Construit le dictionnaire papier depuis la source canonique, une seule fois.

Regles tenues par ce script :
  - les entrees viennent uniquement de data/dictionary-entries.json ;
  - aucun ODT genere ne sert jamais de source d'entrees ;
  - aucune fusion : deux homographes restent deux entrees ;
  - le Mandombe est derive du Lari, jamais saisi a part ;
  - si un controle bloquant echoue, aucun document n'est produit.

Le squelette du livre (styles, pages liminaires, annexe des conjugaisons) est
repris du gabarit ODT ; les trois index sont entierement regeneres.

Usage : python scripts/build_dictionary_book.py [sortie.odt]
"""
import html
import json
import os
import re
import sys
import unicodedata
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

from mandombe_typing import to_mandombe  # noqa: E402
from mandombe_graphies import map_text  # noqa: E402
import dictionary_guards as guards  # noqa: E402

TEMPLATE = "/mnt/documents/dictionnaire-lari-v26.odt"
ENTRIES = os.path.join(ROOT, "data", "dictionary-entries.json")
OUT = sys.argv[1] if len(sys.argv) > 1 else \
    "/mnt/documents/Buku-dia-Binsono-dictionnaire-Lari.odt"
REPORT = os.path.join(ROOT, "reports", "dictionnaire-controles.txt")

PARA_RE = re.compile(r'<text:p text:style-name="(\w+)">(.*?)</text:p>', re.S)

ENTRY_TPL = ('<text:p text:style-name="Entry">'
             '<text:span text:style-name="MandT">%s</text:span>   '
             '<text:span text:style-name="LariT">%s</text:span>  '
             '<text:span text:style-name="FrT">%s</text:span>  \u00b7  '
             '<text:span text:style-name="EnT">%s</text:span></text:p>')
NOTE_TPL = ('<text:p text:style-name="EntryNote">'
            '<text:span text:style-name="NoteT">%s</text:span></text:p>')
SMALL_HEAD = '<text:span text:style-name="HeadS">%s</text:span>  \u00b7  '
SMALL_TRAD = '<text:span text:style-name="EnS">%s</text:span>  '
SMALL_PAIR = ('<text:span text:style-name="MandS">%s</text:span> '
              '<text:span text:style-name="LariS">%s</text:span>')

# expressions courtes seulement dans les index II et III
MAX_WORDS_SMALL = 4


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def mand_span(lari):
    """Bloc Mandombe derive du Lari ; les noms propres restent en latin."""
    forms = guards.forms_of(lari)
    out = []
    for f in forms:
        pieces, rest = [], f
        for name in guards.FOREIGN_NAMES:
            if name in rest:
                before, _, after = rest.partition(name)
                pieces.append(esc(to_mandombe(map_text(before))))
                pieces.append('</text:span><text:span text:style-name="FrT">'
                              + esc(name)
                              + '</text:span><text:span text:style-name="MandT">')
                rest = after
        pieces.append(esc(to_mandombe(map_text(rest))))
        out.append("".join(pieces))
    return " \u00b7 ".join(o for o in out if o)


def sort_key(text):
    return (strip_accents(text.lower().lstrip("'\u2019")), text)


def letter_of(text):
    c = strip_accents(text.strip().lstrip("'\u2019")[:1].upper())
    return c if c.isalpha() else "#"


def build_index_i(entries):
    xml = []
    current = None
    for e in sorted(entries, key=lambda x: sort_key(x["lari"])):
        letter = letter_of(e["lari"])
        if letter != current:
            current = letter
            xml.append('<text:p text:style-name="LetterHeadSmall">%s</text:p>'
                       % esc(letter))
        xml.append(ENTRY_TPL % (mand_span(e["lari"]), esc(e["lari"]),
                                esc(e.get("fr", "")), esc(e.get("en", ""))))
        if e.get("note"):
            xml.append(NOTE_TPL % esc(e["note"]))
    return "".join(xml)


def short_enough(lari):
    first = guards.forms_of(lari)[0] if guards.forms_of(lari) else lari
    return len(first.split()) <= MAX_WORDS_SMALL


def segments(gloss):
    return [s.strip() for s in (gloss or "").split(";") if s.strip()]


def build_small_index(entries, head_lang, other_lang):
    """Index II (francais) ou III (anglais), regeneres depuis les memes entrees."""
    buckets = {}
    for e in entries:
        if not short_enough(e["lari"]):
            continue
        for seg in segments(e.get(head_lang)):
            key = strip_accents(seg.lower().rstrip("."))
            if not key:
                continue
            buckets.setdefault(key, {"head": seg, "items": []})
            buckets[key]["items"].append(e)

    xml = []
    current = None
    for key in sorted(buckets, key=sort_key):
        bucket = buckets[key]
        letter = letter_of(bucket["head"])
        if letter != current:
            current = letter
            xml.append('<text:p text:style-name="LetterHeadSmall">%s</text:p>'
                       % esc(letter))
        others, seen = [], set()
        for e in bucket["items"]:
            for seg in segments(e.get(other_lang)):
                k = strip_accents(seg.lower().rstrip("."))
                if k not in seen:
                    seen.add(k)
                    others.append(seg)
        pairs = []
        for e in bucket["items"]:
            pairs.append(SMALL_PAIR % (mand_span(e["lari"]), esc(e["lari"])))
        body = (SMALL_HEAD % esc(bucket["head"])
                + SMALL_TRAD % esc(" ; ".join(others))
                + " ; ".join(pairs))
        xml.append('<text:p text:style-name="EntrySmall">%s</text:p>' % body)
    return "".join(xml)


def replace_section(xml, name, body):
    start = xml.index('<text:section text:name="%s"' % name)
    head_end = xml.index(">", start) + 1
    end = xml.index("</text:section>", start)
    return xml[:head_end] + body + xml[end:]


def main():
    entries = json.load(open(ENTRIES, encoding="utf-8"))
    errors = guards.check(entries)
    guards.report(errors, REPORT)
    if errors:
        print("%d controle(s) en echec \u2014 aucun document produit." % len(errors))
        print("Rapport : %s" % REPORT)
        for line in errors[:20]:
            print("  -", line)
        sys.exit(1)

    live = [e for e in entries if not e.get("pending")]
    held = [e for e in entries if e.get("pending")]

    zin = zipfile.ZipFile(TEMPLATE)
    xml = zin.read("content.xml").decode("utf-8")
    xml = replace_section(xml, "IndexLari", build_index_i(live))
    xml = replace_section(xml, "IndexFR", build_small_index(live, "fr", "en"))
    xml = replace_section(xml, "IndexEN", build_small_index(live, "en", "fr"))

    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "content.xml":
                data = xml.encode("utf-8")
            if item.filename == "mimetype":
                zout.writestr(item, data, zipfile.ZIP_STORED)
            else:
                zout.writestr(item, data)
    zin.close()

    with open(REPORT, "a", encoding="utf-8") as f:
        f.write("\n%d entrees publiees.\n" % len(live))
        if held:
            f.write("\n%d entree(s) en attente de votre arbitrage :\n" % len(held))
            for e in held:
                f.write("  - %s : %s\n" % (e["lari"], e["pending"]))
    print("livre ecrit : %s" % OUT)
    print("%d entrees publiees, %d en attente d'arbitrage" % (len(live), len(held)))


if __name__ == "__main__":
    main()
