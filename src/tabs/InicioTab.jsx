import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft, ChevronRight, Calendar, ArrowRight, Leaf,
  MapPin, Phone, MessageCircle, Send,
} from 'lucide-react';
import aboutFinca from '../assets/hero/04-hero.jpeg';
import aboutCabana1 from '../assets/hospedaje/cabana1.webp';
import aboutCabana2 from '../assets/hospedaje/cabana2.webp';
import './InicioTab.css';
import './ContactoTab.css';
import GuaduaMark from '../components/GuaduaMark';
import PageDecor from '../components/PageDecor';

// ──────────────────────────────────────────────────────────────────────────────
// Para agregar imágenes al carrusel: simplemente coloca el archivo dentro de
//   src/assets/hero/
// Formatos admitidos: .jpg  .jpeg  .webp  .png  .avif
// El nombre del archivo define el orden (usa prefijos: 01-, 02-, etc.)
// ──────────────────────────────────────────────────────────────────────────────
const heroModules = import.meta.glob(
  '../assets/hero/*.{jpg,jpeg,webp,png,avif}',
  { eager: true }
);
const HERO_IMAGES = Object.keys(heroModules)
  .sort()
  .map((key) => heroModules[key].default);

// Mismos nombres que las tarjetas de Servicios, para que el mensaje llegue sin ambigüedad
const CONTACT_SERVICES = [
  'Estadía en la naturaleza',
  'Experiencia RUAH',
  'Campamento RUAH',
  'Encuentros empresariales',
  'Convivencias de colegio',
  'Productos orgánicos',
  'Construcciones en guadua',
  'Otro',
];

