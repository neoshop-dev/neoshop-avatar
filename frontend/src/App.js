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

// Options de couleur de cuir
const LEATHER_OPTIONS = [
  { 
    id: "noir", 
    name: "Noir", 
    src: "/base-frontal-clean.png",
    width: 2816,
    height: 557,
    stoneSize: 52,
    positions: [
      { x: 721, y: 186 }, { x: 770, y: 191 }, { x: 820, y: 201 }, { x: 871, y: 212 },
      { x: 921, y: 224 }, { x: 971, y: 239 }, { x: 1019, y: 255 }, { x: 1064, y: 272 },
      { x: 1108, y: 289 }, { x: 1153, y: 305 }, { x: 1194, y: 316 }, { x: 1241, y: 333 },
      { x: 1290, y: 347 }, { x: 1340, y: 356 }, { x: 1387, y: 363 }, { x: 1434, y: 368 },
      { x: 1483, y: 370 }, { x: 1531, y: 368 }, { x: 1580, y: 365 }, { x: 1630, y: 360 },
      { x: 1678, y: 349 }, { x: 1723, y: 337 }, { x: 1768, y: 327 }, { x: 1813, y: 315 },
      { x: 1860, y: 300 }, { x: 1908, y: 286 }, { x: 1955, y: 272 }, { x: 2003, y: 258 },
      { x: 2050, y: 246 }, { x: 2096, y: 234 }, { x: 2144, y: 225 }, { x: 2193, y: 219 },
      { x: 2242, y: 213 },
    ]
  },
  { 
    id: "havane", 
    name: "Havane", 
    src: "/cuir-havane-clean.png",
    width: 2048,
    height: 405,
    stoneSize: 38,
    positions: [
      { x: 548, y: 109 }, { x: 581, y: 116 }, { x: 614, y: 126 }, { x: 648, y: 140 },
      { x: 681, y: 151 }, { x: 715, y: 163 }, { x: 748, y: 176 }, { x: 782, y: 188 },
      { x: 815, y: 202 }, { x: 849, y: 214 }, { x: 882, y: 224 }, { x: 916, y: 236 },
      { x: 949, y: 248 }, { x: 983, y: 257 }, { x: 1016, y: 263 }, { x: 1050, y: 267 },
      { x: 1083, y: 269 }, { x: 1116, y: 267 }, { x: 1150, y: 265 }, { x: 1183, y: 262 },
      { x: 1217, y: 253 }, { x: 1250, y: 244 }, { x: 1284, y: 237 }, { x: 1317, y: 228 },
      { x: 1351, y: 217 }, { x: 1384, y: 208 }, { x: 1418, y: 196 }, { x: 1451, y: 187 },
      { x: 1485, y: 178 }, { x: 1518, y: 169 }, { x: 1552, y: 163 }, { x: 1585, y: 159 },
      { x: 1619, y: 154 },
    ]
  },
  { 
    id: "noisette", 
    name: "Noisette", 
    src: "/cuir-noisette-clean.png",
    width: 2048,
    height: 405,
    stoneSize: 38,
    positions: [
      { x: 608, y: 153 }, { x: 637, y: 161 }, { x: 667, y: 169 }, { x: 697, y: 179 },
      { x: 727, y: 192 }, { x: 757, y: 202 }, { x: 787, y: 215 }, { x: 817, y: 226 },
      { x: 847, y: 226 }, { x: 877, y: 236 }, { x: 907, y: 247 }, { x: 936, y: 256 },
      { x: 966, y: 261 }, { x: 996, y: 264 }, { x: 1026, y: 266 }, { x: 1056, y: 267 },
      { x: 1086, y: 269 }, { x: 1116, y: 267 }, { x: 1146, y: 265 }, { x: 1176, y: 262 },
      { x: 1206, y: 255 }, { x: 1236, y: 256 }, { x: 1265, y: 249 }, { x: 1295, y: 240 },
      { x: 1325, y: 229 }, { x: 1355, y: 217 }, { x: 1385, y: 204 }, { x: 1415, y: 204 },
      { x: 1445, y: 193 }, { x: 1475, y: 182 }, { x: 1505, y: 171 }, { x: 1535, y: 164 },
      { x: 1565, y: 158 },
    ]
  },
];

// Options de taille (informatives uniquement)
const SIZE_OPTIONS = [
  { id: "poney", name: "Poney" },
  { id: "cob", name: "Cob" },
  { id: "full", name: "Full" },
];

function App() {
  const [selectedLeather, setSelectedLeather] = useState(LEATHER_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[1]); // Cob par défaut
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [leatherImages, setLeatherImages] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showZoom, setShowZoom] = useState(false);
  const canvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const containerRef = useRef(null);

  // Charger les images au démarrage
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = STONE_STYLES.length + LEATHER_OPTIONS.length;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setIsLoading(false);
      }
    };

    // Charger les images de cuir
    LEATHER_OPTIONS.forEach((leather) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setLeatherImages((prev) => ({ ...prev, [leather.id]: img }));
        checkAllLoaded();
      };
      img.onerror = checkAllLoaded;
      img.src = leather.src;
    });

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
    const baseImage = leatherImages[selectedLeather.id];
    if (!canvas || !displayCanvas || !baseImage || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const displayCtx = displayCanvas.getContext("2d", { alpha: false });

    // Utiliser les dimensions du cuir sélectionné
    const { width: BASE_WIDTH, height: BASE_HEIGHT, stoneSize, positions } = selectedLeather;

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
      positions.forEach((pos, index) => {
        const styleIndex = index % selectedStyles.length;
        const style = selectedStyles[styleIndex];
        const stoneImg = loadedImages[style.id];

        if (stoneImg) {
          const drawX = pos.x - stoneSize / 2;
          const drawY = pos.y - stoneSize / 2;
          ctx.drawImage(stoneImg, drawX, drawY, stoneSize, stoneSize);
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
  }, [selectedLeather, leatherImages, selectedStyles, loadedImages]);

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
    link.download = `frontal-${selectedLeather.id}-personnalise.png`;
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
        {/* Section Couleur du Cuir */}
        <section className="leather-selection-section" data-testid="leather-selection">
          <h2>Couleur du cuir</h2>
          <div className="leather-options">
            {LEATHER_OPTIONS.map((leather) => (
              <button
                key={leather.id}
                className={`leather-option ${selectedLeather.id === leather.id ? 'selected' : ''}`}
                onClick={() => setSelectedLeather(leather)}
                data-testid={`leather-option-${leather.id}`}
              >
                <div className={`leather-swatch leather-${leather.id}`}></div>
                <span>{leather.name}</span>
              </button>
            ))}
          </div>
        </section>

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
                  Cliquez pour zoomer
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section Sélection des styles */}
        <section className="stones-selection-section" data-testid="stones-selection">
          <h2>
            Sélectionnez vos styles{" "}
            <span className="hint">(dans l'ordre souhaité)</span>
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
                    el.width = selectedLeather.width;
                    el.height = selectedLeather.height;
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
