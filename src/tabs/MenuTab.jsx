import './MenuTab.css';

const MENU = {
  combos: {
    title: 'Combos',
    items: [
      { name: 'Combo Personal', desc: '1/4 de pollo asado + papas fritas + bebida', price: '$22.000' },
      { name: 'Combo Familiar', desc: '1 pollo entero + papas fritas + 4 bebidas + ensalada', price: '$75.000' },
      { name: 'Combo Pareja', desc: '1/2 pollo asado + papas fritas + 2 bebidas', price: '$40.000' },
      { name: 'Combo Ejecutivo', desc: '1/4 de pollo + arroz + ensalada + bebida', price: '$26.000' },
    ],
  },
  presas: {
    title: 'Presas Sueltas',
    items: [
      { name: 'Pechuga', price: '$12.000' },
      { name: 'Pierna y Pernil', price: '$10.000' },
      { name: 'Ala', price: '$8.000' },
      { name: '1/4 de Pollo', price: '$14.000' },
      { name: '1/2 Pollo', price: '$26.000' },
      { name: 'Pollo Entero', price: '$48.000' },
    ],
  },
  carta: {
    title: 'A La Carta',
    items: [
      { name: 'Pollo asado + papas', price: '$18.000' },
      { name: 'Pollo asado + arroz + ensalada', price: '$20.000' },
      { name: 'Pollo asado + yuca frita', price: '$19.000' },
      { name: 'Pollo asado + tostones', price: '$19.000' },
    ],
  },
  ejecutivo: {
    title: 'Menú Ejecutivo',
    badge: 'Lun – Vie',
    items: [
      { name: 'Sopa del día', desc: 'Crema o sopa campesina según temporada' },
      { name: 'Plato principal', desc: '1/4 de pollo asado + arroz + ensalada + bebida' },
      { name: 'Postre', desc: 'Según disponibilidad del día' },
      { name: 'Precio todo incluido', price: '$28.000' },
    ],
  },
  sopas: {
    title: 'Sopas',
    items: [
      { name: 'Caldo de pollo campesino', price: '$8.000' },
      { name: 'Sancocho de pollo', price: '$10.000' },
      { name: 'Crema de mazorca', price: '$9.000' },
      { name: 'Ajiaco santafereño', price: '$12.000' },
    ],
  },
  porciones: {
    title: 'Porciones / Acompañamientos',
    items: [
      { name: 'Papas fritas', price: '$5.000' },
      { name: 'Yuca frita', price: '$5.000' },
      { name: 'Arroz', price: '$4.000' },
      { name: 'Ensalada fresca', price: '$5.000' },
      { name: 'Tostones', price: '$5.000' },
      { name: 'Mazorca asada', price: '$4.000' },
    ],
  },
  bebidas: {
    title: 'Bebidas',
    sections: [
      {
        subtitle: 'Gaseosas y refrescos',
        items: [
          { name: 'Gaseosa personal (lata/botella)', price: '$4.000' },
          { name: 'Agua mineral', price: '$3.000' },
          { name: 'Té frío', price: '$4.000' },
          { name: 'Limonada natural', price: '$5.000' },
        ],
      },
      {
        subtitle: 'Jugos Naturales',
        highlight: true,
        items: [
          { name: 'Jugo de Mora', desc: 'Fresco y antioxidante', price: '$6.000' },
          { name: 'Jugo de Lulo', desc: 'El sabor del trópico', price: '$6.000' },
          { name: 'Jugo de Tomate de Árbol', desc: 'Fruta de clima frío', price: '$6.000' },
          { name: 'Jugo de Maracuyá', desc: 'Tropical y refrescante', price: '$6.000' },
          { name: 'Jugo de Curuba', desc: 'Fruta andina exclusiva', price: '$6.000' },
          { name: 'Jugo de Feijoa', desc: 'Aroma único de montaña', price: '$6.000' },
          { name: 'Jugo de Uchuva', desc: 'Dulce fruta silvestre', price: '$6.000' },
        ],
      },
      {
        subtitle: 'Bebidas calientes',
        items: [
          { name: 'Tinto / Café', price: '$2.000' },
          { name: 'Aromática / Infusión', price: '$2.500' },
          { name: 'Chocolate caliente', price: '$4.000' },
          { name: 'Aguapanela con queso', price: '$4.500' },
        ],
      },
    ],
  },
};

function Section({ data }) {
  return (
    <div className="menu-section-block">
      <div className="menu-section-title">
        <h3>{data.title}</h3>
        {data.badge && <span className="menu-badge">{data.badge}</span>}
      </div>

      {data.sections ? (
        data.sections.map((sub) => (
          <div key={sub.subtitle} className={`menu-subsection ${sub.highlight ? 'highlight' : ''}`}>
            <h4 className="menu-subsection-title">{sub.subtitle}</h4>
            <div className="menu-items">
              {sub.items.map((item) => (
                <div key={item.name} className="menu-item">
                  <div className="menu-item-left">
                    <span className="menu-item-name">{item.name}</span>
                    {item.desc && <span className="menu-item-desc">{item.desc}</span>}
                  </div>
                  {item.price && <span className="menu-item-price">{item.price}</span>}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="menu-items">
          {data.items.map((item) => (
            <div key={item.name} className="menu-item">
              <div className="menu-item-left">
                <span className="menu-item-name">{item.name}</span>
                {item.desc && <span className="menu-item-desc">{item.desc}</span>}
              </div>
              {item.price && <span className="menu-item-price">{item.price}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuTab() {
  return (
    <div className="menu-tab">
      {/* Hero */}
      <div className="menu-hero">
        <div className="menu-hero-inner">
          <img src={`${import.meta.env.BASE_URL}images/logo.webp`} alt="Ecogranja San Francisco" className="menu-logo" />
          <h1>Menú — Pollo Asado</h1>
          <p>Ecogranja San Francisco · Silvania, Cundinamarca</p>
        </div>
      </div>

      <div className="container">
        <div style={{ marginTop: '32px' }} />
        <div className="menu-grid">
          <Section data={MENU.combos} />
          <Section data={MENU.presas} />
          <Section data={MENU.carta} />
          <Section data={MENU.ejecutivo} />
          <Section data={MENU.sopas} />
          <Section data={MENU.porciones} />
        </div>

        {/* Bebidas — full width */}
        <Section data={MENU.bebidas} />

        {/* CTA */}
        <div className="menu-cta">
          <p>¿Pedido para evento o grupo grande? ¡Escríbenos!</p>
          <a
            href="https://wa.me/573125755037?text=%C2%A1Hola!%20Quiero%20hacer%20un%20pedido%20del%20men%C3%BA%20de%20Pollo%20Asado."
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
