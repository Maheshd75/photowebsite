import { products } from "./products";

export const orders = [
    {
      id: 'ORD-001',
      userId: 'user1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [
        { ...products[0], quantity: 2, selectedSize: '8x10' },
        { ...products[1], quantity: 1, selectedSize: '11x14' }
      ],
      total: 89.97,
      status: 'delivered',
      date: '2024-01-15',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-002',
      userId: 'user2',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      items: [
        { ...products[2], quantity: 1, selectedSize: '5x7' }
      ],
      total: 39.99,
      status: 'processing',
      date: '2024-01-20',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
    }
]