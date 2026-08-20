#!/usr/bin/env python3
"""Dictionnaire Nzo Mikanda v24 — ODT pret pour impression (Amazon KDP 15.24 x 22.86 cm).

Trois index de recherche :
  I.   Kikongo Lari -> Francais -> English   (mise en page principale, illustrations)
  II.  Francais -> Kikongo Lari -> English   (compact, 3 colonnes)
  III. English -> Kikongo Lari -> Francais   (compact, 3 colonnes)

Usage:
  python scripts/build-dictionary-odt-v24.py /tmp/dico.json /mnt/documents/xxx.odt \
      /tmp/letters /tmp/conjugaisons.json /tmp/en-cache.json /tmp/notes-en.json
"""
import json
import os
import re
import shutil
import sys
import unicodedata
import zipfile
from collections import Counter

sys_path_dir = os.path.dirname(os.path.abspath(__file__))
if sys_path_dir not in sys.path:
    sys.path.insert(0, sys_path_dir)
from book_clean import clean_record, dedup_key, looks_english, write_report

from odf.opendocument import OpenDocumentText
from odf.style import (
    Style, TextProperties, ParagraphProperties, PageLayout, PageLayoutProperties,
    MasterPage, FontFace, Columns, Column, SectionProperties, Footer, GraphicProperties,
)
from odf.draw import Frame, Image
from odf.text import P, Section, PageNumber, Span

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/dico.json"
DST = sys.argv[2] if len(sys.argv) > 2 else "/mnt/documents/dictionnaire-v19.odt"
IMG_DIR = sys.argv[3] if len(sys.argv) > 3 else None
CONJ_SRC = sys.argv[4] if len(sys.argv) > 4 else None
EN_SRC = sys.argv[5] if len(sys.argv) > 5 else "/tmp/en-cache.json"
NOTES_EN_SRC = sys.argv[6] if len(sys.argv) > 6 else "/tmp/notes-en.json"
CONJ_GLOSS_SRC = sys.argv[7] if len(sys.argv) > 7 else "/tmp/conj-gloss.json"

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
    """Cle de comparaison pour eliminer les doublons de sens.

    Les precisions entre parentheses (pl.), (sg.), (fig.)... sont ignorees :
    « Mushrooms » et « Mushrooms (pl.) » sont un seul et meme sens.
    """
    base = re.sub(r"\([^)]*\)", " ", norm(s))
    return re.sub(r"[^a-z0-9 ]+", "", base).strip()


MANDOMBE_SPLIT = re.compile(r"\s*[|/]\s*")


def clean_mandombe(text: str) -> str:
    """REGLE ABSOLUE : aucune lettre latine parasite ne se promene avec le Mandombe.

    On retire toute ponctuation latine et tout accent ; les variantes separees par
    | ou / deviennent deux blocs Mandombe separes par une espace large.
    """
    blocks = []
    for part in MANDOMBE_SPLIT.split(text or ""):
        part = norm_keep_case(part)
        part = part.replace("(", "").replace(")", "")
        part = re.sub(r"[^A-Za-z ]+", " ", part)
        part = re.sub(r"\s+", " ", part).strip()
        if part:
            blocks.append(part)
    return "\u2003".join(blocks)


def mandombe_terminal(lari: str, mandombe_source: str) -> str:
    """Signe final affiche apres le bloc Mandombe.

    La translitteration latine commande lorsqu'elle porte un signe : une question
    reste une question, tandis qu'un point d'exclamation devient un point simple.
    A defaut, on conserve le point de la source Mandombe. Les lemmes sans signe ne
    recoivent aucune ponctuation artificielle.
    """
    latin_sign = (lari or "").rstrip()[-1:]
    source_sign = (mandombe_source or "").rstrip()[-1:]
    if latin_sign == "?":
        return "?"
    if latin_sign in ".!\u2026":
        return "."
    if source_sign == "?":
        return "?"
    if source_sign in ".!\u2026":
        return "."
    return ""


def norm_keep_case(s: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", s or "")
        if unicodedata.category(c) != "Mn"
    )


def find_illustration(slot: str):
    if not IMG_DIR:
        return None
    for ext in ("png", "jpg", "jpeg", "webp"):
        p = os.path.join(IMG_DIR, f"{slot}.{ext}")
        if os.path.exists(p):
            return p
    return None


SENTENCE_END = ".!?\u2026"


