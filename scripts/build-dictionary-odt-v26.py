#!/usr/bin/env python3
"""Dictionnaire v26 - derive de la v25 trilingue, sans relancer la chaine.

Deux chantiers, tous deux issus d'arbitrages nommes de l'auteur :

  A. le champ Lari ne contient QUE du Lari. Le francais et les lettres
     orphelines (« Kanga munua. F. » + glose « Erme la bouche. ») sont des
     debris d'un nettoyage de casse precedent : la lettre est rendue au
     francais, le Lari est nettoye.

  B. les suites que la police masono_mandombe ne compose pas recoivent la
     graphie donnee par l'auteur, plus une note de prononciation bilingue.
     Aucune substitution n'est inventee : la table ci-dessous est fermee.

Usage : python scripts/build-dictionary-odt-v26.py <v25.odt> <out.odt> [rapport.txt]
"""
import html
import os
import re
import sys
import zipfile

SRC = sys.argv[1]
DST = sys.argv[2]
REPORT = sys.argv[3] if len(sys.argv) > 3 else None

# ------------------------------------------------------------------ A. champ Lari
# (lari actuel) -> (lari corrige, glose FR corrigee ou None, glose EN ou None)
LARI_REPAIRS = {
    "Bantu bele. L.": ("Bantu bele.", "Les gens partent.", None),
    "Banzila moyo. Fais attention.": (
        "Banzila moyo.", "Fais attention a ton ventre ; prends soin de ton ventre.",
        "Watch your belly ; take care of your belly."),
    "Batu kuiza. V.": ("Batu kuiza.", "Viens vite.", None),
    "Belesa quelque chose qui rend malade.": (
        "Belesa", "Ce qui rend malade.", "What makes you sick."),
    "Bendi. Q": ("Bendi.", "Qu'ils partent.", "Let them leave."),
    "Beri ta. Ils \u00b7.": ("Beri ta.", "Elles s'appelaient.", None),
    "Bi signifie la multiplication de l'etre interieur.": ("Bi", None, None),
    "Bua ka bua. \u00b7 pisumuka. Il \u00b7 elle est sur le point de tomber.": (
        "Bua ka bua pisumuka.", "Il \u00b7 elle est sur le point de tomber.", None),
    "Defisa p": ("Defisa", "Pr\u00eater", None),
    "Dia ni ta dia buaubu. J.": ("Dia ni ta dia buaubu.", "Je mange maintenant.", None),
    "Kanga munua. F.": ("Kanga munua.", "Ferme la bouche.", None),
    "Kinkala, pr\u00e8s de Mbamou in Kongo Mfoa.": (
        "Kinkala", "Kinkala, ville pr\u00e8s de la plaine de Mbamou, au Kongo Mfua.",
        "Kinkala, town near the Mbamu plain, in Kongo Mfua."),
    "Lubomo nom originel de.": (
        "Lubomo", "Lubomo, nom originel de Dolisie.", "Lubomo, original name of Dolisie."),
    "Mpumbu nom d\u2019origine de Kinshasa.": (
        "Mpumbu", "Mpumbu, nom d'origine de Kinshasa.",
        "Mpumbu, original name of Kinshasa."),
    "Mulumba \u00b7 milumba lapin().": ("Mulumba \u00b7 milumba", "lapin(s)", "rabbit(s)"),
    "Vuku + verbe.": ("Vuku", None, None),
    "M'vu": ("Muvu", None, None),
}

# gloses francaises amputees dans les paragraphes d'index (HeadS)
HEAD_REPAIRS = {
    "es gens partent": "les gens partent",
    "erme la bouche": "ferme la bouche",
    "iens vite": "viens vite",
    "u'ils partent": "qu'ils partent",
    "r\u00eater": "pr\u00eater",
    "\u00e0 ton ventre": "fais attention \u00e0 ton ventre",
}
FR_REPAIRS = {
    "Es gens partent.": "Les gens partent.",
    "Erme la bouche.": "Ferme la bouche.",
    "Iens vite.": "Viens vite.",
    "u'ils partent": "Qu'ils partent",
    "r\u00eater": "Pr\u00eater",
    "\u00c0 ton ventre.": "Fais attention \u00e0 ton ventre.",
    "E mange maintenant.": "Je mange maintenant.",
    "Dolisie (Loubomo).": "Lubomo, nom originel de Dolisie.",
}

# entree entierement retiree : graphie fautive, l'auteur a tranche
DROP_LARI = {
    "N'mvu mia mingi.",      # n'mvu n'existe pas
    "Sa thiminu ko...",      # « th » : coquille, pas une graphie Lari
}

# ------------------------------------------------------------ B. graphies Mandombe
# cas nommes, appliques au mot entier (la cle est en minuscules)
WORD_MAP = {
    "ndjokele": "nzokele",
    "ndje": "ngie",
    "ntshila": "N'kila",
    "n'lemvo": "nlemvo",
    "nlemvo": "nlemvo",
    "nkia": "nkiya",
    "ntshia": "nkiya",
    "ntshiya": "nkiya",
    "b.awu": "bawu",
    "mzansi": "nzansi",
    "pfuka": "fuka",
    "n'zansi": "nzansi",
}

