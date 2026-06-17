import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import './Navbar.css';

const TABS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'galeria', label: 'Galería' },
  { id: 'guadua', label: 'Guadua' },
  { id: 'reservas', label: 'Reservas' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar({ activeTab, onTabChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setMenuOpen(false);
  };

  const isInicio = activeTab === 'inicio';

  return (
    <header className={`navbar ${scrolled || !isInicio ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <button className="navbar-logo" onClick={() => handleTabClick('inicio')}>
          <img src={`${import.meta.env.BASE_URL}images/logo.webp`} alt="Ecogranja San Francisco" className="logo-img" />
          <div className="logo-text">
            <span className="logo-name">Ecogranja</span>
            <span className="logo-sub">San Francisco</span>
          </div>
        </button>

        {/* Desktop tabs */}
        <nav className="navbar-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`mobile-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <a
            href="https://wa.me/573125755037"
            target="_blank"
            rel="noreferrer"
            className="mobile-whatsapp"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf size={16} /> Reservar ahora
          </a>
        </div>
      )}
    </header>
  );
}
