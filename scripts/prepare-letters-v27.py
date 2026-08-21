#!/usr/bin/env python3
"""Lettrines du dictionnaire : le glyphe Mandombe seul.

Aucune translitteration latine, aucune traduction sous la lettre : la carte ne
porte que le mot en Mandombe, dore sur fond marron.

Sortie : reports/letters-v27.json  { Pictures/xxx.png : /tmp/letters27/X.png }
"""
import asyncio
import base64
import html
import json
import os
import pathlib
import re
import sys
import unicodedata
import zipfile

from PIL import Image, ImageDraw
from playwright.async_api import async_playwright

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mandombe_typing import to_mandombe  # noqa: E402

SRC = sys.argv[1] if len(sys.argv) > 1 else "/mnt/documents/dictionnaire-lari-v26.odt"
OUT = "/tmp/letters27"
os.makedirs(OUT, exist_ok=True)
W = H = 1024
FB = base64.b64encode(
    pathlib.Path("public/fonts/masono_mandombe-webfont.ttf").read_bytes()).decode()

TPL = """<html><head><style>
@font-face{{font-family:M;src:url('data:font/ttf;base64,%s');}}
html,body{{margin:0;background:transparent}}
div{{font-family:M;font-size:260px;color:#e0b256;line-height:1.6;padding:200px 60px;
white-space:nowrap;display:inline-block}}
</style></head><body><div>{m}</div></body></html>""" % FB


def norm(s):
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def pick_words():
    entries = json.load(open("supabase/functions/_shared/dictionary.json"))
    best = {}
    for e in entries:
        lari = (e.get("lari") or "").strip()
        if not lari or " " in lari or not (3 <= len(lari) <= 9):
            continue
        k = norm(lari)[0].upper()
        if not k.isalpha():
            continue
        if k not in best or len(lari) < len(best[k]):
            best[k] = lari
    for e in entries:
        lari = (e.get("lari") or "").strip()
        if not lari or len(lari) > 14:
            continue
        k = norm(lari)[0].upper()
        if k.isalpha() and k not in best:
            best[k] = lari
    return best


def picture_letters():
    x = zipfile.ZipFile(SRC).read("content.xml").decode("utf-8")
    out = []
    for m in re.finditer(r'<text:p text:style-name="IllusImg">.*?</text:p>',
                         x, re.S):
        pic = re.search(r'(Pictures/\w+\.png)', m.group(0)).group(1)
        nxt = re.search(r'<text:span text:style-name="LariT">(.*?)</text:span>',
                        x[m.end():m.end() + 4000])
        letter = norm(html.unescape(nxt.group(1)).strip())[0].upper() if nxt else "?"
        out.append((pic, letter))
    return out


def bg(img, d):
    for y in range(H):
        t = abs(y - 330) / H
        c = tuple(int(a + (b - a) * min(t * 1.5, 1))
                  for a, b in zip((58, 35, 20), (31, 18, 9)))
        d.line([(0, y), (W, y)], fill=c)
    d.rectangle([38, 38, W - 38, H - 38], outline=(138, 106, 46), width=3)
    d.rectangle([56, 56, W - 56, H - 56], outline=(92, 66, 31), width=1)


def card(glyph_path, out):
    img = Image.new("RGB", (W, H), (36, 21, 9))
    d = ImageDraw.Draw(img)
    bg(img, d)
    g = Image.open(glyph_path).convert("RGBA")
    b = g.getbbox()
    if b:
        g = g.crop(b)
    r = min((W - 260) / g.width, (H - 300) / g.height)
    g = g.resize((max(1, int(g.width * r)), max(1, int(g.height * r))),
                 Image.LANCZOS)
    img.paste(g, ((W - g.width) // 2, (H - g.height) // 2), g)
    img.save(out, quality=94)


async def main():
    best = pick_words()
    pics = picture_letters()
    mapping = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={"width": 2400, "height": 1600})
        pg = await ctx.new_page()
        for pic, letter in pics:
            word = best.get(letter)
            if not word:
                print("pas de mot pour", letter)
                continue
            mand = to_mandombe(word[:1].upper() + word[1:])
            await pg.set_content(TPL.format(m=html.escape(mand)))
            await pg.wait_for_timeout(200)
            gp = "%s/_g_%s.png" % (OUT, letter)
            await pg.screenshot(path=gp, omit_background=True)
            dest = "%s/%s.png" % (OUT, letter)
            card(gp, dest)
            os.remove(gp)
            mapping[pic] = dest
            print(letter, word, "->", mand)
        await b.close()
    os.makedirs("reports", exist_ok=True)
    json.dump(mapping, open("reports/letters-v27.json", "w"), indent=1)
    print("lettrines :", len(mapping))


asyncio.run(main())
