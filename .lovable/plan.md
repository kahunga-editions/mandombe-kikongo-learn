

# Plan : Créditer Lumwamu + Simplifier les leçons débutant + Nouvelles leçons

## 1. Créditer Jacquot & Lumwamu partout

Toutes les mentions de "Jacquot" dans les titres, descriptions, commentaires et explications d'exercices seront remplacées par **"Jacquot & Lumwamu"**. Cela concerne environ 292 occurrences dans `src/data/lessons.ts` :

- Commentaires de section : `// GRAMMAIRE JACQUOT` → `// GRAMMAIRE JACQUOT & LUMWAMU`
- Descriptions : `"d'après l'étude descriptive de Jacquot"` → `"d'après l'étude descriptive de Jacquot & Lumwamu"`
- Références dans les exercices : `"(Jacquot §1.46.1)"` → `"(Jacquot & Lumwamu §1.46.1)"`

## 2. Simplifier les leçons de niveau débutant

Les 3 leçons beginner Jacquot (phonologie, classes nominales, structure de phrase) utilisent actuellement du jargon linguistique inadapté. Exemples de simplifications :

**Vocabulaire — notes techniques → langage enfant :**
- `"Phonème p — occlusive bilabiale sourde aspirée [pʰ]"` → `"Le son p — on souffle un peu d'air en le disant"`
- `"Phonème b — occlusive bilabiale sourde douce"` → `"Le son b — comme dans « balle », sans souffle"`
- `"Phonème pf — affriquée bilabio-dentale sourde [pf]"` → `"Le son pf — on commence par p et on finit par f, les deux ensemble"`
- `"Genre 1 (sg) — préfixe mu-"` → `"Le mot commence par mu- quand on parle d'une seule personne"`

**Explications syntaxiques :**
- `"27 phonèmes consonantiques organisés en séries labiale, alvéolaire et palatale"` → `"Le lari a 27 sons de consonnes. On les classe selon l'endroit dans la bouche où on les fabrique : les lèvres, la langue contre les dents, ou le fond de la bouche."`
- `"L'opposition p/b distingue des mots. p est aspiré [pʰ], b est non aspiré."` → `"p et b se ressemblent, mais p a un petit souffle d'air en plus. Si tu changes l'un pour l'autre, le mot change de sens !"`
- `"morphème discontinu ka...ko"` → `"Pour dire « ne...pas », on met ka devant le verbe et ko après. Le verbe est pris en sandwich !"`
- `"Le laadi a 5 modes : indicatif, subjonctif, permansif, réel et relatif"` → `"En lari, on peut dire les choses de 5 façons différentes selon qu'on raconte, qu'on souhaite, qu'on décrit un état, etc."`

**Exercices — explications simplifiées :**
- `"Le laadi possède 27 phonèmes consonantiques (Jacquot & Lumwamu §1.46.1)."` → `"Le lari a 27 sons de consonnes différents (Jacquot & Lumwamu §1.46.1)."`

## 3. Ajouter 4 nouvelles leçons

### Leçon 1 : Pronoms (beginner)
- Pronoms personnels : Me/Meno, Nge, Yandi, Beto, Beno, Bau
- Note pédagogique sur NA (passé) et NI (futur) qui remplacent le pronom sujet en parlé
- Démonstratifs et possessifs
- Explications simples, sans jargon

### Leçon 2 : Système verbal — temps et aspects (intermediate)
- Conjugaisons : passé proche/lointain, présent, futur, progressif (tama + infinitif)
- Marqueurs NA/NI avec exemples contextuels
- Négation ka...ko aux différents temps

### Leçon 3 : Numération (intermediate)
- Cardinaux : mosi, zole, tatu, ya, tanu, sambanu, nsambwadi, nana, vwa, kumi
- Ordinaux : ntete, nzole, ntatu
- Accords de classe avec les nombres

### Leçon 4 : Idéophones et expressivité (advanced)
- Vocabulaire expressif attesté dans le corpus
- Rôle syntaxique et intégration dans la phrase

## 4. Extraction des pages 51-100 du corpus

- Script Python pour extraire les pages 51-100 du PDF Jacquot & Lumwamu
- Création de 2-3 leçons supplémentaires sur les tons, classes nominales détaillées, et morphologie verbale avancée
- Explications simplifiées pour les leçons beginner, jargon accepté pour intermediate/advanced

## Fichiers modifiés
- `src/data/lessons.ts` — renommage Jacquot → Jacquot & Lumwamu, simplification des beginner, ajout de 6-7 leçons
- Scripts Python temporaires pour extraction (non versionnés)

## Portée
- Aucune migration de base de données
- Aucun nouveau composant
- Les leçons existantes non-Jacquot ne sont pas touchées

