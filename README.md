# belentani-design-system

Sistema de diseño del universo Belentani — **glass thick red neon alive machine**.

## Qué es

Tokens y componentes drop-in para que todas las webs del universo compartan el mismo
cristal grueso lechoso, neón rojo y pulso de máquina viva.

## Contenido

| Archivo | Función |
|---|---|
| `belentani-glass.css` | Capa visual: glass, gloss, neón, HUD, motion |
| `belentani-machine.js` | Comportamiento: coding rain, pulse, vitality, parallax |
| `index.html` | Demo viva del sistema |

## Uso rápido

```html
<link rel="stylesheet" href="belentani-glass.css" />
<body class="bn-scanlines bn-vignette">
  <canvas id="bn-rain" class="bn-rain" aria-hidden="true"></canvas>
  <main class="bn-stage">
    <section class="bn-panel bn-panel--alive">
      <p class="bn-kicker">Status</p>
      <h1 class="bn-title bn-glitch">Alive Machine</h1>
      <a class="bn-btn bn-btn--solid" href="#">Entrar</a>
    </section>
  </main>
  <script src="belentani-machine.js"></script>
</body>
```

API opcional tras el boot:

```js
BelentaniFX.setVital(84);
BelentaniFX.pulse('.bn-panel--alive');
BelentaniFX.tickVital({ start: 70, ms: 900 });
BelentaniFX.destroy();
```

## Tokens

| Token | Valor | Uso |
|---|---|---|
| Negro | `#000000` / `#050507` | Fondo base |
| Rojo neón | `#ff073a` | Acento principal / máquina |
| Dorado Zion | `#d4af37` | Acento secundario |
| Cyan | `#4de8e0` | Acento técnico / focus |
| Orbitron | display | Títulos |
| Share Tech Mono | mono | Cuerpo y código |

## Clases clave

- Superficie: `.bn-panel`, `.bn-panel--alive`, `.bn-panel--gold`, `.bn-panel--cyan`
- Tipo: `.bn-title`, `.bn-sub`, `.bn-kicker`, `.bn-glitch`, `.bn-flicker`
- UI: `.bn-btn`, `.bn-card`, `.bn-input`, `.bn-badge`, `.bn-hud`, `.bn-vital`
- Ambiente: `.bn-scanlines`, `.bn-vignette`, `#bn-rain`

## Nota

La rama por defecto de este repositorio es `duck`, no `main`.

## Licencia

MIT (ver `LICENSE`).
