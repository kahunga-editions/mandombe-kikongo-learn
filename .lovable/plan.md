

# Ajouter le son sur les phrases clés de toutes les leçons

## Problème
La section "Phrases clés" (Bambuka) affiche le texte Mandombe et le texte Lari mais n'a pas de bouton audio, contrairement aux sections Vocabulaire, Syntaxe et Conjugaisons qui l'ont déjà.

## Solution
Ajouter un `MandombeSpeaker` à côté du texte Mandombe dans chaque phrase clé.

## Changement

**Fichier**: `src/pages/LessonDetail.tsx` (lignes ~284-285)

Dans la section phrases clés, transformer :
```tsx
<p className="font-mandombe text-3xl text-gold mb-4">{phrase.mandombe}</p>
<p className="font-display text-lg font-semibold text-foreground italic">{phrase.lari}</p>
```

En :
```tsx
<div className="flex items-center gap-2 mb-4">
  <p className="font-mandombe text-3xl text-gold">{phrase.mandombe}</p>
  <MandombeSpeaker lariText={phrase.lari} />
</div>
<p className="font-display text-lg font-semibold text-foreground italic">{phrase.lari}</p>
```

Le composant `MandombeSpeaker` est déjà importé dans le fichier. Il suffit de l'ajouter à côté du texte Mandombe, avec le texte Lari comme source de prononciation (comme pour les autres sections).

