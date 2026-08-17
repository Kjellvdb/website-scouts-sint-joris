document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  const lightbox = document.getElementById('imageLightbox');
  if (!carousel || !lightbox) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const caption = document.getElementById('carousel-caption');

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxPrevBtn = lightbox.querySelector('.lightbox-btn.prev');
  const lightboxNextBtn = lightbox.querySelector('.lightbox-btn.next');
  const lightboxCloseBtn = lightbox.querySelector('.lightbox-close');

  let currentIndex = 0;
  let isLightboxOpen = false;
  const slideCount = slides.length;
  const intervalTime = 10000;
  let autoSlideTimer = null;

  function getSlideData(index) {
    const img = slides[index].querySelector('img');
    const src = img?.dataset.full || img?.currentSrc || img?.src || '';
    const alt = img?.alt?.trim() || 'Moment van Scouts Sint-Joris';
    return { src, alt };
  }

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('current', idx === currentIndex);
    });

    const { src, alt } = getSlideData(currentIndex);
    if (caption) caption.textContent = alt;

    if (isLightboxOpen && lightboxImg) {
      lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = alt;
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlidePosition();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlidePosition();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, intervalTime);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  window.openLightbox = function (index) {
    currentIndex = Number(index);
    isLightboxOpen = true;
    updateSlidePosition();

    lightbox.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    isLightboxOpen = false;
    lightbox.style.display = 'none';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  slides.forEach((slide, index) => {
    const img = slide.querySelector('img');
    if (img) {
      img.addEventListener('click', () => window.openLightbox(index));
    }
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
  });
  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
  });

  lightboxNextBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    nextSlide();
    startAutoSlide();
  });

  lightboxPrevBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    prevSlide();
    startAutoSlide();
  });

  lightboxCloseBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    window.closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!isLightboxOpen) return;
    if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoSlide();
    }
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoSlide();
    }
    if (e.key === 'Escape') {
      window.closeLightbox();
    }
  });

  lightbox.addEventListener(
    'touchmove',
    (e) => {
      e.preventDefault();
    },
    { passive: false },
  );

  updateSlidePosition();
  startAutoSlide();
});
