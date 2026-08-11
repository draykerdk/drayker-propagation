(function () {
  'use strict';

  function isolateSourceAnimation(frame) {
    var targetId = frame.getAttribute('data-source-target');
    var doc;

    try {
      doc = frame.contentDocument;
    } catch (error) {
      frame.classList.add('source-frame-error');
      return;
    }

    var target = doc && doc.getElementById(targetId);
    if (!target) {
      frame.classList.add('source-frame-error');
      return;
    }

    var svg = target.querySelector('svg');
    var targetSelector = '[id="' + targetId.replace(/"/g, '\\"') + '"]';
    var style = doc.createElement('style');
    style.textContent = [
      '*{box-sizing:border-box!important}',
      'html,body{width:100%!important;height:100%!important;overflow:hidden!important;background:#0c0c0f!important}',
      'body{margin:0!important;display:grid!important;place-items:center!important}',
      targetSelector + '{width:100%!important;height:100%!important;min-height:0!important;margin:0!important;padding:5%!important;border:0!important;background:transparent!important;display:grid!important;place-items:center!important}',
      targetSelector + '>:not(svg){display:none!important}',
      targetSelector + '>svg{width:min(94%,680px)!important;height:auto!important;max-height:94%!important;display:block!important;cursor:crosshair!important}'
    ].join('');

    doc.head.appendChild(style);
    doc.body.replaceChildren(target);
    if (svg) svg.setAttribute('aria-label', frame.getAttribute('title') || 'Original Drayker animation');
    frame.classList.add('source-frame-ready');
  }

  document.querySelectorAll('iframe[data-source-target]').forEach(function (frame) {
    frame.addEventListener('load', function () { isolateSourceAnimation(frame); }, { once: true });
  });
})();
