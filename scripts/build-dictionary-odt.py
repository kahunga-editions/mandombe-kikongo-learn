#!/usr/bin/env python3
"""Genere un ODT pret pour impression (Amazon KDP 15.24 x 22.86 cm)
a partir du corpus du dictionnaire / traducteur Nzo Mikanda.

Usage: python scripts/build-dictionary-odt.py /tmp/dico.json /mnt/documents/xxx.odt
"""
import json
import sys
import unicodedata
import zipfile
import shutil
import os
from odf.opendocument import OpenDocumentText
from odf.style import (
    Style, TextProperties, ParagraphProperties, PageLayout, PageLayoutProperties,
    MasterPage, FontFace, Columns, Column, SectionProperties, Header, Footer,
    GraphicProperties,
)
from odf.draw import Frame, Image
from odf.text import (
    P, H, Section, PageNumber, SoftPageBreak,
)

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/dico.json"
DST = sys.argv[2] if len(sys.argv) > 2 else "/mnt/documents/dictionnaire.odt"
# Dossier d'illustrations (ZIP exporte depuis /admin/illustrations) : A.png, B.jpg, cover.png...
IMG_DIR = sys.argv[3] if len(sys.argv) > 3 else None
FONT_TTF = "/dev-server/public/fonts/masono_mandombe-webfont.ttf"

MANDOMBE_FONT = "HapaxMandombe"
BODY_FONT = "Liberation Serif"
TITLE_FONT = "Liberation Sans"


def find_illustration(slot: str):
    """Retourne le chemin de l'illustration du slot (A..Z, cover, hash) si elle existe."""
    if not IMG_DIR:
        return None
    for ext in ("png", "jpg", "jpeg", "webp"):
        p = os.path.join(IMG_DIR, f"{slot}.{ext}")
        if os.path.exists(p):
            return p
    return None



def norm(s: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn"
    ).strip()


entries = json.load(open(SRC))
clean = []
index = {}


def merge_sense(current: str, extra: str) -> str:
    """Concatene les sens distincts d'un homonyme : « echapper ; unir »."""
    extra = extra.strip()
    if not extra:
        return current
    if not current:
        return extra
    parts = [p.strip().lower() for p in current.split(" ; ")]
    if extra.lower() in parts:
        return current
    return current + " ; " + extra


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
        # Homonyme : on fusionne les sens distincts au lieu de perdre l'entree.
        rec["fr"] = merge_sense(rec["fr"], fr)
        rec["en"] = merge_sense(rec["en"], (e.get("english") or e.get("en") or "").strip())
        rec["note"] = merge_sense(rec["note"], (e.get("note") or "").strip())
        if not rec["mandombe"]:
            rec["mandombe"] = (e.get("mandombe") or "").strip()
        continue
    rec = {
        "lari": lari,
        "mandombe": (e.get("mandombe") or "").strip(),
        "fr": fr,
        "en": (e.get("english") or e.get("en") or "").strip(),
        "note": (e.get("note") or "").strip(),
        "cat": (e.get("category") or "").strip(),
        "key": k,
    }
    index[k] = rec
    clean.append(rec)
clean.sort(key=lambda x: (x["key"], x["fr"]))


doc = OpenDocumentText()

for fam in (BODY_FONT, TITLE_FONT):
    doc.fontfacedecls.addElement(FontFace(name=fam, fontfamily=fam, fontpitch="variable"))
doc.fontfacedecls.addElement(
    FontFace(name=MANDOMBE_FONT, fontfamily=MANDOMBE_FONT, fontpitch="variable")
)

# ---------- page layout (KDP 6x9 in) ----------
pl = PageLayout(name="Book")
pl.addElement(PageLayoutProperties(
    pagewidth="15.24cm", pageheight="22.86cm", printorientation="portrait",
    margintop="1.6cm", marginbottom="1.8cm", marginleft="1.8cm", marginright="1.4cm",
))
doc.automaticstyles.addElement(pl)

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


def pstyle(name, parent=None, **kw):
    text_keys = {"fontsize", "fontweight", "fontstyle", "color", "fontname",
                 "fontsizeasian", "fontnameasian", "fontweightasian",
                 "fontsizecomplex", "fontnamecomplex", "letterspacing", "texttransform"}
    tprops = {k: v for k, v in kw.items() if k in text_keys}
    pprops = {k: v for k, v in kw.items() if k not in text_keys}
    s = Style(name=name, family="paragraph", parentstylename=parent)
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


# ---------- paragraph styles ----------
BookTitle = pstyle("BookTitle", textalign="center", fontname=TITLE_FONT, fontsize="30pt",
                   fontweight="bold", margintop="5cm", marginbottom="0.4cm")
