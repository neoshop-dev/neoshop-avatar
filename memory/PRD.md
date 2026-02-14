# PRD - Configurateur de Frontal Équestre Wave Style

## Problème Original
Création d'un configurateur de frontal "Wave Style" pour chevaux personnalisable pour le site https://equipassion-boutique.com (Shopify). Les strass doivent être positionnés exactement sur les points blancs du frontal avec des vraies photos de cristaux ultra-réalistes.

## Architecture
- Frontend React standalone
- Pas de backend nécessaire (tout côté client)
- Export HTML pour intégration Shopify
- Image frontal "Wave Style" extraite du PDF utilisateur
- 42 emplacements de strass (attaches exclues)
- Sprite sheet avec vraies photos des 19 cristaux

## User Personas
- Cavaliers propriétaires de chevaux
- Acheteurs de produits équestres sur Shopify

## Core Requirements (Implémentés)
- ✅ 19 couleurs de strass avec VRAIES PHOTOS des cristaux
- ✅ Maximum 5 strass sélectionnables
- ✅ 4 tailles: Poney (25), Cob (30), Full (35), XL (42)
- ✅ Prix fixe: 39€
- ✅ Pattern répétitif des strass
- ✅ Strass positionnés EXACTEMENT sur les points blancs
- ✅ Taille des strass = taille des points blancs
- ✅ Attaches aux extrémités exclues (non utilisées pour les strass)
- ✅ Export code HTML pour Shopify
- ✅ Design responsive mobile et desktop

## Détails Techniques
- WHITE_DOTS: 42 positions en % (x, y) pour les strass
- DOT_DIAMETER_PCT: 2.8% de la largeur de l'image
- Sprite sheet: 816x1028px avec 19 cristaux
- Image frontal: 900x376px

## Tests Passés (100%)
- ✅ 19 types de cristaux dans la grille
- ✅ Vraies images via sprite sheet
- ✅ Strass sur les points blancs
- ✅ XL: 42 pierres (tous les emplacements)
- ✅ Full: 35 pierres
- ✅ Cob: 30 pierres
- ✅ Poney: 25 pierres
- ✅ Pattern répétitif
- ✅ Responsivité mobile/tablette
- ✅ Export Shopify

## Fichiers Clés
- `/app/frontend/src/App.js` - Composant principal avec WHITE_DOTS
- `/app/frontend/src/App.css` - Styles responsifs
- `/app/frontend/public/browband-wave.png` - Image du frontal Wave Style

## Backlog
- P3: Supprimer le texte des tailles (Full/Cob/Pony) de l'image

## Notes
Le texte des tailles (Full 16.5", Cob 15.5", Pony 14.5") reste visible sur l'image du frontal car il provient du PDF original et sert de référence visuelle.
