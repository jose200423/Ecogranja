import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FallingLeaves from './components/FallingLeaves';
import InicioTab from './tabs/InicioTab';
import './App.css';

const ServiciosTab = lazy(() => import('./tabs/ServiciosTab'));
const GaleriaTab   = lazy(() => import('./tabs/GaleriaTab'));
const GuaduaTab    = lazy(() => import('./tabs/GuaduaTab'));
const MenuTab      = lazy(() => import('./tabs/MenuTab'));
const ReservasTab  = lazy(() => import('./tabs/ReservasTab'));

// ── Rutas por hash: #/servicios/ruah, #/servicios/experiencias/colegio, #/reservas…
// Así el botón "atrás" funciona y cada pestaña o servicio se puede compartir por WhatsApp.
const TABS = ['inicio', 'servicios', 'galeria', 'guadua', 'menu', 'reservas', 'contacto'];

const SITE_TITLE = 'Ecogranja San Francisco';
const TAB_TITLES = {
  inicio:    `${SITE_TITLE} | Turismo Ecológico en Silvania, Cundinamarca`,
  servicios: `Servicios · ${SITE_TITLE}`,
  galeria:   `Galería · ${SITE_TITLE}`,
  guadua:    `Construcciones en guadua · ${SITE_TITLE}`,
  menu:      `Menú · ${SITE_TITLE}`,
  reservas:  `Reservas · ${SITE_TITLE}`,
  contacto:  `Contacto · ${SITE_TITLE}`,
};

function parseHash() {
  const [tab, serviceId = null, subId = null] = window.location.hash
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean)
    .map(decodeURIComponent);
  if (!TABS.includes(tab)) return { tab: 'inicio', serviceId: null, subId: null };
  return { tab, serviceId, subId };
}

function TabSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{ width: 40, height: 40, border: '4px solid #e0e0e0', borderTop: '4px solid #2d5a1b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const scrollToContact = () =>
  document.getElementById('contacto-section')?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalOpenedInApp = useRef(false);
  const prevTab = useRef(route.tab);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    const handleHash = () => {
      const next = parseHash();
      if (next.tab !== 'servicios' || !next.serviceId) modalOpenedInApp.current = false;
      setRoute(next);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Título de la pestaña del navegador y posición al cambiar de sección
  useEffect(() => {
    document.title = TAB_TITLES[route.tab];
    const changed = prevTab.current !== route.tab;
    prevTab.current = route.tab;
    if (route.tab === 'contacto') {
      setTimeout(scrollToContact, 80);
    } else if (changed) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [route.tab]);

  const navigate = useCallback((path, { replace = false } = {}) => {
    const hash = `#/${path}`;
    if (replace) {
      history.replaceState(null, '', hash);
      setRoute(parseHash());
    } else {
      window.location.hash = hash.slice(1);
    }
  }, []);

  const handleTabChange = useCallback((path) => {
    const [tab] = path.split('/');
    if (path === route.tab) {
      // Misma pestaña: no hay cambio de hash, solo se recoloca la vista
      if (tab === 'contacto') scrollToContact();
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(path);
  }, [route.tab, navigate]);

  const openService = useCallback((id) => {
    modalOpenedInApp.current = true;
    navigate(`servicios/${id}`);
  }, [navigate]);

  const closeService = useCallback(() => {
    if (modalOpenedInApp.current) {
      modalOpenedInApp.current = false;
      history.back();
    } else {
      navigate('servicios', { replace: true });
    }
  }, [navigate]);

  // Elegir una experiencia dentro del modal actualiza la URL sin crear otra entrada de historial
  const changeSub = useCallback((subId) => {
    const base = `#/servicios/${route.serviceId}`;
    history.replaceState(null, '', subId ? `${base}/${subId}` : base);
  }, [route.serviceId]);

  const activeTab = route.tab;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="app">
      <FallingLeaves mobileOnly={activeTab === 'guadua'} />
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className={`main-content ${activeTab !== 'inicio' && activeTab !== 'contacto' ? 'with-padding' : ''}`}>
        {(activeTab === 'inicio' || activeTab === 'contacto') && <InicioTab onTabChange={handleTabChange} />}
        <Suspense fallback={<TabSpinner />}>
          {activeTab === 'servicios' && (
            <ServiciosTab
              onTabChange={handleTabChange}
              serviceId={route.serviceId}
              subId={route.subId}
              onOpenService={openService}
              onCloseService={closeService}
              onSubChange={changeSub}
            />
          )}
          {activeTab === 'galeria'   && <GaleriaTab />}
          {activeTab === 'guadua'    && <GuaduaTab />}
          {activeTab === 'menu'      && <MenuTab />}
          {activeTab === 'reservas'  && (
            <ReservasTab
              key={`${route.serviceId}/${route.subId}`}
              serviceId={route.serviceId}
              optionId={route.subId}
            />
          )}
        </Suspense>
      </main>

      <Footer onTabChange={handleTabChange} />

      <WhatsAppButton hideOnMobile={activeTab === 'reservas'} />

      {showScrollTop && (
        <button
          className={`scroll-top-btn${activeTab === 'reservas' ? ' is-hidden-mobile' : ''}`}
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
