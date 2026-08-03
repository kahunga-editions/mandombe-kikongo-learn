---
name: Format d'export du livre (dictionnaire)
description: Le livre Buku dia Binsono s'exporte en ODT + PDF uniquement — jamais en DOCX (Mandombe non supporté)
type: constraint
---
Ne jamais proposer ni générer une version **.docx** du dictionnaire ou de tout document contenant du Mandombe : le format DOCX ne supporte pas correctement la police Masono Mandombe (pas d'embarquement fiable, glyphes remplacés).

Formats autorisés :
- **ODT** (source éditable, police `HapaxMandombe` embarquée dans `Fonts/masono_mandombe.ttf`)
- **PDF** (rendu final KDP, généré par LibreOffice headless après installation système de la police)

**Why:** le Mandombe est le cœur du livre ; toute conversion qui casse les glyphes rend le document inutilisable.
