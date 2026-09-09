# Drayker Propagation

Drayker Propagation gives volunteers source material, message starters and brand assets for introducing the initiative to relevant people and communities.

The toolkit helps a contributor choose an audience, explain a relevant part of the work and connect the invitation to a public page or discussion.

Communication helps the right people discover work they can understand, question and develop.

## What is included

- A responsive GitHub Pages landing page in [`index.html`](index.html).
- A client-side mission matcher that suggests a small, source-led starting task based on a volunteer's strength and available time.
- Ready-to-copy, factual message starters. Each points people back to primary sources.
- A restrained **Network grid** mark on the propagation landing page, mounted directly from the supplied engine with standard hairline rings and the darkest shadow.
- A [canonical design library](design/README.md) with all 65 source animations, searchable by nine explained families and documented on dedicated pages.
- Every animation is executed directly from the preserved source sheet. Its geometry, timing and pointer behavior are not reimplemented.
- A [complete logo library](design/logos/) covering all 46 supplied light, dark, scope, monochrome, signature and app-icon files.
- An English [brand guide](docs/brand-guide.html) and downloadable kit for contributors.
- A zero-dependency static integrity check.

## GitHub Pages deployment

The site includes a zero-build [GitHub Pages workflow](.github/workflows/deploy-pages.yml). It runs the static contract before publishing the repository root from `master`.

The production address is [propagation.drayker.org](https://propagation.drayker.org/). GitHub Pages publishes `master` through the repository workflow, with the custom domain and HTTPS already enabled. See the [deployment guide](docs/deployment.md) for the current configuration and recovery procedure.

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

## Repository identity

The canonical repository is [`draykerdk/drayker-propagation`](https://github.com/draykerdk/drayker-propagation). The former theme prototype and its experimental animation are not sources for this site. The reusable documentation theme remains a separate repository at `draykerdk/drayker-theme`.
