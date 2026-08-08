#!/usr/bin/env python3
"""Dictionnaire Nzo Mikanda v13 — ODT pret pour impression (Amazon KDP 15.24 x 22.86 cm).

Trois index de recherche :
  I.   Kikongo Lari -> Francais -> English   (mise en page principale, illustrations)
  II.  Francais -> Kikongo Lari -> English   (compact, 3 colonnes)
  III. English -> Kikongo Lari -> Francais   (compact, 3 colonnes)

Usage:
  python scripts/build-dictionary-odt-v13.py /tmp/dico.json /mnt/documents/xxx.odt \
      /tmp/letters /tmp/conjugaisons.json /tmp/en-cache.json /tmp/notes-en.json
"""
import json
import os
import re
import shutil
import sys
import unicodedata
import zipfile

from odf.opendocument import OpenDocumentText
from odf.style import (
    Style, TextProperties, ParagraphProperties, PageLayout, PageLayoutProperties,
    MasterPage, FontFace, Columns, Column, SectionProperties, Footer, GraphicProperties,
)
from odf.draw import Frame, Image
from odf.text import P, Section, PageNumber, Span

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/dico.json"
DST = sys.argv[2] if len(sys.argv) > 2 else "/mnt/documents/dictionnaire-v13.odt"
IMG_DIR = sys.argv[3] if len(sys.argv) > 3 else None
CONJ_SRC = sys.argv[4] if len(sys.argv) > 4 else None
EN_SRC = sys.argv[5] if len(sys.argv) > 5 else "/tmp/en-cache.json"
NOTES_EN_SRC = sys.argv[6] if len(sys.argv) > 6 else "/tmp/notes-en.json"
FONT_TTF = "/dev-server/public/fonts/masono_mandombe-webfont.ttf"

MANDOMBE_FONT = "HapaxMandombe"
BODY_FONT = "Liberation Serif"
TITLE_FONT = "Liberation Sans"

en_cache = json.load(open(EN_SRC)) if EN_SRC and os.path.exists(EN_SRC) else {}
notes_en = json.load(open(NOTES_EN_SRC)) if NOTES_EN_SRC and os.path.exists(NOTES_EN_SRC) else {}


# --------------------------------------------------------------------------- utils
def norm(s: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", (s or "").lower())
        if unicodedata.category(c) != "Mn"
    ).strip()


def cmp_key(s: str) -> str:
    """Cle de comparaison pour eliminer les doublons de sens (casse, accents, ponctuation)."""
    return re.sub(r"[^a-z0-9 ]+", "", norm(s)).strip()


def find_illustration(slot: str):
    if not IMG_DIR:
        return None
    for ext in ("png", "jpg", "jpeg", "webp"):
        p = os.path.join(IMG_DIR, f"{slot}.{ext}")
        if os.path.exists(p):
            return p
    return None


def split_senses(s: str):
    out = []
    for part in re.split(r"\s*;\s*", (s or "").strip()):
        part = part.strip()
        if part:
            out.append(part)
    return out


def dedupe_senses(s: str) -> str:
    """« echapper ; Echapper. ; unir » -> « echapper ; unir »."""
    seen, out = set(), []
    for part in split_senses(s):
        k = cmp_key(part)
        if not k or k in seen:
            continue
        seen.add(k)
        out.append(part)
    return " ; ".join(out)


def merge_sense(current: str, extra: str) -> str:
    return dedupe_senses(((current or "") + " ; " + (extra or "")).strip(" ;"))


SENTENCE_END = ".!?…"


def is_sentence(text: str, lari: str) -> bool:
    t = (text or "").strip()
    if not t:
        return False
    if t[-1] in "!?":
        return True
    return len(t.split()) >= 4 and len((lari or "").split()) >= 3


def normalize_sentence(text: str, lari: str, add_period=True) -> str:
    """Majuscule + point final pour les phrases ; rien pour les mots isoles."""
    parts = []
    for t in split_senses(text):
        t = t.strip()
        if not t:
            continue
        if is_sentence(t, lari):
            t = t[0].upper() + t[1:]
            if add_period and t[-1] not in SENTENCE_END:
                t += "."
        else:
            t = t.rstrip(".")
        parts.append(t)
    return " ; ".join(parts)


def note_bilingual(note: str) -> str:
    note = (note or "").strip()
    if not note:
        return ""
    en = (notes_en.get(note) or "").strip()
    if not en or cmp_key(en) == cmp_key(note):
        return note
    return f"FR — {note}  /  EN — {en}"


