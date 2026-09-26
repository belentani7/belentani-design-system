// BELENTANI MACHINE FX — coding rain + utilidades GSAP
// Requiere: <canvas id="bn-rain"></canvas>
//           <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script> (opcional)
//           <script src="belentani-machine.js"></script>
(function () {
  'use strict';

  /* ---------- CODING RAIN (matrix roja, 60fps, auto-resize) ---------- */
  function rain(canvasId, color) {
    const c = document.getElementById(canvasId || 'bn-rain');
    if (!c) return;
    const x = c.getContext('2d');
    const COL = color || '#ff0040';
    const chars = '01アイウエオカキクケコ<>/{}#$'.split('');
    let drops = [];
    function rs() { c.width = innerWidth; c.height = innerHeight; drops = Array(Math.floor(c.width / 16)).fill(0); }
    rs(); addEventListener('resize', rs);
    setInterval(function () {
      x.fillStyle = 'rgba(10,10,12,.08)';
      x.fillRect(0, 0, c.width, c.height);
      x.fillStyle = COL;
      x.font = '14px monospace';
      drops.forEach(function (y, i) {
        x.fillText(chars[Math.random() * chars.length | 0], i * 16, y * 16);
        drops[i] = y * 16 > c.height && Math.random() > .975 ? 0 : y + 1;
      });
    }, 50);
  }

  /* ---------- ANIMACIONES DE ENTRADA (GSAP o fallback CSS) ---------- */
  function entrance() {
    const els = document.querySelectorAll('.bn-panel, .bn-card');
    if (window.gsap) {
      gsap.from('.bn-title', { opacity: 0, y: -30, duration: .8, ease: 'power3.out' });
      gsap.from('.bn-panel', { opacity: 0, y: 40, scale: .97, duration: 1, ease: 'power3.out', delay: .15 });
      gsap.from('.bn-card', { opacity: 0, x: -24, duration: .5, stagger: .08, ease: 'power2.out', delay: .4 });
    } else {
      els.forEach(function (e, i) {
        e.style.opacity = 0;
        e.style.transition = 'opacity .6s ease ' + (i * 0.06) + 's, transform .6s ease ' + (i * 0.06) + 's';
        e.style.transform = 'translateY(20px)';
        requestAnimationFrame(function () {
          e.style.opacity = 1;
          e.style.transform = 'none';
        });
      });
    }
  }

  /* ---------- PARALLAX SUAVE (para hero con canvas de fondo) ---------- */
  function parallax(sel) {
    const el = document.querySelector(sel || '.bn-panel');
    if (!el) return;
    addEventListener('mousemove', function (ev) {
      const dx = (ev.clientX / innerWidth - .5) * 10;
      const dy = (ev.clientY / innerHeight - .5) * 6;
      if (window.gsap) {
        gsap.to(el, { x: dx, y: dy, duration: .6, ease: 'power2.out' });
      } else {
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      }
    });
  }

  /* ---------- ARRANQUE AUTOMÁTICO ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    rain('bn-rain');
    entrance();
    window.BelentaniFX = { rain, entrance, parallax };
  });
})();
