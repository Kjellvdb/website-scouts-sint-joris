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

/* Cookie Consent Modal Logic */
const COOKIE_CONFIG = {
  CLARITY_ID: 'vk0bz5enz1',
  GA_TRACKING_ID: 'G-36VM52FBKX',
  STORAGE_KEY: 'scouts_consent_status',
};

function injectTrackingScripts() {
  if (window.analyticsActive) return;

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${COOKIE_CONFIG.GA_TRACKING_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', COOKIE_CONFIG.GA_TRACKING_ID);

  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', COOKIE_CONFIG.CLARITY_ID);

  window.analyticsActive = true;
  console.log('🚀 Tracking geactiveerd: GA4 & Clarity geladen.');
}

const CookieManager = {
  togglePreferences: function () {
    const prefs = document.getElementById('vds-prefs');
    if (prefs) {
      prefs.style.display = prefs.style.display === 'block' ? 'none' : 'block';
    }
  },

  savePreferences: function () {
    const analyticsChecked = document.getElementById('pref-analytics').checked;
    if (analyticsChecked) {
      this.acceptAll();
    } else {
      this.acceptNecessary();
    }
  },

  acceptAll: function () {
    localStorage.setItem(COOKIE_CONFIG.STORAGE_KEY, 'all');
    injectTrackingScripts();
    this.hideBanner();
  },

  acceptNecessary: function () {
    localStorage.setItem(COOKIE_CONFIG.STORAGE_KEY, 'essential');
    this.hideBanner();
  },

  hideBanner: function () {
    const banner = document.getElementById('cookie-modal');
    if (banner) banner.style.display = 'none';
  },

  checkStatus: function () {
    const status = localStorage.getItem(COOKIE_CONFIG.STORAGE_KEY);
    if (status === 'all') {
      injectTrackingScripts();
    } else if (!status) {
      document.getElementById('cookie-modal').style.display = 'block';
    }
  },
};

window.togglePreferences = () => CookieManager.togglePreferences();
window.savePreferences = () => CookieManager.savePreferences();
window.acceptAll = () => CookieManager.acceptAll();
window.acceptNecessary = () => CookieManager.acceptNecessary();

document.addEventListener('DOMContentLoaded', () => CookieManager.checkStatus());
