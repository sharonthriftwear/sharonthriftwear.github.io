import {
  SHOP, CATEGORIES, PRODUCTS, PRICE_RANGE, MAX_QUANTITY, DELIVERY,
  formatMoney, formatRange, whatsappLink, matchesCategory,
  filterProducts, getPage, readCatalogState, cleanBag, cleanWishlist, bagItems,
  bagTotal, buildOrderMessage,
} from './catalog.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escape = (text) => String(text).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const findProduct = (id) => PRODUCTS.find((product) => product.id === id);
const itemLabel = (count, singular = 'style', plural = `${singular}s`) => `${count} ${count === 1 ? singular : plural}`;

const storageKeys = { bag: 'sharon-shop-bag-v1', wishlist: 'sharon-shop-wishlist-v1' };
function readStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Keep the current session usable without storage. */ }
}

let state = readCatalogState(new URLSearchParams(location.search));
let bag = cleanBag(readStorage(storageKeys.bag));
let wishlist = cleanWishlist(readStorage(storageKeys.wishlist));
let drawerMode = 'bag';
let toastTimer;

const priceLow = $('#price-low');
const priceHigh = $('#price-high');
const priceSlider = $('#price-slider');
const searchInput = $('#search-input');
const searchClear = $('.search-clear');
const products = $('#products');
const results = $('#results');
const resultsCount = $('#results-count');
const categoryList = $('#filter-categories');
const activeFilters = $('#active-filters');
const pagination = $('#pagination');
const sort = $('#sort');
const drawer = $('#shop-drawer');
const drawerTitle = $('#drawer-title');
const drawerBody = $('#drawer-body');
const drawerFooter = $('#drawer-footer');
const productDialog = $('#product-dialog');
const filterDialog = $('#filter-dialog');
const menuDialog = $('#menu-dialog');
const deliveryDialog = $('#delivery-dialog');
const mobile = window.matchMedia('(max-width: 860px)');

