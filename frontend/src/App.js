import { useState, useCallback } from "react";
import "@/App.css";

// Données des pierres disponibles avec images
// Image 816x1028px, grille 5x4
// Les rangées sont espacées d'environ 257px, les gemmes sont centrées ~95px depuis le haut de chaque cellule
const STONES = [
  { id: "rouge-rubis", name: "Rouge rubis", color: "#c91b4f", centerX: 82, centerY: 75 },
  { id: "bleu-marine", name: "Bleu marine", color: "#2c3e50", centerX: 245, centerY: 75 },
  { id: "saphir", name: "Saphir", color: "#1a4ecf", centerX: 408, centerY: 75 },
  { id: "or", name: "Or", color: "#d4af37", centerX: 571, centerY: 75 },
  { id: "rose", name: "Rose", color: "#f8c8dc", centerX: 734, centerY: 75 },
  { id: "bordeaux", name: "Bordeaux", color: "#5c1a2e", centerX: 82, centerY: 332 },
  { id: "argent", name: "Argent", color: "#e8e8e8", centerX: 245, centerY: 332 },
  { id: "marron", name: "Marron", color: "#8b7355", centerX: 408, centerY: 332 },
  { id: "fushia", name: "Fushia", color: "#c4196f", centerX: 571, centerY: 332 },
  { id: "amethyst", name: "Amethyst", color: "#d8a9d8", centerX: 734, centerY: 332 },
  { id: "vitrail-clair", name: "Vitrail clair", color: "#e8d5f0", centerX: 82, centerY: 589 },
  { id: "emeraude", name: "Emeraude", color: "#1b8b5a", centerX: 245, centerY: 589 },
  { id: "saphir-fume", name: "Saphir fumé", color: "#6b8e9f", centerX: 408, centerY: 589 },
  { id: "bleu-ciel", name: "Bleu ciel", color: "#87ceeb", centerX: 571, centerY: 589 },
  { id: "noir-diamant", name: "Noir diamant", color: "#4a4a4a", centerX: 734, centerY: 589 },
  { id: "orange", name: "Orange", color: "#ff8c00", centerX: 82, centerY: 846 },
  { id: "violet", name: "Violet", color: "#9b7bb8", centerX: 245, centerY: 846 },
  { id: "bleu-canard", name: "Bleu canard", color: "#2aa198", centerX: 408, centerY: 846 },
  { id: "noir-intense", name: "Noir intense", color: "#1a1a1a", centerX: 571, centerY: 846 },
];

// URL de l'image des strass (816x1028px)
const STRASS_IMAGE_URL = "https://customer-assets.emergentagent.com/job_frontal-custom/artifacts/1savtp9b_frontal-clips-incurve-en-cristal-personnalisable-plusieurs-couleurs-4623906.png";
const SPRITE_WIDTH = 816;
const SPRITE_HEIGHT = 1028;

// URL du frontal vide
const FRONTAL_VIDE_URL = "https://customer-assets.emergentagent.com/job_frontal-custom/artifacts/fhx4ipga_1770657882636.png";

const SIZES = [
  { id: "poney", name: "Poney", stones: 25 },
  { id: "cob", name: "Cob", stones: 30 },
  { id: "full", name: "Full", stones: 35 },
  { id: "xl", name: "XL", stones: 35 },
];

const PRICE = 39;

