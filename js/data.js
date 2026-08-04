/* Catalogue --------------------------------------------------------
   images: ordered list of photos for the hover scrub-through and the
   product-page gallery. First image is the default/packshot.
------------------------------------------------------------------- */

const PRODUCTS = [
  {
    id: 'endless-knot-ring',
    cat: 'jewellery',
    title: 'ENDLESS KNOT RING',
    price: '25 500 p',
    images: [
      'assets/products/ring-endless-knot/1.png',
      'assets/products/ring-endless-knot/2.png',
      'assets/products/ring-endless-knot/3.png'
    ],
    material: '925 silver, oxidized finish'
  },
  {
    id: 'tee-johnny-cash',
    cat: 'garment',
    title: 'JOHNNY CASH , JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    images: [
      'assets/products/tee-johnny-cash/1.png',
      'assets/products/tee-johnny-cash/2.png'
    ],
    material: '100% cotton, black color, 200 gm'
  },
  {
    id: 'hoodie-everyday',
    cat: 'garment',
    title: "'EVERY DAY' LONG SLEEVE",
    price: '6 670 p',
    images: [
      'assets/products/hoodie-everyday/1.png',
      'assets/products/hoodie-everyday/2.png',
      'assets/products/hoodie-everyday/3.png'
    ],
    material: '100% cotton, black color'
  },
  {
    id: 'pendant-angelisdead',
    cat: 'jewellery',
    title: 'PENDANT"ANGELISDEAD"',
    price: '35 850 p',
    images: [
      'assets/products/pendant-angelisdead/1.png',
      'assets/products/pendant-angelisdead/2.png',
      'assets/products/pendant-angelisdead/3.png',
      'assets/products/pendant-angelisdead/4.png'
    ],
    material: '925 silver, oxidized finish, chain included'
  },
  {
    id: 'ring-tattoo-session',
    cat: 'jewellery',
    title: "RING 'TATTOO SESSION'",
    price: '23 640 p',
    images: [
      'assets/products/ring-tattoo-session/1.png',
      'assets/products/ring-tattoo-session/2.png',
      'assets/products/ring-tattoo-session/3.png',
      'assets/products/ring-tattoo-session/4.png'
    ],
    material: '925 silver, oxidized finish'
  }
];

/* Tattoo sketches — a portfolio catalogue, not a product for sale.
   Ordered newest first; "year" drives the scrollspy year-list on
   tattoo.html. */
const SKETCHES = [
  {
    id: 'nobody-loves-me',
    year: 2026,
    date: '02 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/nobody-loves-me.png',
    descriptionRu: [
      'Внимание: эскизы ARTASIMN могут вызвать эстетическую зависимость.',
      'Каждый дизайн на этом сайте — авторская работа artasimn, созданная без использования шаблонов и повторов. Мы уделяем внимание каждой линии, вкладывая в эскиз идею, стиль и характер.',
      'Это не просто картинки — это продуманные концепции с уникальным почерком. Выбирая наш эскиз, вы выбираете индивидуальность и качество.',
      'Если вам понравился эскиз делай скрин и отправь нам в ТГ или ДМ [ инстаграм ]\nмы поможем записаться и определить стоимость.'
    ],
    descriptionEn: [
      'Warning: ARTASIMN sketches may cause aesthetic addiction.',
      'Every design on this website is an original creation by artasimn, made without the use of templates or repetition. We pay attention to every line, putting thought, style, and character into each sketch.',
      'These are not just images — they are well-crafted concepts with a unique signature. By choosing one of our sketches, you choose individuality and quality.',
      'If you found a sketch you like, take a screenshot and send it to us via Telegram or Instagram DM — we’ll help you book a session and estimate the cost.'
    ]
  }
];

const byYear = (year) => SKETCHES.filter((s) => s.year === year);
const sketchYears = () => [...new Set(SKETCHES.map((s) => s.year))].sort((a, b) => b - a);

const MENU = [
  {
    id: 'jewellery',
    label: 'Jewellery',
    image: 'assets/menu/jewellery.png',
    kind: 'filter'
  },
  {
    id: 'garment',
    label: 'Garment',
    image: 'assets/menu/garment.png',
    kind: 'filter'
  },
  {
    id: 'tattoo',
    label: 'Tattoo',
    image: 'assets/menu/tattoo.png',
    kind: 'page',
    href: 'tattoo.html'
  },
  {
    id: 'tattoo-office',
    label: 'Tatto Office',
    image: 'assets/menu/tattoo-office.png',
    kind: 'external',
    href: 'https://tattoo-office.com'
  }
];

const byCat = (cat) => PRODUCTS.filter((p) => p.cat === cat);
