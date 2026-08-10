#!/usr/bin/env python3
"""Regles de nettoyage partagees par les generateurs du dictionnaire papier.

Utilise par build-dictionary-odt-v19.py (trilingue) et par la version coreenne,
pour que les deux livres recoivent exactement le meme traitement.
"""
import re
import unicodedata
from collections import Counter

SENTENCE_END = ".!?\u2026"

# Noms propres qui gardent leur majuscule au milieu d'une entree Lari.
PROPER_NOUNS = {
    "nsayi", "sunda", "kongo", "boko", "mbamu", "mbamou", "brazzaville", "kinshasa",
    "lari", "laadi", "kikongo", "mandombe", "nzo", "mikanda", "wabeladio", "payi",
    "bandundu", "ngola", "banzambi", "mahama", "ndombi", "akua", "andasa", "banja",
    "bakongo", "bashimba", "basimba", "banzuzi", "kuya", "mikuri", "mfua", "kilolaka",
    "matondo", "mbuta", "janvier", "fevrier",
}

ARTICLE_RE = re.compile(r"^(the|a|an)\s+", re.I)


def norm(s: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", (s or "").lower())
        if unicodedata.category(c) != "Mn"
    ).strip()


def dedup_key(lari: str) -> str:
    """Cle de fusion : casse, accents, ponctuation finale et espaces ignores."""
    k = norm(lari)
    k = re.sub(r"[\u00b7|/]", " ", k)
    k = re.sub(r"[^a-z0-9 ]+", " ", k)
    return re.sub(r"\s+", " ", k).strip()


def fix_separators(text: str) -> str:
    """Plus aucun pipe residuel : uniquement le point median."""
    t = (text or "").replace("|", " \u00b7 ")
    t = re.sub(r"\s*\u00b7\s*", " \u00b7 ", t)
    return re.sub(r"\s+", " ", t).strip(" \u00b7").strip()


def fix_punctuation(text: str, english: bool = False) -> str:
    """Pas de point double, pas d'espace avant ?/! en anglais, espaces propres."""
    t = (text or "").strip()
    if not t:
        return ""
    t = re.sub(r"\s+", " ", t)
    t = re.sub(r"\.{2,}", ".", t)
    t = re.sub(r"\s+([,;:.!?])", r"\1" if english else r"\1", t) if english else t
    if english:
        t = re.sub(r"\s+([?!;:])", r"\1", t)
    t = re.sub(r"([.!?])\s*\.", r"\1", t)
    return t.strip()


def strip_article_en(text: str, is_sentence: bool) -> str:
    """« the jaw » -> « jaw ». L'article reste dans une vraie phrase."""
    if not text or is_sentence:
        return text
    out = []
    for part in re.split(r"\s*;\s*", text):
        part = part.strip()
        if not part:
            continue
        if len(part.split()) <= 4 and part[-1:] not in SENTENCE_END:
            part = ARTICLE_RE.sub("", part)
        out.append(part)
    return " ; ".join(out)


def fix_case(lari: str) -> str:
    """« Bakala Di Moshi » -> « Bakala di moshi » (hors noms propres)."""
    words = (lari or "").split()
    if not words:
        return lari
    out = [words[0]]
    for w in words[1:]:
        core = re.sub(r"[^\w'-]", "", w).lower()
        if w[:1].isupper() and core not in PROPER_NOUNS and not w.isupper():
            w = w[0].lower() + w[1:]
        out.append(w)
    return " ".join(out)


def clean_record(rec: dict, report: Counter) -> dict:
    """Applique toutes les passes a une entree deja fusionnee."""
    before = (rec.get("lari", ""), rec.get("fr", ""), rec.get("en", ""))

    lari = fix_case(fix_separators(rec.get("lari", "")))
    fr = fix_punctuation(fix_separators(rec.get("fr", "")))
    en = fix_punctuation(fix_separators(rec.get("en", "")), english=True)
    note = fix_punctuation(fix_separators(rec.get("note", "")))

    sentence = len(lari.split()) >= 3 or lari.rstrip()[-1:] in "!?"
    en = strip_article_en(en, sentence)

    if before[0] != lari:
        report["casse/separateurs (lari)"] += 1
    if before[1] != fr:
        report["ponctuation (fr)"] += 1
    if before[2] != en:
        report["article/ponctuation (en)"] += 1

    rec["lari"], rec["fr"], rec["en"], rec["note"] = lari, fr, en, note
    if not en:
        report["anglais manquant"] += 1
    if not fr:
        report["francais manquant"] += 1
    return rec


def write_report(path: str, report: Counter, total: int, missing_en: list) -> None:
    lines = [f"Nettoyage du corpus du livre — {total} entrees", ""]
    for k, v in sorted(report.items(), key=lambda x: -x[1]):
        lines.append(f"  {v:>6}  {k}")
    lines += ["", f"Entrees sans anglais apres nettoyage : {len(missing_en)}"]
    lines += [f"  - {x}" for x in missing_en[:200]]
    with open(path, "w") as fh:
        fh.write("\n".join(lines) + "\n")


EN_MARKERS = re.compile(
    r"\b(the|they|they've|i|i'm|you|we|he|she|it|is|are|was|were|have|has|been|"
    r"don't|doesn't|didn't|let|come|here|there|their|them|my|your|our|what|whose|"
    r"how|when|will|would|to be|of|and|yesterday|brought|eaten|looked|taught|"
    r"thinking|repeat|name)\b", re.I)
FR_MARKERS = re.compile(
    r"\b(le|la|les|un|une|des|du|de|au|aux|il|elle|ils|elles|je|tu|nous|vous|"
    r"est|sont|était|avoir|être|qui|que|quoi|pour|dans|avec|mon|ma|mes|ton|leur|"
    r"ne|pas|plus|chez|sur)\b", re.I)


def looks_english(text: str) -> bool:
    """Detecte une glose anglaise placee par erreur dans le champ francais."""
    t = (text or "").strip()
    if not t or len(t.split()) < 2:
        return False
    if FR_MARKERS.search(t):
        return False
    return bool(EN_MARKERS.search(t))