def split_senses(s: str, fine: bool = False):
    """Decoupe les sens. `fine` decoupe aussi sur / et , pour les glosses courtes."""
    raw = re.split(r"\s*[;|]\s*", (s or "").strip())
    out = []
    for part in raw:
        part = part.strip()
        if not part:
            continue
        if fine and part[-1:] not in SENTENCE_END and len(part.split()) <= 6:
            for sub in re.split(r"\s*[/,]\s*", part):
                sub = sub.strip()
                if sub:
                    out.append(sub)
        else:
            out.append(part)
    return out


# Abreviations residuelles qui ne portent aucun sens une fois isolees
JUNK_SENSES = {
    "f", "m", "n", "v", "s", "pl", "sg", "fig", "adj", "adv", "sing", "plur",
    "fem", "masc", "nom", "vb",
}


def dedupe_senses(s: str) -> str:
    """« echapper ; Echapper. ; unir / echapper » -> « echapper ; unir ».

    Les fragments vides de sens (« f », « pl. », « m »…) sont supprimes.
    """
    seen, out = set(), []
    for part in split_senses(s, fine=True):
        k = cmp_key(part)
        if not k or k in seen or k in JUNK_SENSES:
            continue
        seen.add(k)
        out.append(part)
    return " ; ".join(out)



def merge_sense(current: str, extra: str) -> str:
    return dedupe_senses(((current or "") + " ; " + (extra or "")).strip(" ;"))


def is_sentence(text: str, lari: str) -> bool:
    """Une entree est une phrase des que le Lari compte plusieurs mots.

    Les phrases nominales (« grain de sel », « bonne idee ») sont traitees comme
    des phrases : majuscule initiale et point final.
    """
    t = (text or "").strip()
    if not t:
        return False
    if t[-1] in "!?":
        return True
    # « Beni · Mabeni » : on compte les mots de la plus longue variante,
    # pas la somme des variantes separees par un point median.
    variants = [v.strip() for v in re.split(r"[\u00b7|/]", lari or "") if v.strip()]
    nwords = max((len(v.split()) for v in variants), default=0)
    if nwords >= 3:
        return True
    return len(t.split()) >= 4 and nwords >= 2



def normalize_sentence(text: str, lari: str, add_period=True) -> str:
    """Majuscule + point final pour les phrases ; rien pour les mots isoles."""
    parts = []
    for i, t in enumerate(split_senses(text)):
        t = t.strip()
        if not t:
            continue
        if is_sentence(t, lari):
            t = t[0].upper() + t[1:]
            if add_period and t[-1] not in SENTENCE_END:
                t += "."
        else:
            t = t.rstrip(".")
            # Majuscule uniquement en debut de phrase : apres un point-virgule,
            # un simple mot ou syntagme reste en minuscule.
            if i and t[:1].isupper() and t[1:2].islower() and t.lower() != t[:1] + t[1:]:
                t = t[0].lower() + t[1:]
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
# La v20 relue a la main est la SOURCE DE VERITE (voir scripts/extract-odt-v20.py).
data = json.load(open(SRC))
raw_entries = data["entries"]
CONJ_ROWS = data.get("conj") or []
LETTER_IMAGES = data.get("images") or {}

ARTICLES = (
    "le ", "la ", "les ", "l'", "l\u2019", "un ", "une ", "des ", "du ", "de la ",
    "the ", "a ", "an ",
)

PROPER = {
    "mfua", "kongo", "lari", "kikongo", "mandombe", "nzo", "mikanda", "paul",
    "paulo", "brazzaville", "mbamou", "mbamu", "kuya", "mikuri", "france",
    "kinshasa", "congo", "dieu", "nzambi", "afrique", "europe",
}

# Surcharges Mandombe, au cas par cas : seule l'ecriture Mandombe change,
# la translitteration latine et la prononciation restent identiques.
MANDOMBE_OVERRIDES = {
    "ntshangu": "Nkangu",
    "ntsari": "Nsari",
    "ntsha": "Nka",
    "ntsamina": "Nsamina",
    "nsieti": "Nsiyeti",
    "ndjokele": "Nzokele",
    "ntshana": "Nkana",
    "n'songi": "Nsongi",
    "n\u2019songi": "Nsongi",
    "n'samu": "Nsamu",
    "n\u2019samu": "Nsamu",
    "n'mvu": "Mumvu",
    "n\u2019mvu": "Mumvu",
    "n'kunga": "Nkunga",
    "n\u2019kunga": "Nkunga",
    "n'kento": "Nkento",
    "n\u2019kento": "Nkento",
}

