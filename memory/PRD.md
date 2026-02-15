# PRD - Configurateur de Frontal Équestre

## Problème Original
Création d'un configurateur de frontal équestre avec EXACTEMENT 33 strass individuels placés sur des positions prédéfinies (anciennement marquées par des points verts). L'utilisateur sélectionne 1 à 4 styles de strass et les 33 emplacements sont remplis avec un pattern répétitif.

## Architecture
- Frontend React standalone avec HTML Canvas
- Export PNG haute résolution (2816x557px)
- Image de base: `base-frontal-clean.png` (points verts supprimés)
- 9 images de strass individuels

## Core Requirements (Tous Implémentés)
- ✅ 33 strass individuels positionnés sur la courbe du frontal
- ✅ **9 styles disponibles**: 
  - Marron, Saphir, Noir Diamant, Fushia (4 originaux)
  - Bleu Marine, Rose, Argent, Turquoise, Bordeaux (5 nouveaux - Décembre 2025)
- ✅ Sélection de 1 à 4 styles avec pattern répétitif
- ✅ Même couleur sélectionnable plusieurs fois (ex: A-A-B)
- ✅ Pattern: slot[i] = selectedStyles[i % length]
  - 1 style → même strass répété 33 fois
  - 2 styles → A-B-A-B...
  - 3 styles → A-B-C-A-B-C...
  - 4 styles → A-B-C-D-A-B-C-D...
- ✅ Prix fixe: 39€
- ✅ Taille unique (pas de sélection de taille)
- ✅ Export PNG haute résolution
- ✅ Rendu Canvas avec mise à jour live
- ✅ Design responsive mobile
- ✅ Zoom modal au clic sur l'aperçu

## Détails Techniques
- 33 positions hardcodées dans `STONE_POSITIONS`
- Positions détectées depuis les points verts de l'image originale
- Canvas haute résolution (2816x557) pour l'export
- Canvas d'affichage redimensionné dynamiquement
- **Taille des strass: 42px** (calibré pour éviter chevauchement, distance min ~42px)
- Grille CSS 3 colonnes pour afficher les 9 styles

## Tests Passés (100% - Décembre 2025)
- ✅ Image de base sans points verts
- ✅ 9 styles de strass disponibles
- ✅ Pattern répétitif 1-4 styles
- ✅ Sélection couleur en double
- ✅ 33 strass affichés sans chevauchement
- ✅ Export PNG fonctionnel
- ✅ Bouton "Tout effacer"
- ✅ Retrait individuel des styles
- ✅ Modal zoom fonctionnel
- ✅ Responsivité mobile (375px)

## Fichiers Clés
- `/app/frontend/src/App.js` - Composant Canvas avec logique de rendu
- `/app/frontend/src/App.css` - Styles et responsive
- `/app/frontend/public/base-frontal-clean.png` - Image de base propre
- `/app/frontend/public/stone-*.png` - 4 images de strass originaux
- `/app/frontend/public/style5-9.png` - 5 nouvelles images de strass

## Positions des 33 Strass (en pixels)
Détectées depuis les points verts de l'image originale (2816x557px).
Rangées de x=721 à x=2242, suivant la courbe du frontal.

## Historique des Modifications
- Décembre 2025: Refonte complète de l'application
- Décembre 2025: Passage de sprite sheet à 4 images PNG individuelles
- Décembre 2025: Passage de DOM à HTML Canvas
- Décembre 2025: 33 positions fixes au lieu de 99
- Décembre 2025: Suppression des tailles (taille unique)
- Décembre 2025: Ajout zoom modal + réutilisation couleur
- Décembre 2025: **+5 nouvelles couleurs** (Bleu Marine, Rose, Argent, Turquoise, Bordeaux)
- Décembre 2025: **Calibrage strass à 42px** pour éviter chevauchement
- Décembre 2025: Tests passés 100% (22/22)
