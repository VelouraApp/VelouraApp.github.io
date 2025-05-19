
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';

// Mock product data
const featuredProducts = [
  {
    id: 1,
    name: 'Rochie Elegance cu Dantelă',
    category: 'Rochii',
    price: 4599,
    image: '/lovable-uploads/rochie1.jpg',
  },
  {
    id: 2,
    name: 'Tiară din Cristale',
    category: 'Accesorii',
    price: 899,
    image: '/lovable-uploads/tiara.jpg',
  },
  {
    id: 3,
    name: 'Set Verighete din Aur',
    category: 'Bijuterii',
    price: 3899,
    image: '/lovable-uploads/verighete.webp',
  },
  {
    id: 4,
    name: 'Set Invitații Premium',
    category: 'Invitații',
    price: 12,
    image: '/lovable-uploads/set_invitatii.jpg',
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-wedding-white">
      <div className="wedding-container">
        <div className="text-center mb-12">
          <h2 className="wedding-subtitle mb-4">Produse Recomandate</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descoperă cele mai apreciate articole pentru nuntă, atent selecționate pentru a face ziua ta specială perfectă.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="product-card group">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-[300px] object-cover"
                  />
                </Link>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-wedding-white p-2 rounded-full shadow-sm hover:bg-wedding-gold hover:text-white transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-wedding-gold text-white w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-wedding-gold/90 transition-colors">
                    <ShoppingBag size={16} />
                    <span>Adaugă în coș</span>
                  </button>
                </div>
              </div>
              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-lg mb-1 hover:text-wedding-gold transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="font-medium">{product.price} Lei</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="wedding-btn-primary">
            <Link to="/shop">Vezi toate produsele</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
