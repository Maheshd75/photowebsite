import { Button } from './ui/button.jsx';
import { Card, CardContent } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';
import {useDispatch, useSelector} from 'react-redux'
import { addProduct, addToCart } from '../features/cartSlice.js';
import { useNavigate } from 'react-router-dom';

export function ProductCard({ product}) {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-0">
        {/* Image Container */}
        <div 
          className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <ImageWithFallback
            src={product.image_urls}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge variant="destructive">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                
              }}
              className="w-full bg-primary/90 hover:bg-primary text-white"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <div className="space-y-1">
            <h3 
              className="font-medium line-clamp-2 cursor-pointer hover:text-primary transition-colors"
              onClick={() => onProductClick?.(product)}
            >
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/product/${product._id}`) }
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}