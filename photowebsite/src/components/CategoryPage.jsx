import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Checkbox } from './ui/checkbox.jsx';
import { Slider } from './ui/slider.jsx';
import { Badge } from './ui/badge.jsx';
import { Separator } from './ui/separator.jsx';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet.jsx';
import { ProductCard } from './ProductCard.jsx';
import api from '../api/axios.js';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

export function CategoryPage() {
  const {products} = useSelector(state=>state.products)
  const [filters, setFilters] = useState({
    productTypes: [],
    categories: [],
    sizes: [],
    priceRange: [0, 100],
    materials: [],
    onSale: false,
    isNew: false
  });

  const [sortBy, setSortBy] = useState('featured');
 // const [products,setProducts] = useState(products)

  

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const productTypes = [...new Set(products.map(p => p.productType))];
    const categories = [...new Set(products.map(p => p.category))];
    const sizes = [...new Set(products.flatMap(p => p.sizes))];
    const materials = [...new Set(products.map(p => p.material))];
    const maxPrice = Math.max(...products.map(p => p.price));
    
    return { productTypes, categories, sizes, materials, maxPrice };
  }, [products]);

  // Apply filters
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
      
      // Price range filter
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

    // Apply sorting
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
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [filters, sortBy,products]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleArrayFilter = (key, value) => {
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

  const activeFilterCount = 
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
      <div>
        <h3 className="font-medium mb-3">Product Type</h3>
        <div className="space-y-2">
          {filterOptions.productTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.productTypes.includes(type)}
                onCheckedChange={() => toggleArrayFilter('productTypes', type)}
              />
              <label htmlFor={`type-${type}`} className="text-sm capitalize cursor-pointer">
                {type === 'frames' ? 'Photo Frames' : 'Coffee Cups'}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {filterOptions.categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleArrayFilter('categories', category)}
              />
              <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={filterOptions.maxPrice}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h3 className="font-medium mb-3">Sizes</h3>
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.sizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onCheckedChange={() => toggleArrayFilter('sizes', size)}
              />
              <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div>
        <h3 className="font-medium mb-3">Materials</h3>
        <div className="space-y-2">
          {filterOptions.materials.map(material => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={filters.materials.includes(material)}
                onCheckedChange={() => toggleArrayFilter('materials', material)}
              />
              <label htmlFor={`material-${material}`} className="text-sm cursor-pointer">
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Special Filters */}
      <div>
        <h3 className="font-medium mb-3">Special</h3>
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

      {activeFilterCount > 0 && (
        <>
          <Separator />
          <Button onClick={clearFilters} variant="outline" className="w-full">
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
          <Button variant="ghost"  className="px-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl">All Products</h1>
            <p className="text-muted-foreground">{filteredProducts.length} items</p>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
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
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 overflow-y-auto">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Filters</CardTitle>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary">{activeFilterCount}</Badge>
                )}
              </div>
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
              <h3 className="text-lg mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  
                  
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}