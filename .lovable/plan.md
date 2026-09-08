# Plan : corriger Biba et l'expression « tu zakase »

## Problème constaté
- L'entrée `Biba` est glosée « Esprits des morts ; ancêtres », ce qui est faux dans la tradition Kongo : les morts sont les êtres incarnés dans la chair ; les Biba sont les **ancêtres désincarnés**.
- L'expression a été enregistrée sous la forme phonétique française « Biba touzacassé » au lieu de la graphie Lari correcte **Biba tu zakase**.
- Le sens de « Biba tu zakase » doit être ajusté : « Nous avons assis les ancêtres » (ou « Vous avez assis les ancêtres », selon le contexte inclusif du pluriel).

## Changements prévus

### 1. Dictionnaire (`data/dictionary-entries.json`)
- Modifier l'entrée **Biba** :
  - `fr` : « Ancêtres désincarnés »
  - `en` : « Disembodied ancestors »
- Renommer et corriger l'entrée **Biba touzacassé** → **Biba tu zakase** :
  - `fr` : « Nous avons assis les ancêtres (dans une nouvelle maison, en installant un petit autel). »
  - `en` : « We seated the ancestors (in a new house, by setting up a small altar). »

### 2. Conjugaisons (`src/data/survivalVerbs.ts`)
- Mettre à jour la note culturelle attachée au verbe **zakasa** pour utiliser la graphie **Biba tu zakase** et le sens corrigé.

### 3. Générateur (`scripts/build_survival_verbs.py`)
- Corriger le texte de la note dans le script source pour que toute régénération future produise la bonne forme.

### 4. Rapport d'arbitrage (`reports/arbitrage-zonza-lari.md`)
- Remplacer « touzacassé » par « tu zakase ».
- Préciser que Biba signifie « ancêtres désincarnés ».

## Vérification
- `scripts/dictionary_guards.py` doit rester au vert.
- Compilation TypeScript (`bunx tsgo --noEmit -p tsconfig.app.json`) sans erreur.
- Vérification visuelle de la page `/conjugations` et du dictionnaire en ligne.
