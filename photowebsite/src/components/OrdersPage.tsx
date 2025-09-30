import { useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Search, Filter, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface User {
  id: string;
  name: string;
  email: string;
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
}

interface OrdersPageProps {
  user: User;
  onBack: () => void;
}

export function OrdersPage({ user, onBack }: OrdersPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock orders data
  const mockOrders: Order[] = user.id === 'guest' ? [] : [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 189.97,
      trackingNumber: 'TRK123456789',
      shippingAddress: '123 Main Street, New York, NY 10001',
      items: [
        { id: '1', name: 'Classic Wooden Frame', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', price: 89.99, quantity: 1, size: '8x10' },
        { id: '2', name: 'Modern Metal Frame', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', price: 99.98, quantity: 2, size: '5x7' }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 156.47,
      trackingNumber: 'TRK987654321',
      shippingAddress: '123 Main Street, New York, NY 10001',
      items: [
        { id: '3', name: 'Vintage Brass Frame', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', price: 129.99, quantity: 1, size: '11x14' },
        { id: '4', name: 'Ceramic Travel Mug', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400', price: 26.48, quantity: 1, size: '16oz' }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-25',
      status: 'processing',
      total: 78.49,
      shippingAddress: '123 Main Street, New York, NY 10001',
      items: [
        { id: '5', name: 'Glass Coffee Mug', image: 'https://images.unsplash.com/photo-1572119865084-43c5d9b64025?w=400', price: 18.99, quantity: 2, size: '12oz' },
        { id: '6', name: 'Minimalist Frame', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', price: 40.51, quantity: 1, size: '5x7' }
      ]
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '2024-01-28',
      status: 'pending',
      total: 95.99,
      shippingAddress: '123 Main Street, New York, NY 10001',
      items: [
        { id: '7', name: 'Elegant Silver Frame', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', price: 95.99, quantity: 1, size: '8x10' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
        return <Package className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const OrderDetailsModal = ({ order }: { order: Order }) => (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        <DialogDescription>
          Placed on {new Date(order.date).toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Order Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(order.status)}
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
          {order.trackingNumber && (
            <div className="text-sm text-gray-600">
              Tracking: <span className="font-mono">{order.trackingNumber}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Order Items */}
        <div>
          <h4 className="font-medium mb-4">Items Ordered</h4>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h5 className="font-medium">{item.name}</h5>
                  {item.size && (
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                  )}
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Shipping Address */}
        <div>
          <h4 className="font-medium mb-2">Shipping Address</h4>
          <p className="text-gray-600">{order.shippingAddress}</p>
        </div>

        <Separator />

        {/* Order Total */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
        </div>
      </div>
    </DialogContent>
  );

  if (user.id === 'guest') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              Guest accounts don't have order history. Create an account to track your orders.
            </p>
            <Button onClick={onBack}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your order history</p>
            </div>
            
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{mockOrders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'You haven\'t placed any orders yet'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-3">
                        <span>Placed on {new Date(order.date).toLocaleDateString()}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                        {order.trackingNumber && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span>Tracking: {order.trackingNumber}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={item.id} className="flex items-center gap-2 text-sm">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <span className="text-gray-700">{item.name}</span>
                            {index < Math.min(order.items.length, 3) - 1 && (
                              <span className="text-gray-400">•</span>
                            )}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <span className="text-sm text-gray-500">
                            +{order.items.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <OrderDetailsModal order={order} />
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}