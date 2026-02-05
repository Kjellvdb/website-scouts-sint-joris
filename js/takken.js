document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const caption = document.getElementById('carousel-caption');

  let currentIndex = 0;
  const slideCount = slides.length;
  const intervalTime = 10000;
  let autoSlideTimer = null;

  function updateCaption() {
    const img = slides[currentIndex].querySelector('img');
    caption.textContent = img?.alt?.trim() ? img.alt : 'Moment van Scouts Sint-Joris Aalst';
  }

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, index) => {
      slide.classList.toggle('current', index === currentIndex);
    });

    updateCaption();
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

  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
  });

  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  updateSlidePosition();
  startAutoSlide();
});
