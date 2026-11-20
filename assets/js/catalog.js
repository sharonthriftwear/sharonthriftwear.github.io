/** The style edit uses guide ranges from the shop, not a live inventory feed. */
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
  'short-dresses': { label: 'Short dresses', parent: 'dresses' },
  'crop-tops': { label: 'Crop tops' },
  skirts: { label: 'Skirts' },
  'maxi-skirts': { label: 'Maxi skirts', parent: 'skirts' },
  'mini-skirts': { label: 'Mini skirts', parent: 'skirts' },
  'co-ords': { label: 'Co-ords', aliases: 'coords matching sets two piece sets' },
};

export const PRODUCTS = [
  {
    id: 'sunday-floral', name: 'Flowy Floral Maxi Dresses', category: 'maxi-dresses', price: [800, 1300],
    image: 'https://i.pinimg.com/1200x/19/e3/fe/19e3fe42d4ed3025ce871ca9cf7af476.jpg',
    alt: 'Floral thrifted maxi dress',
    description: 'Flowing floral maxis for brunch, dates or events. Ask Sharon which colours and prints are available.',
  },
  {
    id: 'oat-ribbed', name: 'Neutral Ribbed Crop Tops', category: 'crop-tops', price: [100, 300],
    image: 'https://i.pinimg.com/1200x/f8/49/06/f84906303b64f43d621235f6a606d219.jpg',
    alt: 'Neutral ribbed crop top styled with skirt',
    description: 'Easy-to-style ribbed crops to pair with jeans, cargo pants or skirts.',
  },
  {
    id: 'vintage-denim', name: 'Denim & Pleated Mini Skirts', category: 'mini-skirts', price: [200, 400], pick: true,
    image: 'https://i.pinimg.com/736x/c1/5e/f5/c15ef57273ca1569a878a4c24b93e1cb.jpg',
    alt: 'Denim mini skirt thrifted outfit',
    description: 'Denim and pleated minis for relaxed weekend outfits. Pair with an oversized tee or a fitted crop.',
  },
  {
    id: 'sage-linen', name: 'Matching Skirt Sets', category: 'co-ords', price: [800, 1200],
    image: 'https://i.pinimg.com/736x/42/c8/b8/42c8b88ea3f75d85283140a8397568be.jpg',
    alt: 'Thrifted co-ord skirt and top set',
    description: 'Matching tops and skirts for brunch, dates and casual weekends.',
  },
  {
    id: 'dusk-slip', name: 'Chic Black Maxi Dresses', category: 'maxi-dresses', price: [800, 1300],
    image: 'https://i.pinimg.com/1200x/fc/f8/61/fcf8612cf9aea5dccf5c431f1255857c.jpg',
    alt: 'Chic black maxi dress outfit',
    description: 'Classic black maxi dresses for dinners and events. Dress them up with jewellery and heels.',
  },
  {
    id: 'pleated-maxi', name: 'Flowy & Fitted Maxi Skirts', category: 'maxi-skirts', price: [300, 400],
    image: 'https://i.pinimg.com/1200x/26/4e/3b/264e3bf791b608ad4d24f167d7db7c2c.jpg',
    alt: 'Thrifted flowy maxi skirt outfit',
    description: 'Long skirts in flowing and fitted cuts. Style them with a crop top, bodysuit or knit.',
  },
  {
    id: 'after-hours', name: 'Party & Night-Out Dresses', category: 'short-dresses', price: [800, 900],
    image: 'https://i.pinimg.com/1200x/f3/c8/38/f3c838351264bdd79ab24ddbd64b1389.jpg',
    alt: 'Cute party short dress outfit',
    description: 'Short dresses for nights out, birthdays and special occasions.',
  },
  {
    id: 'rose-ribbed', name: 'Ribbed Pastel Crop Tops', category: 'crop-tops', price: [100, 300], isNew: true,
    image: 'https://i.pinimg.com/1200x/e3/b5/4e/e3b54e4c33650454f6533a6d7bb88da8.jpg',
    alt: 'Ribbed crop top styled with jeans',
    description: 'Ribbed crops in pastel shades that pair well with high-waisted jeans or mini skirts.',
  },
  {
    id: 'olive-mini', name: 'Fun Mini Skirt Outfits', category: 'mini-skirts', price: [200, 400],
    image: 'https://i.pinimg.com/736x/47/0c/4a/470c4a1344e4d4b80e9ffe19fcd0ab16.jpg',
    alt: 'Pleated mini skirt thrifted look',
    description: 'Mini skirts to style with graphic tees, crop tops or bodysuits.',
  },
  {
    id: 'blue-brunch', name: 'Brunch Short Dresses', category: 'short-dresses', price: [800, 900],
    image: 'https://i.pinimg.com/736x/26/9c/1c/269c1c45dcfa49713d6a9dc5955abee4.jpg',
    alt: 'Cute short flare dress outfit',
    description: 'Playful short dresses in easy-to-wear cuts, colours and prints.',
  },
  {
    id: 'graphic-crops', name: 'Graphic & Statement Crops', category: 'crop-tops', price: [100, 300],
    image: 'https://i.pinimg.com/736x/4e/1c/12/4e1c12598ca2383424325d30bae223e1.jpg',
    alt: 'Graphic crop top outfit',
    description: 'Graphic crop tops to wear with simple separates when you want the print to stand out.',
  },
  {
    id: 'bright-crops', name: 'Bright & Bold Crop Tops', category: 'crop-tops', price: [100, 300],
    image: 'https://i.pinimg.com/1200x/9b/38/20/9b3820ea7f409be5522d87c78e426e8d.jpg',
    alt: 'Bright coloured crop top outfit',
    description: 'Colourful crop tops for brunch, parties and everyday outfits with a pop of colour.',
  },
  {
    id: 'solid-maxi', name: 'Elegant Solid Maxi Dresses', category: 'maxi-dresses', price: [800, 1300],
    image: 'https://i.pinimg.com/1200x/2f/1e/d9/2f1ed9915250bb362a7290e6cc4a2ff0.jpg',
    alt: 'Elegant solid colour maxi dress',
    description: 'Solid-colour maxi dresses to wear with heels or sandals for dinners and events.',
  },
  {
    id: 'printed-maxi', name: 'Printed Everyday Maxi Dresses', category: 'maxi-dresses', price: [800, 1300],
    image: 'https://i.pinimg.com/1200x/86/e7/99/86e799204ff50cef0fa782d348e95fc1.jpg',
    alt: 'Printed maxi dress outfit',
    description: 'Relaxed printed maxi dresses for everyday wear.',
  },
  {
    id: 'bodycon-dresses', name: 'Bodycon Short Dresses', category: 'short-dresses', price: [800, 900],
    image: 'https://i.pinimg.com/1200x/91/d2/d5/91d2d5ac48204a97d9054d19d7a704c7.jpg',
    alt: 'Short bodycon dress outfit',
    description: 'Fitted short dresses for weekends and nights out. Try them with heels or sneakers.',
  },
  {
    id: 'casual-short-dresses', name: 'Casual Everyday Short Dresses', category: 'short-dresses', price: [800, 900],
    image: 'https://i.pinimg.com/1200x/0d/03/f1/0d03f1b9fc544cfef9ae1d1d65535915.jpg',
    alt: 'Casual short dress with sneakers',
    description: 'Easy short dresses to throw on with sneakers or sandals.',
  },
  {
    id: 'casual-maxi-skirts', name: 'Casual Chic Maxi Skirts', category: 'maxi-skirts', price: [300, 400],
    image: 'https://i.pinimg.com/736x/9f/3e/8f/9f3e8fb82218eb810abcf23f7da9c99a.jpg',
    alt: 'Maxi skirt with crop top thrifted outfit',
    description: 'Casual maxi skirts to pair with fitted tops or crops.',
  },
  {
    id: 'skirt-top-coords', name: 'Skirt & Top Co-ords', category: 'co-ords', price: [800, 1200],
    image: 'https://i.pinimg.com/736x/bc/0a/df/bc0adf3f54b95072c1d3917b77329a66.jpg',
    alt: 'Two-piece thrifted co-ord skirt set',
    description: 'Coordinated tops and skirts for an outfit you can put together quickly.',
  },
  {
    id: 'casual-two-piece', name: 'Casual Two-Piece Sets', category: 'co-ords', price: [800, 1200],
    image: 'https://i.pinimg.com/736x/f9/8b/9e/f98b9eedb598d93d487f805f2e92a321.jpg',
    alt: 'Casual thrifted two-piece set',
    description: 'Matching two-piece outfits for errands and relaxed days.',
  },
];