export default function InicioTab({ onTabChange }) {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = HERO_IMAGES.length;
  // Diapositivas cuyo fondo ya se pidió: la actual y la siguiente, el resto a medida que llegan
  const [loaded, setLoaded] = useState(() => new Set([0, 1 % Math.max(total, 1)]));

  useEffect(() => {
    setLoaded((prev) => {
      const nextIdx = (slide + 1) % Math.max(total, 1);
      if (prev.has(slide) && prev.has(nextIdx)) return prev;
      return new Set([...prev, slide, nextIdx]);
    });
  }, [slide, total]);

  const [contactForm, setContactForm] = useState({ name: '', email: '', service: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const goTo = useCallback((index) => {
    if (animating || total === 0) return;
    setAnimating(true);
    setSlide(((index % total) + total) % total);
    setTimeout(() => setAnimating(false), 700);
  }, [animating, total]);

  const next = useCallback(() => goTo(slide + 1), [slide, goTo]);
  const prev = useCallback(() => goTo(slide - 1), [slide, goTo]);

  useEffect(() => {
    if (total <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!document.hidden) next();
    }, 5500);
    return () => clearInterval(id);
  }, [next, total]);

  const handleContactChange = (e) =>
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;

    const msg = encodeURIComponent(
      `¡Hola! Me pongo en contacto desde el sitio web.\n\n` +
        `*Nombre:* ${contactForm.name}\n` +
        `*Email:* ${contactForm.email || 'No indicado'}\n` +
        `*Servicio de interés:* ${contactForm.service || 'No especificado'}\n\n` +
        `*Mensaje:*\n${contactForm.message}`
    );

    const url = `https://wa.me/573125755037?text=${msg}`;
    const win = window.open(url, '_blank');
    if (!win) window.location.href = url; // ventana bloqueada: abrir en la misma pestaña
    setContactSent(true);
    setTimeout(() => setContactSent(false), 4000);
  };

  return (
    <div className="inicio-tab">
      <PageDecor theme="inicio" />
      {/* Hero Slider */}
      <section className="hero">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`hero-slide ${i === slide ? 'active' : ''}`}
            style={loaded.has(i) ? { backgroundImage: `url(${src})` } : undefined}
          />
        ))}
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-sub">Ecogranja San Francisco</span>
          <h1 className="hero-title">Donde la naturaleza <em>te abraza</em></h1>
          <p className="hero-desc">
            Vive una experiencia única en medio de la naturaleza, en cabañas de guadua
            rodeadas de montañas y aire puro en Silvania, Cundinamarca.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => onTabChange('servicios')}>
              <Leaf size={18} /> Nuestros servicios
            </button>
            <button className="btn-outline" onClick={() => onTabChange('reservas')}>
              <Calendar size={18} /> Reservar ahora
            </button>
          </div>
        </div>

        {/* Slider controls */}
        {total > 1 && (
          <>
            <button className="hero-nav hero-prev" onClick={prev} aria-label="Anterior">
              <ChevronLeft size={32} />
            </button>
            <button className="hero-nav hero-next" onClick={next} aria-label="Siguiente">
              <ChevronRight size={32} />
            </button>
            <div className="hero-dots">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot ${i === slide ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === slide ? 'true' : undefined}
                />
              ))}
            </div>
          </>
        )}

        <div className="hero-scroll-hint">
          <span>Explora</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container about-grid">
          <div className="about-text">
            <GuaduaMark className="is-start" />
            <h2 className="section-title">Un refugio <em>verde</em> en Cundinamarca</h2>
            <p>
              Ecogranja San Francisco es un espacio de turismo ecológico ubicado en las montañas de
              Silvania, Cundinamarca. Nacimos del amor por la tierra, la guadua y la vida campesina,
              con el sueño de compartir la magia de la naturaleza colombiana.
            </p>
            <p>
              Nuestras cabañas, construidas artesanalmente en guadua — el bambú colombiano —, ofrecen
              confort y armonía perfecta con el entorno natural. Cada rincón de la finca cuenta una
              historia de esfuerzo, amor y respeto por la tierra.
            </p>
            <p>
              Somos más que un destino turístico: somos una familia que recibe a otras familias con
              los brazos abiertos y el corazón lleno de calidez colombiana.
            </p>
            <p className="about-place">
              <MapPin size={18} aria-hidden="true" />
              <span>Vereda Safranal, Silvania, Cundinamarca · <strong>a pocas horas de Bogotá</strong></span>
            </p>
            <button className="btn-primary about-cta" onClick={() => onTabChange('servicios')}>
              Conoce nuestros servicios <ArrowRight size={18} />
            </button>
          </div>

          <div className="about-images">
            <div className="about-img-main">
              <img src={aboutFinca} alt="Ecogranja San Francisco" loading="lazy" />
            </div>
            <div className="about-img-grid">
              <img src={aboutCabana1} alt="Cabaña de guadua" loading="lazy" />
              <img src={aboutCabana2} alt="Interior cabaña" loading="lazy" />
            </div>
          </div>
        </div>


      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2>¿Listo para vivir la experiencia?</h2>
            <p>Reserva ahora y descubre un lugar donde la naturaleza te abraza</p>
          </div>
          <div className="cta-btns">
            <button className="btn-primary" onClick={() => onTabChange('reservas')}>
              <Calendar size={18} /> Ver disponibilidad
            </button>
            <a
              href="https://wa.me/573125755037"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              Escribir al WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto-section" className="inicio-contacto">
        <PageDecor theme="contacto" />
        <div className="container">
          <div className="section-header">
            <GuaduaMark />
            <h2 className="section-title"><em>Contáctanos</em></h2>
            <p className="section-desc">
              ¿Tienes preguntas o quieres reservar? Escríbenos y te responderemos
              con toda la información que necesitas.
            </p>
          </div>

          <div className="contacto-grid">
            {/* Info column */}
            <div className="contacto-info">
              <div className="contact-data">
                <h3>Información de contacto</h3>
                <ul>
                  <li>
                    <div className="contact-icon"><MapPin size={20} /></div>
                    <div>
                      <strong>Ubicación</strong>
                      <span>Vereda Safranal, Silvania, Cundinamarca</span>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=Ecogranja+San+Francisco+Colombia"
                        target="_blank"
                        rel="noreferrer"
                      >
                        ¿Cómo llegar? →
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon"><Phone size={20} /></div>
                    <div>
                      <strong>Teléfono / WhatsApp</strong>
                      <a href="tel:+573125755037">+57 312 5755037</a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="contact-whatsapp-card">
                <h4>¿Prefieres escribirnos directamente?</h4>
                <p>Te responderemos en menos de 2 horas durante el horario de atención.</p>
                <a
                  href="https://wa.me/573125755037"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={20} /> Escribir por WhatsApp
                </a>
              </div>

              <div className="contact-map">
                <iframe
                  title="Ubicación Ecogranja San Francisco"
                  src="https://maps.google.com/maps?q=Ecogranja+San+Francisco+Silvania+Cundinamarca+Colombia&output=embed&z=14"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form column */}
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <h3>Envíanos un mensaje</h3>

                <div className="form-group">
                  <label htmlFor="inicio-name">Nombre completo *</label>
                  <input
                    id="inicio-name"
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inicio-email">Correo electrónico</label>
                  <input
                    id="inicio-email"
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="tu@correo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inicio-service">Servicio de interés</label>
                  <select
                    id="inicio-service"
                    name="service"
                    value={contactForm.service}
                    onChange={handleContactChange}
                  >
                    <option value="">Selecciona un servicio</option>
                    {CONTACT_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="inicio-message">Mensaje *</label>
                  <textarea
                    id="inicio-message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className={`form-submit ${contactSent ? 'sent' : ''}`}>
                  {contactSent ? (
                    'Abriendo WhatsApp...'
                  ) : (
                    <>
                      <Send size={18} /> Enviar por WhatsApp
                    </>
                  )}
                </button>

                <p className="form-note">
                  Al enviar, se abrirá WhatsApp con tu mensaje listo para enviar.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
