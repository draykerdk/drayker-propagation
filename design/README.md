# Drayker canonical design library

This directory organizes the supplied design material without replacing its implementation.

## Choose by use

- **Interactive mark:** start in `animations/`. Its inventory covers all 65 animated cards from the source sheet and moves each original SVG into one isolated player; no animation is copied or reconstructed.
- **Logo or icon:** start in `logos/`, where all 46 supplied files are grouped by surface, scope, format and output size.
- **Rules:** read `docs/DRAYKER-MARK.md` before extending or exporting the mark.
- **Decision record:** open `source/Drayker Logo Variations.html`. Its engine and relative assets are preserved beside it, so the original sheet runs unchanged.

## Integrity guarantees

- The production engine and the engine beside the original source sheet are byte-identical to the supplied `drayker-mark.js`.
- Every catalog page executes its exact source-sheet SVG inside an isolated same-origin frame; geometry, renderer loops and pointer behavior are not copied.
- Turn 13’s unusual rings are cataloged last as customization examples, not normal-use recommendations.
- The original HTML, documentation, SVG and raster assets under `source/` are unedited copies.
- `manifest.json` records the canonical configurations, scope colors and artifact locations.

## Selection order

1. Universal symbols: Earth, Sun and Black Hole.
2. Standard identity, followed by additional Earth and celestial studies.
3. Current system bodies, historical scope studies and conceptual elements.
4. Ring experiments and literal machinery customizations, deliberately placed last.

Every one of the 65 catalog entries has a dedicated English page with meaning, boundaries, renderer identity and provenance. Searchable catalog data lives in `animations/catalog-data.json`.

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
