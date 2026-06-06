import { useState } from 'react';
import {
  Home, Tent, Users, ShoppingBasket, Sparkles,
  ArrowRight, MessageCircle,
} from 'lucide-react';
import { servicesData } from '../data/services';
import ServiceModal from '../components/ServiceModal';
import ExperienciasModal from '../components/ExperienciasModal';
import './ServiciosTab.css';

const ICON_MAP = {
  Home, Tent, Users, ShoppingBasket, Sparkles,
};

export default function ServiciosTab({ onTabChange }) {
  const [activeService, setActiveService] = useState(null);

  const handleCardClick = (service) => setActiveService(service);
  const handleClose = () => setActiveService(null);

  return (
    <div className="servicios-tab">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">Lo que ofrecemos</span>
          <h2 className="section-title">Nuestros servicios</h2>
          <p className="section-desc">
            Experiencias únicas en contacto con la naturaleza, diseñadas para familias,
            empresas, jóvenes y viajeros que buscan autenticidad y bienestar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service) => {
            const Icon = ICON_MAP[service.icon] || Home;
            return (
              <article
                key={service.id}
                className="service-card"
                onClick={() => handleCardClick(service)}
              >
                <div className="service-card-img">
                  <img
                    src={service.images[0]}
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="service-card-tag" style={{ background: service.color }}>
                    {service.tag}
                  </div>
                </div>

                <div className="service-card-body">
                  <div className="service-card-icon" style={{ color: service.color }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">
                    {service.description.slice(0, 120)}...
                  </p>
                  <button className="service-card-btn">
                    Ver detalles <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Menu section */}
        <div className="menu-section">
          <div className="menu-content">
            <div>
              <h3>¿Quieres ver nuestro menú?</h3>
              <p>Consulta nuestro menú de Pollo Asado para eventos especiales</p>
            </div>
            <div className="menu-actions">
              <button
                className="btn-primary"
                onClick={() => onTabChange('menu')}
              >
                Ver menú completo
              </button>
              <a
                href="https://wa.me/573125755037?text=%C2%A1Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20el%20men%C3%BA%20para%20eventos."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Reserve CTA */}
        <div className="services-cta">
          <p>¿No encuentras lo que buscas? Cuéntanos y creamos una experiencia para ti.</p>
          <button className="btn-primary" onClick={() => onTabChange('reservas')}>
            <MessageCircle size={18} /> Consultar disponibilidad
          </button>
        </div>
      </div>

      {/* Modals */}
      {activeService && activeService.isExperiencias && (
        <ExperienciasModal service={activeService} onClose={handleClose} />
      )}
      {activeService && !activeService.isExperiencias && (
        <ServiceModal service={activeService} onClose={handleClose} />
      )}
    </div>
  );
}
