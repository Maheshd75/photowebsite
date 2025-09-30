import { useState, useMemo } from 'react';
import { ArrowLeft, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ProductCard, Product } from './ProductCard';
import { products } from '../data/products';

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

interface Filters {
  productTypes: string[];
  categories: string[];
  sizes: string[];
  priceRange: [number, number];
  materials: string[];
  onSale: boolean;
  isNew: boolean;
}

export function CategoryPage({ onAddToCart, onProductClick, onBack }: CategoryPageProps) {
  const [filters, setFilters] = useState<Filters>({
    productTypes: [],
    categories: [],
    sizes: [],
    priceRange: [0, 100],
    materials: [],
    onSale: false,
    isNew: false
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const productTypes = [...new Set(products.map(p => p.productType))];
    const categories = [...new Set(products.map(p => p.category))];
    const sizes = [...new Set(products.flatMap(p => p.sizes))];
    const materials = [...new Set(products.map(p => p.material))];
    const maxPrice = Math.max(...products.map(p => p.price));
    
    return { productTypes, categories, sizes, materials, maxPrice };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Product type filter
      if (filters.productTypes.length > 0 && !filters.productTypes.includes(product.productType)) {
        return false;
      }
      
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      
      // Size filter
      if (filters.sizes.length > 0 && !product.sizes.some(size => filters.sizes.includes(size))) {
        return false;
      }
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Material filter
      if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
        return false;
      }
      
      // Sale filter
      if (filters.onSale && !product.isSale) {
        return false;
      }
      
      // New filter
      if (filters.isNew && !product.isNew) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'productTypes' | 'categories' | 'sizes' | 'materials', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      productTypes: [],
      categories: [],
      sizes: [],
      priceRange: [0, filterOptions.maxPrice],
      materials: [],
      onSale: false,
      isNew: false
    });
  };

  const activeFiltersCount = 
    filters.productTypes.length + 
    filters.categories.length + 
    filters.sizes.length + 
    filters.materials.length + 
    (filters.onSale ? 1 : 0) + 
    (filters.isNew ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < filterOptions.maxPrice ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Product Type */}
      <div className="space-y-3">
        <h4>Product Type</h4>
        <div className="space-y-2">
          {filterOptions.productTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.productTypes.includes(type)}
                onCheckedChange={() => toggleArrayFilter('productTypes', type)}
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm capitalize cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4>Categories</h4>
        <div className="space-y-2">
          {filterOptions.categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleArrayFilter('categories', category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4>Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={filterOptions.maxPrice}
            min={0}
            step={5}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div className="space-y-3">
        <h4>Sizes</h4>
        <div className="grid grid-cols-3 gap-2">
          {filterOptions.sizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onCheckedChange={() => toggleArrayFilter('sizes', size)}
              />
              <label
                htmlFor={`size-${size}`}
                className="text-sm cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div className="space-y-3">
        <h4>Materials</h4>
        <div className="space-y-2">
          {filterOptions.materials.map(material => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={filters.materials.includes(material)}
                onCheckedChange={() => toggleArrayFilter('materials', material)}
              />
              <label
                htmlFor={`material-${material}`}
                className="text-sm cursor-pointer"
              >
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Special Filters */}
      <div className="space-y-3">
        <h4>Special</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={filters.onSale}
              onCheckedChange={(checked) => updateFilter('onSale', checked)}
            />
            <label htmlFor="on-sale" className="text-sm cursor-pointer">
              On Sale
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-new"
              checked={filters.isNew}
              onCheckedChange={(checked) => updateFilter('isNew', checked)}
            />
            <label htmlFor="is-new" className="text-sm cursor-pointer">
              New Arrivals
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <>
          <Separator />
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="px-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl">All Products</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products found</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.productTypes.map(type => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter('productTypes', type)}
              />
            </Badge>
          ))}
          {filters.categories.map(category => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter('categories', category)}
              />
            </Badge>
          ))}
          {filters.sizes.map(size => (
            <Badge key={size} variant="secondary" className="gap-1">
              {size}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter('sizes', size)}
              />
            </Badge>
          ))}
          {filters.materials.map(material => (
            <Badge key={material} variant="secondary" className="gap-1">
              {material}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter('materials', material)}
              />
            </Badge>
          ))}
          {filters.onSale && (
            <Badge variant="secondary" className="gap-1">
              On Sale
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('onSale', false)}
              />
            </Badge>
          )}
          {filters.isNew && (
            <Badge variant="secondary" className="gap-1">
              New
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('isNew', false)}
              />
            </Badge>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < filterOptions.maxPrice) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.priceRange[0]}-${filters.priceRange[1]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('priceRange', [0, filterOptions.maxPrice])}
              />
            </Badge>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FilterContent />
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl mb-4">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more results.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}