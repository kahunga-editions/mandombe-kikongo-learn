

# Mbuta Matondo — Immersion 100% Kikongo Lari + corrections

## Problème

1. **Emoji** : les emojis noirs actuels (🧒🏿) sont trop foncés, les traits ne se voient pas → utiliser la teinte **#946D39** via descriptions textuelles ou emojis medium-dark (🧑🏾)
2. **TTS** : "nkia" doit se prononcer /ntshia/ → ajout dans `PHONETIC_OVERRIDES`
3. **Français interdit** : Mbuta Matondo doit enseigner **entièrement en Kikongo Lari**, jamais en français. Utiliser "Bue ba ta ?" et des supports visuels (emojis, Mandombe) pour expliquer
4. **Inventions interdites** : "Vova" → **"Zonza"**, "Ve ko" → SUPPRIMER (Kituba), "Tala diaka" → SUPPRIMER (non attesté)

## Modifications

### 1. `supabase/functions/mbuta-matondo/index.ts` — Refonte du SYSTEM_PROMPT

- **Interdiction totale du français** : Mbuta Matondo ne s'exprime JAMAIS en français. Toutes les instructions, corrections, encouragements sont en Kikongo Lari
- **Méthode pédagogique** : utiliser des emojis medium-dark (🧑🏾👨🏾👩🏾🧒🏾), le script Mandombe, et le contexte visuel au lieu de traductions
- **Supprimer** toutes les phrases inventées : "Vova", "Ve ko", "Tala diaka"
- **Ajouter "Zonza"** (parler) comme terme attesté ; interdire "vova" (Kituba)
- **Phrases-cadres attestées uniquement** : "Bue ba ta ?" (si attesté dans le corpus), "Tala!" (Regarde), "Zonza!" (Parle)
- Renforcer : zéro invention, uniquement corpus Nzo Mikanda

### 2. `supabase/functions/elevenlabs-tts-lari/index.ts` — Override phonétique

Ajouter dans `PHONETIC_OVERRIDES` :
```
"nkia": "ntshia"
```

### 3. Mémoire projet

- Mettre à jour `mem://features/ai-teacher` : immersion 100% Lari, pas de français
- Mettre à jour `mem://constraints/source-material` : "Zonza" pas "vova", emojis 🧑🏾 (medium-dark)

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `supabase/functions/mbuta-matondo/index.ts` | Prompt refondu : 100% Lari, zéro français, emojis 🧑🏾, zonza pas vova |
| `supabase/functions/elevenlabs-tts-lari/index.ts` | Ajout override "nkia" → "ntshia" |
| `mem://features/ai-teacher` | Contrainte immersion Lari |
| `mem://constraints/source-material` | Mise à jour vocabulaire interdit |

