/* ============================================================
   ECOGRANJA SAN FRANCISCO - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // Scroll-to-top button
    document.querySelector('.scroll-top')?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ── Hamburger menu ──────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
    });
  });

  /* ── Scroll-to-top ───────────────────────────────────────── */
  document.querySelector('.scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Hero slider ─────────────────────────────────────────── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  let current = 0;
  let sliderInterval;

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startSlider() {
    sliderInterval = setInterval(() => goToSlide(current + 1), 5500);
  }

  if (slides.length > 0) {
    startSlider();
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(i);
        startSlider();
      });
    });
  }

  /* ── Lightbox (Gallery, Guadua, etc.) ────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');

  function openLightbox(src, isVideo) {
    if (!lightbox) return;
    if (isVideo) {
      if (lightboxImg) lightboxImg.style.display = 'none';
      if (lightboxVideo) {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        lightboxVideo.play();
      }
    } else {
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.style.display = 'none';
      }
      if (lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
      }
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (src) openLightbox(src, false);
    });
  });

  document.querySelectorAll('.guadua-images img, .guadua-images video').forEach(media => {
    media.addEventListener('click', () => {
      const isVideo = media.tagName.toLowerCase() === 'video';
      openLightbox(media.src, isVideo);
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lightboxVideo) { lightboxVideo.pause(); lightboxVideo.src = ''; }
    if (lightboxImg) lightboxImg.src = '';
  }

  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
  });

  /* ── Service option selection ────────────────────────────── */
  document.querySelectorAll('.service-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      opt.querySelector('input[type=radio]')?.click();
      Calendar.render();
    });
  });

  /* ── Guests counter ──────────────────────────────────────── */
  const guestsEl = document.getElementById('guestsCount');
  let guests = 2;

  document.getElementById('guestsDown')?.addEventListener('click', () => {
    if (guests > 1) { guests--; guestsEl.textContent = guests; Calendar.render(); }
  });
  document.getElementById('guestsUp')?.addEventListener('click', () => {
    if (guests < 50) { guests++; guestsEl.textContent = guests; Calendar.render(); }
  });

  /* ── Floating WhatsApp button ────────────────────────────── */
  document.getElementById('floatWa')?.addEventListener('click', () => {
    const phone = '573125755037';
    const msg = encodeURIComponent('¡Hola Ecogranja San Francisco! Quisiera obtener más información sobre sus servicios.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  });

  /* ── Scroll reveal animations ─────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Contact form (WhatsApp submit) ──────────────────────── */
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fName')?.value || '';
    const email = document.getElementById('fEmail')?.value || '';
    const service = document.getElementById('fService')?.value || '';
    const message = document.getElementById('fMessage')?.value || '';

    const phone = '573125755037';
    const text = encodeURIComponent(
      `¡Hola Ecogranja San Francisco!\n\n` +
      `Me llamo *${name}* y quiero más información.\n\n` +
      `*Servicio:* ${service}\n` +
      `*Email:* ${email}\n\n` +
      `*Mensaje:* ${message}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });

  /* ── Service Modal ───────────────────────────────────────── */
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalClose = document.getElementById('serviceModalClose');
  const smTitle = document.getElementById('smTitle');
  const smDesc = document.getElementById('smDesc');
  const smGallery = document.getElementById('smGallery');

  const servicesData = {
    'hospedaje-experiencias': {
      title: 'Hospedaje',
      folder: 'pasadia',
      images: ['1.jpeg', '2.jpeg', '3.jpeg'],
      fallback: 'images/hero1.webp',
      desc: `Disfruta de la tranquilidad de la naturaleza con opciones flexibles que se adaptan a tu plan. Ya sea una escapada de un día, un fin de semana o una estadía más prolongada, encontrarás el espacio perfecto para desconectarte y recargar energías.<br><br>
        Ofrecemos acceso a nuestras instalaciones, senderos, contacto con animales y zonas de descanso, con la posibilidad de hospedarte en acogedoras cabañas y vivir experiencias diseñadas para el bienestar.<br><br>

        <strong>Modalidades:</strong><br>
        • <strong>Pasa Día</strong><br>
        • <strong>Entre Semana</strong><br>
• <strong>Fin de Semana</strong>`
    },
    'empresarial': {
      title: 'Encuentros Empresariales',
      folder: 'empresarial',
      images: ['1.jpeg', '2.jpeg', '3.jpeg'],
      fallback: 'images/hero2.webp',
      desc: 'Sal de la rutina y redescubre el valor de tu equipo en un entorno natural único. En la Eco Granja San Francisco, cada experiencia está diseñada para fortalecer el clima organizacional a través de vivencias significativas que conectan a las personas desde lo humano.<br><br>Mediante actividades enfocadas en el trabajo en equipo, el fortalecimiento de las relaciones interpersonales, la claridad de roles y el desarrollo de liderazgos con propósito, promovemos una sinergia colectiva que impulsa equipos más sólidos, conscientes y alineados.<br><br>El resultado: una organización más productiva, colaborativa y fraterna.'
    },
    'experiencia-ruah': {
      title: 'Experiencia RUAH',
      folder: 'experienciaruah',
      images: ['1.jpeg', '2.jpeg', '3.jpeg'],
      fallback: 'images/hero1.webp',
      desc: 'Celebra con quienes más quieres en un entorno amplio, seguro y rodeado de naturaleza. Cumpleaños, reuniones de fin de año, reencuentros y momentos especiales encuentran aquí el escenario perfecto para compartir, conectar y crear recuerdos inolvidables.<br><br>Disfruta de la tranquilidad del campo mientras fortaleces los lazos familiares en una experiencia pensada para el bienestar y la unión.'
    },
    'campamento-ruah': {
      title: 'Campamento RUAH',
      folder: 'campamento',
      images: ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg'],
      fallback: 'images/hero2.webp',
      desc: 'Si buscas una experiencia audaz, retadora y transformadora, el campamento RUAH – Aliento de Vida es para ti. Vivirás un encuentro único e inolvidable, diseñado para llevarte más allá de tus límites a través de desafíos de supervivencia, trabajo en equipo y actividades que fortalecen la coordinación motora y corporal.<br><br>Durante esta experiencia, desarrollarás habilidades clave como la toma de decisiones, la gestión del tiempo y el manejo de emociones, mientras fortaleces el sentido de comunidad y la conexión con los demás.<br><br>RUAH no es solo un campamento, es una vivencia que marca, que transforma y a la que siempre querrás regresar.'
    },
    'productos': {
      title: 'Venta de Productos Orgánicos',
      folder: 'productos',
      images: ['1.jpeg', '2.jpeg', '3.jpeg'],
      fallback: 'images/hero2.webp',
      desc: 'En nuestra ecogranja ofrecemos productos frescos, naturales y cultivados con prácticas sostenibles, respetando el medio ambiente y promoviendo la vida sana.<br><br>Contamos con productos como guadua, esterilla, huevos de gallina campesina, carne de conejo y otros alimentos provenientes directamente del campo, garantizando calidad, frescura y origen natural.<br><br>También realizamos venta de guadua y esterilla para diferentes usos, apoyando la construcción sostenible y el aprovechamiento responsable de los recursos naturales.<br><br>Al adquirir nuestros productos, apoyas la producción local, el trabajo familiar y un estilo de vida más consciente y sostenible.',
      cta: {
        text: 'Pedir por WhatsApp',
        action: 'whatsapp'
      }
    },
    'experiencias': {
      title: 'Experiencias y Encuentros',
      folder: 'experiencias',
      images: ['1.jpeg', '2.jpeg', '3.jpeg'],
      fallback: 'images/hero2.webp',
      desc: 'Vive momentos únicos diseñados para el bienestar, la conexión humana y el crecimiento personal en un entorno natural.<br><br>Disfruta de experiencias guiadas que combinan relajación, integración y aprendizaje, ideales para grupos, familias o equipos de trabajo que buscan desconectarse de la rutina y reconectar con lo esencial.<br><br>A través de dinámicas vivenciales, actividades al aire libre y espacios de reflexión, fortalecerás habilidades como la comunicación, el trabajo en equipo y el equilibrio emocional.<br><br>Cada encuentro está pensado para dejar una huella positiva, generar transformación personal y crear recuerdos que perduran.'
    }
  };

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-service-id');
      const data = servicesData[id];
      if (data && serviceModal) {
        smTitle.textContent = data.title;
        smDesc.innerHTML = data.desc;

        // Generate images HTML
        smGallery.innerHTML = '';
        data.images.forEach(imgName => {
          const img = document.createElement('img');
          const fullPath = `images/${data.folder}/${imgName}`;
          img.src = fullPath;
          img.alt = `${data.title} - ${imgName}`;
          img.onerror = function () {
            if (!this.src.includes(data.fallback)) {
              this.src = data.fallback;
            }
          };
          img.style.cursor = 'pointer';
          img.addEventListener('click', () => {
            if (typeof openLightbox === 'function') {
              openLightbox(img.src, false);
            }
          });
          smGallery.appendChild(img);
        });

        // Botón CTA especial (ej: productos)
        const existingCta = serviceModal.querySelector('.sm-cta-btn');
        existingCta?.remove();

        if (data.cta) {
          const ctaBtn = document.createElement('a');
          ctaBtn.className = 'sm-cta-btn';
          ctaBtn.style.cssText = 'display:inline-flex; align-items:center; gap:10px; margin-top:20px; padding:14px 32px; background:linear-gradient(135deg,#25d366,#128c7e); color:white; border-radius:50px; font-weight:700; text-decoration:none; font-family:Lato,sans-serif;';

          const phone = '573125755037';
          const msg = encodeURIComponent('¡Hola! Quisiera pedir productos orgánicos de la Ecogranja San Francisco 🌿');
          ctaBtn.href = `https://wa.me/${phone}?text=${msg}`;
          ctaBtn.target = '_blank';
          ctaBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.547a.75.75 0 00.92.92l5.701-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.524-5.183-1.437l-.371-.22-3.384.872.893-3.285-.242-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> Pedir por WhatsApp`;

          smGallery.before(ctaBtn);
        }

        serviceModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeServiceModal = () => {
    serviceModal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  serviceModalClose?.addEventListener('click', closeServiceModal);
  serviceModal?.addEventListener('click', (e) => {
    if (e.target === serviceModal) closeServiceModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && serviceModal?.classList.contains('open')) closeServiceModal();
  });

  /* ── Init Calendar ───────────────────────────────────────── */
  Calendar.init();

  /* ── Init Lucide Icons ───────────────────────────────────── */
  if (window.lucide) {
    lucide.createIcons();
  }
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  let currentIndex = 0;

  const images = document.querySelectorAll('.carousel-track img');
  const imageWidth = images[0].clientWidth + 15;

  // ancho total visible del carrusel
  const visibleWidth = document.querySelector('.carousel').clientWidth;

  // ancho total del contenido
  const totalWidth = images.length * imageWidth;

  // máximo desplazamiento permitido
  const maxIndex = Math.floor((totalWidth - visibleWidth) / imageWidth);

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }
  });

});