BookSub = pstyle("BookSub", textalign="center", fontname=TITLE_FONT, fontsize="13pt",
                 color="#8a5a20", marginbottom="0.3cm")
BookMandombe = pstyle("BookMandombe", textalign="center", fontname=MANDOMBE_FONT,
                      fontsize="30pt", lineheight="200%", margintop="0.8cm",
                      marginbottom="0.8cm")
BookMeta = pstyle("BookMeta", textalign="center", fontname=BODY_FONT, fontsize="10pt",
                  color="#555555")
Chapter = pstyle("Chapter", fontname=TITLE_FONT, fontsize="17pt", fontweight="bold",
                 margintop="0cm", marginbottom="0.4cm", breakbefore="page")
SubHead = pstyle("SubHead", fontname=TITLE_FONT, fontsize="12pt", fontweight="bold",
                 margintop="0.5cm", marginbottom="0.2cm", color="#8a5a20")
Body = pstyle("BodyTxt", fontname=BODY_FONT, fontsize="10.5pt", lineheight="130%",
              marginbottom="0.25cm", textalign="justify")
BodySmall = pstyle("BodySmall", fontname=BODY_FONT, fontsize="9.5pt", lineheight="130%",
                   marginbottom="0.2cm", color="#444444")
Illus = pstyle("Illus", textalign="center", fontname=BODY_FONT, fontsize="9pt",
               color="#999999", margintop="0.5cm", marginbottom="0.5cm",
               paddingtop="1.2cm", paddingbottom="1.2cm",
               borderleft="0.5pt dashed #bbbbbb", borderright="0.5pt dashed #bbbbbb",
               bordertop="0.5pt dashed #bbbbbb", borderbottom="0.5pt dashed #bbbbbb")
IllusImg = pstyle("IllusImg", textalign="center", margintop="0.3cm", marginbottom="0.4cm")
ImgStyle = Style(name="ImgFrame", family="graphic")
ImgStyle.addElement(GraphicProperties(wrap="none", verticalpos="middle", verticalrel="text"))
doc.automaticstyles.addElement(ImgStyle)
Letter = pstyle("LetterHead", textalign="center", fontname=TITLE_FONT, fontsize="22pt",
                fontweight="bold", color="#8a5a20", margintop="0.5cm",
                marginbottom="0.35cm", keepwithnext="always",
                borderbottom="1pt solid #8a5a20", paddingbottom="0.1cm")
Entry = pstyle("Entry", fontname=BODY_FONT, fontsize="9.5pt", lineheight="0.80cm",
               marginbottom="0.20cm", keeptogether="always", orphans="2", widows="2")
EntryNote = pstyle("EntryNote", fontname=BODY_FONT, fontsize="8.5pt", lineheight="0.36cm",
                   marginleft="0.35cm", marginbottom="0.14cm", color="#555555",
                   keeptogether="always")

Lari = tstyle("LariT", fontweight="bold", fontsize="9.5pt", fontname=BODY_FONT, color="#333333")
Mand = tstyle("MandT", fontname=MANDOMBE_FONT, fontsize="17pt", fontweight="bold", color="#8a5a20")
Fr = tstyle("FrT", fontname=BODY_FONT, fontsize="9.5pt")
En = tstyle("EnT", fontname=BODY_FONT, fontsize="9pt", fontstyle="italic", color="#555555")
NoteT = tstyle("NoteT", fontname=BODY_FONT, fontsize="8.5pt", fontstyle="italic")


def para(style, *runs):
    p = P(stylename=style)
    for r in runs:
        if isinstance(r, str):
            p.addText(r)
        else:
            p.addElement(r)
    doc.text.addElement(p)
    return p


def span(style, text):
    from odf.text import Span
    s = Span(stylename=style)
    s.addText(text)
    return s


# ================= FRONT MATTER =================
cover = find_illustration("cover")
if cover:
    cp = P(stylename=IllusImg)
    cf = Frame(stylename=ImgStyle, width="11.5cm", height="8.6cm", anchortype="as-char")
    cf.addElement(Image(href=doc.addPicture(cover)))
    cp.addElement(cf)
    doc.text.addElement(cp)
para(BookTitle, "BUKU DIA BINSONO")
para(BookSub, "Dictionnaire Kikongo Lari – Français – English")
para(BookMandombe, "Buku dia Binsono")
para(BookMeta, f"{len(clean)} entrées · Écriture Mandombe")
para(BookMeta, "Nzo Mikanda")

para(Chapter, "Avant-propos")
para(Body,
     "Ce dictionnaire rassemble le lexique et les expressions du Kikongo Lari tels qu'ils "
     "sont enseignés sur la plateforme Nzo Mikanda. Chaque entrée donne la forme en Lari, "
     "sa transcription en écriture Mandombe, puis le sens en français et en anglais.")
