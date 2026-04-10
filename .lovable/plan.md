

# Grille Kilolaka complète réservée aux Premium

## Changement

Envelopper le bouton "Explorer la Grille complète" et l'iframe dans un `PremiumGate` pour que seuls les membres Premium puissent y accéder.

## Fichier : `src/components/KilolakaPreview.tsx`

Lignes 121-141 — Entourer le bloc "Interactive Kilolaka Grid" avec `<PremiumGate>` :

```tsx
{/* Interactive Kilolaka Grid */}
<div className="max-w-6xl mx-auto mt-12 text-center">
  <PremiumGate label="Grille complète du Kilolaka">
    <button
      onClick={() => setShowGrid(!showGrid)}
      className="inline-flex items-center gap-2 px-8 py-4 ..."
    >
      ...
    </button>
    {showGrid && (
      <div className="mt-6 rounded-xl border border-gold/20" style={{ height: '80vh' }}>
        <iframe ... />
      </div>
    )}
  </PremiumGate>
</div>
```

Les utilisateurs non-premium verront le contenu flouté avec le bouton "Go Premium" ou "Sign In to Unlock". Un seul fichier modifié.

