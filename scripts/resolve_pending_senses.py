#!/usr/bin/env python3
"""Resout les entrees en attente d'arbitrage a partir des sources du site.

Aucune invention : chaque sens vient d'une source Nzo Mikanda existante
(dictionnaire canonique, dictionnaire du site, corpus du traducteur,
corpus des lecons). Le seul travail ajoute est la traduction du sens
atteste vers la langue manquante.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

CANON = os.path.join(ROOT, "data", "dictionary-entries.json")
SITE_DICT = os.path.join(ROOT, "supabase", "functions", "_shared", "dictionary.json")
TRANSLATOR = os.path.join(ROOT, "supabase", "functions", "translate-lari", "index.ts")
REPORT = os.path.join(ROOT, "reports", "arbitrage-sources.txt")


def norm(s):
    s = (s or "").lower().strip()
    s = s.replace("\u00b7", " ")
    s = re.sub(r"[.?!]+$", "", s)
    return re.sub(r"\s+", " ", s).strip()


def load_site_dict():
    out = {}
    for e in json.load(open(SITE_DICT, encoding="utf-8")):
        k = norm(e.get("lari"))
        if k and k not in out:
            out[k] = (e.get("fr") or "", e.get("en") or "")
    return out


def load_translator():
    out = {}
    text = open(TRANSLATOR, encoding="utf-8").read()
    for line in text.splitlines():
        if "=" not in line:
            continue
        left, right = line.split("=", 1)
        k = norm(left)
        fr = right.strip()
        if k and fr and k not in out:
            out[k] = fr
    return out


# Traduction du sens atteste vers la langue manquante.
# Cle = forme normalisee de l'entree ; valeur = (fr, en).
TRANSLATED = {
    "belesa": ("Ce qui rend malade", "What makes you sick"),
    "bembe mabembe": ("Pigeon(s)", "Pigeon(s)"),
    "bikonko bitatu": ("Triangle", "Triangle"),
    "bimoko": ("Discussions (pluriel)", "Discussions (plural)"),
    "bisambanu": ("Six", "Six"),
    "buaku-maku": ("Wagon", "Railway carriage"),
    "bupipilipi": ("Silence", "Silence"),
    "busumbu": ("Danger", "Danger"),
    "buyele": ("Intelligent", "Intelligent"),
    "buzitu": ("Respect", "Respect"),
    "diambu dia kambakana": ("Horizontal.", "Horizontal."),
    "diambu dia shilalala": ("Vertical.", "Vertical."),
    "diela": ("Intelligent", "Intelligent"),
    "funda na nkama nsambuadi na nsambuadi": ("1707.", "1707."),
    "funi": ("Anus", "Anus"),
    "hata mahata": ("Village", "Village"),
    "kalu": ("Train ; bus", "Train ; bus"),
    "kimvuka": ("Association", "Association"),
    "kinkala": ("Kinkala, ville proche de la plaine de Mbamu, au Kongo Mfua.",
                "Kinkala, town near the Mbamu plain, in Kongo Mfua."),
    "kinkuezi": ("Alliance", "Alliance"),
    "sakalale": ("Tu vas mieux ?", "Are you feeling better?"),
}

# Entrees deja publiees ailleurs sous leur forme complete : le doublon vide
# n'est pas publie, il est retire.
DUPLICATES = {
    "ni ta mona": "Ni ta mona. \u00b7 mbo ni mona.",
    "nzololo na suba": "Nzololo na suba. \u00b7 suba nzololo suba.",
}


def main():
    entries = json.load(open(CANON, encoding="utf-8"))
    site = load_site_dict()
    translator = load_translator()

    published = {norm(e.get("lari")) for e in entries if not e.get("pending")}

    lines = []
    kept = []
    resolved = 0
    dropped = 0
    still_pending = []

    for e in entries:
        if not e.get("pending"):
            kept.append(e)
            continue

        key = norm(e.get("lari"))

        if key in DUPLICATES and norm(DUPLICATES[key]) in published:
            dropped += 1
            lines.append("%-45s SUPPRIMEE (deja publiee sous : %s)"
                         % (e["lari"], DUPLICATES[key]))
            continue

        fr = (e.get("fr") or "").strip()
        en = (e.get("en") or "").strip()
        sources = []

        # sens deja arbitre a partir des sources : il prime sur une glose
        # partielle heritee du corpus.
        tfr, ten = TRANSLATED.get(key, ("", ""))
        if tfr:
            fr, en = tfr, ten
            sources.append("sens atteste (sources du site), traduit")

        if not fr or not en:
            if key in site:
                sfr, sen = site[key]
                if not fr and sfr:
                    fr = sfr
                    sources.append("dictionnaire du site")
                if not en and sen:
                    en = sen
                    sources.append("dictionnaire du site (en)")
            if not fr and key in translator:
                fr = translator[key]
                sources.append("corpus du traducteur")

        if fr and en:
            out = {"lari": e["lari"], "fr": fr, "en": en}
            if e.get("note"):
                out["note"] = e["note"]
            kept.append(out)
            resolved += 1
            lines.append("%-45s %s | %s   <- %s"
                         % (e["lari"], fr, en, ", ".join(sources) or "source canonique"))
        else:
            still_pending.append(e["lari"])
            kept.append(e)
            lines.append("%-45s EN ATTENTE (aucune source)" % e["lari"])

    json.dump(kept, open(CANON, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    os.makedirs(os.path.dirname(REPORT), exist_ok=True)
    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("Arbitrage des entrees en attente \u2014 source de chaque sens\n\n")
        f.write("\n".join(lines) + "\n\n")
        f.write("%d resolue(s), %d doublon(s) supprime(s), %d encore en attente.\n"
                % (resolved, dropped, len(still_pending)))

    print("resolues : %d | doublons supprimes : %d | en attente : %d"
          % (resolved, dropped, len(still_pending)))
    if still_pending:
        print("\n".join(" - " + x for x in still_pending))
    return 0


if __name__ == "__main__":
    sys.exit(main())
