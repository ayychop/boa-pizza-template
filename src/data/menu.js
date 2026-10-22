export const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=78`

export const BUSINESS = {
  name: 'Forno Rosso',
  phone: '01494 000000',
  phoneHref: 'tel:+441494000000',
  address: ['The Old Brewery Yard', 'High Wycombe', 'HP11 2AA'],
  // 0 = Sunday. Tuesday to Sunday, 12:00 to 22:00.
  openDays: [0, 2, 3, 4, 5, 6],
  openHour: 12,
  closeHour: 22,
}

export const PHOTOS = {
  hero: img('1579751626657-72bc17010498', 2000),
  crust: img('1571997478779-2adcbbe9ab2f', 2000),
  // Public domain: "Fire fire flames" by Jon Sullivan, via Wikimedia Commons (see public/img/credits.json).
  flames: '/img/fire-fire-flames.jpg',
  buffalo: img('1564936281291-294551497d81', 2000),
  box: img('1601924582970-9238bcb495d9', 2000),
}

export const CATEGORIES = [
  { id: 'classics', label: 'Classics', blurb: 'The Neapolitan canon. Nothing added that does not need to be there.' },
  { id: 'specials', label: 'Specials', blurb: 'Seasonal ideas from the pass. Bolder, louder, briefly on the menu.' },
  { id: 'sides', label: 'Sides', blurb: 'Baked in the same fire, for the table.' },
  { id: 'drinks', label: 'Drinks', blurb: 'Cold, Italian and chosen to stand up to a charred crust.' },
]

export const SIZES = [
  { id: '12', label: '12"', note: 'Feeds one', delta: 0, scale: 0.72 },
  { id: '16', label: '16"', note: 'Feeds two', delta: 5, scale: 1 },
]

export const CRUSTS = [
  { id: 'classic', label: 'Classic', note: '48-hour cold-proved dough', delta: 0 },
  { id: 'sourdough', label: 'Sourdough', note: 'Wild yeast, deeper tang', delta: 1.5 },
]

export const ADDONS = [
  { id: 'mozz', label: 'Extra mozzarella', note: 'Fior di latte', delta: 2 },
  { id: 'pepperoni', label: 'Pepperoni', note: 'Cup and char', delta: 2.5 },
  { id: 'honey', label: 'Hot honey', note: 'Chilli infused', delta: 1.5 },
  { id: 'nduja', label: "'Nduja", note: 'Calabrian, spicy', delta: 2.5 },
  { id: 'burrata', label: 'Burrata', note: 'Torn after the bake', delta: 3.5 },
]

export const MENU = [
  // Classics
  {
    id: 'margherita', cat: 'classics', kind: 'pizza', name: 'Margherita', price: 10.5,
    desc: 'San Marzano tomato, fior di latte, basil, Sicilian olive oil.',
    tags: ['V'], img: img('1604068549290-dea0e4a305ca'),
  },
  {
    id: 'marinara', cat: 'classics', kind: 'pizza', name: 'Marinara', price: 9,
    desc: 'Tomato, confit garlic, wild oregano, cherry tomatoes, basil.',
    tags: ['VG'], img: img('1595854341625-f33ee10dbf94'),
  },
  {
    id: 'diavola', cat: 'classics', kind: 'pizza', name: 'Diavola', price: 12.5,
    desc: 'Spicy salame, fior di latte, tomato, chilli oil.',
    tags: ['Hot'], img: img('1628840042765-356cda07504e'),
  },
  {
    id: 'funghi', cat: 'classics', kind: 'pizza', name: 'Funghi e Cipolla', price: 11.5,
    desc: 'Roasted chestnut mushrooms, red onion, fior di latte, thyme.',
    tags: ['V'], img: img('1588315029754-2dd089d39a1a'),
  },
  {
    id: 'formaggi', cat: 'classics', kind: 'pizza', name: 'Quattro Formaggi', price: 13,
    desc: 'Fior di latte, gorgonzola dolce, taleggio, aged parmigiano.',
    tags: ['V'], img: img('1513104890138-7c749659a591'),
  },
  {
    id: 'salsiccia', cat: 'classics', kind: 'pizza', name: 'Salsiccia', price: 13,
    desc: 'Fennel sausage, tomato, fior di latte, rosemary, garlic.',
    tags: [], img: img('1590947132387-155cc02f3212'),
  },
  // Specials
  {
    id: 'rosso', cat: 'specials', kind: 'pizza', name: 'Il Rosso', price: 15, featured: true,
    desc: "'Nduja, soppressata, fior di latte, hot honey and a snowfall of pecorino. The one we are known for.",
    tags: ['Hot', 'Signature'], img: img('1541745537411-b8046dc6d66c', 1400),
  },
  {
    id: 'bufala', cat: 'specials', kind: 'pizza', name: 'Bufala Riserva', price: 14.5,
    desc: 'Campanian buffalo mozzarella, slow-roast tomato, basil, aged balsamic.',
    tags: ['V'], img: img('1574071318508-1cdbab80d002'),
  },
  {
    id: 'verde', cat: 'specials', kind: 'pizza', name: 'Verde', price: 13.5,
    desc: 'Wilted greens, whipped ricotta, lemon, garlic, pistachio pesto.',
    tags: ['V'], img: img('1593560708920-61dd98c46a4e'),
  },
  {
    id: 'prosciutto', cat: 'specials', kind: 'pizza', name: 'Prosciutto e Rucola', price: 15.5,
    desc: 'Twenty-four month prosciutto di Parma, rocket, parmigiano, after the bake.',
    tags: [], img: img('1528137871618-79d2761e3fd5'),
    look: { zoom: 1.35, origin: '55% 35%' }, // crops the blue table out of frame
  },
  {
    id: 'salumi', cat: 'specials', kind: 'pizza', name: 'Salumi Misti', price: 15,
    desc: 'Finocchiona, coppa and spianata, smoked scamorza, oregano.',
    tags: [], img: img('1600628421055-4d30de868b8f'),
  },
  // Sides
  {
    id: 'focaccia', cat: 'sides', kind: 'simple', name: 'Garlic Focaccia', price: 5.5,
    desc: 'Rosemary, sea salt, roasted garlic butter.',
    tags: ['V'], img: img('1619535860434-ba1d8fa12536', 600),
  },
  {
    id: 'pane', cat: 'sides', kind: 'simple', name: 'Sourdough and Butter', price: 4.5,
    desc: 'Our loaf, fire-baked, with cultured Cornish butter.',
    tags: ['V'], img: img('1586444248902-2f64eddc13df', 600),
  },
  {
    id: 'insalata', cat: 'sides', kind: 'simple', name: 'Insalata Romana', price: 7,
    desc: 'Gem lettuce, anchovy dressing, parmigiano, wood-fired croutons.',
    tags: [], img: img('1546793665-c74683f339c1', 600),
  },
  {
    id: 'cookie', cat: 'sides', kind: 'simple', name: 'Skillet Cookie', price: 6,
    desc: 'Dark chocolate and sea salt, baked to order in cast iron.',
    tags: ['V'], img: img('1548365328-8c6db3220e4c', 600),
  },
  // Drinks
  {
    id: 'limonata', cat: 'drinks', kind: 'simple', name: 'Sicilian Limonata', price: 3.5,
    desc: 'Pressed lemons, a little sugar, very cold.',
    tags: ['VG'], img: img('1523371054106-bbf80586c38c', 600),
  },
  {
    id: 'birra', cat: 'drinks', kind: 'simple', name: 'Italian Lager', price: 4.8,
    desc: 'Crisp Lombardy lager, 330ml. ID required on delivery.',
    tags: [], img: img('1608270586620-248524c67de9', 600),
  },
  {
    id: 'tea', cat: 'drinks', kind: 'simple', name: 'Peach Iced Tea', price: 3.5,
    desc: 'Brewed in house, white peach and lime.',
    tags: ['VG'], img: img('1556679343-c7306c1976bc', 600),
  },
  {
    id: 'cola', cat: 'drinks', kind: 'simple', name: 'Coca-Cola', price: 2.8,
    desc: 'Classic or Zero, 330ml can.',
    tags: [], img: img('1622483767028-3f66f32aef97', 600),
    look: { tone: 'dim' }, // bright studio ad shot, sunk to the board
  },
]

// Minutes from order to door (delivery) or to the pass (collection).
export const ETA_MINS = { delivery: 40, pickup: 20 }


export const DELIVERY_FEE = 2.95
export const FREE_DELIVERY_OVER = 35

export const money = (n) => `£${n.toFixed(2)}`

export function unitPrice(item, opts) {
  if (item.kind !== 'pizza' || !opts) return item.price
  const size = SIZES.find((s) => s.id === opts.size)?.delta ?? 0
  const crust = CRUSTS.find((c) => c.id === opts.crust)?.delta ?? 0
  const extras = (opts.addons || []).reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.delta ?? 0), 0)
  return item.price + size + crust + extras
}

export function describeOptions(item, opts) {
  if (item.kind !== 'pizza' || !opts) return ''
  const size = SIZES.find((s) => s.id === opts.size)?.label
  const crust = CRUSTS.find((c) => c.id === opts.crust)?.label
  const extras = (opts.addons || []).map((id) => ADDONS.find((a) => a.id === id)?.label).filter(Boolean)
  return [size, crust, ...extras.map((e) => `+ ${e}`)].join(' · ')
}

export function totals(subtotal, mode) {
  const fee = mode === 'delivery' && subtotal > 0 && subtotal < FREE_DELIVERY_OVER ? DELIVERY_FEE : 0
  return { subtotal, fee, total: subtotal + fee }
}

export function isOpenNow(date = new Date()) {
  const h = date.getHours()
  return BUSINESS.openDays.includes(date.getDay()) && h >= BUSINESS.openHour && h < BUSINESS.closeHour
}

// The moment the kitchen can start on an order placed now: now if open, else the next opening.
export function nextOpenAt(now = new Date()) {
  if (isOpenNow(now)) return now
  for (let i = 0; i < 8; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    d.setHours(BUSINESS.openHour, 0, 0, 0)
    if (d > now && BUSINESS.openDays.includes(d.getDay())) return d
  }
  return now
}

// When an order placed now reaches the door (or the pass). Adds the weekday when it is not today.
export function doorTime(mode, now = new Date()) {
  const at = new Date(nextOpenAt(now).getTime() + ETA_MINS[mode] * 60000)
  const time = at.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  return at.toDateString() === now.toDateString() ? time : `${at.toLocaleDateString('en-GB', { weekday: 'short' })} ${time}`
}
