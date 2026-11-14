function resizeFacebookPlugin() {
  const wrapper = document.querySelector('.facebook-wrapper');
  const fbPage = document.querySelector('.fb-page');

  if (!wrapper || !fbPage) return;

  const rawWidth = wrapper.clientWidth;
  const rawHeight = wrapper.clientHeight;

  const targetWidth = Math.min(Math.max(Math.round(rawWidth), 180), 500);
  const targetHeight = Math.max(Math.round(rawHeight), 130);

  fbPage.setAttribute('data-width', targetWidth.toString());
  fbPage.setAttribute('data-height', targetHeight.toString());

  if (typeof FB !== 'undefined' && FB.XFBML) {
    FB.XFBML.parse(wrapper);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  resizeFacebookPlugin();
});

window.fbAsyncInit = function () {
  FB.init({
    xfbml: true,
    version: 'v18.0',
  });
  resizeFacebookPlugin();
};

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeFacebookPlugin, 200);
});
