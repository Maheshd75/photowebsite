import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetails } from './components/ProductDetails';
import { CategoryPage } from './components/CategoryPage';
import { CartPage } from './components/CartPage';
import { Cart, CartItem } from './components/Cart';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { UserProfile } from './components/UserProfile';
import { OrdersPage } from './components/OrdersPage';
import { Product } from './components/ProductCard';
import { products } from './data/products';
import { toast, Toaster } from 'sonner';

type Page = 'home' | 'product' | 'cart' | 'category' | 'profile' | 'orders';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  currentPage: Page;
  selectedProduct: Product | null;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'home',
    selectedProduct: null
  });

  const handleAddToCart = (product: Product, selectedSize?: string, quantity: number = 1) => {
    // Use provided size or default to first available size
    const size = selectedSize || product.sizes[0];
    const cartItemId = `${product.id}-${size}`;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => `${item.id}-${item.selectedSize}` === cartItemId);
      
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prev.map(item =>
          `${item.id}-${item.selectedSize}` === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prev, { ...product, quantity, selectedSize: size }];
      }
    });
  };

  const handleProductClick = (product: Product) => {
    setAppState({
      currentPage: 'product',
      selectedProduct: product
    });
  };

  const handleBackToHome = () => {
    setAppState({
      currentPage: 'home',
      selectedProduct: null
    });
  };

  const handleGoToCart = () => {
    setAppState({
      currentPage: 'cart',
      selectedProduct: null
    });
    setIsCartOpen(false);
  };

  const handleGoToCategory = () => {
    setAppState({
      currentPage: 'category',
      selectedProduct: null
    });
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    toast.success('Successfully logged out!');
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleGoToProfile = () => {
    setAppState({
      currentPage: 'profile',
      selectedProduct: null
    });
  };

  const handleGoToOrders = () => {
    setAppState({
      currentPage: 'orders',
      selectedProduct: null
    });
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        `${item.id}-${item.selectedSize}` === cartItemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(prev => {
      const item = prev.find(item => `${item.id}-${item.selectedSize}` === cartItemId);
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      return prev.filter(item => `${item.id}-${item.selectedSize}` !== cartItemId);
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (appState.currentPage) {
      case 'product':
        if (!appState.selectedProduct) return null;
        return (
          <ProductDetails
            product={appState.selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={handleBackToHome}
          />
        );
      case 'cart':
        return (
          <CartPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onBack={handleBackToHome}
          />
        );
      case 'category':
        return (
          <CategoryPage
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            onBack={handleBackToHome}
          />
        );
      case 'profile':
        if (!user) return null;
        return (
          <UserProfile
            user={user}
            onBack={handleBackToHome}
            onUserUpdate={handleUserUpdate}
          />
        );
      case 'orders':
        if (!user) return null;
        return (
          <OrdersPage
            user={user}
            onBack={handleBackToHome}
          />
        );
      default:
        return (
          <>
            <Hero onShopNowClick={handleGoToCategory} />
            <ProductGrid 
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cartCount}
        onCartClick={appState.currentPage === 'cart' ? () => setIsCartOpen(true) : handleGoToCart}
        onLogoClick={handleBackToHome}
        onCategoryClick={handleGoToCategory}
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onProfileClick={handleGoToProfile}
        onOrdersClick={handleGoToOrders}
      />
      
      <main>
        {renderPage()}
      </main>
      
      {appState.currentPage === 'home' && <Footer />}
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      
      <Toaster position="bottom-right" />
    </div>
  );
}