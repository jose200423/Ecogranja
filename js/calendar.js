/* ============================================================
   ECOGRANJA SAN FRANCISCO - Calendar Logic
   ============================================================ */

const Calendar = (() => {
  /* ── State ─────────────────────────────────────────────── */
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let selectedDates = [];   // array of Date objects
  let mode = 'range';       // 'range' | 'multi'

  const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  /* ── Helpers ─────────────────────────────────────────────── */
  const toKey = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const today = new Date(); today.setHours(0, 0, 0, 0);

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  function isBetween(d, start, end) {
    return d > start && d < end;
  }

  function formatDate(d) {
    return `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
  }

  function daysBetween(a, b) {
    return Math.round(Math.abs((b - a) / (1000 * 60 * 60 * 24)));
  }

  /* ── Render ──────────────────────────────────────────────── */
  function render() {
    const grid = document.getElementById('calGrid');
    const header = document.getElementById('calMonthYear');
    const modeToggle = document.getElementById('calModeToggle');

    if (!grid) return;

    header.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let html = '';

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-day empty"></div>`;
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      date.setHours(0, 0, 0, 0);
      const past = date < today;

      let classes = ['calendar-day'];
      if (past) classes.push('disabled');
      if (sameDay(date, today)) classes.push('today');

      if (!past) {
        if (mode === 'range' && selectedDates.length >= 1) {
          const sorted = [...selectedDates].sort((a, b) => a - b);
          if (selectedDates.length === 1 && sameDay(date, sorted[0])) {
            classes.push('selected');
          } else if (selectedDates.length >= 2) {
            if (sameDay(date, sorted[0])) classes.push('range-start');
            else if (sameDay(date, sorted[selectedDates.length - 1])) classes.push('range-end');
            else if (isBetween(date, sorted[0], sorted[selectedDates.length - 1])) classes.push('in-range');
          }
        } else {
          if (selectedDates.some(s => sameDay(s, date))) classes.push('selected');
        }
      }

      html += `<div class="${classes.join(' ')}" data-ts="${date.getTime()}">${d}</div>`;
    }

    grid.innerHTML = html;

    // Attach click events
    grid.querySelectorAll('.calendar-day:not(.disabled):not(.empty)').forEach(el => {
      el.addEventListener('click', () => handleDayClick(new Date(parseInt(el.dataset.ts))));
    });

    updateSelectedDisplay();
    updatePriceSummary();

    // Re-render Lucide icons for dynamic content
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* ── Day Click Handler ────────────────────────────────────── */
  function handleDayClick(date) {
    date.setHours(0, 0, 0, 0);

    if (mode === 'multi') {
      const idx = selectedDates.findIndex(d => sameDay(d, date));
      if (idx > -1) selectedDates.splice(idx, 1);
      else selectedDates.push(date);
    } else {
      // Range mode: first click sets start, second sets end
      if (selectedDates.length === 0 || selectedDates.length >= 2) {
        selectedDates = [date];
      } else {
        selectedDates.push(date);
        selectedDates.sort((a, b) => a - b);
      }
    }

    render();
  }

  /* ── Remove Date ─────────────────────────────────────────── */
  function removeDate(ts) {
    selectedDates = selectedDates.filter(d => d.getTime() !== parseInt(ts));
    render();
  }

  /* ── Display Chips ───────────────────────────────────────── */
  function updateSelectedDisplay() {
    const container = document.getElementById('selectedDatesDisplay');
    if (!container) return;

    if (selectedDates.length === 0) {
      container.innerHTML = `<span class="no-dates-msg">Selecciona tus fechas en el calendario</span>`;
      return;
    }

    let html = '';
    if (mode === 'range' && selectedDates.length >= 2) {
      const sorted = [...selectedDates].sort((a, b) => a - b);
      html = `<div class="date-chip">
        <i data-lucide="calendar" style="width:14px;height:14px"></i>
        ${formatDate(sorted[0])} → ${formatDate(sorted[sorted.length - 1])}
        <button onclick="Calendar.clearAll()" title="Limpiar">✕</button>
      </div>`;
    } else {
      html = selectedDates.map(d =>
        `<div class="date-chip">
          <i data-lucide="calendar" style="width:14px;height:14px"></i>
          ${formatDate(d)}
          <button onclick="Calendar.removeDate(${d.getTime()})" title="Quitar">✕</button>
        </div>`
      ).join('');
    }

    container.innerHTML = html;

    // Enable/disable WhatsApp button
    const waBtn = document.getElementById('waReserveBtn');
    if (waBtn) waBtn.disabled = selectedDates.length === 0;
  }

  /* ── Price Summary ────────────────────────────────────────── */
  function updatePriceSummary() {
    const box = document.getElementById('priceSummary');
    if (!box || selectedDates.length < 2) {
      if (box) box.classList.remove('visible');
      return;
    }
    const sorted = [...selectedDates].sort((a, b) => a - b);
    const nights = daysBetween(sorted[0], sorted[sorted.length - 1]);
    if (nights < 1) { box.classList.remove('visible'); return; }

    const guests = parseInt(document.getElementById('guestsCount')?.textContent || '2');
    box.classList.add('visible');
    box.innerHTML = `
      <div class="price-row"><span>Noches seleccionadas</span><span>${nights}</span></div>
      <div class="price-row"><span>Personas</span><span>${guests}</span></div>
      <div class="price-row"><span>📋 Consultar precio</span><span>Vía WhatsApp →</span></div>
    `;
  }

  /* ── Build WhatsApp Message ───────────────────────────────── */
  function buildWhatsAppMessage() {
    const service = document.querySelector('.service-option.selected')?.dataset?.service || 'Hospedaje';
    const guests = document.getElementById('guestsCount')?.textContent || '2';

    if (selectedDates.length === 0) return null;

    const sorted = [...selectedDates].sort((a, b) => a - b);
    let datesText = '';

    if (mode === 'range' && sorted.length >= 2) {
      const nights = daysBetween(sorted[0], sorted[sorted.length - 1]);
      datesText = `del *${formatDate(sorted[0])}* al *${formatDate(sorted[sorted.length - 1])}* (${nights} noche${nights > 1 ? 's' : ''})`;
    } else {
      datesText = sorted.map(d => `*${formatDate(d)}*`).join(', ');
    }

    return encodeURIComponent(
      `¡Hola Ecogranja San Francisco! \n\n` +
      `Quiero hacer una reserva:\n\n` +
      ` *Servicio:* ${service}\n` +
      ` *Fechas:* ${datesText}\n` +
      ` *Personas:* ${guests}\n\n` +
      `Por favor, confirmenme disponibilidad y tarifas. ¡Gracias!`
    );
  }

  /* ── Public API ───────────────────────────────────────────── */
  function init() {
    render();

    // Navigation buttons
    document.getElementById('calPrev')?.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      render();
    });

    document.getElementById('calNext')?.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      render();
    });

    // Mode toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        mode = btn.dataset.mode;
        selectedDates = [];
        render();
      });
    });

    // WhatsApp button
    document.getElementById('waReserveBtn')?.addEventListener('click', () => {
      const msg = buildWhatsAppMessage();
      if (!msg) return;
      // Número WhatsApp de la Ecogranja San Francisco
      const phone = '573125755037';
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
  }

  return {
    init,
    render,
    removeDate,
    clearAll: () => { selectedDates = []; render(); },
    getSelectedDates: () => selectedDates,
    buildWhatsAppMessage,
  };
})();
