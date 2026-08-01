/* Product catalogue ------------------------------------------------
   front  — packshot (shown by default)
   back   — the same item worn by a model (revealed by the whip spin)
   gallery — thumbnails on the product page
------------------------------------------------------------------- */

const GARMENT_DESC = {
  intro: 'artasimn department T-shirt [ a.dept ]',
  note:
    'Note:\n' +
    '* artasimn department T-shirt [ a.dept ] изготавливается\n' +
    'в течении 1 недели.\n' +
    'Пожалуйста немного подожди… спасибо',
  community: '/artasimn department [ a.dept. ] - тату сообщество*'
};

const PRODUCTS = [
  /* ----------------------------- GARMENT ----------------------------- */
  {
    id: 'tank-hendrix',
    cat: 'garment',
    title: 'TANK TEE JIMMY HENDRIX, JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    front: 'assets/products/tank-hendrix.png',
    back: 'assets/models/m-couch-1.png',
    gallery: [
      'assets/models/m-couch-1.png',
      'assets/models/m-bass-girl.png',
      'assets/models/m-guitar-guy.png',
      'assets/models/m-couch-2.png'
    ],
    specs: ['100% cotton', 'black color', '200 gm', 'Tang top']
  },
  {
    id: 'tank-led-zeppelin',
    cat: 'garment',
    title: 'TANK TEE LED ZEPPELIN, JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    front: 'assets/products/tank-led-zeppelin.png',
    back: 'assets/models/m-couch-2.png',
    gallery: [
      'assets/models/m-couch-2.png',
      'assets/models/m-couch-1.png',
      'assets/models/m-bass-girl.png'
    ],
    specs: ['100% cotton', 'black color', '200 gm', 'Tang top']
  },
  {
    id: 'tank-johnny-cash',
    cat: 'garment',
    title: 'TANK TEE JOHNNY CASH , JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    front: 'assets/products/tank-johnny-cash.png',
    back: 'assets/models/m-bass-girl.png',
    gallery: [
      'assets/models/m-bass-girl.png',
      'assets/models/m-couch-1.png',
      'assets/models/m-guitar-guy.png'
    ],
    specs: ['100% cotton', 'black color', '200 gm', 'Tang top']
  },
  {
    id: 'janis-joplin',
    cat: 'garment',
    title: 'JANIS JOPLIN, JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    front: 'assets/products/janis-joplin.png',
    back: 'assets/models/m-stand-girl.png',
    gallery: [
      'assets/models/m-stand-girl.png',
      'assets/models/m-arms-girl.png',
      'assets/models/m-guitar-guy.png'
    ],
    specs: ['100% cotton', 'black color', '200 gm', 'T-shirt']
  },
  {
    id: 'mick-jagger',
    cat: 'garment',
    title: 'MICK JAGGER JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    front: 'assets/products/mick-jagger.png',
    back: 'assets/models/m-arms-girl.png',
    gallery: [
      'assets/models/m-arms-girl.png',
      'assets/models/m-stand-girl.png',
      'assets/models/m-couch-2.png'
    ],
    specs: ['100% cotton', 'black color', '200 gm', 'T-shirt']
  },
  {
    id: 'johnny-cash',
    cat: 'garment',
    title: 'JOHNNY CASH , JIM MARSHAL FOR ADEPT',
    price: '5 500 p',
    front: 'assets/products/johnny-cash.png',
    back: 'assets/models/m-guitar-guy.png',
    gallery: [
      'assets/models/m-guitar-guy.png',
      'assets/models/m-bass-girl.png',
      'assets/models/m-couch-1.png'
    ],
    specs: ['100% cotton', 'black color', '200 gm', 'T-shirt']
  },

  /* ----------------------------- JEWELRY ----------------------------- */
  {
    id: 'endless-knot-ring',
    cat: 'jewelry',
    title: 'ENDLESS KNOT RING',
    price: '25 500 p',
    front: 'assets/products/endless-knot-ring.png',
    back: 'assets/models/m-ring-hand.png',
    gallery: ['assets/models/m-ring-hand.png', 'assets/models/m-bracelet.png'],
    specs: ['925 silver', 'oxidized finish', 'handmade']
  },
  {
    id: 'endless-knot-kongo',
    cat: 'jewelry',
    title: 'ENDLESS KNOT KONGO',
    price: '10 000 p',
    front: 'assets/products/endless-knot-kongo.png',
    back: 'assets/models/m-earring.png',
    gallery: ['assets/models/m-earring.png', 'assets/models/m-ring-hand.png'],
    specs: ['925 silver', 'oxidized finish', 'sold as a single piece']
  },
  {
    id: 'hard-bracelet',
    cat: 'jewelry',
    title: 'HARD BRACELET ‘A PLUS&amp;#202503925’',
    price: '88 704 p',
    front: 'assets/products/hard-bracelet.png',
    back: 'assets/models/m-bracelet.png',
    gallery: ['assets/models/m-bracelet.png', 'assets/models/m-ring-hand.png'],
    specs: ['925 silver', 'oxidized finish', 'adjustable cuff']
  },
  {
    id: 'pendant-angelisdead',
    cat: 'jewelry',
    title: 'PENDANT"ANGELISDEAD"',
    price: '35 850 p',
    front: 'assets/products/pendant-angelisdead.png',
    back: 'assets/models/m-pendant.png',
    gallery: ['assets/models/m-pendant.png', 'assets/models/m-bracelet.png'],
    specs: ['925 silver', 'oxidized finish', 'chain included']
  }
];

const byCat = (cat) => PRODUCTS.filter((p) => p.cat === cat);
