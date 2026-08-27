#!/usr/bin/env python3
"""Dictionnaire v30 = v29 + annexe Kilolaka bilingue FR/EN.

Chaque ligne porte un Mazita complet (Mvuala + Kisimba), jamais une Mvuala
seule, dans l'ordre canonique du Kilolaka : i, u, e, o, a, puis les
Nkoma-nkoma attestes par la grille.
"""
import json
import re
import shutil
import sys
import zipfile
from xml.sax.saxutils import escape

sys.path.insert(0, "/dev-server/scripts")
from mandombe_typing import to_mandombe, latin_residue  # noqa: E402

SRC = "/mnt/documents/dictionnaire-lari-v29.odt"
OUT = "/mnt/documents/dictionnaire-lari-v30.odt"
GRID = "/tmp/kilolaka.json"

CANON = ["i", "u", "e", "o", "a"]
NKOMA = ["ie", "io", "ia", "iu", "ue", "ui", "ua"]

# Familles Mandombe : aucune Mvuala n'est inventee, seules celles de la grille.
FAMILIES = [
    ("Mazita du premier groupe \u2014 Mvuala za mpamba, cles du premier temps",
     "Mazita of the first group \u2014 Mvuala za mpamba, keys of the first time",
     ["B", "D", "G", "F"]),
    ("Mazita du deuxieme groupe \u2014 cles du deuxieme temps, angle 45\u00b0",
     "Mazita of the second group \u2014 keys of the second time, 45\u00b0 angle",
     ["M", "K", "P", "L"]),
    ("Mazita du troisieme groupe \u2014 cles du troisieme temps, angle 90\u00b0",
     "Mazita of the third group \u2014 keys of the third time, 90\u00b0 angle",
     ["V", "N", "T", "S"]),
    ("Mazita du quatrieme groupe \u2014 cles du quatrieme temps, angle 135\u00b0",
     "Mazita of the fourth group \u2014 keys of the fourth time, 135\u00b0 angle",
     ["R", "W", "Z", "Y"]),
    ("Mvuala za Kimbangu \u2014 groupes consonantiques",
     "Mvuala za Kimbangu \u2014 consonant groups",
     ["MB", "MF", "MP", "MV", "MW", "ND", "NG", "NK", "NL", "NS", "NT", "NY", "NZ"]),
    ("Mazita ma mazindinga \u2014 caracteres migratoires",
     "Mazita ma mazindinga \u2014 migratory characters",
     ["SH", "TSH", "J", "DJ"]),
    ("Ntentia \u2014 l'apostrophe",
     "Ntentia \u2014 the apostrophe",
     ["N'K"]),
]

ROOT_EN = {
    "B": "being",
    "D": "light",
    "F": "life after this death",
    "G": "generative principle",
    "MB": "fire / multiplication of being",
    "MF": "multiplication of the second death",
    "ND": "speed of light",
    "NG": "sun / single multiversal consciousness",
    "N": "multiversal consciousness",
    "S": "work",
    "V": "possession",
    "T": "speech",
    "NT": "speech of the multiversal consciousness",
    "NS": "dimension",
    "MV": "multiplication of possession",
    "K": "energy, particle",
    "L": "deep knowledge",
    "M": "multiplication",
    "P": "gift",
    "MP": "gift (multiplied)",
    "NK": "multiversal consciousness (energy)",
    "NL": "multiversal consciousness of deep knowledge",
    "N'K": "multiversal consciousness of energy",
    "W": "spiralled energy",
    "R": "sun",
    "Z": "dynamic knowledge",
    "Y": "fire",
    "NY": "multiversal consciousness of fire",
    "NZ": "multiversal consciousness of dynamic knowledge",
    "MW": "multiplication of the spiral principle",
    "SH": "ante-energy of work",
    "DJ": "ante-energy of light and of knowledge",
    "TSH": "ante-energy",
    "J": "ante-energy of dynamic knowledge",
}

MOD_EN = {
    "i": "inner",
    "u": "life-bearing",
    "e": "receiving",
    "o": "ascending",
    "a": "manifested",
    "ie": "inner and receiving",
    "io": "inner and ascending",
    "ia": "inner and manifested",
    "iu": "inner and engendering",
    "ue": "engendering and receiving",
    "ui": "engendering and internalising",
    "ua": "engendering and manifesting",
}

