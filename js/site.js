/* Shared chrome: header, footer, product cards, scrub-through hover */

/* three-bar menu icon that morphs into an × via CSS (see .header.nav-open
   in style.css) — no image asset, bars are just background:currentColor
   so they automatically match the header's ink/inverted colour */
function hamburgerMarkup() {
  return `<span class="hamburger" aria-hidden="true">
    <span class="hamburger__bar"></span>
    <span class="hamburger__bar"></span>
    <span class="hamburger__bar"></span>
  </span>`;
}

/* shopping-bag / × pair, crossfading based on body.cart-open (set by
   openCartDrawer/closeCartDrawer) — same morph idea as the hamburger
   above. The bag is the site's original cart glyph (assets/icons/
   cart-mobile.svg), inlined here (instead of an <img src>) and
   recoloured to currentColor so it can follow the header's colour and
   take part in the crossfade the way an external image asset can't */
function cartIconMarkup() {
  return `<span class="icon-toggle" aria-hidden="true">
    <svg class="icon-toggle__a" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.60426 13.3291C9.15644 13.3292 9.60426 13.7768 9.60426 14.3291V16.9941C9.60425 17.5463 9.15643 17.994 8.60426 17.9941C8.05211 17.994 7.60428 17.5463 7.60426 16.9941V14.3291C7.60426 13.7769 8.0521 13.3292 8.60426 13.3291Z"></path>
      <path d="M15.3943 13.3291C15.9465 13.3292 16.3943 13.7768 16.3943 14.3291V16.9941C16.3943 17.5463 15.9465 17.994 15.3943 17.9941C14.8422 17.9939 14.3943 17.5462 14.3943 16.9941V14.3291C14.3943 13.7769 14.8422 13.3293 15.3943 13.3291Z"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7703 0.129834C14.2509 -0.142097 14.8615 0.0271907 15.1336 0.507764L19.3728 7.998H21.8689C22.222 7.99819 22.5629 8.09309 22.8631 8.26558C23.1619 8.43739 23.4085 8.67895 23.5935 8.95796C23.7782 9.23654 23.9001 9.55116 23.9588 9.87593C24.0174 10.201 24.0125 10.537 23.9441 10.8603L21.8953 20.5146C21.7339 21.275 21.3554 21.9787 20.7908 22.498C20.2228 23.0203 19.4955 23.3269 18.7215 23.3271H5.27809C4.50414 23.3268 3.77668 23.0203 3.20876 22.498C2.6442 21.9787 2.26664 21.275 2.10524 20.5146L0.0554365 10.8632L0.0163739 10.6181C-0.0113688 10.3719 -0.00405279 10.1219 0.0398115 9.87788C0.0982782 9.5526 0.221165 9.23797 0.406022 8.95894C0.591038 8.67973 0.837525 8.43849 1.13649 8.26655C1.43688 8.09391 1.7782 7.99801 2.13161 7.998H4.62673L8.86598 0.507764C9.13806 0.0271949 9.74866 -0.142211 10.2293 0.129834C10.7094 0.402 10.8779 1.01175 10.6062 1.49214L6.92458 7.998H17.075L13.3924 1.49214C13.1207 1.01165 13.29 0.401848 13.7703 0.129834ZM2.13356 9.99995C2.12353 10.0057 2.09956 10.0234 2.07301 10.0634C2.04633 10.1037 2.02134 10.1605 2.00856 10.2314C1.99583 10.3022 1.9968 10.3769 2.01149 10.4462L4.0613 20.0996C4.1447 20.4925 4.33229 20.8139 4.56325 21.0263C4.79066 21.2353 5.04398 21.3271 5.27907 21.3271H18.7205C18.9557 21.327 19.2098 21.2355 19.4373 21.0263C19.6682 20.8139 19.8549 20.4924 19.9382 20.0996L21.9881 10.4453C22.0026 10.3761 22.0037 10.302 21.991 10.2314C21.9782 10.1606 21.9532 10.1037 21.9265 10.0634C21.9001 10.0236 21.8761 10.0058 21.866 9.99995C21.8645 9.99909 21.863 9.99844 21.8621 9.998H2.13747C2.13653 9.99844 2.1351 9.99908 2.13356 9.99995Z"></path>
    </svg>
    <svg class="icon-toggle__b" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </span>`;
}

