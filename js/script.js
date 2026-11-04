const t = document.getElementById('heroT');
document.querySelectorAll('.half').forEach(h => h.appendChild(t.content.cloneNode(true)));
const root = document.documentElement, wrap = document.getElementById('wrap'), pic = document.getElementById('pic');
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
function onScroll() {
    const max = wrap.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, (scrollY - wrap.offsetTop) / max * 1.25));
    wrap.style.setProperty('--p', p.toFixed(4));
    const r = pic.getBoundingClientRect();
    pic.style.setProperty('--r', (((r.top + r.height / 2) / innerHeight - .5) * -30).toFixed(1));
    if (p > .7 && !window.counted) { window.counted = 1; count() }
}
function count() {
    document.querySelectorAll('[data-n]').forEach(el => {
        const n = +el.dataset.n, s = el.dataset.s || '', c = el.dataset.c, t0 = performance.now();
        (function f(t) {
            const k = Math.min(1, (t - t0) / 1400), v = Math.round(n * (1 - Math.pow(1 - k, 3)));
            el.textContent = (c ? v.toLocaleString('en-US') : v) + s; if (k < 1) requestAnimationFrame(f)
        })(t0);
    });
}
addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
if (!reduce) addEventListener('pointermove', e => {
    root.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3));
    root.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3));
});