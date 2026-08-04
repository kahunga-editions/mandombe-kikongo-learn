import json, os, unicodedata, asyncio, html, subprocess
from PIL import Image, ImageDraw, ImageFont
from playwright.async_api import async_playwright
OUT="/tmp/letters"; os.makedirs(OUT,exist_ok=True)
import base64, pathlib
FB=base64.b64encode(pathlib.Path("/dev-server/public/fonts/masono_mandombe-webfont.ttf").read_bytes()).decode()
SERIF=subprocess.check_output(["fc-match","-f","%{file}","DejaVu Serif"],text=True).strip()
SANS=subprocess.check_output(["fc-match","-f","%{file}","DejaVu Sans"],text=True).strip()
W=H=1024
def norm(s): return "".join(c for c in unicodedata.normalize("NFD",s) if unicodedata.category(c)!="Mn")
entries=json.load(open("/dev-server/supabase/functions/_shared/dictionary.json"))
best={}
for e in entries:
    lari=(e.get("lari") or "").strip(); m=(e.get("mandombe") or "").strip(); fr=(e.get("fr") or "").strip()
    if not lari or not m or not fr or " " in lari or not (3<=len(lari)<=9): continue
    k=norm(lari)[0].upper()
    if not k.isalpha(): continue
    if k not in best or len(lari)<len(best[k][0]): best[k]=(lari,m,fr)

for e in entries:
    lari=(e.get("lari") or "").strip(); m=(e.get("mandombe") or "").strip(); fr=(e.get("fr") or "").strip()
    if not lari or not m or not fr: continue
    k=norm(lari)[0].upper()
    if not k.isalpha() or k in best: continue
    if len(lari)>14: continue
    best[k]=(lari,m,fr)

TPL="""<html><head><style>
@font-face{{font-family:M;src:url('data:font/ttf;base64,%s');}}
html,body{{margin:0;background:transparent}}
div{{font-family:M;font-size:260px;color:#e0b256;line-height:1.6;padding:200px 60px;
white-space:nowrap;display:inline-block}}
</style></head><body><div>{m}</div></body></html>""" % FB

async def render_glyphs(items):
    res={}
    async with async_playwright() as p:
        b=await p.chromium.launch(headless=True)
        ctx=await b.new_context(viewport={"width":2400,"height":1600})
        pg=await ctx.new_page()
        for key,m in items:
            await pg.set_content(TPL.format(m=html.escape(m)))
            await pg.wait_for_timeout(200)
            path=f"/tmp/letters/_g_{key}.png"
            await pg.screenshot(path=path, omit_background=True)
            res[key]=path
        await b.close()
    return res

def bg(img,d):
    for y in range(H):
        t=abs(y-330)/H
        c=tuple(int(a+(b-a)*min(t*1.5,1)) for a,b in zip((58,35,20),(31,18,9)))
        d.line([(0,y),(W,y)],fill=c)
    d.rectangle([38,38,W-38,H-38],outline=(138,106,46),width=3)
    d.rectangle([56,56,W-56,H-56],outline=(92,66,31),width=1)

def paste_glyph(img,glyph_path,top,maxh,maxw=W-320):
    g=Image.open(glyph_path).convert("RGBA")
    bb=g.getbbox()
    if bb: g=g.crop(bb)
    r=min(maxw/g.width,maxh/g.height)
    g=g.resize((max(1,int(g.width*r)),max(1,int(g.height*r))),Image.LANCZOS)
    img.paste(g,((W-g.width)//2,top+(maxh-g.height)//2),g)

def card(glyph_path,lari,fr,out):
    """Illustration de lettre : le mot en Mandombe, puis sa translitteration et son sens."""
    img=Image.new("RGB",(W,H),(36,21,9)); d=ImageDraw.Draw(img)
    bg(img,d)
    paste_glyph(img,glyph_path,230,470)
    def ctr(text,font,y,fill):
        b=d.textbbox((0,0),text,font=font)
        d.text(((W-(b[2]-b[0]))/2-b[0],y),text,font=font,fill=fill)
    d.line([(W/2-60,780),(W/2+60,780)],fill=(138,106,46),width=1)
    ctr(lari,ImageFont.truetype(SERIF,64),820,(224,178,86))
    ctr(fr,ImageFont.truetype(SANS,34),910,(192,160,117))
    img.save(out,quality=94)

def cover(glyph_title,glyph_brand,out):
    """Couverture : Mandombe d'abord, puis le latin. Nzo Mikanda toujours accompagne du Mandombe."""
    img=Image.new("RGB",(W,H),(36,21,9)); d=ImageDraw.Draw(img)
    bg(img,d)
    paste_glyph(img,glyph_title,140,340)
    def ctr(text,font,y,fill):
        b=d.textbbox((0,0),text,font=font)
        d.text(((W-(b[2]-b[0]))/2-b[0],y),text,font=font,fill=fill)
    ctr("Buku dia Binsono",ImageFont.truetype(SERIF,62),520,(224,178,86))
    ctr("Dictionnaire Kikongo Lari - Mandombe",ImageFont.truetype(SANS,30),605,(192,160,117))
    d.line([(W/2-90,680),(W/2+90,680)],fill=(138,106,46),width=1)
    paste_glyph(img,glyph_brand,720,130,maxw=520)
    ctr("Nzo Mikanda",ImageFont.truetype(SERIF,40),880,(224,178,86))
    ctr("www.nzomikanda.com",ImageFont.truetype(SANS,24),940,(138,106,46))
    img.save(out,quality=94)

async def main():
    items=[(L,best[L][1]) for L in sorted(best)]
    items+= [("cover","Buku dia Binsono"),("brand","Nzo Mikanda"),("hash","Ntalu")]
    g=await render_glyphs(items)
    for L in sorted(best):
        lari,m,fr=best[L]; card(g[L],lari,fr,f"{OUT}/{L}.png")
    cover(g["cover"],g["brand"],f"{OUT}/cover.png")
    card(g["hash"],"Ntalu","Les nombres / Numbers",f"{OUT}/hash.png")
    for f in os.listdir(OUT):
        if f.startswith("_g_"): os.remove(os.path.join(OUT,f))
    print("ok",sorted(best))
asyncio.run(main())
