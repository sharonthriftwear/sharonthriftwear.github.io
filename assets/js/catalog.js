/** The shop’s catalog and listed prices; stock is confirmed on WhatsApp. */
export const SHOP = {
  whatsApp: 'https://wa.me/254737233022',
  till: '6918141',
  pickupAddress: 'Kiambu Town, opposite Rumathi Building',
};

export const CATEGORIES = {
  all: { label: 'All styles' },
  new: { label: 'New arrivals' },
  dresses: { label: 'Dresses' },
  'maxi-dresses': { label: 'Maxi dresses', parent: 'dresses' },
  'midi-dresses': { label: 'Midi dresses', parent: 'dresses' },
  'short-dresses': { label: 'Short dresses', parent: 'dresses' },
  tops: { label: 'Tops', aliases: 'tees t-shirts' },
  'crop-tops': { label: 'Crop tops', parent: 'tops' },
  trousers: { label: 'Trousers', aliases: 'pants' },
  'co-ords': { label: 'Co-ords', aliases: 'coords matching sets two piece sets' },
  playsuits: { label: 'Playsuits', aliases: 'rompers one piece' },
};

// Each price is in KSh, matched to a WhatsApp caption for the pictured style.
export const PRODUCTS = [
  {
    id: 'pink-floral-midi', name: 'Pink Floral Midi Dress', category: 'midi-dresses', price: 1000, pick: true,
    image: './assets/images/a188ae9e-5b01-45df-af70-ec0e25ac6bcf.jpeg',
    alt: 'Strapless pink midi dress with large red and white flowers',
    description: 'A fitted strapless midi with an oversized floral print in pink, red and white.',
  },
  {
    id: 'beige-zip-front-set', name: 'Beige Zip-Front Set', category: 'co-ords', price: 1400,
    image: './assets/images/2b7e7777-7ea4-4108-a540-9b87f6e7a39e.jpeg',
    alt: 'Beige zip-front top and wide-leg trousers shown from the front, side and back',
    description: 'A fitted zip-front top and matching wide-leg trousers in warm beige.',
    views: [
      { label: 'Side', image: './assets/images/preview/beige-zip-side.webp', alt: 'Side view of the beige zip-front top and wide-leg trousers' },
      { label: 'Back', image: './assets/images/preview/beige-zip-back.webp', alt: 'Back view of the fitted beige top and wide-leg trousers' },
    ],
  },
  {
    id: 'black-sash-mini', name: 'Black Side-Sash Mini Dress', category: 'short-dresses', price: 800, isNew: true,
    image: './assets/images/988e596f-f8be-4287-8656-643c72ff0a17.jpeg',
    alt: 'Black ruched mini dress with an asymmetric neckline and long side sash',
    description: 'An asymmetric neckline and a long side sash dress up this ruched black mini.',
  },
  {
    id: 'sky-blue-one-shoulder', name: 'Sky Blue One-Shoulder Dress', category: 'midi-dresses', price: 900, isNew: true,
    image: './assets/images/9af5be13-4083-4a2b-ad0f-34ff2421a396.jpeg',
    alt: 'Fitted sky-blue one-shoulder dress gathered at the waist',
    description: 'A fitted sky-blue dress with a one-shoulder neckline and soft gathers at the waist.',
  },
  {
    id: 'white-open-back-crop', name: 'White Open-Back Crop Top', category: 'crop-tops', price: 200,
    image: './assets/images/bef652e0-fd7f-4adb-bca7-e84ce56bc0c8.jpeg',
    alt: 'Front and back views of a white short-sleeve crop top with a low open back',
    description: 'A fitted white crop top with short sleeves and a low open back.',
    views: [
      { label: 'Front', image: './assets/images/preview/open-back-crop-front.webp', alt: 'Front view of the fitted white short-sleeve crop top' },
      { label: 'Back', image: './assets/images/preview/open-back-crop-back.webp', alt: 'Back view showing the low open back of the white crop top' },
    ],
  },
  {
    id: 'black-high-rise-flares', name: 'Black High-Rise Flares', category: 'trousers', price: 800,
    image: './assets/images/621d7d46-e1ac-4092-853f-75b74de30985.jpeg',
    alt: 'Black high-waisted trousers fitted through the thighs with flared hems',
    description: 'High-rise black trousers with a close fit through the thighs and a flared hem.',
  },
  {
    id: 'blue-pinstripe-skirt-set', name: 'Blue Pinstripe Skirt Set', category: 'co-ords', price: 1000,
    image: './assets/images/777e17ed-86f2-4106-80ba-7c50304a6598.jpeg',
    alt: 'Blue and white pinstripe halter top with a matching mini skirt',
    description: 'A pointed-hem halter top and mini skirt in blue and white pinstripes.',
  },
  {
    id: 'grey-zip-front-set', name: 'Grey Zip-Front Set', category: 'co-ords', price: 1400,
    image: './assets/images/1e394cc9-c5ff-4763-9e6e-6fde9c717dd9.jpeg',
    alt: 'Grey zip-front top and wide-leg trousers shown from the front, side and back',
    description: 'A fitted zip-front top and matching wide-leg trousers in grey.',
    views: [
      { label: 'Side', image: './assets/images/preview/grey-zip-side.webp', alt: 'Side view of the grey zip-front top and wide-leg trousers' },
      { label: 'Back', image: './assets/images/preview/grey-zip-back.webp', alt: 'Back view of the fitted grey top and wide-leg trousers' },
    ],
  },
  {
    id: 'white-ruched-halter-mini', name: 'White Ruched Halter Mini', category: 'short-dresses', price: 900,
    image: './assets/images/0d6ffa51-e547-4fec-b9e6-7eca4250707f.jpeg',
    alt: 'White halter mini dress with a high neckline and ruched skirt',
    description: 'A high halter neckline and gathered skirt on a fitted white mini dress.',
  },
  {
    id: 'black-scarf-maxi', name: 'Black Scarf-Neck Maxi Dress', category: 'maxi-dresses', price: 1000,
    image: './assets/images/bb8c13b8-66f8-45d5-aabd-26fc92572a30.jpeg',
    alt: 'Black strapless floor-length dress styled with a trailing neck scarf',
    description: 'A straight-neck strapless maxi shown with a long, draped neck scarf.',
  },
  {
    id: 'red-sash-mini', name: 'Red Side-Sash Mini Dress', category: 'short-dresses', price: 800, isNew: true,
    image: './assets/images/62009d89-2067-47ed-b669-51d9ecd9085c.jpeg',
    alt: 'Red ruched mini dress with an asymmetric neckline and long side sash',
    description: 'A ruched red mini with an asymmetric neckline and a long side sash.',
  },
  {
    id: 'monochrome-bow-midi', name: 'Black & White Bow Midi', category: 'midi-dresses', price: 1000,
    image: './assets/images/dd8e9fa3-e54c-441c-94f1-eabcea92aeec.jpeg',
    alt: 'Fitted black midi dress with a white off-shoulder band and statement bow',
    description: 'A fitted black midi with a contrasting white neckline and a draped shoulder bow.',
  },
  {
    id: 'black-cutout-flare-set', name: 'Black Cutout Flare Set', category: 'co-ords', price: 1300,
    image: './assets/images/b85feaf9-d305-4964-9643-7a03959b5701.jpeg',
    alt: 'Black ring-front long-sleeve crop top and flared trousers with side cutouts',
    description: 'A ring-front crop top paired with high-rise flares and cutouts at the hips.',
  },
  {
    id: 'red-draped-maxi', name: 'Red Draped Maxi Dress', category: 'maxi-dresses', price: 1000,
    image: './assets/images/catalog/red-draped-maxi.webp',
    alt: 'Red maxi dress with a slanted neckline and draped side panel',
    description: 'A red column dress with a slanted neckline and a long drape at the hip.',
  },
  {
    id: 'black-wrap-skirt-set', name: 'Black Wrap-Top Skirt Set', category: 'co-ords', price: 900,
    image: './assets/images/catalog/black-wrap-skirt-set.webp',
    alt: 'Black strapless wrap crop top with a side tie and matching long skirt',
    description: 'A strapless wrap top with a side tie and a matching long skirt.',
  },
  {
    id: 'white-sash-mini', name: 'White Side-Sash Mini Dress', category: 'short-dresses', price: 800, isNew: true,
    image: './assets/images/1af40fe3-5010-47eb-b94b-d54eced8f423.jpeg',
    alt: 'White ruched mini dress with an asymmetric neckline and long side sash',
    description: 'A ruched white mini with an asymmetric neckline and a long side sash.',
  },
  {
    id: 'navy-slit-maxi', name: 'Navy Strapless Slit Maxi', category: 'maxi-dresses', price: 1000,
    image: './assets/images/catalog/navy-slit-maxi.webp',
    alt: 'Navy strapless maxi dress with a draped skirt and high side slit',
    description: 'A strapless navy maxi with diagonal gathers and a high side slit.',
  },
  {
    id: 'black-ribbed-playsuit', name: 'Black Ribbed Playsuit', category: 'playsuits', price: 1000,
    image: './assets/images/db3a5361-6f52-4b30-a64b-2f1a6269ccc4.jpeg',
    alt: 'Fitted black ribbed playsuit with a square neckline and mid-thigh shorts',
    description: 'A ribbed one-piece with a square neckline, short sleeves and fitted shorts.',
  },
  {
    id: 'contrast-slit-maxi', name: 'Contrast-Neck Slit Maxi', category: 'maxi-dresses', price: 1000,
    image: './assets/images/94ef0455-a775-4e39-a074-909b44a2d258.jpeg',
    alt: 'Dark strapless maxi dress with a white neckline band and high side slit',
    description: 'A white fold-over neckline contrasts with a dark draped skirt and high slit.',
  },
  {
    id: 'black-mock-neck-mini', name: 'Black Mock-Neck Mini Dress', category: 'short-dresses', price: 800,
    image: './assets/images/d8835bb8-05b2-4307-b062-0844b43c0aff.jpeg',
    alt: 'Fitted sleeveless black mini dress with a high mock neckline',
    description: 'A sleeveless fitted black mini with a clean, high neckline.',
  },
  {
    id: 'black-bell-sleeve-skirt-set', name: 'Black Bell-Sleeve Skirt Set', category: 'co-ords', price: 900,
    image: './assets/images/catalog/black-bell-sleeve-skirt-set.webp',
    alt: 'Black off-shoulder crop top with flared cuffs and a ruched ankle-length skirt',
    description: 'An off-shoulder top with bell cuffs paired with a ruched long skirt.',
  },
  {
    id: 'navy-draped-midi', name: 'Navy Draped Long-Sleeve Dress', category: 'midi-dresses', price: 1000,
    image: './assets/images/f0a0b861-7a36-4180-8e42-b2dfbd5989ff.jpeg',
    alt: 'Navy long-sleeve dress with an asymmetric neckline and a draped front panel',
    description: 'An asymmetric neckline, long sleeves and a gathered front drape in deep navy.',
  },
  {
    id: 'dark-capri-trousers', name: 'Dark Capri Trousers', category: 'trousers', price: 1000,
    image: './assets/images/560dab3e-ba81-40a2-b60e-7ad5abbc506a.jpeg',
    alt: 'Dark fitted capri trousers styled with a draped ivory top',
    description: 'Fitted high-rise capris with a cropped, below-the-knee cut.',
  },
  {
    id: 'zip-front-crop-top', name: 'Zip-Front Crop Top', category: 'crop-tops', price: 400,
    image: './assets/images/4157f9ff-c410-4fff-982b-2e3b5a0296d2.jpeg',
    alt: 'Long-sleeve zip-front crop tops with stand collars in black, navy and white',
    description: 'A fitted long-sleeve crop with a stand collar and zip front. Ask which colours are available.',
  },
  {
    id: 'blue-high-rise-flares', name: 'Blue High-Rise Flares', category: 'trousers', price: 800,
    image: './assets/images/17e94450-7b7a-4426-abc9-0dfcc2a401b1.jpeg',
    alt: 'Light blue high-waisted flared trousers shown from the front and back',
    description: 'Light blue trousers with a wide high-rise waistband, fitted thighs and flared hems.',
    views: [
      { label: 'Front', image: './assets/images/preview/blue-flares-front.webp', alt: 'Front view showing the blue flares and wide high-rise waistband' },
      { label: 'Rear angle', image: './assets/images/preview/blue-flares-back.webp', alt: 'Rear three-quarter view of the blue flared trousers' },
    ],
  },
  {
    id: 'square-neck-tee', name: 'Square-Neck Tee', category: 'tops', price: 250,
    image: './assets/images/a4f7cf40-c84e-4586-b044-c2b51cfafe76.jpeg',
    alt: 'Fitted short-sleeve square-neck tees in white, brown and burgundy',
    description: 'A fitted short-sleeve tee with a square neckline. Ask which colours are available.',
  },
  {
    id: 'cream-wide-leg-trousers', name: 'Cream Wide-Leg Trousers', category: 'trousers', price: 800,
    image: './assets/images/5f7a88cb-0f05-463f-b0df-e0b2c71751af.jpeg',
    alt: 'Cream high-rise trousers with long, loose wide legs',
    description: 'High-rise cream trousers with a relaxed wide leg and a full-length hem.',
  },
  {
    id: 'white-high-rise-flares', name: 'White High-Rise Flares', category: 'trousers', price: 800,
    image: './assets/images/bc6e5eea-ee2c-41af-93ca-d3c2ee92ecb8.jpeg',
    alt: 'White high-waisted trousers that flare below the knee',
    description: 'High-rise white trousers that fit close through the thigh and flare below the knee.',
  },
  {
    id: 'fitted-crew-neck-top', name: 'Fitted Crew-Neck Top', category: 'tops', price: 250,
    image: './assets/images/4c57d3bc-2278-458f-95e0-9c444e3551a0.jpeg',
    alt: 'Fitted long-sleeve crew-neck tops in black, brown, white and navy',
    description: 'A fitted long-sleeve top with a classic crew neck. Ask which colours are available.',
  },
  {
    id: 'asymmetric-crop-top', name: 'Asymmetric Long-Sleeve Top', category: 'crop-tops', price: 250,
    image: './assets/images/cb593e9a-0000-4187-8f35-4d436e840fac.jpeg',
    alt: 'White, red and black long-sleeve crop tops with asymmetric off-shoulder necklines',
    description: 'A long-sleeve crop with an asymmetric off-shoulder neckline. Ask which colours are available.',
  },
  {
    id: 'black-strapless-flare-set', name: 'Black Strapless Flare Set', category: 'co-ords', price: 1300,
    image: './assets/images/8985505e-902a-4d03-b630-b6dd7a6cf65f.jpeg',
    alt: 'Black strapless top with side ruching and a tie, styled with matching black flares',
    description: 'A ruched strapless top with a side tie, shown with matching black flares.',
  },
  {
    id: 'black-zip-front-set', name: 'Black Zip-Front Set', category: 'co-ords', price: 1400,
    image: './assets/images/99056687-0d27-4463-addf-f60e596a3136.jpeg',
    alt: 'Black pointed-hem zip-front top and wide-leg trousers shown from the front, side and back',
    description: 'A fitted black top with a contrast zip and pointed hem, paired with wide-leg trousers.',
    views: [
      { label: 'Side', image: './assets/images/preview/black-zip-side.webp', alt: 'Side view of the black zip-front top and wide-leg trousers' },
      { label: 'Back', image: './assets/images/preview/black-zip-back.webp', alt: 'Back view of the fitted black top and wide-leg trousers' },
    ],
  },
  {
    id: 'black-zip-flare-set', name: 'Black High-Neck Zip & Flare Set', category: 'co-ords', price: 1400,
    image: './assets/images/7ec7db98-06c4-4f96-b422-315a5a0a5db4.jpeg',
    alt: 'Black high-neck zip jacket with matching flared trousers, shown from several angles',
    description: 'A black high-neck top with a tonal zip, paired with flared trousers.',
    views: [
      { label: 'Front', image: './assets/images/preview/black-zip-flare-front.webp', alt: 'Front view of the black high-neck zip top and flared trousers' },
      { label: 'Side', image: './assets/images/preview/black-zip-flare-side.webp', alt: 'Side view of the black high-neck top and flared trousers' },
    ],
  },
];

