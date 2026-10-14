import puntos from '../assets/deco/guadua-puntos.json';

// Hojas que se sueltan de los racimos del dibujo de guadua y caen un trecho.
// Los puntos salen del generador de las ilustraciones (mismas coordenadas que el dibujo),
// y se repiten en cada tramo del tallo, que se dibuja en mosaico a lo alto de la página.
const TILES = 3;
const TONES = [['#3f6b35', '#6f9a4f'], ['#4d7c3c', '#8db86a'], ['#2f5a2c', '#5b8a45']];

// Solo los racimos cercanos al tallo o al borde: lejos del texto de la página
const PICK = {
  borde: (pts) => pts,
  ramas: (pts) => pts.filter(([x]) => x > 200),
};

export default function GuaduaDrops({ set, side }) {
  const { w, h, pts } = puntos[set];
  const chosen = PICK[set](pts);
  const outward = side === 'left' ? -1 : 1;
  const drops = [];
  for (let k = 0; k < TILES; k++) {
    chosen.forEach(([x, y], i) => {
      const n = k * chosen.length + i;
      drops.push({
        key: n,
        left: `${(x / w) * 100}%`,
        ratio: (y + k * h) / w,
        dur: 11 + (n * 7) % 6,           // 11–16 s
        delay: -((n * 3.7) % 14),        // escalonadas: nunca caen todas a la vez
        dx: outward * (18 + (n * 11) % 26),
        fall: 260 + (n * 37) % 140,      // 260–400 px
        tone: TONES[n % TONES.length],
        tilt: (n % 2 ? 1 : -1) * (14 + (n * 5) % 16),
      });
    });
  }

  return (
    <div className={`pd-drops is-${side}`} aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.key}
          className="gd-drop"
          style={{
            left: d.left,
            top: `calc(var(--w) * ${d.ratio.toFixed(4)})`,
            '--dur': `${d.dur}s`,
            '--delay': `${d.delay}s`,
            '--dx': `${d.dx}px`,
            '--fall': `${d.fall}px`,
            '--tilt': `${d.tilt}deg`,
          }}
        >
          <svg className="gd-drop-leaf" viewBox="0 0 100 34">
            <defs>
              <linearGradient id={`gd-${set}-${d.key}`} x1="0" x2="1">
                <stop offset="0" stopColor={d.tone[0]} />
                <stop offset="1" stopColor={d.tone[1]} />
              </linearGradient>
            </defs>
            <path d="M0 17 C18 -1 62 3 100 17 C60 29 20 33 0 17Z" fill={`url(#gd-${set}-${d.key})`} />
            <path d="M4 17 Q50 15 94 17" stroke="#eef5e2" strokeOpacity=".5" strokeWidth="1.4" fill="none" />
          </svg>
        </span>
      ))}
    </div>
  );
}
