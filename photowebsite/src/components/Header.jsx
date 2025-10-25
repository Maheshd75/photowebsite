import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu.jsx';
import { Avatar, AvatarFallback } from './ui/avatar.jsx';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useClerk, UserButton } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';

export function Header({user,   onLoginClick, onLogout, onProfileClick, onOrdersClick }) {
  const {cartItems} = useSelector(state=>state.cart)
  const navigate = useNavigate()
  const {openSignIn} = useClerk()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartItems?.reduce((sum,item)=>sum + Number( item.quantity),0)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 
              className="text-xl tracking-tight cursor-pointer hover:text-primary transition-colors"
              
            >
              FrameCraft
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to='/'
              
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </NavLink>
            <NavLink to='/collections'
              
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Collections
            </NavLink>
            
            
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Section - User & Cart */}
          <div className="flex items-center space-x-4">
            {/* User Authentication */}
            { !user ? (
              <Button variant="ghost" size="sm" onClick={openSignIn} className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            ) : (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action label='Orders' labelIcon={<ShoppingCart className="mr-2 h-4 w-4" />} onClick={()=>navigate('/orders')}/>
                </UserButton.MenuItems>
              </UserButton>
            )}

            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={()=> navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <button 
                onClick={() => { onLogoClick(); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => { onCategoryClick(); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Shop All
              </button>
              <a href="#" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Collections
              </a>
              <a href="#" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              
              {/* Mobile Login/User */}
              {user ? (
                <>
                  <div className="border-t pt-2 mt-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { onProfileClick(); setIsMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={() => { onOrdersClick(); setIsMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Orders
                    </button>
                    <button 
                      onClick={() => { onLogout(); setIsMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t pt-2 mt-2">
                  <button 
                    onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}