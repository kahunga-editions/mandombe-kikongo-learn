#!/usr/bin/env python3
"""Dictionnaire coreen — scission en deux volumes (conformite Amazon KDP).

Le v25 coreen fait 839 pages : au-dessus de la limite KDP (828 pages, broche
encre noire, papier blanc). On ne compacte RIEN : meme mise en page, memes
tailles, memes marges. Le contenu est simplement scinde en deux tomes, la
coupure tombant sur une frontiere d'index.

  Volume I  : couverture + avant-propos (FR / EN / KO) + Prononciation
              + Mode d'emploi + Index I (Lari) + Index II (Francais)
  Volume II : couverture + rappel court d'utilisation
              + Index III (English) + Index IV (Coreen) + Annexe + A propos

Usage:
  python scripts/build-dictionary-odt-v26-ko.py <v25-ko.odt> <vol1.odt> <vol2.odt>
"""
import asyncio
import base64
import html
import os
import pathlib
import re
import subprocess
import sys
import zipfile

from PIL import Image, ImageDraw, ImageFont

SRC, DST1, DST2 = sys.argv[1], sys.argv[2], sys.argv[3]

SERIF = subprocess.check_output(["fc-match", "-f", "%{file}", "DejaVu Serif"], text=True).strip()
SANS = subprocess.check_output(["fc-match", "-f", "%{file}", "DejaVu Sans"], text=True).strip()
CJK = subprocess.check_output(["fc-match", "-f", "%{file}", "Noto Sans CJK KR"], text=True).strip()
MANDOMBE_TTF = "/dev-server/public/fonts/masono_mandombe-webfont.ttf"


def cjk_font(size):
    """Le .ttc regroupe SC/TC/HK/JP/KR : on retient l'index qui rend le hangul."""
    for idx in range(6):
        try:
            f = ImageFont.truetype(CJK, size, index=idx)
        except Exception:
            break
        img = Image.new("L", (size * 3, size * 3), 0)
        ImageDraw.Draw(img).text((2, 2), "\ud55c\uad6d\uc5b4", font=f, fill=255)
        if img.getbbox():
            return f
    raise RuntimeError("aucune fonte hangul utilisable")


# ------------------------------------------------------------------ couverture
FB = base64.b64encode(pathlib.Path(MANDOMBE_TTF).read_bytes()).decode()
TPL = """<html><head><style>
@font-face{{font-family:M;src:url('data:font/ttf;base64,%s');}}
html,body{{margin:0;background:transparent}}
div{{font-family:M;font-size:260px;color:#e0b256;line-height:1.6;padding:200px 60px;
white-space:nowrap;display:inline-block}}
</style></head><body><div>{m}</div></body></html>""" % FB


