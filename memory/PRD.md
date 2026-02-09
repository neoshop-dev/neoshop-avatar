# PRD - Configurateur de Frontal Équestre

## Problème Original
Création d'un configurateur de frontal pour chevaux personnalisable pour le site https://equipassion-boutique.com (Shopify). Les strass doivent être incrustés DANS la gouttière blanche du frontal, pas sur le cuir.

## Architecture
- Frontend React standalone
- Pas de backend nécessaire (tout côté client)
- Export HTML pour intégration Shopify
- Vraies images des strass via sprite technique

## User Personas
- Cavaliers propriétaires de chevaux
- Acheteurs de produits équestres sur Shopify

## Core Requirements (Static)
- 19 couleurs de strass (vraies images)
- Maximum 5 strass sélectionnables
- 4 tailles: Poney (25), Cob (30), Full (35), XL (35)
- Prix fixe: 39€
- Pattern répétitif des strass
- Strass positionnés DANS la gouttière blanche
- Export code HTML pour Shopify

## Implémenté (Février 2026)
- ✅ Image réelle du frontal vide comme base
- ✅ Vraies images des strass (sprite technique)
- ✅ Positionnement précis DANS la gouttière blanche (Catmull-Rom spline)
- ✅ Grille de sélection des 19 strass avec vraies images
- ✅ Pattern répétitif fonctionnel
- ✅ Sélection de taille
- ✅ Export HTML avec code Shopify
- ✅ Design responsive

## Tests Passés (98%)
- ✅ 19 strass dans la grille
- ✅ Sélection max 5 strass
- ✅ Positionnement dans la gouttière blanche
- ✅ Pattern répétitif
- ✅ Changement de taille
- ✅ Export modal
- ✅ Suppression de strass

## Backlog
- P2: Affinage supplémentaire du positionnement si nécessaire
- P2: Sauvegarde des configurations

## Next Tasks
- Aucune tâche critique - MVP complet
