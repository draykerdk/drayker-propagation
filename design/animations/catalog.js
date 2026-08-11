(function () {
  'use strict';

  var data;
  var ordered = [];
  var currentIndex = 0;
  var activeGroup = 'all';
  var player = document.getElementById('source-player');
  var groupRoot = document.getElementById('catalog-groups');
  var filterRoot = document.getElementById('group-filter');
  var search = document.getElementById('catalog-search');
  var resultCount = document.getElementById('result-count');

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function entryPath(item) { return 'source/' + item.id + '/'; }

  function groupFor(item) { return data.groups.find(function (group) { return group.id === item.group; }); }

  function updatePlayer(id, moveFocus) {
    var index = ordered.findIndex(function (item) { return item.id === id; });
    if (index < 0) return;
    currentIndex = index;
    var item = ordered[index];
    var group = groupFor(item);
    player.title = 'Original interactive ' + item.name + ' animation';
    if (window.DraykerSourcePlayer) window.DraykerSourcePlayer.show(player, item.id, player.title);
    document.getElementById('player-source').textContent = 'SOURCE ' + item.id.toUpperCase();
    document.getElementById('player-family').textContent = group.order + ' / ' + group.name.toUpperCase();
    document.getElementById('player-name').textContent = item.name;
    document.getElementById('player-description').textContent = item.description;
    document.getElementById('player-detail').href = entryPath(item);
    var tags = document.getElementById('player-tags');
    tags.replaceChildren.apply(tags, item.tags.map(function (tag) { return el('span', '', tag); }));
    document.querySelectorAll('.catalog-entry').forEach(function (card) { card.classList.toggle('is-previewing', card.dataset.id === item.id); });
    if (moveFocus) document.querySelector('.catalog-entry[data-id="' + item.id + '"]')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    history.replaceState(null, '', '#preview-' + item.id);
  }

  function createEntry(item, number) {
    var article = el('article', 'catalog-entry');
    article.dataset.id = item.id;
    article.dataset.group = item.group;
    article.dataset.search = [item.id, item.name, item.sourceName, item.description].concat(item.tags).join(' ').toLowerCase();
    var head = el('div', 'entry-head');
    head.append(el('span', '', String(number).padStart(2, '0')), el('span', '', 'SOURCE ' + item.id.toUpperCase()));
    article.append(head, el('h3', '', item.name), el('p', '', item.description));
    var tags = el('div', 'entry-tags');
    item.tags.slice(0, 4).forEach(function (tag) { tags.append(el('span', '', tag)); });
    article.append(tags);
    var actions = el('div', 'entry-actions');
    var preview = el('button', 'entry-preview', 'Preview here');
    preview.type = 'button';
    preview.addEventListener('click', function () { updatePlayer(item.id, window.innerWidth < 861); });
    var detail = el('a', '', 'Full page →');
    detail.href = entryPath(item);
    actions.append(preview, detail);
    article.append(actions);
    if (window.matchMedia('(hover:hover)').matches) article.addEventListener('pointerenter', function () { updatePlayer(item.id, false); });
    article.addEventListener('focusin', function (event) { if (!event.target.matches('a')) updatePlayer(item.id, false); });
    return article;
  }

  function render() {
    groupRoot.replaceChildren();
    filterRoot.querySelectorAll('[data-group]:not([data-group="all"])').forEach(function (button) { button.remove(); });
    var number = 0;
    data.groups.forEach(function (group) {
      var items = data.animations.filter(function (item) { return item.group === group.id; });
      var button = el('button', '', group.shortName + ' · ' + items.length);
      button.type = 'button';
      button.dataset.group = group.id;
      filterRoot.append(button);

      var section = el('section', 'catalog-group');
      section.dataset.group = group.id;
      var heading = el('div', 'catalog-group-head');
      var title = el('div');
      title.append(el('span', 'catalog-group-kicker', group.order + ' / ' + items.length + ' ANIMATIONS'), el('h2', '', group.name));
      heading.append(title, el('p', '', group.description));
      var grid = el('div', 'entry-grid');
      items.forEach(function (item) { number += 1; grid.append(createEntry(item, number)); });
      section.append(heading, grid);
      groupRoot.append(section);
    });
    applyFilters();
  }

  function applyFilters() {
    var query = search.value.trim().toLowerCase();
    var visible = 0;
    document.querySelectorAll('.catalog-group').forEach(function (section) {
      var groupVisible = false;
      section.querySelectorAll('.catalog-entry').forEach(function (entry) {
        var matchGroup = activeGroup === 'all' || entry.dataset.group === activeGroup;
        var matchQuery = !query || entry.dataset.search.includes(query);
        entry.hidden = !(matchGroup && matchQuery);
        if (!entry.hidden) { visible += 1; groupVisible = true; }
      });
      section.hidden = !groupVisible;
    });
    resultCount.textContent = visible + ' of ' + ordered.length + ' original animations shown';
  }

  filterRoot.addEventListener('click', function (event) {
    var button = event.target.closest('[data-group]');
    if (!button) return;
    activeGroup = button.dataset.group;
    filterRoot.querySelectorAll('[data-group]').forEach(function (item) { item.classList.toggle('is-active', item === button); });
    applyFilters();
  });
  search.addEventListener('input', applyFilters);
  document.getElementById('player-prev').addEventListener('click', function () { updatePlayer(ordered[(currentIndex - 1 + ordered.length) % ordered.length].id, false); });
  document.getElementById('player-next').addEventListener('click', function () { updatePlayer(ordered[(currentIndex + 1) % ordered.length].id, false); });
  player.addEventListener('drayker-player-ready', function () { updatePlayer(ordered[currentIndex].id, false); });

  fetch('catalog-data.json').then(function (response) {
    if (!response.ok) throw new Error('Catalog data failed to load');
    return response.json();
  }).then(function (payload) {
    data = payload;
    ordered = data.groups.flatMap(function (group) { return data.animations.filter(function (item) { return item.group === group.id; }); });
    var hashId = location.hash.match(/^#preview-([0-9]+[a-z])$/);
    if (hashId) currentIndex = Math.max(0, ordered.findIndex(function (item) { return item.id === hashId[1]; }));
    render();
    updatePlayer(ordered[currentIndex].id, false);
  }).catch(function (error) {
    resultCount.textContent = 'The catalog index could not be loaded.';
    groupRoot.replaceChildren(el('p', 'catalog-empty', error.message));
  });
})();
