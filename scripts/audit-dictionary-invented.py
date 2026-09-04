# -*- coding: utf-8 -*-
"""Liste, dans la derniere version du dictionnaire uniquement, les series de
formes identiques a un seul marqueur pres (signature d'une derivation par
analogie). Rien n'est supprime."""
import json, re, collections, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
entries = json.load(open(ROOT / "data" / "dictionary-entries.json", encoding="utf-8"))

MARKERS = {"ni","u","wa","ka","tu","lu","ba","i","ya","mu","ki","bi","di","ma","aku","andi","awu","eno","ame","ani","na","ye","ze"}

series = collections.defaultdict(list)
for e in entries:
    lari = e.get("lari","").strip()
    toks = re.findall(r"[\w'’]+|[^\s\w]", lari)
    words = [t for t in toks if re.match(r"[\w'’]", t)]
    for i, w in enumerate(words):
        if w.lower() in MARKERS:
            key = " ".join(words[:i] + ["…"] + words[i+1:]).lower()
            if len(key.replace("…","").strip()) >= 3:
                series[key].append((lari, e.get("fr",""), e.get("en","")))

blocks = [(k, v) for k, v in series.items() if len({x[0].lower() for x in v}) >= 3]
blocks.sort(key=lambda kv: (-len(kv[1]), kv[0]))

out = ["# Formes a arbitrer — dictionnaire seul (derniere version)","",
       f"Source : data/dictionary-entries.json ({len(entries)} entrees).","",
       "Chaque bloc = des formes identiques a un seul marqueur pres. En general une seule vient du corpus, les autres ont ete derivees par analogie.","",
       f"{len(blocks)} series detectees.",""]
for key, items in blocks:
    out.append(f"## {key}  ({len(items)} formes)")
    out.append("")
    for lari, fr, en in sorted(set(items)):
        out.append(f"- **{lari}** — {fr or '(sans sens)'}")
    out.append("")
(ROOT / "reports" / "dictionnaire-formes-a-arbitrer.md").write_text("\n".join(out), encoding="utf-8")
print(len(blocks), "series")