# suites, appliquees dans cet ordre a l'interieur d'un mot
# « tsh » se compose parfaitement : il est explicitement exclu des regles ts.
SEQ_RULES = [
    (r"ntsh", "nk"),       # ntsha -> nka, ntshi -> nki
    (r"nthsi", "nki"),     # coquille de ntshi
    (r"nts(?!h)", "ns"),   # ntsari -> nsari
    (r"ndj", "ndz"),       # mundjula -> mundzula, bendji -> bendzi
    (r"nj", "nz"),         # njila -> nzila
    (r"dz", "dj"),         # dzuna -> djuna
    (r"(?<!n)ts(?!h)", "ns"),  # tseki -> nseki
    (r"lw", "lu"),
    (r"fw", "fu"),
    (r"nf", "mf"),         # makonfo -> makomfo, nfinini -> mfinini
    (r"pf", "f"),
    (r"mz", "nz"),
    (r"vv", "v"),
]

# sequences de la version precedente qui declenchent une note de prononciation
PRON_TRIGGER = re.compile(
    r"(nj|dz|ts|tsh|lw|fw|pf|mz|nf|ndj|th|n'|\u2019)", re.I)

WORD_RE = re.compile(r"[A-Za-z\u00c0-\u017f'\u2019.]+")

# --- reparations mecaniques du champ Mandombe (verifiees au shaping HarfBuzz)
# 1. l'apostrophe de N'kento avait ete transformee en espace par un nettoyage
#    precedent : « N kento » laissait un N latin isole.
APOS_RE = re.compile(r"\b([NM]) (?=[bcdfgjklmnpqrstvwz])")
# 2. cadratins et espaces insecables : la police ne les compose pas
SPACE_RE = re.compile(r"[\u2000-\u200a\u202f\u00a0]")
# 3. « luaz a » : espace parasite avant la derniere lettre d'un mot
ORPHAN_RE = re.compile(r"(?<=[a-z])(?<! ) (?=[a-z]\b)")
# 4. graphie « th » : coquille tranchee par l'auteur, le mot saute
TH_WORD_RE = re.compile(r"\s*\bt[hH]s?\w*", re.I)


def repair_mandombe(text: str) -> str:
    out = SPACE_RE.sub(" ", text)
    out = APOS_RE.sub(r"\1'", out)
    out = TH_WORD_RE.sub("", out)
    out = ORPHAN_RE.sub("", out)
    out = re.sub(r"\s{2,}", " ", out).strip()
    return out


def map_word(w: str) -> str:
    low = w.lower()
    if low in WORD_MAP:
        out = WORD_MAP[low]
        return out if not w[:1].isupper() else out[0].upper() + out[1:]
    core = low
    for a, b in SEQ_RULES:
        core = re.sub(a, b, core)
    if core == low:
        return w
    return core[0].upper() + core[1:] if w[:1].isupper() else core


def map_mandombe(text: str):
    """Renvoie (texte corrige, [(avant, apres)])."""
    changes = []

    def rep(m):
        w = m.group(0)
        n = map_word(w)
        if n != w:
            changes.append((w, n))
        return n

    return WORD_RE.sub(rep, text), changes


# ------------------------------------------------------------------- outils XML
SPAN_RE = re.compile(r'<text:span text:style-name="(\w+)">(.*?)</text:span>')
PARA_RE = re.compile(r'<text:p text:style-name="(\w+)">(.*?)</text:p>', re.S)


