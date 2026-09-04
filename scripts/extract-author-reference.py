#!/usr/bin/env python3
"""Extrait le texte des documents fournis par l'autrice (reference d'attestation).

Exclut : la these Jacquot (12138*), les livres generes par l'application
(dictionnaire-lari-v*.odt, Buku-dia-Binsono-*.odt, mots croises), les MP3,
les webfonts et les scripts. Produit data/validated-by-author.txt.
"""
import json
import re
import sys
import unicodedata
import zipfile
from pathlib import Path

UPLOADS = Path("/mnt/user-uploads")
if not UPLOADS.is_dir():
    UPLOADS = Path("/tmp/user-uploads")
OUT = Path("data/validated-by-author.txt")
MEMORY = Path(".lovable/memory")

EXCLUDE = re.compile(
    r"^(12138|Buku-dia-Binsono|dictionnaire-lari-v|mots_crois|ElevenLabs_|"
    r"Voice_1\.1|lungolobi|Lungolobi|Les_accords_des_chiffres|"
    r"ÉMISSION_|masono_mandombe|lari_g2p|test_lari_g2p|briefing-tts)",
    re.IGNORECASE,
)


def norm_text(t: str) -> str:
    t = unicodedata.normalize("NFKD", t)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = t.lower().replace("’", "'")
    t = re.sub(r"[^a-z' ]+", " ", t)
    return re.sub(r"\s+", " ", t)


def read_pdf(p: Path) -> str:
    from pypdf import PdfReader

    parts = []
    for page in PdfReader(str(p)).pages:
        parts.append(page.extract_text() or "")
    return "\n".join(parts)


def read_ooxml(p: Path, members: tuple[str, ...]) -> str:
    parts = []
    with zipfile.ZipFile(p) as z:
        for name in z.namelist():
            if any(name.endswith(m) for m in members):
                xml = z.read(name).decode("utf-8", "ignore")
                xml = re.sub(r"<[^>]+>", " ", xml)
                parts.append(xml)
    return "\n".join(parts)


def read_file(p: Path) -> str:
    ext = p.suffix.lower()
    if ext == ".pdf":
        return read_pdf(p)
    if ext in (".odt", ".odp"):
        return read_ooxml(p, ("content.xml",))
    if ext == ".docx":
        return read_ooxml(p, ("document.xml",))
    if ext == ".xlsx":
        return read_ooxml(p, ("sharedStrings.xml",))
    if ext == ".pptx":
        return read_ooxml(p, (".xml",))
    if ext == ".json":
        return json.dumps(json.loads(p.read_text("utf-8")), ensure_ascii=False)
    if ext in (".md", ".txt", ".html"):
        return p.read_text("utf-8", "ignore")
    return ""


def main() -> int:
    sources: list[tuple[str, str]] = []
    for p in sorted(UPLOADS.iterdir()):
        if p.is_dir() or EXCLUDE.match(p.name):
            continue
        try:
            text = read_file(p)
        except Exception as exc:  # noqa: BLE001
            print(f"ERREUR {p.name}: {exc}", file=sys.stderr)
            continue
        if text.strip():
            sources.append((p.name, text))
            print(f"source    {p.name} ({len(text)} car.)")

    for p in sorted(MEMORY.rglob("*.md")):
        sources.append((f"memoire:{p.name}", p.read_text("utf-8")))

    blob = norm_text("\n".join(t for _, t in sources))
    header = "\n".join(
        [
            "# Reference d'attestation : contenu fourni ou valide par l'autrice.",
            "# Genere par scripts/extract-author-reference.py — ne pas editer a la main.",
            "# Sources : " + ", ".join(n for n, _ in sources),
            "",
        ]
    )
    OUT.write_text(header + blob + "\n", "utf-8")
    print(f"\n{len(sources)} sources, {len(blob.split())} mots normalises -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
