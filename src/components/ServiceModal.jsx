import { useState, useEffect } from 'react';
import {
  X, ChevronLeft, ChevronRight, ChevronDown, MessageCircle, CalendarDays,
  Sun, Moon, PartyPopper, Tent, Sprout, Truck,
} from 'lucide-react';
import useDialog from './useDialog';
import { formatPrice } from '../data/services';
import './ServiceModal.css';

const ACC_ICONS = { Sun, Moon, PartyPopper, Tent, Sprout, Truck };

export default function ServiceModal({ service, onBook, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [activeAccIdx, setActiveAccIdx] = useState(
    () => (service.accordionItems?.length === 1 ? 0 : null)
  );
  const dialogRef = useDialog();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const prevImg = () => setImgIndex((i) => (i - 1 + service.images.length) % service.images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % service.images.length);

  const toggleAcc = (idx) => setActiveAccIdx((prev) => (prev === idx ? null : idx));

  // "Elegir fechas" lleva a Reservas con el servicio (y la opción abierta, si hay una) ya elegidos
  const bookingOptions = service.booking?.options ?? [];
  const openOption = activeAccIdx !== null ? bookingOptions[activeAccIdx] : null;
  const bookPath = `reservas/${service.id}${openOption ? `/${openOption.id}` : ''}`;

  const whatsappMsg = encodeURIComponent(
    `¡Hola! Me interesa el servicio de *${service.title}*. ¿Podrían darme más información y disponibilidad?`
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={22} />
        </button>

        {/* Image gallery */}
        <div className="modal-gallery">
          <img
            src={service.images[imgIndex]}
            alt={`${service.title}, foto ${imgIndex + 1} de ${service.images.length}`}
            className="modal-img"
            loading="lazy"
          />
          {service.images.length > 1 && (
            <>
              <button className="modal-nav modal-prev" onClick={prevImg} aria-label="Foto anterior">
                <ChevronLeft size={24} />
              </button>
              <button className="modal-nav modal-next" onClick={nextImg} aria-label="Foto siguiente">
                <ChevronRight size={24} />
              </button>
              <div className="modal-dots">
                {service.images.map((_, i) => (
                  <button
                    key={i}
                    className={`modal-dot ${i === imgIndex ? 'active' : ''}`}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === imgIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </>
          )}
          <div className="modal-tag" style={{ background: service.color }}>
            {service.tag}
          </div>
        </div>

        {/* Content */}
        <div className="modal-content">
          <h2 className="modal-title" id="service-modal-title">{service.title}</h2>
          {service.subtitle && (
            <p className="modal-subtitle">{service.subtitle}</p>
          )}
          {service.priceFrom && (
            <p className="service-price">
              Desde <strong>{formatPrice(service.priceFrom)}</strong> por persona
            </p>
          )}
          <p className="modal-desc">{service.description}</p>

          {/* Accordion sub-services */}
          {service.accordionItems?.length > 0 && (
            <div className="modal-accordion">
              <h3 className="modal-acc-heading">Opciones disponibles</h3>
              {service.accordionItems.map((item, idx) => {
                const isOpen = activeAccIdx === idx;
                const AccIcon = ACC_ICONS[item.icon];
                return (
                  <div
                    key={idx}
                    className={`modal-acc-item${isOpen ? ' open' : ''}`}
                    style={{ '--acc-color': item.color || service.color }}
                  >
                    <button
                      className="modal-acc-header"
                      onClick={() => toggleAcc(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`modal-acc-${idx}`}
                    >
                      {AccIcon && (
                        <span className="modal-acc-emoji" aria-hidden="true"><AccIcon size={20} /></span>
                      )}
                      <span className="modal-acc-title">{item.title}</span>
                      <ChevronDown size={18} className="modal-acc-arrow" aria-hidden="true" />
                    </button>
                    <div className="modal-acc-body" id={`modal-acc-${idx}`} inert={isOpen ? undefined : ''}>
                      <div className="modal-acc-inner">
                        {item.text && <p className="modal-acc-text">{item.text}</p>}
                        {item.bullets && (
                          <ul className="modal-acc-list">
                            {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                        {item.note && <p className="modal-acc-note">{item.note}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          {service.booking ? (
            <div className="modal-actions">
              <button className="btn-primary modal-cta" onClick={() => onBook(bookPath)}>
                <CalendarDays size={20} />
                {openOption ? `Elegir fechas · ${openOption.label}` : 'Elegir fechas'}
              </button>
              <a
                href={`https://wa.me/573125755037?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="modal-wa-link"
              >
                <MessageCircle size={16} /> o pregunta por WhatsApp
              </a>
            </div>
          ) : (
            <a
              href={`https://wa.me/573125755037?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp modal-cta"
            >
              <MessageCircle size={20} />
              {service.whatsappOnly ? 'Comprar por WhatsApp' : 'Consultar disponibilidad'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
