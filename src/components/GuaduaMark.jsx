import './GuaduaMark.css';

// Sello de la casa: un tramo de guadua con sus nudos y un brote.
// Va sobre los títulos de sección en lugar de una etiqueta de texto.
export default function GuaduaMark({ className = '' }) {
  return (
    <svg
      className={`guadua-mark ${className}`}
      viewBox="0 0 132 20"
      width="132"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      {/* tallo */}
      <rect x="2" y="7" width="112" height="6" rx="3" className="gm-culm" />
      {/* nudos: anillo más oscuro y un poco más ancho que el tallo */}
      <rect x="34" y="5.5" width="4" height="9" rx="1.5" className="gm-node" />
      <rect x="74" y="5.5" width="4" height="9" rx="1.5" className="gm-node" />
      <rect x="110" y="5.5" width="4" height="9" rx="1.5" className="gm-node" />
      {/* brillo de la corteza */}
      <path d="M6 8.6 H32 M40 8.6 H72 M80 8.6 H108" className="gm-shine" />
      {/* brote */}
      <path d="M114 10 C120 10 124 6 129 2 C126 8 121 12 114 10 Z" className="gm-leaf" />
    </svg>
  );
}
