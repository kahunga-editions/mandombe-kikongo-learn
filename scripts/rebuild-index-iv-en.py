#!/usr/bin/env python3
"""Index IV : ajouter la glose anglaise.

L'Index IV de la v25 coreenne ne comportait que coreen / Mandombe / Lari /
francais. On reconstruit ce seul index a partir des entrees de l'Index I du
document lui-meme (qui portent deja la glose coreenne KoT et anglaise EnT),
sans toucher au reste du document.

Usage: python scripts/rebuild-index-iv-en.py <v25-ko.odt> <out.odt>
"""
import html
import os
import re
import sys
import zipfile

SRC, DST = sys.argv[1], sys.argv[2]

SPAN_RE = re.compile(
    r'<text:span text:style-name="(MandT|LariT|FrT|EnT|KoT|NoteT)">(.*?)</text:span>')
ENTRY_RE = re.compile(r'<text:p text:style-name="Entry">(.*?)</text:p>', re.S)


def txt(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or "")).strip()


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def read_entries(xml):
    out = []
    for m in ENTRY_RE.finditer(xml):
        f = {k: txt(v) for k, v in SPAN_RE.findall(m.group(1))}
        if not f.get("LariT") or not f.get("FrT") or not f.get("KoT"):
            continue
        out.append({
            "mandombe": f.get("MandT", ""),
            "lari": f["LariT"],
            "fr": f["FrT"],
            "en": f.get("EnT", ""),
            "ko": f["KoT"],
        })
    return out


TITLE = ('<text:p text:style-name="Chapter">Index IV \u2014 \ud55c\uad6d\uc5b4 \u2192 '
         'Kikongo Lari \u2192 Fran\u00e7ais \u00b7 English</text:p>')


def build_index(entries):
    rows, seen = [], set()
    for e in entries:
        for sense in re.split(r"\s*;\s*", e["ko"]):
            sense = sense.strip(" .")
            if not sense or len(e["lari"].split()) > 4:
                continue
            k = (sense, e["lari"])
            if k in seen:
                continue
            seen.add(k)
            rows.append((sense, e["mandombe"] or e["lari"], e["lari"], e["fr"], e["en"]))
    rows.sort(key=lambda r: r[0])

    out = [TITLE]
    n_en = 0
    for ko, mand, lari, fr, en in rows:
        line = ('<text:p text:style-name="KoEntry">'
                '<text:span text:style-name="KoT">%s</text:span>  \u00b7  '
                '<text:span text:style-name="MandT">%s</text:span>  '
                '<text:span text:style-name="LariT">%s</text:span>  '
                '<text:span text:style-name="FrT">%s</text:span>'
                % (esc(ko), esc(mand), esc(lari), esc(fr)))
        if en:
            n_en += 1
            line += ('  \u00b7  <text:span text:style-name="EnT">%s</text:span>' % esc(en))
        out.append(line + "</text:p>")
    return "".join(out), len(rows), n_en


def main():
    with zipfile.ZipFile(SRC) as z:
        names = z.namelist()
        blobs = {n: z.read(n) for n in names}
    xml = blobs["content.xml"].decode("utf-8")

    start = xml.index('<text:p text:style-name="Chapter">Index IV')
    end = xml.index('<text:p text:style-name="Chapter">Annexe')
    entries = read_entries(xml[:start])

    block, n_rows, n_en = build_index(entries)
    xml = xml[:start] + block + xml[end:]
    blobs["content.xml"] = xml.encode("utf-8")

    os.makedirs(os.path.dirname(DST) or ".", exist_ok=True)
    with zipfile.ZipFile(DST, "w", zipfile.ZIP_DEFLATED) as out:
        out.writestr(zipfile.ZipInfo("mimetype"),
                     blobs.pop("mimetype", b"application/vnd.oasis.opendocument.text"),
                     compress_type=zipfile.ZIP_STORED)
        for n in names:
            if n != "mimetype":
                out.writestr(n, blobs[n])

    print("entrees coreennes sources = %d" % len(entries))
    print("index IV = %d lignes ; avec anglais = %d" % (n_rows, n_en))
    print("sortie =", DST)


main()
