import test from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import {
  CATEGORIES, PRODUCTS, PRICE_RANGE, filterProducts, getPage, readCatalogState,
  cleanBag, cleanWishlist, bagItems, bagTotal, buildOrderMessage, whatsappLink,
} from '../assets/js/catalog.js';

const defaults = readCatalogState();
const filters = (options) => filterProducts(PRODUCTS, { ...defaults, ...options });
const ids = (products) => products.map(({ id }) => id);

test('each catalog listing uses its local photo and the matching caption price', () => {
  // Keyed by image so swapping photos between differently priced listings is caught.
  const captionPrices = {
    '8985505e-902a-4d03-b630-b6dd7a6cf65f.jpeg': 1300,
    'cb593e9a-0000-4187-8f35-4d436e840fac.jpeg': 250,
    '99056687-0d27-4463-addf-f60e596a3136.jpeg': 1400,
    '7ec7db98-06c4-4f96-b422-315a5a0a5db4.jpeg': 1400,
    '621d7d46-e1ac-4092-853f-75b74de30985.jpeg': 800,
    '17e94450-7b7a-4426-abc9-0dfcc2a401b1.jpeg': 800,
    '5f7a88cb-0f05-463f-b0df-e0b2c71751af.jpeg': 800,
    'bc6e5eea-ee2c-41af-93ca-d3c2ee92ecb8.jpeg': 800,
    'a4f7cf40-c84e-4586-b044-c2b51cfafe76.jpeg': 250,
    '4c57d3bc-2278-458f-95e0-9c444e3551a0.jpeg': 250,
    '4157f9ff-c410-4fff-982b-2e3b5a0296d2.jpeg': 400,
    'bef652e0-fd7f-4adb-bca7-e84ce56bc0c8.jpeg': 200,
    '94ef0455-a775-4e39-a074-909b44a2d258.jpeg': 1000,
    'catalog/navy-slit-maxi.webp': 1000,
    'b85feaf9-d305-4964-9643-7a03959b5701.jpeg': 1300,
    '1e394cc9-c5ff-4763-9e6e-6fde9c717dd9.jpeg': 1400,
    '777e17ed-86f2-4106-80ba-7c50304a6598.jpeg': 1000,
    '2b7e7777-7ea4-4108-a540-9b87f6e7a39e.jpeg': 1400,
    'catalog/black-wrap-skirt-set.webp': 900,
    'bb8c13b8-66f8-45d5-aabd-26fc92572a30.jpeg': 1000,
    'db3a5361-6f52-4b30-a64b-2f1a6269ccc4.jpeg': 1000,
    'catalog/red-draped-maxi.webp': 1000,
    'f0a0b861-7a36-4180-8e42-b2dfbd5989ff.jpeg': 1000,
    'a188ae9e-5b01-45df-af70-ec0e25ac6bcf.jpeg': 1000,
    'catalog/black-bell-sleeve-skirt-set.webp': 900,
    'dd8e9fa3-e54c-441c-94f1-eabcea92aeec.jpeg': 1000,
    'd8835bb8-05b2-4307-b062-0844b43c0aff.jpeg': 800,
    '0d6ffa51-e547-4fec-b9e6-7eca4250707f.jpeg': 900,
    '560dab3e-ba81-40a2-b60e-7ad5abbc506a.jpeg': 1000,
    '1af40fe3-5010-47eb-b94b-d54eced8f423.jpeg': 800,
    '62009d89-2067-47ed-b669-51d9ecd9085c.jpeg': 800,
    '988e596f-f8be-4287-8656-643c72ff0a17.jpeg': 800,
    '9af5be13-4083-4a2b-ad0f-34ff2421a396.jpeg': 900,
  };
  assert.equal(PRODUCTS.length, Object.keys(captionPrices).length);
  assert.equal(new Set(ids(PRODUCTS)).size, PRODUCTS.length);
  assert.equal(new Set(PRODUCTS.map(({ image }) => image)).size, PRODUCTS.length);
  for (const product of PRODUCTS) {
    assert.ok(Object.hasOwn(CATEGORIES, product.category));
    assert.ok(product.alt.trim());
    assert.match(product.image, /^\.\/assets\/images\/(?:[a-f0-9-]+\.jpeg|catalog\/[a-z0-9-]+\.webp)$/);
    assert.equal(product.price, captionPrices[product.image.slice('./assets/images/'.length)], product.name);
    const file = statSync(new URL(`../${product.image}`, import.meta.url));
    assert.ok(file.isFile() && file.size > 0, product.image);
  }
});

test('parent, subcategory and new-arrival filters select the correct styles', () => {
  const dresses = filters({ category: 'dresses' });
  assert.equal(dresses.length, 13);
  assert.ok(dresses.every(({ category }) => CATEGORIES[category].parent === 'dresses'));
  assert.deepEqual(ids(filters({ category: 'maxi-dresses' })), ['black-scarf-maxi', 'red-draped-maxi', 'navy-slit-maxi', 'contrast-slit-maxi']);
  assert.deepEqual(ids(filters({ category: 'new' })), ['black-sash-mini', 'sky-blue-one-shoulder', 'red-sash-mini', 'white-sash-mini']);
  assert.equal(filters({ category: 'trousers' }).length, 5);
  assert.equal(filters({ category: 'tops' }).length, 5);
  assert.deepEqual(ids(filters({ category: 'crop-tops' })), ['white-open-back-crop', 'zip-front-crop-top', 'asymmetric-crop-top']);
});