# Notes de prononciation ajoutees aux entrees concernees.
PRONUNCIATION_NOTES = {
    "ndjokele": "FR \u2014 \u00e9crit Nzokele en Mandombe, prononc\u00e9 /nd\u0292okele/"
                "  /  EN \u2014 written Nzokele in Mandombe, pronounced /nd\u0292okele/",
    "ntshana": "FR \u2014 \u00e9crit Nkana en Mandombe, prononc\u00e9 /nt\u0283ana/"
               "  /  EN \u2014 written Nkana in Mandombe, pronounced /nt\u0283ana/",
    "nkenke": "FR \u2014 se prononce /nt\u0283ent\u0283e/"
              "  /  EN \u2014 pronounced /nt\u0283ent\u0283e/",
}

# Corrections de sens demandees par l'auteur.
SENSE_FIXES = {
    "mfinda": ("le coin le plus isol\u00e9 de la for\u00eat",
               "the most remote part of the forest"),
    "mulumba": ("un lapin", "rabbit"),
    "milumba": ("des lapins", "rabbits"),
    "ngulu": ("un cochon", "pig"),
    "ngu": ("la m\u00e8re", "mother"),
    "nguri": ("la m\u00e8re", "mother"),
    "ngudi": ("la m\u00e8re", "mother"),
    "nua": ("boire", "to drink"),
    "munua": ("la bouche", "mouth"),
    "minua": ("les bouches", "mouths"),
}


def strip_seps(s: str) -> str:
    s = (s or "").strip()
    s = s.strip("\u00b7").strip()
    s = re.sub(r"\s*\u00b7\s*$", "", s)
    return s.strip(" ;").strip()


def strip_article(sense: str) -> str:
    """« les cheveux » -> « cheveux », « the jaw » -> « jaw » (gloses courtes)."""
    t = sense.strip()
    if len(t.split()) > 4 or t[-1:] in SENTENCE_END:
        return t
    low = t.lower()
    for art in ARTICLES:
        if low.startswith(art):
            rest = t[len(art):].strip()
            if rest:
                return rest
    return t


def dedupe_gloss(text: str) -> str:
    """Supprime les sens qui ne different que par l'article ou la casse."""
    seen, out = set(), []
    for part in split_senses(text):
        part = strip_seps(part)
        if not part:
            continue
        part = strip_article(part)
        k = cmp_key(part)
        if not k or k in seen or k in JUNK_SENSES:
            continue
        seen.add(k)
        out.append(part)
    return " ; ".join(out)


def fix_semicolon_case(text: str) -> str:
    """Pas de majuscule apres un point-virgule ; « . ; s'il vous plait » -> « ., s'il... »."""
    parts = [p.strip() for p in text.split(" ; ") if p.strip()]
    out = []
    for i, p in enumerate(parts):
        if i and p[:1].isupper():
            first = re.split(r"[\s,.;!?]", p, 1)[0].lower().strip("'\u2019")
            if first not in PROPER:
                p = p[0].lower() + p[1:]
        out.append(p)
    text = " ; ".join(out)
    text = re.sub(r"\.\s*;\s*(s['\u2019]il|please|s['\u2019]il vous)", r"., \1", text)
    return text


def fix_phonetics(text: str) -> str:
    """Un son se note entre barres obliques : « ; a: ; long » -> « /a/ long »."""
    t = text or ""
    t = re.sub(r"/\s*([a-z\u025b\u0254\u0292\u0283\u014b]{1,2}):?\s*/", r"/\1/", t)
    t = re.sub(r";\s*([a-z\u025b\u0254\u0292\u0283\u014b]{1,2}):\s*;", r" /\1/", t)
    t = re.sub(r";\s*([a-z]{1,2})\s*;\s*(long|court)", r" /\1/ \2", t)
    t = re.sub(r"\b([a-z]{1,2}):\s*(long|court)", r"/\1/ \2", t)
    t = re.sub(r"\b([a-z]{1,2}):(?=\s|$|\s*;)", r"/\1/", t)
    t = re.sub(r"\s{2,}", " ", t)
    return t.strip(" ;")


def drop_etymology(note: str) -> str:
    """Les renvois de section (§...) et gloses d'analyse ne servent pas au lecteur."""
    kept = []
    for part in re.split(r"\s*[;/]\s*", note or ""):
        if "\u00a7" in part:
            continue
        kept.append(part.strip())
    note = " ; ".join(p for p in kept if p)
    note = re.sub(r"\s*\([^)]*\u00a7[^)]*\)", "", note)
    return note.strip(" ;-\u2014").strip()


