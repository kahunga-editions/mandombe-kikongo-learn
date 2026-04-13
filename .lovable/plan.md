

# Sauvegarder les corrections admin pour enrichir le traducteur

## Problème
Quand un admin corrige une traduction dans le traducteur, la correction est perdue au rechargement. Le modèle AI refera la même erreur la prochaine fois.

## Solution
Créer une table `translation_corrections` qui stocke les corrections validées par l'admin. Avant chaque appel AI, l'edge function cherche d'abord une correction exacte dans cette table. Si elle existe, elle est retournée directement sans appeler l'AI. Sinon, les corrections existantes sont injectées dans le prompt comme exemples pour guider le modèle.

## Modifications

### 1. Nouvelle table `translation_corrections`

```sql
CREATE TABLE public.translation_corrections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text text NOT NULL,
  source_lang text NOT NULL,
  target_lang text NOT NULL,
  corrected_translation text NOT NULL,
  corrected_mandombe text DEFAULT '',
  corrected_ipa text DEFAULT '',
  notes text DEFAULT '',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Index pour recherche rapide
CREATE UNIQUE INDEX idx_corrections_lookup 
  ON public.translation_corrections (lower(source_text), source_lang, target_lang);

-- RLS : admins full access, authenticated read
ALTER TABLE public.translation_corrections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage corrections"
  ON public.translation_corrections FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can read corrections"
  ON public.translation_corrections FOR SELECT TO authenticated
  USING (true);
```

### 2. Edge function `translate-lari/index.ts`

- Lire `isAdmin` et `userId` depuis le JWT (header Authorization)
- Ajouter un champ optionnel `correction` dans le body : si présent et que l'utilisateur est admin, upsert dans `translation_corrections`
- Avant d'appeler l'AI : chercher une correction exacte (`source_text = lower(text)`, `source_lang`, `target_lang`). Si trouvée, retourner directement le résultat stocké
- Si pas de match exact : charger les corrections récentes (même paire de langues, max 20) et les injecter dans le prompt comme exemples supplémentaires

### 3. Frontend `src/pages/Translator.tsx`

- Quand un admin clique sur le bouton "valider" (Check) après édition, envoyer la correction au backend via un nouvel appel fetch avec `{ correction: true, text: inputText, direction, translation: result.translation, mandombe: result.mandombe, ipa: result.ipa }`
- Afficher un toast "Correction sauvegardée" en cas de succès
- Conditionner l'affichage du bouton d'édition aux admins uniquement (ou le laisser visible pour tous mais ne sauvegarder que pour les admins)

## Flux

```text
Utilisateur tape "bonjour" (fr→lari)
  │
  ├─ Edge function cherche dans translation_corrections
  │   ├─ Match exact → retourne la correction directement (pas d'appel AI)
  │   └─ Pas de match → injecte les corrections proches dans le prompt → appelle AI
  │
  ├─ Admin édite le résultat et valide
  │   └─ POST correction → upsert dans translation_corrections
  │
  └─ Prochaine fois : "bonjour" retourne la correction sauvegardée
```

## Portée
- 1 migration SQL (nouvelle table + RLS)
- 1 fichier modifié : `supabase/functions/translate-lari/index.ts` (~40 lignes)
- 1 fichier modifié : `src/pages/Translator.tsx` (~15 lignes)

