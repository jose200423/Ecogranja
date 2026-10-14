import {
  Home, Tent, Users, ShoppingBasket, Sparkles,
  ArrowRight, MessageCircle,
} from 'lucide-react';
import { servicesData, formatPrice } from '../data/services';
import ServiceModal from '../components/ServiceModal';
import ExperienciasModal from '../components/ExperienciasModal';
import './ServiciosTab.css';
import GuaduaMark from '../components/GuaduaMark';
import PageDecor from '../components/PageDecor';

const ICON_MAP = {
  Home, Tent, Users, ShoppingBasket, Sparkles,
};

export default function ServiciosTab({
  onTabChange, serviceId, subId, onOpenService, onCloseService, onSubChange,
}) {
  // El servicio abierto vive en la URL (#/servicios/<id>), así se puede enlazar y "atrás" lo cierra
  const activeService = servicesData.find((s) => s.id === serviceId) ?? null;

  const handleCardClick = (service) => onOpenService(service.id);
  const handleClose = onCloseService;

  return (
    <div className="servicios-tab">
      <PageDecor theme="servicios" />
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <GuaduaMark />
          <h1 className="section-title">Nuestros <em>servicios</em></h1>
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
                  {service.priceFrom && (
                    <p className="service-price">
                      Desde <strong>{formatPrice(service.priceFrom)}</strong> por persona
                    </p>
                  )}
                  <p className="service-card-desc">{service.description}</p>
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
        <ExperienciasModal
          key={activeService.id}
          service={activeService}
          initialSubId={subId}
          onSubChange={onSubChange}
          onBook={onTabChange}
          onClose={handleClose}
        />
      )}
      {activeService && !activeService.isExperiencias && (
        <ServiceModal key={activeService.id} service={activeService} onBook={onTabChange} onClose={handleClose} />
      )}
    </div>
  );
}