MOD_FR = {
    "i": "int\u00e9rieur(e)",
    "u": "qui porte vie",
    "e": "qui re\u00e7oit",
    "o": "ascensionnel(le)",
    "a": "manifest\u00e9(e)",
    "ie": "int\u00e9rieur(e) qui re\u00e7oit",
    "io": "int\u00e9rieur(e) qui ascensionne",
    "ia": "int\u00e9rieur(e) manifest\u00e9(e)",
    "iu": "int\u00e9rieur(e) qui engendre",
    "ue": "qui engendre et re\u00e7oit",
    "ui": "qui engendre et internalise",
    "ua": "qui engendre et manifeste",
}

INTRO_FR = [
    "Dans la tradition Kongo, la mati\u00e8re est manifest\u00e9e par le son : ce sont "
    "les ondes du son qui lui donnent forme. Le Kilolaka est l'art de d\u00e9coder "
    "cette manifestation. Chaque son porte une \u00e9tape de la venue de la "
    "mati\u00e8re \u00e0 la forme, et chaque mot garde ce sens profond derri\u00e8re son sens "
    "courant.",
    "On peut le pr\u00e9senter comme une cymatique graphique : le glyphe donne \u00e0 "
    "voir l'action de l'onde sur la mati\u00e8re. Ce cadre rel\u00e8ve du savoir de "
    "tradition Kongo transmis avec le Mandombe.",
    "L'\u00e9criture Mandombe a \u00e9t\u00e9 d\u00e9couverte en 1978 par Wabeladio Payi \u00e0 "
    "Mbanza-Ngungu, en observant les lignes form\u00e9es par la superposition des "
    "briques d'un mur : deux \u00e9l\u00e9ments qui ressemblent \u00e0 un 5 et \u00e0 un 2 sans "
    "\u00eatre des chiffres. Le premier s'appelle Pakudungu, le second Pelekete. "
    "Ces deux noms viennent du chant initiatique Kongo \u00ab Ngiele, ngiele mu "
    "nzila Kongo \u00bb, qui enseigne le chemin du retour, au-del\u00e0 du Nsi Ya Kumi "
    "na Moshi, la onzi\u00e8me dimension.",
    "L'\u00e9criture se compose des Mvuala, des Bisimba, des Nkoma-nkoma, des "
    "Mazita et des Bisinsu. Une Zita est l'union d'une Mvuala et d'une "
    "Kisimba : c'est pourquoi aucune Mvuala n'est pr\u00e9sent\u00e9e seule ici, mais "
    "toujours avec ses Bisimba, dans l'ordre i, u, e, o, a, qui est l'ordre de "
    "l'incarnation de la conscience unique dans la mati\u00e8re.",
]

INTRO_EN = [
    "In the Kongo tradition, matter is brought forth by sound: the waves of "
    "sound give it form. Kilolaka is the art of decoding that manifestation. "
    "Each sound carries one stage of matter coming into form, and each word "
    "keeps that deep meaning behind its everyday sense.",
    "It may be presented as a graphic cymatics: the glyph shows the action of "
    "the wave upon matter. This framework belongs to the Kongo tradition "
    "handed down together with Mandombe.",
    "The Mandombe script was discovered in 1978 by Wabeladio Payi at "
    "Mbanza-Ngungu, watching the lines formed by the courses of a brick wall: "
    "two elements that look like a 5 and a 2 without being figures. The first "
    "is called Pakudungu, the second Pelekete. Both names come from the Kongo "
    "initiatic chant \u201cNgiele, ngiele mu nzila Kongo\u201d, which teaches the way "
    "back, beyond Nsi Ya Kumi na Moshi, the eleventh dimension.",
    "The script is made of Mvuala, Bisimba, Nkoma-nkoma, Mazita and Bisinsu. A "
    "Zita is the union of a Mvuala and a Kisimba: this is why no Mvuala is "
    "shown alone here, but always with its Bisimba, in the order i, u, e, o, "
    "a, which is the order of the incarnation of the single consciousness "
    "into matter.",
]

