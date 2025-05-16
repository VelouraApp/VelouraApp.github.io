
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock product data for invitations
const products = [
  {
    id: 401,
    name: 'Set Invitații Rose Gold',
    category: 'Invitații',
    price: 899,
    image: 'https://images.unsplash.com/photo-1607141192903-c2c91dde9baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 402,
    name: 'Invitații Vintage cu Sigiliu',
    category: 'Invitații',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1585211969224-3e992986159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 403,
    name: 'Invitații Minimalist Elegance',
    category: 'Invitații',
    price: 749,
    image: 'https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 404,
    name: 'Set Complet Papetărie Nuntă',
    category: 'Invitații',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1595073752221-69c31bd55910?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 405,
    name: 'Invitații Florale Personalizate',
    category: 'Invitații',
    price: 949,
    image: 'https://images.unsplash.com/photo-1592854899481-299df4fba02f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

export default function InvitatiiPage() {
  return (
    <div className="py-8">
      <div className="wedding-container">
        <h1 className="wedding-title mb-8 text-center">Invitații de Nuntă</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-wedding-ivory rounded-lg">
          <div className="flex items-center mb-4 md:mb-0">
            <Filter size={20} className="mr-2" />
            <span className="font-medium">Filtre</span>
            <Button variant="ghost" className="ml-4 flex items-center">
              Categorie <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="flex items-center">
              Preț <ChevronDown size={16} className="ml-1" />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Sortare după:</span>
            <select className="border p-2 rounded-md">
              <option value="featured">Recomandate</option>
              <option value="price-low">Preț: Mic la Mare</option>
              <option value="price-high">Preț: Mare la Mic</option>
              <option value="newest">Cele mai noi</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <Button variant="outline" className="w-10 h-10 p-0" disabled>
              1
            </Button>
            <Button variant="ghost" className="w-10 h-10 p-0">
              2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
