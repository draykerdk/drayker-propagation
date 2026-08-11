#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const failures = [];
let checks = 0;

const resolve = (file) => path.join(root, file);
const exists = (file) => fs.existsSync(resolve(file));
const read = (file) => fs.readFileSync(resolve(file), 'utf8');
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(resolve(file))).digest('hex');
const check = (ok, message) => {
  checks += 1;
  if (!ok) failures.push(message);
};

const page = read('index.html');
const designPage = read('design/index.html');
const manifest = JSON.parse(read('design/manifest.json'));
const componentContract = read('.drayker/component.yml');
const expectedEngineHash = '0a421c6b10ade43a6e45e03ba1a5e7a690ea1e9cb29ebc5827321385e37c380c';
const expectedSheetHash = '8934b382f88c7dbca7272284448fae7927582ed0de3c0d1ed7edefae4ba485ce';

[
  'index.html',
  'design/index.html',
  'design/design.css',
  'design/design.js',
  'design/animations/index.html',
  'design/animations/catalog.css',
  'design/animations/detail.css',
  'design/animations/source-embed.js',
  'design/README.md',
  'design/manifest.json',
  'design/docs/DRAYKER-MARK.md',
  'design/docs/DKNOWLEDGE-DESIGN.md',
  'design/docs/V3-HANDOFF.md',
  'design/docs/github.md',
  'design/source/Drayker Logo Variations.html',
  'design/source/drayker-mark.js',
  'design/source/DRAYKER-MARK.md',
  'design/source/assets/planet.png',
  'assets/css/propagation.css',
  'assets/js/site.js',
  'assets/js/drayker-mark.js',
  'assets/brand/Drayker-Design-Library.zip',
  'assets/brand/Drayker-Propagation-Brand-Kit.zip',
  '.github/workflows/deploy-pages.yml'
].forEach((file) => check(exists(file), file + ' is missing'));

const catalogGroups = manifest.catalog;
const catalogEntries = manifest.catalog.selectionOrder.flatMap((group) => catalogGroups[group]);
catalogEntries.forEach((entry) => check(exists(path.join('design', entry.page, 'index.html')), 'catalog page is missing: ' + entry.page));

check(!exists('assets/js/propagation-network.js'), 'the reimplemented propagation animation still exists');
check(!exists('library/components/network-mesh.js'), 'the reimplemented network mesh still exists');
check(!exists('library/components/mark-presets.js'), 'invented mark presets still exist');

check(hash('assets/js/drayker-mark.js') === expectedEngineHash, 'production engine differs from the supplied engine');
check(hash('design/source/drayker-mark.js') === expectedEngineHash, 'preserved source engine differs from the supplied engine');
check(hash('design/source/Drayker Logo Variations.html') === expectedSheetHash, 'original Logo Variations sheet was modified');

check(manifest.provenance.engineSha256 === expectedEngineHash, 'manifest engine hash is incorrect');
check(manifest.catalog.selectionOrder.join(',') === 'universalSymbols,standardBodies,functionalEffects,customizationExamples', 'catalog priority order is incorrect');
check(catalogEntries.length === 16, 'catalog must expose 16 documented animations');
check(manifest.catalog.universalSymbols.slice(0, 3).map((mark) => mark.sourceId).join(',') === '11b,11c,11d', 'Earth, Sun and Black Hole must lead the universal symbols');
check(manifest.catalog.standardBodies.every((mark) => mark.rings === 'hairline' && mark.shadow === 1), 'standard bodies must use hairline rings and the darkest shadow');
check(manifest.catalog.customizationExamples.every((mark) => /^13[a-h]$/.test(mark.sourceId)), 'customization examples must retain Turn 13 provenance');
check(manifest.interactiveMarks.length === 8, 'manifest must expose the eight original Turn 13 combinations');
check(manifest.interactiveMarks.every((mark) => /^13[a-h]$/.test(mark.sourceId)), 'animation bank source IDs must map to 13a–13h');
check(manifest.interactiveMarks.some((mark) =>
  mark.sourceId === '13c' &&
  mark.body === 'grid' &&
  mark.rings === 'shieldRing' &&
  mark.wedge === 'shield' &&
  mark.accent === '#3FA9FF'
), 'canonical propagation variant 13c is not declared correctly');

