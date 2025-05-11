import type { Product, ProductCategory, ProductSize } from '@/types';

const ALL_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COMMON_SIZES: ProductSize[] = ['S', 'M', 'L', 'XL'];
const ALL_COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Gray', 'Yellow', 'Orange'];

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
    price: 29.99,
    images: [
      'https://picsum.photos/seed/prod1img1/600/600',
      'https://picsum.photos/seed/prod1img2/600/600',
      'https://picsum.photos/seed/prod1img3/600/600',
    ],
    category: 'T-Shirt',
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
    price: 39.99,
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
    price: 59.99,
    images: [
      'https://picsum.photos/seed/prod3img1/600/600',
      'https://picsum.photos/seed/prod3img2/600/600',
      'https://picsum.photos/seed/prod3img3/600/600',
      'https://picsum.photos/seed/prod3img4/600/600',
    ],
    category: 'Hoodie',
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
    price: 89.99,
    images: [
      'https://picsum.photos/seed/prod4img1/600/600',
      'https://picsum.photos/seed/prod4img2/600/600',
    ],
    category: 'Jacket',
    sizes: COMMON_SIZES,
    colors: ['Black', 'Navy', 'Charcoal'],
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
    price: 15.99,
    images: ['https://picsum.photos/seed/prod5img1/600/600'],
    category: 'Accessories',
    sizes: ['M', 'L'], // Sock sizes often M/L
    colors: ['White', 'Black', 'Gray'],
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
    price: 129.99,
    images: [
      'https://picsum.photos/seed/prod6img1/600/600',
      'https://picsum.photos/seed/prod6img2/600/600',
      'https://picsum.photos/seed/prod6img3/600/600',
    ],
    category: 'Footwear',
    sizes: ['S', 'M', 'L', 'XL'], // Representing shoe sizes 7-13 range
    colors: ['Brown', 'Dark Gray', 'Olive Green'],
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
    price: 49.99,
    images: [
      'https://picsum.photos/seed/prod7img1/600/600',
      'https://picsum.photos/seed/prod7img2/600/600',
    ],
    category: 'Shorts', // Technically leggings, but fits shorts/bottoms category best
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
    price: 119.99,
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
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const productCategories: ProductCategory[] = ['T-Shirt', 'Shorts', 'Hoodie', 'Jacket', 'Accessories', 'Footwear'];
export const productSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const productColors: string[] = Array.from(new Set(products.flatMap(p => p.colors))).sort();
