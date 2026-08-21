#!/usr/bin/env python3
"""Dictionnaire v27 - correctif de la v26 (aucune reconstruction de la chaine).

Chantiers, tous nommes par l'auteur :

  1. gloses inventees ou amputees (Abe yandi, Ama, Badi bari, lettres volees)
  2. notes toujours bilingues FR + EN
  3. format standard des variantes :  sing, sing, sing | pluriel
     virgule et barre composees dans le bloc Mandombe
  4. une seule entree par mot (fusion des doublons singulier / pluriel)
  5. lettrines : glyphe Mandombe seul, sans latin ni traduction

Usage : python scripts/build-dictionary-odt-v27.py <v26.odt> <out.odt> [rapport.txt]
"""
import html
import json
import os
import re
import sys
import unicodedata
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mandombe_typing import to_mandombe, shape_names  # noqa: E402
from mandombe_graphies import map_text  # noqa: E402

SRC = sys.argv[1] if len(sys.argv) > 1 else "/mnt/documents/dictionnaire-lari-v26.odt"
DST = sys.argv[2] if len(sys.argv) > 2 else "/mnt/documents/dictionnaire-lari-v28.odt"
REPORT = sys.argv[3] if len(sys.argv) > 3 else "reports/dictionnaire-v28.txt"

# ------------------------------------------------------------------ 1. gloses
# cle = forme Lari exacte de la v26
GLOSS_FIX = {
    "Abe yandi ni na?": (
        None,
        "Qui est-il au juste?",
        "Who is he exactly?"),
    "Ama": (None, "Ma chère ; maat", "My dear ; maat"),
    "Badi bari (l).": (
        "Badi · bari",
        "Amarante (un légume).",
        "Amaranth (a vegetable)."),
}

# entrees supprimees (doublons remplaces par une entree unique)
DROP_LARI = {"A ma"}

REPORT_LINES = []


def log(section, line):
    REPORT_LINES.append("%-14s %s" % (section, line))


# --------------------------------------------------------------- outils XML
PARA_RE = re.compile(r'<text:p text:style-name="(\w+)">(.*?)</text:p>', re.S)
SPAN_RE = re.compile(r'<text:span text:style-name="(\w+)">(.*?)</text:span>')


def txt(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or ""))


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


# ------------------------------------------------------- 3. formes et pluriels
PREFIX_PAIRS = [
    ("mu", "mi"), ("mu", "ba"), ("ki", "bi"), ("tshi", "bi"), ("chi", "bi"),
    ("di", "ma"), ("li", "ma"), ("lu", "tu"), ("lu", "ma"), ("bu", "ma"),
    ("", "ma"), ("", "ba"), ("", "mi"), ("", "bi"),
]

SPLIT_RE = re.compile(r"\s*[·\u00b7]\s*")
WORDISH = re.compile(r"^[A-Za-zÀ-ÿ'\u2019-]{2,24}[.?!]?$")


def parse_forms(lari):
    """Formes separees par le point median, ou par des virgules quand chaque
    segment est un mot isole (une phrase a virgule reste une phrase)."""
    parts = [p.strip() for p in SPLIT_RE.split(lari or "") if p.strip()]
    out = []
    for p in parts:
        if "," in p:
            segs = [s.strip() for s in p.split(",") if s.strip()]
            if len(segs) > 1 and all(WORDISH.match(s) for s in segs):
                out.extend(segs)
                continue
        out.append(p)
    return out



def stem(form, prefix):
    f = strip_accents(form.lower()).lstrip("'")
    if prefix and f.startswith(prefix):
        return f[len(prefix):]
    if prefix:
        return None
    return f


def is_plural_of(cand, ref):
    """cand est-il le pluriel atteste de ref (memes radicaux) ?"""
    for sp, pp in PREFIX_PAIRS:
        a, b = stem(ref, sp), stem(cand, pp)
        if a and b and a == b and len(a) >= 2:
            return True
    return False


def classify(forms):
    """Renvoie (singuliers, pluriels). Aucun pluriel n'est deduit."""
    if len(forms) < 2:
        return forms, []
    sing, plur = [], []
    for f in forms:
        others = [o for o in forms if o is not f]
        if any(is_plural_of(f, o) for o in others) and not any(
                is_plural_of(o, f) for o in others):
            plur.append(f)
        else:
            sing.append(f)
    if not sing:
        return forms, []
    return sing, plur