clean, index = [], {}
for e in raw_entries:
    lari = strip_seps(e.get("lari") or "")
    mand = strip_seps(e.get("mandombe") or "")
    fr = strip_seps(e.get("fr") or "")
    en = strip_seps(e.get("en") or "")
    note_raw = strip_seps(e.get("note") or "")
    note = drop_etymology(note_raw)
    if not lari:
        continue
    # Quelques retouches manuelles de la v20 ont perdu uniquement le style MandT.
    # La translitteration reste alors la source du texte rendu avec la police Mandombe.
    if not mand:
        mand = lari
    # retouches manuelles ou le sens a debordé sur la ligne Lari
    m = re.match(r"^([A-Za-z'\u2019\u00b7 ]{1,20}?)\s+(le |la |les |un |une |the )", lari)
    if m and len(lari.split()) > 2 and lari.split()[0].lower() in SENSE_FIXES:
        lari = lari.split()[0]
    base = norm(re.split(r"[\u00b7|/]", lari)[0]).strip(" .!?")
    if base in SENSE_FIXES:
        fr_fix, en_fix = SENSE_FIXES[base]
        fr, en = fr_fix, en_fix
    k = dedup_key(lari)
    if not k:
        continue
    rec = index.get(k)
    if rec is not None:
        rec["fr"] = dedupe_gloss(rec["fr"] + " ; " + fr)
        rec["en"] = dedupe_gloss(rec["en"] + " ; " + en)
        rec["note"] = dedupe_senses((rec["note"] + " ; " + note).strip(" ;"))
        if not rec["mandombe"]:
            rec["mandombe"] = clean_mandombe(mand)
        continue
    rec = {
        "lari": lari,
        "mandombe": clean_mandombe(mand),
        "mandombe_source": mand,
        "fr": dedupe_gloss(fr),
        "en": dedupe_gloss(en),
        "note": note,
        "note_raw": note_raw,
        "cat": "",
        "key": k,
        "base": base,
    }
    index[k] = rec
    clean.append(rec)


def apply_mandombe_overrides(rec):
    """Surcharges au cas par cas ; nji/nje s'ecrivent nzi/nze en Mandombe."""
    words = re.split(r"(\s+)", rec["mandombe"])
    out = []
    for w in words:
        key = norm(w).strip(" .!?")
        rep = MANDOMBE_OVERRIDES.get(key)
        if rep:
            out.append(rep if w[:1].isupper() else rep.lower())
        else:
            out.append(w)
    m = "".join(out)
    m = re.sub(r"[Nn]ji", lambda x: "Nzi" if x.group(0)[0] == "N" else "nzi", m)
    m = re.sub(r"[Nn]je", lambda x: "Nze" if x.group(0)[0] == "N" else "nze", m)
    rec["mandombe"] = clean_mandombe(m)


report = Counter()
for r in clean:
    apply_mandombe_overrides(r)
    r["lari"] = re.sub(r"\s*[|/]\s*", " \u00b7 ", r["lari"]).strip()
    if r["lari"]:
        r["lari"] = r["lari"][0].upper() + r["lari"][1:]
        if is_sentence(r["lari"], r["lari"]) and r["lari"][-1] not in SENTENCE_END:
            r["lari"] += "."
    if r["mandombe"]:
        r["mandombe"] = r["mandombe"][0].upper() + r["mandombe"][1:]
    # Le signe est rendu hors de la police Mandombe pour eviter tout glyphe latin
    # parasite. Les questions gardent ?, les exclamations deviennent un point.
    r["mterminal"] = (mandombe_terminal(r["lari"], r.get("mandombe_source") or "")
                      if r["mandombe"] else "")
    for f in ("fr", "en"):
        r[f] = fix_semicolon_case(normalize_sentence(dedupe_gloss(r[f]), r["lari"]))
    if not r["en"]:
        # gloses anglaises completees par traduction (cache /tmp/en-cache-v21.json)
        whole = en_cache.get(r["fr"]) or en_cache.get(r["fr"].rstrip("."))
        got = [whole] if whole else [
            en_cache.get(sn) or en_cache.get(sn.rstrip("."))
            for sn in split_senses(r["fr"])]
        got = [g for g in got if g]
        if got:
            r["en"] = fix_semicolon_case(
                normalize_sentence(dedupe_gloss(" ; ".join(got)), r["lari"]))
    if cmp_key(r["en"]) == cmp_key(r["fr"]):
        r["en"] = ""
    pron = PRONUNCIATION_NOTES.get(r.get("base") or "")
    if pron and pron not in r["note"]:
        r["note"] = (r["note"] + " ; " + pron).strip(" ;")
    r["note"] = fix_phonetics(dedupe_senses(fix_semicolon_case(drop_etymology(r["note"]))))
    if r["note"] and "EN \u2014" not in r["note"]:
        r["note"] = fix_phonetics(note_bilingual(r.get("note_raw") or r["note"])
                                  if notes_en.get(r.get("note_raw") or "") else r["note"])

