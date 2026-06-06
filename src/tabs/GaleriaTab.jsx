import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { galleryCategories } from '../data/services';
import './GaleriaTab.css';

// Aplanar todas las categorías en una lista con tag de categoría
const ALL_IMAGES = galleryCategories.flatMap((cat) =>
  cat.images.map((src) => ({ src, category: cat.name, alt: cat.name }))
);

const CATEGORY_NAMES = ['Todos', ...galleryCategories.map((c) => c.name)];

export default function GaleriaTab() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  const filtered =
    activeCategory === 'Todos'
      ? ALL_IMAGES
      : ALL_IMAGES.filter((img) => img.category === activeCategory);

  const goTo = useCallback(
    (index) => {
      if (isTransitioning || filtered.length === 0) return;
      setIsTransitioning(true);
      setCurrentIndex(((index % filtered.length) + filtered.length) % filtered.length);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [filtered.length, isTransitioning]
  );

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (lightboxOpen || filtered.length <= 1) return;
    autoPlayRef.current = setInterval(next, 4500);
    return () => clearInterval(autoPlayRef.current);
  }, [next, lightboxOpen, filtered.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const handleCategoryChange = (cat) => {
    clearInterval(autoPlayRef.current);
    setActiveCategory(cat);
  };

  if (ALL_IMAGES.length === 0) {
    return (
      <div className="galeria-tab">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Nuestro espacio</span>
            <h2 className="section-title">Galería de imágenes</h2>
          </div>
          <div className="gallery-empty"><p>Aún no hay imágenes. Agrega fotos a src/assets/[carpeta]/</p></div>
        </div>
      </div>
    );
  }

  const current = filtered[currentIndex] ?? filtered[0];

  return (
    <div className="galeria-tab">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">Nuestro espacio</span>
          <h2 className="section-title">Galería de imágenes</h2>
          <p className="section-desc">
            Sumérgete visualmente en la belleza de Ecogranja San Francisco.
            Cabañas, naturaleza, campamentos y momentos únicos.
          </p>
        </div>

        {/* Filtros */}
        <div className="gallery-filters">
          {CATEGORY_NAMES.map((cat) => (
            <button
              key={cat}
              className={`gallery-filter ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="gallery-empty"><p>No hay imágenes en esta categoría.</p></div>
        ) : (
          <>
            {/* Carrusel principal */}
            <div className="carousel">
              <div className="carousel-main" onClick={() => setLightboxOpen(true)}>
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className={`carousel-img ${isTransitioning ? 'transitioning' : ''}`}
                />
                <div className="carousel-overlay">
                  <ZoomIn size={28} />
                </div>
                <div className="carousel-caption">
                  <span className="carousel-cat">{current.category}</span>
                </div>
                <div className="carousel-counter">
                  {currentIndex + 1} / {filtered.length}
                </div>
              </div>

              {filtered.length > 1 && (
                <>
                  <button className="carousel-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }}>
                    <ChevronLeft size={28} />
                  </button>
                  <button className="carousel-nav next" onClick={(e) => { e.stopPropagation(); next(); }}>
                    <ChevronRight size={28} />
                  </button>
                  <div className="carousel-dots">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => goTo(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Miniaturas */}
            <div className="carousel-thumbs">
              {filtered.map((img, i) => (
                <button
                  key={img.src}
                  className={`thumb ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="gallery-lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="lb-close" onClick={() => setLightboxOpen(false)}>
            <X size={24} />
          </button>
          {filtered.length > 1 && (
            <>
              <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }}>
                <ChevronLeft size={32} />
              </button>
              <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); next(); }}>
                <ChevronRight size={32} />
              </button>
            </>
          )}
          <img
            src={current.src}
            alt={current.alt}
            className="lb-img"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lb-caption" onClick={(e) => e.stopPropagation()}>
            {current.category}
          </div>
        </div>
      )}
    </div>
  );
}
