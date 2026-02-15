# PRD - Configurateur de Frontal Équestre

## Problème Original
Création d'un configurateur de frontal équestre personnalisable pour le site https://equipassion-boutique.com (Shopify). Les cristaux doivent être alignés EXACTEMENT sur les trous noirs du frontal - 1 strass par trou - avec des vraies photos de cristaux ultra-réalistes.

## Architecture
- Frontend React standalone (pas de backend)
- Export HTML pour intégration Shopify
- Image frontal vide: `frontal-vide.png` (2662x567px) - NOUVELLE IMAGE avec trous noirs
- Sprite sheet des cristaux: `crystals-grid.png` (1080x1080px, grille 5x4) - NOUVELLE IMAGE

## User Personas
- Cavaliers propriétaires de chevaux
- Acheteurs de produits équestres sur Shopify

## Core Requirements (Tous Implémentés)
- ✅ 19 couleurs de cristaux avec VRAIES PHOTOS
- ✅ Maximum 5 cristaux sélectionnables (pattern répétitif)
- ✅ 4 tailles: Poney (60), Cob (75), Full (85), XL (99 cristaux)
- ✅ Prix fixe: 39€
- ✅ Cristaux ALIGNÉS sur les trous noirs du frontal
- ✅ Courbe polynomiale: Y de 26% (bords) à 63% (centre)
- ✅ Export code HTML pour Shopify
- ✅ Design responsive mobile et desktop

## Détails Techniques
- 99 positions hardcodées dans `ALL_POSITIONS`
- Courbe: polynomial degré 4 (descend au centre, remonte aux bords)
- Zone X: 13% à 88%
- Zone Y: 26% (bords) à 63% (centre)
- Diamètre cristaux: 2.0% de la largeur du conteneur
- Sprite sheet: grille 5 colonnes x 4 rangées (1080x1080px)

## Tests Passés (100% - Décembre 2025)
- ✅ Nouvelle image frontal-vide.png affichée
- ✅ 19 types de cristaux depuis crystals-grid.png
- ✅ Cristaux suivent courbe polynomiale correcte
- ✅ Poney: 60 cristaux
- ✅ Cob: 75 cristaux
- ✅ Full: 85 cristaux
- ✅ XL: 99 cristaux
- ✅ Pattern répétitif des cristaux sélectionnés
- ✅ Responsivité mobile (375px) et tablette (768px)
- ✅ Export Shopify avec code HTML

## Fichiers Clés
- `/app/frontend/src/App.js` - Composant principal avec ALL_POSITIONS
- `/app/frontend/src/App.css` - Styles et media queries
- `/app/frontend/public/frontal-vide.png` - NOUVELLE image du frontal
- `/app/frontend/public/crystals-grid.png` - NOUVELLE grille des cristaux

## Cristaux Disponibles (19)
1. Rouge Rubis, 2. Bleu Marine, 3. Saphir, 4. Or, 5. Rose
6. Bordeaux, 7. Argent, 8. Marron, 9. Fushia, 10. Amethyst
11. Vitrail Clair, 12. Emeraude, 13. Saphir Fumé, 14. Bleu Ciel, 15. Noir Diamant
16. Orange, 17. Violet, 18. Bleu Canard, 19. Noir Intense

## Historique des Modifications
- Décembre 2025: Remplacement des images par nouvelles PNG fournies par l'utilisateur
- Décembre 2025: Recalcul des positions avec courbe polynomiale (99 positions hardcodées)
- Décembre 2025: Ajustement des tailles (Poney:60, Cob:75, Full:85, XL:99)
- Décembre 2025: Tests passés 100%

## Backlog
- P2: Affinage pixel-perfect si l'utilisateur souhaite des ajustements supplémentaires
- P3: Option de sauvegarde du design (localStorage)
