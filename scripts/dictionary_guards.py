#!/usr/bin/env python3
"""Controles bloquants du dictionnaire papier.

Si un controle echoue, aucun document n'est produit : l'auteur recoit un
rapport, pas une version de plus.
"""
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from mandombe_typing import to_mandombe, latin_residue  # noqa: E402
from mandombe_graphies import map_text  # noqa: E402

# consignes de saisie qui ne doivent jamais s'imprimer
EDITORIAL = re.compile(
    r"\(?\b(?:en\s+)?(?:deux|2)\s+mots\b\.?"
    r"|\(?\ben\s+un\s+seul\s+mot\b\.?"
    r"|\(?\b(?:sans|avec)\s+espace\b\.?"
    r"|\btwo\s+words\b\.?"
    r"|\bone\s+word\b\.?",
    re.I)

# mot latin porteur d'un point interne : Bawu ecrit B.awu
INNER_DOT = re.compile(r"\b[A-Za-zÀ-ÿ]\.[A-Za-zÀ-ÿ]{2,}")

# noms propres etrangers composes en latin, arbitrage deja rendu par l'auteur
FOREIGN_NAMES = ["St Pierre"]

# couples que l'auteur a explicitement separes : ils ne doivent jamais fusionner
SEPARATE_SENSES = [
    ("Ba", ("être", "exister"), ("palmier", "palm tree")),
    ("Mbote", ("bonjour", "hello"), ()),
]


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def forms_of(lari):
    """Formes d'une entree : separateur mediane ou barre de pluriel.

    La virgule n'est pas un separateur : une phrase a virgule reste une phrase.
    """
    parts = []
    for chunk in re.split(r"[\u00b7|]", lari or ""):
        chunk = chunk.strip()
        if chunk:
            parts.append(chunk)
    return parts


def mandombe_of(lari):
    """Le Mandombe est toujours derive du Lari, jamais stocke a part."""
    return " \u00b7 ".join(to_mandombe(map_text(f)) for f in forms_of(lari))


def check(entries):
    """Renvoie la liste des erreurs bloquantes."""
    errors = []

    for e in entries:
        if e.get("pending"):
            continue
        lari = e.get("lari", "")

        # 1. aucune consigne de travail dans le texte publie
        for field in ("fr", "en", "note"):
            if EDITORIAL.search(e.get(field) or ""):
                errors.append("note de travail imprimee : %s -> %s"
                              % (lari, e[field]))

        # 2. aucun mot latin avec point interne
        if INNER_DOT.search(lari):
            errors.append("point interne dans le Lari : %s" % lari)

        # 2 bis. aucune entree ne commence par un signe de ponctuation
        if lari[:1] and not (lari[:1].isalpha() or lari[:1] in "'\u2019"):
            errors.append("ponctuation initiale dans le Lari : %s" % lari)


        # 3. chaque forme se compose entierement en Mandombe
        for form in forms_of(lari):
            probe = form
            for name in FOREIGN_NAMES:
                probe = probe.replace(name, "")
            res = latin_residue(to_mandombe(map_text(probe)))
            if res:
                errors.append("residu latin dans le Mandombe : %s -> %s (%s)"
                              % (lari, form, res))

        # 4. une entree doit porter un sens
        if not (e.get("fr") or "").strip():
            errors.append("entree sans sens francais : %s" % lari)

        # 6. chaque entree porte une provenance connue ; toute nouvelle
        # entree doit etre rattachee a l'autrice (scripts/mark-provenance.py)
        if e.get("provenance") not in ("autrice", "a-confirmer"):
            errors.append("provenance manquante : %s" % lari)

    # 5. les sens que l'auteur a separes ne se retrouvent pas ensemble
    for head, must_have, must_not in SEPARATE_SENSES:
        for e in entries:
            if strip_accents(e.get("lari", "").lower()) != strip_accents(head.lower()):
                continue
            glosses = strip_accents(
                ((e.get("fr") or "") + " " + (e.get("en") or "")).lower())
            if must_have and not any(strip_accents(w) in glosses for w in must_have):
                continue
            for bad in must_not:
                if strip_accents(bad) in glosses:
                    errors.append(
                        "sens d'un homographe distinct dans %s : '%s' "
                        "(entree separee attendue)" % (head, bad))

    return errors


def report(errors, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        if not errors:
            f.write("Tous les controles passent.\n")
        else:
            f.write("%d controle(s) en echec \u2014 aucun document produit.\n\n"
                    % len(errors))
            f.write("\n".join(errors) + "\n")
    return path