missing_en = [r["lari"] for r in clean if not r["en"]]
write_report(os.environ.get("BOOK_REPORT", "/tmp/book-clean-report-v22.txt"),
             report, len(clean), missing_en)

# QA bloquante de ponctuation Mandombe. Une divergence ici invalide le livre.
punctuation_errors = []
question_count = statement_count = 0
for r in clean:
    latin_sign = r["lari"].rstrip()[-1:]
    terminal = r.get("mterminal") or ""
    if latin_sign == "?":
        question_count += 1
        if terminal != "?":
            punctuation_errors.append(f"QUESTION\t{r['lari']}\t{terminal or '[absent]'}")
    elif latin_sign in ".!\u2026":
        statement_count += 1
        if terminal != ".":
            punctuation_errors.append(f"PHRASE\t{r['lari']}\t{terminal or '[absent]'}")
    if terminal == "!":
        punctuation_errors.append(f"EXCLAMATION\t{r['lari']}\t!")

qa_path = os.environ.get("BOOK_PUNCT_REPORT", "/tmp/book-punctuation-report-v22.txt")
with open(qa_path, "w", encoding="utf-8") as fh:
    fh.write("Validation ponctuation Mandombe — dictionnaire v22\n\n")
    fh.write(f"Entrees controlees : {len(clean)}\n")
    fh.write(f"Questions controlees : {question_count}\n")
    fh.write(f"Phrases declaratives controlees : {statement_count}\n")
    fh.write(f"Erreurs : {len(punctuation_errors)}\n")
    if punctuation_errors:
        fh.write("\n" + "\n".join(punctuation_errors) + "\n")
if punctuation_errors:
    raise RuntimeError(f"Ponctuation Mandombe invalide : voir {qa_path}")
print("Entrees :", len(clean), "| sans anglais :", len(missing_en))

clean.sort(key=lambda x: (0 if x["key"][:1].isalpha() else 1, x["key"], x["fr"]))


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
                      fontsize="26pt", lineheight="170%", margintop="0.5cm",
                      marginbottom="0.5cm")
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


def mandombe_span(style, text, terminal=""):
    """Compose le texte et son signe terminal dans un seul span Mandombe."""
    return span(style, text + terminal)


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
para(BookSub, "Kikongo Lari – French – English Dictionary")
para(BookMeta, f"{len(clean)} entrées · Écriture Mandombe")
para(BookMeta, f"{len(clean)} entries · Mandombe script")
para(BookMeta, "Trois index de recherche : Lari · Français · English")
para(BookMeta, "Three search indexes: Lari · French · English")
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
     "that of the Mbamu region.")
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
para(Body, "a, i, o se prononcent comme en français. Le u se lit /ou/ (comme dans « roue »). "
           "e se prononce /é/. Une voyelle peut être allongée : zaba se prononce zaaba.")
para(BodySmall, "a, i, o are pronounced as in French; u reads /u/ as in « boot ». "
                "e is pronounced /é/. A vowel may be lengthened: zaba is pronounced zaaba.")
doc.text.addElement(build_p(Entry, [
    span(Mand, "Zaba"), "   ", span(Lari, "Zaba"), "  ", span(Fr, "savoir"),
    "  ·  ", span(En, "to know"), "  ", span(Fr, "/zaaba/")]))

