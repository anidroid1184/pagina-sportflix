
import type { Product, ProductCategory, ProductSize } from '@/types';

const ALL_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COMMON_SIZES: ProductSize[] = ['S', 'M', 'L', 'XL'];
const ALL_COLORS = ['Negro', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Gris', 'Amarillo', 'Naranja', 'Rosado', 'Morado', 'Azul Petróleo', 'Gris Jaspeado'];

const getRandomElements = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Performance Training Tee',
    slug: 'performance-training-tee',
    description: 'Lightweight and breathable tee for peak performance.',
    longDescription: 'Engineered with moisture-wicking fabric, this tee keeps you cool and dry during intense workouts. Its ergonomic design allows for a full range of motion, making it perfect for running, gym sessions, or any athletic activity. Features reflective details for low-light visibility.',
    price: 79900,
    images: [
      'https://picsum.photos/seed/prod1img1/600/600',
      'https://picsum.photos/seed/prod1img2/600/600',
      'https://picsum.photos/seed/prod1img3/600/600',
    ],
    category: 'T-Shirts',
    sizes: COMMON_SIZES,
    colors: getRandomElements(ALL_COLORS, 3),
    brand: 'FitStyle Pro',
    stock: 150,
    rating: 4.5,
    numReviews: 120,
  },
  {
    id: '2',
    name: 'FlexFit Workout Shorts',
    slug: 'flexfit-workout-shorts',
    description: 'Stretchable and durable shorts for maximum flexibility.',
    longDescription: 'The FlexFit Workout Shorts are designed for comfort and performance. Made with a 4-way stretch fabric, they move with you. An elastic waistband with an internal drawcord ensures a secure fit. Includes zippered pockets to keep your essentials safe.',
    price: 99900,
    images: [
      'https://picsum.photos/seed/prod2img1/600/600',
      'https://picsum.photos/seed/prod2img2/600/600',
    ],
    category: 'Shorts',
    sizes: COMMON_SIZES,
    colors: getRandomElements(ALL_COLORS, 4),
    brand: 'ActiveWear Co.',
    stock: 200,
    rating: 4.7,
    numReviews: 95,
  },
  {
    id: '3',
    name: 'CozyTech Fleece Hoodie',
    slug: 'cozytech-fleece-hoodie',
    description: 'Warm and comfortable hoodie for cool weather.',
    longDescription: 'Stay warm without sacrificing style in our CozyTech Fleece Hoodie. The soft fleece interior provides excellent insulation, while the sleek exterior gives a modern look. Features a kangaroo pocket and an adjustable hood.',
    price: 149900,
    images: [
      'https://picsum.photos/seed/prod3img1/600/600',
      'https://picsum.photos/seed/prod3img2/600/600',
      'https://picsum.photos/seed/prod3img3/600/600',
      'https://picsum.photos/seed/prod3img4/600/600',
    ],
    category: 'Hoodies',
    sizes: ALL_SIZES,
    colors: getRandomElements(ALL_COLORS, 2),
    brand: 'Urban Comfort',
    stock: 100,
    rating: 4.8,
    numReviews: 150,
  },
  {
    id: '4',
    name: 'All-Weather Running Jacket',
    slug: 'all-weather-running-jacket',
    description: 'Water-resistant and windproof jacket for all conditions.',
    longDescription: 'Don\'t let the weather stop you. This All-Weather Running Jacket is built with a lightweight, water-resistant, and windproof shell. Ventilated panels ensure breathability, and secure-zip pockets protect your valuables. Its packable design makes it easy to carry.',
    price: 219900,
    images: [
      'https://picsum.photos/seed/prod4img1/600/600',
      'https://picsum.photos/seed/prod4img2/600/600',
    ],
    category: 'Jackets',
    sizes: COMMON_SIZES,
    colors: ['Negro', 'Azul Marino', 'Carbón'],
    brand: 'Endurance Gear',
    stock: 75,
    rating: 4.6,
    numReviews: 80,
  },
  {
    id: '5',
    name: 'Sport Ankle Socks (3-Pack)',
    slug: 'sport-ankle-socks-3-pack',
    description: 'Cushioned and breathable ankle socks.',
    longDescription: 'Experience ultimate comfort with our Sport Ankle Socks. Designed with targeted cushioning and arch support, these socks are perfect for any sport. The moisture-wicking material keeps your feet dry and comfortable. Sold in a convenient 3-pack.',
    price: 45900,
    images: ['https://picsum.photos/seed/prod5img1/600/600'],
    category: 'Accessories',
    sizes: ['M', 'L'], // Sock sizes often M/L
    colors: ['Blanco', 'Negro', 'Gris'],
    brand: 'FitStyle Basics',
    stock: 300,
    rating: 4.3,
    numReviews: 200,
  },
  {
    id: '6',
    name: 'TrailBlazer Hiking Boots',
    slug: 'trailblazer-hiking-boots',
    description: 'Durable and supportive boots for rugged terrains.',
    longDescription: 'Conquer any trail with the TrailBlazer Hiking Boots. Featuring a waterproof membrane, robust ankle support, and a high-traction outsole, these boots are built for adventure. The cushioned insole provides all-day comfort on long hikes.',
    price: 349900,
    images: [
      'https://picsum.photos/seed/prod6img1/600/600',
      'https://picsum.photos/seed/prod6img2/600/600',
      'https://picsum.photos/seed/prod6img3/600/600',
    ],
    category: 'Footwear',
    sizes: ['S', 'M', 'L', 'XL'], // Representing shoe sizes 7-13 range
    colors: ['Café', 'Gris Oscuro', 'Verde Oliva'],
    brand: 'Outdoor Pro',
    stock: 60,
    rating: 4.9,
    numReviews: 110,
  },
   {
    id: '7',
    name: 'YogaFlow Leggings',
    slug: 'yogaflow-leggings',
    description: 'High-waisted, buttery-soft leggings for yoga and pilates.',
    longDescription: 'Find your flow with our YogaFlow Leggings. Made from a premium, four-way stretch fabric that feels like a second skin. The high-waisted design offers gentle compression and support, while the opaque material ensures confidence in every pose. Hidden waistband pocket for small essentials.',
    price: 129900,
    images: [
      'https://picsum.photos/seed/prod7img1/600/600',
      'https://picsum.photos/seed/prod7img2/600/600',
    ],
    category: 'Leggings',
    sizes: COMMON_SIZES,
    colors: getRandomElements(ALL_COLORS, 3),
    brand: 'ZenFit',
    stock: 120,
    rating: 4.8,
    numReviews: 180,
  },
  {
    id: '8',
    name: 'AeroSpeed Running Shoes',
    slug: 'aerospeed-running-shoes',
    description: 'Lightweight and responsive shoes for runners.',
    longDescription: 'Shave seconds off your PR with the AeroSpeed Running Shoes. Engineered for speed and agility, these shoes feature a responsive foam midsole and a breathable mesh upper. The durable rubber outsole provides excellent traction on various surfaces.',
    price: 299900,
    images: [
      'https://picsum.photos/seed/prod8img1/600/600',
      'https://picsum.photos/seed/prod8img2/600/600',
      'https://picsum.photos/seed/prod8img3/600/600',
    ],
    category: 'Footwear',
    sizes: ['S', 'M', 'L', 'XL'], // Representing shoe sizes
    colors: getRandomElements(ALL_COLORS, 3),
    brand: 'Velocity Sports',
    stock: 90,
    rating: 4.7,
    numReviews: 130,
  },
  {
    id: '9',
    name: 'AeroCycle Biker Shorts',
    slug: 'aerocycle-biker-shorts',
    description: 'Comfortable and supportive biker shorts for cycling or fashion.',
    longDescription: 'The AeroCycle Biker Shorts offer a perfect blend of performance and style. Featuring a comfortable chamois for long rides (optional based on final design) and a sleek, high-waisted fit that stays in place. Made with moisture-wicking, compressive fabric for support and breathability. Ideal for cycling, workouts, or as a fashion statement.',
    price: 119900,
    images: [
      'https://picsum.photos/seed/prod9img1/600/600',
      'https://picsum.photos/seed/prod9img2/600/600',
    ],
    category: 'Bikers',
    sizes: COMMON_SIZES,
    colors: ['Negro', 'Azul Marino', 'Verde Bosque'],
    brand: 'CyclePro',
    stock: 110,
    rating: 4.6,
    numReviews: 70,
  },
  {
    id: '10',
    name: 'Blusa Deportiva Tipo Esqueleto',
    slug: 'blusa-deportiva-esqueleto',
    description: 'Nueva blusa deportiva tipo esqueleto, ligera y transpirable.',
    longDescription: 'Descubre la nueva blusa deportiva tipo esqueleto, perfecta para tus entrenamientos más intensos. Su diseño ligero y transpirable te mantendrá fresca y cómoda, permitiendo una total libertad de movimiento. Ideal para el gimnasio, running o cualquier actividad deportiva.',
    price: 30000,
    images: [
      'https://picsum.photos/seed/blusadeportiva1/600/600', 
      'https://picsum.photos/seed/blusadeportiva2/600/600',
    ],
    category: 'T-Shirts',
    sizes: COMMON_SIZES,
    colors: ['Azul Petróleo', 'Negro', 'Gris Jaspeado'],
    brand: 'SPORFLIX Basics',
    stock: 130,
    rating: 4.4,
    numReviews: 75,
  },
  {
    id: '11',
    name: 'Set Buso Manga Rangla y Biker',
    slug: 'set-buso-manga-rangla-y-biker',
    description: 'Nuevo set de buso manga rangla y biker shorts. Cómodo y versátil.',
    longDescription: 'Este conjunto deportivo incluye un buso de manga rangla y unos biker shorts, ofreciendo comodidad y estilo para tus actividades. Fabricado con materiales de alta calidad para mayor durabilidad y confort. Perfecto para el gimnasio, actividades al aire libre o para un look deportivo casual.',
    price: 60000,
    images: [
      'https://picsum.photos/seed/setbusobiker1/600/600', // Placeholder for the user's image
      'https://picsum.photos/seed/setbusobiker2/600/600',
    ],
    category: 'Sets',
    sizes: COMMON_SIZES, 
    colors: ['Negro', 'Gris Oscuro'], // Assuming black or dark grey from image
    brand: 'SPORFLIX Active',
    stock: 50,
    rating: 4.7, // Arbitrary
    numReviews: 25, // Arbitrary
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const productCategories: ProductCategory[] = ['T-Shirts', 'Shorts', 'Hoodies', 'Jackets', 'Leggings', 'Bikers', 'Footwear', 'Accessories', 'Sets'];
export const productSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const productColors: string[] = Array.from(new Set(products.flatMap(p => p.colors))).sort();
