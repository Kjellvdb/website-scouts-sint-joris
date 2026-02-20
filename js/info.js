document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

/* Lightbox functionality for the uniform image */
function openLightbox(src) {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
  caption.innerHTML = 'Tip: Bekijk dit schema goed voor je begint te naaien!';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('imageLightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}