def join_forms(sing, plur):
    left = ", ".join(sing)
    return left + (" | " + ", ".join(plur) if plur else "")


# ---------------------------------------------- gloses : doublons et pluriel (s)
ONEWORD = re.compile(r"^[A-Za-zÀ-ÿ'-]{3,22}$")


ART_RE = re.compile(r"^(le|la|les|l'|un|une|des|du|the|a|an)\s+|^l['\u2019]", re.I)


def _key(seg, lang="fr"):
    k = strip_accents(seg.strip().lower().rstrip(".")).replace("(s)", "")
    k = ART_RE.sub("", k).strip()
    k = re.sub(r"\s+", " ", k).strip()

    if lang == "en":
        k = " ".join(IRREG_PAIRS.get(w, w) for w in k.replace("/", " ").split())
        k = re.sub(r"\b(\w+)( \1)+\b", r"\1", k)
    if k.endswith("s") and len(k) > 4:
        k = k[:-1]
    return k



SKIP_FR = re.compile(r"(eau|al|s|x|z)$", re.I)
SKIP_EN = re.compile(r"(y|ch|sh|o|s|x|z)$", re.I)


IRREG_EN = {"sheep", "fish", "deer", "men", "women", "people", "children",
            "feet", "teeth", "man", "woman", "child", "foot", "tooth"}


def _pluralizable(w, lang):
    if lang == "en" and w.lower() in IRREG_EN:
        return False
    return bool(ONEWORD.match(w) and "(s)" not in w
                and not (SKIP_FR if lang == "fr" else SKIP_EN).search(w))


IRREG_PAIRS = {"men": "man", "women": "woman", "children": "child",
               "feet": "foot", "teeth": "tooth", "wives": "wife",
               "people": "person", "persons": "person"}


PAIR_EN = re.compile(
    r"\b(man|woman|child|foot|tooth|wife) (men|women|children|feet|teeth|wives)\b",
    re.I)


def dedupe(gloss, lang="fr"):
    """Un sens n'apparait qu'une fois. Le doublet sing/pluriel devient x(s)."""
    if lang == "en":
        gloss = PAIR_EN.sub(lambda m: "%s/%s" % (m.group(1), m.group(2)), gloss)
    segs = [s.strip() for s in gloss.split(";") if s.strip()]
    order, keep = [], {}
    for seg in segs:
        k = _key(seg, lang)
        if k not in keep:
            keep[k] = seg
            order.append(k)
        else:
            old = keep[k]
            # doublet singulier / pluriel atteste dans l'entree : on marque (s)
            if lang == "en" and {old.lower().rstrip("."), seg.lower().rstrip(".")} & set(IRREG_PAIRS):
                sing = IRREG_PAIRS.get(seg.lower().rstrip("."), seg.lower().rstrip("."))
                plur = [w for w, v in IRREG_PAIRS.items() if v == sing]
                keep[k] = "%s/%s" % (sing, plur[0]) if plur else sing
                continue
            if _key(old, lang) == k and old.lower() != seg.lower():
                short = min([old, seg], key=len)
                base = short.rstrip(".")
                if _pluralizable(base, lang):
                    keep[k] = base + "(s)" + short[len(base):]
    return " ; ".join(keep[k] for k in order)


def mark_single(gloss, lang="fr"):
    """Glose d'un seul mot pour une entree qui porte un pluriel : mur -> mur(s)."""
    segs = [s.strip() for s in gloss.split(";") if s.strip()]
    if len(segs) != 1:
        return gloss
    w = segs[0].rstrip(".")
    if _pluralizable(w, lang):
        return w + "(s)" + segs[0][len(w):]
    return gloss




# ------------------------------------------------------------------ lecture
def read_entry(body):
    fields = {}
    for st, val in SPAN_RE.findall(body):
        fields.setdefault(st, []).append(txt(val))
    return fields


def cap(s):
    s = s.strip()
    return s[:1].upper() + s[1:] if s else s


