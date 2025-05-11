export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type ProductCategory = 'T-Shirts' | 'Shorts' | 'Hoodies' | 'Jackets' | 'Leggings' | 'Bikers' | 'Footwear' | 'Accessories' | 'Sets';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  images: string[]; // URLs
  category: ProductCategory;
  sizes: ProductSize[];
  colors: string[]; // e.g., ['Red', 'Blue', 'Green', 'Black', 'White']
  slug: string; 
  brand: string;
  stock: number;
  rating?: number; // Optional rating 1-5
  numReviews?: number; // Optional number of reviews
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  price: number; // price at time of order
  size: ProductSize;
  color: string;
}

export interface Order {
  id: string;
  userId: string; // assuming a user ID
  date: string; // ISO date string
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: string;
}

// Mock User type for auth context
export interface User {
  id: string;
  email: string;
  name?: string;
}

