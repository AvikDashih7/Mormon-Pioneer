(function () {
  var T = document.getElementById('heroT');
  ['ht', 'hb'].forEach(function (id, i) { var e = document.getElementById(id); e.appendChild(T.content.cloneNode(true)); if (i) { e.setAttribute('aria-hidden', 'true') } });
  var ht = document.getElementById('ht'), hb = document.getElementById('hb'), ms = document.getElementById('mission'), sp = document.getElementById('split'), nav = document.getElementById('nav');
  var counted = false;
  function ease(x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2 }
  function run() {
    var r = sp.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (sp.offsetHeight - innerHeight))), q = ease(Math.min(1, p * 1.25));
    ht.style.transform = 'translateY(' + (-q * 52) + '%) rotateX(' + (q * 28) + 'deg)';
    hb.style.transform = 'translateY(' + (q * 52) + '%) rotateX(' + (-q * 28) + 'deg)';
    ms.style.transform = 'scale(' + (.8 + .2 * q) + ') translateZ(0)';
    ms.style.opacity = .3 + .7 * q;
    nav.classList.toggle('sc', scrollY > innerHeight * .9);
    if (p > .35 && !counted) { counted = true; count() }
  }
  function count() {
    document.querySelectorAll('[data-n]').forEach(function (el) {
      var n = +el.dataset.n, u = el.dataset.u || '', t0 = performance.now();
      (function f(t) {
        var k = Math.min(1, (t - t0) / 2200), v = Math.round(n * (1 - Math.pow(1 - k, 3)));
        el.textContent = (el.dataset.c ? v.toLocaleString('en-US') : v) + u; if (k < 1) requestAnimationFrame(f)
      })(t0);
    });
  }
  addEventListener('scroll', run, { passive: true }); addEventListener('resize', run); run();
  /* section by section 3D reveal */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in') } }) }, { threshold: .15 });
  document.querySelectorAll('.rv').forEach(function (e) { io.observe(e) });
  /* mouse tilt for hero heading */
  addEventListener('mousemove', function (e) {
    var x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
    document.querySelectorAll('.hero .tilt>*').forEach(function (el, i) { el.style.transform = 'rotateY(' + x * 14 + 'deg) rotateX(' + (-y * 10) + 'deg) translateZ(' + (i ? 0 : 30) + 'px)' });
  });
})();
