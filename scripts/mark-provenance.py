#!/usr/bin/env python3
"""Etiquette chaque entree de data/dictionary-entries.json avec un champ
`provenance` : "autrice" si la forme lari est rattachee a la reference
(data/validated-by-author.txt + validations explicites), "a-confirmer" sinon.

Regenere ensuite reports/formes-a-arbitrer.md avec les seules entrees
"a-confirmer", groupees par serie (meme phrase a un marqueur pres).
Aucune entree n'est supprimee.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

DICT = Path("data/dictionary-entries.json")
REF = Path("data/validated-by-author.txt")
REPORT = Path("reports/formes-a-arbitrer.md")

# Validations explicites de l'autrice (conversations), normalisees.
AUTHOR_EXTRA = [
    "kue ba", "kue ba ka", "kue ba kotela ka", "kue kotela ka",
    "nzo mikanda aku kue ye na", "nzo mikanda andi kue ye na",
    "nzo mikanda awu kue ye na", "nzo mikanda eno kue ye na",
    "ama", "kimfinia", "bimfinia", "kozia", "nkia", "tilapiya",
    "mbira", "jimbakane", "tekela", "humunu", "mumvuka", "mimvuka",
    "muhangu", "mihangu", "nkaka muhangu we nandi",
    "kuya hata dia kanda", "tina", "ntinini", "kela dia mungua",
    "munienge", "djelo", "wa yikiri wa munene",
    "kue ba wa", "kue ba ka wa",
]

SERIES_MARKERS = ("ni", "ka", "tu", "lu", "ba", "aku", "andi", "awu", "eno")


def norm(t: str) -> str:
    t = unicodedata.normalize("NFKD", t)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = t.lower().replace("’", "'")
    t = re.sub(r"[^a-z' ]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def main() -> int:
    ref = norm(REF.read_text("utf-8"))
    ref_words = set(ref.split())
    for extra in AUTHOR_EXTRA:
        ref += " " + norm(extra)
    ref_words.update(norm(e) for e in AUTHOR_EXTRA)

    entries = json.loads(DICT.read_text("utf-8"))
    attested = 0
    for e in entries:
        form = norm(e["lari"])
        words = form.split()
        head = words[0] if words else ""
        if (form and form in ref) or (head and head in ref_words):
            e["provenance"] = "autrice"
            attested += 1
        else:
            e["provenance"] = "a-confirmer"
    DICT.write_text(
        json.dumps(entries, ensure_ascii=False, indent=1) + "\n", "utf-8"
    )
    print(f"{attested} atteste / {len(entries) - attested} a-confirmer "
          f"sur {len(entries)}")

    # Regrouper les a-confirmer par serie (meme squelette a un marqueur pres).
    suspects = [e for e in entries if e["provenance"] == "a-confirmer"]
    groups: dict[tuple, list[dict]] = {}
    for e in suspects:
        words = norm(e["lari"]).split()
        for i, w in enumerate(words):
            if w in SERIES_MARKERS:
                key = tuple(words[:i] + ["*"] + words[i + 1 :])
                groups.setdefault(key, []).append(e)
                break
        else:
            groups.setdefault(("__autres__", e["lari"]), []).append(e)

    lines = [
        "# Formes a arbitrer (provenance : a-confirmer)",
        "",
        "Formes du dictionnaire non rattachees a la reference de l'autrice.",
        "Rien n'est supprime sans arbitrage explicite : valider ou supprimer.",
        "",
    ]
    multi = {k: v for k, v in groups.items() if len(v) > 1}
    lines.append(f"## Series ({len(multi)})")
    lines.append("")
    for key, items in sorted(multi.items(), key=lambda kv: -len(kv[1])):
        lines.append(f"### {' '.join(key)} ({len(items)} formes)")
        for e in items:
            lines.append(f"- {e['lari']} — {e.get('fr', '')}")
        lines.append("")
    singles = [e for k, v in groups.items() if len(v) == 1 for e in v]
    lines.append(f"## Formes isolees ({len(singles)})")
    lines.append("")
    for e in sorted(singles, key=lambda x: x["lari"].lower()):
        lines.append(f"- {e['lari']} — {e.get('fr', '')}")
    REPORT.write_text("\n".join(lines) + "\n", "utf-8")
    print(f"{REPORT} : {len(multi)} series, {len(singles)} formes isolees")
    return 0


if __name__ == "__main__":
    sys.exit(main())