# --------------------------------------------------------------------------- corpus
entries = json.load(open(SRC))
clean, index = [], {}


def en_of(e):
    en = (e.get("english") or e.get("en") or "").strip()
    if en:
        return en
    fr = (e.get("french") or e.get("fr") or "").strip()
    return (en_cache.get(fr) or "").strip()


for e in entries:
    lari = (e.get("lari") or "").strip()
    fr = (e.get("french") or e.get("fr") or "").strip()
    if not lari or not fr:
        continue
    k = norm(lari)
    if not k:
        continue
    rec = index.get(k)
    if rec is not None:
        rec["fr"] = merge_sense(rec["fr"], fr)
        rec["en"] = merge_sense(rec["en"], en_of(e))
        rec["note"] = merge_sense(rec["note"], (e.get("note") or "").strip())
        if not rec["mandombe"]:
            rec["mandombe"] = (e.get("mandombe") or "").strip()
        continue
    rec = {
        "lari": lari,
        "mandombe": (e.get("mandombe") or "").strip(),
        "fr": dedupe_senses(fr),
        "en": dedupe_senses(en_of(e)),
        "note": (e.get("note") or "").strip(),
        "cat": (e.get("category") or "").strip(),
        "key": k,
    }
    index[k] = rec
    clean.append(rec)

# normalisation typographique + suppression des redondances FR/EN
for r in clean:
    r["lari"] = r["lari"][0].upper() + r["lari"][1:]
    if is_sentence(r["lari"], r["lari"]) and r["lari"][-1] not in SENTENCE_END:
        r["lari"] += "."
    r["fr"] = normalize_sentence(dedupe_senses(r["fr"]), r["lari"])
    r["en"] = normalize_sentence(dedupe_senses(r["en"]), r["lari"])
    if cmp_key(r["en"]) == cmp_key(r["fr"]):
        r["en"] = ""
    r["note"] = note_bilingual(dedupe_senses(r["note"]))

clean.sort(key=lambda x: (x["key"], x["fr"]))

# --------------------------------------------------------------------------- document
doc = OpenDocumentText()
for fam in (BODY_FONT, TITLE_FONT):
    doc.fontfacedecls.addElement(FontFace(name=fam, fontfamily=fam, fontpitch="variable"))
doc.fontfacedecls.addElement(
    FontFace(name=MANDOMBE_FONT, fontfamily=MANDOMBE_FONT, fontpitch="variable"))

pl = PageLayout(name="Book")
pl.addElement(PageLayoutProperties(
    pagewidth="15.24cm", pageheight="22.86cm", printorientation="portrait",
    margintop="1.6cm", marginbottom="1.8cm", marginleft="1.8cm", marginright="1.4cm",
))
doc.automaticstyles.addElement(pl)

# couverture : page pleine, sans marge
plc = PageLayout(name="CoverLayout")
plc.addElement(PageLayoutProperties(
    pagewidth="15.24cm", pageheight="22.86cm", printorientation="portrait",
    margintop="0cm", marginbottom="0cm", marginleft="0cm", marginright="0cm",
))
doc.automaticstyles.addElement(plc)

footer_style = Style(name="FooterP", family="paragraph")
footer_style.addElement(ParagraphProperties(textalign="center"))
footer_style.addElement(TextProperties(fontsize="8pt", fontname=BODY_FONT, color="#666666"))
doc.styles.addElement(footer_style)

mp = MasterPage(name="Standard", pagelayoutname=pl)
foot = Footer()
fp = P(stylename=footer_style)
fp.addElement(PageNumber(selectpage="current"))
foot.addElement(fp)
mp.addElement(foot)
doc.masterstyles.addElement(mp)
doc.masterstyles.addElement(MasterPage(name="Cover", pagelayoutname=plc))


def pstyle(name, parent=None, masterpage=None, **kw):
    text_keys = {"fontsize", "fontweight", "fontstyle", "color", "fontname",
                 "letterspacing", "texttransform"}
    tprops = {k: v for k, v in kw.items() if k in text_keys}
    pprops = {k: v for k, v in kw.items() if k not in text_keys}
    s = Style(name=name, family="paragraph", parentstylename=parent)
    if masterpage:
        s.setAttribute("masterpagename", masterpage)
    if pprops:
        s.addElement(ParagraphProperties(**pprops))
    if tprops:
        s.addElement(TextProperties(**tprops))
    doc.styles.addElement(s)
    return s


