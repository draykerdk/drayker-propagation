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
const catalogPage = read('design/animations/index.html');
const logoPage = read('design/logos/index.html');
const readme = read('README.md');
const deploymentGuide = read('docs/deployment.md');
const manifest = JSON.parse(read('design/manifest.json'));
const catalog = JSON.parse(read('design/animations/catalog-data.json'));
const componentContract = read('.drayker/component.yml');
const expectedEngineHash = '0a421c6b10ade43a6e45e03ba1a5e7a690ea1e9cb29ebc5827321385e37c380c';
const expectedSheetHash = '8934b382f88c7dbca7272284448fae7927582ed0de3c0d1ed7edefae4ba485ce';
const letters = (number, sequence) => [...sequence].map((letter) => number + letter);
const expectedSourceIds = [
  '1a', '1b', '1d', '2a', '2b', '3f',
  ...letters('4', 'abcdef'), ...letters('5', 'abc'), ...letters('6', 'abcdef'), ...letters('7', 'abc'),
  ...letters('8', 'abcdefgh'), ...letters('9', 'abcdefgh'), ...letters('10', 'abcdefgh'),
  ...letters('11', 'abcd'), ...letters('12', 'abcdef'), ...letters('13', 'abcdefg')
];

[
  'index.html',
  'design/index.html',
  'design/design.css',
  'design/design.js',
  'design/animations/index.html',
  'design/animations/catalog.css',
  'design/animations/catalog.js',
  'design/animations/catalog-data.json',
  'design/animations/detail.css',
  'design/animations/detail-app.js',
  'design/animations/source-embed.js',
  'design/logos/index.html',
  'design/logos/logos.css',
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

check(!exists('assets/js/propagation-network.js'), 'the reimplemented propagation animation still exists');
check(!exists('library/components/network-mesh.js'), 'the reimplemented network mesh still exists');
check(!exists('library/components/mark-presets.js'), 'invented mark presets still exist');

check(hash('assets/js/drayker-mark.js') === expectedEngineHash, 'production engine differs from the supplied engine');
check(hash('design/source/drayker-mark.js') === expectedEngineHash, 'preserved source engine differs from the supplied engine');
check(hash('design/source/Drayker Logo Variations.html') === expectedSheetHash, 'original Logo Variations sheet was modified');

check(manifest.version === '4.0.0', 'manifest version must describe the complete library');
check(manifest.provenance.engineSha256 === expectedEngineHash, 'manifest engine hash is incorrect');
check(manifest.catalog.data === 'animations/catalog-data.json', 'manifest does not route consumers to the complete catalog');
check(manifest.catalog.totalAnimations === 65 && manifest.catalog.totalFamilies === 9, 'manifest inventory totals are incorrect');

const actualIds = catalog.animations.map((item) => item.id);
const groupCounts = catalog.groups.map((group) => catalog.animations.filter((item) => item.group === group.id).length);
check(catalog.version === '4.0.0', 'catalog data version is incorrect');
check(catalog.groups.length === 9, 'catalog must explain nine animation families');
check(catalog.animations.length === 65, 'catalog must expose all 65 source animations');
check(new Set(actualIds).size === 65, 'catalog source IDs must be unique');
check([...actualIds].sort().join(',') === [...expectedSourceIds].sort().join(','), 'catalog source IDs do not match the 65 animated source cards');
check(groupCounts.join(',') === '3,3,5,3,8,16,6,14,7', 'animation family counts are incorrect');
check(catalog.animations.slice(0, 3).map((item) => item.id).join(',') === '11b,11c,11d', 'Earth, Sun and Black Hole must lead the catalog');
check(catalog.groups.slice(-2).map((group) => group.id).join(',') === 'ring-experiments,applied-machinery', 'unusual rings and machinery must remain at the bottom');
check(catalog.animations.every((item) => catalog.groups.some((group) => group.id === item.group)), 'an animation points to an unknown family');

catalog.animations.forEach((item) => {
  const file = `design/animations/source/${item.id}/index.html`;
  check(exists(file), 'dedicated animation page is missing: ' + item.id);
  if (exists(file)) check(read(file).includes(`data-animation-id="${item.id}"`), 'animation page has the wrong source ID: ' + item.id);
});
Object.entries(catalog.aliases).forEach(([alias, id]) => {
  const file = `design/animations/${alias}/index.html`;
  check(exists(file) && read(file).includes(`../source/${id}/`), 'legacy route does not point to source ' + id + ': ' + alias);
});

check((catalogPage.match(/<iframe\b/g) || []).length === 1, 'catalog must use one shared source player, not one source sheet per card');
check(catalogPage.includes('65 INTERACTIVE STUDIES'), 'catalog introduction does not identify the complete inventory');
check(logoPage.match(/class="[^"]*logo-card/g)?.length === 46, 'logo page must expose all 46 supplied assets');
check(logoPage.includes('Do not invert the light SVG with CSS'), 'dark-surface logo rule is missing');

