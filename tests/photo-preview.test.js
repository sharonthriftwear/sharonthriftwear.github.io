import test from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { PRODUCTS } from '../assets/js/catalog.js';
import { getPreviewPhotos, panLimit } from '../assets/js/photo-preview.js';

test('the regular product photo is always available as the first preview view', () => {
  for (const product of PRODUCTS) {
    const photos = getPreviewPhotos(product);
    assert.deepEqual(photos[0], { label: 'Full photo', image: product.image, alt: product.alt });
    assert.equal(photos.length, 1 + (product.views?.length ?? 0));
  }
});

test('alternate views are distinctly labelled and map to local photo crops', () => {
  const products = PRODUCTS.filter((product) => product.views?.length);
  assert.ok(products.length > 0);
  const files = new Set();
  for (const product of products) {
    const photos = getPreviewPhotos(product);
    assert.equal(new Set(photos.map(({ label }) => label)).size, photos.length);
    for (const { image, alt } of product.views) {
      assert.match(image, /^\.\/assets\/images\/preview\/[a-z0-9-]+\.webp$/);
      assert.ok(alt.trim());
      assert.ok(!files.has(image), `Duplicate alternate view: ${image}`);
      const file = statSync(new URL(`../${image}`, import.meta.url));
      assert.ok(file.isFile() && file.size > 0, image);
      files.add(image);
    }
  }
});

test('panning is limited to the image overflow on each zoomed axis', () => {
  assert.equal(panLimit(200, 350, 1), 0);
  assert.equal(panLimit(200, 350, 1.5), 0);
  assert.equal(panLimit(200, 350, 2), 25);
  assert.equal(panLimit(280, 300, 1.25), 25);
  assert.equal(panLimit(320, 350, 1.75), 105);
});
