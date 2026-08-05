/* Shared chrome: header, footer, product cards, scrub-through hover */

function headerMarkup(prefix) {
  const p = prefix || '';
  return `
  <a class="header__logo" href="${p}index.html">
    <img src="${p}assets/logo.svg" alt="Artasimn">
  </a>
  <nav class="nav">
    <a class="nav-items" href="${p}items.html">items<span class="nav-items__colon">:</span></a>
    <span class="nav-swap">
      <a class="nav-swap__default" href="${p}tattoo.html">tattoo</a>
      <a class="nav-swap__hover" href="${p}index.html?cat=garment">garment</a>
    </span>
    <span class="nav-swap">
      <a class="nav-swap__default" href="https://artasimn-department.com" target="_blank" rel="noopener">a.dept</a>
      <a class="nav-swap__hover" href="${p}index.html?cat=jewellery">jewellery</a>
    </span>
  </nav>
  <div class="header__spacer"></div>
  <div class="header__right">
    <a href="https://tattoo-office.com" target="_blank" rel="noopener">tattoo office</a>
    <a href="#" data-cart-open>card</a>
  </div>`;
}

/* index.html only: the header floats transparent (no white backdrop)
   while any part of the menu-strip hero is still visible under it;
   once the hero has fully scrolled past, it switches to a solid white
   bar so it doesn't sit illegibly over the catalogue's own text. */
function initHeroHeader() {
  const strip = document.querySelector('.menu-strip');
  const header = document.querySelector('.header');
  if (!strip || !header) return;

  const update = () => {
    header.classList.toggle('is-transparent', strip.getBoundingClientRect().bottom <= 0);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
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

/* The garment/jewellery swap only ever triggers off the "items" link
   itself — hovering tattoo or a.dept directly does nothing. A short
   grace period on leaving "items" keeps the menu open long enough for
   the pointer to reach the revealed links (which sit exactly where
   tattoo/a.dept were), so it doesn't collapse mid-travel. */
function initItemsMenu() {
  const nav = document.querySelector('.nav');
  const itemsLink = document.querySelector('.nav-items');
  if (!nav || !itemsLink) return;

  let hideTimer = null;
  const show = () => {
    clearTimeout(hideTimer);
    nav.classList.add('items-active');
  };
  const scheduleHide = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => nav.classList.remove('items-active'), 220);
  };

  itemsLink.addEventListener('mouseenter', show);
  itemsLink.addEventListener('mouseleave', scheduleHide);
  nav.querySelectorAll('.nav-swap__hover').forEach((el) => {
    el.addEventListener('mouseenter', show);
    el.addEventListener('mouseleave', scheduleHide);
  });
}

function mountHeader(prefix) {
  const el = document.querySelector('.header');
  if (el) el.innerHTML = headerMarkup(prefix);
  initItemsMenu();
  mountCartDrawer(prefix);
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
      m.kind === 'external' || m.kind === 'page'
        ? m.kind === 'page'
          ? p + m.href
          : m.href
        : `${p}index.html?cat=${m.id}`;
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

/* Collapsible DESCRIPTION / DELIVERY sections on product & tattoo pages */
function accordionMarkup(label, bodyHtml, openByDefault) {
  return `
  <div class="accordion${openByDefault ? ' is-open' : ''}">
    <button class="accordion__toggle" type="button">
      <span class="accordion__caret">${openByDefault ? '^' : 'v'}</span>${label}
    </button>
    <div class="accordion__body"><div class="accordion__body-inner">${bodyHtml}</div></div>
  </div>`;
}

function initAccordions(root) {
  (root || document).querySelectorAll('.accordion__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const acc = btn.closest('.accordion');
      acc.classList.toggle('is-open');
      btn.querySelector('.accordion__caret').textContent = acc.classList.contains('is-open') ? '^' : 'v';
    });
  });
}

/* tattoo.html's year list: rests stacked bottom-right (newest on top of
   that resting cluster) until you scroll into that year's own section
   of the grid, at which point its label rises up the screen — docking
   just under the header, in a growing stack, once you've scrolled all
   the way through it. The next year then does the same, docking right
   below the previous one. */
function initYearScrollspy(years) {
  const items = Array.from(document.querySelectorAll('.year-rail__item'));
  const markers = years.map((y) => document.querySelector(`[data-year-marker="${y}"]`));
  if (!items.length || markers.some((m) => !m)) return;

  const headerH = 58;
  const dockGap = 26;
  const restGap = 26;
  const restBottomMargin = 40;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  const update = () => {
    const scrollY = window.scrollY;
    const pageBottom = document.body.scrollHeight;
    const restBase = window.innerHeight - restBottomMargin;

    years.forEach((year, i) => {
      const startY = markers[i].getBoundingClientRect().top + scrollY;
      const endY =
        i + 1 < years.length
          ? markers[i + 1].getBoundingClientRect().top + scrollY
          : pageBottom;
      const progress = clamp((scrollY - startY) / Math.max(1, endY - startY), 0, 1);

      const restTop = restBase - (years.length - i) * restGap;
      const dockTop = headerH + 20 + i * dockGap;
      const top = restTop + (dockTop - restTop) * progress;

      items[i].style.top = `${top}px`;
      items[i].classList.toggle('is-current', progress > 0 && progress < 1);
    });
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ===========================================================
   CART — localStorage-backed, slides in from the right
   =========================================================== */
const CART_KEY = 'artasimn-cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, qty) {
  const cart = getCart();
  const row = cart.find((r) => r.id === id);
  if (row) row.qty += qty || 1;
  else cart.push({ id, qty: qty || 1 });
  saveCart(cart);
  renderCartDrawer();
}

function setCartQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter((r) => r.id !== id);
  else {
    const row = cart.find((r) => r.id === id);
    if (row) row.qty = qty;
  }
  saveCart(cart);
  renderCartDrawer();
}

