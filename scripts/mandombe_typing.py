#!/usr/bin/env python3
"""Saisie Mandombe : le champ Mandombe est le MOT LARI, tape tel quel.

Aucune substitution de son. Seules les regles de saisie validees une par une
par l'auteur sont appliquees. Tout le reste est laisse intact ; si la police ne
sait pas composer une suite, on la signale au lieu de l'inventer.
"""
import re
import unicodedata

import uharfbuzz as hb
from fontTools.ttLib import TTFont

FONT_PATH = "/dev-server/public/fonts/masono_mandombe-webfont.ttf"
_font = hb.Font(hb.Face(hb.Blob.from_file_path(FONT_PATH)))
_names = TTFont(FONT_PATH).getGlyphOrder()

TERMINAL = ".?!"


def shape_names(text: str):
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(_font, buf)
    return [_names[i.codepoint] for i in buf.glyph_infos]


def latin_residue(text: str):
    return [n for n in shape_names(text) if not n.startswith("_")]


def strip_accents(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def to_mandombe(lari: str) -> str:
    """Tape le mot Lari en Mandombe (cas de saisie valides uniquement)."""
    s = strip_accents(lari or "")
    s = s.replace("\u2019", "'")            # apostrophe typographique -> droite
    s = re.sub(r"\([^)]*\)", " ", s)         # les parentheses ne se composent pas
    # separateurs de variantes et ponctuation interne : espace
    s = re.sub(r"[\u00b7\u2013\u2014/|;:\"\u00ab\u00bb]", " ", s)
    # apostrophe conservee uniquement dans N' + consonne (ntentia)
    s = re.sub(r"([Nn])'(?=[A-Za-z])", "N'", s)
    s = re.sub(r"(?<![Nn])'", " ", s)
    # cas de saisie valides
    s = re.sub(r"([Tt])shio", lambda m: ("K" if m.group(1) == "T" else "k") + "io", s)
    s = re.sub(r"([Tt])shie", lambda m: ("K" if m.group(1) == "T" else "k") + "ie", s)
    s = re.sub(r"\bPaul\b", "Paulo", s)
    # « ia » final se tape tel quel : seul « tilapia » recoit la graphie « iya »
    # (cas nomme donne par l'auteur, car la suite ne se compose pas)
    s = re.sub(r"(?i)\btilapia\b", lambda m: m.group(0)[:-1] + "ya", s)
    s = re.sub(r"([BCDFGJKLMNPQRSTVWXZbcdfgjklmnpqrstvwxz])[yY]", r"\1i", s)
    s = re.sub(r"([AaEeIiOoUu])\1+", r"\1", s)              # jamais deux voyelles identiques
    s = re.sub(r"[^A-Za-z'.?!, ]+", " ", s)
    s = re.sub(r"\s+([.?!,])", r"\1", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s