const canonicalNetwork = 'data-body="grid" data-rings="hairline" data-wedge="none" data-accent="#3FA9FF" data-shadow="1"';
check(page.replace(/\s+/g, ' ').includes(canonicalNetwork), 'the propagation page does not use the standard Network grid configuration');
check(designPage.includes('data-source-target="11b"') && designPage.includes('data-source-target="11c"') && designPage.includes('data-source-target="11d"'), 'design page must feature the original Earth, Sun and Black Hole source animations');
check(designPage.indexOf('animations/#symbols') < designPage.indexOf('animations/#preview-4a'), 'universal symbols must appear before customization examples');
check(!page.includes('network-mesh.js') && !page.includes('mark-presets.js') && !page.includes('propagation-network.js'), 'landing page still loads a reimplemented animation');

check(page.includes('Drayker Propagation'), 'page title does not identify the propagation site');
check(page.includes('https://propagation.drayker.org/'), 'production canonical URL is missing');
check(page.includes('people keep creating, discovering and learning while intelligence carries the rest'), 'landing copy is not aligned with the public Drayker thesis');
check(page.includes('https://drayker.org/docs/') && page.includes('https://drayker.org/fn/'), 'landing page is not connected to the clean portal routes');
check(!page.includes('https://drayker.org/#org/'), 'landing page still publishes legacy hash routes');
check(readme.includes('The production address is') && !readme.includes('The intended production address is'), 'README still describes the deployed site as hypothetical');
check(!deploymentGuide.includes('Rename `draykerdk/drayker-theme`'), 'deployment guide still instructs readers to repeat the completed repository rename');
check(page.includes('id="toolkit"') && page.includes('id="paths"') && page.includes('id="library"'), 'a propagation toolkit section is missing');
check(page.includes('design/animations/') && page.includes('design/logos/'), 'landing page does not route to both complete design catalogs');
check(designPage.includes('id="production-assets"') && designPage.includes('id="source-material"'), 'design overview is missing assets or source material');

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
checkLocalReferences('design/animations/index.html', catalogPage);
checkLocalReferences('design/logos/index.html', logoPage);
catalog.animations.forEach((item) => {
  const file = `design/animations/source/${item.id}/index.html`;
  checkLocalReferences(file, read(file));
});

const pagesWorkflow = read('.github/workflows/deploy-pages.yml');
check(pagesWorkflow.includes('actions/configure-pages@v5'), 'Pages workflow does not configure GitHub Pages');
check(pagesWorkflow.includes('actions/upload-pages-artifact@v4'), 'Pages workflow does not upload the static artifact');
check(pagesWorkflow.includes('actions/deploy-pages@v4'), 'Pages workflow does not deploy the artifact');

if (failures.length) {
  failures.forEach((failure) => console.error('FAIL: ' + failure));
  process.exit(1);
}

console.log(checks + ' propagation and complete design-library checks passed');
