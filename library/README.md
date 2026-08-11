# Drayker reusable design library

This directory turns the original **Drayker Logo Variations** design sheet into source artifacts that can be reused without copying code out of a browser inspector.

## Start here

- `manifest.json` — machine-readable artifact index.
- `tokens/drayker.css` — public color and typography tokens.
- `components/mark-presets.js` — tested mark configurations.
- `components/network-mesh.js` — the reusable Dk Network mesh body.
- `examples/network-mesh.html` — standalone implementation example.
- `source/drayker-logo-variations.html` — preserved original design sheet, with repository-relative asset paths.
- `docs/DRAYKER-MARK.md` — engine concepts, API, extension rules and accessibility guidance.

The official SVG and app-icon collection remains under `assets/brand/logo/` so the site, documentation and library share one source of truth.

## Minimal interactive mark

```html
<script src="assets/js/drayker-mark.js"></script>
<script src="library/components/network-mesh.js"></script>
<script src="library/components/mark-presets.js"></script>
<svg id="network-mark"></svg>
<script>
  Drayker.create('#network-mark', DraykerPresets.networkMesh);
</script>
```

Call `.stop()` when `prefers-reduced-motion` matches and when the component is outside the viewport.
