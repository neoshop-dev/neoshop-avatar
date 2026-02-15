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

// Positions EXACTES des trous sur le frontal (détectées depuis l'image)
// Courbe polynomiale lissée basée sur l'analyse des points clés
const ALL_POSITIONS = [
  { x: 13.00, y: 24.80 },
  { x: 13.77, y: 24.69 },
  { x: 14.53, y: 24.72 },
  { x: 15.30, y: 24.89 },
  { x: 16.06, y: 25.19 },
  { x: 16.83, y: 25.60 },
  { x: 17.59, y: 26.13 },
  { x: 18.36, y: 26.76 },
  { x: 19.12, y: 27.48 },
  { x: 19.89, y: 28.29 },
  { x: 20.65, y: 29.18 },
  { x: 21.42, y: 30.13 },
  { x: 22.18, y: 31.15 },
  { x: 22.95, y: 32.22 },
  { x: 23.71, y: 33.34 },
  { x: 24.48, y: 34.50 },
  { x: 25.24, y: 35.70 },
  { x: 26.01, y: 36.92 },
  { x: 26.78, y: 38.17 },
  { x: 27.54, y: 39.43 },
  { x: 28.31, y: 40.70 },
  { x: 29.07, y: 41.98 },
  { x: 29.84, y: 43.25 },
  { x: 30.60, y: 44.52 },
  { x: 31.37, y: 45.77 },
  { x: 32.13, y: 47.01 },
  { x: 32.90, y: 48.23 },
  { x: 33.66, y: 49.42 },
  { x: 34.43, y: 50.58 },
  { x: 35.19, y: 51.71 },
  { x: 35.96, y: 52.81 },
  { x: 36.72, y: 53.86 },
  { x: 37.49, y: 54.87 },
  { x: 38.26, y: 55.82 },
  { x: 39.02, y: 56.73 },
  { x: 39.79, y: 57.59 },
  { x: 40.55, y: 58.39 },
  { x: 41.32, y: 59.13 },
  { x: 42.08, y: 59.82 },
  { x: 42.85, y: 60.44 },
  { x: 43.61, y: 60.99 },
  { x: 44.38, y: 61.48 },
  { x: 45.14, y: 61.91 },
  { x: 45.91, y: 62.26 },
  { x: 46.67, y: 62.55 },
  { x: 47.44, y: 62.77 },
  { x: 48.20, y: 62.92 },
  { x: 48.97, y: 63.00 },
  { x: 49.73, y: 63.01 },
  { x: 50.50, y: 62.95 },
  { x: 51.27, y: 62.82 },
  { x: 52.03, y: 62.62 },
  { x: 52.80, y: 62.35 },
  { x: 53.56, y: 62.01 },
  { x: 54.33, y: 61.61 },
  { x: 55.09, y: 61.14 },
  { x: 55.86, y: 60.62 },
  { x: 56.62, y: 60.02 },
  { x: 57.39, y: 59.37 },
  { x: 58.15, y: 58.67 },
  { x: 58.92, y: 57.91 },
  { x: 59.68, y: 57.09 },
  { x: 60.45, y: 56.23 },
  { x: 61.21, y: 55.32 },
  { x: 61.98, y: 54.37 },
  { x: 62.74, y: 53.37 },
  { x: 63.51, y: 52.35 },
  { x: 64.28, y: 51.29 },
  { x: 65.04, y: 50.20 },
  { x: 65.81, y: 49.09 },
  { x: 66.57, y: 47.96 },
  { x: 67.34, y: 46.81 },
  { x: 68.10, y: 45.66 },
  { x: 68.87, y: 44.50 },
  { x: 69.63, y: 43.34 },
  { x: 70.40, y: 42.19 },
  { x: 71.16, y: 41.04 },
  { x: 71.93, y: 39.92 },
  { x: 72.69, y: 38.82 },
  { x: 73.46, y: 37.76 },
  { x: 74.22, y: 36.73 },
  { x: 74.99, y: 35.74 },
  { x: 75.76, y: 34.80 },
  { x: 76.52, y: 33.92 },
  { x: 77.29, y: 33.11 },
  { x: 78.05, y: 32.37 },
  { x: 78.82, y: 31.71 },
  { x: 79.58, y: 31.14 },
  { x: 80.35, y: 30.66 },
  { x: 81.11, y: 30.29 },
  { x: 81.88, y: 30.04 },
  { x: 82.64, y: 29.90 },
  { x: 83.41, y: 29.90 },
  { x: 84.17, y: 30.04 },
  { x: 84.94, y: 30.33 },
  { x: 85.70, y: 30.78 },
  { x: 86.47, y: 31.40 },
  { x: 87.23, y: 32.20 },
  { x: 88.00, y: 33.19 },
];

const SIZES = [
  { id: "poney", name: "Poney", stones: 60 },
  { id: "cob", name: "Cob", stones: 75 },
  { id: "full", name: "Full", stones: 85 },
  { id: "xl", name: "XL", stones: 99 },
];

// Diamètre des cristaux en % de la largeur du frontal
// Ajusté pour correspondre aux emplacements sur l'image
const CRYSTAL_DIAMETER_PCT = 2.0;

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
