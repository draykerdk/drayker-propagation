# drayker-theme

The Drayker documentation theme: one dark Jekyll layout so that every `*.drayker.org` documentation site reads as part of the same system as [drayker.org](https://drayker.org) and [drayker.com](https://drayker.com).

## Using it

In the `_config.yml` of the repository whose README is published by GitHub Pages:

```yaml
remote_theme: draykerdk/drayker-theme
plugins:
  - jekyll-remote-theme
  - jekyll-optional-front-matter

title: BSDK
description: Base Structure DK — the base structure proposed for the Dk kernel.

dk_kicker: Kernel component        # the small uppercase line above the title
dk_subdomain: bsdk.drayker.org     # shown beside the mark and in the footer bar
dk_repo: https://github.com/draykerdk/bsdk

defaults:
  - scope:
      path: ""
    values:
      layout: default
```

`title` and `description` become the page header, so a README does not need to repeat its own name as an `# H1`.

If the site is served from `docs/`, the `_config.yml` goes in `docs/` too.

## What it gives you

- The Drayker tokens: canvas `#08080A`, surface `#0C0C0F`, border `#18181E`, text `#EDECF0`, muted `#8585A0`, accent `#FF5500`, Space Grotesk + JetBrains Mono, 1320px content width.
- A sticky header carrying the mark and a way back to the volunteers portal and the source repository.
- Markdown styling for headings, tables, code, blockquotes and lists, with tables scrolling inside their own container instead of pushing the page sideways.
- A shared footer pointing at the protocol, the knowledge base, the open functions and the volunteer flow.
- Visible focus states, `prefers-reduced-motion` respected, no JavaScript.

The layout writes its own `<title>` and Open Graph tags rather than depending on `jekyll-seo-tag`, so it builds in a repository whose plugin list you have not touched.

## Changing it

`_layouts/default.html` is the whole theme — markup and tokens in one file, on purpose: thirteen sites inherit it and a single file is what makes a change reviewable. If a token changes here it must change in `SITE_PATTERN.md` of [`draykerdk/drayker.org`](https://github.com/draykerdk/drayker.org) as well; that document is the source of truth for the pattern.
