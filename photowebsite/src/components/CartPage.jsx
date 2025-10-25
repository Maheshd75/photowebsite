import { ArrowLeft, Plus, Minus, X, ShoppingBag, Truck, Shield, MapPin, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { Separator } from './ui/separator.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { removeCartItem, removeFromCart, updateCartItem, updateCartQuantity } from '../features/cartSlice.js';
import { useAuth } from '@clerk/clerk-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx';
import { toast } from 'sonner';
import api from '../api/axios.js';

export function CartPage() {
  const {cartItems} = useSelector(state=>state.cart)
  console.log(cartItems)
  const dispatch = useDispatch()
  const {getToken} = useAuth()
  
  
  const [showCheckout, setShowCheckout] = useState(false);
   const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const subtotal = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
   const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const itemCount = cartItems.reduce((sum, item) =>  sum +Number(item.quantity), 0);
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const updatecartquantity = async ({productId,selectedSize,quantity}) =>{
    
    const token = await getToken()
    dispatch(updateCartItem({productId,selectedSize,quantity,token}))

  }
  const removeitem = async ({productId}) => {
    const token = await getToken()
    dispatch(removeCartItem({productId,token}))

  }
  const handleContinueToPayment = () => {
    // Validate address form
    if (!addressData.firstName || !addressData.lastName || !addressData.email || 
        !addressData.phone || !addressData.address || !addressData.city || 
        !addressData.state || !addressData.zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }
    setShowPayment(true);
  };
   const handlePlaceOrder = async() => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (selectedPaymentMethod === 'cod') {
      // Handle Cash on Delivery
       const orders = cartItems.map((item)=>({
        productId:item.productId._id,
      selectedSize:item.selectedSize,
      quantity:item.quantity
       }))
       const totalAmount = total
    
    try {
      const token = await getToken()
      const {data} = await api.post('/api/order/cod',{orders,totalAmount,addressData:addressData},
        {headers:{Authorization:`Bearer ${token}`}}
      )
      if(data.success){
        console.log(data)
      }
      console.log(data)
    } catch (error) {
      console.log(error.messages)
      
    }
    
    

      toast.success('Order placed successfully! Pay on delivery.');
    
      // Reset states and go back to home
    //  setTimeout(() => {
   //     setShowCheckout(false);
   //     setShowPayment(false);
   //     setSelectedPaymentMethod('');
  //      onBack();
   //   }, 2000);
    } else if (selectedPaymentMethod === 'razorpay') {
      // Handle Razorpay payment
      toast.info('Redirecting to Razorpay payment gateway...');
      // In a real application, you would integrate Razorpay SDK here
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        toast.success('Payment successful! Order placed.');
        setShowCheckout(false);
        setShowPayment(false);
        setSelectedPaymentMethod('');
        onBack();
      }, 2000);
    }
  };



 

  if (cartItems.length === 0) {
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

     <div className={`grid grid-cols-1 ${showPayment ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
        {/* Cart Items or Address Form or Payment Selection */}
        <div className={`${showPayment ? 'lg:col-span-1 max-w-3xl mx-auto w-full' : 'lg:col-span-2'} space-y-4`}>
         {!showCheckout ? (
           cartItems.map((item) => {
            
            return (
              <Card key={item._id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative">
                      <ImageWithFallback
                        src={item.productId.image_urls}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {item.productId.isSale && (
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
                          <h3 className="font-medium">{item.productId.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.selectedSize} • {item.productId.material}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {item.productId.category} Style
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>removeitem({productId:item.productId._id})}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updatecartquantity({productId:item.productId._id,selectedSize:item.selectedSize,quantity:Number( item.quantity) - 1})}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>  updatecartquantity({productId:item.productId._id,selectedSize:item.selectedSize,quantity: Number(item.quantity) + 1})}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">${(item.productId.price * item.quantity).toFixed(2)}</div>
                          {item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground">
                            ${item.productId.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                </Card>
              )} ) ): !showPayment ? (
            /* Address Form */
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <CardTitle>Shipping Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={addressData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={addressData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={addressData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={addressData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Shipping Address */}
                <div>
                  <h4 className="mb-4">Shipping Address</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={addressData.country}
                        onChange={handleInputChange}
                        placeholder="United States"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={addressData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apartment, Suite, etc.</Label>
                      <Input
                        id="apartment"
                        name="apartment"
                        value={addressData.apartment}
                        onChange={handleInputChange}
                        placeholder="Apt 4B"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={addressData.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={addressData.state}
                          onChange={handleInputChange}
                          placeholder="NY"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={addressData.zipCode}
                          onChange={handleInputChange}
                          placeholder="10001"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowCheckout(false)}
                  >
                    Back to Cart
                  </Button>
                  
                </div>
              </CardContent>
            </Card>
              ):(
                 /* Payment Method Selection */
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Payment Method</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-4">Select Payment Method</h4>
                  <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                    <div className="space-y-3">
                      {/* Cash on Delivery */}
                      <div 
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'cod' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPaymentMethod('cod')}
                      >
                        <RadioGroupItem value="cod" id="cod" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                              <Wallet className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Cash on Delivery</div>
                              <div className="text-sm text-muted-foreground">
                                Pay when you receive your order
                              </div>
                            </div>
                          </Label>
                          {selectedPaymentMethod === 'cod' && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-md">
                              <div className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                                <p className="text-sm text-muted-foreground">
                                  Please keep exact change ready. Our delivery partner will collect ₹{total.toFixed(2)} at the time of delivery.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Razorpay */}
                      <div 
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'razorpay' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPaymentMethod('razorpay')}
                      >
                        <RadioGroupItem value="razorpay" id="razorpay" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="razorpay" className="flex items-center gap-3 cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                              <CreditCard className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">Razorpay</div>
                              <div className="text-sm text-muted-foreground">
                                Pay securely with Card, UPI, Net Banking & More
                              </div>
                            </div>
                          </Label>
                          {selectedPaymentMethod === 'razorpay' && (
                            <div className="mt-3 p-3 bg-blue-50/50 rounded-md">
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-4 w-4 text-blue-600" />
                                <p className="text-sm font-medium">Secure Payment</p>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">Credit/Debit Card</Badge>
                                <Badge variant="outline" className="text-xs">UPI</Badge>
                                <Badge variant="outline" className="text-xs">Net Banking</Badge>
                                <Badge variant="outline" className="text-xs">Wallets</Badge>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Delivery Address Summary */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="mb-1">Delivering to:</h4>
                      <p className="text-sm text-muted-foreground">
                        {addressData.firstName} {addressData.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addressData.address}{addressData.apartment ? `, ${addressData.apartment}` : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addressData.city}, {addressData.state} {addressData.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowPayment(false)}
                  >
                    Back to Address
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handlePlaceOrder}
                    disabled={!selectedPaymentMethod}
                  >
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

              
            
         {!showPayment && (<div className="lg:col-span-1">
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
             {!showCheckout ?( <Button className="w-full" size="lg"  onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </Button>):
              ( <Button 
                    className="w-full" size='lg'
                    onClick={() => {
                      // Add validation and payment processing logic here
                      console.log('Proceeding to payment with address:', addressData);
                      handleContinueToPayment()
                    }}
                  >
                    Continue to Payment
                  </Button>)}
             

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
        )} 
        

      
        
      </div>
    </div>
  );
}