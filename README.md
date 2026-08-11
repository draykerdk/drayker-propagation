# Drayker Propagation

An English-language public toolkit for volunteers who want to help people find, understand and responsibly discuss Drayker.

The site gives a volunteer a clear first move without turning outreach into hype: primary sources, honest message starters, a small mission matcher, a public contribution path and the official brand assets.

## What is included

- A responsive GitHub Pages landing page in [`index.html`](index.html).
- A client-side mission matcher that suggests a small, source-led starting task based on a volunteer's strength and available time.
- Ready-to-copy, factual message starters — each points people back to primary sources.
- A reusable logo kit in [`assets/brand/logo`](assets/brand/logo), including light, dark, mono, signature and app-icon variants.
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

## Editorial rule

This is a propagation toolkit, not a claim factory. Keep every message tied to a public primary source, describe proposals as proposals, and do not add promises, performance claims or urgency that the source does not support.

## Repository name

The intended name is `drayker-propagation`. Rename the GitHub repository before enabling the Pages deployment so the repository identity, deployment record and public purpose stay aligned.
