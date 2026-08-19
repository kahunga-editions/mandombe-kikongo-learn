#!/usr/bin/env python3
"""Extrait le corpus du dictionnaire v20 corrige a la main.

La v20 relue par l'auteur est la SOURCE DE VERITE : on ne reinjecte rien depuis
l'ancien corpus JSON. On lit l'Index I (paragraphes « Entry ») et l'annexe des
conjugaisons, puis on ecrit un JSON exploitable par build-dictionary-odt-v21.py.

Usage: python scripts/extract-odt-v20.py <source.odt> <out.json> [img_dir]
"""
import json
import os
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

SRC = sys.argv[1]
OUT = sys.argv[2]
IMG_DIR = sys.argv[3] if len(sys.argv) > 3 else None

TEXT = "{urn:oasis:names:tc:opendocument:xmlns:text:1.0}"
DRAW = "{urn:oasis:names:tc:opendocument:xmlns:drawing:1.0}"
XLINK = "{http://www.w3.org/1999/xlink}"

FIELD_STYLES = {"MandT": "mandombe", "LariT": "lari", "FrT": "fr", "EnT": "en",
                "NoteT": "note"}


def para_fields(p):
    """Renvoie le texte par champ, dans l'ordre de lecture.

    Les retouches manuelles ont parfois casse le style d'un fragment
    (span T94 sans parent connu) : ce texte herite du champ courant.
    """
    out = {"mandombe": "", "lari": "", "fr": "", "en": "", "note": ""}
    state = {"cur": None}

    def add(field, txt):
        if not txt:
            return
        if field is None:
            return
        out[field] += txt

    def walk(node, field):
        style = node.get(f"{TEXT}style-name")
        f = FIELD_STYLES.get(style, field)
        if f is not None:
            state["cur"] = f
        f = f if f is not None else state["cur"]
        add(f, node.text or "")
        for child in node:
            if child.tag == f"{TEXT}s":
                add(f, " ")
            elif child.tag in (f"{TEXT}line-break", f"{TEXT}tab"):
                add(f, " ")
            else:
                walk(child, f if child.tag == f"{TEXT}span" else f)
            add(state["cur"], child.tail or "")

    add(None, p.text or "")
    for child in p:
        if child.tag == f"{TEXT}span":
            walk(child, None)
            add(state["cur"], child.tail or "")
        elif child.tag == f"{TEXT}soft-page-break":
            add(state["cur"], child.tail or "")
        else:
            add(state["cur"], (child.text or "") + (child.tail or ""))
    return {k: re.sub(r"\s+", " ", v).strip() for k, v in out.items()}


def is_entry(style):
    return style == "Entry" or (style or "").startswith("P")


def main():
    z = zipfile.ZipFile(SRC)
    root = ET.fromstring(z.read("content.xml"))
    body = root.find(f"{{urn:oasis:names:tc:opendocument:xmlns:office:1.0}}body")
    paras = list(body.iter(f"{TEXT}p"))

    entries, conj = [], []
    section = None
    verb = tense = None
    pending_images = []      # illustrations vues avant la prochaine entree
    letter_images = {}       # lettre -> fichier image
    cover_image = None
    for p in paras:
        style = p.get(f"{TEXT}style-name") or ""
        flat = "".join(p.itertext()).strip()
        img = None
        for im in p.iter(f"{DRAW}image"):
            href = im.get(f"{XLINK}href")
            if href and href.startswith("Pictures/"):
                img = href
        if img:
            if section == "I":
                pending_images.append(img)
            elif cover_image is None:
                cover_image = img
            continue
        if style == "Chapter":
            low = flat.lower()
            if low.startswith("index i —") or low.startswith("index i "):
                section = "I"
            elif low.startswith("index ii") or low.startswith("index iii"):
                section = "other"
            elif "annexe" in low or "conjug" in low:
                section = "conj"
            else:
                section = None
            continue
        if section == "I" and (is_entry(style) or style == "EntryNote"):
            if style == "EntryNote":
                if entries:
                    note = para_fields(p)["note"] or flat
                    entries[-1]["note"] = (
                        (entries[-1].get("note", "") + " ; " + note).strip(" ;"))
                continue
            f = para_fields(p)
            if not f["lari"] and not f["mandombe"]:
                continue
            entry = {
                "mandombe": f["mandombe"],
                "lari": f["lari"] or f["mandombe"],
                "fr": f["fr"],
                "en": f["en"],
                "note": f["note"],
            }
            entries.append(entry)
            if pending_images:
                letter = (entry["lari"][:1] or "#").upper()
                for href in pending_images:
                    letter_images.setdefault(letter, href)
                pending_images = []
        elif section == "conj":
            if style == "ConjVerb":
                verb, tense = flat, None
            elif style == "ConjTense":
                tense = flat
            elif style == "ConjRow":
                f = para_fields(p)
                conj.append({
                    "verb": verb, "tense": tense,
                    "mandombe": f["mandombe"], "lari": f["lari"],
                    "fr": f["fr"], "en": f["en"],
                })

    images = {}
    if IMG_DIR:
        os.makedirs(IMG_DIR, exist_ok=True)

        def dump(href, name):
            path = os.path.join(IMG_DIR, name)
            with open(path, "wb") as fh:
                fh.write(z.read(href))
            return path

        for letter, href in letter_images.items():
            images[letter] = dump(href, f"{letter}.png")
        if cover_image:
            images["cover_page"] = dump(cover_image, "cover_page.png")

    json.dump({"entries": entries, "conj": conj, "images": images},
              open(OUT, "w"), ensure_ascii=False)
    print(f"entries={len(entries)} conj={len(conj)} images={len(images)}")


main()