function headerMarkup(prefix) {
  const p = prefix || '';
  return `
  <a href="#" class="header__menu-toggle" data-menu-toggle>
    ${hamburgerMarkup()}
  </a>
  <a class="header__logo" href="${p}index.html">
    <img class="header__logo-full" src="${p}assets/logo.svg" alt="Artasimn">
    <img class="header__logo-mobile" src="${p}assets/logo-mobile.svg" alt="Artasimn">
  </a>
  <nav class="nav">
    <a class="nav-items" href="${p}items.html"><span class="nav-label">all items</span><span class="header-icon-box"><img class="header-icon header-icon--mark" src="${p}assets/logo-mobile.svg" alt=""></span><span class="nav-items__colon">:</span></a>
    <span class="nav-swap">
      <a class="nav-swap__default" href="${p}about.html"><span class="nav-label">about</span><span class="header-icon-box"><img class="header-icon" src="${p}assets/menu-icons/about.svg" alt=""></span></a>
      <a class="nav-swap__hover" href="${p}index.html?cat=garment"><span class="nav-label">garment</span><span class="header-icon-box"><img class="header-icon" src="${p}assets/menu-icons/garment.svg" alt=""></span></a>
    </span>
    <span class="nav-swap">
      <a class="nav-swap__default" href="${p}tattoo.html"><span class="nav-label">tattoo</span><span class="header-icon-box"><img class="header-icon" src="${p}assets/menu-icons/tattoo.svg" alt=""></span></a>
      <a class="nav-swap__hover" href="${p}index.html?cat=jewellery"><span class="nav-label">jewellery</span><span class="header-icon-box"><img class="header-icon" src="${p}assets/menu-icons/jewellery.svg" alt=""></span></a>
    </span>
  </nav>
  <div class="header__spacer"></div>
  <div class="header__right">
    <div class="header__right-group">
      <a href="${p}adept.html"><span class="nav-label">a.dept</span><span class="header-icon-box"><img class="header-icon" src="${p}assets/menu-icons/adept.svg" alt=""></span></a>
      <a class="header__tattoo-office" href="https://tattoo-office.com" target="_blank" rel="noopener"><span class="nav-label">tattoo office</span><span class="header-icon-box"><img class="header-icon" src="${p}assets/menu-icons/tattoo-office.svg" alt=""></span></a>
    </div>
    <a class="header__cart" href="#" data-cart-open>
      <span class="header__cart-text nav-label">cart</span>
      <span class="header-icon-box"><img class="header-icon" src="${p}assets/menu-icons/cart.svg" alt=""></span>
      ${cartIconMarkup()}
    </a>
  </div>
  <div class="mobile-menu">
    <nav class="mobile-menu__links">
      <a class="mobile-menu__link" href="${p}index.html">
        <span>home</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/home.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="${p}about.html">
        <span>about</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/about.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="${p}items.html">
        <span>all items</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon mobile-menu__icon--mark" src="${p}assets/logo-mobile.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="${p}index.html?cat=garment">
        <span>garment</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/garment.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="${p}index.html?cat=jewellery">
        <span>jewellery</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/jewellery.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="${p}tattoo.html">
        <span>tattoo</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/tattoo.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="${p}adept.html">
        <span>a.dept</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/adept.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="https://tattoo-office.com" target="_blank" rel="noopener">
        <span>tattoo office</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/tattoo-office.svg" alt=""></span>
      </a>
      <a class="mobile-menu__link" href="#" data-cart-open data-mobile-menu-cart>
        <span>cart</span>
        <span class="mobile-menu__icon-box"><img class="mobile-menu__icon" src="${p}assets/menu-icons/cart.svg" alt=""></span>
      </a>
    </nav>
    <p class="mobile-menu__disclaimer">All designs, apparel, jewelry, and tattoo flash presented on Artasimn.com are original creations&mdash;wearing them or booking a design may cause severe style upgrades and an unhealthy obsession with your own reflection.</p>
  </div>`;
}

/* a.dept's own header — reused as-is on adept.html and on a.dept product
   pages, instead of the site's usual logo/nav header */
