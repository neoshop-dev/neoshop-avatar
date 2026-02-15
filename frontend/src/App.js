import { useState, useRef, useEffect } from "react";
import "@/App.css";

// Les 19 cristaux disponibles - positions dans la grille 5x4 (1080x1080px)
// Chaque cellule fait environ 216x270px
const STONES = [
  { id: "rouge-rubis", name: "Rouge Rubis", col: 0, row: 0 },
  { id: "bleu-marine", name: "Bleu Marine", col: 1, row: 0 },
  { id: "saphir", name: "Saphir", col: 2, row: 0 },
  { id: "or", name: "Or", col: 3, row: 0 },
  { id: "rose", name: "Rose", col: 4, row: 0 },
  { id: "bordeaux", name: "Bordeaux", col: 0, row: 1 },
  { id: "argent", name: "Argent", col: 1, row: 1 },
  { id: "marron", name: "Marron", col: 2, row: 1 },
  { id: "fushia", name: "Fushia", col: 3, row: 1 },
  { id: "amethyst", name: "Amethyst", col: 4, row: 1 },
  { id: "vitrail-clair", name: "Vitrail Clair", col: 0, row: 2 },
  { id: "emeraude", name: "Emeraude", col: 1, row: 2 },
  { id: "saphir-fume", name: "Saphir Fumé", col: 2, row: 2 },
  { id: "bleu-ciel", name: "Bleu Ciel", col: 3, row: 2 },
  { id: "noir-diamant", name: "Noir Diamant", col: 4, row: 2 },
  { id: "orange", name: "Orange", col: 0, row: 3 },
  { id: "violet", name: "Violet", col: 1, row: 3 },
  { id: "bleu-canard", name: "Bleu Canard", col: 2, row: 3 },
  { id: "noir-intense", name: "Noir Intense", col: 3, row: 3 },
];

// Images
const CRYSTALS_GRID_URL = "/crystals-grid.png"; // Grille 1080x1080, 5col x 4row
const FRONTAL_URL = "/frontal-vide.png";         // Frontal vide 2662x567

// Dimensions du sprite
const GRID_SIZE = 1080;
const GRID_COLS = 5;
const GRID_ROWS = 4;
const CELL_WIDTH = GRID_SIZE / GRID_COLS;   // 216px
const CELL_HEIGHT = GRID_SIZE / GRID_ROWS;  // 270px
const CRYSTAL_SIZE_IN_CELL = 140;           // Taille du cristal visible dans la cellule

// Frontal dimensions
const FRONTAL_WIDTH = 2662;
const FRONTAL_HEIGHT = 567;

// Paramètres de la courbe wave basés sur l'analyse de l'image exemple
// La courbe descend au centre et remonte aux extrémités
const CURVE_START_X = 13;   // % depuis la gauche
const CURVE_END_X = 89;     // % depuis la gauche
const CURVE_CENTER_Y = 34;  // Centre de la vague en %
const CURVE_AMPLITUDE = 30; // Amplitude de la vague en %

// Générer les positions des cristaux sur le frontal en suivant la courbe wave
function generateCrystalPositions(count) {
  const positions = [];
  const spanX = CURVE_END_X - CURVE_START_X;
  
  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const x = CURVE_START_X + progress * spanX;
    
    // Courbe sinusoïdale: descend au centre (y augmente), remonte aux bords
    const wavePhase = Math.PI * progress;
    const y = CURVE_CENTER_Y + CURVE_AMPLITUDE * Math.sin(wavePhase);
    
    positions.push({ x, y });
  }
  return positions;
}

// Positions précalculées pour différentes tailles
const ALL_POSITIONS = generateCrystalPositions(112);

const SIZES = [
  { id: "poney", name: "Poney", stones: 70 },
  { id: "cob", name: "Cob", stones: 85 },
  { id: "full", name: "Full", stones: 99 },
  { id: "xl", name: "XL", stones: 112 },
];

// Diamètre des cristaux en % de la largeur du frontal (basé sur ~62px / 2662px)
const CRYSTAL_DIAMETER_PCT = 2.3;

