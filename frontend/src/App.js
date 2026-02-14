import { useState, useRef, useEffect } from "react";
import "@/App.css";

// Données des pierres disponibles avec images
// Image sprite 816x1028px contenant les 19 cristaux
// Chaque cristal a un centre spécifique dans le sprite
const STONES = [
  { id: "rouge-rubis", name: "Rouge rubis", color: "#c91b4f", centerX: 82, centerY: 75, radius: 75 },
  { id: "bleu-marine", name: "Bleu marine", color: "#2c3e50", centerX: 245, centerY: 75, radius: 75 },
  { id: "saphir", name: "Saphir", color: "#1a4ecf", centerX: 408, centerY: 75, radius: 75 },
  { id: "or", name: "Or", color: "#d4af37", centerX: 571, centerY: 75, radius: 75 },
  { id: "rose", name: "Rose", color: "#f8c8dc", centerX: 734, centerY: 75, radius: 75 },
  { id: "bordeaux", name: "Bordeaux", color: "#5c1a2e", centerX: 82, centerY: 332, radius: 75 },
  { id: "argent", name: "Argent", color: "#e8e8e8", centerX: 245, centerY: 332, radius: 75 },
  { id: "marron", name: "Marron", color: "#8b7355", centerX: 408, centerY: 332, radius: 75 },
  { id: "fushia", name: "Fushia", color: "#c4196f", centerX: 571, centerY: 332, radius: 75 },
  { id: "amethyst", name: "Amethyst", color: "#d8a9d8", centerX: 734, centerY: 332, radius: 75 },
  { id: "vitrail-clair", name: "Vitrail clair", color: "#e8d5f0", centerX: 82, centerY: 589, radius: 75 },
  { id: "emeraude", name: "Emeraude", color: "#1b8b5a", centerX: 245, centerY: 589, radius: 75 },
  { id: "saphir-fume", name: "Saphir fumé", color: "#6b8e9f", centerX: 408, centerY: 589, radius: 75 },
  { id: "bleu-ciel", name: "Bleu ciel", color: "#87ceeb", centerX: 571, centerY: 589, radius: 75 },
  { id: "noir-diamant", name: "Noir diamant", color: "#4a4a4a", centerX: 734, centerY: 589, radius: 75 },
  { id: "orange", name: "Orange", color: "#ff8c00", centerX: 82, centerY: 846, radius: 75 },
  { id: "violet", name: "Violet", color: "#9b7bb8", centerX: 245, centerY: 846, radius: 75 },
  { id: "bleu-canard", name: "Bleu canard", color: "#2aa198", centerX: 408, centerY: 846, radius: 75 },
  { id: "noir-intense", name: "Noir intense", color: "#1a1a1a", centerX: 571, centerY: 846, radius: 75 },
];

// URL de l'image des strass (816x1028px) - Sprite sheet avec vraies photos des cristaux
const STRASS_IMAGE_URL = "https://customer-assets.emergentagent.com/job_44561739-4d87-4109-a5ab-e657888d1a7c/artifacts/tqxj5zsk_frontal-clips-incurve-en-cristal-personnalisable-plusieurs-couleurs-4623906.webp";
const SPRITE_WIDTH = 816;
const SPRITE_HEIGHT = 1028;
const CRYSTAL_DIAMETER = 150; // Diamètre approximatif d'un cristal dans le sprite

// URL du nouveau frontal Wave Style avec points blancs
const FRONTAL_VIDE_URL = "/browband-wave.png";

