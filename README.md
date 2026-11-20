# Sharon Thriftwear

A static, responsive storefront for Sharon Thriftwear in Kiambu, Kenya. It runs on GitHub Pages without a build step, backend, or third-party frontend runtime.

## Run locally

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. Run the catalog and order-message tests with `npm test` (Node.js 18+; no dependencies to install).

## Maintain the shop

- **Catalog:** Edit `PRODUCTS` and `CATEGORIES` in [`assets/js/catalog.js`](assets/js/catalog.js). Each style has a unique `id`, a category, a guide price range in KSh, an `image` URL, and an `alt` description. To use a local photo, put it in `assets/images/` and set its URL to `./assets/images/your-photo.webp`. Portrait images around 640 × 800 px work well.
- **Photos and prices:** The catalog uses the 19 original Pinterest image links and guide prices from the previous site. These are style references, not a live stock list. If a link stops working, the site shows a placeholder and keeps the style available to browse and enquire about. Price filtering matches any overlap with a style’s guide range; sorting and bag subtotals use starting prices.
- **Orders:** The bag and wishlist are saved in the shopper’s browser. Checkout drafts a WhatsApp message with the selected styles, quantities and delivery preference. The shopper sends it in WhatsApp; Sharon confirms availability, prices and delivery fees. The site does not take payments, create customer accounts, or save checkout details. The delivery panel shows the shop’s existing M-Pesa till for use after confirmation.
- **Contact details:** The WhatsApp checkout number, M-Pesa till and checkout pickup address live in `assets/js/catalog.js`. The matching public links, till display, phone and location are in `index.html`.

DM Sans and Cormorant Garamond are self-hosted; their SIL Open Font Licenses are included in `assets/fonts/`.