para(SubHead, "Consonnes et groupes · Consonants and clusters")
for fr_line, en_line, examples in [
    ("g : toujours dur, comme dans « gare » — jamais /ʒ/.",
     "g: always hard, as in « go » — never /ʒ/.",
     [("Ngolo", "Ngolo", "force", "strength", "/ŋɡolo/")]),
    ("j : comme le j français /ʒ/ — bujitu (respect), mbaji, jimbakane.",
     "j: as the French j /ʒ/ (like « s » in « measure ») — bujitu, mbaji, jimbakane.",
     [("Bujitu", "Bujitu", "politesse, respect", "politeness, respect", "/buʒitu/"),
      ("Mbaji", "Mbaji", "demain", "tomorrow", "/mbaʒi/"),
      ("Jimbakane", "Jimbakane", "perdu (chemin)", "lost (path)", "/ʒimbakane/")]),
    ("sh : comme le sh anglais de « shoes » — moshi.",
     "sh: as the English sh in « shoes » — moshi.",
     [("Moshi", "Moshi", "un", "one", "/moʃi/")]),
    ("nz : nzila se prononce /nzila/ ou /ndjila/ ; les deux sont admis. Cette variation n'est "
     "pas systématique : d'autres mots en nz gardent /nz/.",
     "nz: nzila may be said /nzila/ or /ndjila/; both are accepted. This variation is not "
     "systematic: other nz words keep /nz/.",
     [("Nzila", "Nzila", "chemin", "path", "/nzila/ ~ /ndjila/")]),
    ("ns : nsoneka (écrire) se prononce /tsoneka/, mais ns se prononce souvent /ns/ ailleurs — "
     "la prononciation dépend du mot.",
     "ns: nsoneka (to write) is pronounced /tsoneka/, yet ns is often kept as /ns/ elsewhere — "
     "pronunciation depends on the word.",
     [("Nsoneka", "Nsoneka", "écrire", "to write", "/tsoneka/")]),
    ("nk : nkima (singe) se prononce /ntshima/.",
     "nk: nkima (monkey) is pronounced /ntshima/.",
     [("Nkima", "Nkima", "singe", "monkey", "/ntʃima/")]),
    ("dj : djunu (la paix) se prononce /dzunu/.",
     "dj: djunu (peace) is pronounced /dzunu/.",
     [("Djunu", "Djunu", "paix", "peace", "/dzunu/")]),
]:
    para(BodySmall, "• " + fr_line)
    para(BodySmall, "   EN — " + en_line)
    for mand, lari, fr_s, en_s, ipa in examples:
        doc.text.addElement(build_p(Entry, [
            span(Mand, clean_mandombe(mand)), "   ", span(Lari, lari), "  ", span(Fr, fr_s),
            "  ·  ", span(En, en_s), "  ", span(Fr, ipa)]))


para(Chapter, "Mode d'emploi · How to use")
para(Body, "L'ouvrage comporte trois index. Le premier est classé par ordre alphabétique de la "
           "forme Lari ; le deuxième part du français, puis donne l'anglais et le Kikongo Lari ; le troisième part de l'anglais, puis donne le français et le Kikongo Lari.")
para(BodySmall, "The book has three indexes. The first is sorted alphabetically by the Lari "
                "form; the second starts from French, then gives English and Kikongo Lari; the third starts from English, then gives French and Kikongo Lari.")
para(SubHead, "Index I — Kikongo Lari → Français → English")
doc.text.addElement(build_p(Entry, [
    span(Mand, "Mbote"), "   ", span(Lari, "Mbote"), "  ", span(Fr, "bonjour"),
    "  ·  ", span(En, "hello")]))
para(BodySmall, "écriture Mandombe en premier, en grand et en brun · forme Lari latine en gras · "
                "sens français · sens anglais en italique")
para(SubHead, "Index II — Français → English → Kikongo Lari")
doc.text.addElement(build_p(EntrySmall, [
    span(HeadS, "bonjour"), "  ·  ", span(EnS, "hello"), "  ",
    span(MandS, "Mbote"), " ", span(LariS, "Mbote")]))
para(SubHead, "Index III — English → Français → Kikongo Lari")
doc.text.addElement(build_p(EntrySmall, [
    span(HeadS, "hello"), "  ·  ", span(FrS, "bonjour"), "  ",
    span(MandS, "Mbote"), " ", span(LariS, "Mbote")]))
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
        path = find_illustration(first if first.isalpha() else "hash")
        if not path:
            # pas d'illustration : on garde un simple filet, jamais de lettre latine
            section.addElement(P(stylename=Letter))
        if path:
            ip = P(stylename=IllusImg)
            frame = Frame(stylename=ImgStyle, width="5.2cm", height="3.9cm",
                          anchortype="as-char")
            frame.addElement(Image(href=doc.addPicture(path)))
            ip.addElement(frame)
            section.addElement(ip)

    runs = []
    if e["mandombe"]:
        runs += [mandombe_span(Mand, e["mandombe"], e.get("mterminal") or "")]
        runs.append("   ")
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
            k = cmp_key(strip_article(sense.rstrip(".")))
            if not k:
                continue
            b = buckets.get(k)
            if b is None:
                # pas d'article en tete d'index : « the jaw » -> « jaw »
                head = strip_article(sense.rstrip("."))
                if head[1:] == head[1:].lower():
                    head = head[0].lower() + head[1:]
                b = buckets[k] = {"head": head, "recs": []}
            if rec not in b["recs"]:
                b["recs"].append(rec)
    return sorted(buckets.values(), key=lambda b: (norm(b["head"]), b["head"]))


