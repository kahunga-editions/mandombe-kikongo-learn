

# Ajouter la vidéo de présentation de Mbuta Matondo

## Ce qui sera fait

Intégrer la vidéo `Avatar_Video.mp4` comme vidéo de présentation de Mbuta Matondo, affichée dans l'écran d'accueil du chat (quand aucun message n'a encore été envoyé).

## Étapes

### 1. Copier la vidéo dans le projet
- Copier `user-uploads://Avatar_Video.mp4` → `public/videos/mbuta-matondo-intro.mp4`

### 2. Modifier `MbutaMatondoChat.tsx` — écran d'accueil
Remplacer l'icône `GraduationCap` dans l'état vide (lignes 168-175) par la vidéo de présentation :
- Vidéo en lecture automatique, en boucle, avec coins arrondis et bordure dorée
- Format compact (max ~280px de large) centré au-dessus du message de bienvenue
- Contrôles natifs du navigateur pour que l'utilisateur puisse mettre en pause

### 3. Ajouter un avatar vidéo miniature dans le header
Dans `MbutaMatondo.tsx`, remplacer le texte d'en-tête par un petit avatar circulaire avec la vidéo (48x48px) à côté du titre, pour donner de la personnalité à la page.

## Fichiers modifiés
| Fichier | Action |
|---------|--------|
| `public/videos/mbuta-matondo-intro.mp4` | Créer (copie de la vidéo) |
| `src/components/MbutaMatondoChat.tsx` | Modifier l'écran d'accueil |
| `src/pages/MbutaMatondo.tsx` | Ajouter avatar vidéo miniature dans le header |

