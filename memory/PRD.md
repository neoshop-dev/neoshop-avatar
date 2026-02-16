# PRD - Configurateur de Frontal Équestre

## Problème Original
Création d'un configurateur de frontal équestre personnalisable à intégrer sur la boutique Shopify `equipassion-boutique.com`. L'utilisateur peut choisir un cuir, une taille, et créer un pattern de strass illimité.

## Architecture
- Frontend React standalone avec HTML Canvas
- Export PNG haute résolution
- 3 images de cuir différentes (Noir, Havane, Noisette)
- 19 images de strass individuels
- Intégration Shopify via URL de redirection

## Core Requirements (Tous Implémentés)
- ✅ **3 couleurs de cuir**: Noir, Havane, Noisette (avec swatches réalistes)
- ✅ **3 tailles**: Poney, Cob, Full (informatives)
- ✅ **19 styles de strass disponibles**: 
  - Marron, Saphir, Noir Diamant, Fushia
  - Bleu Marine, Rose, Argent, Turquoise, Bordeaux, Orange
  - Amethyst, Or, Bleu Canard, Vitrail Clair, Saphir Fumé
  - Violet, Emeraude, Noir Intense, Rouge Rubis
- ✅ Pattern illimité (plus de limite de 4 styles)
- ✅ Pattern répétitif sur 33 positions
- ✅ 33 strass individuels positionnés sur la courbe du frontal
- ✅ Rendu Canvas avec mise à jour live
- ✅ Design responsive mobile
- ✅ Zoom modal au clic sur l'aperçu
- ✅ **Intégration Shopify "Ajouter au panier"**

## Intégration Shopify
- **Domaine**: equipassion-boutique.myshopify.com
- **9 Variant IDs configurés** (3 cuirs × 3 tailles)
- **Propriétés transmises au panier**:
  - Cuir (Noir/Havane/Noisette)
  - Taille (Poney/Cob/Full)
  - Pattern strass (liste des couleurs)
- **Méthode**: Redirection URL vers /cart/add

### Variant IDs Shopify
| Cuir | Poney | Cob | Full |
|------|-------|-----|------|
| Noisette | 49778460164435 | 51528913092947 | 51528913125715 |
| Havane | 52860492415315 | 52860492448083 | 52860492480851 |
| Noir | 52860492513619 | 52860492546387 | 52860492579155 |

## Fichiers Clés
- `/app/frontend/src/App.js` - Composant principal avec Canvas et logique Shopify
- `/app/frontend/src/App.css` - Styles et responsive
- `/app/frontend/public/base-frontal-clean.png` - Cuir Noir
- `/app/frontend/public/cuir-havane-clean.png` - Cuir Havane
- `/app/frontend/public/cuir-noisette-clean.png` - Cuir Noisette
- `/app/frontend/public/stone-*.png` - Images de strass
- `/app/frontend/public/style*.png` - Images de strass supplémentaires

## Code d'Intégration Shopify (Popup)
Le configurateur peut être intégré sur une page produit Shopify via un bouton qui ouvre une modal contenant une iframe vers l'URL de preview.

## Historique des Modifications
- Décembre 2025: Création initiale avec 4 strass
- Décembre 2025: Extension à 19 couleurs de strass
- Décembre 2025: Ajout sélecteur de cuir (Noir, Havane, Noisette)
- Décembre 2025: Ajout sélecteur de taille (Poney, Cob, Full)
- Décembre 2025: Suppression limite 4 strass → pattern illimité
- Décembre 2025: Calibrage taille strass à 52px
- Décembre 2025: Nettoyage images Havane/Noisette (artifacts supprimés)
- Décembre 2025: **Intégration Shopify complétée** avec 9 variant IDs