test('search handles case, punctuation and accents alongside other filters', () => {
  assert.deepEqual(ids(filters({ query: '  míDi, FLORAL! ' })), ['pink-floral-midi']);
  assert.deepEqual(ids(filters({ query: 'coords' })), ids(filters({ category: 'co-ords' })));
  assert.deepEqual(ids(filters({ query: 'romper' })), ['black-ribbed-playsuit']);
  assert.deepEqual(ids(filters({ query: 'white pants', category: 'trousers' })), ['white-high-rise-flares']);
  assert.deepEqual(ids(filters({ query: 'pinstripe', category: 'dresses' })), []);
});

test('price filters match listed prices, including when both endpoints are equal', () => {
  assert.deepEqual(PRICE_RANGE, { min: 200, max: 1400, step: 50 });
  assert.deepEqual(ids(filters({ min: 200, max: 200 })), ['white-open-back-crop']);
  assert.deepEqual(ids(filters({ min: 250, max: 250, category: 'tops' })), ['square-neck-tee', 'fitted-crew-neck-top', 'asymmetric-crop-top']);
  assert.deepEqual(ids(filters({ min: 800, max: 800, category: 'short-dresses' })), ['black-sash-mini', 'red-sash-mini', 'white-sash-mini', 'black-mock-neck-mini']);
  assert.equal(filters({ min: 1050, max: 1250 }).length, 0);
  assert.deepEqual(ids(filters({ min: 1300, max: 1400 })), [
    'beige-zip-front-set', 'grey-zip-front-set', 'black-cutout-flare-set',
    'black-strapless-flare-set', 'black-zip-front-set', 'black-zip-flare-set',
  ]);
});

test('sorts by listed price, name or new arrivals without reordering the source', () => {
  assert.equal(filters({ sort: 'price-low' })[0].price, PRICE_RANGE.min);
  const expensiveFirst = filters({ sort: 'price-high' });
  assert.equal(expensiveFirst[0].price, PRICE_RANGE.max);
  assert.ok(expensiveFirst.every(({ price }, index) => !index || expensiveFirst[index - 1].price >= price));
  assert.equal(filters({ sort: 'name' })[0].name, 'Asymmetric Long-Sleeve Top');
  assert.equal(filters({ sort: 'newest' }).findIndex((item) => !item.isNew), filters({ category: 'new' }).length);
  assert.equal(PRODUCTS[0].id, 'pink-floral-midi');
});

test('catalog URLs validate values and pagination clamps missing or unavailable pages', () => {
  const params = new URLSearchParams('category=constructor&sort=unrecognised&view=list&min=1200&max=0&page=99');
  const state = readCatalogState(params);
  assert.deepEqual(state, { ...defaults, view: 'list', max: 1200, page: 99 });
  const lastPage = getPage(PRODUCTS, state.page);
  assert.equal(lastPage.page, 5);
  assert.equal(lastPage.start, 33);
  assert.equal(lastPage.end, PRODUCTS.length);
  assert.deepEqual(getPage([], -10), { page: 1, pages: 1, total: 0, start: 0, end: 0, items: [] });
});

test('saved state drops retired listings, invalid quantities and duplicates', () => {
  assert.deepEqual(cleanBag({ 'black-sash-mini': 2, 'beige-zip-front-set': 99, 'white-sash-mini': 0, 'sky-blue-one-shoulder': '2', 'sunday-floral': 1 }), { 'black-sash-mini': 2, 'beige-zip-front-set': 9 });
  assert.deepEqual(cleanBag(null), {});
  assert.deepEqual(cleanWishlist(['black-sash-mini', 2, 'black-sash-mini', 'oat-ribbed', 'beige-zip-front-set']), ['black-sash-mini', 'beige-zip-front-set']);
});

test('WhatsApp requests include the selected styles, unit prices, quantities and delivery details', () => {
  const items = bagItems({ 'pink-floral-midi': 1, 'white-open-back-crop': 2 });
  assert.equal(bagTotal(items), 1400);
  const order = buildOrderMessage(items, { name: ' Ames ', size: 'UK 10', delivery: 'courier', area: 'Nyeri & environs' });
  const link = new URL(whatsappLink(order));
  assert.equal(link.origin + link.pathname, 'https://wa.me/254737233022');
  assert.equal(link.searchParams.get('text'), order);
  assert.match(order, /^• 1 × Pink Floral Midi Dress \(KSh 1,000 each\)$/m);
  assert.match(order, /^• 2 × White Open-Back Crop Top \(KSh 200 each\)$/m);
  assert.match(order, /^Subtotal before delivery: KSh 1,400$/m);
  assert.match(order, /Name: Ames/);
  assert.match(order, /Preferred size: UK 10/);
  assert.match(order, /Courier delivery within Kenya/);
  assert.match(order, /Nyeri & environs/);
  assert.doesNotMatch(order, /Pickup address:/);
});

test('pickup requests include the shop address instead of a delivery area', () => {
  const order = buildOrderMessage(bagItems({ 'beige-zip-front-set': 1 }), { delivery: 'pickup', area: 'Do not include' });
  assert.match(order, /Delivery method: Pickup in Kiambu Town/);
  assert.match(order, /^Pickup address: Kiambu Town, opposite Rumathi Building$/m);
  assert.doesNotMatch(order, /delivery area|Do not include/);
});
