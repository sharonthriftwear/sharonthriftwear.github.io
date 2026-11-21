# Sharon Thriftwear

A static, responsive storefront for Sharon Thriftwear in Kiambu, Kenya. It runs on GitHub Pages without a build step, backend, or third-party frontend runtime.

## Run locally

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. Run the catalog and order-message tests with `npm test` (Node.js 18+; no dependencies to install).

## Maintain the shop

- **Catalog:** Edit `PRODUCTS` and `CATEGORIES` in [`assets/js/catalog.js`](assets/js/catalog.js). Each style has a unique `id`, a category, a numeric `price` in KSh, a local `image` path such as `./assets/images/your-photo.webp`, and descriptive `alt` text. Keep IDs stable for wishlist and bag entries. Update `tests/catalog.test.js` when adding a listing or changing its price.
- **Photos and prices:** The listed styles use photos from `assets/images/` and prices matched to the shop’s WhatsApp captions. The WebP crops in `assets/images/catalog/` remove borders, phone controls or an unrelated price overlay from selected uploaded photos; the unedited originals remain in `assets/images/`. Photos without a confirmed price are not listed. If a photo is missing, the site shows a placeholder. Filtering, sorting and bag subtotals use the listed price, excluding delivery.
- **Interactive photo preview:** The product details open an optional tilt-and-zoom viewer. The main `image` is always shown first. To add real alternate angles, set `views` on a product with `{ label, image, alt }` entries and keep the photo files in `assets/images/preview/`. The current angles are crops of the original multi-view uploads; the viewer does not generate a 3D model or infer missing views. Alternate photos load only when selected.
- **Orders:** The bag and wishlist are saved in the shopper’s browser. Checkout drafts a WhatsApp message with the selected styles, quantities and delivery preference. The shopper sends it in WhatsApp; Sharon confirms availability, prices and delivery fees. The site does not take payments, create customer accounts, or save checkout details. The delivery panel shows the shop’s existing M-Pesa till for use after confirmation.
- **Contact details:** The WhatsApp checkout number, M-Pesa till and checkout pickup address live in `assets/js/catalog.js`. The matching public links, till display, phone and location are in `index.html`. To update the Street View embed, replace the iframe URL in the `#visit` section and check its Google Maps directions link.

DM Sans and Cormorant Garamond are self-hosted; their SIL Open Font Licenses are included in `assets/fonts/`.
