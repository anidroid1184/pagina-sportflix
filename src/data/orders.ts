import type { Order, OrderItem, ProductSize } from '@/types';
import { products } from './products';

const createRandomOrderItems = (): OrderItem[] => {
  const numItems = Math.floor(Math.random() * 3) + 1; // 1 to 3 items per order
  const orderItems: OrderItem[] = [];
  const usedProductIds = new Set<string>();

  for (let i = 0; i < numItems; i++) {
    let randomProduct = products[Math.floor(Math.random() * products.length)];
    while(usedProductIds.has(randomProduct.id)) { // Ensure unique products per order
      randomProduct = products[Math.floor(Math.random() * products.length)];
    }
    usedProductIds.add(randomProduct.id);

    orderItems.push({
      productId: randomProduct.id,
      productName: randomProduct.name,
      image: randomProduct.images[0],
      quantity: Math.floor(Math.random() * 2) + 1, // 1 or 2 quantity
      price: randomProduct.price,
      size: randomProduct.sizes[Math.floor(Math.random() * randomProduct.sizes.length)] as ProductSize,
      color: randomProduct.colors[Math.floor(Math.random() * randomProduct.colors.length)],
    });
  }
  return orderItems;
};

export const orders: Order[] = [
  {
    id: 'ORD001',
    userId: 'user123', // Mock user ID
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    items: createRandomOrderItems(),
    totalAmount: 0, // Will be calculated below
    status: 'Delivered',
    shippingAddress: {
      street: '123 Fit Lane',
      city: 'Sportsville',
      postalCode: '12345',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD002',
    userId: 'user123',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    items: createRandomOrderItems(),
    totalAmount: 0,
    status: 'Shipped',
     shippingAddress: {
      street: '456 Active Ave',
      city: 'Runners City',
      postalCode: '67890',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD003',
    userId: 'user123',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
    items: createRandomOrderItems(),
    totalAmount: 0,
    status: 'Processing',
     shippingAddress: {
      street: '789 Gym St',
      city: 'Flexburg',
      postalCode: '54321',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
  },
];

// Calculate totalAmount for each order
orders.forEach(order => {
  order.totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};
