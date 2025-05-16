
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { User, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div>
      {/* SEO Optimizations */}
      <Helmet>
        <title>Despre Noi | Veloura - Where Every 'Yes' Begins in Style</title>
        <meta name="description" content="Descoperiți povestea Veloura, magazinul online dedicat nunților și evenimentelor speciale din viața dumneavoastră." />
      </Helmet>

      {/* Hero section */}
      <section className="relative h-[400px] bg-cover bg-center flex items-center" 
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1505236732171-72a5b19c4981?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)' }}>
        <div className="wedding-container text-center text-white">
          <h1 className="wedding-title mb-4">Despre Veloura</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Where Every 'Yes' Begins in Style
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="wedding-container">
          <div className="text-center mb-12">
            <h2 className="wedding-subtitle mb-4">Echipa noastră</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O echipă dedicată construirii celui mai bun magazin pentru nunți și evenimente speciale.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {/* Founder */}
            <div className="text-center w-full max-w-xs">
              <div className="mb-6">
                <div className="overflow-hidden rounded-full w-48 h-48 mx-auto mb-4 border-4 border-wedding-blush">
                  <img 
                    src="/lovable-uploads/b2a37e6c-6520-4b40-a6b6-78109952ab7b.png" 
                    alt="Matei-Stefan Anton" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif mb-1">Matei-Stefan Anton</h3>
                <p className="text-wedding-gold mb-6">Fondator</p>
              </div>
            </div>

            {/* Future Team Members */}
            <div className="flex flex-wrap justify-center gap-8 w-full mt-12">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="text-center w-full max-w-xs">
                  <div className="mb-6">
                    <div className="flex items-center justify-center overflow-hidden rounded-full w-48 h-48 mx-auto mb-4 border-4 border-wedding-blush/30 bg-gray-100">
                      <Users className="w-24 h-24 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-serif mb-1 text-gray-400">În curând</h3>
                    <p className="text-wedding-gold/50">Membru nou</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-wedding-navy text-white">
        <div className="wedding-container text-center">
          <h2 className="wedding-subtitle text-white mb-4">Sunteți gata să începeți planificarea nunții de vis?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Permiteți-ne să vă ajutăm să creați nunta visurilor voastre. Explorați colecțiile noastre sau contactați-ne pentru a discuta despre viziunea voastră.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="wedding-btn-primary">
              <Link to="/shop">Explorează Colecțiile</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
              <Link to="/contact">Contactează-ne</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
