# BELENTANI DESIGN SYSTEM — Glass Thick Red Neon

Sistema de diseño drop-in del ecosistema Belentani: cristal grueso lechoso, neón rojo (#ff0040), glitch de máquina viviente y coding rain.

## Uso rápido (CDN de GitHub Pages)
```html
<link rel="stylesheet" href="https://belentani7.github.io/belentani-design-system/belentani-glass.css">
<canvas id="bn-rain"></canvas>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://belentani7.github.io/belentani-design-system/belentani-machine.js"></script>
```

## Clases
- `.bn-panel` — panel de cristal grueso (inset lechoso + glow rojo)
- `.bn-title`, `.bn-sub`, `.bn-card`, `.bn-btn`, `.bn-bar`
- `.bn-glitch`, `.bn-flicker`, `.bn-scanlines`
- `.bn-safe` en `<html>` — guard anti-overflow móvil

## JS
`BelentaniFX.rain()` · `BelentaniFX.entrance()` (GSAP con fallback) · `BelentaniFX.parallax()`
