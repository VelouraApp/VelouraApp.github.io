
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[80vh] bg-cover bg-center flex items-center" 
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)' }}
      aria-label="Banner principal Veloura">
      <div className="wedding-container">
        <div className="max-w-xl text-white animate-fade-in">
          <h1 className="wedding-title mb-4">Veloura</h1>
          <p className="text-xl mb-3 italic">Where Every 'Yes' Begins in Style</p>
          <p className="text-lg mb-8 text-white/90">
            Descoperă colecția noastră de esențiale pentru nuntă, create pentru a oferi amintiri de neuitat în ziua ta perfectă.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="wedding-btn-primary">
              <Link to="/shop">Vezi Colecția</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
              <Link to="/planificare">Planificare Nuntă</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
