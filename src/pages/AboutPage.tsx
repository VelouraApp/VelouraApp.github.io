import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

// ======== Configurare Echipa (adaugă/editează aici membri noi) ========
const TEAM_MEMBERS = [
  {
    name: "Matei-Stefan Anton",
    role: "Co-Fondator",
    image: "/lovable-uploads/matei.png",
    description: "Fondator pasionat de evenimente elegante și experiențe premium."
  },
  {
    name: "Andrei Diana",
    role: "Co-Fondator",
    image: "/lovable-uploads/diana.jpeg", // înlocuiește cu poza reală, dacă ai alta mai potrivită
    description: "Specializată în relații cu clienții și organizare evenimente."
  },
  {
    name: "Mlesnita Alexandra-Mihaela",
    role: "Co-Fondator",
    image: "/lovable-uploads/alexandra.jpeg",
    description: "Creatoare de concepte și specialist în decor."
  },
  {
    name: "Chertes Rares",
    role: "Co-Fondator",
    image: "/lovable-uploads/rares.jpeg",
    description: "Expert în logistică și tehnologie pentru evenimente."
  },
];

// ============ Componenta principală AboutPage ============
export default function AboutPage() {
  return (
    <div>
      {/* SEO Optimizations */}
      <Helmet>
        <title>Despre Noi | Veloura - Where Every 'Yes' Begins in Style</title>
        <meta name="description" content="Descoperiți povestea Veloura, magazinul online dedicat nunților și evenimentelor speciale din viața dumneavoastră." />
      </Helmet>

      {/* Hero section */}
      <section
        className="relative h-[400px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1505236732171-72a5b19c4981?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)",
        }}
      >
        <div className="wedding-container text-center text-white">
          <h1 className="wedding-title mb-4">Despre Veloura</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Where Every 'Yes' Begins in Style
          </p>
        </div>
      </section>

      {/* Echipa noastră */}
      <section className="py-16">
        <div className="wedding-container">
          <div className="text-center mb-12">
            <h2 className="wedding-subtitle mb-4">Echipa noastră</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O echipă dedicată construirii celui mai bun magazin pentru nunți și evenimente speciale.
            </p>
          </div>

          {/* Grid co-fondatori */}
          <div className="flex flex-wrap justify-center gap-12">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="text-center w-full max-w-xs">
                <div className="mb-6">
                  <div className="overflow-hidden rounded-full w-48 h-48 mx-auto mb-4 border-4 border-wedding-blush bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif mb-1">{member.name}</h3>
                  <p className="text-wedding-gold mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
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
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/20"
            >
              <Link to="/contact">Contactează-ne</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