// Positions exactes des 42 points blancs pour les strass (attaches exclues)
// Coordonnées en pourcentage (%) relatives à l'image 900x376
const WHITE_DOTS = [
  { x: 21.71, y: 21.29 },
  { x: 23.06, y: 21.35 },
  { x: 24.43, y: 21.41 },
  { x: 25.78, y: 21.47 },
  { x: 27.07, y: 21.73 },
  { x: 28.39, y: 22.00 },
  { x: 29.67, y: 22.44 },
  { x: 30.94, y: 23.07 },
  { x: 32.31, y: 23.78 },
  { x: 33.68, y: 24.65 },
  { x: 34.91, y: 25.69 },
  { x: 36.17, y: 26.78 },
  { x: 37.39, y: 27.93 },
  { x: 38.61, y: 29.07 },
  { x: 39.88, y: 30.30 },
  { x: 41.16, y: 31.45 },
  { x: 42.36, y: 32.56 },
  { x: 43.63, y: 33.50 },
  { x: 44.91, y: 34.43 },
  { x: 46.18, y: 35.09 },
  { x: 47.51, y: 35.44 },
  { x: 48.83, y: 35.37 },
  { x: 50.17, y: 35.03 },
  { x: 51.47, y: 34.34 },
  { x: 52.72, y: 33.43 },
  { x: 54.01, y: 32.50 },
  { x: 55.18, y: 31.38 },
  { x: 56.47, y: 30.25 },
  { x: 57.74, y: 29.00 },
  { x: 58.95, y: 27.87 },
  { x: 60.19, y: 26.70 },
  { x: 61.45, y: 25.63 },
  { x: 62.68, y: 24.60 },
  { x: 64.05, y: 23.68 },
  { x: 65.43, y: 22.99 },
  { x: 66.69, y: 22.37 },
  { x: 67.97, y: 21.90 },
  { x: 69.28, y: 21.61 },
  { x: 70.57, y: 21.41 },
  { x: 71.93, y: 21.30 },
  { x: 73.29, y: 21.29 },
  { x: 74.69, y: 21.24 },
];

// Diamètre des points blancs en % de la largeur de l'image
// Ajusté pour couvrir exactement les points blancs
const DOT_DIAMETER_PCT = 2.8;

const SIZES = [
  { id: "poney", name: "Poney", stones: 25 },
  { id: "cob", name: "Cob", stones: 30 },
  { id: "full", name: "Full", stones: 35 },
  { id: "xl", name: "XL", stones: 42 },  // XL utilise tous les 42 emplacements
];

const PRICE = 39;

function App() {
  const [selectedStones, setSelectedStones] = useState([]);
  const [selectedSize, setSelectedSize] = useState(SIZES[2]); // Full par défaut
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const imageContainerRef = useRef(null);

  // Mesurer la largeur du conteneur pour calculer la taille des strass
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
          
          {/* Frontal avec image réelle vide et strass superposés */}
          <div className="frontal-preview" data-testid="frontal-preview">
            <div className="frontal-image-container" ref={imageContainerRef}>
              {/* Image du frontal vide */}
              <img 
                src={FRONTAL_VIDE_URL}
                alt="Frontal personnalisable"
                className="frontal-real-image"
              />
              
              {/* Strass superposés sur les points blancs - vraies images des cristaux */}
              {selectedStones.length > 0 && containerWidth > 0 && (
                <div className="stones-overlay">
                  {(() => {
                    // Calculer quels points blancs utiliser en fonction de la taille
                    const totalDots = WHITE_DOTS.length; // 42 points disponibles
                    const stonesNeeded = Math.min(selectedSize.stones, totalDots);
                    
                    // Centrer les pierres sur le frontal
                    const startIndex = Math.floor((totalDots - stonesNeeded) / 2);
                    const selectedDots = WHITE_DOTS.slice(startIndex, startIndex + stonesNeeded);
                    
                    // Calculer la taille des strass en pixels (basée sur les points blancs)
                    const stoneSizePx = Math.max(8, (DOT_DIAMETER_PCT / 100) * containerWidth);
                    
                    // Échelle pour le sprite: on veut que CRYSTAL_DIAMETER devienne stoneSizePx
                    const scale = stoneSizePx / CRYSTAL_DIAMETER;
                    
                    return selectedDots.map((dot, index) => {
                      const stone = selectedStones[index % selectedStones.length];
                      
                      // Calculer le décalage pour centrer le cristal sur le point
                      const offsetX = stone.centerX * scale - stoneSizePx / 2;
                      const offsetY = stone.centerY * scale - stoneSizePx / 2;
                      
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
                            backgroundImage: `url(${STRASS_IMAGE_URL})`,
                            backgroundPosition: `-${offsetX}px -${offsetY}px`,
                            backgroundSize: `${SPRITE_WIDTH * scale}px ${SPRITE_HEIGHT * scale}px`,
                            backgroundRepeat: 'no-repeat',
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
