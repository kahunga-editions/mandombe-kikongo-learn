
# Correction TTS Lari: ne plus insérer de "u" après le g

## Problème confirmé
Le bug vient bien de la règle actuelle dans `supabase/functions/elevenlabs-tts-lari/index.ts` qui transforme `g + e/i/y` en `gu + e/i/y`.

Conséquence :
- `mpangi` devient `mpangui`
- le moteur finit par prononcer quelque chose comme `mpa-ngou-i`

Les logs récents le confirment :
```text
TTS Lari: "Mpangi" → French phonetic: "Mpangui"
```

## Changement à faire
Modifier uniquement `supabase/functions/elevenlabs-tts-lari/index.ts` pour :

1. Supprimer la règle :
```ts
if (lower[i] === "g" && i + 1 < lower.length && "eiy".includes(lower[i + 1])) {
  result += "gu";
  i++;
  continue;
}
```

2. Laisser `g`, `ge`, `gi`, `gy` passer tels quels dans `lariToFrenchPhonetic()`  
   - on ne change plus la graphie interne
   - on ne force plus de `u`
   - on évite donc la mauvaise prononciation `ngou-i`

3. Mettre à jour le commentaire de la fonction pour documenter clairement la règle métier :
```text
En Kikongo Lari, le g est toujours dur.
On ne doit pas insérer de "u" artificiel dans la chaîne envoyée au TTS,
car cela déforme la syllabation et la prononciation.
```

## Vérification après correction
Après déploiement, tester au minimum :
- `Mpangi`
- `Nge`
- `Ngiele` si utilisé dans le contenu

Ce que je vérifierai :
- dans les logs, le texte transformé ne contient plus `gu`
- `Mpangi` reste `Mpangi` côté payload TTS
- dans l’app, le bouton audio ne prononce plus `mpa ngou i`

## Portée
- 1 seul fichier à modifier
- aucun changement UI
- correction ciblée du pipeline audio Lari
- on annule la réécriture fautive au lieu d’altérer davantage l’orthographe
