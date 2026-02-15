import { useState, useRef, useEffect, useCallback } from "react";
import "@/App.css";

// Les 19 styles de strass disponibles
const STONE_STYLES = [
  { id: "marron", name: "Marron", src: "/stone-marron.png" },
  { id: "saphir", name: "Saphir", src: "/stone-saphir.png" },
  { id: "noir-diamant", name: "Noir Diamant", src: "/stone-noir-diamant.png" },
  { id: "fushia", name: "Fushia", src: "/stone-fushia.png" },
  { id: "bleu-marine", name: "Bleu Marine", src: "/style5.png" },
  { id: "rose", name: "Rose", src: "/style6.png" },
  { id: "argent", name: "Argent", src: "/style7.png" },
  { id: "turquoise", name: "Turquoise", src: "/style8.png" },
  { id: "bordeaux", name: "Bordeaux", src: "/style9.png" },
  { id: "orange", name: "Orange", src: "/style10.png" },
  { id: "amethyst", name: "Amethyst", src: "/style11.png" },
  { id: "or", name: "Or", src: "/style12.png" },
  { id: "bleu-canard", name: "Bleu Canard", src: "/style13.png" },
  { id: "vitrail-clair", name: "Vitrail Clair", src: "/style14.png" },
  { id: "saphir-fume", name: "Saphir Fumé", src: "/style15.png" },
  { id: "violet", name: "Violet", src: "/style16.png" },
  { id: "emeraude", name: "Emeraude", src: "/style17.png" },
  { id: "noir-intense", name: "Noir Intense", src: "/style18.png" },
  { id: "rouge-rubis", name: "Rouge Rubis", src: "/style19.png" },
];

// Image de base du frontal (sans les points verts)
const BASE_IMAGE_URL = "/base-frontal-clean.png";
const BASE_WIDTH = 2816;
const BASE_HEIGHT = 557;

// Positions exactes des 33 points verts détectés sur l'image de base
const STONE_POSITIONS = [
  { x: 721, y: 186 },
  { x: 770, y: 191 },
  { x: 820, y: 201 },
  { x: 871, y: 212 },
  { x: 921, y: 224 },
  { x: 971, y: 239 },
  { x: 1019, y: 255 },
  { x: 1064, y: 272 },
  { x: 1108, y: 289 },
  { x: 1153, y: 305 },
  { x: 1194, y: 316 },
  { x: 1241, y: 333 },
  { x: 1290, y: 347 },
  { x: 1340, y: 356 },
  { x: 1387, y: 363 },
  { x: 1434, y: 368 },
  { x: 1483, y: 370 },
  { x: 1531, y: 368 },
  { x: 1580, y: 365 },
  { x: 1630, y: 360 },
  { x: 1678, y: 349 },
  { x: 1723, y: 337 },
  { x: 1768, y: 327 },
  { x: 1813, y: 315 },
  { x: 1860, y: 300 },
  { x: 1908, y: 286 },
  { x: 1955, y: 272 },
  { x: 2003, y: 258 },
  { x: 2050, y: 246 },
  { x: 2096, y: 234 },
  { x: 2144, y: 225 },
  { x: 2193, y: 219 },
  { x: 2242, y: 213 },
];

// Taille des strass en pixels sur l'image originale
// Calibré pour que les cristaux se frôlent légèrement
const STONE_SIZE = 52;

const PRICE = 39;

