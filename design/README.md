# Drayker canonical design library

This directory organizes the supplied design material without replacing its implementation.

## Choose by use

- **Interactive mark:** load `../assets/js/drayker-mark.js` and use one of the exact declarative configurations in `manifest.json` or `index.html#animation-bank`.
- **Logo or icon:** select an existing file under `../assets/brand/logo/` by surface, scope and output size.
- **Rules:** read `docs/DRAYKER-MARK.md` before extending or exporting the mark.
- **Decision record:** open `source/Drayker Logo Variations.html`. Its engine and relative assets are preserved beside it, so the original sheet runs unchanged.

## Integrity guarantees

- The production engine and the engine beside the original source sheet are byte-identical to the supplied `drayker-mark.js`.
- The eight entries in the animation bank reproduce Turn 13 by declarative attributes; they do not copy or reconstruct animation code.
- The original HTML, documentation, SVG and raster assets under `source/` are unedited copies.
- `manifest.json` records the canonical configurations, scope colors and artifact locations.

## Minimal interactive use

```html
<script src="assets/js/drayker-mark.js"></script>
<svg data-drayker
     data-body="grid"
     data-rings="shieldRing"
     data-wedge="shield"
     data-accent="#3FA9FF"></svg>
```

Do not create an intermediary renderer for a configuration already supplied by the engine.
