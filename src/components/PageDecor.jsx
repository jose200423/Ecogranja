import guaduaBorde from '../assets/deco/guadua-borde.svg';
import guaduaRamas from '../assets/deco/guadua-ramas.svg';
import cafe from '../assets/deco/cafe.svg';
import mora from '../assets/deco/mora.svg';
import lulo from '../assets/deco/lulo.svg';
import huevos from '../assets/deco/huevos.svg';
import brote from '../assets/deco/brote.svg';
import luna from '../assets/deco/luna.svg';
import carpa from '../assets/deco/carpa.svg';
import fogata from '../assets/deco/fogata.svg';
import mariposa from '../assets/deco/mariposa.svg';
import hojas from '../assets/deco/hojas.svg';
import GuaduaDrops from './GuaduaDrops';
import './PageDecor.css';

// Ilustraciones de la finca en los márgenes de cada página.
// Cada página tiene su tema y su cantidad: unas más cargadas, otras apenas un detalle.
//   side: lado de la página · top: posición vertical en % del alto de la página
//   w: ancho en px · rot: giro · op: opacidad · flip: espejo · tall: ocupa todo el alto
//   mobile: se mantiene (más pequeña) en el celular
const THEMES = {
  // Inicio: la parte de "Nosotros" (la sección de contacto tiene su propio tema)
  inicio: [
    { src: cafe, side: 'right', top: '30%', w: 230, rot: 12, op: 0.55 },
    { src: hojas, side: 'left', top: '44%', w: 170, rot: -8, op: 0.45 },
  ],
  // Contáctanos: la mariposa acompaña el título; café y huerta a los lados
  contacto: [
    { src: mariposa, side: 'right', center: 250, top: '48px', w: 130, rot: 12, op: 0.9, strong: true, mobile: true },
    { src: cafe, side: 'left', top: '36%', w: 200, rot: -10, op: 0.5 },
    { src: hojas, side: 'right', top: '44%', w: 160, rot: 0, op: 0.4 },
    { src: brote, side: 'left', top: '82%', w: 170, rot: 0, op: 0.5 },
  ],
  // Un motivo por servicio: huerta (estadía), mariposa (RUAH en familia), carpa y fogata
  // (campamento), huevos y lulo (productos de la finca)
  servicios: [
    { src: mariposa, side: 'right', top: '3%', w: 120, rot: 14, op: 0.6, mobile: true },
    { src: brote, side: 'left', top: '12%', w: 150, rot: 0, op: 0.5 },
    { src: carpa, side: 'left', top: '34%', w: 150, rot: -4, op: 0.5 },
    { src: huevos, side: 'right', top: '40%', w: 150, rot: 6, op: 0.55 },
    { src: lulo, side: 'left', top: '60%', w: 130, rot: -8, op: 0.5 },
    { src: fogata, side: 'right', top: '72%', w: 110, rot: 0, op: 0.5 },
  ],
  galeria: [
    { src: mariposa, side: 'right', top: '4%', w: 100, rot: 16, op: 0.6, mobile: true },
    { src: hojas, side: 'left', top: '40%', w: 160, rot: 10, op: 0.4 },
  ],
  guadua: [
    { src: guaduaBorde, side: 'left', tall: true, op: 0.5, drops: 'borde' },
    { src: guaduaRamas, side: 'right', tall: true, op: 0.45, drops: 'ramas' },
    { src: hojas, side: 'right', top: '2%', w: 150, rot: 0, op: 0.4, mobile: true },
  ],
  menu: [
    { src: lulo, side: 'right', top: '14%', w: 150, rot: 8, op: 0.6, mobile: true },
    { src: mora, side: 'left', top: '38%', w: 150, rot: -10, op: 0.55 },
    { src: huevos, side: 'right', top: '64%', w: 150, rot: 4, op: 0.55 },
    { src: cafe, side: 'left', top: '84%', w: 190, rot: -14, op: 0.5 },
  ],
  reservas: [
    // La luna acompaña el título; la carpa y la fogata van en la escena bajo el calendario
    { src: luna, side: 'right', center: 250, top: '28px', w: 150, rot: -6, op: 0.95, strong: true, mobile: true },
    { src: hojas, side: 'left', top: '52%', w: 150, rot: 12, op: 0.4 },
  ],
};

export default function PageDecor({ theme }) {
  const items = THEMES[theme];
  if (!items) return null;
  return (
    <div className="page-decor" aria-hidden="true">
      {items.filter((it) => it.drops).map((it) => (
        <GuaduaDrops key={`drops-${it.drops}`} set={it.drops} side={it.side} />
      ))}
      {items.map((it, i) => it.tall ? (
        // Tallo de guadua: se repite a lo alto de la página sin deformarse
        <div
          key={i}
          className={`pd-item pd-${it.side} pd-tall${it.flip ? ' pd-flip' : ''}${it.mobile ? ' pd-mobile' : ''}`}
          style={{
            backgroundImage: `url(${it.src})`,
            opacity: it.op,
            '--pd-flip': it.flip ? -1 : 1,
          }}
        />
      ) : (
        <img
          key={i}
          src={it.src}
          alt=""
          decoding="async"
          loading="lazy"
          className={[
            'pd-item',
            `pd-${it.side}`,
            it.tall ? 'pd-tall' : '',
            it.mobile ? 'pd-mobile' : '',
            it.strong ? 'pd-strong' : '',
            it.center !== undefined ? 'pd-centered' : '',
          ].join(' ')}
          style={{
            top: it.tall ? undefined : it.top,
            // `center`: px desde el centro de la página, junto al título
            left: it.center !== undefined ? `calc(50% + ${it.center}px)` : undefined,
            width: it.tall ? undefined : it.w,
            '--pd-w': it.tall ? undefined : `${it.w}px`,
            opacity: it.op,
            '--pd-rot': `${it.rot ?? 0}deg`,
            '--pd-flip': it.flip ? -1 : 1,
          }}
        />
      ))}
    </div>
  );
}
