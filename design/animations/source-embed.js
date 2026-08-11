(function () {
  'use strict';

  var states = new WeakMap();

  function animationNodes(doc) {
    var nodes = new Map();
    doc.querySelectorAll('[id]').forEach(function (card) {
      if (!/^(?:[1-9]|1[0-3])[a-z]$/.test(card.id)) return;
      var svg = card.querySelector('svg.mark, svg.mark3, svg[data-drayker]');
      if (svg) nodes.set(card.id, svg);
    });
    return nodes;
  }

  function installFrameStyles(doc) {
    var style = doc.createElement('style');
    style.textContent = [
      '*{box-sizing:border-box!important}',
      'html,body{width:100%!important;height:100%!important;overflow:hidden!important;background:#0b0b0e!important}',
      'body{margin:0!important}',
      '.dk-player-stage{width:100%!important;height:100%!important;display:grid!important;place-items:center!important;padding:clamp(18px,5%,48px)!important;background:radial-gradient(circle at 50% 48%,#111119 0,#0b0b0e 62%)!important}',
      '.dk-player-stage>svg{width:min(92%,680px)!important;height:auto!important;max-width:none!important;max-height:92%!important;display:block!important;cursor:crosshair!important}'
    ].join('');
    doc.head.appendChild(style);
  }

  function show(frame, targetId, label) {
    var state = states.get(frame);
    if (!state || !state.nodes.has(targetId)) return false;
    var svg = state.nodes.get(targetId);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label || frame.title || ('Original Drayker animation ' + targetId));
    state.stage.replaceChildren(svg);
    state.current = targetId;
    frame.dataset.sourceTarget = targetId;
    frame.classList.add('source-frame-ready');
    frame.classList.remove('source-frame-error');
    frame.dispatchEvent(new CustomEvent('drayker-player-change', { detail: { id: targetId } }));
    return true;
  }

  function isolate(frame) {
    var doc;
    try {
      doc = frame.contentDocument;
    } catch (error) {
      frame.classList.add('source-frame-error');
      return;
    }
    if (!doc || !doc.body) return;

    var nodes = animationNodes(doc);
    var stage = doc.createElement('main');
    stage.className = 'dk-player-stage';
    stage.setAttribute('aria-live', 'off');
    installFrameStyles(doc);
    doc.body.replaceChildren(stage);
    states.set(frame, { doc: doc, nodes: nodes, stage: stage, current: null });

    if (!show(frame, frame.dataset.sourceTarget || '11b', frame.title)) {
      frame.classList.add('source-frame-error');
    }
    frame.dispatchEvent(new CustomEvent('drayker-player-ready', { detail: { count: nodes.size } }));
  }

  function mount(frame) {
    if (!frame || frame.dataset.sourceMounted === 'true') return;
    frame.dataset.sourceMounted = 'true';
    frame.addEventListener('load', function () { isolate(frame); });
    try {
      if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
        setTimeout(function () { isolate(frame); }, 0);
      }
    } catch (error) {
      frame.classList.add('source-frame-error');
    }
  }

  function scan(root) {
    (root || document).querySelectorAll('iframe[data-source-target]').forEach(mount);
  }

  window.DraykerSourcePlayer = { mount: mount, show: show };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { scan(); });
  else scan();

  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.matches && node.matches('iframe[data-source-target]')) mount(node);
        scan(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
