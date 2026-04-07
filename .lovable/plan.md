

# Régénérer les 25 illustrations — style ancré sur l'image de référence originale

## Problème

Les générations AI produisent des résultats incohérents et parfois offensants. Le panneau 6 (que j'avais proposé comme référence) est en fait le pire. Le vrai style souhaité est celui de l'image de référence fournie plus tôt : deux petites filles dans un style illustration enfantine soigné, coloré, avec des traits nets.

## Solution

Régénérer les 25 panneaux en utilisant **l'image de référence uploadée** (image-12.png, les deux filles) comme ancrage stylistique. Chaque génération enverra cette image au modèle avec l'instruction "In the exact same illustration style as this reference image, but with very dark skin tone #4f2903 and natural kinky/curly hair."

### Approche technique
- Modèle : `google/gemini-3-pro-image-preview` (meilleure qualité)
- Chaque appel inclut l'image de référence en entrée (mode edit/style transfer)
- Génération par lots de 5 panneaux avec vérification visuelle entre chaque lot
- Si un panneau est bloqué ou raté, retenter avec un prompt ajusté

### Éléments constants dans chaque prompt
- "In the same colorful children's book illustration style as the reference image"
- Nsayi : peau très foncée #4f2903, cheveux crépus en queue de cheval avec ruban rose, robe rose
- Sunda : peau très foncée #4f2903, cheveux courts bouclés avec serre-tête blanc, tenue bleue
- Tous les personnages : exclusivement noirs congolais, peau foncée, traits respectueux
- Style : trait net, couleurs vives, décors congolais authentiques

### Les 25 scènes (inchangées)
Mêmes scènes que le plan précédent (village, école, savane, forêt) avec les cadrages variés déjà définis.

## Fichiers modifiés
- `src/assets/nsayi-panel-1.jpg` à `nsayi-panel-25.jpg` — 25 images régénérées avec style cohérent ancré sur la référence

