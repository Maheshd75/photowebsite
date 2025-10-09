

export const products = [
  // Frames
  {
    id: '1',
    name: 'Classic Wooden Frame',
    price: 45,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1634252701103-fca57c571a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBwaG90byUyMGZyYW1lfGVufDF8fHx8MTc1OTIyNjY3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Traditional',
    material: 'Oak Wood',
    sizes: ['8x10', '11x14', '16x20'],
    productType: 'frames',
    isSale: true
  },
  {
    id: '2',
    name: 'Modern Metal Frame',
    price: 35,
    image: 'https://images.unsplash.com/photo-1685230415348-73ecaa8d02e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHBpY3R1cmUlMjBmcmFtZXxlbnwxfHx8fDE3NTkxNjY5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Modern',
    material: 'Aluminum',
    sizes: ['5x7', '8x10', '11x14', '16x20'],
    productType: 'frames',
    isNew: true
  },
  {
    id: '3',
    name: 'Minimalist Frame Set',
    price: 28,
    image: 'https://images.unsplash.com/photo-1652258996400-bcc8f58bdc87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwaWN0dXJlJTIwZnJhbWV8ZW58MXx8fHwxNzU5MjI2Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Contemporary',
    material: 'Plastic',
    sizes: ['4x6', '5x7', '8x10'],
    productType: 'frames'
  },
  {
    id: '4',
    name: 'Vintage Gold Frame',
    price: 75,
    originalPrice: 95,
    image: 'https://images.unsplash.com/photo-1553009902-3a450a9609ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcGhvdG8lMjBmcmFtZXxlbnwxfHx8fDE3NTkyMjY2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vintage',
    material: 'Gold Plated',
    sizes: ['8x10', '11x14'],
    productType: 'frames',
    isSale: true
  },
  {
    id: '5',
    name: 'Elegant Black Frame',
    price: 42,
    image: 'https://images.unsplash.com/photo-1672679136563-7a7b5dae2e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGljdHVyZSUyMGZyYW1lfGVufDF8fHx8MTc1OTIyNjY3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Classic',
    material: 'Wood',
    sizes: ['5x7', '8x10', '11x14', '16x20', '20x24'],
    productType: 'frames'
  },
  {
    id: '6',
    name: 'Rustic Barn Wood Frame',
    price: 52,
    image: 'https://images.unsplash.com/photo-1634252701103-fca57c571a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBwaG90byUyMGZyYW1lfGVufDF8fHx8MTc1OTIyNjY3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Rustic',
    material: 'Reclaimed Wood',
    sizes: ['8x10', '11x14', '16x20'],
    productType: 'frames',
    isNew: true
  },
  // Cups
  {
    id: '7',
    name: 'Classic Coffee Mug',
    price: 18,
    originalPrice: 25,
    image: 'https://images.unsplash.com/photo-1640878408145-2477b4567489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjBjdXB8ZW58MXx8fHwxNzU5MjI4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Classic',
    material: 'Ceramic',
    sizes: ['8oz', '12oz', '16oz'],
    productType: 'cups',
    isSale: true
  },
  {
    id: '8',
    name: 'Modern White Mug',
    price: 15,
    image: 'https://images.unsplash.com/photo-1581540222114-8149256ef011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnJTIwd2hpdGV8ZW58MXx8fHwxNzU5MjI4MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Modern',
    material: 'Ceramic',
    sizes: ['8oz', '12oz'],
    productType: 'cups',
    isNew: true
  },
  {
    id: '9',
    name: 'Travel Stainless Mug',
    price: 32,
    image: 'https://images.unsplash.com/photo-1588793076577-4c2b666452d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBtdWclMjBzdGFpbmxlc3N8ZW58MXx8fHwxNzU5MjI4MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Travel',
    material: 'Stainless Steel',
    sizes: ['12oz', '16oz', '20oz'],
    productType: 'cups'
  },
  {
    id: '10',
    name: 'Artisan Coffee Cup',
    price: 22,
    image: 'https://images.unsplash.com/photo-1531709045947-c421467cfaaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBoYW5kbGV8ZW58MXx8fHwxNzU5MjI4MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Artisan',
    material: 'Handmade Ceramic',
    sizes: ['6oz', '8oz', '10oz'],
    productType: 'cups'
  },
  {
    id: '11',
    name: 'Vintage Style Mug',
    price: 26,
    originalPrice: 35,
    image: 'https://images.unsplash.com/photo-1640878408145-2477b4567489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjBjdXB8ZW58MXx8fHwxNzU5MjI4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vintage',
    material: 'Porcelain',
    sizes: ['8oz', '12oz'],
    productType: 'cups',
    isSale: true
  },
  {
    id: '12',
    name: 'Glass Coffee Mug',
    price: 19,
    image: 'https://images.unsplash.com/photo-1581540222114-8149256ef011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnJTIwd2hpdGV8ZW58MXx8fHwxNzU5MjI4MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Contemporary',
    material: 'Borosilicate Glass',
    sizes: ['8oz', '12oz', '16oz'],
    productType: 'cups',
    isNew: true
  }
];