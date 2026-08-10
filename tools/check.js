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
check(layout.includes('https://dknowledger.drayker.org'), 'Dknowledger footer target is wrong');
check(!layout.includes('https://dknowledge.drayker.org'), 'retired Dknowledge hostname remains');

for (const asset of ['favicon.ico', 'drayker-favicon.svg', 'favicon-32.png', 'favicon-16.png', 'apple-touch-icon.png']) {
  check(layout.includes('https://drayker.org/') && layout.includes(asset), 'favicon chain is missing ' + asset);
}

if (failures.length) {
  failures.forEach((failure) => console.error('FAIL: ' + failure));
  process.exit(1);
}
console.log(checks + ' shared theme checks passed');