ENTRY_TPL = ('<text:p text:style-name="Entry">'
             '<text:span text:style-name="MandT">%s</text:span>   '
             '<text:span text:style-name="LariT">%s</text:span>  '
             '<text:span text:style-name="FrT">%s</text:span>  ·  '
             '<text:span text:style-name="EnT">%s</text:span></text:p>')


def norm_gloss(g):
    return strip_accents(g.strip().lower().rstrip(".;"))


STOP = {"une", "un", "des", "les", "le", "la", "de", "du", "pour", "avec",
        "the", "and", "with", "for", "that", "who", "sans", "dans", "etre",
        "plur", "pluriel", "plural", "singulier", "singular"}


def gloss_tokens(g):
    """Mots pleins d'une glose, sans marque de nombre : sert au test de fusion."""
    out = set()
    for w in re.findall(r"[A-Za-zÀ-ÿ']{4,}", strip_accents(g.lower())):
        w = re.sub(r"\(s\)$", "", w)
        w = w[:-1] if w.endswith("s") and len(w) > 4 else w
        if w not in STOP:
            out.add(w)
    return out



def main():
    with zipfile.ZipFile(SRC) as z:
        names = z.namelist()
        blobs = {n: z.read(n) for n in names}
    xml = blobs["content.xml"].decode("utf-8")

    # ---------------- 1er passage : lecture des entrees de l'index I
    sec_start = xml.index('<text:section text:name="IndexLari"')
    sec_end = xml.index("</text:section>", sec_start)
    head, index_i, tail = xml[:sec_start], xml[sec_start:sec_end], xml[sec_end:]

    items = []   # (kind, payload) ; kind = raw | entry
    for pm in PARA_RE.finditer(index_i):
        pass

    pos = 0
    for pm in PARA_RE.finditer(index_i):
        if pm.start() > pos:
            items.append(("raw", index_i[pos:pm.start()]))
        style, body = pm.group(1), pm.group(2)
        if style == "Entry":
            f = read_entry(body)
            items.append(("entry", {
                "lari": (f.get("LariT") or [""])[0].strip(),
                "mand": (f.get("MandT") or [""])[0].strip(),
                "fr": " ; ".join(x.strip() for x in f.get("FrT", []) if x.strip()),
                "en": " ; ".join(x.strip() for x in f.get("EnT", []) if x.strip()),
            }))
        else:
            items.append(("para", (style, body)))
        pos = pm.end()
    items.append(("raw", index_i[pos:]))

    entries = [it[1] for it in items if it[0] == "entry"]

    # ---------------- gloses ciblees + lettres volees
    for e in entries:
        key = e["lari"]
        if key in GLOSS_FIX:
            lari_new, fr_new, en_new = GLOSS_FIX[key]
            if lari_new:
                e["lari"] = lari_new
            if fr_new:
                log("glose", "%s : %s -> %s" % (key, e["fr"], fr_new))
                e["fr"] = fr_new
            if en_new:
                e["en"] = en_new

    # gloses manquantes completees par traduction stricte
    gmap = {}
    if os.path.exists("reports/glosses-v27.json"):
        gmap = json.load(open("reports/glosses-v27.json"))
    n_gl = 0
    for e in entries:
        g = gmap.get(e["lari"])
        if not g:
            continue
        if g.get("en") and not e["en"].strip():
            e["en"] = g["en"]
            n_gl += 1
        if g.get("fr") and not e["fr"].strip():
            e["fr"] = g["fr"]
            n_gl += 1
    log("gloses", "%d gloses manquantes completees" % n_gl)

    entries = [e for e in entries if e["lari"] not in DROP_LARI]
    for it in list(items):
        if it[0] == "entry" and it[1]["lari"] in DROP_LARI:
            items.remove(it)
            log("suppression", "entree %s supprimee (doublon)" % it[1]["lari"])

    # coquilles de saisie du champ Lari (arbitrages deja rendus par l'auteur)
    for e in entries:
        fixed = re.sub(r"([Tt])hs", r"\1sh", e["lari"])
        fixed = re.sub(r"\b[MmNn][' \u2019]?[Ss]amu\b", "N'samu", fixed)
        if fixed != e["lari"]:
            log("coquille", "%s -> %s" % (e["lari"], fixed))
            e["lari"] = fixed

    # ---------------- 4. fusion des doublons
    by_key = {}
    for e in entries:
        e["forms"] = parse_forms(e["lari"])
        e["_norm"] = {strip_accents(f.lower().rstrip(".?!")) for f in e["forms"]}
    removed = set()
    pending = set()
    changed = True
    n_pass = 0
    while changed and n_pass < 12:
      changed = False
      n_pass += 1
      for i, a in enumerate(entries):
        if id(a) in removed:
            continue
        for b in entries[i + 1:]:
            if id(b) in removed or not a["_norm"] & b["_norm"]:
                continue
            subset = b["_norm"] <= a["_norm"] or a["_norm"] <= b["_norm"]
            same_sense = bool(
                {_key(s, "fr") for s in a["fr"].split(";") if s.strip()}
                & {_key(s, "fr") for s in b["fr"].split(";") if s.strip()})
            if not (subset or same_sense):
                continue
            ga = gloss_tokens(a["fr"]) | gloss_tokens(a["en"])
            gb = gloss_tokens(b["fr"]) | gloss_tokens(b["en"])
            multi = len(a["_norm"]) > 1 and len(b["_norm"]) > 1
            if not (ga & gb or multi):
                pending.add((a["lari"], b["lari"]))
                continue


            # fusion dans a
            for f in b["forms"]:
                if strip_accents(f.lower().rstrip(".?!")) not in a["_norm"]:
                    a["forms"].append(f)
                    a["_norm"].add(strip_accents(f.lower().rstrip(".?!")))
            for src, dst in (("fr", "fr"), ("en", "en")):
                have = {norm_gloss(g) for g in a[dst].split(";")}
                add = [g.strip() for g in b[src].split(";")
                       if g.strip() and norm_gloss(g) not in have]
                if add:
                    a[dst] = (a[dst] + " ; " + " ; ".join(add)).strip(" ;")
            removed.add(id(b))
            changed = True
            log("fusion", "%s + %s -> %s" % (a["lari"], b["lari"],
                                             ", ".join(a["forms"])))
    log("fusion", "point fixe atteint en %d passes" % n_pass)
    for x, y in sorted(pending):
        log("fusion ?", "%s / %s : formes communes mais sens disjoints" % (x, y))

    items = [it for it in items
             if not (it[0] == "entry" and id(it[1]) in removed)]
    entries = [e for e in entries if id(e) not in removed]

    # ---------------- 3. formes, pluriels, Mandombe
    for e in entries:
        sing, plur = classify(e["forms"])
        sing = [cap(sing[0])] + [s.lower() for s in sing[1:]]
        plur = [p.lower() for p in plur]
        e["lari"] = join_forms(sing, plur)
        mand_sing = [to_mandombe(map_text(s)) for s in sing]
        mand_plur = [to_mandombe(map_text(p)) for p in plur]
        mand_sing = [m for m in mand_sing if m]
        mand_plur = [m for m in mand_plur if m]
        e["mand"] = join_forms(mand_sing, mand_plur)
        e["fr"], e["en"] = dedupe(e["fr"], "fr"), dedupe(e["en"], "en")
        if plur:
            fr2, en2 = mark_single(e["fr"], "fr"), mark_single(e["en"], "en")
            if fr2 != e["fr"] or en2 != e["en"]:
                log("pluriel", "%s : %s | %s" % (e["lari"], fr2, en2))
            e["fr"], e["en"] = fr2, en2
        e["fr"] = cap(e["fr"])
        e["en"] = cap(e["en"])

    # ---------------- reecriture de l'index I
    out = []
    for kind, payload in items:
        if kind == "raw":
            out.append(payload)
        elif kind == "para":
            out.append('<text:p text:style-name="%s">%s</text:p>' % payload)
        else:
            mand = esc(payload["mand"])
            if "St Pierre" in mand:
                mand = mand.replace(
                    "St Pierre",
                    '</text:span><text:span text:style-name="FrT">St Pierre'
                    '</text:span><text:span text:style-name="MandT">')
            out.append(ENTRY_TPL % (mand, esc(payload["lari"]),
                                    esc(payload["fr"]), esc(payload["en"])))
    xml = head + "".join(out) + tail

    # ---------------- 2. notes bilingues (traitees a part, cf. notes_v27.json)
    notes_map = {}
    if os.path.exists("reports/notes-v27.json"):
        notes_map = json.load(open("reports/notes-v27.json"))
    n_notes = 0
    def fix_note(m):
        nonlocal n_notes
        body = m.group(1)
        raw = txt(body)
        new = notes_map.get(raw.strip())
        if not new:
            return m.group(0)
        n_notes += 1
        return ('<text:p text:style-name="EntryNote">'
                '<text:span text:style-name="NoteT">%s</text:span></text:p>'
                % esc(new))
    xml = re.sub(r'<text:p text:style-name="EntryNote">(.*?)</text:p>',
                 fix_note, xml, flags=re.S)
    log("notes", "%d notes rendues bilingues" % n_notes)

    # ---------------- index II / III : gloses et formes mises a jour
    form_map = {}
    for e in entries:
        for f in e["forms"]:
            form_map[strip_accents(f.lower().rstrip(".?!"))] = (e["mand"], e["lari"])

    def fix_small(m):
        body = m.group(1)

        def repl(sm):
            st, val = sm.group(1), sm.group(2)
            if st == "LariS":
                key = strip_accents(txt(val).lower().rstrip(".?!"))
                if key in form_map:
                    return ('<text:span text:style-name="LariS">%s</text:span>'
                            % esc(form_map[key][1]))
            if st == "MandS":
                return sm.group(0)
            return sm.group(0)

        new = SPAN_RE.sub(repl, body)
        # MandS suit LariS : on le recompose a partir du Lari voisin
        def pair(pm):
            mand, lari = pm.group(1), pm.group(2)
            key = strip_accents(txt(lari).lower().rstrip(".?!"))
            if key in form_map:
                m2, l2 = form_map[key]
                return ('<text:span text:style-name="MandS">%s</text:span> '
                        '<text:span text:style-name="LariS">%s</text:span>'
                        % (esc(m2), esc(l2)))
            return pm.group(0)
        new = re.sub(
            r'<text:span text:style-name="MandS">(.*?)</text:span> '
            r'<text:span text:style-name="LariS">(.*?)</text:span>', pair, new)
        return '<text:p text:style-name="EntrySmall">%s</text:p>' % new

    xml = re.sub(r'<text:p text:style-name="EntrySmall">(.*?)</text:p>',
                 fix_small, xml, flags=re.S)

    # gloses parasites dans les index (tetes amputees)
    xml = xml.replace('<text:span text:style-name="HeadS">égume)</text:span>',
                      '<text:span text:style-name="HeadS">amarante</text:span>')
    xml = re.sub(r'\s*;\s*qui est-il vient-il au juste \?', '', xml)
    xml = re.sub(r'\s*;\s*who is he and where does he come from exactly\?', '',
                 xml, flags=re.I)

    blobs["content.xml"] = xml.encode("utf-8")

    # ---------------- 5. lettrines : glyphe seul
    letters = json.load(open("reports/letters-v27.json")) \
        if os.path.exists("reports/letters-v27.json") else {}
    for pic, path in letters.items():
        if pic in blobs:
            blobs[pic] = open(path, "rb").read()
            log("lettrine", "%s remplacee (glyphe seul)" % pic)

    os.makedirs(os.path.dirname(DST) or ".", exist_ok=True)
    with zipfile.ZipFile(DST, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr(zipfile.ZipInfo("mimetype"),
                   blobs.pop("mimetype", b"application/vnd.oasis.opendocument.text"),
                   compress_type=zipfile.ZIP_STORED)
        for n in names:
            if n != "mimetype":
                z.writestr(n, blobs[n])

    os.makedirs(os.path.dirname(REPORT) or ".", exist_ok=True)
    with open(REPORT, "w") as fh:
        fh.write("source : %s\nsortie : %s\nentrees : %d\n\n"
                 % (SRC, DST, len(entries)))
        fh.write("\n".join(REPORT_LINES))
    print("entrees :", len(entries), "| notes :", n_notes,
          "| lignes de rapport :", len(REPORT_LINES))


main()
