#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const animationsRoot = path.join(root, 'design', 'animations');
const data = JSON.parse(fs.readFileSync(path.join(animationsRoot, 'catalog-data.json'), 'utf8'));

const page = (item) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#08080a">
  <meta name="description" content="${item.description.replace(/"/g, '&quot;')}">
  <title>${item.name} · Drayker Animation Library</title>
  <link rel="canonical" href="https://propagation.drayker.org/design/animations/source/${item.id}/">
  <link rel="icon" href="../../../../assets/brand/logo/drayker-favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@90..110,400..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../../design.css">
  <link rel="stylesheet" href="../../detail.css?v=4.0.0">
  <script defer src="../../source-embed.js?v=4.0.0"></script>
  <script defer src="../../detail-app.js?v=4.0.0"></script>
  <script defer src="../../../design.js"></script>
</head>
<body data-animation-id="${item.id}">
  <a class="skip" href="#animation-entry">Skip to animation</a>
  <div id="animation-entry"><main class="catalog-empty"><p>Loading source ${item.id}…</p></main></div>
</body>
</html>
`;

const aliasPage = (alias, id) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=../source/${id}/">
  <link rel="canonical" href="https://propagation.drayker.org/design/animations/source/${id}/">
  <title>Drayker Animation Library</title>
</head>
<body><p>Moved to <a href="../source/${id}/">source ${id}</a>.</p><script>location.replace('../source/${id}/');</script></body>
</html>
`;

data.animations.forEach((item) => {
  const directory = path.join(animationsRoot, 'source', item.id);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), page(item));
});

Object.entries(data.aliases).forEach(([alias, id]) => {
  const directory = path.join(animationsRoot, alias);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), aliasPage(alias, id));
});

fs.mkdirSync(path.join(animationsRoot, 'source'), { recursive: true });
fs.writeFileSync(path.join(animationsRoot, 'source', 'index.html'), '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=../"><script>location.replace("../");</script>');
console.log(`Generated ${data.animations.length} animation pages and ${Object.keys(data.aliases).length} aliases.`);
