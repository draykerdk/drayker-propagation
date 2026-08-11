#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const layout = fs.readFileSync(path.join(root, '_layouts/default.html'), 'utf8');
const failures = [];
let checks = 0;
const check = (ok, message) => { checks++; if (!ok) failures.push(message); };

check(layout.includes("font-family:'Archivo'"), 'Archivo is not the display face');
check(!layout.includes('Space Grotesk'), 'retired Space Grotesk reference remains');
check(layout.includes('{{ page.url | absolute_url }}'), 'per-page canonical is missing');
check(layout.includes('https://dknowledge.drayker.org'), 'Dknowledge footer target is wrong');
check(!layout.includes('dknowledger.drayker.org'), 'the retired Dknowledger hostname remains');
check(!layout.includes('drayker.org/#org/'), 'the footer must use the clean routes, not hash routes');

for (const asset of ['favicon.ico', 'drayker-favicon.svg', 'favicon-32.png', 'favicon-16.png', 'apple-touch-icon.png']) {
  check(layout.includes('https://drayker.org/') && layout.includes(asset + '?v=20260811'), 'versioned favicon chain is missing ' + asset);
}
check(layout.includes('sizes="any"') && layout.includes('sizes="180x180"'), 'favicon size metadata is incomplete');

// The live mark: one engine for every Drayker symbol, configured per repository and
// degrading to nothing at all rather than to a broken box.
check(layout.includes('https://drayker.org/drayker-mark.js'), 'the shared mark engine is not loaded');
check(layout.includes('data-drayker'), 'the hero mark container is missing');
check(layout.includes("site.dk_accent | default: '#FF5500'"), 'the scope colour must fall back to the main accent');
check(layout.includes('prefers-reduced-motion: reduce') && layout.includes("'data-animate', 'false'"), 'reduced motion must stop the mark from following the cursor');
check(layout.includes('.dk-hero-mark{display:none'), 'the mark must be hidden on narrow screens');

if (failures.length) {
  failures.forEach((failure) => console.error('FAIL: ' + failure));
  process.exit(1);
}
console.log(checks + ' shared theme checks passed');
