import { ArrowLeft, Plus, Minus, X, ShoppingBag, Truck, Shield } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { Separator } from './ui/separator.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { removeFromCart, updateCartQuantity } from '../features/cartSlice.js';
import { order } from '../features/orderSlice.js';

export function CartPage() {
  const {cartItems} = useSelector(state=>state.cart)
  console.log(cartItems)
  const dispatch = useDispatch()
  const [items,setItems] = useState(cartItems)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const initOrder = () =>{
    
    const orders = cartItems.map((item)=>({
        productId:item._id,
      selectedSize:item.selectedSize,
      quantity:item.quantity
    }))
    const totalAmount = total
    dispatch(order({cartItems:orders,totalAmount}))
    
  }

  useEffect(()=>{
    setItems(cartItems)

  },[cartItems])


  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          
          className="mb-6 px-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
        
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any frames to your cart yet.
          </p>
          <Button  size="lg">
            Browse Frames
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            
            className="px-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
        <div className="text-right">
          <h1 className="text-2xl">Shopping Cart</h1>
          <p className="text-muted-foreground">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            const cartItemId = `${item._id}-${item.selectedSize}`;
            return (
              <Card key={cartItemId}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative">
                      <ImageWithFallback
                        src={item.image_urls}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {item.isSale && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 text-xs px-1"
                        >
                          SALE
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.selectedSize} • {item.material}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {item.category} Style
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>dispatch(removeFromCart({cartItemId}))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => dispatch(updateCartQuantity({cartItemId,quantity: item.quantity - 1}))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>  dispatch(updateCartQuantity({cartItemId,quantity: item.quantity + 1}))}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                          {item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground">
                            ${item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                </div>
                
                {subtotal < 75 && subtotal > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <Separator />

              {/* Promo Code */}
              <div className="space-y-2">
                <Label htmlFor="promo" className="text-sm">Promo Code</Label>
                <div className="flex gap-2">
                  <Input id="promo" placeholder="Enter code" />
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={()=> initOrder()}>
                Proceed to Checkout
              </Button>

              {/* Security & Benefits */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $75</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}