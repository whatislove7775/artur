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

const SKETCH = {
  id: 'nobody-loves-me',
  date: '02 2026',
  caption: 'эскиз от artasimn',
  image: 'assets/sketches/nobody-loves-me.png'
};

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
    kind: 'external',
    href: 'https://tattoo-office.com'
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