def tstyle(name, **kw):
    s = Style(name=name, family="text")
    s.addElement(TextProperties(**kw))
    doc.styles.addElement(s)
    return s


CoverP = pstyle("CoverP", masterpage="Cover", textalign="center", margintop="0cm",
                marginbottom="0cm", marginleft="0cm", marginright="0cm")
BookTitle = pstyle("BookTitle", textalign="center", fontname=TITLE_FONT, fontsize="28pt",
                   fontweight="bold", margintop="0.4cm", marginbottom="0.4cm")
BookSub = pstyle("BookSub", textalign="center", fontname=TITLE_FONT, fontsize="13pt",
                 color="#8a5a20", marginbottom="0.3cm")
BookMandombe = pstyle("BookMandombe", textalign="center", fontname=MANDOMBE_FONT,
                      fontsize="30pt", lineheight="200%", margintop="0.8cm",
                      marginbottom="0.8cm")
BookMeta = pstyle("BookMeta", textalign="center", fontname=BODY_FONT, fontsize="10pt",
                  color="#555555")
Chapter = pstyle("Chapter", masterpage="Standard", fontname=TITLE_FONT, fontsize="17pt",
                 fontweight="bold", margintop="0cm", marginbottom="0.4cm", breakbefore="page")
SubHead = pstyle("SubHead", fontname=TITLE_FONT, fontsize="12pt", fontweight="bold",
                 margintop="0.5cm", marginbottom="0.2cm", color="#8a5a20")
Body = pstyle("BodyTxt", fontname=BODY_FONT, fontsize="10.5pt", lineheight="130%",
              marginbottom="0.25cm", textalign="justify")
BodySmall = pstyle("BodySmall", fontname=BODY_FONT, fontsize="9.5pt", lineheight="130%",
                   marginbottom="0.2cm", color="#444444")
IllusImg = pstyle("IllusImg", textalign="center", margintop="0.3cm", marginbottom="0.4cm")
ImgStyle = Style(name="ImgFrame", family="graphic")
ImgStyle.addElement(GraphicProperties(wrap="none", verticalpos="middle", verticalrel="text"))
doc.automaticstyles.addElement(ImgStyle)
Letter = pstyle("LetterHead", textalign="center", fontname=TITLE_FONT, fontsize="22pt",
                fontweight="bold", color="#8a5a20", margintop="0.5cm",
                marginbottom="0.35cm", keepwithnext="always",
                borderbottom="1pt solid #8a5a20", paddingbottom="0.1cm")
LetterSmall = pstyle("LetterHeadSmall", textalign="center", fontname=TITLE_FONT,
                     fontsize="14pt", fontweight="bold", color="#8a5a20",
                     margintop="0.25cm", marginbottom="0.18cm", keepwithnext="always",
                     borderbottom="0.5pt solid #8a5a20", paddingbottom="0.05cm")
Entry = pstyle("Entry", fontname=BODY_FONT, fontsize="9.5pt", lineheight="0.72cm",
               marginbottom="0.15cm", keeptogether="always", orphans="2", widows="2")
EntryNote = pstyle("EntryNote", fontname=BODY_FONT, fontsize="8.5pt", lineheight="0.34cm",
                   marginleft="0.35cm", marginbottom="0.10cm", color="#555555",
                   keeptogether="always")
EntrySmall = pstyle("EntrySmall", fontname=BODY_FONT, fontsize="7.5pt", lineheight="0.50cm",
                    marginbottom="0.06cm", keeptogether="always", orphans="2", widows="2")

Lari = tstyle("LariT", fontweight="bold", fontsize="9.5pt", fontname=BODY_FONT, color="#333333")
Mand = tstyle("MandT", fontname=MANDOMBE_FONT, fontsize="15pt", fontweight="bold", color="#8a5a20")
Fr = tstyle("FrT", fontname=BODY_FONT, fontsize="9.5pt")
En = tstyle("EnT", fontname=BODY_FONT, fontsize="9pt", fontstyle="italic", color="#555555")
NoteT = tstyle("NoteT", fontname=BODY_FONT, fontsize="8.5pt", fontstyle="italic")
HeadS = tstyle("HeadS", fontweight="bold", fontsize="7.5pt", fontname=BODY_FONT, color="#333333")
MandS = tstyle("MandS", fontname=MANDOMBE_FONT, fontsize="10pt", fontweight="bold",
               color="#8a5a20")