async def render_glyphs(items):
    from playwright.async_api import async_playwright
    out = {}
    os.makedirs("/tmp/kocover", exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        pg = await (await b.new_context(viewport={"width": 2400, "height": 1600})).new_page()
        for key, text in items:
            await pg.set_content(TPL.format(m=html.escape(text)))
            await pg.wait_for_timeout(200)
            path = "/tmp/kocover/_g_%s.png" % key
            await pg.screenshot(path=path, omit_background=True)
            out[key] = path
        await b.close()
    return out


def cover_portrait(glyph_title, glyph_brand, volume_ko, volume_fr, out):
    """Couverture coreenne pleine page : Mandombe d'abord, mention du tome."""
    CW, CH = 1024, 1536
    img = Image.new("RGB", (CW, CH), (36, 21, 9))
    d = ImageDraw.Draw(img)
    for y in range(CH):
        t = abs(y - 500) / CH
        c = tuple(int(a + (b - a) * min(t * 1.5, 1)) for a, b in zip((58, 35, 20), (31, 18, 9)))
        d.line([(0, y), (CW, y)], fill=c)
    d.rectangle([46, 46, CW - 46, CH - 46], outline=(138, 106, 46), width=3)
    d.rectangle([66, 66, CW - 66, CH - 66], outline=(92, 66, 31), width=1)

    def paste(glyph_path, top, maxh, maxw=CW - 200):
        g = Image.open(glyph_path).convert("RGBA")
        bb = g.getbbox()
        if bb:
            g = g.crop(bb)
        r = min(maxw / g.width, maxh / g.height)
        g = g.resize((max(1, int(g.width * r)), max(1, int(g.height * r))), Image.LANCZOS)
        img.paste(g, ((CW - g.width) // 2, top + (maxh - g.height) // 2), g)

    def ctr(text, font, y, fill):
        b = d.textbbox((0, 0), text, font=font)
        d.text(((CW - (b[2] - b[0])) / 2 - b[0], y), text, font=font, fill=fill)

    paste(glyph_title, 180, 340)
    ctr("Buku dia Binsono", ImageFont.truetype(SERIF, 66), 640, (224, 178, 86))
    ctr("Dictionnaire Kikongo Lari - Mandombe", ImageFont.truetype(SANS, 29), 736, (192, 160, 117))
    ctr("Francais \u00b7 English \u00b7 \ud55c\uad6d\uc5b4", cjk_font(30), 784, (224, 178, 86))
    ctr("\ud0a4\肯\uace0 \ub77c\ub9ac\uc5b4 \u00b7 \ub9cc\ub3d9\ubca0 \ubb38\uc790 \uc0ac\uc804", cjk_font(26), 832, (192, 160, 117))
    ctr("4\uac1c \uc5b8\uc5b4 \u00b7 Quatre index de recherche", cjk_font(24), 878, (192, 160, 117))
    d.line([(CW / 2 - 90, 946), (CW / 2 + 90, 946)], fill=(138, 106, 46), width=1)
    ctr("%s \u00b7 %s" % (volume_ko, volume_fr), cjk_font(34), 976, (224, 178, 86))
    paste(glyph_brand, 1046, 130, maxw=520)
    ctr("Nzo Mikanda", ImageFont.truetype(SERIF, 42), 1258, (224, 178, 86))
    ctr("www.nzomikanda.com", ImageFont.truetype(SANS, 26), 1320, (138, 106, 46))
    img.save(out, quality=94)


# ------------------------------------------------------------------ textes ODT
def P(style, content):
    return '<text:p text:style-name="%s">%s</text:p>' % (style, content)


def KO(text):
    return '<text:span text:style-name="KoT">%s</text:span>' % text


KO_FOREWORD = [
    "\uc774 \uc0ac\uc804\uc740 Nzo Mikanda \ud50c\ub7ab\ud3fc\uc5d0\uc11c \uac00\ub974\uce58\ub294 "
    "\ud0a4\肯\uace0 \ub77c\ub9ac\uc5b4\uc758 \uc5b4\ud718\uc640 \ud45c\ud604\uc744 \ubaa8\uc740 \ucc45\uc785\ub2c8\ub2e4. "
    "\uac01 \ud45c\uc81c\uc5b4\ub294 \uba3c\uc800 \ub9cc\ub3d9\ubca0 \ubb38\uc790\ub85c, \uadf8\ub2e4\uc74c \ub77c\ud2f4 "
    "\ud45c\uae30\ub85c \uc81c\uc2dc\ub418\uba70, \uc774\uc5b4\uc11c \ud504\ub791\uc2a4\uc5b4 \u00b7 \uc601\uc5b4 \u00b7 "
    "\ud55c\uad6d\uc5b4 \ub73b\uc774 \ub530\ub985\ub2c8\ub2e4. \uc218\ub85d\ub41c \ub9d0\uc740 Mbamu \uc9c0\uc5ed\uc758 "
    "\ud0a4\肯\uace0 \ub77c\ub9ac\uc5b4\uc785\ub2c8\ub2e4.",
    "\ubaa8\ub4e0 \uc790\ub8cc\ub294 \uc2e4\uc99d\ub41c \ucd9c\ucc98\uc5d0\uc11c\ub9cc \uac00\uc838\uc654\uc2b5\ub2c8\ub2e4. "
    "\uc9c0\uc5b4\ub0b8 \ud615\ud0dc\ub098 \ud0a4\ud22c\ubc14 \u00b7 \ub9c1\uac08\ub77c\uc5d0\uc11c \ube4c\ub824\uc628 "
    "\ub9d0\uc740 \uc5c6\uc2b5\ub2c8\ub2e4. \ubb38\ud654\uc801 \u00b7 \ubb38\ubc95\uc801 \uc124\uba85\uc774 \ud544\uc694\ud55c "
    "\uacbd\uc6b0\uc5d0\ub294 \ud45c\uc81c\uc5b4 \uc544\ub798\uc5d0 \uc8fc\uc11d\uc73c\ub85c \ubd99\uc600\uc2b5\ub2c8\ub2e4.",
    "\uc774 \ucc45\uc740 \ub124 \uac1c\uc758 \uc0c9\uc778\uc744 \uac16\uace0 \uc788\uc2b5\ub2c8\ub2e4. "
    "\uc81c1\uad8c\uc5d0\ub294 \uc0c9\uc778 I(\ud0a4\肯\uace0 \ub77c\ub9ac\uc5b4)\uc640 \uc0c9\uc778 II(\ud504\ub791\uc2a4\uc5b4)\uac00, "
    "\uc81c2\uad8c\uc5d0\ub294 \uc0c9\uc778 III(\uc601\uc5b4)\uc640 \uc0c9\uc778 IV(\ud55c\uad6d\uc5b4), "
    "\uadf8\ub9ac\uace0 \ub3d9\uc0ac \ud65c\uc6a9 \ubd80\ub85d\uc774 \uc2e4\ub824 \uc788\uc2b5\ub2c8\ub2e4. "
    "\uc5b4\ub290 \uc0c9\uc778\uc5d0\uc11c\ub4e0 \ub9cc\ub3d9\ubca0 \ubb38\uc790\uc640 \ub77c\ud2f4 \ud45c\uae30\uac00 "
    "\ud56d\uc0c1 \ud568\uaed8 \ud45c\uc2dc\ub429\ub2c8\ub2e4.",
    "\ub9cc\ub3d9\ubca0 \ubb38\uc790\ub294 \uc9c0\ub09c \uc138\uae30\uc5d0 Wabeladio Payi \uad50\uc218\uac00 "
    "\uc804\ud574 \uc900 \ubb38\uc790\uc785\ub2c8\ub2e4. \ubc1c\uc74c\uc744 \ub4e3\uace0 \uc5b4\ud718\ub97c \ubcf5\uc2b5\ud558\uba70 "
    "\uc628\ub77c\uc778\uc73c\ub85c \uacc4\uc18d \ubc30\uc6b0\ub824\uba74 www.nzomikanda.com \uc744 "
    "\ubc29\ubb38\ud558\uc138\uc694.",
]

VOL2_INTRO_FR = ("Ce second tome contient l'Index III (English \u2192 Fran\u00e7ais \u2192 Kikongo Lari), "
                 "l'Index IV (\ud55c\uad6d\uc5b4 \u2192 Kikongo Lari \u2192 Fran\u00e7ais) et l'annexe des conjugaisons. "
                 "L'avant-propos, la prononciation, l'Index I (Kikongo Lari) et l'Index II (fran\u00e7ais) "
                 "se trouvent dans le tome I.")
VOL2_INTRO_EN = ("This second volume contains Index III (English \u2192 French \u2192 Kikongo Lari), "
                 "Index IV (Korean \u2192 Kikongo Lari \u2192 French) and the conjugation appendix. "
                 "The foreword, pronunciation, Index I (Kikongo Lari) and Index II (French) "
                 "are in volume I.")
VOL2_INTRO_KO = ("\uc81c2\uad8c\uc5d0\ub294 \uc0c9\uc778 III(\uc601\uc5b4), \uc0c9\uc778 IV(\ud55c\uad6d\uc5b4), "
                 "\uadf8\ub9ac\uace0 \ub3d9\uc0ac \ud65c\uc6a9 \ubd80\ub85d\uc774 \uc2e4\ub824 \uc788\uc2b5\ub2c8\ub2e4. "
                 "\uba38\ub9ac\ub9d0\uacfc \ubc1c\uc74c, \uc0c9\uc778 I \u00b7 II \ub294 \uc81c1\uad8c\uc5d0 "
                 "\uc788\uc2b5\ub2c8\ub2e4.")


def korean_foreword_block():
    out = [P("Chapter", KO("\uba38\ub9ac\ub9d0"))]
    for para in KO_FOREWORD:
        out.append(P("BodyTxt", KO(para)))
    return "".join(out)


def volume_line(ko, fr):
    return P("BookMeta", KO("%s \u00b7 %s" % (ko, fr)))


def main():
    with zipfile.ZipFile(SRC) as z:
        names = z.namelist()
        blobs = {n: z.read(n) for n in names}

    xml = blobs["content.xml"].decode("utf-8")
    cover_name = re.search(r'xlink:href="(Pictures/[^"]+)"', xml).group(1)

    head_end = xml.index("<office:text>") + len("<office:text>")
    head = xml[:head_end]
    body = xml[head_end:]
    tail = "</office:text></office:body></office:document-content>"
    body = body[: body.rindex("</office:text>")]

    # -- corrections communes ------------------------------------------------
    body = body.replace(
        "L'ouvrage comporte trois index : on peut chercher un mot \u00e0 partir du Kikongo Lari, "
        "\u00e0 partir du fran\u00e7ais ou \u00e0 partir de l'anglais.",
        "L'ouvrage comporte quatre index : on peut chercher un mot \u00e0 partir du Kikongo Lari, "
        "du fran\u00e7ais, de l'anglais ou du cor\u00e9en. Les index I et II figurent dans le tome I, "
        "les index III et IV dans le tome II.")
    body = body.replace(
        "The book has three indexes: a word can be looked up from Kikongo Lari, from French or from English.",
        "The book has four indexes: a word can be looked up from Kikongo Lari, French, English or Korean. "
        "Indexes I and II are in volume I, indexes III and IV in volume II.")
    n_index = body.count("quatre index") + body.count("four indexes")

    # -- avant-propos coreen apres le Foreword anglais ------------------------
    anchor = body.index('<text:p text:style-name="Chapter">Prononciation')
    body = body[:anchor] + korean_foreword_block() + body[anchor:]

    # -- decoupe -------------------------------------------------------------
    split = body.index('<text:p text:style-name="Chapter">Index III')
    front_end = body.index('<text:p text:style-name="Chapter">Index I \u2014')
    front = body[:front_end]
    vol1 = body[:split]
    vol2_body = body[split:]

    # mention du tome sur la page de titre
    mark = '<text:p text:style-name="BookMandombe">Nzo Mikanda</text:p>'
    vol1 = vol1.replace(mark, volume_line("\uc81c1\uad8c", "Volume I") + mark, 1)

    # tome II : page de titre + rappel court, puis les index restants
    vol2_front = front.replace(mark, volume_line("\uc81c2\uad8c", "Volume II") + mark, 1)
    cut = vol2_front.index('<text:p text:style-name="Chapter">Avant-propos')
    vol2_front = vol2_front[:cut] + "".join([
        P("Chapter", "Tome II \u00b7 Volume II"),
        P("BodyTxt", VOL2_INTRO_FR),
        P("BodySmall", VOL2_INTRO_EN),
        P("BodyTxt", KO(VOL2_INTRO_KO)),
    ])
    vol2 = vol2_front + vol2_body

    covers = asyncio.run(render_glyphs([("title", "Buku dia Binsono"), ("brand", "Nzo Mikanda")]))
    cover_portrait(covers["title"], covers["brand"], "\uc81c1\uad8c", "Volume I", "/tmp/kocover/vol1.png")
    cover_portrait(covers["title"], covers["brand"], "\uc81c2\uad8c", "Volume II", "/tmp/kocover/vol2.png")

    for dst, part, cover in ((DST1, vol1, "/tmp/kocover/vol1.png"), (DST2, vol2, "/tmp/kocover/vol2.png")):
        out_blobs = dict(blobs)
        out_blobs["content.xml"] = (head + part + tail).encode("utf-8")
        out_blobs[cover_name] = pathlib.Path(cover).read_bytes()
        os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
        with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as z:
            z.writestr(zipfile.ZipInfo("mimetype"),
                       out_blobs.pop("mimetype", b"application/vnd.oasis.opendocument.text"),
                       compress_type=zipfile.ZIP_STORED)
            for n in names:
                if n == "mimetype":
                    continue
                z.writestr(n, out_blobs[n])
        print("%s : %d caracteres de corps" % (dst, len(part)))

    print("mentions d'index corrigees =", n_index)
    print("avant-propos coreen = %d paragraphes" % len(KO_FOREWORD))


main()