const canonicalNetwork = 'data-body="grid" data-rings="hairline" data-wedge="none" data-accent="#3FA9FF" data-shadow="1"';
check(page.replace(/\s+/g, ' ').includes(canonicalNetwork), 'the propagation page does not use the standard Network grid configuration');
check(designPage.includes('data-source-target="11b"') && designPage.includes('data-source-target="11c"') && designPage.includes('data-source-target="11d"'), 'design page must feature the original Earth, Sun and Black Hole source animations');
check(designPage.indexOf('animations/#symbols') < designPage.indexOf('animations/#customization'), 'universal symbols must appear before customization examples');
check(!page.includes('network-mesh.js'), 'landing page still loads the reimplemented network component');
check(!page.includes('mark-presets.js'), 'landing page still loads invented presets');
check(!page.includes('propagation-network.js'), 'landing page still loads the reimplemented animation mount');

check(page.includes('Drayker Propagation'), 'page title does not identify the propagation site');
check(page.includes('https://propagation.drayker.org/'), 'production canonical URL is missing');
check(page.includes('id="toolkit"'), 'toolkit section is missing');
check(page.includes('id="paths"'), 'mission matcher section is missing');
check(page.includes('id="library"'), 'design library entry section is missing');
check(page.includes('design/animations/'), 'landing page does not route to the structured animation catalog');
check(designPage.includes('id="production-assets"'), 'production asset catalog is missing');
check(designPage.includes('id="source-material"'), 'source material catalog is missing');

const logoFiles = [];
const walk = (directory) => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else logoFiles.push(target);
  });
};
walk(resolve('assets/brand/logo'));
check(logoFiles.length === 46, 'production logo collection must contain 46 supplied files');

check(componentContract.includes('id: drayker-propagation'), 'component contract uses the wrong repository identity');
check(componentContract.includes('https://propagation.drayker.org/'), 'component contract is missing production deployment evidence');
check(!componentContract.includes('drayker-theme'), 'component contract still references drayker-theme');

const checkLocalReferences = (file, html) => {
  const base = path.dirname(file);
  const references = [...html.matchAll(/<(?:a|img|script|link|iframe)\b[^>]*(?:href|src)="([^"#][^"]*)"/g)]
    .map((match) => match[1])
    .filter((reference) => !/^[a-z]+:/i.test(reference))
    .map((reference) => decodeURIComponent(reference.split('#')[0].split('?')[0]));
  const missing = references.filter((reference) => !fs.existsSync(path.resolve(root, base, reference)));
  check(missing.length === 0, file + ' has missing local reference(s): ' + missing.join(', '));
};

checkLocalReferences('index.html', page);
checkLocalReferences('design/index.html', designPage);
checkLocalReferences('design/animations/index.html', read('design/animations/index.html'));
catalogEntries.forEach((entry) => checkLocalReferences(path.join('design', entry.page, 'index.html'), read(path.join('design', entry.page, 'index.html'))));

const pagesWorkflow = read('.github/workflows/deploy-pages.yml');
check(pagesWorkflow.includes('actions/configure-pages@v5'), 'Pages workflow does not configure GitHub Pages');
check(pagesWorkflow.includes('actions/upload-pages-artifact@v4'), 'Pages workflow does not upload the static artifact');
check(pagesWorkflow.includes('actions/deploy-pages@v4'), 'Pages workflow does not deploy the artifact');

if (failures.length) {
  failures.forEach((failure) => console.error('FAIL: ' + failure));
  process.exit(1);
}

console.log(checks + ' propagation and canonical design checks passed');