LariS = tstyle("LariS", fontname=BODY_FONT, fontsize="7.5pt", color="#333333")
FrS = tstyle("FrS", fontname=BODY_FONT, fontsize="7.5pt")
EnS = tstyle("EnS", fontname=BODY_FONT, fontsize="7.5pt", fontstyle="italic", color="#555555")


def span(style, text):
    s = Span(stylename=style)
    s.addText(text)
    return s


def build_p(style, runs):
    p = P(stylename=style)
    for r in runs:
        if isinstance(r, str):
            p.addText(r)
        else:
            p.addElement(r)
    return p


def para(style, *runs):
    p = build_p(style, runs)
    doc.text.addElement(p)
    return p


def columns_section(name, count=2, gap="0.55cm"):
    st = Style(name=name + "Sec", family="section")
    cols = Columns(columncount=count, columngap=gap)
    for i in range(count):
        cols.addElement(Column(relwidth="1*",
                               startindent="0cm" if i == 0 else "0.18cm",
                               endindent="0cm" if i == count - 1 else "0.18cm"))
    sp = SectionProperties()
    sp.addElement(cols)
    st.addElement(sp)
    doc.automaticstyles.addElement(st)
    sec = Section(name=name, stylename=st)
    doc.text.addElement(sec)
    return sec


# ================= COUVERTURE PLEINE PAGE =================
cover_img = find_illustration("cover_page") or find_illustration("cover")
if cover_img:
    cp = P(stylename=CoverP)
    cf = Frame(stylename=ImgStyle, width="15.24cm", height="22.86cm", anchortype="as-char")
    cf.addElement(Image(href=doc.addPicture(cover_img)))
    cp.addElement(cf)
    doc.text.addElement(cp)

# ================= PAGE DE TITRE =================
para(Chapter, " ")
para(BookMandombe, "Buku dia Binsono")
para(BookTitle, "BUKU DIA BINSONO")
para(BookSub, "Dictionnaire Kikongo Lari – Français – English")
para(BookMeta, f"{len(clean)} entrées · Écriture Mandombe")
para(BookMeta, "Trois index de recherche : Lari · Français · English")
para(BookMandombe, "Nzo Mikanda")
para(BookMeta, "Nzo Mikanda · www.nzomikanda.com")

para(Chapter, "Avant-propos")
para(Body,
     "Ce dictionnaire rassemble le lexique et les expressions du Kikongo Lari tels qu'ils "
     "sont enseignés sur la plateforme Nzo Mikanda. Chaque entrée donne l'écriture Mandombe, "
     "la forme latine en Lari, puis le sens en français et en anglais. "
     "Le Kikongo Lari utilisé est celui de la région de Mbamou.")
para(Body,
     "Le corpus provient exclusivement de sources attestées : aucune forme n'a été inventée "
     "ni empruntée au Kituba ou au Lingala. Lorsqu'une nuance culturelle ou grammaticale "
     "existe, elle est signalée en note sous l'entrée, en français et en anglais.")
para(Body,
     "L'ouvrage comporte trois index : on peut chercher un mot à partir du Kikongo Lari, "
     "à partir du français ou à partir de l'anglais. Chaque index affiche toujours "
     "l'écriture Mandombe et sa translittération latine.")
para(Body,
     "L'écriture Mandombe a été partagée par Professeur Wabeladio Payi au siècle dernier. "
     "Elle est reproduite ici avec la police Masono Mandombe. Pour écouter la prononciation, "
     "réviser le vocabulaire et poursuivre l'apprentissage en ligne, rendez-vous sur "
     "www.nzomikanda.com.")

para(Chapter, "Foreword")
para(Body,
     "This dictionary gathers the vocabulary and expressions of Kikongo Lari as they are "
     "taught on the Nzo Mikanda platform. Each entry gives the Mandombe script, the Latin "
     "Lari form, then the meaning in French and in English. The Kikongo Lari used here is "
     "that of the Mbamou region.")
para(Body,
     "The corpus comes exclusively from attested sources: no form has been invented or "
     "borrowed from Kituba or Lingala. Whenever a cultural or grammatical nuance exists, it "
     "is given as a note below the entry, in French and in English.")
