#!/usr/bin/env python3
"""Extrait la grille Kilolaka du site vers /tmp/kilolaka.json.

Seule source : public/kilolaka_grille.html. Aucun sens n'est ajoute ici.
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "kilolaka_grille.html")
OUT = "/tmp/kilolaka.json"


def main():
    text = open(SRC, encoding="utf-8").read()
    v = re.search(r"const VOWELS = (\[.*?\]);", text, re.S)
    g = re.search(r"const GROUPS = (\[.*?\n\]);", text, re.S)
    if not (v and g):
        sys.exit("grille introuvable dans %s" % SRC)
    js = "console.log(JSON.stringify({VOWELS: %s, GROUPS: %s}))" % (
        v.group(1), g.group(1))
    data = subprocess.run(["node", "-e", js], capture_output=True, text=True,
                          check=True).stdout
    parsed = json.loads(data)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(parsed, f, ensure_ascii=False)
    print("%s : %d Mvuala, %d Bisimba"
          % (OUT, len(parsed["GROUPS"]), len(parsed["VOWELS"])))


if __name__ == "__main__":
    main()
