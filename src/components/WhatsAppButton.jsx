import WhatsAppIcon from './WhatsAppIcon';
import './WhatsAppButton.css';

export default function WhatsAppButton({ hideOnMobile = false }) {
  return (
    <a
      href="https://wa.me/573125755037?text=%C2%A1Hola!%20Me%20interesa%20conocer%20m%C3%A1s%20sobre%20Ecogranja%20San%20Francisco."
      target="_blank"
      rel="noreferrer"
      className={`whatsapp-float${hideOnMobile ? ' is-hidden-mobile' : ''}`}
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon size={30} />
      <span className="whatsapp-tooltip">¿Hablamos?</span>
    </a>
  );
}