function App() {
  const [selectedStones, setSelectedStones] = useState([]);
  const [selectedSize, setSelectedSize] = useState(SIZES[2]); // Full par défaut
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ajouter une pierre à la sélection
  const addStone = (stone) => {
    if (selectedStones.length < 5) {
      setSelectedStones([...selectedStones, stone]);
    }
  };

  // Retirer une pierre de la sélection
  const removeStone = (index) => {
    setSelectedStones(selectedStones.filter((_, i) => i !== index));
  };

  // Générer le pattern de pierres pour le frontal
  const generatePattern = useCallback(() => {
    if (selectedStones.length === 0) return [];
    const pattern = [];
    for (let i = 0; i < selectedSize.stones; i++) {
      pattern.push(selectedStones[i % selectedStones.length]);
    }
    return pattern;
  }, [selectedStones, selectedSize]);

  // Générer le code HTML pour Shopify
  const generateShopifyCode = () => {
    const stoneNames = selectedStones.map(s => s.name).join(" + ");
    const patternDescription = selectedStones.map((s, i) => `${i + 1}. ${s.name}`).join(", ");
    
    return `<!-- Frontal Personnalisé - Equipassion Boutique -->
<div class="frontal-order-summary" style="background: #f8f7f5; padding: 20px; border-radius: 12px; margin: 20px 0; font-family: 'Playfair Display', serif;">
  <h3 style="color: #2c2c2c; margin-bottom: 15px; font-size: 18px;">Votre Frontal Personnalisé</h3>
  
  <div style="margin-bottom: 15px;">
    <strong style="color: #5c5c5c;">Taille:</strong> 
    <span style="color: #2c2c2c;">${selectedSize.name}</span>
  </div>
  
  <div style="margin-bottom: 15px;">
    <strong style="color: #5c5c5c;">Pierres sélectionnées (${selectedStones.length}):</strong>
    <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
      ${selectedStones.map(s => `<span style="background: ${s.color}; color: ${['argent', 'or', 'rose', 'amethyst', 'vitrail-clair', 'bleu-ciel'].includes(s.id) ? '#2c2c2c' : '#fff'}; padding: 4px 12px; border-radius: 20px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;"><span style="width: 12px; height: 12px; border-radius: 50%; background: ${s.color}; border: 1px solid rgba(0,0,0,0.2);"></span>${s.name}</span>`).join('')}
    </div>
  </div>
  
  <div style="margin-bottom: 15px;">
    <strong style="color: #5c5c5c;">Pattern répétitif:</strong>
    <span style="color: #2c2c2c;">${patternDescription}</span>
  </div>
  
  <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 15px;">
    <span style="font-size: 24px; color: #2c2c2c; font-weight: bold;">${PRICE},00 €</span>
  </div>
</div>

<!-- Propriétés de ligne pour Shopify (ajouter au formulaire produit) -->
<input type="hidden" name="properties[Taille]" value="${selectedSize.name}">
<input type="hidden" name="properties[Pierres]" value="${stoneNames}">
<input type="hidden" name="properties[Pattern]" value="${patternDescription}">`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShopifyCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur copie:", err);
    }
  };

  const pattern = generatePattern();

  return (
    <div className="app-container" data-testid="frontal-configurator">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 data-testid="main-title">Créez Votre Frontal</h1>
          <p className="subtitle">Personnalisez les pierres de votre frontal équestre</p>
        </div>
      </header>

      <main className="main-content">
        {/* Section Prévisualisation */}
        <section className="preview-section" data-testid="preview-section">
          <h2>Prévisualisation</h2>
          
          {/* Frontal avec image réelle vide et strass superposés */}
          <div className="frontal-preview" data-testid="frontal-preview">
            <div className="frontal-image-container">
              {/* Image du frontal vide */}
              <img 
                src={FRONTAL_VIDE_URL}
                alt="Frontal personnalisable"
                className="frontal-real-image"
              />
              
              {/* Strass superposés DANS la gouttière blanche */}
              {selectedStones.length > 0 && (
                <div className="stones-overlay">
                  {Array.from({ length: selectedSize.stones }, (_, index) => {
                    const stone = selectedStones[index % selectedStones.length];
                    const progress = index / (selectedSize.stones - 1);
                    
                    // Trajectoire EXACTE de la gouttière blanche
                    // Ajustée pour être parfaitement dans le canal blanc
                    const points = [
                      { x: 17, y: 16 },
                      { x: 21, y: 27 },
                      { x: 27, y: 40 },
                      { x: 35, y: 54 },
                      { x: 45, y: 70 }
                    ];
                    
                    // Catmull-Rom spline interpolation
                    const t = progress * (points.length - 1);
                    const i = Math.min(Math.floor(t), points.length - 2);
                    const f = t - i;
                    
                    const p0 = points[Math.max(0, i - 1)];
                    const p1 = points[i];
                    const p2 = points[Math.min(points.length - 1, i + 1)];
                    const p3 = points[Math.min(points.length - 1, i + 2)];
                    
                    const x = 0.5 * (
                      2 * p1.x +
                      (-p0.x + p2.x) * f +
                      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * f * f +
                      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * f * f * f
                    );
                    const y = 0.5 * (
                      2 * p1.y +
                      (-p0.y + p2.y) * f +
                      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * f * f +
                      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * f * f * f
                    );
                    
                    const overlaySize = 14;
                    const scale = overlaySize / 140;
                    const offsetX = stone.centerX * scale - overlaySize/2;
                    const offsetY = stone.centerY * scale - overlaySize/2;
                    
                    return (
                      <div 
                        key={index}
                        className="overlay-strass"
                        data-testid={`preview-stone-${index}`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          backgroundImage: `url(${STRASS_IMAGE_URL})`,
                          backgroundPosition: `-${offsetX}px -${offsetY}px`,
                          backgroundSize: `${SPRITE_WIDTH * scale}px ${SPRITE_HEIGHT * scale}px`,
                        }}
                      />
                    );
                  })}
                </div>
              )}
              
              {/* Message si pas de pierres */}
              {selectedStones.length === 0 && (
                <div className="overlay-message">
                  Sélectionnez des pierres ci-dessous
                </div>
              )}
            </div>
          </div>

          {/* Infos sélection */}
          <div className="selection-info">
            <div className="info-item">
              <span className="label">Taille:</span>
              <span className="value" data-testid="selected-size">{selectedSize.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Pierres:</span>
              <span className="value" data-testid="stone-count">{selectedStones.length}/5</span>
            </div>
            <div className="info-item price">
              <span className="label">Prix:</span>
              <span className="value" data-testid="price">{PRICE},00 €</span>
            </div>
          </div>
        </section>

        {/* Section Sélection des pierres */}
        <section className="stones-selection-section" data-testid="stones-selection">
          <h2>1. Sélectionnez vos pierres <span className="hint">(max 5, dans l'ordre souhaité)</span></h2>
          
          {/* Pierres sélectionnées */}
          {selectedStones.length > 0 && (
            <div className="selected-stones" data-testid="selected-stones">
              <h3>Votre sélection:</h3>
              <div className="selected-stones-list">
                {selectedStones.map((stone, index) => {
                  const displaySize = 36;
                  const scale = displaySize / 140;
                  const offsetX = stone.centerX * scale - displaySize/2;
                  const offsetY = stone.centerY * scale - displaySize/2;
                  
                  return (
                    <div 
                      key={index} 
                      className="selected-stone-item"
                      data-testid={`selected-stone-${index}`}
                    >
                      <span className="order-number">{index + 1}</span>
                      <div 
                        className="stone-preview-image" 
                        style={{ 
                          backgroundImage: `url(${STRASS_IMAGE_URL})`,
                          backgroundPosition: `-${offsetX}px -${offsetY}px`,
                          backgroundSize: `${SPRITE_WIDTH * scale}px ${SPRITE_HEIGHT * scale}px`,
                        }}
                      />
                      <span className="stone-name">{stone.name}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => removeStone(index)}
                        data-testid={`remove-stone-${index}`}
                        aria-label={`Retirer ${stone.name}`}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              <button 
                className="clear-btn"
                onClick={() => setSelectedStones([])}
                data-testid="clear-all-stones"
              >
                Tout effacer
              </button>
            </div>
          )}

          {/* Grille des pierres avec vraies images */}
          <div className="stones-grid" data-testid="stones-grid">
            {STONES.map((stone) => {
              // Afficher la gemme à 60px, centrée sur son centre dans le sprite
              const displaySize = 60;
              const scale = displaySize / 140; // échelle pour afficher à 60px
              const offsetX = stone.centerX * scale - displaySize/2;
              const offsetY = stone.centerY * scale - displaySize/2;
              
              return (
                <button
                  key={stone.id}
                  className={`stone-option ${selectedStones.some(s => s.id === stone.id) ? 'selected' : ''}`}
                  onClick={() => addStone(stone)}
                  disabled={selectedStones.length >= 5}
                  data-testid={`stone-option-${stone.id}`}
                >
                  <div 
                    className="stone-circle-image"
                    style={{ 
                      backgroundImage: `url(${STRASS_IMAGE_URL})`,
                      backgroundPosition: `-${offsetX}px -${offsetY}px`,
                      backgroundSize: `${SPRITE_WIDTH * scale}px ${SPRITE_HEIGHT * scale}px`,
                    }}
                  />
                  <span className="stone-label">{stone.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section Taille */}
        <section className="size-section" data-testid="size-selection">
          <h2>2. Choisissez la taille</h2>
          <div className="sizes-grid">
            {SIZES.map((size) => (
              <button
                key={size.id}
                className={`size-option ${selectedSize.id === size.id ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
                data-testid={`size-option-${size.id}`}
              >
                <span className="size-name">{size.name}</span>
                <span className="size-stones">{size.stones} pierres</span>
              </button>
            ))}
          </div>
        </section>

        {/* Boutons d'action */}
        <section className="actions-section" data-testid="actions-section">
          <button 
            className="btn-primary"
            onClick={() => setShowExportModal(true)}
            disabled={selectedStones.length === 0}
            data-testid="export-btn"
          >
            Exporter pour Shopify
          </button>
        </section>
      </main>

      {/* Modal Export */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)} data-testid="export-modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowExportModal(false)}
              data-testid="close-modal"
            >
              ×
            </button>
            <h2>Code HTML pour Shopify</h2>
            <p className="modal-description">
              Copiez ce code et ajoutez-le dans la description de votre produit Shopify 
              ou dans un bloc HTML personnalisé.
            </p>
            <div className="code-container">
              <pre data-testid="shopify-code">{generateShopifyCode()}</pre>
            </div>
            <button 
              className={`btn-copy ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
              data-testid="copy-btn"
            >
              {copied ? '✓ Copié !' : 'Copier le code'}
            </button>
            
            <div className="export-summary">
              <h3>Récapitulatif de la commande</h3>
              <div className="summary-item">
                <span>Taille:</span>
                <strong>{selectedSize.name}</strong>
              </div>
              <div className="summary-item">
                <span>Pierres:</span>
                <strong>{selectedStones.map(s => s.name).join(' + ')}</strong>
              </div>
              <div className="summary-item">
                <span>Pattern:</span>
                <strong>{selectedStones.map((s, i) => `${i+1}. ${s.name}`).join(', ')}</strong>
              </div>
              <div className="summary-item total">
                <span>Prix:</span>
                <strong>{PRICE},00 €</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Equipassion Boutique - Configurateur de Frontal</p>
      </footer>
    </div>
  );
}

export default App;
