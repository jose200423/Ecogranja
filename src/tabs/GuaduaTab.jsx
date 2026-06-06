import { useState } from 'react';
import {
  Leaf, Shield, TreePine, Zap, Thermometer, Hammer,
  Play, MessageCircle
} from 'lucide-react';
import Lightbox from '../components/Lightbox';
import './GuaduaTab.css';

// ── Para agregar fotos al portafolio de guadua: coloca imágenes en src/assets/guadua/ ──
function loadImgs(modules) {
  return Object.keys(modules).sort().map((k) => modules[k].default);
}
const PORTFOLIO_IMAGES = loadImgs(
  import.meta.glob('../assets/guadua/*.{jpg,jpeg,webp,png,avif}', { eager: true })
);

const FEATURES = [
  {
    icon: <Leaf size={28} />,
    title: 'Ecológica y sostenible',
    desc: 'La guadua es el material de construcción más sostenible de Colombia. Crece hasta 30cm por día sin necesidad de replantación.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Resistente y duradera',
    desc: 'Tratada correctamente, la guadua dura más de 50 años. Soporta sismos mejor que el concreto gracias a su flexibilidad natural.',
  },
  {
    icon: <TreePine size={28} />,
    title: 'Nativa de Colombia',
    desc: 'La guadua es el bambú colombiano, declarado patrimonio nacional. Un material con identidad, historia y futuro.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Rápida construcción',
    desc: 'Las estructuras en guadua se construyen mucho más rápido que en materiales tradicionales, reduciendo costos y tiempo de obra.',
  },
  {
    icon: <Thermometer size={28} />,
    title: 'Aislamiento natural',
    desc: 'La guadua regula la temperatura de forma natural, mantiene los espacios frescos en verano y cálidos en épocas de frío, sin necesidad de climatización.',
  },
  {
    icon: <Hammer size={28} />,
    title: 'Artesanía colombiana',
    desc: 'Cada estructura es diseñada y construida a mano por maestros artesanos de la región, preservando técnicas ancestrales.',
  },
];

const VIDEO_ITEM = [{ src: '/images/casagua.mp4', alt: 'Construcción en guadua - Ecogranja San Francisco', type: 'video' }];

export default function GuaduaTab() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="guadua-tab">
      {/* Hero section */}
      <section className="guadua-hero">
        <div className="container guadua-hero-grid">
          <div className="guadua-hero-text">
            <span className="section-label">Material ancestral</span>
            <h2 className="section-title">Construcciones en Guadua</h2>
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
            <div className="guadua-img-container" onClick={() => setVideoOpen(true)}>
              {PORTFOLIO_IMAGES[0] && (
                <img src={PORTFOLIO_IMAGES[0]} alt="Cabaña de guadua" />
              )}
              <div className="play-overlay">
                <div className="play-btn">
                  <Play size={36} fill="white" />
                </div>
                <span>Ver el proceso de construcción</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="guadua-features">
        <div className="container">
          <div className="section-header">
            <span className="section-label">¿Por qué guadua?</span>
            <h2 className="section-title">Ventajas del material</h2>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio gallery */}
      <section className="guadua-portfolio">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Nuestras obras</span>
            <h2 className="section-title">Proyectos realizados</h2>
          </div>

          <div className="portfolio-grid">
            {PORTFOLIO_IMAGES.map((src, i) => (
              <div key={src} className="portfolio-item">
                <img src={src} alt={`Proyecto en guadua ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
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
