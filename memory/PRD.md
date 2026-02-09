# PRD - Configurateur de Frontal Équestre

## Problème Original
Création d'un configurateur de frontal pour chevaux personnalisable pour le site https://equipassion-boutique.com (Shopify). Les clients peuvent choisir des pierres et visualiser le résultat sur un frontal, puis exporter le code HTML pour Shopify.

## Architecture
- Frontend React standalone
- Pas de backend nécessaire (tout côté client)
- Export HTML pour intégration Shopify

## User Personas
- Cavaliers propriétaires de chevaux
- Acheteurs de produits équestres sur Shopify

## Core Requirements (Static)
- 19 couleurs de pierres disponibles
- Maximum 5 pierres sélectionnables
- 4 tailles: Poney (25), Cob (30), Full (35), XL (35)
- Prix fixe: 39€
- Pattern répétitif sur le frontal
- Export code HTML pour Shopify

## Implémenté (Février 2026)
- ✅ Interface de sélection de pierres avec grille visuelle
- ✅ Prévisualisation du frontal en cuir marron avec pierres et attaches dorées
- ✅ Pattern répétitif des pierres sur la bande de cuir
- ✅ Sélection de taille (Poney, Cob, Full, XL)
- ✅ Export HTML avec code prêt pour Shopify + properties pour panier
- ✅ Bouton copier le code
- ✅ Récapitulatif de commande
- ✅ Design responsive

## Tests Passés
- ✅ Sélection de pierres (max 5)
- ✅ Affichage pattern répétitif
- ✅ Changement de taille
- ✅ Suppression de pierre
- ✅ Export modal
- ✅ Code HTML généré correctement

## Backlog P0/P1/P2
- P2: Forme courbée du frontal (SVG)
- P2: Sauvegarde des configurations
- P2: Partage social de la création

## Next Tasks
- Aucune tâche critique - MVP complet
