import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import './ContactoTab.css';

const SERVICES_OPTIONS = [
  'Hospedaje y Experiencias',
  'Campamento RUAH',
  'Experiencia RUAH',
  'Encuentros Empresariales',
  'Retiros Espirituales',
  'Productos Orgánicos',
  'Construcciones en Guadua',
  'Otro',
];

export default function ContactoTab() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    const msg = encodeURIComponent(
      `¡Hola! Me pongo en contacto desde el sitio web.\n\n` +
        `*Nombre:* ${form.name}\n` +
        `*Email:* ${form.email || 'No indicado'}\n` +
        `*Servicio de interés:* ${form.service || 'No especificado'}\n\n` +
        `*Mensaje:*\n${form.message}`
    );

    window.open(`https://wa.me/573125755037?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', service: '', message: '' });
    }, 4000);
  };

  return (
    <div className="contacto-tab">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">Estamos aquí</span>
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-desc">
            ¿Tienes preguntas o quieres reservar? Escríbenos y te responderemos
            con toda la información que necesitas.
          </p>
        </div>

        <div className="contacto-grid">
          {/* Info column */}
          <div className="contacto-info">
            {/* Contact data */}
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
                <li>
                  <div className="contact-icon"><Mail size={20} /></div>
                  <div>
                    <strong>Correo electrónico</strong>
                    <a href="mailto:info@ecogranjasanfrancisco.com">
                      info@ecogranjasanfrancisco.com
                    </a>
                  </div>
                </li>
                <li>
                  <div className="contact-icon"><Clock size={20} /></div>
                  <div>
                    <strong>Horario de atención</strong>
                    <span>Lunes a Domingo: 7:00am – 7:00pm</span>
                    <span>WhatsApp disponible todo el día</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick WhatsApp */}
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

            {/* Map */}
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
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Envíanos un mensaje</h3>

              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">Servicio de interés</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICES_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className={`form-submit ${sent ? 'sent' : ''}`}>
                {sent ? (
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
    </div>
  );
}
