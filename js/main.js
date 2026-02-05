document.querySelectorAll('a.scroll-link').forEach((link) => {
  const targetId = link.dataset.target;
  if (targetId) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

window.addEventListener('DOMContentLoaded', function () {
  const progressiveImages = document.querySelectorAll('.progressive');
  progressiveImages.forEach((img) => {
    const fullImageSrc = img.getAttribute('data-full');
    if (!fullImageSrc) return;
    const tempImg = new Image();
    tempImg.src = fullImageSrc;
    tempImg.onload = function () {
      img.src = fullImageSrc;
      const picture = img.closest('picture');
      if (picture) {
        const sources = picture.querySelectorAll('source');
        sources.forEach((source) => source.remove());
      }
      img.classList.add('loaded');
    };
  });
});
