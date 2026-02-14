# PRD - Configurateur de Frontal Équestre

## Problème Original
Création d'un configurateur de frontal pour chevaux personnalisable pour le site https://equipassion-boutique.com (Shopify). Les strass doivent être incrustés sur les points blancs du frontal "Wave Style".

## Architecture
- Frontend React standalone
- Pas de backend nécessaire (tout côté client)
- Export HTML pour intégration Shopify
- Image frontal "Wave Style" extraite du PDF utilisateur
- 44 emplacements de strass (WHITE_DOTS) détectés automatiquement

## User Personas
- Cavaliers propriétaires de chevaux
- Acheteurs de produits équestres sur Shopify

## Core Requirements (Static)
- 19 couleurs de strass
- Maximum 5 strass sélectionnables
- 4 tailles: Poney (25), Cob (30), Full (35), XL (35)
- Prix fixe: 39€
- Pattern répétitif des strass
- Strass positionnés sur les points blancs du frontal Wave
- Export code HTML pour Shopify
- Design responsive mobile et desktop

## Implémenté (Février 2026)
- ✅ Image Wave Style du frontal extraite du PDF utilisateur
- ✅ Détection automatique des 44 positions de points blancs
- ✅ Positionnement responsive des strass (coordonnées en %)
- ✅ Grille de sélection des 19 strass avec vraies images
- ✅ Pattern répétitif fonctionnel
- ✅ Sélection de taille avec centrage dynamique des pierres
- ✅ Export HTML avec code Shopify complet
- ✅ Design responsive mobile (375px) et tablette (768px)
- ✅ Strass avec couleurs simples pour meilleure responsivité

## Tests Passés (100%)
- ✅ 19 strass dans la grille
- ✅ Sélection max 5 strass
- ✅ Positionnement sur les points blancs
- ✅ Pattern répétitif correct
- ✅ Changement de taille (Poney/Cob/Full/XL)
- ✅ Export modal avec code HTML
- ✅ Suppression de strass individuelle
- ✅ Bouton "Tout effacer"
- ✅ Responsivité mobile et tablette

## Fichiers Clés
- `/app/frontend/src/App.js` - Composant principal avec WHITE_DOTS
- `/app/frontend/src/App.css` - Styles responsifs
- `/app/frontend/public/browband-wave.png` - Image du frontal

## Backlog
- P2: Utiliser les vraies images de strass (sprite) au lieu des couleurs
- P2: Sauvegarde des configurations
- P3: Supprimer le texte des tailles de l'image du frontal

## Next Tasks
- Aucune tâche critique - MVP complet et testé
