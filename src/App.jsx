import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import InicioTab from './tabs/InicioTab';
import './App.css';

const ServiciosTab = lazy(() => import('./tabs/ServiciosTab'));
const GaleriaTab   = lazy(() => import('./tabs/GaleriaTab'));
const GuaduaTab    = lazy(() => import('./tabs/GuaduaTab'));
const MenuTab      = lazy(() => import('./tabs/MenuTab'));
const ReservasTab  = lazy(() => import('./tabs/ReservasTab'));

function TabSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{ width: 40, height: 40, border: '4px solid #e0e0e0', borderTop: '4px solid #2d5a1b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollToContact = useRef(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to contact section after switching to inicio
  useEffect(() => {
    if (activeTab === 'inicio' && scrollToContact.current) {
      scrollToContact.current = false;
      setTimeout(() => {
        document.getElementById('contacto-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    if (tab === 'contacto') {
      if (activeTab === 'inicio') {
        document.getElementById('contacto-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        scrollToContact.current = true;
        setActiveTab('inicio');
      }
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className={`main-content ${activeTab !== 'inicio' ? 'with-padding' : ''}`}>
        {activeTab === 'inicio' && <InicioTab onTabChange={handleTabChange} />}
        <Suspense fallback={<TabSpinner />}>
          {activeTab === 'servicios' && <ServiciosTab onTabChange={handleTabChange} />}
          {activeTab === 'galeria'   && <GaleriaTab />}
          {activeTab === 'guadua'    && <GuaduaTab />}
          {activeTab === 'menu'      && <MenuTab />}
          {activeTab === 'reservas'  && <ReservasTab />}
        </Suspense>
      </main>

      <Footer onTabChange={handleTabChange} />

      <WhatsAppButton />

      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
