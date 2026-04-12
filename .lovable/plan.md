

# Enrichir le corpus du traducteur — Toutes les entrées restantes

## Situation actuelle
- Le prompt contient **994 mots** et **87 phrases**
- `lessons.ts` contient **4 603 paires** uniques Lari-Français et **1 137 phrases** manquantes
- **3 479 termes** et **~1 137 phrases** ne sont pas encore dans le prompt

## Solution

### Extraction et injection complète

1. **Script d'extraction** — Écrire un script Node.js qui lit `src/data/lessons.ts`, extrait toutes les paires `lari → french` uniques, filtre celles déjà présentes dans le prompt, et génère le texte à injecter.

2. **Réécriture du SYSTEM_PROMPT** — Remplacer le corpus actuel par l'intégralité des ~4 600 termes et ~1 200 phrases, regroupés dans le même format compact (`Lari = Français`). Le prompt passera de ~32K à ~155K caractères (~40K tokens), bien dans les limites du contexte de Gemini 2.5 Flash (1M tokens).

3. **Redéploiement** de la fonction `translate-lari`.

### Fichier modifié
- `supabase/functions/translate-lari/index.ts` — SYSTEM_PROMPT élargi avec corpus complet

### Risques
- Le prompt sera volumineux (~155K chars) mais Gemini 2.5 Flash gère des contextes bien plus grands. La latence pourrait augmenter légèrement (~1-2s de plus par requête).

