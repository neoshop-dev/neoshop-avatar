import { useState, useCallback } from "react";
import "@/App.css";

// Données des pierres disponibles
const STONES = [
  { id: "rouge-rubis", name: "Rouge rubis", color: "#c91b4f" },
  { id: "bleu-marine", name: "Bleu marine", color: "#2c3e50" },
  { id: "saphir", name: "Saphir", color: "#1a4ecf" },
  { id: "or", name: "Or", color: "#d4af37" },
  { id: "rose", name: "Rose", color: "#f8c8dc" },
  { id: "bordeaux", name: "Bordeaux", color: "#5c1a2e" },
  { id: "argent", name: "Argent", color: "#e8e8e8" },
  { id: "marron", name: "Marron", color: "#8b7355" },
  { id: "fushia", name: "Fushia", color: "#c4196f" },
  { id: "amethyst", name: "Amethyst", color: "#d8a9d8" },
  { id: "vitrail-clair", name: "Vitrail clair", color: "#e8d5f0" },
  { id: "emeraude", name: "Emeraude", color: "#1b8b5a" },
  { id: "saphir-fume", name: "Saphir fumé", color: "#6b8e9f" },
  { id: "bleu-ciel", name: "Bleu ciel", color: "#87ceeb" },
  { id: "noir-diamant", name: "Noir diamant", color: "#4a4a4a" },
  { id: "orange", name: "Orange", color: "#ff8c00" },
  { id: "violet", name: "Violet", color: "#9b7bb8" },
  { id: "bleu-canard", name: "Bleu canard", color: "#2aa198" },
  { id: "noir-intense", name: "Noir intense", color: "#1a1a1a" },
];

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
          
          {/* Frontal visuel courbé */}
          <div className="frontal-preview" data-testid="frontal-preview">
            <svg viewBox="0 0 600 140" className="frontal-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5a4a3a"/>
                  <stop offset="40%" stopColor="#3a2a1a"/>
                  <stop offset="60%" stopColor="#2a1a0a"/>
                  <stop offset="100%" stopColor="#4a3a2a"/>
                </linearGradient>
                <radialGradient id="goldGrad">
                  <stop offset="0%" stopColor="#ffd700"/>
                  <stop offset="50%" stopColor="#daa520"/>
                  <stop offset="100%" stopColor="#b8860b"/>
                </radialGradient>
              </defs>
              
              {/* Fond beige/fourrure */}
              <rect x="0" y="0" width="600" height="140" fill="#e8dcc8"/>
              
              {/* Ombre du cuir */}
              <path 
                d="M 50 100 Q 300 25 550 100" 
                fill="none" 
                stroke="rgba(0,0,0,0.3)" 
                strokeWidth="34"
                strokeLinecap="round"
              />
              
              {/* Bande de cuir principale */}
              <path 
                d="M 50 100 Q 300 25 550 100" 
                fill="none" 
                stroke="url(#leatherGrad)" 
                strokeWidth="30"
                strokeLinecap="round"
              />
              
              {/* Ligne de couture haute */}
              <path 
                d="M 55 98 Q 300 28 545 98" 
                fill="none" 
                stroke="rgba(139,69,19,0.4)" 
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              
              {/* Ligne de couture basse */}
              <path 
                d="M 55 102 Q 300 22 545 102" 
                fill="none" 
                stroke="rgba(139,69,19,0.4)" 
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              
              {/* Pierres sur la courbe */}
              {pattern.length > 0 ? (
                pattern.map((stone, index) => {
                  // Position sur la courbe avec marges
                  const margin = 0.08;
                  const t = margin + (index / (pattern.length - 1 || 1)) * (1 - 2 * margin);
                  
                  // Courbe de Bézier quadratique P0(50,100) Q(300,25) P2(550,100)
                  const x = (1-t)*(1-t)*50 + 2*(1-t)*t*300 + t*t*550;
                  const y = (1-t)*(1-t)*100 + 2*(1-t)*t*25 + t*t*100;
                  
                  return (
                    <g key={index} data-testid={`preview-stone-${index}`}>
                      {/* Base griffe dorée */}
                      <circle cx={x} cy={y} r="9" fill="#8b7533"/>
                      {/* Griffe dorée brillante */}
                      <circle cx={x} cy={y} r="8" fill="url(#goldGrad)"/>
                      {/* Pierre cristal */}
                      <circle cx={x} cy={y} r="6.5" fill={stone.color}/>
                      {/* Reflet principal */}
                      <ellipse cx={x-1.5} cy={y-1.5} rx="2.5" ry="1.5" fill="rgba(255,255,255,0.7)"/>
                      {/* Point brillant */}
                      <circle cx={x-2} cy={y-2} r="1" fill="white"/>
                    </g>
                  );
                })
              ) : (
                <text x="300" y="70" textAnchor="middle" fill="#8b8b8b" fontSize="14" fontStyle="italic">
                  Sélectionnez des pierres ci-dessous
                </text>
              )}
              
              {/* Attache gauche */}
              <ellipse cx="45" cy="102" rx="12" ry="10" fill="#3a2a1a"/>
              <circle cx="45" cy="102" r="7" fill="url(#goldGrad)"/>
              <circle cx="45" cy="102" r="4" fill="#8b7533"/>
              
              {/* Attache droite */}
              <ellipse cx="555" cy="102" rx="12" ry="10" fill="#3a2a1a"/>
              <circle cx="555" cy="102" r="7" fill="url(#goldGrad)"/>
              <circle cx="555" cy="102" r="4" fill="#8b7533"/>
            </svg>
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
                {selectedStones.map((stone, index) => (
                  <div 
                    key={index} 
                    className="selected-stone-item"
                    data-testid={`selected-stone-${index}`}
                  >
                    <span className="order-number">{index + 1}</span>
                    <div 
                      className="stone-preview" 
                      style={{ background: stone.color }}
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
                ))}
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

          {/* Grille des pierres */}
          <div className="stones-grid" data-testid="stones-grid">
            {STONES.map((stone) => (
              <button
                key={stone.id}
                className={`stone-option ${selectedStones.some(s => s.id === stone.id) ? 'selected' : ''}`}
                onClick={() => addStone(stone)}
                disabled={selectedStones.length >= 5}
                data-testid={`stone-option-${stone.id}`}
              >
                <div 
                  className="stone-circle"
                  style={{ 
                    background: `radial-gradient(circle at 30% 30%, ${stone.color}ee, ${stone.color})`,
                    boxShadow: `0 4px 12px ${stone.color}44`
                  }}
                />
                <span className="stone-label">{stone.name}</span>
              </button>
            ))}
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
