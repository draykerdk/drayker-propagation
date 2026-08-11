# Drayker canonical design library

This directory organizes the supplied design material without replacing its implementation.

## Choose by use

- **Interactive mark:** start in `animations/`. Earth, Sun and Black Hole reuse the exact Turn 11 source renderers; the remaining pages mount exact declarative configurations from `../assets/js/drayker-mark.js`.
- **Logo or icon:** select an existing file under `../assets/brand/logo/` by surface, scope and output size.
- **Rules:** read `docs/DRAYKER-MARK.md` before extending or exporting the mark.
- **Decision record:** open `source/Drayker Logo Variations.html`. Its engine and relative assets are preserved beside it, so the original sheet runs unchanged.

## Integrity guarantees

- The production engine and the engine beside the original source sheet are byte-identical to the supplied `drayker-mark.js`.
- Earth, Sun and Black Hole execute cards 11b–11d from the preserved source sheet inside isolated same-origin frames; their geometry and motion are not copied.
- Engine-based pages use declarative attributes and do not copy or reconstruct animation code.
- Turn 13’s unusual rings are cataloged last as customization examples, not normal-use recommendations.
- The original HTML, documentation, SVG and raster assets under `source/` are unedited copies.
- `manifest.json` records the canonical configurations, scope colors and artifact locations.

## Selection order

1. Universal symbols: Earth, Sun, Black Hole and the identity baseline.
2. Standard bodies: minimal hairline rings and a fully opaque dark shadow.
3. Functional effects: action inside the shadow while the standard rings remain.
4. Customization examples: unusual rings that demonstrate possible project-specific extensions.

Every one of the 16 catalog entries has a dedicated English page with meaning, boundaries, reuse instructions and provenance.

## Minimal engine use

```html
<script src="assets/js/drayker-mark.js"></script>
<svg data-drayker
     data-body="grid"
     data-rings="hairline"
     data-wedge="none"
     data-accent="#3FA9FF"
     data-shadow="1"></svg>
```

Do not create an intermediary renderer for a configuration already supplied by the engine.
