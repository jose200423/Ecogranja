import { MapPin, Phone } from 'lucide-react';
import './Footer.css';

export default function Footer({ onTabChange }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/images/logo.webp" alt="Ecogranja San Francisco" />
            <div>
              <strong>Ecogranja</strong>
              <span>San Francisco</span>
            </div>
          </div>
          <p className="footer-tagline">
            Donde la naturaleza te abraza. Un refugio verde para el alma, la familia y el espíritu
            en la vereda Safranal, Silvania, Cundinamarca.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/ecogranjasfo/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src="/images/iconos/instagram.png" alt="Instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@ecogranjasanfra"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <img src="/images/iconos/tiktok.png" alt="TikTok" />
            </a>
            <a
              href="https://wa.me/573125755037"
              target="_blank"
              rel="noreferrer"
              className="footer-wa"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Navegación</h4>
          <nav>
            {['inicio', 'servicios', 'galeria', 'guadua', 'reservas', 'contacto'].map((tab) => (
              <button key={tab} onClick={() => onTabChange(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div className="footer-links">
          <h4>Servicios</h4>
          <nav>
            <button onClick={() => onTabChange('servicios')}>Hospedaje y Cabañas</button>
            <button onClick={() => onTabChange('servicios')}>Campamento RUAH</button>
            <button onClick={() => onTabChange('servicios')}>Experiencia RUAH</button>
            <button onClick={() => onTabChange('servicios')}>Encuentros Empresariales</button>
            <button onClick={() => onTabChange('servicios')}>Retiros Espirituales</button>
            <button onClick={() => onTabChange('servicios')}>Productos Orgánicos</button>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Contacto</h4>
          <ul>
            <li>
              <MapPin size={16} />
              <span>Vda. Safranal, Silvania, Cundinamarca</span>
            </li>
            <li>
              <Phone size={16} />
              <a href="tel:+573125755037">+57 312 5755037</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Ecogranja San Francisco. Todos los derechos reservados.
        </p>
        <p className="footer-credits">Diseño con amor por la naturaleza 🌿</p>
      </div>
    </footer>
  );
}
