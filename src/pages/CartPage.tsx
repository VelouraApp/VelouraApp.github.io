
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Helmet } from 'react-helmet-async';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, getTotal } = useCart();

  const subtotal = getTotal();
  const shipping = subtotal > 300 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="py-12">
      {/* SEO Optimizations */}
      <Helmet>
        <title>Coșul meu | Veloura - Where Every 'Yes' Begins in Style</title>
        <meta name="description" content="Verificați produsele din coșul dvs. de cumpărături și finalizați comanda pentru a vă pregăti pentru ziua cea mare." />
      </Helmet>
      
      <div className="wedding-container">
        <h1 className="wedding-title mb-8 text-center">Coșul tău de cumpărături</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl mb-6">Coșul tău este gol</p>
            <Button asChild className="wedding-btn-primary">
              <Link to="/shop">Continuă cumpărăturile</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-4 px-6 font-medium">Produs</th>
                      <th className="text-center py-4 px-2 font-medium">Cantitate</th>
                      <th className="text-right py-4 px-6 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-6 px-6">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md mr-6"
                            />
                            <div>
                              <h3 className="font-medium mb-1">{item.name}</h3>
                              <p className="text-sm text-gray-500 mb-1">Mărime: {item.size}</p>
                              <p className="text-sm text-gray-500">{item.price} Lei</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-2">
                          <div className="flex items-center justify-center border border-gray-300 rounded-md w-max mx-auto">
                            <button 
                              className="px-3 py-1 border-r border-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 border-l border-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-right">
                          <div className="flex items-center justify-end">
                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)} Lei</span>
                            <button 
                              className="ml-4 text-gray-400 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link to="/shop" className="flex items-center">
                    <ArrowRight className="mr-2 transform rotate-180" size={16} />
                    Continuă cumpărăturile
                  </Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-serif mb-6">Sumar comandă</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} Lei</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport</span>
                    <span>{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)} Lei`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{total.toFixed(2)} Lei</span>
                  </div>
                </div>

                <Button asChild className="wedding-btn-secondary w-full mb-6">
                  <Link to="/checkout">
                    Continuă spre finalizare comandă
                  </Link>
                </Button>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start">
                    <Truck size={16} className="mr-2 mt-1 text-wedding-gold" />
                    <span>Livrare gratuită pentru comenzi peste 300 Lei</span>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck size={16} className="mr-2 mt-1 text-wedding-gold" />
                    <span>Plata securizată cu criptare SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
