import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { galleryCategories } from '../data/services';
import useDialog from '../components/useDialog';
import './GaleriaTab.css';
import GuaduaMark from '../components/GuaduaMark';
import PageDecor from '../components/PageDecor';

// Aplanar todas las categorías en una lista con tag de categoría
const ALL_IMAGES = galleryCategories.flatMap((cat) =>
  cat.images.map((src, i) => ({
    src,
    category: cat.name,
    alt: `${cat.name} en Ecogranja San Francisco, foto ${i + 1} de ${cat.images.length}`,
  }))
);

function GalleryLightbox({ image, hasNav, onClose, onPrev, onNext }) {
  const dialogRef = useDialog();
  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      tabIndex={-1}
      ref={dialogRef}
      onClick={onClose}
    >
      <button className="lb-close" onClick={onClose} aria-label="Cerrar">
        <X size={24} />
      </button>
      {hasNav && (
        <>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Foto anterior">
            <ChevronLeft size={32} />
          </button>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Foto siguiente">
            <ChevronRight size={32} />
          </button>
        </>
      )}
      <img
        src={image.src}
        alt={image.alt}
        className="lb-img"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="lb-caption" onClick={(e) => e.stopPropagation()}>
        {image.category}
      </div>
    </div>
  );
}

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    autoPlayRef.current = setInterval(() => {
      if (!document.hidden) next();
    }, 4500);
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

  const handleCategoryChange = (cat) => {
    clearInterval(autoPlayRef.current);
    setActiveCategory(cat);
  };

  if (ALL_IMAGES.length === 0) {
    return (
      <div className="galeria-tab">
      <PageDecor theme="galeria" />
        <div className="container">
          <div className="section-header">
            <GuaduaMark />
            <h1 className="section-title">Galería de <em>imágenes</em></h1>
          </div>
          <div className="gallery-empty"><p>Aún no hay imágenes. Agrega fotos a src/assets/[carpeta]/</p></div>
        </div>
      </div>
    );
  }

  const current = filtered[currentIndex] ?? filtered[0];

  return (
    <div className="galeria-tab">
      <PageDecor theme="galeria" />
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <GuaduaMark />
          <h1 className="section-title">Galería de <em>imágenes</em></h1>
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
              aria-pressed={activeCategory === cat}
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
              <button
                type="button"
                className="carousel-main"
                onClick={() => setLightboxOpen(true)}
                aria-label={`Ampliar: ${current.alt}`}
              >
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className={`carousel-img ${isTransitioning ? 'transitioning' : ''}`}
                />
                <span className="carousel-overlay" aria-hidden="true">
                  <ZoomIn size={28} />
                </span>
                <span className="carousel-caption" aria-hidden="true">
                  <span className="carousel-cat">{current.category}</span>
                </span>
                <span className="carousel-counter" aria-hidden="true">
                  {currentIndex + 1} / {filtered.length}
                </span>
              </button>

              {filtered.length > 1 && (
                <>
                  <button className="carousel-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Foto anterior">
                    <ChevronLeft size={28} />
                  </button>
                  <button className="carousel-nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Foto siguiente">
                    <ChevronRight size={28} />
                  </button>
                  <div className="carousel-dots">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Ver foto ${i + 1}`}
                        aria-current={i === currentIndex ? 'true' : undefined}
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
                  aria-label={`Ver ${img.alt}`}
                  aria-current={i === currentIndex ? 'true' : undefined}
                >
                  <img src={img.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <GalleryLightbox
          image={current}
          hasNav={filtered.length > 1}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}