const PRICE = 39;

function App() {
  const [selectedStones, setSelectedStones] = useState([]);
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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
          
          {/* Frontal avec image réelle et strass superposés */}
          <div className="frontal-preview" data-testid="frontal-preview">
            <div className="frontal-image-container" ref={imageContainerRef}>
              {/* Image du frontal */}
              <img 
                src={FRONTAL_URL}
                alt="Frontal personnalisable"
                className="frontal-real-image"
              />
              
              {/* Cristaux superposés sur le frontal */}
              {selectedStones.length > 0 && containerWidth > 0 && (
                <div className="stones-overlay">
                  {(() => {
                    const stonesNeeded = selectedSize.stones;
                    
                    // Centrer les pierres sur le frontal
                    const startIndex = Math.floor((ALL_POSITIONS.length - stonesNeeded) / 2);
                    const positions = ALL_POSITIONS.slice(startIndex, startIndex + stonesNeeded);
                    
                    // Taille du cristal en pixels (basée sur le conteneur)
                    const crystalSizePx = (CRYSTAL_DIAMETER_PCT / 100) * containerWidth;
                    
                    // Échelle pour extraire le cristal du sprite (grille 1080x1080)
                    const scale = crystalSizePx / CRYSTAL_SIZE_IN_CELL;
                    
                    return positions.map((pos, index) => {
                      const stone = selectedStones[index % selectedStones.length];
                      
                      // Position du cristal dans la grille (centre de la cellule)
                      const cellCenterX = (stone.col + 0.5) * CELL_WIDTH;
                      const cellCenterY = (stone.row + 0.5) * CELL_HEIGHT;
                      
                      // Offset pour centrer le cristal
                      const offsetX = (cellCenterX - CRYSTAL_SIZE_IN_CELL / 2) * scale;
                      const offsetY = (cellCenterY - CRYSTAL_SIZE_IN_CELL / 2) * scale;
                      
                      return (
                        <div 
                          key={index}
                          className="overlay-strass"
                          data-testid={`preview-stone-${index}`}
                          style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            width: `${crystalSizePx}px`,
                            height: `${crystalSizePx}px`,
                            backgroundImage: `url(${CRYSTALS_GRID_URL})`,
                            backgroundPosition: `-${offsetX}px -${offsetY}px`,
                            backgroundSize: `${GRID_SIZE * scale}px ${GRID_SIZE * scale}px`,
                          }}
                        />
                      );
                    });
                  })()}
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
                  const scale = displaySize / CRYSTAL_SIZE_IN_CELL;
                  const cellCenterX = (stone.col + 0.5) * CELL_WIDTH;
                  const cellCenterY = (stone.row + 0.5) * CELL_HEIGHT;
                  const offsetX = (cellCenterX - CRYSTAL_SIZE_IN_CELL / 2) * scale;
                  const offsetY = (cellCenterY - CRYSTAL_SIZE_IN_CELL / 2) * scale;
                  
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
                          backgroundImage: `url(${CRYSTALS_GRID_URL})`,
                          backgroundPosition: `-${offsetX}px -${offsetY}px`,
                          backgroundSize: `${GRID_SIZE * scale}px ${GRID_SIZE * scale}px`,
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
              // Afficher le cristal à 60px, centré dans sa cellule
              const displaySize = 60;
              const scale = displaySize / CRYSTAL_SIZE_IN_CELL;
              const cellCenterX = (stone.col + 0.5) * CELL_WIDTH;
              const cellCenterY = (stone.row + 0.5) * CELL_HEIGHT;
              const offsetX = (cellCenterX - CRYSTAL_SIZE_IN_CELL / 2) * scale;
              const offsetY = (cellCenterY - CRYSTAL_SIZE_IN_CELL / 2) * scale;
              
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
                      backgroundImage: `url(${CRYSTALS_GRID_URL})`,
                      backgroundPosition: `-${offsetX}px -${offsetY}px`,
                      backgroundSize: `${GRID_SIZE * scale}px ${GRID_SIZE * scale}px`,
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
