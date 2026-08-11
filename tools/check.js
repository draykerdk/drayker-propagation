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
const componentContract = fs.readFileSync(path.join(root, '.drayker/component.yml'), 'utf8');

check(exists('index.html'), 'index.html is missing');
check(exists('assets/css/site.css'), 'site stylesheet is missing');
check(exists('assets/css/propagation.css'), 'propagation stylesheet is missing');
check(exists('assets/js/site.js'), 'site script is missing');
check(exists('assets/js/drayker-mark.js'), 'Drayker mark engine is missing');
check(exists('assets/js/propagation-network.js'), 'propagation network animation is missing');
check(exists('library/components/network-mesh.js'), 'reusable network mesh component is missing');
check(exists('library/components/mark-presets.js'), 'reusable mark presets are missing');
check(exists('library/tokens/drayker.css'), 'public design tokens are missing');
check(exists('library/examples/network-mesh.html'), 'network component example is missing');
check(exists('library/source/drayker-logo-variations.html'), 'original logo variations source is missing');
check(exists('library/manifest.json'), 'design library manifest is missing');
check(exists('assets/brand/Drayker-Design-Library.zip'), 'downloadable design library is missing');
check(exists('docs/brand-guide.md'), 'brand guide is missing');
check(exists('docs/brand-guide.html'), 'static brand guide is missing');
check(exists('docs/deployment.md'), 'deployment guide is missing');
check(exists('.github/workflows/deploy-pages.yml'), 'GitHub Pages deployment workflow is missing');
check(exists('assets/brand/Drayker-Propagation-Brand-Kit.zip'), 'downloadable brand kit is missing');
check(exists('assets/brand/logo/escuro/drayker-marca.svg'), 'dark Drayker mark is missing');
check(exists('assets/brand/logo/assinatura/drayker-horizontal-branco.svg'), 'dark horizontal signature is missing');
check(exists('assets/brand/logo/kit/favicon-32.png'), 'favicon kit is missing');
check(page.includes('Drayker Propagation'), 'page title does not identify the propagation site');
check(page.includes('https://github.com/draykerdk/general-forum/issues/new?template=volunteer-introduction.yml'), 'volunteer introduction CTA is missing');
check(page.includes('https://propagation.drayker.org/'), 'production canonical URL is missing');
check(page.includes('id="toolkit"'), 'toolkit section is missing');
check(page.includes('id="paths"'), 'mission matcher section is missing');
check(page.includes('id="brand"'), 'brand section is missing');
check(page.includes('id="library"'), 'reusable design library section is missing');
check(page.includes('data-propagation-network'), 'interactive signal field is missing');
check(page.includes('assets/js/drayker-mark.js'), 'mark engine is not loaded');
check(page.includes('library/components/network-mesh.js'), 'reusable network component is not loaded');
check(page.includes('library/components/mark-presets.js'), 'mark presets are not loaded');
check(page.includes('assets/js/propagation-network.js'), 'propagation animation is not loaded');
check(componentContract.includes('id: drayker-propagation'), 'component contract still uses the old repository identity');
check(componentContract.includes('https://propagation.drayker.org/'), 'component contract is missing production deployment evidence');
check(!componentContract.includes('drayker-theme'), 'component contract still references drayker-theme');
check(!page.includes('TODO'), 'unfinished TODO text remains in the landing page');
check(!page.includes('example.com'), 'placeholder URL remains in the landing page');
const pagesWorkflow = exists('.github/workflows/deploy-pages.yml')
  ? fs.readFileSync(path.join(root, '.github/workflows/deploy-pages.yml'), 'utf8')
  : '';
check(pagesWorkflow.includes('actions/configure-pages@v5'), 'Pages workflow does not configure GitHub Pages');
check(pagesWorkflow.includes('actions/upload-pages-artifact@v4'), 'Pages workflow does not upload the static artifact');
check(pagesWorkflow.includes('actions/deploy-pages@v4'), 'Pages workflow does not deploy the artifact');

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