para(Body,
     "The book has three indexes: a word can be looked up from Kikongo Lari, from French or "
     "from English. Every index always shows the Mandombe script and its Latin "
     "transliteration.")
para(Body,
     "The Mandombe script was shared by Professor Wabeladio Payi in the last century. It is "
     "reproduced here with the Masono Mandombe font. To hear the pronunciation, review the "
     "vocabulary and keep learning online, visit www.nzomikanda.com.")

para(Chapter, "Prononciation · Pronunciation")
para(SubHead, "Voyelles · Vowels")
para(Body, "a, e, i, o, u se prononcent comme en français. Le u se lit /ou/ (comme dans « roue »). "
           "Une voyelle peut être allongée : zaba se prononce zaaba.")
para(BodySmall, "a, e, i, o, u are pronounced as in French; u reads /u/ as in « boot ». "
                "A vowel may be lengthened: zaba is pronounced zaaba.")
para(SubHead, "Consonnes et groupes · Consonants and clusters")
for fr_line, en_line in [
    ("g : toujours dur, comme dans « gare » — jamais /ʒ/.",
     "g: always hard, as in « go » — never /ʒ/."),
    ("j : comme le j français /ʒ/ — bujitu (respect), mbaji, jimbakane.",
     "j: as the French j /ʒ/ (like « s » in « measure ») — bujitu, mbaji, jimbakane."),
    ("sh : comme le sh anglais de « shoes » — moshi.",
     "sh: as the English sh in « shoes » — moshi."),
    ("nz : nzila se prononce /nzila/ ou /ndjila/ ; les deux sont admis. Cette variation n'est "
     "pas systématique : d'autres mots en nz gardent /nz/.",
     "nz: nzila may be said /nzila/ or /ndjila/; both are accepted. This variation is not "
     "systematic: other nz words keep /nz/."),
    ("ns : nsoneka (écrire) se prononce /tsoneka/, mais ns se prononce souvent /ns/ ailleurs — "
     "la prononciation dépend du mot.",
     "ns: nsoneka (to write) is pronounced /tsoneka/, yet ns is often kept as /ns/ elsewhere — "
     "pronunciation depends on the word."),
    ("nk : nkima (singe) se prononce /ntshima/.",
     "nk: nkima (monkey) is pronounced /ntshima/."),
    ("dj : djunu (la paix) se prononce /dzunu/.",
     "dj: djunu (peace) is pronounced /dzunu/."),
]:
    para(BodySmall, "• " + fr_line)
    para(BodySmall, "   EN — " + en_line)

para(Chapter, "Mode d'emploi · How to use")
para(Body, "L'ouvrage comporte trois index. Le premier est classé par ordre alphabétique de la "
           "forme Lari ; le deuxième part du français ; le troisième part de l'anglais.")
para(BodySmall, "The book has three indexes. The first is sorted alphabetically by the Lari "
                "form; the second starts from French; the third starts from English.")
para(SubHead, "Index I — Kikongo Lari → Français → English")
doc.text.addElement(build_p(Entry, [
    span(Mand, "Mbote"), "   ", span(Lari, "Mbote"), "  ", span(Fr, "bonjour"),
    "  ·  ", span(En, "hello")]))
para(BodySmall, "écriture Mandombe en premier, en grand et en brun · forme Lari latine en gras · "
                "sens français · sens anglais en italique")
para(SubHead, "Index II — Français → Kikongo Lari → English")
doc.text.addElement(build_p(EntrySmall, [
    span(HeadS, "bonjour"), "  ", span(MandS, "Mbote"), " ", span(LariS, "Mbote"),
    "  ·  ", span(EnS, "hello")]))
para(SubHead, "Index III — English → Kikongo Lari → Français")
doc.text.addElement(build_p(EntrySmall, [
    span(HeadS, "hello"), "  ", span(MandS, "Mbote"), " ", span(LariS, "Mbote"),
    "  ·  ", span(FrS, "bonjour")]))
para(BodySmall, "Les index II et III sont composés en corps réduit sur trois colonnes et ne "
                "reprennent que les mots et expressions courtes ; les phrases complètes se "
                "trouvent dans l'index I.")
para(BodySmall, "Indexes II and III are set in a smaller size on three columns and only list "
                "words and short expressions; full sentences are found in Index I.")


# ================= INDEX I : LARI -> FR -> EN =================
para(Chapter, "Index I — Kikongo Lari → Français → English")
section = columns_section("IndexLari", 2, "0.55cm")

