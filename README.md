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

## Publish with GitHub Pages

1. In the repository settings, open **Pages**.
2. Select **Deploy from a branch**.
3. Select `master` and the repository root.
4. Save. GitHub Pages will serve `index.html` directly.

No runtime credentials, form collection or third-party analytics are used. The main contribution CTA opens the organization's existing public volunteer-introduction issue form.

## Validate locally

```sh
node tools/check.js
```

The site itself has no build step. Open `index.html` in a browser for a visual check.

## Editorial rule

This is a propagation toolkit, not a claim factory. Keep every message tied to a public primary source, describe proposals as proposals, and do not add promises, performance claims or urgency that the source does not support.

## Recommended repository name

`drayker-propagation` would make the repository's purpose clear. Rename it in GitHub only after updating the Pages address and any inbound links.
