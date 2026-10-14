import { MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './Footer.css';

export default function Footer({ onTabChange }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={`${import.meta.env.BASE_URL}images/logo.webp`} alt="Ecogranja San Francisco" />
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
              <img src={`${import.meta.env.BASE_URL}images/iconos/instagram.png`} alt="Instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@ecogranjasanfra"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <img src={`${import.meta.env.BASE_URL}images/iconos/tiktok.png`} alt="TikTok" />
            </a>
            <a
              href="https://wa.me/573125755037"
              target="_blank"
              rel="noreferrer"
              className="footer-wa"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Navegación</h4>
          <nav>
            {[
              ['inicio', 'Inicio'],
              ['servicios', 'Servicios'],
              ['galeria', 'Galería'],
              ['guadua', 'Guadua'],
              ['menu', 'Menú'],
              ['reservas', 'Reservas'],
              ['contacto', 'Contacto'],
            ].map(([tab, label]) => (
              <button key={tab} onClick={() => onTabChange(tab)}>
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div className="footer-links">
          <h4>Servicios</h4>
          <nav>
            <button onClick={() => onTabChange('servicios/hospedaje')}>Estadía en la naturaleza</button>
            <button onClick={() => onTabChange('servicios/ruah')}>Experiencia RUAH</button>
            <button onClick={() => onTabChange('servicios/campamento')}>Campamento RUAH</button>
            <button onClick={() => onTabChange('servicios/experiencias/empresarial')}>Encuentros empresariales</button>
            <button onClick={() => onTabChange('servicios/experiencias/colegio')}>Convivencias de colegio</button>
            <button onClick={() => onTabChange('servicios/productos')}>Productos orgánicos</button>
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
