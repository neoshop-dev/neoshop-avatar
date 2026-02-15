# PRD - Configurateur de Frontal Équestre

## Problème Original
Création d'un configurateur de frontal équestre personnalisable pour le site https://equipassion-boutique.com (Shopify). Les cristaux doivent être positionnés sur une courbe "wave" qui suit la forme du frontal, avec des vraies photos de cristaux ultra-réalistes issues d'un sprite sheet.

## Architecture
- Frontend React standalone (pas de backend)
- Export HTML pour intégration Shopify
- Image frontal vide: `frontal-vide.png` (2662x567px)
- Sprite sheet des cristaux: `crystals-grid.png` (1080x1080px, grille 5x4)
- Image exemple de référence: `frontal-exemple.png`

## User Personas
- Cavaliers propriétaires de chevaux
- Acheteurs de produits équestres sur Shopify

## Core Requirements (Tous Implémentés)
- ✅ 19 couleurs de cristaux avec VRAIES PHOTOS
- ✅ Maximum 5 cristaux sélectionnables (pattern répétitif)
- ✅ 4 tailles: Poney (70), Cob (85), Full (99), XL (112 cristaux)
- ✅ Prix fixe: 39€
- ✅ Cristaux positionnés sur courbe wave sinusoïdale
- ✅ Export code HTML pour Shopify
- ✅ Design responsive mobile et desktop

## Détails Techniques
- Courbe wave: startX=13%, endX=89%, centerY=34%, amplitude=30%
- Diamètre cristaux: 2.0% de la largeur du conteneur
- Sprite sheet: grille 5 colonnes x 4 rangées
- Taille cristal dans cellule sprite: ~140px

## Tests Passés (100% - Décembre 2025)
- ✅ Affichage des 19 types de cristaux dans la grille
- ✅ Vraies images via sprite sheet `crystals-grid.png`
- ✅ Cristaux suivent courbe wave sinusoïdale
- ✅ XL: 112 cristaux
- ✅ Full: 99 cristaux
- ✅ Cob: 85 cristaux
- ✅ Poney: 70 cristaux
- ✅ Pattern répétitif des cristaux sélectionnés
- ✅ Responsivité mobile (375px) et tablette (768px)
- ✅ Modal d'export Shopify avec code HTML
- ✅ Bouton "Copier le code" fonctionnel

## Fichiers Clés
- `/app/frontend/src/App.js` - Composant principal avec logique de positionnement
- `/app/frontend/src/App.css` - Styles et media queries responsifs
- `/app/frontend/public/frontal-vide.png` - Image du frontal vide
- `/app/frontend/public/crystals-grid.png` - Sprite sheet des 19 cristaux
- `/app/frontend/public/frontal-exemple.png` - Image de référence

## Cristaux Disponibles (19)
1. Rouge Rubis, 2. Bleu Marine, 3. Saphir, 4. Or, 5. Rose
6. Bordeaux, 7. Argent, 8. Marron, 9. Fushia, 10. Amethyst
11. Vitrail Clair, 12. Emeraude, 13. Saphir Fumé, 14. Bleu Ciel, 15. Noir Diamant
16. Orange, 17. Violet, 18. Bleu Canard, 19. Noir Intense

## Backlog
- P2: Ajuster finement les coordonnées si l'utilisateur souhaite une correspondance pixel-perfect
- P3: Ajouter option de sauvegarde du design (localStorage)

## Historique des Modifications
- Décembre 2025: Remplacement des anciens assets par de nouveaux PNG haute qualité fournis par l'utilisateur
- Décembre 2025: Recalibrage de la courbe wave (startX=13%, endX=89%, centerY=34%, amplitude=30%)
- Décembre 2025: Correction erreur JS (SPRITE_URL not defined)
- Décembre 2025: Tests passés 100%