const prices = PRODUCTS.map(({ price }) => price);
export const PRICE_RANGE = {
  min: Math.min(...prices),
  max: Math.max(...prices),
  step: 50,
};
export const PAGE_SIZE = 8;
export const MAX_QUANTITY = 9;
export const SORTS = ['featured', 'newest', 'price-low', 'price-high', 'name'];
export const DELIVERY = {
  pickup: 'Pickup in Kiambu Town',
  rider: 'Rider delivery in Kiambu / Nairobi',
  courier: 'Courier delivery within Kenya',
};

const money = new Intl.NumberFormat('en-KE');
export const formatMoney = (amount) => `KSh ${money.format(amount)}`;
export const formatRange = (min, max) => (min === max ? formatMoney(min) : `${formatMoney(min)} – ${formatMoney(max)}`);
export const whatsappLink = (message) => `${SHOP.whatsApp}?text=${encodeURIComponent(message)}`;

export function matchesCategory(product, category) {
  if (category === 'all') return true;
  if (category === 'new') return Boolean(product.isNew);
  return product.category === category || CATEGORIES[product.category]?.parent === category;
}

function toSearchText(value) {
  return value.toLocaleLowerCase('en-KE').normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export function filterProducts(products, { category, query, min, max, sort }) {
  const normalized = toSearchText(query);
  const tokens = normalized ? normalized.split(' ') : [];
  const filtered = products.filter((product) => {
    if (!matchesCategory(product, category)) return false;
    if (product.price < min || product.price > max) return false;
    if (!tokens.length) return true;
    const itemCategory = CATEGORIES[product.category];
    const categoryText = `${itemCategory.label} ${CATEGORIES[itemCategory.parent]?.label ?? ''} ${itemCategory.aliases ?? ''}`;
    const text = toSearchText(`${product.name} ${categoryText} ${product.alt}`);
    return tokens.every((token) => text.includes(token));
  });
  const compare = {
    newest: (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
    'price-low': (a, b) => a.price - b.price,
    'price-high': (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name, 'en-KE'),
  };
  return Object.hasOwn(compare, sort) ? filtered.sort(compare[sort]) : filtered;
}

export function getPage(items, requestedPage, pageSize = PAGE_SIZE) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, Number.parseInt(requestedPage, 10) || 1), pages);
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  return { page, pages, total, start: total ? start + 1 : 0, end, items: items.slice(start, end) };
}