export const PRICE_RANGE = {
  min: Math.min(...PRODUCTS.map(({ price }) => price[0])),
  max: Math.max(...PRODUCTS.map(({ price }) => price[1])),
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
    // A style matches when any part of its guide range falls within the selection.
    if (product.price[0] > max || product.price[1] < min) return false;
    if (!tokens.length) return true;
    const itemCategory = CATEGORIES[product.category];
    const categoryText = `${itemCategory.label} ${CATEGORIES[itemCategory.parent]?.label ?? ''} ${itemCategory.aliases ?? ''}`;
    const text = toSearchText(`${product.name} ${categoryText} ${product.alt}`);
    return tokens.every((token) => text.includes(token));
  });
  const compare = {
    newest: (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
    'price-low': (a, b) => a.price[0] - b.price[0],
    'price-high': (a, b) => b.price[0] - a.price[0],
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

export const bagTotal = (items) => items.reduce((total, { product, quantity }) => total + product.price[0] * quantity, 0);

export function buildOrderMessage(items, { name = '', size = '', delivery, area = '' } = {}) {
  const lines = items.map(({ product, quantity }) => `• ${quantity} × ${product.name} (${formatRange(...product.price)} each)`);
  return [
    'Hi Sharon! I’d like to ask about these thrift styles:',
    '',
    ...lines,
    '',
    `Guide subtotal before delivery: from ${formatMoney(bagTotal(items))}`,
    ...(name.trim() ? [`Name: ${name.trim()}`] : []),
    ...(size.trim() ? [`Preferred size: ${size.trim()}`] : []),
    ...(Object.hasOwn(DELIVERY, delivery) ? [`Delivery method: ${DELIVERY[delivery]}`] : []),
    ...(delivery === 'pickup' ? [`Pickup address: ${SHOP.pickupAddress}`] : []),
    ...(delivery !== 'pickup' && area.trim() ? [`Town / delivery area: ${area.trim()}`] : []),
    '',
    'Please confirm the available pieces, sizes and final total before I pay. Thank you!',
  ].join('\n');
}
