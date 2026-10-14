import './FallingLeaves.css';

// Unas pocas hojas que caen despacio por detrás del contenido.
// Cada una con su carril, ritmo y retraso, para que nunca caigan juntas.
const DEFAULT_LEAVES = [
  { left: '6%',  size: 30, dur: 19, delay: -2,  sway: 60,  tone: 'a' },
  { left: '18%', size: 22, dur: 24, delay: -14, sway: -45, tone: 'b' },
  { left: '37%', size: 26, dur: 21, delay: -8,  sway: 50,  tone: 'c', desktop: true },
  { left: '58%', size: 20, dur: 26, delay: -19, sway: -55, tone: 'a', desktop: true },
  { left: '76%', size: 28, dur: 20, delay: -5,  sway: 40,  tone: 'b' },
  { left: '91%', size: 24, dur: 23, delay: -11, sway: -50, tone: 'c' },
];

const FILL = { a: '#5b8a45', b: '#86ad62', c: '#a8874f' };
// En la página Guadua las hojas caen de los tallos (GuaduaDrops); esta capa queda solo en el celular
export default function FallingLeaves({ mobileOnly = false }) {
  return (
    <div className={`falling-leaves${mobileOnly ? ' is-mobile-only' : ''}`} aria-hidden="true">
      {DEFAULT_LEAVES.map((l, i) => {
        const fill = FILL[l.tone];
        return (
          <span
            key={i}
            className={`fl-lane${l.desktop ? ' fl-desktop' : ''}`}
            style={{ left: l.left, '--dur': `${l.dur}s`, '--delay': `${l.delay}s`, '--sway': `${l.sway}px` }}
          >
            <svg className="fl-leaf" width={l.size} height={l.size * 0.34} viewBox="0 0 100 34">
              <path d="M0 17 C18 -1 62 3 100 17 C60 29 20 33 0 17Z" fill={fill} />
              <path d="M4 17 Q50 15 94 17" stroke="#eef5e2" strokeOpacity=".5" strokeWidth="1.4" fill="none" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
