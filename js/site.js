/* Shared chrome: header, footer, product cards, scrub-through hover */

function headerMarkup(prefix) {
  const p = prefix || '';
  return `
  <a href="#" class="header__menu-toggle" data-menu-toggle>
    <img class="header__menu-toggle-icon" src="${p}assets/icons/menu-mobile.svg" alt="menu">
  </a>
  <a class="header__logo" href="${p}index.html">
    <img class="header__logo-full" src="${p}assets/logo.svg" alt="Artasimn">
    <img class="header__logo-mobile" src="${p}assets/logo-mobile.svg" alt="Artasimn">
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
    <a class="header__tattoo-office" href="https://tattoo-office.com" target="_blank" rel="noopener">tattoo office</a>
    <a class="header__cart" href="#" data-cart-open>
      <span class="header__cart-text">cart</span>
      <img class="header__cart-icon" src="${p}assets/icons/cart-mobile.svg" alt="cart">
    </a>
  </div>
  <div class="mobile-menu">
    <div class="mobile-menu__bar">
      <a href="#" class="mobile-menu__close" data-menu-toggle>close</a>
    </div>
    <nav class="mobile-menu__links">
      <a href="${p}index.html?cat=garment">garment</a>
      <a href="${p}index.html?cat=jewellery">jewellery</a>
      <a href="https://artasimn-department.com" target="_blank" rel="noopener">a.dept</a>
      <a href="${p}tattoo.html">tattoo</a>
      <a href="#" data-cart-open data-mobile-menu-cart>cart</a>
    </nav>
  </div>`;
}

/* mobile/tablet only: "menu" opens a full-screen overlay panel (close
   top-right, links right-aligned below) instead of the desktop dropdown
   — see the ≤980px breakpoint in style.css */
function initMobileMenuToggle() {
  const toggles = document.querySelectorAll('[data-menu-toggle]');
  const header = document.querySelector('.header');
  if (!toggles.length || !header) return;
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.toggle('nav-open');
    });
  });
  const cartLink = header.querySelector('[data-mobile-menu-cart]');
  if (cartLink) {
    cartLink.addEventListener('click', () => header.classList.remove('nav-open'));
  }
}

/* Called on any page with a hero to float the header over — always
   safe to call unconditionally, on every viewport width, it works out
   the right rule itself on every scroll/resize instead of the caller
   having to branch on window.innerWidth up front (that branch used to
   live in each page's own script and only ran once at load, so it
   could get stuck on a stale answer):
   - desktop, .menu-strip present (index.html only): header stays a
     solid white bar while any part of the 4-photo strip is still
     visible (it's a busy multi-photo backdrop, needs the legibility),
     then goes transparent once fully scrolled past.
   - mobile/tablet (≤980px), .hero-mobile present: solid white bar
     only at rest, unscrolled (scrollY 0) — the moment any scrolling
     happens it drops the white backdrop for good (never comes back,
     even once scrolled well past the photo onto the catalogue), while
     its text/logo colour keeps adapting to what's under it: white
     while still over the photo, back to black once past it. Its
     centred overlay (wordmark or a category's small label) also fades
     out on the first bit of scroll.
   - desktop, no .menu-strip but .hero-mobile exists (a filtered
     category page, or tattoo.html): there's nothing to float over on
     this viewport, so this function leaves the header alone — it's up
     to the caller to decide the resting state there (index.html's
     filtered branch wants permanently transparent, like items.html;
     tattoo.html wants its old permanent solid bar, so it sets nothing). */