def txt(s: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", s or ""))


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


ST_PIERRE_MAND = (
    '<text:span text:style-name="MandT">We keti </text:span>'
    '<text:span text:style-name="FrT">St Pierre</text:span>'
    '<text:span text:style-name="MandT"> kelaka muelo zulu.</text:span>'
)

stats = {k: 0 for k in (
    "lari_repare", "glose_reparee", "entree_retiree", "mandombe_corrige",
    "note_ajoutee", "st_pierre")}
samples = []


def process_para(style: str, body: str):
    """Renvoie (nouveau body, note a inserer apres, supprimer ?)."""
    fields = {}
    for st, val in SPAN_RE.findall(body):
        fields.setdefault(st, []).append(txt(val))
    lari_key = "LariT" if "LariT" in fields else ("LariS" if "LariS" in fields else None)
    lari_vals = fields.get(lari_key, []) if lari_key else []

    if any(v.strip() in DROP_LARI for v in lari_vals) and len(lari_vals) == 1:
        stats["entree_retiree"] += 1
        return body, None, True

    new = body
    pron_words = []

    # --- A. Lari + gloses
    for st, val in SPAN_RE.findall(body):
        raw = txt(val)
        key = raw.strip()
        if st in ("LariT", "LariS") and key in LARI_REPAIRS:
            lari_new, fr_new, en_new = LARI_REPAIRS[key]
            new = new.replace(
                '<text:span text:style-name="%s">%s</text:span>' % (st, val),
                '<text:span text:style-name="%s">%s</text:span>' % (st, esc(lari_new)))
            stats["lari_repare"] += 1
            samples.append("Lari : %s  ->  %s" % (key, lari_new))
            for target_st, value in (("FrT", fr_new), ("FrS", fr_new),
                                     ("EnT", en_new), ("EnS", en_new)):
                if value and target_st in fields:
                    old = fields[target_st][0]
                    new = new.replace(
                        '<text:span text:style-name="%s">%s</text:span>'
                        % (target_st, esc(old)),
                        '<text:span text:style-name="%s">%s</text:span>'
                        % (target_st, esc(value)))
                    stats["glose_reparee"] += 1
        elif st in ("FrT", "FrS", "HeadS"):
            table = HEAD_REPAIRS if st == "HeadS" else FR_REPAIRS
            if key in table:
                new = new.replace(
                    '<text:span text:style-name="%s">%s</text:span>' % (st, val),
                    '<text:span text:style-name="%s">%s</text:span>'
                    % (st, esc(table[key])))
                stats["glose_reparee"] += 1

    # --- cas nomme St Pierre : le nom reste en latin dans le bloc Mandombe
    if "We keti Sipire kelaka muelo zulu." in new:
        new = new.replace(
            '<text:span text:style-name="MandT">We keti Sipire kelaka muelo zulu.'
            "</text:span>", ST_PIERRE_MAND)
        stats["st_pierre"] += 1

    # --- B. graphies Mandombe
    for st, val in SPAN_RE.findall(new):
        if st not in ("MandT", "MandS"):
            continue
        raw = txt(val)
        fixed, changes = map_mandombe(raw)
        repaired = repair_mandombe(fixed)
        if repaired != fixed:
            changes.append((fixed, repaired))
            fixed = repaired
        if changes:
            new = new.replace(
                '<text:span text:style-name="%s">%s</text:span>' % (st, val),
                '<text:span text:style-name="%s">%s</text:span>' % (st, esc(fixed)))
            stats["mandombe_corrige"] += len(changes)
            if len(samples) < 4000:
                samples.append("Mandombe : %s" % ", ".join(
                    "%s -> %s" % c for c in changes))

    # --- note de prononciation : le Lari porte une suite non composable
    if style == "Entry" and lari_key == "LariT":
        mand = " ".join(txt(v) for s, v in SPAN_RE.findall(new) if s == "MandT")
        lari = " ".join(lari_vals)
        mset = {w.lower() for w in WORD_RE.findall(mand)}
        for w in WORD_RE.findall(lari):
            lw = w.lower().strip(".")
            if lw in mset or not PRON_TRIGGER.search(lw):
                continue
            if map_word(lw).lower().strip(".") in mset and lw not in pron_words:
                pron_words.append(lw)

    return new, (pron_words or None), False


NOTE_PARA = ('<text:p text:style-name="EntryNote">'
             '<text:span text:style-name="NoteT">%s</text:span></text:p>')


def build_note(words):
    forms = " ".join("/%s/" % w for w in words)
    return NOTE_PARA % esc("Prononc\u00e9 %s \u00b7 EN \u2014 Pronounced %s" % (forms, forms))


def main():
    with zipfile.ZipFile(SRC) as z:
        names = z.namelist()
        blobs = {n: z.read(n) for n in names}
    xml = blobs["content.xml"].decode("utf-8")

    out, last = [], 0
    pending_drop_next_note = False
    for pm in PARA_RE.finditer(xml):
        style, body = pm.group(1), pm.group(2)
        new_body, pron, drop = process_para(style, body)
        out.append(xml[last:pm.start()])
        if drop:
            pending_drop_next_note = True
        elif style == "EntryNote" and pending_drop_next_note:
            pending_drop_next_note = False  # la note orpheline part avec l'entree
        else:
            pending_drop_next_note = False
            out.append('<text:p text:style-name="%s">%s</text:p>' % (style, new_body))
            if pron:
                out.append(build_note(pron))
                stats["note_ajoutee"] += 1
        last = pm.end()
    out.append(xml[last:])
    blobs["content.xml"] = "".join(out).encode("utf-8")

    os.makedirs(os.path.dirname(DST) or ".", exist_ok=True)
    with zipfile.ZipFile(DST, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr(zipfile.ZipInfo("mimetype"),
                   blobs.pop("mimetype", b"application/vnd.oasis.opendocument.text"),
                   compress_type=zipfile.ZIP_STORED)
        for n in names:
            if n != "mimetype":
                z.writestr(n, blobs[n])

    lines = ["source : %s" % SRC, "sortie : %s" % DST, ""]
    for k, v in stats.items():
        lines.append("%-20s %d" % (k, v))
    lines.append("\n== echantillon des corrections")
    lines += ["   - " + s for s in samples[:400]]
    rep = "\n".join(lines)
    print(rep)
    if REPORT:
        open(REPORT, "w").write(rep)


main()
