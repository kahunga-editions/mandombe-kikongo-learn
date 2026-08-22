#!/usr/bin/env python3
"""Graphies Mandombe validees une par une par l'auteur (table fermee).

Le mot Mandombe est le mot Lari : seules les suites que la police ne compose
pas recoivent la graphie donnee par l'auteur, avec note de prononciation.
Aucune substitution nouvelle n'est inventee ici.
"""
import re

WORD_MAP = {
    "ndjokele": "nzokele",
    "ndje": "ngie",
    "ntshila": "N'kila",
    "n'lemvo": "nlemvo",
    "nlemvo": "nlemvo",
    "nkia": "nkiya",
    "ntshia": "nkiya",
    "ntshiya": "nkiya",
    "b.awu": "bawu",
    "mzansi": "nzansi",
    "pfuka": "fuka",
    "n'zansi": "nzansi",
    "bendji": "benzi",
    "benji": "benzi",
    "mbendji": "mbenzi",
    "mbenji": "mbenzi",
    "m'vu": "muvu",
    # arbitrage auteur : ndz de mundzula se tape nz (note de prononciation)
    "mundzula": "munzula",
    "mindzula": "minzula",
    "mundjula": "munzula",
    "mindjula": "minzula",
}


SEQ_RULES = [
    (r"ntsh", "nk"),
    (r"nthsi", "nki"),
    (r"nts(?!h)", "ns"),
    (r"ndj", "nd\u0001"),      # protege le z de ndz avant la regle dz -> dj
    (r"nj", "nz"),
    (r"dz", "dj"),
    (r"\u0001", "z"),
    (r"(?<!n)ts(?!h)", "ns"),
    (r"lw", "lu"),
    (r"fw", "fu"),
    (r"nf", "mf"),
    (r"pf", "f"),
    (r"mz", "nz"),
    (r"vv", "v"),
    (r"\bth", "t"),
]

WORD_RE = re.compile(r"[A-Za-z\u00c0-\u017f'\u2019.]+")


def map_word(w: str) -> str:
    core_w = w.strip(".,;:!?")
    tail = w[len(core_w):] if core_w else ""
    if core_w != w:
        return map_word(core_w) + tail
    low = w.lower()
    if low in WORD_MAP:
        out = WORD_MAP[low]
        return out if not w[:1].isupper() else out[0].upper() + out[1:]
    core = low
    for a, b in SEQ_RULES:
        core = re.sub(a, b, core)
    if core == low:
        return w
    return core[0].upper() + core[1:] if w[:1].isupper() else core


def map_text(text: str) -> str:
    return WORD_RE.sub(lambda m: map_word(m.group(0)), text)
