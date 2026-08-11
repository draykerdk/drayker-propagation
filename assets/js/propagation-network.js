(function () {
  'use strict';

  var Drayker = window.Drayker;
  var presets = window.DraykerPresets;
  var svg = document.querySelector('[data-propagation-network]');
  var field = document.querySelector('[data-signal-field]');
  if (!Drayker || !presets || !Drayker.bodies.signalMesh || !svg || !field) return;

  var instance = Drayker.create(svg, Object.assign({}, presets.networkMesh, { animate: false }));
  svg.setAttribute('aria-label', 'Interactive Drayker propagation network with signals travelling between connected nodes.');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var inView = false;

  function syncAnimation() {
    if (!reducedMotion.matches && inView && document.visibilityState === 'visible') instance.start();
    else instance.stop();
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      syncAnimation();
    }, { rootMargin: '160px 0px' });
    observer.observe(field);
  } else {
    inView = true;
  }

  document.addEventListener('visibilitychange', syncAnimation);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', syncAnimation);
  else reducedMotion.addListener(syncAnimation);
  syncAnimation();
})();