function adeptHeaderMarkup(prefix) {
  const p = prefix || '';
  return `
  <a class="adept__back" href="${p}index.html">back</a>
  <a class="adept__logo" href="${p}index.html">
    <img class="adept__logo-full" src="${p}assets/adept/logo-adept.svg" alt="A.DEPT">
    <img class="adept__logo-mobile" src="${p}assets/adept/favicon-adept.svg" alt="A.DEPT">
  </a>
  <div class="adept__brand">artasimn.department</div>
  <div class="adept__links">
    <a class="adept__tattoo-office" href="https://tattoo-office.com" target="_blank" rel="noopener">tattoo office</a>
    <a class="adept__cart" href="#" data-cart-open>
      <span class="adept__cart-text">cart</span>
      ${cartIconMarkup()}
    </a>
  </div>`;
}

function mountAdeptHeader(prefix) {
  const el = document.querySelector('header');
  if (el) {
    el.className = 'adept__header';
    el.innerHTML = adeptHeaderMarkup(prefix);
  }
  mountCartDrawer(prefix);
  mountBackToTop();
  mountSitePopups();
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
      // no white backdrop at rest at all, on any hero-mobile page —
      // transparent + white icons the whole time the photo is on
      // screen, solid again once scrolled past it
      header.classList.toggle('is-transparent', overHero);
      header.classList.toggle('is-inverted', overHero);
      if (heroOverlay) heroOverlay.classList.toggle('is-hidden', window.scrollY > 40);
    } else {
      header.classList.toggle('is-transparent', !overHero);
      header.classList.remove('is-inverted');
      // once the menu-strip photo block has fully scrolled past, drop
      // the nav/header link labels down to just their icon-boxes
      header.classList.toggle('nav-compact', !overHero);
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* desktop-only in effect (mobile forces the header transparent
   unconditionally via its own !important rule regardless of this
   class) — for pages that start transparent to float over a photo
   sitting directly under the header (items.html's/tattoo.html's own
   catalogue grid, product.html/tattoo-item.html's own main image):
   staying transparent for the rest of the scroll let the page's own
   text scroll up underneath and visually collide with the nav labels,
   making them unreadable. This drops back to solid the moment you
   scroll at all, restoring transparency only back at the very top. */
function initSolidHeaderOnScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  const update = () => header.classList.toggle('is-transparent', window.scrollY <= 0);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* mobile/tablet-only: the hero photo and each menu-strip tile scale
   up within their own clipped frame as they scroll past — resting at
   their normal size while fully in view, growing as each one scrolls
   up and out from under the fixed header. Desktop doesn't get this;
   its menu-strip tiles already have their own hover-triggered scale
   instead (see @media (hover: hover) in style.css). */
function initHeroScrollZoom() {
  if (window.innerWidth > 980) return;
  const targets = [];
  const heroImg = document.querySelector('.hero-mobile__img');
  if (heroImg) targets.push({ el: heroImg, base: 1, max: 0.15 });
  document.querySelectorAll('.menu-tile img').forEach((img) => {
    targets.push({ el: img, base: 1.02, max: 0.13 });
  });
  if (!targets.length) return;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  let ticking = false;
  const update = () => {
    targets.forEach(({ el, base, max }) => {
      const progress = clamp(-el.getBoundingClientRect().top / window.innerHeight, 0, 1);
      el.style.transform = `scale(${base + progress * max})`;
    });
    ticking = false;
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
}

function footerMarkup(brand) {
  return `
  <div class="footer__brand">${brand || 'artasimn'}</div>
  <p class="footer__disclaimer">All designs, apparel, jewelry, and tattoo flash presented on Artasimn.com are original creations&mdash;wearing them or booking a design may cause severe style upgrades and an unhealthy obsession with your own reflection.</p>
  <div class="footer__links">
    <a href="privacy.html">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
    <a href="#">ОФЕРТА</a>
    <a href="about.html">ИНФО</a>
  </div>
  <div class="footer__social">
    <a class="footer-icon-box" href="https://tattoo-office.com" target="_blank" rel="noopener" aria-label="Tattoo Office"><span class="footer-icon footer-icon--office"></span><span class="footer-social-label">T.office</span></a>
    <a class="footer-icon-box" href="https://youtube.com/@artasimn?si=-V3yI6vsKQR3cw7G" target="_blank" rel="noopener" aria-label="YouTube"><span class="footer-icon footer-icon--youtube"></span><span class="footer-social-label">YouTube</span></a>
    <a class="footer-icon-box" href="https://t.me/artasimn" target="_blank" rel="noopener" aria-label="Telegram"><span class="footer-icon footer-icon--telegram"></span><span class="footer-social-label">Telegram</span></a>
    <a class="footer-icon-box" href="https://www.instagram.com/artasimn?igsi=MTFwZTJienB4aXpxaA%3D%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram"><span class="footer-icon footer-icon--instagram"></span><span class="footer-social-label">Instagram</span></a>
    <a class="footer-icon-box" href="index.html" aria-label="Artasimn.com"><span class="footer-icon footer-icon--artasimn"></span><span class="footer-social-label">Artasimn.com</span></a>
    <a class="footer-icon-box" href="https://www.tiktok.com/@avemariaavemariaavemaria?_r=1&_t=ZG-994LA8NAvGy" target="_blank" rel="noopener" aria-label="TikTok"><span class="footer-icon footer-icon--tiktok"></span><span class="footer-social-label">TikTok</span></a>
  </div>`;
}

/* hovering "all items" reveals garment/jewellery to its right (see
   .nav-items-reveal in style.css) — a short grace period on leaving
   "all items" keeps it open long enough for the pointer to reach the
   revealed links without it collapsing mid-travel. */
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
  mountSitePopups();
}

function mountFooter(brand) {
  const el = document.querySelector('.footer');
  if (el) el.innerHTML = footerMarkup(brand);
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

/* Cookie notice (bottom-right, shown immediately) and the newsletter
   signup modal (shown 20s after the page loads) — both site-wide,
   both gated on their own localStorage flag so each only ever
   appears once per visitor, on whichever page they land on first. */
const COOKIE_NOTICE_KEY = 'artasimn-cookie-notice-dismissed';
const NEWSLETTER_KEY = 'artasimn-newsletter-dismissed';
const CLOSE_SVG =
  '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

function mountSitePopups() {
  if (!localStorage.getItem(COOKIE_NOTICE_KEY)) {
    const el = document.createElement('div');
    el.className = 'cookie-notice';
    el.innerHTML = `
      <span>Сайт использует cookie-файлы</span>
      <button type="button" data-cookie-ok>OK</button>`;
    document.body.appendChild(el);
    el.querySelector('[data-cookie-ok]').addEventListener('click', () => {
      localStorage.setItem(COOKIE_NOTICE_KEY, '1');
      el.remove();
    });
  }

  if (!localStorage.getItem(NEWSLETTER_KEY)) {
    setTimeout(() => {
      // the flag could have been set by another tab, or the visitor
      // could have already navigated to a second page, in the 20s
      // this was waiting — re-check right before actually showing it
      if (localStorage.getItem(NEWSLETTER_KEY)) return;
      const el = document.createElement('div');
      el.className = 'newsletter';
      el.innerHTML = `
        <div class="newsletter__box">
          <button type="button" class="newsletter__close" data-newsletter-close>close <span class="newsletter__close-icon">${CLOSE_SVG}</span></button>
          <p class="newsletter__text">Подпишись на рассылку, — получи скидку 5% на весь ассортимент, уведомления о новых позициях, акциях и тд.</p>
          <form class="newsletter__form" data-newsletter-form>
            <input type="text" name="name" placeholder="имя" required>
            <input type="email" name="email" placeholder="e-mail" required>
            <label class="newsletter__agree">
              <input type="checkbox" required>
              <span>Я согласен с <a href="privacy.html" target="_blank" rel="noopener">политикой конфиденциальности</a> сайта и сбором моих данных</span>
            </label>
            <button type="submit">Подписаться</button>
          </form>
        </div>`;
      document.body.appendChild(el);

      const dismiss = () => {
        localStorage.setItem(NEWSLETTER_KEY, '1');
        el.remove();
      };
      el.querySelector('[data-newsletter-close]').addEventListener('click', dismiss);
      el.addEventListener('click', (e) => {
        if (e.target === el) dismiss();
      });
      el.querySelector('[data-newsletter-form]').addEventListener('submit', (e) => {
        e.preventDefault();
        dismiss();
      });
      requestAnimationFrame(() => el.classList.add('is-open'));
    }, 20000);
  }
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
function heroMobileMarkup(prefix, opts) {
  const p = prefix || '';
  const o = opts || {};
  const overlay = o.label
    ? `<h1 class="hero-mobile__label">${o.label}</h1>`
    : `<div class="hero-mobile__logo"><img src="${p}assets/logo.svg" alt="Artasimn"></div>`;
  return `
  <img class="hero-mobile__img" src="${p}${o.img || 'assets/hero-mobile.png'}" alt="">
  ${overlay}`;
}

function mountHeroMobile(prefix, opts) {
  const el = document.querySelector('.hero-mobile');
  if (el) el.innerHTML = heroMobileMarkup(prefix, opts);
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
  // the wrapper is always rendered — even with no dots inside for a
  // single-image product — so it reserves the same bit of vertical
  // space every card gets between the frame and its title, whether or
  // not there's anything to show there. That keeps title/price level
  // with a sketch card's date/caption sitting next to it in the same
  // row, which reserves the identical space for the same reason,
  // regardless of how many images either one has
  const dots =
    item.images.length > 1
      ? item.images.map((_, i) => `<span${i === 0 ? ' class="is-active"' : ''}></span>`).join('')
      : '';
  return `
  <a class="card" href="${p}product.html?id=${item.id}" data-card>
    <div class="card__frame">${imgs}</div>
    <div class="card__dots">${dots}</div>
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

/* about.html's Works entries — clicking a grid thumbnail swaps the
   hero photo on the left, same mechanic as the product page's own
   thumbnail row. Only entries with real <img> thumbnails wire up
   (still-placeholder entries have no img to click). */
function initWorkGalleries() {
  document.querySelectorAll('.work').forEach((work) => {
    const hero = work.querySelector('.about-figure img');
    const thumbs = work.querySelectorAll('.work__grid img');
    if (!hero || !thumbs.length) return;
    // the full case, in the same order the grid reads (hero first,
    // then each thumbnail) — what the lightbox steps through
    const allSrcs = [hero.src, ...Array.from(thumbs, (t) => t.src)];

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        hero.src = thumb.src;
        hero.alt = thumb.alt;
        thumbs.forEach((t) => t.classList.toggle('is-active', t === thumb));
      });
    });

    // clicking the hero photo itself opens the full case fullscreen,
    // same as the product page's own main-image click — starting on
    // whichever photo is currently shown as the hero
    hero.addEventListener('click', () => {
      const startIndex = allSrcs.indexOf(hero.src);
      openLightbox(allSrcs, startIndex < 0 ? 0 : startIndex, hero.alt);
    });
  });
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
  if (!items.length) return;

  const header = document.querySelector('.header');
  const restBottomMargin = 40;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  // each year's cards are grouped in the DOM, but the two-column
  // masonry (.sketch-grid) reflows them across columns to fill gaps —
  // a single marker element's own rendered position is no longer a
  // reliable stand-in for "where this year starts" once that
  // happens, so every card is read instead and each year's boundary
  // is the topmost of its own cards, whichever column it landed in
  const cardsByYear = years.map((y) =>
    Array.from(document.querySelectorAll(`.sketch-card[data-year="${y}"]`))
  );
  if (cardsByYear.some((c) => !c.length)) return;
  const topOf = (cards, scrollY) =>
    Math.min(...cards.map((c) => c.getBoundingClientRect().top + scrollY));

  const update = () => {
    // measured live, not hardcoded: the header's own height differs
    // between the desktop and mobile layouts, and an item's rendered
    // size differs between desktop's horizontal text and mobile's
    // vertical (writing-mode: vertical-rl) text — a fixed gap tuned
    // for one would either leave a gap or overlap items in the other
    const headerH = header ? header.getBoundingClientRect().height : 58;
    const itemSize = items[0].getBoundingClientRect().height || 26;
    const dockGap = itemSize + 10;
    const restGap = dockGap;

    const scrollY = window.scrollY;
    const pageBottom = document.body.scrollHeight;
    const restBase = window.innerHeight - restBottomMargin;

    years.forEach((year, i) => {
      const startY = topOf(cardsByYear[i], scrollY);
      const endY = i + 1 < years.length ? topOf(cardsByYear[i + 1], scrollY) : pageBottom;
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
      const headerH = header ? header.getBoundingClientRect().height : 58;
      const targetY = topOf(cardsByYear[i], window.scrollY) - headerH - 10;
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
        <div class="cart-drawer__promo">
          <span>promo code:</span>
          <input type="text">
        </div>
        <label class="cart-drawer__check">
          <input type="checkbox">
          <span>я согласен на <a href="${p}privacy.html" class="cart-drawer__policy-link" data-policy-link>обработку персональных данных</a></span>
        </label>
      </div>
    </div>
    <div class="cart-drawer__foot">
      <span data-cart-total></span>
      <a href="#" class="cart-drawer__order" data-cart-order>order
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
          <line x1="2" x2="22" y1="10" y2="10"></line>
        </svg>
      </a>
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

  // preventDefault here also stops the surrounding <label>'s own
  // click handling from toggling the checkbox — without it, clicking
  // the link would silently check the box too. That means the
  // default navigation is blocked along with it, so this opens the
  // policy page itself, in a new tab so the in-progress order isn't
  // lost.
  el.querySelector('[data-policy-link]').addEventListener('click', (e) => {
    e.preventDefault();
    window.open(e.currentTarget.href, '_blank', 'noopener');
  });

  // the sample values are placeholder text, not real defaults — clear
  // as soon as the field is focused instead of waiting for the first
  // keystroke, so nothing has to be typed over/deleted first
  el.querySelectorAll('.cart-drawer__field input[placeholder]').forEach((input) => {
    const sample = input.placeholder;
    input.addEventListener('focus', () => {
      input.placeholder = '';
    });
    input.addEventListener('blur', () => {
      if (!input.value) input.placeholder = sample;
    });
  });

  renderCartDrawer(p);
}

function openCartDrawer() {
  const el = document.querySelector('.cart-drawer');
  if (el) el.classList.add('is-open');
  document.body.classList.add('cart-open');
}

function closeCartDrawer() {
  const el = document.querySelector('.cart-drawer');
  if (el) el.classList.remove('is-open', 'is-checkout');
  document.body.classList.remove('cart-open');
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
      const item = PRODUCTS.find((i) => i.id === row.id) || ADEPT_PRODUCTS.find((i) => i.id === row.id);
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

/* number, when given, replaces the date/caption pair with a plain
   sequential "01"/"02" label — used by tattoo.html's mobile masonry
   feed, where the catalogue is just numbered, not dated */
function sketchCardMarkup(prefix, sketch, number) {
  const p = prefix || '';
  const s = sketch || SKETCHES[0];
  const meta = number
    ? `<div class="sketch-card__number">${String(number).padStart(2, '0')}</div>`
    : `<div class="sketch-card__date">${s.date}</div>
       <div class="sketch-card__caption">${s.caption}</div>`;
  return `
  <a class="sketch-card" href="${p}tattoo-item.html?id=${s.id}">
    <div class="sketch-card__frame">
      <img src="${p}${s.image}" alt="${s.caption}">
    </div>
    <div class="card__dots"></div>
    ${meta}
  </a>`;
}

/* tattoo.html desktop: waterfall two-column masonry. cards is an
   array of already-built .sketch-card elements, in the order they
   should read (chronological, newest year first, same as the DOM
   order everywhere else on the site). They're staged into the first
   column so every one renders at the real column width before its
   height is measured (with a fixed aspect-ratio image and .card__dots/
   caption below it, height depends on layout width, not just the
   image's own intrinsic size) — only once every image has actually
   loaded (a not-yet-loaded image reports 0 height, since the frame
   takes its size from the image) are they redistributed, each into
   whichever column is currently shortest. That keeps a later card
   from ever landing above an earlier one in the other column, unlike
   CSS multi-column's own balance-by-total-height algorithm. Calls
   onSettled() once the real layout is in place, since anything that
   measures card position (initYearScrollspy) needs to run after it. */
function layoutSketchMasonry(container, cards, onSettled) {
  const cols = [document.createElement('div'), document.createElement('div')];
  cols.forEach((c) => (c.className = 'sketch-masonry__col'));
  container.innerHTML = '';
  cols.forEach((c) => container.appendChild(c));
  cards.forEach((c) => cols[0].appendChild(c));

  const settle = () => {
    const heights = [0, 0];
    cards.forEach((card) => {
      const h = card.getBoundingClientRect().height;
      const target = heights[0] <= heights[1] ? 0 : 1;
      cols[target].appendChild(card);
      heights[target] += h + 70;
    });
    if (onSettled) onSettled();
  };

  const imgs = cards.map((c) => c.querySelector('img'));
  if (!imgs.length) {
    settle();
    return;
  }
  let remaining = imgs.length;
  const done = () => {
    remaining -= 1;
    if (remaining <= 0) settle();
  };
  imgs.forEach((img) => {
    if (img.complete && img.naturalWidth) done();
    else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  });
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