function normalizePrice(value, fallback) {
  if (value === null || value === '') return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  const { min, max, step } = PRICE_RANGE;
  return Math.min(max, Math.max(min, min + Math.round((number - min) / step) * step));
}

export function readCatalogState(params = new URLSearchParams()) {
  const category = params.get('category');
  const sort = params.get('sort');
  const min = normalizePrice(params.get('min'), PRICE_RANGE.min);
  const max = normalizePrice(params.get('max'), PRICE_RANGE.max);
  return {
    category: Object.hasOwn(CATEGORIES, category) ? category : 'all',
    query: (params.get('q') ?? '').slice(0, 100),
    min: Math.min(min, max),
    max: Math.max(min, max),
    sort: SORTS.includes(sort) ? sort : 'featured',
    view: params.get('view') === 'list' ? 'list' : 'grid',
    page: Math.max(1, Number.parseInt(params.get('page'), 10) || 1),
  };
}

export function cleanBag(value) {
  if (!value || typeof value !== 'object') return {};
  return Object.fromEntries(PRODUCTS.flatMap(({ id }) => {
    const quantity = Number.isInteger(value[id]) ? Math.min(MAX_QUANTITY, value[id]) : 0;
    return quantity > 0 ? [[id, quantity]] : [];
  }));
}