def render_reverse(title, lang, other):
    """Tete de sens, puis l'autre langue, puis le Kikongo Lari (Mandombe + latin)."""
    para(Chapter, title)
    sec = columns_section("Index" + lang.upper(), 3, "0.35cm")
    buckets = reverse_index(lang)
    # les lettres d'abord (A -> Z), les entrees non alphabetiques a la fin
    buckets.sort(key=lambda b: (0 if norm(b["head"])[:1].isalpha() else 1,
                                norm(b["head"]), b["head"]))
    cur = None
    for b in buckets:
        letter = norm(b["head"])[:1].upper()
        if not letter.isalpha():
            letter = "#"
        if letter != cur:
            cur = letter
            lp = P(stylename=LetterSmall)
            lp.addText(letter if letter != "#" else "Autres \u00b7 Other")
            sec.addElement(lp)
        runs = [span(HeadS, b["head"])]
        seen_other, others = set(), []
        for rec in b["recs"][:4]:
            for sn in split_senses(rec[other]):
                k = cmp_key(sn)
                if k and k != cmp_key(b["head"]) and k not in seen_other:
                    seen_other.add(k)
                    others.append(sn)
        if others:
            runs += ["  \u00b7  ",
                     span(EnS if other == "en" else FrS, " ; ".join(others[:2]))]
        runs.append("  ")
        for i, rec in enumerate(b["recs"][:4]):
            if i:
                runs.append(" ; ")
            if rec["mandombe"]:
                runs.append(mandombe_span(
                    MandS, rec["mandombe"], rec.get("mterminal") or ""))
                runs.append(" ")
            runs.append(span(LariS, rec["lari"]))
        sec.addElement(build_p(EntrySmall, runs))


render_reverse("Index II \u2014 Fran\u00e7ais \u2192 English \u2192 Kikongo Lari", "fr", "en")
render_reverse("Index III \u2014 English \u2192 Fran\u00e7ais \u2192 Kikongo Lari", "en", "fr")

# ================= ANNEXE : CONJUGAISONS =================
TENSE_EN = {
    "present": "Present",
    "passe": "Past",
    "passe compose": "Past",
    "passe recent": "Recent past",
    "passe lointain": "Remote past",
    "futur": "Future",
    "futur proche": "Near future",
    "imperatif": "Imperative",
    "progressif": "Progressive",
    "present progressif": "Present progressive",
    "habituel": "Habitual",
    "parfait": "Perfect",
    "conditionnel": "Conditional",
    "subjonctif": "Subjunctive",
    "negation": "Negation",
    "forme negative": "Negative form",
    "imparfait": "Imperfect",
    "imparfait negatif": "Negative imperfect",
    "futur negatif": "Negative future",
    "passe compose negatif": "Negative present perfect",
    "present affirmatif": "Present affirmative",
    "present negatif": "Present negative",
    "negation ka...ko": "Negation (ka...ko)",
    "obligation": "Obligation",
    "possession avec ze + pronoms": "Possession with ze + pronouns",
    "infinitif": "Infinitive",
}

PERSON_EN = {
    "je": "I",
    "j'": "I",
    "tu": "You",
    "il": "He",
    "elle": "She",
    "il/elle": "He/She",
    "nous": "We",
    "vous": "You (pl.)",
    "ils": "They",
    "elles": "They",
    "ils/elles": "They",
}


def bilingual(fr: str, table: dict) -> str:
    """« Passé » -> « Passé · Past » quand la traduction est connue.

    Pour les temps qualifies (« Futur négatif », « Passé (accompli) »), on traduit
    la base et l'on conserve la precision entre parentheses.
    """
    fr = (fr or "").strip()
    if not fr:
        return ""
    base = re.split(r"\s*[—\-(]\s*", fr)[0].strip()
    en = table.get(norm(fr).rstrip(".")) or table.get(norm(base).rstrip("."))
    if not en or norm(en) == norm(fr):
        return fr
    return f"{fr} · {en}"



