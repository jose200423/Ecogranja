import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import './ServiceModal.css';

export default function ServiceModal({ service, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [activeAccIdx, setActiveAccIdx] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const prevImg = () => setImgIndex((i) => (i - 1 + service.images.length) % service.images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % service.images.length);

  const toggleAcc = (idx) => setActiveAccIdx((prev) => (prev === idx ? null : idx));

  const whatsappMsg = encodeURIComponent(
    `¡Hola! Me interesa el servicio de *${service.title}*. ¿Podrían darme más información y disponibilidad?`
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        {/* Image gallery */}
        <div className="modal-gallery">
          <img
            src={service.images[imgIndex]}
            alt={service.title}
            className="modal-img"
            loading="lazy"
          />
          {service.images.length > 1 && (
            <>
              <button className="modal-nav modal-prev" onClick={prevImg}>
                <ChevronLeft size={24} />
              </button>
              <button className="modal-nav modal-next" onClick={nextImg}>
                <ChevronRight size={24} />
              </button>
              <div className="modal-dots">
                {service.images.map((_, i) => (
                  <button
                    key={i}
                    className={`modal-dot ${i === imgIndex ? 'active' : ''}`}
                    onClick={() => setImgIndex(i)}
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
          <h2 className="modal-title">{service.title}</h2>
          {service.subtitle && (
            <p className="modal-subtitle">{service.subtitle}</p>
          )}
          <p className="modal-desc">{service.description}</p>

          {/* Accordion sub-services */}
          {service.accordionItems?.length > 0 && (
            <div className="modal-accordion">
              <h3 className="modal-acc-heading">Opciones disponibles</h3>
              {service.accordionItems.map((item, idx) => {
                const isOpen = activeAccIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`modal-acc-item${isOpen ? ' open' : ''}`}
                    style={{ '--acc-color': item.color || service.color }}
                  >
                    <button
                      className="modal-acc-header"
                      onClick={() => toggleAcc(idx)}
                    >
                      {item.emoji && (
                        <span className="modal-acc-emoji">{item.emoji}</span>
                      )}
                      <span className="modal-acc-title">{item.title}</span>
                      <span className="modal-acc-arrow">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    <div className="modal-acc-body">
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
          <a
            href={`https://wa.me/573125755037?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp modal-cta"
          >
            <MessageCircle size={20} />
            {service.whatsappOnly ? 'Comprar por WhatsApp' : 'Consultar disponibilidad'}
          </a>
        </div>
      </div>
    </div>
  );
}
