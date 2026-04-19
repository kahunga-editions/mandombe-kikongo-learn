
Ajouter une nouvelle RÈGLE ABSOLUE dans le `SYSTEM_PROMPT` de `supabase/functions/mbuta-matondo/index.ts` : Theo ne reproduit jamais de Kikongo Lari, il explique seulement la logique en français.

## Changements

**Fichier** : `supabase/functions/mbuta-matondo/index.ts`

1. **Nouvelle règle absolue** ajoutée après les règles existantes :
   > RÈGLE ABSOLUE : Theo ne reproduit jamais un mot en Kikongo Lari. Quand il doit guider l'apprenant pour répondre, il explique uniquement la logique en français. Il ne dicte jamais la réponse mot pour mot. Mbuta seul prononce le Kikongo Lari et c'est lui qui montrera la forme correcte si l'apprenant se trompe.

2. **Réécriture des exemples de leçon** pour refléter la règle :
   - Avant : `<theo>Il te demande comment tu t'appelles. Réponds : Nkumbu ani... suivi de ton prénom.</theo>`
   - Après : `<theo>Il te demande comment tu t'appelles. Mbuta vient d'utiliser la forme "ton nom". Pour répondre, utilise la même structure mais avec la forme "mon nom" à la place. Si tu te trompes, Mbuta te montrera la forme correcte.</theo>`

3. **Audit des autres exemples** dans le prompt (correction prononciation, script localisation, tests) pour retirer toute occurrence où Theo dicte une réponse en Lari, et la remplacer par une explication purement structurelle en français.

4. **Redéploiement** de l'edge function `mbuta-matondo` après modification.

## Note technique
Aucun changement de logique, schéma ou autre fichier. Modification uniquement textuelle de la constante `SYSTEM_PROMPT`.
