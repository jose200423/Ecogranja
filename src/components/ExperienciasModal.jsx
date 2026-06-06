import { useState, useEffect } from 'react';
import { X, Heart, Briefcase, GraduationCap, Check, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './ExperienciasModal.css';

const ICON_MAP = { Heart, Briefcase, GraduationCap };

export default function ExperienciasModal({ service, onClose }) {
  const [activeSubService, setActiveSubService] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (activeSubService) setActiveSubService(null);
        else onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, activeSubService]);

  const prevImg = () =>
    setImgIndex((i) => (i - 1 + service.images.length) % service.images.length);
  const nextImg = () =>
    setImgIndex((i) => (i + 1) % service.images.length);

  const openWA = (sub) => {
    const msg = encodeURIComponent(
      `¡Hola! Estoy interesado/a en el servicio de *${sub.title}* de Ecogranja San Francisco. ¿Me pueden dar más información?`
    );
    window.open(`https://wa.me/573125755037?text=${msg}`, '_blank');
  };

  return (
    <div className="exp-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="exp-modal">
        {/* Header image */}
        <div className="exp-modal-hero">
          <img src={service.images[imgIndex]} alt={service.title} />
          {service.images.length > 1 && (
            <>
              <button className="exp-img-nav prev" onClick={prevImg}><ChevronLeft size={22} /></button>
              <button className="exp-img-nav next" onClick={nextImg}><ChevronRight size={22} /></button>
              <div className="exp-img-dots">
                {service.images.map((_, i) => (
                  <button
                    key={i}
                    className={`exp-img-dot ${i === imgIndex ? 'active' : ''}`}
                    onClick={() => setImgIndex(i)}
                  />
                ))}
              </div>
            </>
          )}
          <button className="exp-modal-close" onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>
          <div className="exp-modal-tag" style={{ background: service.color }}>{service.tag}</div>
        </div>

        {/* Body */}
        <div className="exp-modal-body">
          <h2 className="exp-modal-title">{service.title}</h2>
          <p className="exp-modal-subtitle">{service.subtitle}</p>
          <p className="exp-modal-desc">{service.description}</p>

          {/* Sub-services */}
          <h3 className="exp-sub-heading">Nuestras experiencias</h3>
          <div className="exp-sub-grid">
            {service.subServices.map((sub) => {
              const Icon = ICON_MAP[sub.icon] || Heart;
              return (
                <button
                  key={sub.id}
                  className={`exp-sub-card ${activeSubService?.id === sub.id ? 'active' : ''}`}
                  style={{ '--sub-color': sub.color }}
                  onClick={() => setActiveSubService(activeSubService?.id === sub.id ? null : sub)}
                >
                  <div className="exp-sub-icon" style={{ color: sub.color }}>
                    <Icon size={26} />
                  </div>
                  <span className="exp-sub-title">{sub.title}</span>
                  <span className="exp-sub-arrow">{activeSubService?.id === sub.id ? '▲' : '▼'}</span>
                </button>
              );
            })}
          </div>

          {/* Floating panel for active sub-service */}
          {activeSubService && (
            <div className="exp-sub-panel" style={{ borderColor: activeSubService.color }}>
              <div className="exp-sub-panel-header" style={{ background: activeSubService.color }}>
                <h4>{activeSubService.title}</h4>
              </div>
              <div className="exp-sub-panel-body">
                <p className="exp-sub-panel-desc">{activeSubService.description}</p>

                <div className="exp-sub-panel-cols">
                  <div>
                    <h5>Detalles</h5>
                    <ul className="exp-details-list">
                      {activeSubService.details.map((d) => (
                        <li key={d.label}>
                          <strong>{d.label}:</strong> {d.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5>Incluye</h5>
                    <ul className="exp-includes-list">
                      {activeSubService.includes.map((inc) => (
                        <li key={inc}><Check size={14} /> {inc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="exp-sub-wa-btn"
                  onClick={() => openWA(activeSubService)}
                  style={{ background: activeSubService.color }}
                >
                  <MessageCircle size={18} /> Consultar por WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* General CTA */}
          {!activeSubService && (
            <div className="exp-general-cta">
              <p>¿Tienes en mente una experiencia diferente? Cuéntanos y la diseñamos para ti.</p>
              <a
                href="https://wa.me/573125755037?text=%C2%A1Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20Experiencias%20y%20Encuentros."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} /> Escribir por WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
