
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Heart, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  
  // Calculate total items in cart
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-wedding-white shadow-sm sticky top-0 z-50">
      <div className="wedding-container py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-wedding-navy p-2"
              aria-label="Comutare meniu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-serif font-medium tracking-wide text-wedding-navy">
                Veloura
              </h1>
            </Link>
            <p className="text-xs md:text-sm text-wedding-gold italic hidden md:block">
              Where Every 'Yes' Begins in Style
            </p>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-wedding-navy hover:text-wedding-gold transition-colors">
              Acasă
            </Link>
            
            <Link to="/shop" className="text-wedding-navy hover:text-wedding-gold transition-colors">
              Magazin
            </Link>
            
            <Link to="/planificare" className="text-wedding-navy hover:text-wedding-gold transition-colors">
              Planificare
            </Link>
            <Link to="/about" className="text-wedding-navy hover:text-wedding-gold transition-colors">
              Despre noi
            </Link>
            <Link to="/contact" className="text-wedding-navy hover:text-wedding-gold transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-wedding-navy hover:text-wedding-gold transition-colors" aria-label="Căutare">
              <Search size={20} />
            </button>
            <Link to="/favorite" className="text-wedding-navy hover:text-wedding-gold transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="relative text-wedding-navy hover:text-wedding-gold transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-wedding-gold text-wedding-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            </Link>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-wedding-navy hover:text-wedding-gold transition-colors">
                    <UserRound size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">Profilul meu</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Deconectare
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Autentificare
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-wedding-white border-t border-gray-200 animate-fade-in">
          <nav className="wedding-container py-4 flex flex-col space-y-4">
            <Link to="/" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
              Acasă
            </Link>
            <Link to="/shop" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
              Magazin
            </Link>
            <Link to="/planificare" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
              Planificare
            </Link>
            <Link to="/about" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
              Despre noi
            </Link>
            <Link to="/contact" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
              Contact
            </Link>
            {isLoggedIn && (
              <Link to="/profile" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
                Profilul meu
              </Link>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
                  Autentificare
                </Link>
                <Link to="/register" className="text-wedding-navy hover:text-wedding-gold transition-colors py-2">
                  Înregistrare
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button 
                onClick={logout}
                className="text-left text-wedding-navy hover:text-wedding-gold transition-colors py-2"
              >
                Deconectare
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
