#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const failures = [];
let checks = 0;
const check = (ok, message) => { checks++; if (!ok) failures.push(message); };
const exists = (file) => fs.existsSync(path.join(root, file));
const page = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

check(exists('index.html'), 'index.html is missing');
check(exists('assets/css/site.css'), 'site stylesheet is missing');
check(exists('assets/js/site.js'), 'site script is missing');
check(exists('docs/brand-guide.md'), 'brand guide is missing');
check(exists('docs/brand-guide.html'), 'static brand guide is missing');
check(exists('assets/brand/Drayker-Propagation-Brand-Kit.zip'), 'downloadable brand kit is missing');
check(exists('assets/brand/logo/escuro/drayker-marca.svg'), 'dark Drayker mark is missing');
check(exists('assets/brand/logo/assinatura/drayker-horizontal-branco.svg'), 'dark horizontal signature is missing');
check(exists('assets/brand/logo/kit/favicon-32.png'), 'favicon kit is missing');
check(page.includes('Drayker Propagation'), 'page title does not identify the propagation site');
check(page.includes('https://github.com/draykerdk/general-forum/issues/new?template=volunteer-introduction.yml'), 'volunteer introduction CTA is missing');
check(page.includes('id="toolkit"'), 'toolkit section is missing');
check(page.includes('id="paths"'), 'mission matcher section is missing');
check(page.includes('id="brand"'), 'brand section is missing');
check(!page.includes('TODO'), 'unfinished TODO text remains in the landing page');
check(!page.includes('example.com'), 'placeholder URL remains in the landing page');

const localReferences = [...page.matchAll(/(?:href|src)="([^"#][^"]*)"/g)]
  .map((match) => match[1])
  .filter((reference) => !/^[a-z]+:/i.test(reference));
const missingReferences = localReferences.filter((reference) => !exists(reference));
check(missingReferences.length === 0, `missing local reference(s): ${missingReferences.join(', ')}`);

if (failures.length) {
  failures.forEach((failure) => console.error('FAIL: ' + failure));
  process.exit(1);
}
console.log(checks + ' propagation site checks passed');
