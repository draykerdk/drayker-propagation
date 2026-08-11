# Drayker Propagation

An English-language public toolkit for volunteers who want to help people find, understand and responsibly discuss Drayker.

The site gives a volunteer a clear first move without turning outreach into hype: primary sources, honest message starters, a small mission matcher, a public contribution path and the official brand assets.

## What is included

- A responsive GitHub Pages landing page in [`index.html`](index.html).
- A client-side mission matcher that suggests a small, source-led starting task based on a volunteer's strength and available time.
- Ready-to-copy, factual message starters — each points people back to primary sources.
- A restrained **Network grid** mark on the propagation landing page, mounted directly from the supplied engine with standard hairline rings and the darkest shadow.
- A [canonical design library](design/README.md) with all 65 source animations, searchable by nine explained families and documented on dedicated pages.
- Every animation is executed directly from the preserved source sheet; its geometry, timing and pointer behavior are not reimplemented.
- A [complete logo library](design/logos/) covering all 46 supplied light, dark, scope, monochrome, signature and app-icon files.
- An English [brand guide](docs/brand-guide.md) and downloadable kit for contributors.
- A zero-dependency static integrity check.

## GitHub Pages deployment

The site includes a zero-build [GitHub Pages workflow](.github/workflows/deploy-pages.yml). It runs the static contract before publishing the repository root from `master`.

The intended production address is `https://propagation.drayker.org`. It must be registered in the repository's Pages settings before its DNS CNAME is created. See the [deployment guide](docs/deployment.md) for the exact, safe order.

No runtime credentials, form collection or third-party analytics are used. The main contribution CTA opens the organization's existing public volunteer-introduction issue form.

## Validate locally

```sh
node tools/check.js
```

The site itself has no build step. Open `index.html` in a browser for a visual check.

## Reuse the design source

Start with [`design/manifest.json`](design/manifest.json) when integrating assets programmatically, browse the live [`design/`](design/) catalog, or open the preserved [`Drayker Logo Variations`](design/source/Drayker%20Logo%20Variations.html) sheet to inspect the original decisions. A complete downloadable package is published as `assets/brand/Drayker-Design-Library.zip`.

## Editorial rule

This is a propagation toolkit, not a claim factory. Keep every message tied to a public primary source, describe proposals as proposals, and do not add promises, performance claims or urgency that the source does not support.

## Repository name

The intended name is `drayker-propagation`. Rename the GitHub repository before enabling the Pages deployment so the repository identity, deployment record and public purpose stay aligned.