function initHeroHeader() {
  const header = document.querySelector('.header');
  const strip = document.querySelector('.menu-strip');
  const hero = document.querySelector('.hero-mobile');
  const heroOverlay = document.querySelector('.hero-mobile__logo, .hero-mobile__label');
  if (!header || (!strip && !hero)) return;

  const update = () => {
    const useHero = window.innerWidth <= 980 && hero;
    const target = useHero ? hero : strip;
    if (!target) return;
    // on mobile the hero and the menu-strip photo stack sit back to
    // back as one continuous photo backdrop — stay in the "over photo"
    // state until scrolled past both, not just the hero on its own
    const photoEdge = useHero && strip ? strip : target;
    const overHero = photoEdge.getBoundingClientRect().bottom > 0;

    if (useHero) {
      const scrolled = window.scrollY > 0;
      header.classList.toggle('is-transparent', scrolled);
      header.classList.toggle('is-inverted', scrolled && overHero);
      if (heroOverlay) heroOverlay.classList.toggle('is-hidden', window.scrollY > 40);
    } else {
      header.classList.toggle('is-transparent', !overHero);
      header.classList.remove('is-inverted');
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function footerMarkup() {
  return `
  <div class="footer__brand">artasimn</div>
  <p class="footer__disclaimer">All designs, apparel, jewelry, and tattoo flash presented on Artasimn.com are original creations&mdash;wearing them or booking a design may cause severe style upgrades and an unhealthy obsession with your own reflection.</p>
  <div class="footer__links">
    <a href="#">ОФЕРТА</a>
    <a href="#">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
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
  initMobileMenuToggle();
  mountCartDrawer(prefix);
  mountBackToTop();
}

function mountFooter() {
  const el = document.querySelector('.footer');
  if (el) el.innerHTML = footerMarkup();
}

/* Fixed corner "back to top" button, mobile and desktop alike — hidden
   at rest, fades in once scrolled past the top photo section (the
   hero/menu-strip on index.html; on pages with neither, past one
   viewport height instead). Mounted once per page alongside the
   header rather than per-page markup, since every page wants it. */
function mountBackToTop() {
  if (document.querySelector('.back-to-top')) return;
  const btn = document.createElement('a');
  btn.href = '#';
  btn.className = 'back-to-top';
  btn.textContent = 'наверх';
  document.body.appendChild(btn);

  const update = () => {
    // re-queried on every call (not captured once) since index.html and
    // tattoo.html remove their hero/menu-strip from the DOM after this
    // mounts, for a filtered category or the tattoo catalogue
    const strip = document.querySelector('.menu-strip');
    const hero = document.querySelector('.hero-mobile');
    let passed;
    if (hero || strip) {
      const useHero = window.innerWidth <= 980 && hero;
      const target = useHero && strip ? strip : useHero ? hero : strip;
      passed = target.getBoundingClientRect().bottom <= 0;
    } else {
      passed = window.scrollY > window.innerHeight * 0.6;
    }
    btn.classList.toggle('is-visible', passed);
  };
  // deferred: mountHeader (and this along with it) runs before the
  // page's own script fills in the menu-strip/hero content, so an
  // immediate call would measure them empty (0 height) and show the
  // button right at the top of the page
  requestAnimationFrame(update);
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
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

/* mobile/tablet-only homepage banner: assets/hero-mobile.png with the
   wordmark centred over it (see initHeroHeader for the scroll-driven
   header/overlay fade behaviour). Category/tattoo pages used to get
   their own full-screen intro photo here too; that's gone now, so
   this only ever mounts on the homepage. */
function heroMobileMarkup(prefix) {
  const p = prefix || '';
  return `
  <img class="hero-mobile__img" src="${p}assets/hero-mobile.png" alt="Artasimn">
  <div class="hero-mobile__logo"><img src="${p}assets/logo.svg" alt="Artasimn"></div>`;
}

function mountHeroMobile(prefix) {
  const el = document.querySelector('.hero-mobile');
  if (el) el.innerHTML = heroMobileMarkup(prefix);
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

/* Shared touch behaviour for any multi-image gallery on a small
   screen: a horizontal swipe steps through the photos (a vertical
   swipe is left alone so the page still scrolls normally); a plain
   tap on the left or right third also steps through, same as the
   arrows on a carousel; a tap on the centre third calls onCenterTap —
   used to open the lightbox on the product page. Pass null there (as
   the product cards do) to leave the centre third's default action
   (the card's own link) alone. Used by attachScrub below and by
   product.html's own main image. */
function attachTouchImageNav(el, count, getCurrent, onShow, onCenterTap) {
  if (count < 1) return;
  let touchX = 0;
  let touchY = 0;
  let swiping = false;

  el.addEventListener(
    'touchstart',
    (e) => {
      const t = e.touches[0];
      touchX = t.clientX;
      touchY = t.clientY;
      swiping = false;
    },
    { passive: true }
  );

  el.addEventListener(
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

  el.addEventListener(
    'touchend',
    (e) => {
      const t = e.changedTouches[0];
      if (swiping && count > 1) {
        const dx = t.clientX - touchX;
        const threshold = 24;
        const current = getCurrent();
        if (dx <= -threshold) onShow((current + 1) % count);
        else if (dx >= threshold) onShow((current - 1 + count) % count);
        e.preventDefault();
        return;
      }
      if (count > 1) {
        const rect = el.getBoundingClientRect();
        const fraction = (t.clientX - rect.left) / rect.width;
        if (fraction < 1 / 3) {
          onShow((getCurrent() - 1 + count) % count);
          e.preventDefault();
          return;
        }
        if (fraction > 2 / 3) {
          onShow((getCurrent() + 1) % count);
          e.preventDefault();
          return;
        }
      }
      if (onCenterTap) {
        onCenterTap();
        e.preventDefault();
      }
    },
    { passive: false }
  );
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

  /* mobile: swipe or tap the left/right third to step through photos;
     a tap on the centre third is left alone, so the card's own link
     still navigates to the product page normally */
  attachTouchImageNav(frame, imgs.length, () => current, show, null);
}

/* Collapsible DESCRIPTION / DELIVERY sections on product & tattoo pages */
const CHEVRON_SVG =
  '<svg width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M1 1L4.5 4.5L8 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function accordionMarkup(label, bodyHtml, openByDefault) {
  return `
  <div class="accordion${openByDefault ? ' is-open' : ''}">
    <button class="accordion__toggle" type="button">
      <span class="accordion__caret">${CHEVRON_SVG}</span>${label}
    </button>
    <div class="accordion__body"><div class="accordion__body-inner">${bodyHtml}</div></div>
  </div>`;
}

function initAccordions(root) {
  (root || document).querySelectorAll('.accordion__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.accordion').classList.toggle('is-open');
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

  // clicking a year jumps straight to that year's first sketch, clear
  // of the fixed header
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      const targetY = markers[i].getBoundingClientRect().top + window.scrollY - headerH - 10;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    });
  });
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
      <span class="cart-drawer__title" data-cart-title>your order:</span>
      <a href="#" data-cart-close>close</a>
    </div>
    <div class="cart-drawer__rows" data-cart-rows></div>
    <div class="cart-drawer__checkout" data-cart-checkout>
      <div class="cart-drawer__fields">
        <label class="cart-drawer__field">
          <span>full name</span>
          <input type="text" placeholder="Ivanov Ivan Ivanovich">
        </label>
        <label class="cart-drawer__field">
          <span>phone</span>
          <input type="text" placeholder="+1 000 00 00 000">
        </label>
        <label class="cart-drawer__field">
          <span>e-mail</span>
          <input type="text" placeholder="example@mail.ru">
        </label>
        <label class="cart-drawer__field">
          <span>adress</span>
          <input type="text" placeholder="full adress, zip-code">
        </label>
      </div>
      <div class="cart-drawer__delivery">
        <div class="cart-drawer__delivery-title">delivery:</div>
        <label class="cart-drawer__check"><input type="checkbox">по москве (в пределах мкад)</label>
        <label class="cart-drawer__check"><input type="checkbox">по россии + мск (за мкад)</label>
        <label class="cart-drawer__check"><input type="checkbox">worldwide</label>
      </div>
      <div class="cart-drawer__agree">
        <label class="cart-drawer__check"><input type="checkbox">я согласен на обработку персональных данных</label>
        <div class="cart-drawer__promo">
          <span>promo code:</span>
          <input type="text">
        </div>
      </div>
    </div>
    <div class="cart-drawer__foot">
      <span data-cart-total></span>
      <a href="#" class="cart-drawer__order" data-cart-order>order</a>
      <a href="#" class="cart-drawer__buy" data-cart-buy>submit order/buy</a>
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
  el.querySelector('[data-cart-order]').addEventListener('click', (e) => {
    e.preventDefault();
    el.classList.add('is-checkout');
  });
  el.querySelector('[data-cart-buy]').addEventListener('click', (e) => {
    e.preventDefault();
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
  if (el) el.classList.remove('is-open', 'is-checkout');
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

/* ===========================================================
   LIGHTBOX — full-screen viewer for the product/sketch main image.
   Click/tap the image to zoom in (centred on where you clicked), drag
   to pan while zoomed, click again to zoom back out. Pinch-to-zoom on
   touch works too, since it's the same zoomed state driven by scale
   distance instead of a click point.
   =========================================================== */
const lightboxState = { images: [], index: 0, alt: '' };
const zoomState = { zoomed: false, scale: 1, x: 0, y: 0, panning: false, startX: 0, startY: 0, pinchDist: 0 };

function mountLightbox() {
  if (document.querySelector('.lightbox')) return;
  const el = document.createElement('div');
  el.className = 'lightbox';
  el.innerHTML = `
    <a href="#" class="lightbox__close" data-lightbox-close>close</a>
    <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="previous">${CHEVRON_SVG}</button>
    <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="next">${CHEVRON_SVG}</button>
    <div class="lightbox__frame"><img class="lightbox__img" alt=""></div>
    <div class="product__dots lightbox__dots"></div>`;
  document.body.appendChild(el);

  const frame = el.querySelector('.lightbox__frame');
  const img = el.querySelector('.lightbox__img');

  el.querySelector('[data-lightbox-close]').addEventListener('click', (e) => {
    e.preventDefault();
    closeLightbox();
  });
  el.addEventListener('click', (e) => {
    if (e.target === el || e.target === frame) closeLightbox();
  });
  el.querySelector('[data-lightbox-prev]').addEventListener('click', () => lightboxStep(-1));
  el.querySelector('[data-lightbox-next]').addEventListener('click', () => lightboxStep(1));
  el.querySelector('.lightbox__dots').addEventListener('click', (e) => {
    const dots = Array.from(el.querySelectorAll('.lightbox__dots span'));
    const i = dots.indexOf(e.target);
    if (i > -1) {
      lightboxState.index = i;
      renderLightbox();
    }
  });
  window.addEventListener('keydown', (e) => {
    if (!el.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxStep(-1);
    if (e.key === 'ArrowRight') lightboxStep(1);
  });

  const applyZoom = () => {
    img.style.transition = zoomState.panning ? 'none' : 'transform .2s ease';
    img.style.transform = zoomState.zoomed
      ? `scale(${zoomState.scale}) translate(${zoomState.x}px, ${zoomState.y}px)`
      : 'none';
    frame.classList.toggle('is-zoomed', zoomState.zoomed);
  };

  img.addEventListener('click', (e) => {
    e.stopPropagation();
    if (zoomState.panning) return;
    if (!zoomState.zoomed) {
      const rect = img.getBoundingClientRect();
      zoomState.zoomed = true;
      zoomState.scale = 2.4;
      zoomState.x = (rect.width / 2 - (e.clientX - rect.left)) / zoomState.scale;
      zoomState.y = (rect.height / 2 - (e.clientY - rect.top)) / zoomState.scale;
    } else {
      zoomState.zoomed = false;
      zoomState.scale = 1;
      zoomState.x = 0;
      zoomState.y = 0;
    }
    applyZoom();
  });

  img.addEventListener('mousedown', (e) => {
    if (!zoomState.zoomed) return;
    zoomState.panning = true;
    zoomState.startX = e.clientX;
    zoomState.startY = e.clientY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!zoomState.panning) return;
    zoomState.x += (e.clientX - zoomState.startX) / zoomState.scale;
    zoomState.y += (e.clientY - zoomState.startY) / zoomState.scale;
    zoomState.startX = e.clientX;
    zoomState.startY = e.clientY;
    applyZoom();
  });
  window.addEventListener('mouseup', () => {
    zoomState.panning = false;
  });

  /* touch: pinch with two fingers to zoom, drag with one finger to pan
     while already zoomed */
  img.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 2) {
        const [a, b] = e.touches;
        zoomState.pinchDist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      } else if (e.touches.length === 1 && zoomState.zoomed) {
        zoomState.panning = true;
        zoomState.startX = e.touches[0].clientX;
        zoomState.startY = e.touches[0].clientY;
      }
    },
    { passive: true }
  );
  img.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length === 2) {
        const [a, b] = e.touches;
        const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        const delta = dist / zoomState.pinchDist;
        zoomState.pinchDist = dist;
        zoomState.scale = Math.min(4, Math.max(1, zoomState.scale * delta));
        zoomState.zoomed = zoomState.scale > 1;
        applyZoom();
      } else if (e.touches.length === 1 && zoomState.panning) {
        const t = e.touches[0];
        zoomState.x += (t.clientX - zoomState.startX) / zoomState.scale;
        zoomState.y += (t.clientY - zoomState.startY) / zoomState.scale;
        zoomState.startX = t.clientX;
        zoomState.startY = t.clientY;
        applyZoom();
      }
    },
    { passive: true }
  );
  img.addEventListener(
    'touchend',
    (e) => {
      zoomState.panning = false;
      if (e.touches.length === 0 && zoomState.scale <= 1) {
        zoomState.zoomed = false;
        zoomState.scale = 1;
        zoomState.x = 0;
        zoomState.y = 0;
        applyZoom();
      }
    },
    { passive: true }
  );
}

function resetZoom() {
  zoomState.zoomed = false;
  zoomState.scale = 1;
  zoomState.x = 0;
  zoomState.y = 0;
  zoomState.panning = false;
  const img = document.querySelector('.lightbox__img');
  if (img) img.style.transform = 'none';
  const frame = document.querySelector('.lightbox__frame');
  if (frame) frame.classList.remove('is-zoomed');
}

function renderLightbox() {
  const el = document.querySelector('.lightbox');
  if (!el) return;
  resetZoom();
  const { images, index, alt } = lightboxState;
  const img = el.querySelector('.lightbox__img');
  img.src = images[index];
  img.alt = alt;
  const multi = images.length > 1;
  el.classList.toggle('lightbox--single', !multi);
  el.querySelector('.lightbox__dots').innerHTML = multi
    ? images.map((_, i) => `<span${i === index ? ' class="is-active"' : ''}></span>`).join('')
    : '';
}

function lightboxStep(delta) {
  const n = lightboxState.images.length;
  lightboxState.index = (lightboxState.index + delta + n) % n;
  renderLightbox();
}

function openLightbox(images, startIndex, alt) {
  mountLightbox();
  lightboxState.images = images;
  lightboxState.index = startIndex || 0;
  lightboxState.alt = alt || '';
  renderLightbox();
  document.querySelector('.lightbox').classList.add('is-open');
}

function closeLightbox() {
  const el = document.querySelector('.lightbox');
  if (el) el.classList.remove('is-open');
}
