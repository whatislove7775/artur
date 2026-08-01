/* Home page — full-screen blocks.
   A block only hands the scroll over to the next one once its own
   product column has been scrolled all the way through.          */

(function () {
  const fp = document.querySelector('.fp');
  if (!fp) return;

  const rail = fp.querySelector('.fp__rail');
  const blocks = Array.from(fp.querySelectorAll('.block'));
  const desktop = window.matchMedia('(min-width: 901px)');

  let idx = 0;
  let locked = false;

  const scrollerOf = (i) => blocks[i].querySelector('.scroller');

  /* the block-by-block scroll only runs on the full-screen layout —
     not on narrow screens and not in grid mode */
  const jacking = () =>
    desktop.matches && !document.body.classList.contains('is-grid');

  function updateHint() {
    const s = scrollerOf(idx);
    const hint = blocks[idx].querySelector('.scroll-hint');
    if (!hint || !s) return;
    const done = s.scrollTop + s.clientHeight >= s.scrollHeight - 2;
    hint.classList.toggle('is-hidden', done);
  }

  function goTo(next, dir) {
    if (next < 0 || next >= blocks.length) return false;
    locked = true;
    idx = next;
    rail.style.transform = `translateY(-${idx * 100}%)`;

    const s = scrollerOf(idx);
    if (s) s.scrollTop = dir === 'up' ? s.scrollHeight : 0;

    setTimeout(() => {
      locked = false;
      updateHint();
    }, 880);
    return true;
  }

  function handle(delta) {
    if (!jacking() || locked || delta === 0) return;

    const s = scrollerOf(idx);
    const atTop = !s || s.scrollTop <= 1;
    const atBottom =
      !s || s.scrollTop + s.clientHeight >= s.scrollHeight - 2;

    if (delta > 0) {
      if (!atBottom) {
        s.scrollTop += delta;
        updateHint();
        return;
      }
      goTo(idx + 1, 'down');
    } else {
      if (!atTop) {
        s.scrollTop += delta;
        updateHint();
        return;
      }
      goTo(idx - 1, 'up');
    }
  }

  /* wheel — bound to the window so the corner button and the gaps
     between panes scroll the page too ------------------------------ */
  window.addEventListener(
    'wheel',
    (e) => {
      if (!jacking()) return;
      e.preventDefault();
      handle(e.deltaMode === 1 ? e.deltaY * 18 : e.deltaY);
    },
    { passive: false }
  );

  /* touch ---------------------------------------------------------- */
  let touchY = null;
  window.addEventListener(
    'touchstart',
    (e) => {
      touchY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (e) => {
      if (!jacking() || touchY === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      handle((touchY - y) * 1.4);
      touchY = y;
    },
    { passive: false }
  );

  /* keyboard ------------------------------------------------------- */
  window.addEventListener('keydown', (e) => {
    if (!jacking()) return;
    const step = { ArrowDown: 90, PageDown: 460, ' ': 460, ArrowUp: -90, PageUp: -460 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    handle(step);
  });

  window.addEventListener('resize', () => {
    if (!jacking()) {
      rail.style.transform = '';
      idx = 0;
    } else {
      rail.style.transform = `translateY(-${idx * 100}%)`;
    }
    updateHint();
  });

  /* corner emblem — hides the big photos and lays the two blocks out
     as one plain catalogue, the same view the Garment button gives */
  const toggle = document.getElementById('cornerToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const on = document.body.classList.toggle('is-grid');
      toggle.setAttribute('aria-pressed', String(on));

      if (on) {
        blocks.forEach((b) => {
          const s = b.querySelector('.scroller');
          if (s) s.scrollTop = 0;
        });
        window.scrollTo(0, 0);
      } else {
        idx = 0;
        rail.style.transform = jacking() ? 'translateY(0)' : '';
        window.scrollTo(0, 0);
      }
      updateHint();
    });
  }

  updateHint();
})();
