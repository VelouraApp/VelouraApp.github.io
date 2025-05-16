
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/contexts/CartContext';
import { Helmet } from 'react-helmet-async';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

// Mock product data - this would typically be fetched from an API based on the ID
const products = {
  // Dress products
  "101": {
    id: 101,
    name: 'Rochie Elegance cu Dantelă',
    category: 'Rochii',
    price: 4599,
    description: 'Această rochie de mireasă uimitoare prezintă un decolteu în formă de inimă, mâneci delicate din dantelă și o trenă elegantă. Confecționată manual din materiale premium pentru ziua ta specială.',
    details: {
      material: 'Dantelă, Satin',
      culoare: 'Alb Fildeș',
      dimensiune: 'Conform mărimii',
      îngrijire: 'Numai curățare profesională',
    },
    features: [
      'Detalii din dantelă realizate manual',
      'Decolteu în formă de inimă',
      'Mâneci scurte',
      'Corset încorporat',
      'Trenă de capelă',
      'Fermoar lateral ascuns',
    ],
    images: [
      '/lovable-uploads/princess-lace-dress.jpg',
      '/lovable-uploads/mermaid-dress.jpg',
      '/lovable-uploads/a-line-dress.jpg',
      '/lovable-uploads/ball-gown.jpg',
    ],
    sizes: ['34', '36', '38', '40', '42', '44', '46', '48'],
    reviews: {
      average: 4.8,
      count: 24,
      items: [
        {
          id: 1,
          author: "Maria Popescu",
          rating: 5,
          date: "2025-03-15",
          comment: "Rochia este absolut superbă! Materialele sunt de cea mai bună calitate, iar livrarea a fost rapidă. Recomand cu încredere!"
        },
        {
          id: 2,
          author: "Ana Ionescu",
          rating: 4,
          date: "2025-02-20",
          comment: "Rochia arată exact ca în poze. Sunt foarte mulțumită de achiziție. Singurul motiv pentru care dau 4 stele este că a trebuit să fac mici ajustări la mâneci."
        },
        {
          id: 3,
          author: "Elena Dumitrescu",
          rating: 5,
          date: "2025-01-10",
          comment: "Am comandat această rochie pentru nunta mea și a fost absolut perfectă! Toată lumea a făcut complimente, iar fotografiile au ieșit minunat. Mulțumesc Veloura!"
        }
      ]
    },
    inStock: true,
    relatedProducts: [102, 103, 104]
  },
  // Accessory product
  "201": {
    id: 201,
    name: 'Tiară din Cristale',
    category: 'Accesorii',
    price: 899,
    description: 'Completează-ți ținuta de mireasă cu această tiară elegantă decorată cu cristale strălucitoare. Fabricată manual din materiale premium pentru a adăuga o notă regală aspectului tău în ziua nunții.',
    details: {
      material: 'Metal placat cu argint, cristale',
      culoare: 'Argintiu',
      stil: 'Vintage elegant',
      aplicare: 'Prinse de păr cu ace speciale',
    },
    features: [
      'Cristale de calitate premium',
      'Design floral delicat',
      'Ușor de purtat întreaga zi',
      'Potrivit pentru orice coafură',
      'Include cutie de depozitare elegantă',
    ],
    images: [
      '/lovable-uploads/b2a37e6c-6520-4b40-a6b6-78109952ab7b.png',
      '/lovable-uploads/tiara-detail.jpg',
      '/lovable-uploads/tiara-side.jpg',
    ],
    sizes: ['Universal'],
    reviews: {
      average: 4.9,
      count: 18,
      items: [
        {
          id: 1,
          author: "Claudia Munteanu",
          rating: 5,
          date: "2025-04-02",
          comment: "Tiara este absolut superbă! Cristalele strălucesc minunat și se potrivesc perfect cu rochia mea. Recomand!"
        },
        {
          id: 2,
          author: "Diana Popa",
          rating: 5,
          date: "2025-03-18",
          comment: "Un accesoriu elegant și de calitate. A completat perfect look-ul meu de nuntă și am primit multe complimente."
        }
      ]
    },
    inStock: true,
    relatedProducts: [202, 203]
  },
  // Add more products as needed
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [reviewComment, setReviewComment] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  
  // Find the product with the matching ID, or use a default if not found
  const product = id ? products[id as keyof typeof products] : products["101"];
  
  if (!product) {
    return (
      <div className="py-12 wedding-container text-center">
        <h1 className="wedding-title mb-4">Produsul nu a fost găsit</h1>
        <p className="mb-8">Ne pare rău, nu am putut găsi produsul căutat.</p>
        <Button asChild className="wedding-btn-primary">
          <Link to="/shop">Înapoi la magazin</Link>
        </Button>
      </div>
    );
  }

  // Schema.org JSON-LD for the product
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images[0],
    "description": product.description,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "RON",
      "price": product.price.toString(),
      "availability": product.inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.reviews.average.toString(),
      "reviewCount": product.reviews.count.toString()
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selectați o mărime",
        description: "Vă rugăm să selectați o mărime înainte de a adăuga în coș.",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity,
      selectedSize
    );
    
    toast({
      title: "Produs adăugat",
      description: `${product.name} a fost adăugat în coșul dvs.`,
    });
  };

  const handleSubmitReview = () => {
    if (!reviewComment) {
      toast({
        title: "Comentariu necesar",
        description: "Vă rugăm să adăugați un comentariu pentru recenzia dvs.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Recenzie trimisă",
      description: "Vă mulțumim pentru feedback! Recenzia dvs. va fi publicată după moderare.",
    });
    
    setReviewComment("");
  };

  return (
    <div className="py-12">
      {/* SEO Optimizations */}
      <Helmet>
        <title>{product.name} | Veloura - Where Every 'Yes' Begins in Style</title>
        <meta name="description" content={product.description.substring(0, 160)} />
        <link rel="canonical" href={`https://veloura.ro/product/${product.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      
      <div className="wedding-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  className={`rounded-md overflow-hidden border-2 ${index === selectedImageIndex ? 'border-wedding-gold' : 'border-transparent'}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} vedere ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="wedding-title mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.reviews.average) ? "text-wedding-gold fill-wedding-gold" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-sm ml-2">{product.reviews.average} ({product.reviews.count} recenzii)</span>
            </div>
            <p className="text-2xl font-medium mb-6">{product.price} Lei</p>
            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Mărime</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`border rounded-md w-12 h-10 flex items-center justify-center ${
                      selectedSize === size ? 'border-wedding-gold bg-wedding-gold/10' : 'border-gray-300 hover:border-wedding-gold'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-sm text-red-500 mt-2">Vă rugăm să selectați o mărime</p>}
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Cantitate</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-max">
                <button 
                  className="px-3 py-2 border-r border-gray-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button 
                  className="px-3 py-2 border-l border-gray-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                className="wedding-btn-secondary flex items-center gap-2 flex-1" 
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                <ShoppingBag size={18} />
                Adaugă în coș
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Heart size={18} />
                Adaugă la favorite
              </Button>
            </div>

            <div className="bg-wedding-ivory p-4 rounded-lg mb-8">
              <div className="flex items-start gap-3 mb-4">
                <Truck className="shrink-0 mt-1" size={18} />
                <div>
                  <p className="font-medium">Livrare gratuită</p>
                  <p className="text-sm text-gray-600">Livrare standard gratuită pentru comenzi peste 300 Lei</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-wedding-gold">
                <span>Află mai multe despre livrare și returnări</span>
                <ArrowRight size={14} className="ml-1" />
              </div>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="details">Detalii</TabsTrigger>
                <TabsTrigger value="features">Caracteristici</TabsTrigger>
                <TabsTrigger value="reviews">Recenzii</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <dl className="space-y-4">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key}>
                      <dt className="font-medium capitalize">{key}</dt>
                      <dd className="text-gray-600 mt-1">{value}</dd>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </dl>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="bg-wedding-gold/20 w-2 h-2 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-2xl font-medium">{product.reviews.average} din 5</p>
                    <p className="text-sm text-gray-600">Bazat pe {product.reviews.count} recenzii</p>
                  </div>
                </div>
                
                {/* Reviews List */}
                <div className="space-y-6 mb-8">
                  {product.reviews.items && product.reviews.items.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < review.rating ? "text-wedding-gold fill-wedding-gold" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                {/* Add Review Form */}
                <div className="bg-wedding-ivory/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-4">Adaugă o recenzie</h3>
                  <div className="mb-4">
                    <p className="mb-1 text-sm">Evaluare:</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star 
                            size={20} 
                            className={star <= reviewRating ? "text-wedding-gold fill-wedding-gold" : "text-gray-300"} 
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Evaluare: {reviewRating} din 5 stele</p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-1 text-sm">Comentariu client:</p>
                    <Textarea 
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Împărtășește-ți experiența cu acest produs..."
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitReview}
                    className="wedding-btn-secondary"
                  >
                    Trimite recenzia
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