current = None
for e in clean:
    first = e["key"][0].upper()
    if not first.isalpha():
        first = "#"
    if first != current:
        current = first
        lp = P(stylename=Letter)
        lp.addText(first)
        section.addElement(lp)
        path = find_illustration(first if first.isalpha() else "hash")
        if path:
            ip = P(stylename=IllusImg)
            frame = Frame(stylename=ImgStyle, width="5.2cm", height="3.9cm",
                          anchortype="as-char")
            frame.addElement(Image(href=doc.addPicture(path)))
            ip.addElement(frame)
            section.addElement(ip)

    runs = []
    if e["mandombe"]:
        runs += [span(Mand, e["mandombe"]), "   "]
    runs += [span(Lari, e["lari"]), "  ", span(Fr, e["fr"])]
    if e["en"]:
        runs += ["  ·  ", span(En, e["en"])]
    section.addElement(build_p(Entry, runs))
    if e["note"]:
        section.addElement(build_p(EntryNote, [span(NoteT, e["note"])]))


# ================= INDEX II / III (compacts) =================
MAX_WORDS_REVERSE = 4


def reverse_index(lang: str):
    """Regroupe les entrees par sens (fr ou en). Retourne [(tete, [rec, ...]), ...].

    Les index II et III sont des index de recherche lexicale : on n'y garde que les
    mots et expressions courtes. Les phrases completes restent dans l'index I.
    """
    buckets = {}
    for rec in clean:
        if len(rec["lari"].split()) > MAX_WORDS_REVERSE:
            continue
        for sense in split_senses(rec[lang]):
            if len(sense.split()) > MAX_WORDS_REVERSE:
                continue
            k = cmp_key(sense)
            if not k:
                continue
            b = buckets.get(k)
            if b is None:
                b = buckets[k] = {"head": sense.rstrip("."), "recs": []}
            if rec not in b["recs"]:
                b["recs"].append(rec)
    return sorted(buckets.values(), key=lambda b: (norm(b["head"]), b["head"]))


def render_reverse(title, lang, other):
    para(Chapter, title)
    sec = columns_section("Index" + lang.upper(), 3, "0.35cm")
    cur = None
    for b in reverse_index(lang):
        letter = norm(b["head"])[0].upper() if norm(b["head"]) else "#"
        if not letter.isalpha():
            letter = "#"
        if letter != cur:
            cur = letter
            lp = P(stylename=LetterSmall)
            lp.addText(letter)
            sec.addElement(lp)
        runs = [span(HeadS, b["head"]), "  "]
        seen_other, others = set(), []
        for i, rec in enumerate(b["recs"][:4]):
            if i:
                runs.append(" ; ")
            if rec["mandombe"]:
                runs += [span(MandS, rec["mandombe"]), " "]
            runs.append(span(LariS, rec["lari"]))
            for s in split_senses(rec[other]):
                k = cmp_key(s)
                if k and k != cmp_key(b["head"]) and k not in seen_other:
                    seen_other.add(k)
                    others.append(s)
        if others:
            runs += ["  ·  ", span(EnS if other == "en" else FrS, " ; ".join(others[:2]))]
        sec.addElement(build_p(EntrySmall, runs))


render_reverse("Index II — Français → Kikongo Lari → English", "fr", "en")
render_reverse("Index III — English → Kikongo Lari → Français", "en", "fr")


