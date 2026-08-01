/* Shared UI: header + product cards --------------------------------- */

function headerMarkup(prefix) {
  const p = prefix || '';
  return `
  <a class="header__logo" href="${p}index.html">
    <img src="${p}assets/logo.svg" alt="Artasimn">
  </a>

  <nav class="nav">
    <div class="nav-item nav-item--has-menu">
      <img class="ico" src="${p}assets/icons/items.svg" alt="">
      <a class="nav-link" href="${p}items.html">Items</a>
      <div class="dropdown">
        <a href="${p}items.html#garment">Garment</a>
        <a href="${p}items.html#jewelry">Jewelry</a>
      </div>
    </div>

    <div class="nav-item"><a class="nav-link" href="#">Tattoo</a></div>
    <div class="nav-item"><a class="nav-link" href="#">About</a></div>

    <div class="nav-item">
      <img class="ico" src="${p}assets/icons/office.svg" alt="">
      <a class="nav-link" href="#">T.Office</a>
    </div>
  </nav>

  <a class="header__cart" href="#">
    Card <img src="${p}assets/icons/cart.svg" alt="">
  </a>`;
}

/* One catalogue card with the whip-spin hover ----------------------- */
function cardMarkup(item, prefix) {
  const p = prefix || '';
  return `
  <a class="card" href="${p}product.html?id=${item.id}">
    <div class="card__stage">
      <div class="card__flip">
        <div class="card__face card__face--front">
          <img src="${p}${item.front}" alt="${item.title}">
        </div>
        <div class="card__face card__face--back">
          <img src="${p}${item.back}" alt="${item.title}">
        </div>
      </div>
    </div>
    <div class="card__title">${item.title}</div>
    <div class="card__price">${item.price}</div>
  </a>`;
}

function mountHeader(prefix) {
  const el = document.querySelector('.header');
  if (el) el.innerHTML = headerMarkup(prefix);
}

function renderCards(target, items, prefix) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) el.innerHTML = items.map((i) => cardMarkup(i, prefix)).join('');
}