export function cleanWishlist(value) {
  return Array.isArray(value) ? [...new Set(value)].filter((id) => PRODUCTS.some((product) => product.id === id)) : [];
}

export function bagItems(bag) {
  return PRODUCTS.flatMap((product) => bag[product.id] ? [{ product, quantity: bag[product.id] }] : []);
}

export const bagTotal = (items) => items.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

export function buildOrderMessage(items, { name = '', size = '', delivery, area = '' } = {}) {
  const lines = items.map(({ product, quantity }) => `• ${quantity} × ${product.name} (${formatMoney(product.price)} each)`);
  return [
    'Hi Sharon! I’d like to ask about these thrift styles:',
    '',
    ...lines,
    '',
    `Subtotal before delivery: ${formatMoney(bagTotal(items))}`,
    ...(name.trim() ? [`Name: ${name.trim()}`] : []),
    ...(size.trim() ? [`Preferred size: ${size.trim()}`] : []),
    ...(Object.hasOwn(DELIVERY, delivery) ? [`Delivery method: ${DELIVERY[delivery]}`] : []),
    ...(delivery === 'pickup' ? [`Pickup address: ${SHOP.pickupAddress}`] : []),
    ...(delivery !== 'pickup' && area.trim() ? [`Town / delivery area: ${area.trim()}`] : []),
    '',
    'Please confirm the available pieces, sizes and final total before I pay. Thank you!',
  ].join('\n');
}
