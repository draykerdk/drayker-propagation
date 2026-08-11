(function () {
  'use strict';

  var id = document.body.dataset.animationId;
  var root = document.getElementById('animation-entry');

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]; });
  }

  function list(items) { return items.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join(''); }

  fetch('../../catalog-data.json').then(function (response) {
    if (!response.ok) throw new Error('Catalog data failed to load');
    return response.json();
  }).then(function (data) {
    var ordered = data.groups.flatMap(function (group) { return data.animations.filter(function (item) { return item.group === group.id; }); });
    var index = ordered.findIndex(function (item) { return item.id === id; });
    if (index < 0) throw new Error('Animation ' + id + ' is not cataloged');
    var item = ordered[index];
    var group = data.groups.find(function (entry) { return entry.id === item.group; });
    var previous = ordered[(index - 1 + ordered.length) % ordered.length];
    var next = ordered[(index + 1) % ordered.length];
    var rendererType = /^13/.test(item.id) ? 'Original declarative engine card' : (/^[12]/.test(item.id) ? 'Original inline Earth renderer' : 'Original source-sheet mark3 renderer');
    var config = '&lt;iframe src="Drayker Logo Variations.html#' + esc(item.id) + '"\n        data-source-target="' + esc(item.id) + '"&gt;&lt;/iframe&gt;';

    document.title = item.name + ' · Drayker Animation Library';
    document.querySelector('meta[name="description"]').content = item.description;

    root.innerHTML = '<header class="topbar">' +
      '<a class="wordmark" href="../../../" aria-label="Back to Drayker Design Library"><img src="../../../../assets/brand/logo/assinatura/drayker-horizontal-branco.svg" alt="Drayker" width="146" height="51"><span>Source ' + esc(item.id.toUpperCase()) + '</span></a>' +
      '<nav aria-label="Animation page navigation"><a href="../../">All 65</a><a href="#meaning">Meaning</a><a href="#source">Source</a><a href="../../../logos/">Logos</a></nav>' +
      '<a class="back-link" href="../../">Catalog ↗</a></header>' +
      '<main id="animation">' +
      '<section class="animation-hero"><div class="animation-hero-copy">' +
      '<div class="animation-breadcrumb"><a href="../../../">Design</a><span>/</span><a href="../../">Animations</a><span>/</span><span>' + esc(item.id) + '</span></div>' +
      '<p class="eyebrow">' + esc(group.order) + ' / ' + esc(group.name.toUpperCase()) + '</p><h1>' + esc(item.name) + '</h1><p class="lede">' + esc(item.description) + '</p>' +
      '<div class="animation-meta"><div><span>CATALOG POSITION</span><strong>' + String(index + 1).padStart(2, '0') + ' / ' + ordered.length + '</strong></div><div><span>SOURCE CARD</span><strong>' + esc(item.id) + ' · ' + esc(item.sourceName) + '</strong></div><div><span>RENDERER</span><strong>' + esc(item.renderer) + '</strong></div></div></div>' +
      '<figure class="animation-stage"><div class="animation-stage-meta"><span>LIVE / UNMODIFIED SOURCE</span><span>MOVE YOUR POINTER</span></div>' +
      '<iframe src="../../../source/Drayker%20Logo%20Variations.html#' + esc(item.id) + '" data-source-target="' + esc(item.id) + '" title="Original interactive ' + esc(item.name) + ' animation"></iframe><div class="animation-stage-loading">Initializing preserved source…</div><figcaption><span>SOURCE ' + esc(item.id.toUpperCase()) + '</span><span>' + esc(group.shortName.toUpperCase()) + '</span></figcaption></figure></section>' +
      '<section class="animation-explanation" id="meaning"><div class="explanation-grid"><div class="explanation-label">01 / MEANING AND POSITION</div><div class="explanation-copy"><h2>Why this study exists.</h2><p>' + esc(item.description) + '</p><p class="context-note">' + esc(group.description) + '</p></div></div>' +
      '<div class="use-grid"><article><span>USE IT WHEN</span><h3>The visual carries real meaning.</h3><ul>' + list(group.use) + '</ul></article><article><span>DO NOT USE IT WHEN</span><h3>A clearer family should lead.</h3><ul>' + list(group.avoid) + '</ul></article></div></section>' +
      '<section class="source-proof" id="source"><div><span>02 / SOURCE AND INTEGRITY</span><h2>Reused, never redrawn.</h2></div><div><p>The page executes card <code>' + esc(item.id) + '</code> inside the preserved <em>Drayker Logo Variations</em> sheet. The wrapper changes documentation and framing only; the original geometry, timing and pointer response stay authoritative.</p>' +
      '<pre class="source-config"><code>' + config + '</code></pre><div class="source-facts"><div><code>source=' + esc(item.id) + '</code><span>' + esc(item.sourceName) + '</span></div><div><code>renderer=' + esc(item.renderer) + '</code><span>' + esc(rendererType) + '</span></div><div><code>family=' + esc(item.group) + '</code><span>Catalog priority ' + esc(group.order) + '</span></div></div>' +
      '<div class="proof-links"><a href="../../../source/Drayker%20Logo%20Variations.html#' + esc(item.id) + '">Open original source card ↗</a><a href="../../../docs/DRAYKER-MARK.md">Read the mark specification →</a><a href="../../catalog-data.json">Inspect complete catalog data →</a></div></div></section>' +
      '<nav class="animation-navigation" aria-label="Adjacent animations"><a href="../' + esc(previous.id) + '/"><span>← PREVIOUS / ' + esc(previous.id.toUpperCase()) + '</span><strong>' + esc(previous.name) + '</strong></a><a href="../' + esc(next.id) + '/"><span>NEXT / ' + esc(next.id.toUpperCase()) + ' →</span><strong>' + esc(next.name) + '</strong></a></nav></main>' +
      '<footer><div><img src="../../../../assets/brand/logo/assinatura/drayker-horizontal-branco.svg" alt="Drayker" width="150" height="52"><span>SOURCE ' + esc(item.id.toUpperCase()) + '</span></div><div><a href="../../">All animations</a><a href="../../../logos/">Logos</a><a href="../../../">Design library</a><a href="../../../../">Propagation</a></div></footer>';

    var frame = root.querySelector('iframe[data-source-target]');
    if (window.DraykerSourcePlayer) window.DraykerSourcePlayer.mount(frame);
  }).catch(function (error) {
    root.innerHTML = '<main class="catalog-empty"><h1>Animation unavailable</h1><p>' + esc(error.message) + '</p><a href="../../">Return to the catalog</a></main>';
  });
})();
