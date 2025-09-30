import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onCategoryClick: () => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onOrdersClick: () => void;
}

export function Header({ cartCount, onCartClick, onLogoClick, onCategoryClick, user, onLoginClick, onLogout, onProfileClick, onOrdersClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 
              className="text-xl tracking-tight cursor-pointer hover:text-primary transition-colors"
              onClick={onLogoClick}
            >
              FrameCraft
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onLogoClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button 
              onClick={onCategoryClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Shop All
            </button>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Collections
            </a>
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onOrdersClick}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={onLoginClick} className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
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