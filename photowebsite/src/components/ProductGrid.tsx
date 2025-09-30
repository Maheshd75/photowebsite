import { useState } from 'react';
import { ProductCard, Product } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { products } from '../data/products';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductGrid({ onAddToCart, onProductClick }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'Traditional', 'Modern', 'Contemporary', 'Vintage', 'Classic', 'Rustic'];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl tracking-tight">
            Our Frame Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium frames crafted from the finest materials. Each piece is designed to enhance and protect your most treasured memories.
          </p>
        </div>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto p-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-3 py-2 text-sm capitalize"
              >
                {category === 'all' ? 'All Frames' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  );
}