(() => {
  'use strict';

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const syncMotion = () => {
    document.querySelectorAll('[data-drayker]').forEach((element) => {
      const mark = element.__dk;
      if (!mark) return;
      if (motion.matches) mark.stop();
      else if (mark.opts.animate && !mark.ctx.ring.flat) mark.start();
    });
  };

  window.addEventListener('DOMContentLoaded', syncMotion);
  motion.addEventListener('change', syncMotion);
})();
