import { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from './ProductCard';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, selectedSize: string, quantity: number) => void;
  onBack: () => void;
}

export function ProductDetails({ product, onAddToCart, onBack }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock additional images for the gallery
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1624981631166-fa75e8bf9199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWN0dXJlJTIwZnJhbWUlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc1OTIyNzE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ];

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 px-0"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <ImageWithFallback
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  currentImageIndex === index ? 'border-primary' : 'border-border'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.isNew && (
                <Badge variant="default">New</Badge>
              )}
              {product.isSale && discount > 0 && (
                <Badge variant="destructive">-{discount}% OFF</Badge>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl">{product.name}</h1>
            <p className="text-muted-foreground">{product.material} • {product.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(4.8) • 234 reviews</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.isSale && (
              <p className="text-sm text-green-600">
                You save ${((product.originalPrice || 0) - product.price).toFixed(2)}
              </p>
            )}
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <Label>Size</Label>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={size}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={size}
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      {size}"
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <Label>Quantity</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>Free shipping on orders over $75</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>2-year quality guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              <span>30-day easy returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6 space-y-4">
            <h3>Product Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              This premium {product.name.toLowerCase()} is meticulously crafted from high-quality {product.material.toLowerCase()}. 
              Each frame is designed to complement both modern and traditional decor while providing superior protection for your cherished photographs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The frame features precision-cut corners and a smooth finish that enhances any photo. Whether you're creating a gallery wall 
              or highlighting a single special memory, this frame offers the perfect balance of style and functionality.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Museum-quality UV protection glass</li>
              <li>Easy-to-use backing system</li>
              <li>Hanging hardware included</li>
              <li>Available in multiple sizes</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4>Materials</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Frame Material</span>
                    <span className="text-muted-foreground">{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Glass Type</span>
                    <span className="text-muted-foreground">UV Protection Glass</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backing</span>
                    <span className="text-muted-foreground">MDF with easel stand</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4>Dimensions</h4>
                <div className="space-y-2 text-sm">
                  {product.sizes.map((size) => (
                    <div key={size} className="flex justify-between">
                      <span>{size}" Frame</span>
                      <span className="text-muted-foreground">Outer: {size}" | Mat: TBD</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3>Customer Reviews</h3>
              <Button variant="outline">Write a Review</Button>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm">Verified Purchase</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm">
                    "Beautiful frame with excellent quality. The {product.material.toLowerCase()} finish is stunning and the craftsmanship is top-notch. Highly recommended!"
                  </p>
                  <p className="text-sm text-muted-foreground">- Sarah M.</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6 space-y-4">
            <h3>Shipping Information</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="mb-2">Standard Shipping (FREE on orders $75+)</h4>
                <p className="text-sm text-muted-foreground">5-7 business days • $9.99 for orders under $75</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="mb-2">Express Shipping</h4>
                <p className="text-sm text-muted-foreground">2-3 business days • $19.99</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="mb-2">Next Day Delivery</h4>
                <p className="text-sm text-muted-foreground">Order by 2PM for next day delivery • $29.99</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}