import { useState, useEffect } from 'react';
import { Users, Minus, Plus, MessageCircle } from 'lucide-react';
import Calendar from '../components/Calendar';
import { servicesData } from '../data/services';
import './ReservasTab.css';
import GuaduaMark from '../components/GuaduaMark';
import PageDecor from '../components/PageDecor';
import carpa from '../assets/deco/carpa.svg';
import fogata from '../assets/deco/fogata.svg';

const BOOKABLE = servicesData.filter((s) => s.booking);
const DEFAULT_MAX = 50;

// Límites de personas: la opción manda sobre el servicio; sin dato publicado, 1–50
function guestLimits(service, option) {
  return {
    min: option?.minGuests ?? service?.booking.minGuests ?? 1,
    max: option?.maxGuests ?? service?.booking.maxGuests ?? DEFAULT_MAX,
  };
}

export default function ReservasTab({ serviceId, optionId }) {
  const initialService = BOOKABLE.find((s) => s.id === serviceId) ?? null;
  const initialOptions = initialService?.booking.options ?? [];
  const initialOption =
    initialOptions.find((o) => o.id === optionId) ??
    (initialOptions.length === 1 ? initialOptions[0] : null);

  const [service, setService] = useState(initialService);
  const [option, setOption] = useState(initialOption);
  const [guests, setGuests] = useState(() => {
    const { min, max } = guestLimits(initialService, initialOption);
    return Math.min(max, Math.max(min, 2));
  });

  const { min, max } = guestLimits(service, option);

  // Al cambiar servicio u opción, el número de personas se ajusta a sus límites
  useEffect(() => {
    setGuests((g) => Math.min(max, Math.max(min, g)));
  }, [min, max]);

  const chooseService = (s) => {
    setService(s);
    const opts = s.booking.options;
    setOption(opts.length === 1 ? opts[0] : null);
  };

  const adjustGuests = (delta) => {
    setGuests((g) => Math.min(max, Math.max(min, g + delta)));
  };

  let limitHint = null;
  if (min > 1 && max < DEFAULT_MAX) limitHint = `Grupos de ${min} a ${max} personas`;
  else if (min > 1) limitHint = `Mínimo ${min} participantes`;
  else if (max < DEFAULT_MAX) limitHint = `Hasta ${max} personas`;

  return (
    <div className="reservas-tab">
      <PageDecor theme="reservas" />
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <GuaduaMark />
          <h1 className="section-title">Haz tu <em>reserva</em></h1>
          <p className="section-desc">
            Selecciona el servicio, elige tus fechas y contáctanos por WhatsApp.
            Te responderemos en menos de 2 horas.
          </p>
        </div>

        <div className="reservas-grid">
          {/* Pasos 1 y 2 */}
          <div className="reservas-panel">
            <fieldset className="reservas-card">
              <legend className="panel-title">
                <span className="panel-number">1</span>
                Elige el servicio
              </legend>
              <div className="service-selector">
                {BOOKABLE.map((s) => {
                  const isSel = service?.id === s.id;
                  return (
                    <div key={s.id} className="service-block">
                      <label className={`service-option ${isSel ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          checked={isSel}
                          onChange={() => chooseService(s)}
                        />
                        <div className="service-option-content">
                          <div className="service-dot" style={{ background: s.color }} />
                          <div>
                            <strong>{s.title}</strong>
                            {s.subtitle && <span>{s.subtitle}</span>}
                          </div>
                        </div>
                      </label>

                      {isSel && s.booking.options.length > 1 && (
                        <div className="option-chips" role="radiogroup" aria-label={`Opciones de ${s.title}`}>
                          {s.booking.options.map((o) => (
                            <label key={o.id} className={`option-chip ${option?.id === o.id ? 'selected' : ''}`}>
                              <input
                                type="radio"
                                name="service-option"
                                value={o.id}
                                checked={option?.id === o.id}
                                onChange={() => setOption(o)}
                              />
                              {o.label}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <div className="reservas-card">
              <h2 className="panel-title">
                <span className="panel-number">2</span>
                Número de personas
              </h2>
              <div className="guest-counter">
                <div className="guest-icon">
                  <Users size={22} />
                </div>
                <div className="guest-controls">
                  <button
                    className="guest-btn"
                    onClick={() => adjustGuests(-1)}
                    disabled={guests <= min}
                    aria-label="Una persona menos"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="guest-count" aria-live="polite">{guests}</span>
                  <button
                    className="guest-btn"
                    onClick={() => adjustGuests(1)}
                    disabled={guests >= max}
                    aria-label="Una persona más"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="guest-label">
                  {guests === 1 ? 'persona' : 'personas'}
                </span>
              </div>
              {limitHint && <p className="guest-hint">{limitHint}</p>}
            </div>
          </div>

          {/* Paso 3 */}
          <section className="reservas-card cal-wrapper" aria-labelledby="paso-fechas">
            <h2 className="panel-title" id="paso-fechas">
              <span className="panel-number">3</span>
              {option?.mode === 'single' ? 'Elige el día' : 'Selecciona tus fechas'}
            </h2>
            <Calendar
              serviceLabel={service?.title}
              optionLabel={option?.label}
              fixedMode={option?.mode}
              guestCount={guests}
            />
          </section>

          {/* Escena de campamento: la noche en la finca que se está reservando */}
          <div className="reservas-escena" aria-hidden="true">
            <img src={carpa} alt="" className="escena-carpa" />
            <img src={fogata} alt="" className="escena-fogata" />
          </div>

          {/* Info */}
          <aside className="reservas-info">
            <h2>Información importante</h2>
            <ul>
              <li>Las reservas se confirman por WhatsApp</li>
              <li>Se requiere depósito del 30% para confirmar</li>
              <li>Mascotas: consultar disponibilidad</li>
            </ul>
            <a
              href="https://wa.me/573125755037"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp reservas-wa"
            >
              <MessageCircle size={18} /> ¿Dudas? Escríbenos
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