para(Body,
     "Le corpus provient exclusivement de sources attestées : aucune forme n'a été inventée "
     "ni empruntée au Kituba ou au Lingala. Lorsqu'une nuance culturelle ou grammaticale "
     "existe, elle est signalée en note sous l'entrée.")
para(Body,
     "L'écriture Mandombe, mise au jour par Wabeladio Payi, est reproduite ici avec la police "
     "Masono Mandombe, intégrée au fichier. Si les caractères ne s'affichent pas, installez "
     "la police sur votre système.")

para(Chapter, "Prononciation")
para(SubHead, "Voyelles")
para(Body, "a, e, i, o, u se prononcent comme en français. Le u se lit /ou/ (comme dans « roue »). "
           "Une voyelle peut être allongée : zaba se prononce zaaba.")
para(SubHead, "Consonnes et groupes")
for line in [
    "g : toujours dur, comme dans « gare » — jamais /ʒ/.",
    "j : comme le j français /ʒ/ — bujitu (respect), mbaji, jimbakane.",
    "sh : comme le sh anglais de « shoes » — moshi.",
    "nz : nzila se prononce /ndjila/.",
    "ns : nsoneka (écrire) se prononce /tsoneka/.",
    "nk : nkima (singe) se prononce /ntshima/.",
    "dj : djunu (la paix) se prononce /dzunu/.",
]:
    para(BodySmall, "• " + line)

para(Chapter, "Mode d'emploi")
para(Body, "Les entrées sont classées par ordre alphabétique de la forme Lari. "
           "Chaque entrée se présente ainsi :")
p = P(stylename=Entry)
p.addElement(span(Mand, "Mbote"))
p.addText("   ")
p.addElement(span(Lari, "Mbote"))
p.addText("   ")
p.addElement(span(Fr, "bonjour"))
p.addText("  ·  ")
p.addElement(span(En, "hello"))
doc.text.addElement(p)
para(BodySmall, "écriture Mandombe en premier, en grand et en brun · forme Lari latine en gras · sens français · sens anglais en italique")

# ================= DICTIONARY (2 columns) =================
sec_style = Style(name="DictSec", family="section")
cols = Columns(columncount=2, columngap="0.55cm")
cols.addElement(Column(relwidth="1*", startindent="0cm", endindent="0.27cm"))
cols.addElement(Column(relwidth="1*", startindent="0.27cm", endindent="0cm"))
sp = SectionProperties()
sp.addElement(cols)
sec_style.addElement(sp)
doc.automaticstyles.addElement(sec_style)

para(Chapter, "Dictionnaire Lari – Français – English")

section = Section(name="Dico", stylename=sec_style)
doc.text.addElement(section)


def sadd(style, runs, notes=None):
    p = P(stylename=style)
    for r in runs:
        if isinstance(r, str):
            p.addText(r)
        else:
            p.addElement(r)
    section.addElement(p)


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
        slot = first if first.isalpha() else "hash"
        path = find_illustration(slot)
        if path:
            ip = P(stylename=IllusImg)
            href = doc.addPicture(path)
            frame = Frame(stylename=ImgStyle, width="5.2cm", height="3.9cm",
                          anchortype="as-char")
            frame.addElement(Image(href=href))
            ip.addElement(frame)
            section.addElement(ip)
        else:
            ip = P(stylename=Illus)
            ip.addText("[ illustration — lettre %s ]" % first)
            section.addElement(ip)

    runs = []
    if e["mandombe"]:
        runs += [span(Mand, e["mandombe"]), "   "]
    runs += [span(Lari, e["lari"])]
    runs += ["  ", span(Fr, e["fr"])]
    if e["en"]:
        runs += ["  ·  ", span(En, e["en"])]
    sadd(Entry, runs)
    if e["note"]:
        np = P(stylename=EntryNote)
        np.addElement(span(NoteT, e["note"]))
        section.addElement(np)

para(Chapter, "Index thematique")
para(Body, "Les entrées de ce dictionnaire sont issues des modules d'apprentissage suivants :")
cats = []
for e in clean:
    if e["cat"] and e["cat"] not in cats:
        cats.append(e["cat"])
for c in sorted(cats):
    para(BodySmall, "• " + c)

para(Chapter, "À propos")
para(Body, "Nzo Mikanda est une plateforme d'apprentissage du Kikongo Lari et de l'écriture "
           "Mandombe : leçons progressives, exercices interactifs, dictionnaire, traducteur "
           "et prononciation audio.")
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
import os
os.remove(tmp)
print("OK", DST, len(clean), "entries")