if CONJ_ROWS:
    ConjVerb = pstyle("ConjVerb", fontname=TITLE_FONT, fontsize="10.5pt", fontweight="bold",
                      color="#8a5a20", margintop="0.3cm", marginbottom="0.03cm",
                      keepwithnext="always")
    ConjTense = pstyle("ConjTense", fontname=BODY_FONT, fontsize="8pt", fontstyle="italic",
                       color="#555555", marginbottom="0.06cm", keepwithnext="always")
    ConjRow = pstyle("ConjRow", fontname=BODY_FONT, fontsize="8.5pt", lineheight="0.58cm",
                     marginleft="0.2cm", marginbottom="0cm")

    para(Chapter, "Annexe — Conjugaisons · Appendix — Conjugations")
    para(Body, "Cette annexe rassemble tous les tableaux de conjugaison rencontrés dans les "
               "leçons de Nzo Mikanda. Chaque forme est donnée en écriture Mandombe puis en "
               "transcription latine, avec le sens en français et en anglais.")
    para(BodySmall, "This appendix gathers every conjugation table found in the Nzo Mikanda "
                    "lessons. Each form is given in Mandombe script and Latin transcription, "
                    "with its French and English meaning.")
    conj_section = columns_section("Conjugaisons", 2, "0.55cm")
    cur_verb = cur_tense = None
    for r in CONJ_ROWS:
        lari = strip_seps(r.get("lari") or "")
        if not lari:
            continue
        if r.get("verb") and r["verb"] != cur_verb:
            cur_verb, cur_tense = r["verb"], None
            vp = P(stylename=ConjVerb)
            vp.addText(cur_verb)
            conj_section.addElement(vp)
        if r.get("tense") and r["tense"] != cur_tense:
            cur_tense = r["tense"]
            tp = P(stylename=ConjTense)
            tp.addText(cur_tense)
            conj_section.addElement(tp)
        lari = lari[0].upper() + lari[1:]
        if lari[-1] not in SENTENCE_END:
            lari += "."
        rp = P(stylename=ConjRow)
        mand_source = strip_seps(r.get("mandombe") or "")
        mand = clean_mandombe(mand_source)
        if mand:
            mand = mand[0].upper() + mand[1:]
            rp.addElement(mandombe_span(
                Mand, mand, mandombe_terminal(lari, mand_source)))
            rp.addText("   ")
        rp.addElement(span(Lari, lari))
        # Mandombe -> Lari -> glose francaise -> glose anglaise. Jamais d'etiquette
        # de personne isolee au milieu de la ligne.
        g_fr = fix_semicolon_case(normalize_sentence(
            dedupe_gloss(strip_seps(r.get("fr") or "")), lari))
        g_en = fix_semicolon_case(normalize_sentence(
            dedupe_gloss(strip_seps(r.get("en") or "")), lari))
        if g_fr:
            rp.addText("   ")
            rp.addElement(span(Fr, g_fr))
        if g_en and cmp_key(g_en) != cmp_key(g_fr):
            rp.addText("  ·  ")
            rp.addElement(span(En, g_en))
        conj_section.addElement(rp)


para(Chapter, "À propos · About")
para(Body, "Nzo Mikanda est une plateforme d'apprentissage du Kikongo Lari et de l'écriture "
           "Mandombe : leçons progressives, exercices interactifs, dictionnaire, traducteur "
           "et prononciation audio.")
para(BodySmall, "Nzo Mikanda is a learning platform for Kikongo Lari and the Mandombe script: "
                "progressive lessons, interactive exercises, dictionary, translator and audio "
                "pronunciation.")
para(BookMeta, "www.nzomikanda.com")

doc.save(DST)

# QA XML bloquante : aucun signe terminal ne doit suivre un span Mandombe en
# texte brut. Il doit faire partie du span et heriter de HapaxMandombe.
with zipfile.ZipFile(DST) as qa_zip:
    qa_xml = qa_zip.read("content.xml").decode("utf-8")
mand_style_names = ("MandT", "MandS")
styled_terminals = 0
unstyled_terminals = []
for style_name in mand_style_names:
    pattern = re.compile(
        rf'<text:span text:style-name="{style_name}">([^<]*)</text:span>([.?!])?')
    for match in pattern.finditer(qa_xml):
        inside, outside = match.group(1), match.group(2)
        if inside.endswith((".", "?")):
            styled_terminals += 1
        if outside:
            unstyled_terminals.append((style_name, inside[-80:], outside))
if unstyled_terminals:
    details = "\n".join(f"{s}\t{t}\t{p}" for s, t, p in unstyled_terminals[:20])
    raise RuntimeError("Ponctuation hors du span Mandombe :\n" + details)

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
with open(qa_path, "a", encoding="utf-8") as fh:
    fh.write(f"Signes terminaux dans un span Mandombe : {styled_terminals}\n")
    fh.write("Signes terminaux hors span Mandombe : 0\n")
    fh.write("Style de ponctuation : HapaxMandombe (hérité du span MandT/MandS)\n")
print("OK", DST, len(clean), "entries", styled_terminals, "styled terminals")