function removeFromCart(id) {
  saveCart(getCart().filter((r) => r.id !== id));
  renderCartDrawer();
}

function parsePrice(price) {
  return parseInt(String(price).replace(/[^\d]/g, ''), 10) || 0;
}

function formatRub(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function mountCartDrawer(prefix) {
  const p = prefix || '';
  if (document.querySelector('.cart-drawer')) return;
  const el = document.createElement('div');
  el.className = 'cart-drawer';
  el.innerHTML = `
    <div class="cart-drawer__bar">
      <span data-cart-count></span>
      <a href="#" data-cart-close>close</a>
    </div>
    <div class="cart-drawer__rows" data-cart-rows></div>
    <div class="cart-drawer__foot">
      <span data-cart-total></span>
      <a href="#" class="cart-drawer__order">order</a>
    </div>`;
  document.body.appendChild(el);

  document.querySelectorAll('[data-cart-open]').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    })
  );
  el.querySelector('[data-cart-close]').addEventListener('click', (e) => {
    e.preventDefault();
    closeCartDrawer();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCartDrawer();
  });

  renderCartDrawer(p);
}

function openCartDrawer() {
  const el = document.querySelector('.cart-drawer');
  if (el) el.classList.add('is-open');
}

function closeCartDrawer() {
  const el = document.querySelector('.cart-drawer');
  if (el) el.classList.remove('is-open');
}

function renderCartDrawer(prefix) {
  const el = document.querySelector('.cart-drawer');
  if (!el) return;
  const p = prefix || '';
  const cart = getCart();
  const rowsEl = el.querySelector('[data-cart-rows]');
  const countEl = el.querySelector('[data-cart-count]');
  const totalEl = el.querySelector('[data-cart-total]');

  const pcs = cart.reduce((sum, r) => sum + r.qty, 0);
  countEl.textContent = `${pcs} pcs`;

  if (!cart.length) {
    rowsEl.innerHTML = '<div class="cart-drawer__empty">cart is empty</div>';
    totalEl.textContent = 'total: 0 rub';
    return;
  }

  let total = 0;
  rowsEl.innerHTML = cart
    .map((row) => {
      const item = PRODUCTS.find((i) => i.id === row.id);
      if (!item) return '';
      const lineTotal = parsePrice(item.price) * row.qty;
      total += lineTotal;
      return `
      <div class="cart-drawer__row" data-cart-row="${item.id}">
        <img src="${p}${item.images[0]}" alt="${item.title}">
        <div class="cart-drawer__row-info">
          <div class="cart-drawer__row-title">${item.title}</div>
          <div class="cart-drawer__row-price">${item.price}</div>
        </div>
        <div class="cart-drawer__qty">
          <button type="button" data-cart-dec>&ndash;</button>
          <span>${row.qty}</span>
          <button type="button" data-cart-inc>+</button>
        </div>
        <button type="button" class="cart-drawer__remove" data-cart-remove>&times;</button>
      </div>`;
    })
    .join('');
  totalEl.textContent = `total: ${formatRub(total)} rub`;

  rowsEl.querySelectorAll('[data-cart-row]').forEach((rowEl) => {
    const id = rowEl.dataset.cartRow;
    const cur = cart.find((r) => r.id === id).qty;
    rowEl.querySelector('[data-cart-inc]').addEventListener('click', () => setCartQty(id, cur + 1));
    rowEl.querySelector('[data-cart-dec]').addEventListener('click', () => setCartQty(id, cur - 1));
    rowEl.querySelector('[data-cart-remove]').addEventListener('click', () => removeFromCart(id));
  });
}

function renderCards(target, items, prefix) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  el.innerHTML = items.map((i) => cardMarkup(i, prefix)).join('');
  el.querySelectorAll('.card').forEach(attachScrub);
}

function sketchCardMarkup(prefix, sketch) {
  const p = prefix || '';
  const s = sketch || SKETCHES[0];
  return `
  <a class="sketch-card" href="${p}tattoo-item.html?id=${s.id}">
    <div class="sketch-card__frame">
      <img src="${p}${s.image}" alt="${s.caption}">
    </div>
    <div class="card__dots" aria-hidden="true"><span></span></div>
    <div class="sketch-card__date">${s.date}</div>
    <div class="sketch-card__caption">${s.caption}</div>
  </a>`;
}
