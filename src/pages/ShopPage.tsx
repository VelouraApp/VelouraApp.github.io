
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Slider 
} from "@/components/ui/slider";
import PaginationComponent from '@/components/Pagination';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/contexts/CartContext';
import { Helmet } from 'react-helmet-async';

// Mock product data - all categories combined
const allProducts = [
  // Rochii
  {
    id: 101,
    name: 'Rochie Prințesă cu Dantelă',
    category: 'Rochii',
    price: 3999,
    image: '/lovable-uploads/rochie1.jpg',
  },
  {
    id: 102,
    name: 'Rochie Sirenă Elegantă',
    category: 'Rochii',
    price: 4599,
    image: '/lovable-uploads/rochie2.jpg',
  },
  {
    id: 103,
    name: 'Rochie Ball Gown Premium',
    category: 'Rochii',
    price: 5299,
    image: '/lovable-uploads/rochie3.jpg',
  },
  {
    id: 104,
    name: 'Rochie A-line Simplă',
    category: 'Rochii',
    price: 3599,
    image: '/lovable-uploads/a-line-dress.jpg',
  },
  
  // Accesorii
  {
    id: 201,
    name: 'Tiară din Cristale',
    category: 'Accesorii',
    price: 899,
    image: '/lovable-uploads/tiara.jpg',
  },
  {
    id: 202,
    name: 'Set Voal cu Dantelă',
    category: 'Accesorii',
    price: 659,
    image: '/lovable-uploads/voal_dantela.jpg',
  },
  {
    id: 203,
    name: 'Colier din Perle Premium',
    category: 'Accesorii',
    price: 789,
    image: '/lovable-uploads/colier_perle.jpg',
  },
  {
    id: 204,
    name: 'Pantofi Eleganți cu Cristale',
    category: 'Accesorii',
    price: 1199,
    image: '/lovable-uploads/pantofi_cristale.webp',
  },
  
  // Decoruri
  {
    id: 301,
    name: 'Arcadă Florală pentru Ceremonie',
    category: 'Decoruri',
    price: 1899,
    image: '/lovable-uploads/floral-arch.jpg',
  },
  {
    id: 302,
    name: 'Set Lumânări Decorative',
    category: 'Decoruri',
    price: 459,
    image: '/lovable-uploads/candles.jpg',
  },
  {
    id: 303,
    name: 'Aranjament de Masă Premium',
    category: 'Decoruri',
    price: 349,
    image: '/lovable-uploads/aranj-masa.jpg',
  },
  {
    id: 304,
    name: 'Ghirlande Luminoase LED',
    category: 'Decoruri',
    price: 279,
    image: '/lovable-uploads/ghirlande_led.webp',
  },
  
  // Invitații
  {
    id: 401,
    name: 'Set Invitații Premium',
    category: 'Invitații',
    price: 12,
    image: '/lovable-uploads/set_invitatii.jpg',
  },
  {
    id: 402,
    name: 'Invitații din Hârtie Manuală',
    category: 'Invitații',
    price: 15,
    image: '/lovable-uploads/hartie_man.jpg',
  },
  {
    id: 403,
    name: 'Invitații Folio Auriu',
    category: 'Invitații',
    price: 18,
    image: '/lovable-uploads/inv_folio.jpg',
  },
  {
    id: 404,
    name: 'Invitații Digitale Premium',
    category: 'Invitații',
    price: 8,
    image: '/lovable-uploads/inv_digitale.jpeg',
  },
];

// Find min and max price
const minProductPrice = Math.floor(Math.min(...allProducts.map(product => product.price)));
const maxProductPrice = Math.ceil(Math.max(...allProducts.map(product => product.price)));

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([minProductPrice, maxProductPrice]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [displayedProducts, setDisplayedProducts] = useState<typeof allProducts>([]);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const productsPerPage = 8;
  
  // Apply filtering and sorting
  useEffect(() => {
    let result = [...allProducts];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, we would have a date field to sort by
        break;
      default: // 'featured' - keep original order
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, sortOption, priceRange]);
  
  // Calculate displayed products based on pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1);
    
    toast({
      title: "Adăugat în coș",
      description: "Produsul a fost adăugat în coșul de cumpărături.",
    });
  };
  
  const addToFavorites = () => {
    toast({
      title: "Adăugat la favorite",
      description: "Produsul a fost adăugat la lista de favorite.",
    });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Magazin Nuntă - Veloura | Where Every 'Yes' Begins in Style</title>
        <meta name="description" content="Descoperă colecția noastră completă de rochii de mireasă, accesorii, decorațiuni și invitații pentru nunta ta perfectă." />
        <link rel="canonical" href="https://veloura.ro/shop" />
      </Helmet>
      
      <div className="wedding-container">
        <h1 className="wedding-title mb-8 text-center">Magazin</h1>

        {/* Filters */}
        <div className="flex flex-col p-4 bg-wedding-ivory rounded-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0 flex-wrap gap-2">
              <Filter size={20} className="mr-2" />
              <span className="font-medium mr-2">Filtre:</span>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="Rochii">Rochii</SelectItem>
                  <SelectItem value="Accesorii">Accesorii</SelectItem>
                  <SelectItem value="Decoruri">Decoruri</SelectItem>
                  <SelectItem value="Invitații">Invitații</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-2">Sortare după:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sortare" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Recomandate</SelectItem>
                  <SelectItem value="price-low">Preț: Mic la Mare</SelectItem>
                  <SelectItem value="price-high">Preț: Mare la Mic</SelectItem>
                  <SelectItem value="newest">Cele mai noi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-2">
            <h3 className="font-medium mb-2">Preț: {priceRange[0]} Lei - {priceRange[1]} Lei</h3>
            <div className="px-3">
              <Slider
                defaultValue={[minProductPrice, maxProductPrice]}
                max={maxProductPrice}
                min={minProductPrice}
                step={10}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{minProductPrice} Lei</span>
                <span>{maxProductPrice} Lei</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
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
                  <button 
                    className="bg-wedding-white p-2 rounded-full shadow-sm hover:bg-wedding-gold hover:text-white transition-colors"
                    onClick={addToFavorites}
                    aria-label="Adaugă la favorite"
                  >
                    <Heart size={18} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="bg-wedding-gold text-white w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-wedding-gold/90 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
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

        {/* No products found message */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nu am găsit produse care să corespundă filtrelor selectate.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange([minProductPrice, maxProductPrice]);
              }}
            >
              Resetare filtre
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
