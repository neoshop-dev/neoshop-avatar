import { useState, useRef, useEffect } from "react";
import "@/App.css";

// Données des pierres disponibles avec images
// Image sprite 816x1028px contenant les 19 cristaux
const STONES = [
  { id: "rouge-rubis", name: "Rouge rubis", color: "#c91b4f", col: 0, row: 0 },
  { id: "bleu-marine", name: "Bleu marine", color: "#2c3e50", col: 1, row: 0 },
  { id: "saphir", name: "Saphir", color: "#1a4ecf", col: 2, row: 0 },
  { id: "or", name: "Or", color: "#d4af37", col: 3, row: 0 },
  { id: "rose", name: "Rose", color: "#f8c8dc", col: 4, row: 0 },
  { id: "bordeaux", name: "Bordeaux", color: "#5c1a2e", col: 0, row: 1 },
  { id: "argent", name: "Argent", color: "#e8e8e8", col: 1, row: 1 },
  { id: "marron", name: "Marron", color: "#8b7355", col: 2, row: 1 },
  { id: "fushia", name: "Fushia", color: "#c4196f", col: 3, row: 1 },
  { id: "amethyst", name: "Amethyst", color: "#d8a9d8", col: 4, row: 1 },
  { id: "vitrail-clair", name: "Vitrail clair", color: "#e8d5f0", col: 0, row: 2 },
  { id: "emeraude", name: "Emeraude", color: "#1b8b5a", col: 1, row: 2 },
  { id: "saphir-fume", name: "Saphir fumé", color: "#6b8e9f", col: 2, row: 2 },
  { id: "bleu-ciel", name: "Bleu ciel", color: "#87ceeb", col: 3, row: 2 },
  { id: "noir-diamant", name: "Noir diamant", color: "#4a4a4a", col: 4, row: 2 },
  { id: "orange", name: "Orange", color: "#ff8c00", col: 0, row: 3 },
  { id: "violet", name: "Violet", color: "#9b7bb8", col: 1, row: 3 },
  { id: "bleu-canard", name: "Bleu canard", color: "#2aa198", col: 2, row: 3 },
  { id: "noir-intense", name: "Noir intense", color: "#1a1a1a", col: 3, row: 3 },
];

// Sprite sheet dimensions et positions des cristaux
const SPRITE_URL = "https://customer-assets.emergentagent.com/job_44561739-4d87-4109-a5ab-e657888d1a7c/artifacts/tqxj5zsk_frontal-clips-incurve-en-cristal-personnalisable-plusieurs-couleurs-4623906.webp";
const SPRITE_WIDTH = 816;
const SPRITE_HEIGHT = 1028;
const CELL_WIDTH = SPRITE_WIDTH / 5;  // 163.2px par cellule
const CELL_HEIGHT = SPRITE_HEIGHT / 4; // 257px par cellule
const CRYSTAL_SIZE = 140; // Taille du cristal dans chaque cellule (zone utile)

// URL du frontal Wave Style nettoyé
const FRONTAL_URL = "/browband-wave.png";

