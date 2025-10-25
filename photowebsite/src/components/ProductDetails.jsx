import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx';
import { Label } from './ui/label.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx';
import { Separator } from './ui/separator.jsx';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from './ui/checkbox.js';
import { getProductsData } from '../features/productSlice.js';
import api from '../api/axios.js';
import { addProduct, addToCart } from '../features/cartSlice.js';
import { useAuth } from '@clerk/clerk-react';

export function ProductDetails() {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {getToken} = useAuth()
  
  const [product,setProduct] = useState([])
  const [selectedSize, setSelectedSize] = useState();
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

    const productData = async() => {
      try {
        
        const {data} =await api.post('/api/products/productData',{productId})
        if(data.success){
          setProduct(data.product)
          console.log(data.product)
        }
      
      } catch (error) {
        console.log(error.message)
        
      }

    }
    const addtocart = async ({productId,selectedSize,quantity}) =>{
      
      const token = await getToken()
      dispatch(addToCart({productId,selectedSize,quantity,token}))

    }
    const updatequantity = async ({productId,quantity}) =>{}

    useEffect(()=>{
      productData()
      

    },[productId])

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button onClick={()=> navigate(-1)}
        variant="ghost" 
        
        className="mb-6 px-0"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <ImageWithFallback
              src={product.image_urls}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square overflow-hidden rounded-md bg-muted cursor-pointer border-2 transition-colors ${
                  currentImageIndex === index 
                    ? 'border-primary' 
                    : 'border-transparent hover:border-muted-foreground/25'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                New Arrival
              </Badge>
            )}
            {product.isSale && (
              <Badge variant="destructive">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Title and Price */}
          <div className="space-y-2">
            <h1 className="text-3xl tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(127 reviews)</span>
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            <p className="text-muted-foreground">Category: {product.category}</p>
            <p className="text-muted-foreground">Material: {product.material}</p>
            <p className="text-muted-foreground">
              Type: {product.productType === 'frames' ? 'Photo Frame' : 'Coffee Cup'}
            </p>
          </div>

          <Separator />

          {/* Size Selection */}
         <div className="space-y-3">
            <Label>Size</Label>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              <div className="grid grid-cols-3 gap-3">
                {product?.sizes?.map((size) => (
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
            <Label className="text-base font-medium">Quantity</Label>
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
          <div className="flex gap-3">
            <Button 
              onClick={()=>addtocart({productId:product._id,selectedSize,quantity})}
              className="flex-1"
              size="lg"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $75</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Quality Guarantee</p>
                <p className="text-sm text-muted-foreground">Premium materials only</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-sm text-muted-foreground">Easy returns & exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>
                This premium {product?.name} is crafted with attention to detail and 
                designed to showcase your most treasured memories. Made from high-quality {product.material}, 
                it combines durability with elegant aesthetics.
              </p>
              <p>
                Perfect for both modern and traditional interiors, this {product.category} style 
                piece will complement any decor while protecting and displaying your photos beautifully.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Product Details</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Material:</dt>
                    <dd>{product.material}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Category:</dt>
                    <dd>{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Available Sizes:</dt>
                    <dd>{product.sizes}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h4 className="font-medium mb-3">Care Instructions</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Clean with soft, dry cloth</li>
                  <li>• Avoid direct sunlight</li>
                  <li>• Handle with care</li>
                  <li>• Use appropriate hanging hardware</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold">4.8</div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 127 reviews</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Sarah M.</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Beautiful quality frame. Exactly as described and shipped quickly. Very happy with my purchase!"
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}