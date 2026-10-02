// BELENTANI MACHINE FX v2 — coding rain + alive pulse + utilidades
// Requiere: <canvas id="bn-rain"></canvas>
// Opcional: GSAP 3 (cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js)
//           <script src="belentani-machine.js"></script>
(function () {
  'use strict';

  var reduceMotion =
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  var rafIds = [];
  var cleanups = [];

  function on(el, type, fn, opts) {
    el.addEventListener(type, fn, opts);
    cleanups.push(function () {
      el.removeEventListener(type, fn, opts);
    });
  }

  function cancelAll() {
    rafIds.forEach(function (id) {
      cancelAnimationFrame(id);
    });
    rafIds = [];
    cleanups.splice(0).forEach(function (fn) {
      try {
        fn();
      } catch (_) {}
    });
  }

  /* ---------- CODING RAIN (matrix roja, rAF, DPR, pause offscreen) ---------- */
  function rain(canvasId, color) {
    var c = document.getElementById(canvasId || 'bn-rain');
    if (!c || reduceMotion) return { stop: function () {} };

    var ctx = c.getContext('2d');
    if (!ctx) return { stop: function () {} };

    var COL = color || '#ff073a';
    var chars = '01アイウエオカキクケコ<>/{}#$∑∆Ω'.split('');
    var drops = [];
    var fontSize = 14;
    var running = true;
    var last = 0;
    var raf = 0;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = window.innerWidth;
      var h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var cols = Math.max(1, Math.floor(w / fontSize));
      drops = Array(cols)
        .fill(0)
        .map(function () {
          return Math.random() * (h / fontSize);
        });
    }

    function frame(ts) {
      if (!running) return;
      if (ts - last < 48) {
        raf = requestAnimationFrame(frame);
        rafIds.push(raf);
        return;
      }
      last = ts;

      ctx.fillStyle = 'rgba(5,5,7,0.085)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = COL;
      ctx.font = fontSize + 'px "Share Tech Mono", monospace';
      ctx.shadowColor = COL;
      ctx.shadowBlur = 8;

      for (var i = 0; i < drops.length; i++) {
        var ch = chars[(Math.random() * chars.length) | 0];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += 1;
        }
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
      rafIds.push(raf);
    }

    resize();
    on(window, 'resize', resize);
    on(document, 'visibilitychange', function () {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(frame);
        rafIds.push(raf);
      }
    });

    raf = requestAnimationFrame(frame);
    rafIds.push(raf);

    return {
      stop: function () {
        running = false;
        cancelAnimationFrame(raf);
      },
    };
  }

  /* ---------- ANIMACIONES DE ENTRADA ---------- */
  function entrance(root) {
    var scope = root || document;
    var panels = scope.querySelectorAll('.bn-panel, .bn-card');

    if (reduceMotion) {
      panels.forEach(function (el) {
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
      return;
    }

    if (window.gsap) {
      window.gsap.from('.bn-title', {
        opacity: 0,
        y: -28,
        duration: 0.85,
        ease: 'power3.out',
      });
      window.gsap.from('.bn-panel', {
        opacity: 0,
        y: 36,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
        delay: 0.12,
      });
      window.gsap.from('.bn-card', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        delay: 0.35,
      });
      return;
    }

    panels.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition =
        'opacity .65s ease ' + i * 0.05 + 's, transform .65s ease ' + i * 0.05 + 's';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      });
    });
  }

  /* ---------- PARALLAX / GLOSS FOLLOW ---------- */
  function parallax(sel) {
    var el = document.querySelector(sel || '.bn-panel');
    if (!el || reduceMotion) return;

    on(window, 'mousemove', function (ev) {
      var dx = (ev.clientX / window.innerWidth - 0.5) * 12;
      var dy = (ev.clientY / window.innerHeight - 0.5) * 8;
      if (window.gsap) {
        window.gsap.to(el, { x: dx, y: dy, duration: 0.55, ease: 'power2.out' });
      } else {
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      }
    });
  }

  function glossFollow(sel) {
    var nodes = document.querySelectorAll(sel || '.bn-panel');
    if (!nodes.length || reduceMotion) return;

    nodes.forEach(function (el) {
      on(el, 'pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        var x = ((ev.clientX - r.left) / r.width) * 100;
        var y = ((ev.clientY - r.top) / r.height) * 100;
        el.style.setProperty('--bn-gloss-x', x + '%');
        el.style.setProperty('--bn-gloss-y', y + '%');
        el.style.backgroundImage =
          'radial-gradient(420px circle at ' +
          x +
          '% ' +
          y +
          '%, rgba(255,255,255,.18), transparent 42%), linear-gradient(155deg, rgba(255,255,255,.12) 0%, transparent 42%)';
      });
    });
  }

  /* ---------- VITALITY / HEARTBEAT API ---------- */
  function setVital(value, sel) {
    var v = Math.max(0, Math.min(100, Number(value) || 0));
    var nodes = document.querySelectorAll(sel || '.bn-vital');
    nodes.forEach(function (el) {
      el.style.setProperty('--bn-vital', v + '%');
      el.setAttribute('aria-valuenow', String(v));
      var fill = el.querySelector('span');
      if (fill) fill.style.width = v + '%';
    });
    return v;
  }

  function pulse(sel) {
    var el = document.querySelector(sel || '.bn-panel--alive, .bn-panel');
    if (!el || reduceMotion) return;
    el.classList.add('bn-glitch');
    setTimeout(function () {
      el.classList.remove('bn-glitch');
    }, 700);
  }

  function tickVital(opts) {
    opts = opts || {};
    if (reduceMotion) return { stop: function () {} };
    var value = typeof opts.start === 'number' ? opts.start : 68;
    var dir = 1;
    var timer = setInterval(function () {
      value += dir * (0.4 + Math.random() * 1.2);
      if (value > 92) dir = -1;
      if (value < 54) dir = 1;
      setVital(value, opts.sel);
      if (Math.random() > 0.92) pulse(opts.pulseSel);
    }, opts.ms || 900);
    cleanups.push(function () {
      clearInterval(timer);
    });
    return {
      stop: function () {
        clearInterval(timer);
      },
    };
  }

  /* ---------- BOOT ---------- */
  function boot(options) {
    options = options || {};
    document.documentElement.classList.add('bn-safe');
    var rainCtl = rain(options.rainId || 'bn-rain', options.rainColor);
    entrance(options.root);
    if (options.parallax !== false) parallax(options.parallaxSel);
    if (options.gloss !== false) glossFollow(options.glossSel);
    if (options.vital) tickVital(options.vital === true ? {} : options.vital);

    var api = {
      rain: rain,
      entrance: entrance,
      parallax: parallax,
      glossFollow: glossFollow,
      setVital: setVital,
      pulse: pulse,
      tickVital: tickVital,
      destroy: function () {
        if (rainCtl && rainCtl.stop) rainCtl.stop();
        cancelAll();
      },
    };
    window.BelentaniFX = api;
    return api;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      boot();
    });
  } else {
    boot();
  }
})();