function App() {
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [baseImage, setBaseImage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showZoom, setShowZoom] = useState(false);
  const canvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const containerRef = useRef(null);

  // Charger les images au démarrage
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = STONE_STYLES.length + 1; // +1 pour l'image de base
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setIsLoading(false);
      }
    };

    // Charger l'image de base
    const base = new Image();
    base.crossOrigin = "anonymous";
    base.onload = () => {
      setBaseImage(base);
      checkAllLoaded();
    };
    base.onerror = checkAllLoaded;
    base.src = BASE_IMAGE_URL;

    // Charger les images des strass
    STONE_STYLES.forEach((style) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [style.id]: img }));
        checkAllLoaded();
      };
      img.onerror = checkAllLoaded;
      img.src = style.src;
    });
  }, []);

  // Dessiner sur le canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !displayCanvas || !baseImage || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const displayCtx = displayCanvas.getContext("2d", { alpha: false });

    // Canvas haute résolution pour l'export
    canvas.width = BASE_WIDTH;
    canvas.height = BASE_HEIGHT;
    
    // Activer le lissage haute qualité
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Dessiner l'image de base
    ctx.drawImage(baseImage, 0, 0, BASE_WIDTH, BASE_HEIGHT);

    // Si des styles sont sélectionnés, dessiner les 33 strass
    if (selectedStyles.length > 0) {
      STONE_POSITIONS.forEach((pos, index) => {
        const styleIndex = index % selectedStyles.length;
        const style = selectedStyles[styleIndex];
        const stoneImg = loadedImages[style.id];

        if (stoneImg) {
          const drawX = pos.x - STONE_SIZE / 2;
          const drawY = pos.y - STONE_SIZE / 2;
          ctx.drawImage(stoneImg, drawX, drawY, STONE_SIZE, STONE_SIZE);
        }
      });
    }

    // Canvas d'affichage avec support haute densité (Retina)
    const containerWidth = container.offsetWidth;
    const scale = containerWidth / BASE_WIDTH;
    const displayWidth = containerWidth;
    const displayHeight = BASE_HEIGHT * scale;
    
    // Utiliser une densité minimum de 2 pour assurer la qualité
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    
    // Définir la taille réelle du canvas (pixels physiques)
    displayCanvas.width = Math.round(displayWidth * dpr);
    displayCanvas.height = Math.round(displayHeight * dpr);
    
    // Définir la taille CSS (pixels logiques)
    displayCanvas.style.width = displayWidth + 'px';
    displayCanvas.style.height = displayHeight + 'px';
    
    // Activer le lissage haute qualité pour l'affichage
    displayCtx.imageSmoothingEnabled = true;
    displayCtx.imageSmoothingQuality = 'high';
    
    // Dessiner l'image source sur le canvas d'affichage avec scaling
    displayCtx.drawImage(
      canvas, 
      0, 0, BASE_WIDTH, BASE_HEIGHT,
      0, 0, displayCanvas.width, displayCanvas.height
    );
  }, [baseImage, selectedStyles, loadedImages]);

  // Redessiner quand les dépendances changent
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Redessiner lors du redimensionnement
  useEffect(() => {
    const handleResize = () => drawCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawCanvas]);

  // Ajouter un style à la sélection (illimité)
  const addStyle = (style) => {
    setSelectedStyles([...selectedStyles, style]);
  };

  // Retirer un style de la sélection
  const removeStyle = (index) => {
    setSelectedStyles(selectedStyles.filter((_, i) => i !== index));
  };

  // Exporter en PNG
  const exportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);

    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.download = "frontal-personnalise.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    setTimeout(() => setIsExporting(false), 1000);
  };

  // Générer la description du pattern
  const getPatternDescription = () => {
    if (selectedStyles.length === 0) return "Aucun style sélectionné";
    return selectedStyles.map((s) => s.name).join(" → ") + " (répété 33x)";
  };

  return (
    <div className="app-container" data-testid="frontal-configurator">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 data-testid="main-title">Créez Votre Frontal</h1>
          <p className="subtitle">Personnalisez les strass de votre frontal</p>
        </div>
      </header>

      <main className="main-content">
        {/* Section Prévisualisation */}
        <section className="preview-section" data-testid="preview-section">
          <h2>Prévisualisation</h2>

          <div className="frontal-preview" data-testid="frontal-preview">
            <div className="canvas-container" ref={containerRef} onClick={() => !isLoading && setShowZoom(true)}>
              {/* Canvas caché pour l'export haute résolution */}
              <canvas ref={canvasRef} style={{ display: "none" }} />
              {/* Canvas d'affichage */}
              <canvas
                ref={displayCanvasRef}
                className="preview-canvas"
                data-testid="preview-canvas"
              />
              {isLoading && (
                <div className="overlay-message loading">
                  Chargement des images...
                </div>
              )}
              {!isLoading && selectedStyles.length === 0 && (
                <div className="overlay-message">
                  Sélectionnez des styles de strass ci-dessous
                </div>
              )}
              {!isLoading && selectedStyles.length > 0 && (
                <div className="zoom-hint">
                  👆 Cliquez pour zoomer
                </div>
              )}
            </div>
          </div>

          {/* Infos sélection */}
          <div className="selection-info">
            <div className="info-item">
              <span className="label">Strass:</span>
              <span className="value" data-testid="stone-count">33 pierres</span>
            </div>
            <div className="info-item">
              <span className="label">Pattern:</span>
              <span className="value" data-testid="pattern-desc">
                {selectedStyles.length}/4 styles
              </span>
            </div>
            <div className="info-item price">
              <span className="label">Prix:</span>
              <span className="value" data-testid="price">{PRICE},00 €</span>
            </div>
          </div>
        </section>

        {/* Section Sélection des styles */}
        <section className="stones-selection-section" data-testid="stones-selection">
          <h2>
            1. Sélectionnez vos styles{" "}
            <span className="hint">(1 à 4 styles, dans l'ordre souhaité)</span>
          </h2>

          {/* Styles sélectionnés */}
          {selectedStyles.length > 0 && (
            <div className="selected-stones" data-testid="selected-stones">
              <h3>Votre pattern: {getPatternDescription()}</h3>
              <div className="selected-stones-list">
                {selectedStyles.map((style, index) => (
                  <div key={index} className="selected-stone-item" data-testid={`selected-style-${index}`}>
                    <span className="order-number">{index + 1}</span>
                    <img
                      src={style.src}
                      alt={style.name}
                      className="stone-preview-img"
                    />
                    <span className="stone-name">{style.name}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeStyle(index)}
                      data-testid={`remove-style-${index}`}
                      aria-label={`Retirer ${style.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="clear-btn"
                onClick={() => setSelectedStyles([])}
                data-testid="clear-all-styles"
              >
                Tout effacer
              </button>
            </div>
          )}

          {/* Grille des styles disponibles */}
          <div className="styles-grid" data-testid="styles-grid">
            {STONE_STYLES.map((style) => (
              <button
                key={style.id}
                className="style-option"
                onClick={() => addStyle(style)}
                disabled={selectedStyles.length >= 4}
                data-testid={`style-option-${style.id}`}
              >
                <img
                  src={style.src}
                  alt={style.name}
                  className="style-image"
                />
                <span className="style-label">{style.name}</span>
              </button>
            ))}
          </div>

        </section>

        {/* Boutons d'action */}
        <section className="actions-section" data-testid="actions-section">
          <button
            className="btn-primary"
            onClick={exportPNG}
            disabled={selectedStyles.length === 0 || isExporting}
            data-testid="export-btn"
          >
            {isExporting ? "Export en cours..." : "Exporter en PNG"}
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Equipassion Boutique - Configurateur de Frontal</p>
      </footer>

      {/* Modal Zoom */}
      {showZoom && (
        <div className="zoom-modal" onClick={() => setShowZoom(false)} data-testid="zoom-modal">
          <div className="zoom-content">
            <button className="zoom-close" onClick={() => setShowZoom(false)}>×</button>
            <div className="zoom-image-container">
              <canvas
                ref={(el) => {
                  if (el && canvasRef.current) {
                    const ctx = el.getContext("2d");
                    el.width = BASE_WIDTH;
                    el.height = BASE_HEIGHT;
                    ctx.drawImage(canvasRef.current, 0, 0);
                  }
                }}
                className="zoom-canvas"
              />
            </div>
            <p className="zoom-hint-text">Pincez pour zoomer • Touchez pour fermer</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