# ================= ANNEXE : CONJUGAISONS =================
conjugations = json.load(open(CONJ_SRC)) if CONJ_SRC and os.path.exists(CONJ_SRC) else []
if conjugations:
    ConjVerb = pstyle("ConjVerb", fontname=TITLE_FONT, fontsize="11.5pt", fontweight="bold",
                      color="#8a5a20", margintop="0.4cm", marginbottom="0.05cm",
                      keepwithnext="always")
    ConjTense = pstyle("ConjTense", fontname=BODY_FONT, fontsize="8.5pt", fontstyle="italic",
                       color="#555555", marginbottom="0.1cm", keepwithnext="always")
    ConjRow = pstyle("ConjRow", fontname=BODY_FONT, fontsize="9pt", lineheight="0.70cm",
                     marginleft="0.25cm", marginbottom="0.02cm")
    PersonT = tstyle("PersonT", fontname=BODY_FONT, fontsize="8.5pt", color="#555555")

    para(Chapter, "Annexe — Conjugaisons")
    para(Body, "Cette annexe rassemble tous les tableaux de conjugaison rencontrés dans les "
               "leçons de Nzo Mikanda. Chaque forme est donnée en écriture Mandombe puis en "
               "transcription latine.")
    conj_section = columns_section("Conjugaisons", 2, "0.55cm")
    for c in conjugations:
        verb = (c.get("verb") or "").strip()
        if not verb:
            continue
        meaning = (c.get("meaning") or "").strip()
        vp = P(stylename=ConjVerb)
        if c.get("verbMandombe"):
            vp.addElement(span(Mand, c["verbMandombe"].strip()))
            vp.addText("   ")
        vp.addText(verb + (f" — {meaning}" if meaning else ""))
        conj_section.addElement(vp)
        tense = (c.get("tense") or "").strip()
        if tense:
            tp = P(stylename=ConjTense)
            tp.addText(tense)
            conj_section.addElement(tp)
        for r in c.get("rows") or []:
            lari = (r.get("lari") or "").strip()
            if not lari:
                continue
            rp = P(stylename=ConjRow)
            if r.get("mandombe"):
                rp.addElement(span(Mand, r["mandombe"].strip()))
                rp.addText("   ")
            rp.addElement(span(Lari, lari))
            if r.get("person"):
                rp.addText("   ")
                rp.addElement(span(PersonT, r["person"].strip()))
            conj_section.addElement(rp)


para(Chapter, "Index thématique")
para(Body, "Les entrées de ce dictionnaire sont issues des modules d'apprentissage suivants :")
cats = sorted({e["cat"] for e in clean if e["cat"]})
for c in cats:
    para(BodySmall, "• " + c)

para(Chapter, "À propos · About")
para(Body, "Nzo Mikanda est une plateforme d'apprentissage du Kikongo Lari et de l'écriture "
           "Mandombe : leçons progressives, exercices interactifs, dictionnaire, traducteur "
           "et prononciation audio.")
para(BodySmall, "Nzo Mikanda is a learning platform for Kikongo Lari and the Mandombe script: "
                "progressive lessons, interactive exercises, dictionary, translator and audio "
                "pronunciation.")
para(BookMeta, "www.nzomikanda.com")

doc.save(DST)

# ---------- embed the Mandombe font ----------
tmp = DST + ".tmp"
shutil.copy(DST, tmp)
with zipfile.ZipFile(tmp) as zin, zipfile.ZipFile(DST, "w", zipfile.ZIP_DEFLATED) as zout:
    zout.writestr(zipfile.ZipInfo("mimetype"), zin.read("mimetype"), zipfile.ZIP_STORED)
    for item in zin.infolist():
        if item.filename == "mimetype":
            continue
        data = zin.read(item.filename)
        if item.filename in ("content.xml", "styles.xml"):
            x = data.decode("utf-8")
            needle = '<style:font-face style:name="HapaxMandombe"'
            i = x.find(needle)
            if i != -1:
                j = x.find("/>", i)
                if j != -1:
                    x = (x[:j] + '><svg:font-face-src><svg:font-face-uri '
                         'xlink:href="Fonts/masono_mandombe.ttf" xlink:type="simple" '
                         'loext:font-style="normal" loext:font-weight="normal">'
                         '<svg:font-face-format svg:string="truetype"/>'
                         '</svg:font-face-uri></svg:font-face-src></style:font-face>'
                         + x[j + 2:])
            for root in ("<office:document-content ", "<office:document-styles "):
                if root in x:
                    ns = ""
                    if "xmlns:svg=" not in x:
                        ns += 'xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0" '
                    if "xmlns:loext=" not in x:
                        ns += 'xmlns:loext="urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0" '
                    if "xmlns:xlink=" not in x:
                        ns += 'xmlns:xlink="http://www.w3.org/1999/xlink" '
                    x = x.replace(root, root + ns, 1)
            data = x.encode("utf-8")
        elif item.filename == "META-INF/manifest.xml":
            x = data.decode("utf-8")
            x = x.replace("</manifest:manifest>",
                          '<manifest:file-entry manifest:full-path="Fonts/masono_mandombe.ttf" '
                          'manifest:media-type="application/x-font-ttf"/></manifest:manifest>')
            data = x.encode("utf-8")
        zout.writestr(item, data)
    zout.write(FONT_TTF, "Fonts/masono_mandombe.ttf")
os.remove(tmp)
print("OK", DST, len(clean), "entries")
