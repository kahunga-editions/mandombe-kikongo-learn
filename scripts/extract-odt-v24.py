#!/usr/bin/env python3
"""Extrait le corpus depuis l'ODT v20 CORRIGE A LA MAIN par l'auteur.

Difference avec extract-odt-v20.py :
  - verification SHA-256 de la source (on ne peut plus confondre le fichier
    corrige par l'auteur et le fichier genere automatiquement, qui portent le
    meme nom) ;
  - nettoyage des separateurs residuels laisses par les retouches manuelles
    (« Trois · », « La nuit derniere ; ») ;
  - normalisation du signe terminal Mandombe (« ?. » -> « ? »).

Usage:
  python scripts/extract-odt-v24.py <source.odt> <out.json> [img_dir]
  SKIP_SHA=1 pour outrepasser la verification (deconseille).
"""
import hashlib
import json
import os
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

SRC = sys.argv[1]
OUT = sys.argv[2]
IMG_DIR = sys.argv[3] if len(sys.argv) > 3 else None

# Empreinte de l'ODT v20 relu et corrige par l'auteur (source de verite v24).
EXPECTED_SHA = "c196934f475cced137d0a9ee20e36b3c260f237db91521952455a7de296ba752"

TEXT = "{urn:oasis:names:tc:opendocument:xmlns:text:1.0}"
DRAW = "{urn:oasis:names:tc:opendocument:xmlns:drawing:1.0}"
XLINK = "{http://www.w3.org/1999/xlink}"

FIELD_STYLES = {"MandT": "mandombe", "LariT": "lari", "FrT": "fr", "EnT": "en",
                "NoteT": "note"}


def check_source():
    h = hashlib.sha256(open(SRC, "rb").read()).hexdigest()
    if h != EXPECTED_SHA and not os.environ.get("SKIP_SHA"):
        raise SystemExit(
            f"SOURCE REFUSEE : {SRC}\n  sha256 lu     = {h}\n"
            f"  sha256 attendu = {EXPECTED_SHA}\n"
            "  -> ce n'est pas l'ODT corrige a la main par l'auteur.")
    return h


def para_fields(p):
    out = {"mandombe": "", "lari": "", "fr": "", "en": "", "note": ""}
    state = {"cur": None}

    def add(field, txt):
        if txt and field is not None:
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
                walk(child, f)
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
    return {k: re.sub(r"\s+", " ", v.replace("\xa0", " ")).strip()
            for k, v in out.items()}


def clean_gloss(s: str) -> str:
    """Retire les separateurs de mise en page restes colles a la glose."""
    s = (s or "").strip()
    s = re.sub(r"\s*[·|]\s*$", "", s)          # « Trois · »
    s = re.sub(r"^\s*[·|]\s*", "", s)
    s = re.sub(r"\s*;\s*$", "", s)             # « La nuit derniere ; »
    s = re.sub(r"\s*;\s*(?=;)", "", s)
    s = re.sub(r"\(\s+", "(", s)
    s = re.sub(r"\s+\)", ")", s)
    return s.strip()


def clean_mandombe_src(s: str) -> str:
    """Normalise le signe terminal : « ?. » -> « ? », « .. » -> « . »."""
    s = (s or "").strip()
    s = re.sub(r"\s*[·|]\s*$", "", s)
    m = re.search(r"([.?!\u2026]+)\s*$", s)
    if m:
        signs = m.group(1)
        term = "?" if "?" in signs else "."
        s = s[: m.start()].rstrip() + term
    return s.strip()


def is_entry(style):
    return style == "Entry" or (style or "").startswith("P")


def main():
    sha = check_source()
    z = zipfile.ZipFile(SRC)
    root = ET.fromstring(z.read("content.xml"))
    body = root.find(f"{{urn:oasis:names:tc:opendocument:xmlns:office:1.0}}body")
    paras = list(body.iter(f"{TEXT}p"))

    entries, conj = [], []
    section = None
    verb = tense = None
    pending_images = []
    letter_images = {}
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
                    note = clean_gloss(para_fields(p)["note"] or flat)
                    entries[-1]["note"] = (
                        (entries[-1].get("note", "") + " ; " + note).strip(" ;"))
                continue
            f = para_fields(p)
            if not f["lari"] and not f["mandombe"]:
                continue
            entry = {
                "mandombe": clean_mandombe_src(f["mandombe"]),
                "lari": clean_gloss(f["lari"]) or clean_mandombe_src(f["mandombe"]),
                "fr": clean_gloss(f["fr"]),
                "en": clean_gloss(f["en"]),
                "note": clean_gloss(f["note"]),
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
                    "mandombe": clean_mandombe_src(f["mandombe"]),
                    "lari": clean_gloss(f["lari"]),
                    "fr": clean_gloss(f["fr"]), "en": clean_gloss(f["en"]),
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

    json.dump({"source": SRC, "sha256": sha, "entries": entries, "conj": conj,
               "images": images}, open(OUT, "w"), ensure_ascii=False)
    print(f"source={SRC}\nsha256={sha}\n"
          f"entries={len(entries)} conj={len(conj)} images={len(images)}")


main()