CLOSING_FR = [
    "Mazita makibaba \u2014 les syllabes occlusives (type gba, pka, kto) existent "
    "dans le Mandombe mais ne servent pas au Kikongo : elles ne sont donc pas "
    "list\u00e9es ici.",
    "Nsakuameso \u2014 \u00e0 la main, on \u00e9crit souvent en diminutifs. Cette forme "
    "abr\u00e9g\u00e9e est distincte de la saisie typographique pr\u00e9sent\u00e9e dans cette "
    "annexe.",
    "Ntalu \u2014 les chiffres gardent la graphie des Bisimba : mpamvala (0, le "
    "triangle), puis 1 = i, 2 = u, 3 = e, 4 = o, 5 = a.",
]

CLOSING_EN = [
    "Mazita makibaba \u2014 the occlusive syllables (gba, pka, kto and the like) "
    "exist in Mandombe but are not used for Kikongo, and are therefore not "
    "listed here.",
    "Nsakuameso \u2014 by hand, people often write in diminutives. That shortened "
    "form is distinct from the typed shapes shown in this appendix.",
    "Ntalu \u2014 the figures keep the shape of the Bisimba: mpamvala (0, the "
    "triangle), then 1 = i, 2 = u, 3 = e, 4 = o, 5 = a.",
]


def p(style, runs):
    body = "".join(
        '<text:span text:style-name="%s">%s</text:span>' % (s, escape(t))
        for s, t in runs
    )
    return '<text:p text:style-name="%s">%s</text:p>' % (style, body)


def plain(style, text):
    return '<text:p text:style-name="%s">%s</text:p>' % (style, escape(text))


def build_annex(grid):
    groups = {g[0]: g for g in grid["GROUPS"]}
    vowels_all = grid["VOWELS"]
    xml = []
    residues = []
    count = 0

    xml.append(plain("Chapter",
                     "Annexe \u2014 Kilolaka \u00b7 Appendix \u2014 Kilolaka"))
    for fr, en in zip(INTRO_FR, INTRO_EN):
        xml.append(plain("BodyTxt", fr))
        xml.append(plain("BodySmall", "EN \u2014 " + en))

    for title_fr, title_en, keys in FAMILIES:
        xml.append(plain("HeadS", title_fr + " \u00b7 " + title_en))
        for key in keys:
            g = groups.get(key)
            if g is None:
                continue
            cons, root_fr, allowed, meanings = g
            allowed = allowed or vowels_all
            xml.append(p("Entry", [
                ("LariT", "Mvuala %s" % cons),
                ("FrT", " \u2014 %s" % root_fr),
                ("EnT", " \u00b7 EN \u2014 %s" % ROOT_EN[cons]),
            ]))
            for v in CANON + NKOMA:
                if v not in allowed:
                    continue
                lari = cons[0] + cons[1:].lower() + v
                mand = to_mandombe(lari)
                res = latin_residue(mand)
                if res:
                    residues.append((lari, mand, res))
                fr_gloss = meanings.get(v) or "%s %s" % (root_fr, MOD_FR[v])
                en_gloss = "%s %s" % (ROOT_EN[cons], MOD_EN[v])
                xml.append(p("EntryNote", [
                    ("MandT", mand),
                    ("LariT", "  " + lari),
                    ("FrT", " \u2014 " + fr_gloss),
                    ("EnT", " \u00b7 EN \u2014 " + en_gloss),
                ]))
                count += 1

    xml.append(plain("HeadS",
                     "Notes \u00b7 Notes"))
    for fr, en in zip(CLOSING_FR, CLOSING_EN):
        xml.append(plain("BodyTxt", fr))
        xml.append(plain("BodySmall", "EN \u2014 " + en))

    return "".join(xml), count, residues


def main():
    grid = json.load(open(GRID, encoding="utf-8"))
    annex, count, residues = build_annex(grid)
    if residues:
        print("RESIDUS LATINS \u2014 generation bloquee :")
        for lari, mand, res in residues:
            print("  %-8s -> %-8s %s" % (lari, mand, res))
        sys.exit(1)

    zin = zipfile.ZipFile(SRC)
    content = zin.read("content.xml").decode("utf-8")
    marker = "</office:text>"
    assert content.count(marker) == 1
    content = content.replace(marker, annex + marker)

    shutil.copy(SRC, OUT)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "content.xml":
                data = content.encode("utf-8")
            if item.filename == "mimetype":
                zout.writestr(item, data, zipfile.ZIP_STORED)
            else:
                zout.writestr(item, data)
    zin.close()
    print("v30 ecrit : %s \u2014 %d Mazita dans l'annexe Kilolaka" % (OUT, count))


if __name__ == "__main__":
    main()
