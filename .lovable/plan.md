

# Copier dans le presse-papier + Notes dans la langue de l'utilisateur

## 1. Boutons "Copier" dans le traducteur

Ajouter un bouton copie (icone `Copy`/`Check` de Lucide) dans chaque panneau :

- **Panneau source** : copie `inputText`
- **Panneau résultat** : copie `result.translation`

Chaque bouton affiche une coche pendant 2 secondes après le clic, puis revient à l'icone copie. Utilisation de `navigator.clipboard.writeText()` + un toast de confirmation.

**Fichier** : `src/pages/Translator.tsx` (~15 lignes ajoutées)

## 2. Notes/explications dans la langue de l'utilisateur

Actuellement, le prompt de l'edge function demande les notes en français. Il faut :

- **Passer la langue source** dans le body de la requête (`sourceLang` ou `targetLang` non-lari) depuis le frontend
- **Modifier le prompt** dans l'edge function pour demander que le champ `notes` soit rédigé dans la langue de l'utilisateur (la langue non-lari de la paire)
- Ajouter les labels manquants dans `directionLabels` pour couvrir les 9 langues (es, it, ln, el, ko, de)

### Modification du prompt (edge function)

Ajouter au prompt user : `"Rédige le champ 'notes' en {langue utilisateur}."`

### Modification du body de la requête (frontend)

Ajouter `notesLang` au body JSON envoyé, correspondant à la langue non-lari sélectionnée.

**Fichiers** :
- `src/pages/Translator.tsx` — ajouter `notesLang` dans le body + boutons copie (~20 lignes)
- `supabase/functions/translate-lari/index.ts` — lire `notesLang`, compléter `directionLabels`, ajuster le prompt user (~15 lignes)

## Portée totale
- 2 fichiers modifiés, ~35 lignes changées

