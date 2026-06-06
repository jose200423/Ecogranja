import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import './Calendar.css';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const DAYS_HEADER = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export default function Calendar({ selectedService, guestCount }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [mode, setMode] = useState('range');
  const [dates, setDates] = useState([]);

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

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const handleDayClick = (date) => {
    if (!date || date < today) return;

    if (mode === 'range') {
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

  const getDayClass = (date) => {
    if (!date) return 'cal-day empty';
    const cls = ['cal-day'];
    if (date < today) return [...cls, 'disabled'].join(' ');
    if (isSameDay(date, today)) cls.push('today');

    if (mode === 'range') {
      if (dates.length === 2) {
        const [s, e] = dates;
        if (isSameDay(date, s)) cls.push('range-start');
        else if (isSameDay(date, e)) cls.push('range-end');
        else if (date > s && date < e) cls.push('in-range');
      } else if (dates.length === 1 && isSameDay(date, dates[0])) {
        cls.push('selected');
      }
    } else {
      if (dates.some((d) => isSameDay(d, date))) cls.push('selected');
    }
    return cls.join(' ');
  };

  const formatDate = (d) =>
    d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });

  const nights =
    mode === 'range' && dates.length === 2
      ? Math.round((dates[1] - dates[0]) / 86400000)
      : mode === 'multi'
      ? dates.length
      : 0;

  const buildMsg = () => {
    let msg = '¡Hola! Me gustaría hacer una reserva en Ecogranja San Francisco.\n\n';
    if (selectedService) msg += `*Servicio:* ${selectedService}\n`;
    if (mode === 'range' && dates.length === 2) {
      msg += `*Entrada:* ${formatDate(dates[0])}\n`;
      msg += `*Salida:* ${formatDate(dates[1])}\n`;
      msg += `*Noches:* ${nights}\n`;
    } else if (dates.length > 0) {
      msg += `*Fechas:* ${dates.map(formatDate).join(', ')}\n`;
    }
    msg += `*Personas:* ${guestCount}\n\n¿Tienen disponibilidad?`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="calendar">
      {/* Header */}
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth} aria-label="Mes anterior">
          <ChevronLeft size={20} />
        </button>
        <span className="cal-month-label">
          {MONTHS[month]} {year}
        </span>
        <button className="cal-nav" onClick={nextMonth} aria-label="Mes siguiente">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Mode toggle */}
      <div className="cal-mode">
        <button
          className={mode === 'range' ? 'active' : ''}
          onClick={() => { setMode('range'); setDates([]); }}
        >
          Rango de fechas
        </button>
        <button
          className={mode === 'multi' ? 'active' : ''}
          onClick={() => { setMode('multi'); setDates([]); }}
        >
          Fechas múltiples
        </button>
      </div>

      {/* Grid */}
      <div className="cal-grid">
        {DAYS_HEADER.map((d) => (
          <div key={d} className="cal-day-header">{d}</div>
        ))}
        {days.map((date, i) => (
          <div
            key={i}
            className={getDayClass(date)}
            onClick={() => handleDayClick(date)}
            title={date ? formatDate(date) : ''}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>

      {/* Summary */}
      {dates.length > 0 && (
        <div className="cal-summary">
          {mode === 'range' && dates.length === 2 ? (
            <p>
              <strong>{formatDate(dates[0])}</strong> → <strong>{formatDate(dates[1])}</strong>
              <br />
              <span>{nights} {nights === 1 ? 'noche' : 'noches'} · {guestCount} {guestCount === 1 ? 'persona' : 'personas'}</span>
            </p>
          ) : (
            <p>
              {dates.length} {dates.length === 1 ? 'fecha seleccionada' : 'fechas seleccionadas'}
              {dates.length > 0 && ` · ${guestCount} ${guestCount === 1 ? 'persona' : 'personas'}`}
            </p>
          )}
          <button className="cal-clear" onClick={() => setDates([])}>Limpiar</button>
        </div>
      )}

      {/* Legend */}
      <div className="cal-legend">
        <span className="legend-today">● Hoy</span>
        <span className="legend-selected">■ Seleccionado</span>
        <span className="legend-disabled">No disponible</span>
      </div>

      {/* CTA */}
      <a
        href={
          dates.length > 0
            ? `https://wa.me/573125755037?text=${buildMsg()}`
            : '#'
        }
        target={dates.length > 0 ? '_blank' : '_self'}
        rel="noreferrer"
        className={`cal-cta ${dates.length === 0 ? 'cal-cta-disabled' : ''}`}
        onClick={(e) => { if (dates.length === 0) e.preventDefault(); }}
      >
        <MessageCircle size={20} />
        {dates.length === 0
          ? 'Selecciona fechas para reservar'
          : 'Reservar por WhatsApp'}
      </a>
    </div>
  );
}
