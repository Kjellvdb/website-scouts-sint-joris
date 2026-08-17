document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

function openLightbox(src) {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  if (!lightbox || !lightboxImg) return;

  lightbox.style.display = 'flex';
  lightboxImg.src = src;
  caption.innerHTML = 'Tip: Bekijk dit schema goed voor je begint te naaien!';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('imageLightbox').style.display = 'none';
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('imageLightbox');
  if (lightbox) {
    lightbox.addEventListener(
      'touchmove',
      (error) => {
        error.preventDefault();
      },
      { passive: false },
    );
  }
});
