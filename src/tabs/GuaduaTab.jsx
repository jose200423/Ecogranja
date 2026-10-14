import { useState, useRef } from 'react';
import { Play, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Lightbox from '../components/Lightbox';
import './GuaduaTab.css';
import GuaduaMark from '../components/GuaduaMark';
import PageDecor from '../components/PageDecor';

// ── Para agregar fotos al portafolio de guadua: coloca imágenes en src/assets/guadua/ ──
function loadImgs(modules) {
  return Object.keys(modules).sort().map((k) => modules[k].default);
}
const PORTFOLIO_IMAGES = loadImgs(
  import.meta.glob('../assets/guadua/*.{jpg,jpeg,webp,png,avif}', { eager: true })
);

const FEATURES = [
  {
    title: 'Ecológica y sostenible',
    desc: 'Crece muy rápido y se renueva sola desde la misma mata, sin necesidad de replantar. Un recurso que se aprovecha sin agotar el bosque.',
  },
  {
    title: 'Resistente y duradera',
    desc: 'Bien tratada y protegida de la humedad, la guadua dura décadas. Su flexibilidad natural le ayuda a responder bien ante los movimientos sísmicos.',
  },
  {
    title: 'Nativa de Colombia',
    desc: 'La guadua es el bambú colombiano, presente en el paisaje y la arquitectura del país desde hace generaciones. Un material con identidad, historia y futuro.',
  },
  {
    title: 'Rápida construcción',
    desc: 'Las estructuras en guadua se construyen mucho más rápido que en materiales tradicionales, reduciendo costos y tiempo de obra.',
  },
  {
    title: 'Aislamiento natural',
    desc: 'La guadua regula la temperatura de forma natural, mantiene los espacios frescos en verano y cálidos en épocas de frío, sin necesidad de climatización.',
  },
  {
    title: 'Artesanía colombiana',
    desc: 'Cada estructura es diseñada y construida a mano por maestros artesanos de la región, preservando técnicas ancestrales.',
  },
];

const VIDEO_ITEM = [{
  src: `${import.meta.env.BASE_URL}images/casagua.mp4`,
  poster: PORTFOLIO_IMAGES[0],
  alt: 'Construcción en guadua - Ecogranja San Francisco',
  type: 'video',
}];

export default function GuaduaTab() {
  const [videoOpen, setVideoOpen] = useState(false);
  // En el celular los proyectos son un carrusel deslizable; los puntos siguen la foto visible
  const [slide, setSlide] = useState(0);
  const trackRef = useRef(null);

  const handleTrackScroll = (e) => {
    const el = e.currentTarget;
    const item = el.firstElementChild;
    if (!item) return;
    const step = item.getBoundingClientRect().width + 12;
    setSlide(Math.round(el.scrollLeft / step));
  };

  const goToSlide = (i) => {
    setSlide(i);
    trackRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="guadua-tab">
      <PageDecor theme="guadua" />
      {/* Hero section */}
      <section className="guadua-hero">
        <div className="container guadua-hero-grid">
          <div className="guadua-hero-text">
            <GuaduaMark className="is-start" />
            <h1 className="section-title">Construcciones en <em>guadua</em></h1>
            <p>
              La guadua —el bambú colombiano— es uno de los materiales de construcción más
              extraordinarios del mundo. En Ecogranja San Francisco hemos construido nuestras
              cabañas y espacios con este material, y también ofrecemos el servicio de construcción
              para quienes quieran crear su propio paraíso verde.
            </p>
            <p>
              Con más de 7 años de experiencia trabajando la guadua, nuestros maestros artesanos
              crean estructuras que armonizan con la naturaleza sin sacrificar confort ni durabilidad.
            </p>
            <div className="guadua-ctas">
              <a
                href="https://wa.me/573125755037?text=%C2%A1Hola!%20Me%20interesa%20una%20cotizaci%C3%B3n%20para%20construcci%C3%B3n%20en%20guadua."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} /> Solicitar cotización
              </a>
              <button className="btn-outline-green" onClick={() => setVideoOpen(true)}>
                <Play size={18} /> Ver video del proceso
              </button>
            </div>
          </div>

          <div className="guadua-hero-visual">
            <button
              type="button"
              className="guadua-img-container"
              onClick={() => setVideoOpen(true)}
              aria-label="Ver el video del proceso de construcción"
            >
              {PORTFOLIO_IMAGES[0] && (
                <img src={PORTFOLIO_IMAGES[0]} alt="" />
              )}
              <span className="play-overlay">
                <span className="play-btn">
                  <Play size={36} fill="white" />
                </span>
                <span>Ver el proceso de construcción</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="guadua-features">
        <div className="container">
          <div className="section-header">
            <GuaduaMark />
            <h2 className="section-title">Ventajas del <em>material</em></h2>
          </div>

          <dl className="guadua-facts">
            {FEATURES.map((f) => (
              <div key={f.title} className="guadua-fact">
                <dt>{f.title}</dt>
                <dd>{f.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Portfolio gallery */}
      <section className="guadua-portfolio">
        <div className="container">
          <div className="section-header">
            <GuaduaMark />
            <h2 className="section-title">Proyectos <em>realizados</em></h2>
          </div>

          <div className="portfolio-carousel">
          <div
            className="portfolio-grid"
            ref={trackRef}
            onScroll={handleTrackScroll}
            aria-label="Proyectos en guadua"
          >
            {PORTFOLIO_IMAGES.map((src, i) => (
              <div key={src} className="portfolio-item">
                <img src={src} alt={`Proyecto en guadua ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          {PORTFOLIO_IMAGES.length > 1 && (
            <>
              <button
                type="button"
                className="portfolio-arrow prev"
                onClick={() => goToSlide(slide - 1)}
                disabled={slide === 0}
                aria-label="Proyecto anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="portfolio-arrow next"
                onClick={() => goToSlide(slide + 1)}
                disabled={slide === PORTFOLIO_IMAGES.length - 1}
                aria-label="Proyecto siguiente"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          </div>

          {PORTFOLIO_IMAGES.length > 1 && (
            <div className="portfolio-dots">
              {PORTFOLIO_IMAGES.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`portfolio-dot${i === slide ? ' active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Ver proyecto ${i + 1}`}
                  aria-current={i === slide ? 'true' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="guadua-cta-section">
        <div className="container guadua-cta-inner">
          <div>
            <h2>¿Te gustaría construir en guadua?</h2>
            <p>
              Diseñamos y construimos espacios únicos que respetan la naturaleza.
              Desde pequeñas cabañas hasta proyectos turísticos completos.
            </p>
          </div>
          <a
            href="https://wa.me/573125755037?text=%C2%A1Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20construcciones%20en%20guadua."
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={18} /> Hablemos de tu proyecto
          </a>
        </div>
      </section>

      {/* Video Lightbox */}
      {videoOpen && (
        <Lightbox
          images={VIDEO_ITEM}
          currentIndex={0}
          onClose={() => setVideoOpen(false)}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </div>
  );
}