function replaceCatalogUrl() {
  const url = new URL(location.href);
  const entries = {
    category: state.category === 'all' ? '' : state.category,
    q: state.query.trim(),
    min: state.min === PRICE_RANGE.min ? '' : state.min,
    max: state.max === PRICE_RANGE.max ? '' : state.max,
    sort: state.sort === 'featured' ? '' : state.sort,
    view: state.view === 'grid' ? '' : state.view,
    page: state.page === 1 ? '' : state.page,
  };
  for (const [key, value] of Object.entries(entries)) {
    if (value === '') url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  if (url.href !== location.href) history.replaceState(history.state, '', url);
}

function renderCategories() {
  categoryList.innerHTML = Object.entries(CATEGORIES).map(([id, { label, parent }]) => {
    const count = PRODUCTS.filter((product) => matchesCategory(product, id)).length;
    const href = id === 'all' ? './#collection' : `?category=${id}#collection`;
    return `<a href="${href}" class="category-choice${parent ? ' category-child' : ''}" data-category="${id}"><span>${escape(label)}</span><span class="category-count">${count}</span></a>`;
  }).join('');
}

function syncCategories() {
  $$('[data-category]').forEach((link) => {
    if (!link.closest('nav, .category-list')) return;
    const id = link.dataset.category;
    const showsParent = link.closest('.site-nav, .mobile-nav') && CATEGORIES[state.category].parent === id;
    if (id === state.category || showsParent) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

function updatePriceLabels(changed) {
  if (+priceLow.value > +priceHigh.value) {
    if (changed === priceLow) priceLow.value = priceHigh.value;
    else priceHigh.value = priceLow.value;
  }
  const low = +priceLow.value;
  const high = +priceHigh.value;
  const percent = (value) => 100 * (value - PRICE_RANGE.min) / (PRICE_RANGE.max - PRICE_RANGE.min || 1);
  priceSlider.style.setProperty('--range-low', `${percent(low)}%`);
  priceSlider.style.setProperty('--range-high', `${percent(high)}%`);
  priceSlider.classList.toggle('thumbs-overlap-high', low === high && percent(low) > 50);
  const lowLabel = formatMoney(low);
  const highLabel = formatMoney(high);
  $('#price-low-value').textContent = lowLabel;
  $('#price-high-value').textContent = highLabel;
  priceLow.setAttribute('aria-valuetext', lowLabel);
  priceHigh.setAttribute('aria-valuetext', highLabel);
  if (filterDialog.open) updateShowResults(low, high);
}

function syncPriceInputs() {
  priceLow.value = state.min;
  priceHigh.value = state.max;
  updatePriceLabels();
}

function updateShowResults(min = state.min, max = state.max) {
  const count = filterProducts(PRODUCTS, { ...state, min, max }).length;
  $('#show-filter-results').textContent = count ? `Show ${itemLabel(count)}` : 'Show results';
}

function renderActiveFilters() {
  const priceActive = state.min !== PRICE_RANGE.min || state.max !== PRICE_RANGE.max;
  const chips = [
    ...(state.category !== 'all' ? [['clear-category', CATEGORIES[state.category].label]] : []),
    ...(priceActive ? [['clear-price', formatRange(state.min, state.max)]] : []),
    ...(state.query.trim() ? [['clear-query', `Search: “${state.query.trim()}”`]] : []),
  ];
  activeFilters.innerHTML = chips.map(([action, label]) => `<button class="filter-chip" type="button" data-action="${action}" aria-label="Remove filter: ${escape(label)}">${escape(label)} ${icon('close')}</button>`).join('');
  activeFilters.hidden = chips.length === 0;
  const mobileCount = $('#mobile-filter-count');
  const mobileTotal = Number(priceActive) + Number(state.category !== 'all');
  mobileCount.textContent = mobileTotal;
  mobileCount.hidden = !mobileTotal;
  $('.mobile-filter-button').setAttribute('aria-label', mobileTotal ? `Filters, ${mobileTotal} applied` : 'Filters');
}

function image(product, options = '') {
  return `<img data-style-photo src="${escape(product.image)}" alt="${escape(product.alt)}" width="640" height="800" referrerpolicy="no-referrer" ${options}>`;
}

// A third-party image failure must not leave a broken card or block shopping.
document.addEventListener('error', ({ target }) => {
  if (!(target instanceof HTMLImageElement) || !target.hasAttribute('data-style-photo')) return;
  target.removeAttribute('data-style-photo');
  target.alt = 'Style photo unavailable';
  target.src = './assets/images/style-photo-unavailable.svg';
}, true);

function bagButton(product, extraClass = '') {
  const inBag = Boolean(bag[product.id]);
  const label = inBag ? 'View bag' : 'Add to bag';
  return `<button class="button ${inBag ? 'button-outline' : 'button-primary'} ${extraClass}" type="button" data-action="add" data-id="${product.id}" aria-label="${escape(label)}: ${escape(product.name)}">${icon(inBag ? 'check' : 'bag')} <span>${label}</span></button>`;
}

function saveButton(product, className) {
  const saved = wishlist.includes(product.id);
  return `<button class="${className}" type="button" data-action="save" data-id="${product.id}" aria-label="Save ${escape(product.name)} to wishlist" aria-pressed="${saved}">${icon('heart')}</button>`;
}

function priceLabel(product) {
  return `<span class="from">From</span> ${formatMoney(product.price[0])}`;
}

function productCard(product, index) {
  const badge = product.isNew ? '<span class="product-badge">New in</span>' : product.pick ? '<span class="product-badge is-pick">Editor’s pick</span>' : '';
  const loading = index === 0 ? 'fetchpriority="high"' : index < 4 ? '' : 'loading="lazy" decoding="async"';
  return `<article class="product-card" data-product="${product.id}">
    <div class="product-media">
      <button type="button" class="product-photo" data-action="detail" data-id="${product.id}" aria-label="View ${escape(product.name)} details" aria-haspopup="dialog">${image(product, loading)}</button>
      ${badge}
      ${saveButton(product, 'save-button')}
    </div>
    <div class="product-copy">
      <p class="product-category">${escape(CATEGORIES[product.category].label)}</p>
      <h3 class="product-title"><button type="button" data-action="detail" data-id="${product.id}" aria-haspopup="dialog">${escape(product.name)}</button></h3>
      <p class="product-description">${escape(product.description)}</p>
      <p class="product-price">${priceLabel(product)}</p>
      ${bagButton(product, 'product-action')}
    </div>
  </article>`;
}

function emptyState({ symbol, title, message, action, button, heading = 'h3' }) {
  return `<div class="empty-state">
    <span class="empty-icon">${icon(symbol)}</span>
    <${heading}>${escape(title)}</${heading}>
    <p>${escape(message)}</p>
    <button class="button button-outline" type="button" data-action="${action}">${escape(button)}</button>
  </div>`;
}

function renderPagination({ page, pages }) {
  pagination.hidden = pages < 2;
  if (pages < 2) { pagination.innerHTML = ''; return; }
  const pageButton = (number, label, text, options = '') => `<button type="button" data-page="${number}" aria-label="${label}" ${options}>${text}</button>`;
  pagination.innerHTML = [
    pageButton(page - 1, 'Previous page', icon('left'), page === 1 ? 'disabled' : ''),
    ...Array.from({ length: pages }, (_, index) => pageButton(index + 1, `Page ${index + 1}`, index + 1, index + 1 === page ? 'aria-current="page"' : '')),
    pageButton(page + 1, 'Next page', icon('right'), page === pages ? 'disabled' : ''),
  ].join('');
}

function renderCatalog({ updateUrl = true } = {}) {
  const page = getPage(filterProducts(PRODUCTS, state), state.page);
  state.page = page.page;
  if (updateUrl) replaceCatalogUrl();
  syncCategories();
  renderActiveFilters();
  searchClear.hidden = !searchInput.value;
  sort.value = state.sort;
  $$('[data-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
  products.classList.toggle('is-list', state.view === 'list');
  const summary = page.total ? `Showing <strong>${page.start}${page.end === page.start ? '' : `–${page.end}`}</strong> of <strong>${page.total}</strong> ${page.total === 1 ? 'style' : 'styles'}` : 'No matching styles';
  if (resultsCount.innerHTML !== summary) resultsCount.innerHTML = summary;
  products.innerHTML = page.total ? page.items.map(productCard).join('') : emptyState({
    symbol: 'search', title: 'No styles found', message: 'Try a different search or clear your filters to see more of the collection.', action: 'reset-filters', button: 'Clear all filters', heading: 'h2',
  });
  renderPagination(page);
  $('#catalog-note').hidden = !page.total;
  if (filterDialog.open) updateShowResults(+priceLow.value, +priceHigh.value);
}

function setFilters(next, { jump = false, focus = false } = {}) {
  Object.assign(state, { page: 1 }, next);
  renderCatalog();
  if (focus) resultsCount.focus({ preventScroll: true });
  if (jump) results.scrollIntoView({ block: 'start' });
}

function resetFilters(focus = false) {
  state.min = PRICE_RANGE.min;
  state.max = PRICE_RANGE.max;
  searchInput.value = '';
  syncPriceInputs();
  setFilters({ category: 'all', query: '' }, { focus });
}

function applyPrice() {
  setFilters({ min: +priceLow.value, max: +priceHigh.value });
}

function placeFilters() {
  const host = mobile.matches ? $('#mobile-filters') : $('#desktop-filters');
  const panel = $('#filter-panel');
  if (!mobile.matches && filterDialog.open) filterDialog.close();
  if (panel.parentElement !== host) host.append(panel);
}

function renderIndicators() {
  const bagCount = Object.values(bag).reduce((sum, quantity) => sum + quantity, 0);
  const savedCount = wishlist.length;
  $('#bag-count').textContent = bagCount;
  $('#wishlist-count').textContent = savedCount;
  $('#wishlist-count').hidden = savedCount === 0;
  $('.masthead [data-open="bag"]').setAttribute('aria-label', `Shopping bag, ${itemLabel(bagCount, 'item')}`);
  $('.masthead [data-open="wishlist"]').setAttribute('aria-label', `Wishlist, ${itemLabel(savedCount)} saved`);
  $$('[data-action="save"]').forEach((button) => button.setAttribute('aria-pressed', String(wishlist.includes(button.dataset.id))));
  $$('[data-action="add"]').forEach((button) => {
    const inBag = Boolean(bag[button.dataset.id]);
    const label = inBag ? 'View bag' : 'Add to bag';
    button.classList.toggle('button-outline', inBag);
    button.classList.toggle('button-primary', !inBag);
    button.setAttribute('aria-label', `${label}: ${findProduct(button.dataset.id).name}`);
    $('span', button).textContent = label;
    $('use', button).setAttribute('href', inBag ? '#i-check' : '#i-bag');
  });
}

function notify(message, canOpenBag = false) {
  const inDialog = productDialog.open ? $('#detail-status') : drawer.open ? $('#drawer-status') : null;
  if (inDialog) {
    inDialog.textContent = message;
    return;
  }
  $('#announcer').textContent = message;
  $('#toast-message').textContent = message;
  const toast = $('#toast');
  const toastBag = $('#toast-bag');
  toastBag.hidden = !canOpenBag;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    if (document.activeElement !== toastBag) toast.hidden = true;
    else toastBag.addEventListener('blur', () => { toast.hidden = true; }, { once: true });
  }, 4400);
}

function showDialog(dialog) {
  if (!dialog.open) dialog.showModal();
}

function openProduct(product) {
  const category = CATEGORIES[product.category].label;
  const link = whatsappLink(`Hi Sharon! I’m interested in ${product.name}. Could you share the pieces, sizes and prices you have available?`);
  $('#product-detail').innerHTML = `<div class="detail-media">${image(product)}</div>
    <div class="detail-copy">
      <p class="eyebrow">${escape(category)}</p>
      <h2 id="product-dialog-title">${escape(product.name)}</h2>
      <p class="detail-price">${formatRange(...product.price)} <span class="sr-only">guide price</span></p>
      <p class="detail-description">${escape(product.description)}</p>
      <p class="detail-note">This photo shows an example style. Ask Sharon for current pieces, condition and measurements.</p>
      <div class="detail-actions">${bagButton(product, 'detail-bag')}${saveButton(product, 'icon-control')}</div>
      <a href="${escape(link)}" class="button button-outline detail-whatsapp" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} Check availability</a>
      <p id="detail-status" class="sr-only" role="status"></p>
    </div>`;
  showDialog(productDialog);
}

function setDrawerHeading(title, kicker) {
  drawerTitle.textContent = title;
  $('#drawer-kicker').textContent = kicker;
}

function drawerImage(product) {
  return `<button type="button" class="line-thumb" data-action="detail" data-id="${product.id}" aria-label="View ${escape(product.name)} details" aria-haspopup="dialog">${image(product)}</button>`;
}

function lineTitle(product) {
  return `<button type="button" class="line-title" data-action="detail" data-id="${product.id}" aria-haspopup="dialog">${escape(product.name)}</button>`;
}

function renderWishlist() {
  setDrawerHeading('Your wishlist', wishlist.length ? `${itemLabel(wishlist.length)} saved` : 'Save for later');
  drawerFooter.hidden = true;
  if (!wishlist.length) {
    drawerBody.innerHTML = emptyState({ symbol: 'heart', title: 'Nothing saved yet', message: 'Tap the heart on any style to keep it here for later.', action: 'browse', button: 'Browse the collection' });
    return;
  }
  drawerBody.innerHTML = wishlist.map((id) => {
    const product = findProduct(id);
    return `<article class="drawer-line">
      ${drawerImage(product)}
      <div>${lineTitle(product)}<p class="line-price">${priceLabel(product)}</p><div class="line-actions">${bagButton(product, 'line-bag')}</div></div>
      <button class="icon-control line-remove" type="button" data-action="remove-saved" data-id="${id}" aria-label="Remove ${escape(product.name)} from wishlist">${icon('close')}</button>
    </article>`;
  }).join('');
}

function bagLine({ product, quantity }) {
  const id = product.id;
  const qtyButton = (step, label, disabled) => `<button type="button" data-action="quantity" data-focus-key="${id}-${step}" data-id="${id}" data-step="${step}" aria-label="${label} quantity for ${escape(product.name)}"${disabled ? ' disabled' : ''}>${icon(step < 0 ? 'minus' : 'plus')}</button>`;
  return `<article class="drawer-line">
    ${drawerImage(product)}
    <div>${lineTitle(product)}<p class="line-price">From ${formatMoney(product.price[0])} each</p>
      <div class="line-actions">
        <div class="quantity" role="group" aria-label="Quantity for ${escape(product.name)}">${qtyButton(-1, 'Decrease', quantity <= 1)}<span>${quantity}</span>${qtyButton(1, 'Increase', quantity >= MAX_QUANTITY)}</div>
        <button type="button" class="text-button" data-action="remove-bag" data-id="${id}" aria-label="Remove ${escape(product.name)} from bag">Remove</button>
      </div>
    </div>
    <p class="line-total">${formatMoney(product.price[0] * quantity)}+</p>
  </article>`;
}

function subtotalMarkup(items) {
  return `<p class="drawer-subtotal"><span>Guide subtotal</span><span>From ${formatMoney(bagTotal(items))}</span></p>`;
}

function renderBag(items) {
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  setDrawerHeading('Your bag', count ? `${itemLabel(count, 'item')} to enquire about` : 'Your selections');
  drawerFooter.hidden = count === 0;
  if (!count) {
    drawerBody.innerHTML = emptyState({ symbol: 'bag', title: 'Your bag is empty', message: 'Add styles you like, then send your selection to Sharon to check availability.', action: 'browse', button: 'Browse the collection' });
    return;
  }
  drawerBody.innerHTML = items.map(bagLine).join('');
  drawerFooter.innerHTML = `${subtotalMarkup(items)}<p class="drawer-hint">Based on starting prices. Exact prices and delivery are confirmed by Sharon.</p><button type="button" class="button button-primary full-width" data-action="checkout">Review order ${icon('arrow')}</button>`;
}

function syncOrderArea() {
  const method = $('#order-delivery').value;
  const needsArea = Boolean(method) && method !== 'pickup';
  const area = $('#order-area');
  $('#order-area-field').hidden = !needsArea;
  area.required = needsArea;
  area.disabled = !needsArea;
  area.setCustomValidity('');
}

function checkoutSummary(items) {
  const count = items.reduce((sum, { quantity }) => sum + quantity, 0);
  return `<summary>Order summary <span>(${itemLabel(count, 'item')})</span></summary><ul>${items.map(({ product, quantity }) => `<li>${quantity} × ${escape(product.name)}</li>`).join('')}</ul>`;
}

function renderCheckout(items) {
  setDrawerHeading('Review your order', 'Order on WhatsApp');
  drawerFooter.hidden = false;
  drawerBody.innerHTML = `<button type="button" class="checkout-back" data-action="back-bag">${icon('left')} Back to bag</button>
    <p class="checkout-description">We’ll prepare a message with your picks. Send it to Sharon on WhatsApp to confirm what’s available.</p>
    <details class="checkout-summary">${checkoutSummary(items)}</details>
    <form class="checkout-form" id="checkout-form" action="${SHOP.whatsApp}" method="get" target="_blank" rel="noopener noreferrer">
      <input type="hidden" name="text">
      <label class="checkout-field" for="order-name">Your name<input id="order-name" autocomplete="name" required maxlength="70" placeholder="Full name"></label>
      <label class="checkout-field" for="order-size"><span>Preferred size <span>(optional)</span></span><input id="order-size" maxlength="35" placeholder="e.g. UK 10"></label>
      <label class="checkout-field" for="order-delivery">Delivery or pickup<select id="order-delivery" required><option value="" selected disabled>Choose an option</option>${Object.entries(DELIVERY).map(([key, label]) => `<option value="${key}">${escape(label)}</option>`).join('')}</select></label>
      <label class="checkout-field" id="order-area-field" for="order-area" hidden>Town / delivery area<input id="order-area" maxlength="80" placeholder="e.g. Nairobi, Westlands"></label>
    </form>`;
  drawerFooter.innerHTML = `${subtotalMarkup(items)}<p class="drawer-hint">No payment is taken here. Confirm your final total and delivery fee with Sharon before paying.</p>
    <button type="submit" class="button button-primary full-width" form="checkout-form">${icon('whatsapp')} Continue to WhatsApp</button>`;
  syncOrderArea();
}

function renderDrawer(focusKey = null) {
  const items = bagItems(bag);
  if (drawerMode === 'checkout' && !items.length) drawerMode = 'bag';
  if (drawerMode === 'wishlist') renderWishlist();
  else if (drawerMode === 'checkout') renderCheckout(items);
  else renderBag(items);
  if (focusKey) {
    const focused = $$('[data-focus-key]', drawer).find((button) => button.dataset.focusKey === focusKey && !button.disabled);
    (focused ?? drawerTitle).focus({ preventScroll: true });
  }
}

function openDrawer(mode) {
  const fromInside = drawer.open;
  drawerMode = mode;
  renderDrawer();
  drawerBody.scrollTop = 0;
  if (fromInside) drawerTitle.focus({ preventScroll: true });
  else showDialog(drawer);
  $('#toast').hidden = true;
}

function updateBag(product, quantity, { focusKey, message, toastBag = false } = {}) {
  if (quantity > 0) bag[product.id] = Math.min(quantity, MAX_QUANTITY);
  else delete bag[product.id];
  writeStorage(storageKeys.bag, bag);
  if (drawer.open && drawerMode === 'bag') renderDrawer(focusKey);
  renderIndicators();
  if (message) notify(message, toastBag);
}

function updateWishlist(product, forceRemove = false) {
  const removed = forceRemove || wishlist.includes(product.id);
  wishlist = removed ? wishlist.filter((id) => id !== product.id) : [...wishlist, product.id];
  writeStorage(storageKeys.wishlist, wishlist);
  if (drawer.open && drawerMode === 'wishlist') renderDrawer(forceRemove ? 'drawer-title' : null);
  renderIndicators();
  notify(removed ? `${product.name} removed from your wishlist.` : `${product.name} saved to your wishlist.`);
}

async function copyTill() {
  const label = $('#copy-till-label');
  const status = $('#copy-status');
  let copied = false;
  try {
    await navigator.clipboard.writeText(SHOP.till);
    copied = true;
  } catch {
    // Keep a fallback for browsers where the clipboard API is unavailable.
    const previousFocus = document.activeElement;
    const field = document.createElement('textarea');
    field.value = SHOP.till;
    field.className = 'sr-only';
    field.readOnly = true;
    deliveryDialog.append(field);
    field.select();
    try { copied = document.execCommand('copy'); } catch { /* The visible till can be copied manually. */ }
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
  label.textContent = copied ? 'Copied!' : 'Copy till';
  status.className = copied ? 'sr-only' : 'copy-note';
  status.textContent = copied ? 'M-Pesa till number copied.' : 'Clipboard unavailable. Select and copy the till number above.';
  if (!copied) {
    const range = document.createRange();
    range.selectNodeContents($('#till-number'));
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}

$('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  setFilters({ query: searchInput.value }, { jump: true, focus: true });
});
searchInput.addEventListener('input', () => setFilters({ query: searchInput.value }));
sort.addEventListener('change', () => setFilters({ sort: sort.value }));
$('#price-form').addEventListener('submit', (event) => { event.preventDefault(); applyPrice(); });
[priceLow, priceHigh].forEach((input) => {
  input.min = PRICE_RANGE.min;
  input.max = PRICE_RANGE.max;
  input.step = PRICE_RANGE.step;
  input.addEventListener('input', () => updatePriceLabels(input));
  input.addEventListener('change', () => { if (filterDialog.open) applyPrice(); });
});
// Native thumbs handle dragging and keyboard input; clicking the rail moves the nearer thumb.
priceSlider.addEventListener('pointerdown', (event) => {
  if (event.target !== priceSlider || event.button !== 0) return;
  const bounds = $('.price-track', priceSlider).getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
  const raw = PRICE_RANGE.min + ratio * (PRICE_RANGE.max - PRICE_RANGE.min);
  const input = Math.abs(raw - +priceLow.value) < Math.abs(raw - +priceHigh.value)
    || (+priceLow.value === +priceHigh.value && raw < +priceLow.value) ? priceLow : priceHigh;
  input.value = PRICE_RANGE.min + Math.round((raw - PRICE_RANGE.min) / PRICE_RANGE.step) * PRICE_RANGE.step;
  input.focus({ preventScroll: true });
  updatePriceLabels(input);
  if (filterDialog.open) applyPrice();
});

mobile.addEventListener('change', placeFilters);
window.matchMedia('(max-width: 680px)').addEventListener('change', (event) => {
  if (!event.matches && menuDialog.open) menuDialog.close();
});

$$('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const { top, right, bottom, left } = dialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) dialog.close();
  });
});
deliveryDialog.addEventListener('close', () => {
  $('#copy-till-label').textContent = 'Copy till';
  $('#copy-status').className = 'sr-only';
  $('#copy-status').textContent = '';
});

function handleCategory(link, event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  const fromMenu = Boolean(link.closest('#menu-dialog'));
  const fromFooter = Boolean(link.closest('.site-footer'));
  const category = link.dataset.category;
  if (fromMenu) menuDialog.close();
  if (category === 'all' && !link.classList.contains('category-choice')) resetFilters();
  else setFilters({ category });
  if (fromMenu || fromFooter) {
    resultsCount.focus({ preventScroll: true });
    results.scrollIntoView({ block: 'start' });
  }
}

document.addEventListener('click', (event) => {
  const control = event.target.closest('[data-category], [data-close], [data-open], [data-action], [data-page], [data-view]');
  if (!control) return;
  const { dataset } = control;
  if (dataset.category) { handleCategory(control, event); return; }
  if (control.hasAttribute('data-close')) { control.closest('dialog')?.close(); return; }
  if (dataset.open) {
    if (dataset.open === 'bag' || dataset.open === 'wishlist') openDrawer(dataset.open);
    else if (dataset.open === 'menu') showDialog(menuDialog);
    else if (dataset.open === 'delivery') showDialog(deliveryDialog);
    else if (dataset.open === 'filters') {
      syncPriceInputs();
      showDialog(filterDialog);
      updateShowResults();
    }
    return;
  }
  if (dataset.page) {
    if (+dataset.page === state.page) return;
    state.page = +dataset.page;
    renderCatalog();
    resultsCount.focus({ preventScroll: true });
    results.scrollIntoView({ block: 'start' });
    return;
  }
  if (dataset.view) {
    if (dataset.view !== state.view) { state.view = dataset.view; renderCatalog(); }
    return;
  }

  const product = dataset.id ? findProduct(dataset.id) : null;
  switch (dataset.action) {
    case 'detail': if (product) openProduct(product); break;
    case 'save': if (product) updateWishlist(product); break;
    case 'remove-saved': if (product) updateWishlist(product, true); break;
    case 'add':
      if (!product) break;
      if (bag[product.id]) {
        if (productDialog.open) productDialog.close();
        openDrawer('bag');
      } else updateBag(product, 1, { message: `${product.name} added to your bag.`, toastBag: true });
      break;
    case 'remove-bag':
      if (product) updateBag(product, 0, { focusKey: 'drawer-title', message: `${product.name} removed from your bag.` });
      break;
    case 'quantity':
      if (product) {
        const quantity = Math.max(1, Math.min(MAX_QUANTITY, (bag[product.id] ?? 1) + Number(dataset.step)));
        updateBag(product, quantity, { focusKey: dataset.focusKey, message: `${product.name}, quantity ${quantity}.` });
      }
      break;
    case 'checkout': openDrawer('checkout'); break;
    case 'back-bag': openDrawer('bag'); break;
    case 'browse':
      drawer.close();
      resultsCount.focus({ preventScroll: true });
      results.scrollIntoView({ block: 'start' });
      break;
    case 'copy-till': copyTill(); break;
    case 'reset-filters': resetFilters(!control.isConnected || products.contains(control)); break;
    case 'clear-query':
      searchInput.value = '';
      setFilters({ query: '' }, { focus: control !== searchClear });
      if (control === searchClear) searchInput.focus();
      break;
    case 'clear-category': setFilters({ category: 'all' }, { focus: true }); break;
    case 'clear-price':
      state.min = PRICE_RANGE.min;
      state.max = PRICE_RANGE.max;
      syncPriceInputs();
      setFilters({}, { focus: true });
      break;
    case 'show-results':
      applyPrice();
      filterDialog.close();
      resultsCount.focus({ preventScroll: true });
      results.scrollIntoView({ block: 'start' });
      break;
    default: break;
  }
});

// Only the encoded message is submitted to WhatsApp; customer details are not stored on the site.
drawer.addEventListener('change', (event) => { if (event.target.id === 'order-delivery') syncOrderArea(); });
drawer.addEventListener('input', (event) => {
  if (event.target.matches('#order-name, #order-area')) event.target.setCustomValidity('');
});
drawer.addEventListener('submit', (event) => {
  if (event.target.id !== 'checkout-form') return;
  const validText = (input, message) => {
    if (!input.required || input.value.trim()) return true;
    input.setCustomValidity(message);
    input.reportValidity();
    return false;
  };
  const name = $('#order-name');
  const area = $('#order-area');
  if (!validText(name, 'Enter your name.') || !validText(area, 'Enter your town or delivery area.')) {
    event.preventDefault();
    return;
  }
  $('input[name="text"]', event.target).value = buildOrderMessage(bagItems(bag), {
    name: name.value, size: $('#order-size').value, delivery: $('#order-delivery').value, area: area.value,
  });
});

window.addEventListener('storage', (event) => {
  if (event.key !== storageKeys.bag && event.key !== storageKeys.wishlist && event.key !== null) return;
  bag = cleanBag(readStorage(storageKeys.bag));
  wishlist = cleanWishlist(readStorage(storageKeys.wishlist));
  if (drawer.open && drawerMode !== 'checkout') renderDrawer();
  if (drawer.open && drawerMode === 'checkout') {
    const items = bagItems(bag);
    if (!items.length) openDrawer('bag');
    else {
      $('.drawer-subtotal', drawerFooter).outerHTML = subtotalMarkup(items);
      $('.checkout-summary', drawerBody).innerHTML = checkoutSummary(items);
    }
  }
  renderIndicators();
});

searchInput.value = state.query;
resultsCount.tabIndex = -1;
$('#year').textContent = new Date().getFullYear();
placeFilters();
renderCategories();
syncPriceInputs();
renderCatalog({ updateUrl: false });
renderIndicators();
