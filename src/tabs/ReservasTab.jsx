import { useState } from 'react';
import { Users, Minus, Plus, MessageCircle } from 'lucide-react';
import Calendar from '../components/Calendar';
import { servicesData } from '../data/services';
import './ReservasTab.css';

export default function ReservasTab() {
  const [selectedService, setSelectedService] = useState('');
  const [guests, setGuests] = useState(2);

  const adjustGuests = (delta) => {
    setGuests((g) => Math.min(50, Math.max(1, g + delta)));
  };

  return (
    <div className="reservas-tab">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">Tu estancia</span>
          <h2 className="section-title">Haz tu reserva</h2>
          <p className="section-desc">
            Selecciona el servicio, elige tus fechas y contáctanos por WhatsApp.
            Te responderemos en menos de 2 horas.
          </p>
        </div>

        <div className="reservas-grid">
          {/* Left panel */}
          <div className="reservas-panel">
            {/* Service selector */}
            <div className="reservas-card">
              <h3 className="panel-title">
                <span className="panel-number">1</span>
                Elige el servicio
              </h3>
              <div className="service-selector">
                {servicesData.filter((s) => s.id !== 'productos').map((s) => (
                  <label key={s.id} className={`service-option ${selectedService === s.title ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="service"
                      value={s.title}
                      checked={selectedService === s.title}
                      onChange={() => setSelectedService(s.title)}
                    />
                    <div className="service-option-content">
                      <div className="service-dot" style={{ background: s.color }} />
                      <div>
                        <strong>{s.title}</strong>
                        <span>{s.subtitle}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Guest counter */}
            <div className="reservas-card">
              <h3 className="panel-title">
                <span className="panel-number">2</span>
                Número de personas
              </h3>
              <div className="guest-counter">
                <div className="guest-icon">
                  <Users size={22} />
                </div>
                <div className="guest-controls">
                  <button
                    className="guest-btn"
                    onClick={() => adjustGuests(-1)}
                    disabled={guests <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="guest-count">{guests}</span>
                  <button
                    className="guest-btn"
                    onClick={() => adjustGuests(1)}
                    disabled={guests >= 50}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="guest-label">
                  {guests === 1 ? 'persona' : 'personas'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="reservas-info">
              <h4>Información importante</h4>
              <ul>
                <li>Las reservas se confirman por WhatsApp</li>
                <li>Se requiere depósito del 30% para confirmar</li>
                <li>Cancelación gratuita hasta 48 horas antes</li>
                <li>Mascotas: consultar disponibilidad</li>
              </ul>
              <a
                href="https://wa.me/573125755037"
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp reservas-wa"
              >
                <MessageCircle size={18} /> Preguntar al guía
              </a>
            </div>
          </div>

          {/* Right panel: Calendar */}
          <div>
            <div className="reservas-card cal-wrapper">
              <h3 className="panel-title">
                <span className="panel-number">3</span>
                Selecciona tus fechas
              </h3>
              <Calendar
                selectedService={selectedService}
                guestCount={guests}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
