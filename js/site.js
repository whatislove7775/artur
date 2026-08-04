/* Shared chrome: header, footer, product cards, scrub-through hover */

function headerMarkup(prefix) {
  const p = prefix || '';
  return `
  <a class="header__logo" href="${p}index.html">
    <img src="${p}assets/logo.svg" alt="Artasimn">
  </a>
  <nav class="nav">
    <a href="${p}items.html">items</a>
    <a href="https://tattoo-office.com" target="_blank" rel="noopener">tattoo</a>
    <a href="https://artasimn-department.com" target="_blank" rel="noopener">a.dept</a>
  </nav>
  <div class="header__spacer"></div>
  <div class="header__right">
    <a href="https://tattoo-office.com" target="_blank" rel="noopener">tattoo office</a>
    <a href="#">card</a>
  </div>`;
}

function footerMarkup() {
  const year = new Date().getFullYear();
  return `
  <div class="footer__brand">artasimn &nbsp; © ${year}</div>
  <div class="footer__links">
    <a href="#">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
    <a href="#">ОФЕРТА</a>
    <a href="#">ИНФО</a>
  </div>`;
}

function mountHeader(prefix) {
  const el = document.querySelector('.header');
  if (el) el.innerHTML = headerMarkup(prefix);
}

function mountFooter() {
  const el = document.querySelector('.footer');
  if (el) el.innerHTML = footerMarkup();
}

/* Menu strip: 4 photos, dark veil, hover reveals, click filters or
   opens the item's external site. */
function menuStripMarkup(prefix, activeId) {
  const p = prefix || '';
  return MENU.map((m) => {
    const active = m.id === activeId ? ' is-active' : '';
    const href =
      m.kind === 'external' ? m.href : `${p}index.html?cat=${m.id}`;
    const target = m.kind === 'external' ? ' target="_blank" rel="noopener"' : '';
    return `
    <a class="menu-tile${active}" href="${href}"${target} data-menu="${m.id}">
      <img src="${p}${m.image}" alt="${m.label}">
      <div class="menu-tile__veil"></div>
      <div class="menu-tile__label">${m.label}</div>
    </a>`;
  }).join('');
}

function mountMenuStrip(prefix, activeId) {
  const el = document.querySelector('.menu-strip');
  if (el) el.innerHTML = menuStripMarkup(prefix, activeId);
}

/* Product card — mouse position along the image scrubs through the
   product's photos, the way mozij.ru's showcase does. */
function cardMarkup(item, prefix) {
  const p = prefix || '';
  const imgs = item.images
    .map(
      (src, i) =>
        `<img src="${p}${src}" alt="${item.title}"${i === 0 ? ' class="is-visible"' : ''} data-i="${i}">`
    )
    .join('');
  const dots =
    item.images.length > 1
      ? `<div class="card__dots">${item.images
          .map((_, i) => `<span${i === 0 ? ' class="is-active"' : ''}></span>`)
          .join('')}</div>`
      : '';
  return `
  <a class="card" href="${p}product.html?id=${item.id}" data-card>
    <div class="card__frame">${imgs}</div>
    ${dots}
    <div class="card__title">${item.title}</div>
    <div class="card__price">${item.price}</div>
  </a>`;
}

function attachScrub(cardEl) {
  const frame = cardEl.querySelector('.card__frame');
  const imgs = Array.from(frame.querySelectorAll('img'));
  const dots = Array.from(cardEl.querySelectorAll('.card__dots span'));
  if (imgs.length < 2) return;

  let current = 0;
  const show = (i) => {
    current = i;
    imgs.forEach((img, idx) => img.classList.toggle('is-visible', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  };

  frame.addEventListener('mousemove', (e) => {
    const rect = frame.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    const i = Math.min(imgs.length - 1, Math.max(0, Math.floor(fraction * imgs.length)));
    show(i);
  });

  frame.addEventListener('mouseleave', () => show(0));

  /* touch: a horizontal swipe steps through the photos like the arrows
     on a carousel; a vertical swipe is left alone so the page still
     scrolls normally, and a plain tap still opens the product page. */
  let touchX = 0;
  let touchY = 0;
  let swiping = false;
  let suppressClick = false;

  frame.addEventListener(
    'touchstart',
    (e) => {
      const t = e.touches[0];
      touchX = t.clientX;
      touchY = t.clientY;
      swiping = false;
    },
    { passive: true }
  );

  frame.addEventListener(
    'touchmove',
    (e) => {
      const t = e.touches[0];
      const dx = t.clientX - touchX;
      const dy = t.clientY - touchY;
      if (!swiping && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        swiping = Math.abs(dx) > Math.abs(dy);
      }
      if (swiping) e.preventDefault();
    },
    { passive: false }
  );

  frame.addEventListener(
    'touchend',
    (e) => {
      if (!swiping) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchX;
      const threshold = 24;
      if (dx <= -threshold) {
        show((current + 1) % imgs.length);
      } else if (dx >= threshold) {
        show((current - 1 + imgs.length) % imgs.length);
      }
      suppressClick = true;
    },
    { passive: true }
  );

  cardEl.addEventListener('click', (e) => {
    if (suppressClick) {
      e.preventDefault();
      suppressClick = false;
    }
  });
}

function renderCards(target, items, prefix) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  el.innerHTML = items.map((i) => cardMarkup(i, prefix)).join('');
  el.querySelectorAll('.card').forEach(attachScrub);
}

function sketchCardMarkup(prefix) {
  const p = prefix || '';
  return `
  <div class="sketch-card" data-sketch-open>
    <div class="sketch-card__frame">
      <img src="${p}${SKETCH.image}" alt="${SKETCH.caption}">
    </div>
    <div class="sketch-card__date">${SKETCH.date}</div>
    <div class="sketch-card__caption">${SKETCH.caption}</div>
  </div>`;
}

function mountSketchLightbox(prefix) {
  const p = prefix || '';
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Close">&times;</button>
    <img src="${p}${SKETCH.image}" alt="${SKETCH.caption}">`;
  document.body.appendChild(box);

  const open = () => box.classList.add('is-open');
  const close = () => box.classList.remove('is-open');

  document.querySelectorAll('[data-sketch-open]').forEach((el) => {
    el.addEventListener('click', open);
  });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.addEventListener('click', (e) => {
    // img has pointer-events:none (Yandex image-overlay workaround), so
    // e.target is always the backdrop here — check the click coordinates
    // against the image instead of relying on target identity.
    const rect = box.querySelector('img').getBoundingClientRect();
    const insideImg =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!insideImg) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
