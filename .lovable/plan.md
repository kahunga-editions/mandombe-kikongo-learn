

# Refonte du traducteur — Corpus exclusivement Lari, interdiction du Kituba

## Problème
Le system prompt actuel du traducteur (`translate-lari/index.ts`) ne contient que ~150 mots génériques. Le modèle AI comble les lacunes avec du **Kituba/Munukutuba**, ce qui est inacceptable. Le site contient **4 584 paires Lari-Français vérifiées** et **1 529 phrases d'exemple** qui ne sont pas exploitées.

## Solution

### Fichier modifié : `supabase/functions/translate-lari/index.ts`

Refonte complète du `SYSTEM_PROMPT` :

1. **Extraction du corpus** — Script Node.js pour extraire les ~1 000 termes les plus utiles (mots simples + expressions courantes) depuis `src/data/lessons.ts` et les formater en texte compact pour le prompt. Limité à ~1 000 entrées pour rester dans les limites de contexte du modèle.

2. **Interdiction explicite du Kituba** — Nouvelle section dans le prompt :
```
## INTERDICTION ABSOLUE DU KITUBA
- Tu traduis UNIQUEMENT en Kikongo LARI (Laadi), JAMAIS en Kituba/Munukutuba.
- Si un mot n'existe pas dans le corpus ci-dessous, écris [?mot?]. Ne JAMAIS deviner en Kituba.
- Formes INTERDITES (Kituba) : "mai" (eau), "mpe" (aussi), "ndenge nini" (comment), "malamu" (bien), "mingi" (beaucoup), "soki" (si), "kasi" (mais), "nini" (quoi), "wapi" (où), "na" comme préposition universelle
- Formes CORRECTES (Lari) : "mamba" (eau), "bwe" (comment), "nkolele" (je vais bien), "biangi" (beaucoup)
```

3. **Corpus massif injecté** — Les termes vérifiés du site regroupés par thème (salutations, nature, corps, nourriture, verbes, nombres, temps, famille, etc.) remplaçant les ~150 mots actuels.

4. **Phrases d'exemple** — ~200 phrases clés extraites des leçons pour guider les constructions grammaticales correctes en Lari.

5. **Grammaire conservée** — Les sections sur les préfixes nominaux, concordances, temps verbaux restent identiques.

## Étapes d'implémentation

1. Écrire un script d'extraction qui lit `lessons.ts` et produit le corpus compact
2. Réécrire le `SYSTEM_PROMPT` avec le corpus extrait + règles anti-Kituba
3. Déployer la fonction
4. Tester avec des phrases comme "mbote", "bonjour", "comment allez-vous"

## Impact
- Prompt passant de ~150 à ~1 000+ termes vérifiés
- Zéro Kituba possible — le modèle ne peut utiliser que le corpus fourni
- Traductions ancrées dans le matériel pédagogique réel du site

