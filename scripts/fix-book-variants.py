#!/usr/bin/env python3
"""Applique les memes regles de variantes au livre (ODT) et regenere le PDF KDP.

Patch le content.xml de l'ODT en place (les illustrations ajoutees par l'auteur
sont donc preservees), puis reconvertit en PDF via LibreOffice headless.

Usage: python3 scripts/fix-book-variants.py [--check]
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RULES = json.load(open(os.path.join(ROOT, "scripts/lari-variant-rules.json")))
ODT = "/mnt/documents/Buku-dia-Binsono-dictionnaire-Lari.odt"
PDF = "/mnt/documents/Buku-dia-Binsono-KDP-6x9.pdf"
CHECK = "--check" in sys.argv


def loose(phrase: str) -> re.Pattern:
    body = re.escape(phrase).replace("'", "['\u2019]").replace("\\ ", r"\s+")
    return re.compile(body + r"\.?", re.IGNORECASE)


def apply_rules(xml: str):
    hits = []
    for rule in RULES["phraseRules"]:
        lari_re = re.compile(re.escape(rule["lari"]).replace("\\ ", r"\s+"), re.IGNORECASE)
        # Le contenu ODT est paragraphe par paragraphe : on traite chaque <text:p>
        def fix_par(m):
            par = m.group(0)
            if not lari_re.search(par):
                return par
            for lang, variants in rule["wrong"].items():
                good = rule["correct"].get(lang)
                if not good:
                    continue
                for bad in variants:
                    pat = loose(bad)
                    if pat.search(par):
                        par = pat.sub(
                            lambda mm: good + ("." if mm.group(0).rstrip().endswith(".") else ""),
                            par,
                        )
                        hits.append(f"[{rule['id']}] {lang}: {bad} -> {good}")
            return par

        xml = re.sub(r"<text:p\b.*?</text:p>", fix_par, xml, flags=re.DOTALL)

    for rule in RULES["textRules"]:
        if rule.get("reportOnly") or rule.get("replacement") is None:
            found = re.findall(rule["pattern"], xml, re.IGNORECASE)
            if found:
                hits.append(f"⚠ [{rule['id']}] {len(found)} occurrence(s) à vérifier")
            continue
        flags = re.IGNORECASE if "i" in (rule.get("flags") or "") else 0
        new, n = re.subn(rule["pattern"], rule["replacement"].replace("$1", r"\1"), xml, flags=flags)
        if n:
            hits.append(f"[{rule['id']}] {n} remplacement(s)")
            xml = new
    return xml, hits


def main():
    if not os.path.exists(ODT):
        print(f"ODT introuvable : {ODT} — rien à faire.")
        return 0

    with zipfile.ZipFile(ODT) as z:
        names = z.namelist()
        blobs = {n: z.read(n) for n in names}

    xml = blobs["content.xml"].decode("utf-8")
    new_xml, hits = apply_rules(xml)
    for h in hits:
        print("  " + h)

    if new_xml == xml:
        print("ODT : aucune variante à corriger.")
        return 0
    if CHECK:
        print("ODT : corrections détectées (mode --check, rien écrit).")
        return 1

    blobs["content.xml"] = new_xml.encode("utf-8")
    tmp = ODT + ".tmp"
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        # 'mimetype' doit rester en premier et non compresse
        if "mimetype" in blobs:
            z.writestr(zipfile.ZipInfo("mimetype"), blobs["mimetype"], zipfile.ZIP_STORED)
        for n in names:
            if n == "mimetype":
                continue
            z.writestr(n, blobs[n])
    shutil.move(tmp, ODT)
    print(f"✎ ODT mis à jour : {ODT}")

    outdir = tempfile.mkdtemp()
    r = subprocess.run(
        ["soffice", "--headless", "--convert-to", "pdf", "--outdir", outdir, ODT],
        capture_output=True, text=True,
    )
    produced = os.path.join(outdir, os.path.splitext(os.path.basename(ODT))[0] + ".pdf")
    if r.returncode != 0 or not os.path.exists(produced):
        print("⚠ Conversion PDF échouée :", r.stdout, r.stderr)
        return 1
    shutil.move(produced, PDF)
    print(f"✎ PDF régénéré : {PDF}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
