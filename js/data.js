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
    material: '100% cotton, black color, 200 gm',
    sizes: ['S', 'M', 'L', 'XL']
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
    material: '100% cotton, black color',
    sizes: ['S', 'M', 'L', 'XL']
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

/* a.dept's own small catalogue — separate from PRODUCTS above, never
   shows up in the main items grid or category filters. product.html
   checks this list too (after PRODUCTS), and switches to the dark
   theme + a.dept favicon whenever it finds the id here instead. */
const ADEPT_PRODUCTS = [
  {
    id: 'adept-tee-01',
    title: 'JOHNNY CASH , JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    images: [
      'assets/products/adept-tee/1.png',
      'assets/products/adept-tee/2.webp'
    ],
    material: '100% cotton, black color, 200 gm',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

/* Tattoo sketches — a portfolio catalogue, not a product for sale.
   Ordered newest first; "year" drives the scrollspy year-list on
   tattoo.html. */
const SKETCH_DESC_RU = [
  'Внимание: эскизы ARTASIMN могут вызвать эстетическую зависимость.',
  'Каждый дизайн на этом сайте — авторская работа artasimn, созданная без использования шаблонов и повторов. Мы уделяем внимание каждой линии, вкладывая в эскиз идею, стиль и характер.',
  'Это не просто картинки — это продуманные концепции с уникальным почерком. Выбирая наш эскиз, вы выбираете индивидуальность и качество.',
  'Если вам понравился эскиз делай скрин и отправь нам в ТГ или ДМ [ инстаграм ]\nмы поможем записаться и определить стоимость.'
];
const SKETCH_DESC_EN = [
  'Warning: ARTASIMN sketches may cause aesthetic addiction.',
  'Every design on this website is an original creation by artasimn, made without the use of templates or repetition. We pay attention to every line, putting thought, style, and character into each sketch.',
  'These are not just images — they are well-crafted concepts with a unique signature. By choosing one of our sketches, you choose individuality and quality.',
  'If you found a sketch you like, take a screenshot and send it to us via Telegram or Instagram DM — we’ll help you book a session and estimate the cost.'
];

const SKETCHES = [
  {
    id: 'nobody-loves-me',
    year: 2026,
    date: '02 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/nobody-loves-me.png',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'bleeding-heart',
    year: 2026,
    date: '01 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/bleeding-heart.png',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'reaper-collage',
    year: 2026,
    date: '03 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/reaper-collage.png',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'church-domes',
    year: 2026,
    date: '08 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/church-domes.png',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'heart-and-globe',
    year: 2026,
    date: '07 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/heart-and-globe.png',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'star-cross',
    year: 2026,
    date: '23 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/star-cross.png',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'last-confession',
    year: 2026,
    date: '02 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/last-confession.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'midnight-psalm',
    year: 2026,
    date: '05 2026',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/midnight-psalm.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'forgotten-oath',
    year: 2025,
    date: '03 2025',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/forgotten-oath.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'withered-crown',
    year: 2025,
    date: '09 2025',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/withered-crown.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'paper-moon',
    year: 2024,
    date: '01 2024',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/paper-moon.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'black-orchid',
    year: 2024,
    date: '08 2024',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/black-orchid.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'velvet-noose',
    year: 2023,
    date: '06 2023',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/velvet-noose.jpg',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'broken-rosary',
    year: 2023,
    date: '12 2023',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/broken-rosary.jpg',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'glass-heart',
    year: 2022,
    date: '02 2022',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/glass-heart.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'ash-and-bone',
    year: 2022,
    date: '10 2022',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/ash-and-bone.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'winter-vow',
    year: 2021,
    date: '11 2021',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/winter-vow.jpg',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'crooked-halo',
    year: 2021,
    date: '07 2021',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/crooked-halo.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'silent-thorn',
    year: 2020,
    date: '04 2020',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/silent-thorn.jpg',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'hollow-saint',
    year: 2020,
    date: '09 2020',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/hollow-saint.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
  },
  {
    id: 'faded-serpent',
    year: 2020,
    date: '01 2020',
    caption: 'эскиз от artasimn',
    image: 'assets/sketches/faded-serpent.webp',
    descriptionRu: SKETCH_DESC_RU,
    descriptionEn: SKETCH_DESC_EN
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
