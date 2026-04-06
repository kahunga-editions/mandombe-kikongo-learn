

# Corrections : Djuna → /dj/ et titre "Buzitu na Bumwana"

## 2 corrections à appliquer dans `src/data/lessons.ts`

### 1. Remplacer "Dzuna" par "Djuna" partout

Le mot se prononce /dzuna/ mais s'écrit **Djuna** (avec /dj/). Il faut remplacer toutes les occurrences de "Dzuna" par "Djuna" dans le fichier — cela concerne :

- La leçon `states-emotions` : titre, vocabulaire, phrases, syntaxe, exercices (~30 occurrences)
- La leçon `yengo-yetela-yilulu` : vocabulaire et exercices (~10 occurrences)
- Conserver les notes de prononciation existantes qui précisent « se prononce /dzuna/ »

**Ne pas toucher** les cas où "dzuna" apparaît dans un champ `note` ou `hint` décrivant la prononciation — ceux-là restent "/dzuna/".

### 2. Renommer le titre de la leçon `social-concepts`

Remplacer "Buzitu ye Bumwana" par **"Buzitu na Bumwana"** dans les champs `title`, `titleLari`, `titleMandombe` de la leçon `social-concepts`.

## Fichier modifié

- `src/data/lessons.ts` — remplacement global Dzuna→Djuna + titre corrigé

