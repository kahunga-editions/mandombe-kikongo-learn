#!/usr/bin/env python3
"""Audit des formes Lari susceptibles d'avoir ete fabriquees par analogie.

Le projet n'a pas de fichier de corpus independant : la source du site est
src/data/lessons.ts et data/dictionary-entries.json. On ne peut donc pas
prouver l'attestation automatiquement. Ce script signale le MECANISME fautif :
des series de formes identiques a un seul marqueur pres (personne, possessif,
classe), qui sont la signature d'une conjugaison faite par analogie.

Sortie : reports/formes-a-arbitrer.md — a arbitrer par l'autrice, rien n'est
supprime automatiquement.
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LESSONS = ROOT / "src" / "data" / "lessons.ts"
DICT = ROOT / "data" / "dictionary-entries.json"
OUT = ROOT / "reports" / "formes-a-arbitrer.md"

# Marqueurs de personne / possessif / classe : c'est sur eux que porte
# la derivation par analogie.
SLOTS = {
    "ni", "u", "ka", "tu", "lu", "ba", "wa", "ye", "yi",
    "aku", "ani", "andi", "awu", "eno", "ame", "beto", "bawu",
}

ITEM_RE = re.compile(
    r'\{\s*(?:[a-zA-Z]+:\s*"[^"]*",\s*)*?lari:\s*"([^"]+)"[^}]*?french:\s*"([^"]*)"',
)
LARI_RE = re.compile(r'lari:\s*"([^"]+)"')
FRENCH_RE = re.compile(r'french:\s*"([^"]*)"')


def read_lessons() -> list[tuple[int, str, str]]:
    rows: list[tuple[int, str, str]] = []
    for n, line in enumerate(LESSONS.read_text(encoding="utf-8").split("\n"), 1):
        m = LARI_RE.search(line)
        if not m:
            continue
        f = FRENCH_RE.search(line)
        rows.append((n, m.group(1).strip(), f.group(1).strip() if f else ""))
    return rows


def skeleton(form: str) -> tuple[str, str] | None:
    """Remplace un unique marqueur par un trou. Renvoie (squelette, marqueur)."""
    words = form.split()
    if len(words) < 2:
        return None
    hits = [i for i, w in enumerate(words) if w.strip("?.,!").lower() in SLOTS]
    if len(hits) != 1:
        return None
    i = hits[0]
    marker = words[i]
    skel = " ".join(words[:i] + ["_"] + words[i + 1:])
    return skel.lower(), marker


def main() -> None:
    lessons_rows = read_lessons()
    dict_rows = [(e["lari"].strip(), e.get("fr", "")) for e in json.loads(DICT.read_text(encoding="utf-8"))]

    groups: dict[str, list[tuple[str, str, str]]] = defaultdict(list)
    where: dict[str, list[str]] = defaultdict(list)

    for n, lari, fr in lessons_rows:
        s = skeleton(lari)
        if s:
            groups[s[0]].append((lari, s[1], fr))
            where[lari].append(f"lessons.ts:{n}")
    for lari, fr in dict_rows:
        s = skeleton(lari)
        if s:
            groups[s[0]].append((lari, s[1], fr))
            where[lari].append("dictionnaire")

    series = []
    for skel, items in groups.items():
        uniq: dict[str, tuple[str, str]] = {}
        for lari, marker, fr in items:
            uniq.setdefault(lari, (marker, fr))
        if len(uniq) >= 3:
            series.append((skel, uniq))
    series.sort(key=lambda x: (-len(x[1]), x[0]))

    lines = [
        "# Formes a arbitrer — series construites par analogie",
        "",
        "Chaque bloc regroupe des formes identiques a un seul marqueur pres "
        "(personne, possessif, classe). C'est la signature d'une conjugaison "
        "faite par analogie : dans une serie, en general une seule forme vient "
        "du corpus, les autres ont ete derivees.",
        "",
        "Rien n'est supprime : indiquez pour chaque forme si elle est juste ou "
        "a retirer.",
        "",
        f"{len(series)} series detectees.",
        "",
    ]
    for skel, uniq in series:
        lines.append(f"## {skel.replace('_', '…')}  ({len(uniq)} formes)")
        lines.append("")
        for lari, (marker, fr) in sorted(uniq.items()):
            loc = ", ".join(sorted(set(where[lari])))
            lines.append(f"- **{lari}** — {fr or '(sans sens)'}  · {loc}")
        lines.append("")

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"{OUT.relative_to(ROOT)} : {len(series)} series")


if __name__ == "__main__":
    main()