// 42 positions exactes des points blancs (% relatifs à l'image 1000x418)
const WHITE_DOTS = [
  { x: 21.68, y: 21.32 },
  { x: 23.05, y: 21.41 },
  { x: 24.42, y: 21.41 },
  { x: 25.79, y: 21.48 },
  { x: 27.08, y: 21.70 },
  { x: 28.40, y: 21.97 },
  { x: 29.69, y: 22.44 },
  { x: 30.92, y: 23.07 },
  { x: 32.31, y: 23.80 },
  { x: 33.70, y: 24.68 },
  { x: 34.91, y: 25.71 },
  { x: 36.17, y: 26.79 },
  { x: 37.39, y: 27.93 },
  { x: 38.61, y: 29.08 },
  { x: 39.89, y: 30.32 },
  { x: 41.17, y: 31.47 },
  { x: 42.36, y: 32.54 },
  { x: 43.63, y: 33.49 },
  { x: 44.90, y: 34.42 },
  { x: 46.19, y: 35.07 },
  { x: 47.52, y: 35.47 },
  { x: 48.84, y: 35.41 },
  { x: 50.18, y: 35.03 },
  { x: 51.46, y: 34.34 },
  { x: 52.72, y: 33.42 },
  { x: 54.00, y: 32.49 },
  { x: 55.20, y: 31.41 },
  { x: 56.48, y: 30.26 },
  { x: 57.75, y: 29.06 },
  { x: 58.98, y: 27.87 },
  { x: 60.19, y: 26.70 },
  { x: 61.44, y: 25.61 },
  { x: 62.69, y: 24.59 },
  { x: 64.06, y: 23.73 },
  { x: 65.41, y: 23.01 },
  { x: 66.69, y: 22.38 },
  { x: 67.99, y: 21.90 },
  { x: 69.29, y: 21.64 },
  { x: 70.59, y: 21.42 },
  { x: 71.92, y: 21.36 },
  { x: 73.30, y: 21.33 },
  { x: 74.69, y: 21.25 },
];

// Diamètre exact des points blancs en % de la largeur
const DOT_DIAMETER_PCT = 1.114;

const SIZES = [
  { id: "poney", name: "Poney", stones: 25 },
  { id: "cob", name: "Cob", stones: 30 },
  { id: "full", name: "Full", stones: 35 },
  { id: "xl", name: "XL", stones: 42 },
];

const PRICE = 39;

function App() {
  const [selectedStones, setSelectedStones] = useState([]);
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const imageContainerRef = useRef(null);

  // Mesurer la largeur du conteneur
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
              
              {/* Cristaux superposés - positionnement précis sur les points blancs */}
              {selectedStones.length > 0 && containerWidth > 0 && (
                <div className="stones-overlay">
                  {(() => {
                    const totalDots = WHITE_DOTS.length;
                    const stonesNeeded = Math.min(selectedSize.stones, totalDots);
                    
                    // Centrer les pierres sur le frontal
                    const startIndex = Math.floor((totalDots - stonesNeeded) / 2);
                    const selectedDots = WHITE_DOTS.slice(startIndex, startIndex + stonesNeeded);
                    
                    // Taille du cristal = exactement la taille du point blanc
                    const stoneSizePx = (DOT_DIAMETER_PCT / 100) * containerWidth;
                    
                    // Échelle pour extraire le cristal du sprite
                    // Le cristal dans le sprite fait ~140px, on veut qu'il fasse stoneSizePx
                    const scale = stoneSizePx / CRYSTAL_SIZE;
                    
                    return selectedDots.map((dot, index) => {
                      const stone = selectedStones[index % selectedStones.length];
                      
                      // Position du cristal dans le sprite (centre de la cellule)
                      const cellCenterX = (stone.col + 0.5) * CELL_WIDTH;
                      const cellCenterY = (stone.row + 0.5) * CELL_HEIGHT;
                      
                      // Offset pour centrer le cristal dans le conteneur
                      const offsetX = (cellCenterX - CRYSTAL_SIZE / 2) * scale;
                      const offsetY = (cellCenterY - CRYSTAL_SIZE / 2) * scale;
                      
                      return (
                        <div 
                          key={index}
                          className="overlay-strass"
                          data-testid={`preview-stone-${index}`}
                          style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: `${stoneSizePx}px`,
                            height: `${stoneSizePx}px`,
                            backgroundImage: `url(${SPRITE_URL})`,
                            backgroundPosition: `-${offsetX}px -${offsetY}px`,
                            backgroundSize: `${SPRITE_WIDTH * scale}px ${SPRITE_HEIGHT * scale}px`,
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
                          backgroundImage: `url(${SPRITE_URL})`,
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
                      backgroundImage: `url(${SPRITE_URL})`,
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
