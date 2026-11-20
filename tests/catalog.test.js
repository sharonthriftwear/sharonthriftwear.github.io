import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIES, PRODUCTS, PRICE_RANGE, filterProducts, getPage, readCatalogState,
  cleanBag, cleanWishlist, bagItems, bagTotal, buildOrderMessage, whatsappLink,
} from '../assets/js/catalog.js';

const defaults = readCatalogState();
const filters = (options) => filterProducts(PRODUCTS, { ...defaults, ...options });
const ids = (products) => products.map(({ id }) => id);

test('all 19 original styles have distinct image links, unique ids and valid prices', () => {
  assert.equal(PRODUCTS.length, 19);
  assert.equal(new Set(ids(PRODUCTS)).size, PRODUCTS.length);
  assert.equal(new Set(PRODUCTS.map(({ image }) => image)).size, PRODUCTS.length);
  for (const product of PRODUCTS) {
    assert.ok(Object.hasOwn(CATEGORIES, product.category));
    assert.ok(product.price[0] <= product.price[1]);
    assert.match(product.image, /^https:\/\/i\.pinimg\.com\/(1200x|736x)\/[a-f0-9]{2}\/[a-f0-9]{2}\/[a-f0-9]{2}\/[a-f0-9]{32}\.jpg$/);
  }
});

test('parent, subcategory and new-arrival filters select the correct styles', () => {
  assert.deepEqual(ids(filters({ category: 'dresses' })), ['sunday-floral', 'dusk-slip', 'after-hours', 'blue-brunch', 'solid-maxi', 'printed-maxi', 'bodycon-dresses', 'casual-short-dresses']);
  assert.deepEqual(ids(filters({ category: 'maxi-dresses' })), ['sunday-floral', 'dusk-slip', 'solid-maxi', 'printed-maxi']);
  assert.deepEqual(ids(filters({ category: 'new' })), ['rose-ribbed']);
});

test('search handles case, punctuation and accents alongside other filters', () => {
  assert.deepEqual(ids(filters({ query: '  mÁxi, FLORAL! ' })), ['sunday-floral']);
  assert.deepEqual(ids(filters({ query: 'coords' })), ['sage-linen', 'skirt-top-coords', 'casual-two-piece']);
  assert.deepEqual(ids(filters({ query: 'ribbed', category: 'skirts' })), []);
});

test('price ranges match when they overlap at either end, including exact endpoints', () => {
  assert.deepEqual(ids(filters({ min: 300, max: 300, category: 'crop-tops' })), ['oat-ribbed', 'rose-ribbed', 'graphic-crops', 'bright-crops']);
  assert.equal(filters({ min: 450, max: 750 }).length, 0);
  assert.equal(filters({ min: 1100, max: 1300 }).length, 7);
});

test('sorts by guide minimum, name or new arrivals without reordering the source', () => {
  assert.equal(filters({ sort: 'price-low' })[0].price[0], PRICE_RANGE.min);
  assert.ok(filters({ sort: 'price-high' }).every((item, index, sorted) => !index || sorted[index - 1].price[0] >= item.price[0]));
  assert.equal(filters({ sort: 'name' })[0].name, 'Bodycon Short Dresses');
  assert.equal(filters({ sort: 'newest' }).findIndex((item) => !item.isNew), filters({ category: 'new' }).length);
  assert.equal(PRODUCTS[0].id, 'sunday-floral');
});

test('catalog URLs validate values and pagination clamps missing or unavailable pages', () => {
  const params = new URLSearchParams('category=constructor&sort=unrecognised&view=list&min=1200&max=0&page=99');
  const state = readCatalogState(params);
  assert.deepEqual(state, { ...defaults, view: 'list', max: 1200, page: 99 });
  const lastPage = getPage(PRODUCTS, state.page);
  assert.equal(lastPage.page, 3);
  assert.equal(lastPage.start, 17);
  assert.equal(lastPage.end, PRODUCTS.length);
  assert.deepEqual(getPage([], -10), { page: 1, pages: 1, total: 0, start: 0, end: 0, items: [] });
});

test('saved state drops unknown styles, invalid quantities and duplicates', () => {
  assert.deepEqual(cleanBag({ 'oat-ribbed': 2, 'sage-linen': 99, 'dusk-slip': 0, 'rose-ribbed': '2', unknown: 1 }), { 'oat-ribbed': 2, 'sage-linen': 9 });
  assert.deepEqual(cleanBag(null), {});
  assert.deepEqual(cleanWishlist(['oat-ribbed', 2, 'oat-ribbed', 'unknown', 'sage-linen']), ['oat-ribbed', 'sage-linen']);
});

test('WhatsApp requests include the selected styles, quantities and delivery details', () => {
  const items = bagItems({ 'sunday-floral': 1, 'oat-ribbed': 2 });
  assert.equal(bagTotal(items), 1000);
  const order = buildOrderMessage(items, { name: ' Ames ', size: 'UK 10', delivery: 'courier', area: 'Nyeri & environs' });
  const link = new URL(whatsappLink(order));
  assert.equal(link.origin + link.pathname, 'https://wa.me/254737233022');
  assert.equal(link.searchParams.get('text'), order);
  assert.match(order, /1 × Flowy Floral Maxi Dresses/);
  assert.match(order, /2 × Neutral Ribbed Crop Tops/);
  assert.match(order, /Guide subtotal before delivery: from KSh 1,000/);
  assert.match(order, /Name: Ames/);
  assert.match(order, /Preferred size: UK 10/);
  assert.match(order, /Courier delivery within Kenya/);
  assert.match(order, /Nyeri & environs/);
  assert.doesNotMatch(order, /Pickup address:/);
});

test('pickup requests include the shop address instead of a delivery area', () => {
  const order = buildOrderMessage(bagItems({ 'sunday-floral': 1 }), { delivery: 'pickup', area: 'Do not include' });
  assert.match(order, /Delivery method: Pickup in Kiambu Town/);
  assert.match(order, /^Pickup address: Kiambu Town, opposite Rumathi Building$/m);
  assert.doesNotMatch(order, /delivery area|Do not include/);
});
