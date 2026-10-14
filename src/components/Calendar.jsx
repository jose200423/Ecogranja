import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import './Calendar.css';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const DAYS_HEADER = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const MODE_HINT = {
  single: 'Elige el día de tu visita.',
  range: 'Toca el día de llegada y luego el de salida.',
  multi: 'Toca cada día que necesites; puedes elegir varios.',
};

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

// `fixedMode` llega desde la opción elegida (Pasadía = un día, Dos días = rango).
// Sin opción elegida, el visitante puede alternar entre rango y fechas sueltas.
export default function Calendar({ serviceLabel, optionLabel, fixedMode, guestCount }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [freeMode, setFreeMode] = useState('range');
  const [dates, setDates] = useState([]);
  const mode = fixedMode || freeMode;

  // Cambiar de modo invalida la selección anterior
  useEffect(() => setDates([]), [mode]);

  const days = useMemo(() => {
    const cells = [];
    const firstDay = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= total; d++) {
      const dt = new Date(year, month, d);
      dt.setHours(0, 0, 0, 0);
      cells.push(dt);
    }
    return cells;
  }, [month, year]);

  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

  const prevMonth = () => {
    if (isCurrentMonth) return;
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const handleDayClick = (date) => {
    if (!date || date < today) return;

    if (mode === 'single') {
      setDates(dates.length === 1 && isSameDay(dates[0], date) ? [] : [date]);
    } else if (mode === 'range') {
      if (dates.length === 0 || dates.length === 2) {
        setDates([date]);
      } else {
        const start = dates[0];
        if (isSameDay(date, start)) {
          setDates([]);
        } else if (date < start) {
          setDates([date, start]);
        } else {
          setDates([start, date]);
        }
      }
    } else {
      const idx = dates.findIndex((d) => isSameDay(d, date));
      if (idx >= 0) {
        setDates((prev) => prev.filter((_, i) => i !== idx));
      } else {
        setDates((prev) => [...prev, date].sort((a, b) => a - b));
      }
    }
  };

  const dayState = (date) => {
    const cls = ['cal-day'];
    let selected = false;
    if (isSameDay(date, today)) cls.push('today');

    if (mode === 'range' && dates.length === 2) {
      const [s, e] = dates;
      if (isSameDay(date, s)) { cls.push('range-start'); selected = true; }
      else if (isSameDay(date, e)) { cls.push('range-end'); selected = true; }
      else if (date > s && date < e) cls.push('in-range');
    } else if (dates.some((d) => isSameDay(d, date))) {
      cls.push('selected');
      selected = true;
    }
    return { className: cls.join(' '), selected };
  };

  const formatDate = (d) =>
    d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatLong = (d) =>
    d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });

  const rangeReady = mode === 'range' && dates.length === 2;
  const nights = rangeReady ? Math.round((dates[1] - dates[0]) / 86400000) : 0;
  const datesReady = mode === 'range' ? rangeReady : dates.length > 0;
  const canBook = datesReady && Boolean(serviceLabel);

  const buildMsg = () => {
    let msg = '¡Hola! Me gustaría hacer una reserva en Ecogranja San Francisco.\n\n';
    msg += `*Servicio:* ${serviceLabel}${optionLabel ? ` — ${optionLabel}` : ''}\n`;
    if (rangeReady) {
      msg += `*Entrada:* ${formatDate(dates[0])}\n`;
      msg += `*Salida:* ${formatDate(dates[1])}\n`;
      msg += `*Noches:* ${nights}\n`;
    } else {
      msg += `*${dates.length === 1 ? 'Fecha' : 'Fechas'}:* ${dates.map(formatDate).join(', ')}\n`;
    }
    msg += `*Personas:* ${guestCount}\n\n¿Tienen disponibilidad?`;
    return encodeURIComponent(msg);
  };

  const people = `${guestCount} ${guestCount === 1 ? 'persona' : 'personas'}`;
  let summary = null;
  if (rangeReady) {
    summary = (
      <p>
        <strong>{formatDate(dates[0])}</strong> → <strong>{formatDate(dates[1])}</strong>
        <br />
        <span>{nights} {nights === 1 ? 'noche' : 'noches'} · {people}</span>
      </p>
    );
  } else if (mode === 'range' && dates.length === 1) {
    summary = <p>Llegada: <strong>{formatDate(dates[0])}</strong><br /><span>Ahora elige el día de salida</span></p>;
  } else if (mode === 'single' && dates.length === 1) {
    summary = <p><strong className="cal-cap">{formatLong(dates[0])}</strong><br /><span>{people}</span></p>;
  } else if (dates.length > 0) {
    summary = (
      <p>
        {dates.length} {dates.length === 1 ? 'fecha seleccionada' : 'fechas seleccionadas'}
        <br />
        <span>{people}</span>
      </p>
    );
  }

  let ctaLabel = 'Reservar por WhatsApp';
  if (!serviceLabel) ctaLabel = 'Primero elige un servicio';
  else if (mode === 'range' && dates.length === 1) ctaLabel = 'Elige el día de salida';
  else if (!datesReady) ctaLabel = mode === 'single' ? 'Elige el día de tu visita' : 'Elige tus fechas';

  return (
    <div className="calendar">
      {/* Header */}
      <div className="cal-header">
        <button
          className="cal-nav"
          onClick={prevMonth}
          disabled={isCurrentMonth}
          aria-label="Mes anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="cal-month-label" aria-live="polite">
          {MONTHS[month]} {year}
        </span>
        <button className="cal-nav" onClick={nextMonth} aria-label="Mes siguiente">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Mode toggle: solo cuando la opción del servicio no define el tipo de fecha */}
      {!fixedMode && (
        <div className="cal-mode" role="group" aria-label="Tipo de selección">
          <button
            className={freeMode === 'range' ? 'active' : ''}
            aria-pressed={freeMode === 'range'}
            onClick={() => setFreeMode('range')}
          >
            Llegada y salida
          </button>
          <button
            className={freeMode === 'multi' ? 'active' : ''}
            aria-pressed={freeMode === 'multi'}
            onClick={() => setFreeMode('multi')}
          >
            Días sueltos
          </button>
        </div>
      )}
      <p className="cal-hint">{MODE_HINT[mode]}</p>

      {/* Grid */}
      <div className="cal-grid">
        {DAYS_HEADER.map((d) => (
          <div key={d} className="cal-day-header" aria-hidden="true">{d}</div>
        ))}
        {days.map((date, i) => {
          if (!date) return <div key={i} className="cal-day empty" aria-hidden="true" />;
          const past = date < today;
          const { className, selected } = dayState(date);
          return (
            <button
              key={i}
              type="button"
              className={past ? 'cal-day disabled' : className}
              onClick={() => handleDayClick(date)}
              disabled={past}
              aria-pressed={past ? undefined : selected}
              aria-label={formatLong(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="cal-legend" aria-hidden="true">
        <span className="legend-today">Hoy</span>
        <span className="legend-selected">Seleccionado</span>
        <span className="legend-disabled">Fechas pasadas</span>
      </div>

      {/* Footer: resumen + CTA, fijo abajo en móvil mientras se usa el calendario */}
      <div className="cal-footer">
        {summary && (
          <div className="cal-summary" aria-live="polite">
            {summary}
            <button className="cal-clear" onClick={() => setDates([])}>Limpiar</button>
          </div>
        )}

        <a
          href={canBook ? `https://wa.me/573125755037?text=${buildMsg()}` : undefined}
          target="_blank"
          rel="noreferrer"
          role={canBook ? undefined : 'link'}
          aria-disabled={canBook ? undefined : 'true'}
          className={`cal-cta ${canBook ? '' : 'cal-cta-disabled'}`}
        >
          <MessageCircle size={20} />
          {ctaLabel}
        </a>
      </div>

    </div>
  );
}
