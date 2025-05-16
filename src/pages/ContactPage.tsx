
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Map, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import GoogleMap from '@/components/GoogleMap';
import { Helmet } from 'react-helmet-async';

export default function ContactPage() {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mesaj trimis",
      description: "Mulțumim pentru mesaj! Vom reveni cu un răspuns în curând.",
    });
  };

  return (
    <div className="py-12">
      <Helmet>
        <title>Contact - Veloura | Where Every 'Yes' Begins in Style</title>
        <meta name="description" content="Contactează echipa Veloura pentru orice întrebări legate de produsele și serviciile noastre pentru nunta ta." />
        <link rel="canonical" href="https://veloura.ro/contact" />
      </Helmet>

      <div className="wedding-container">
        <h1 className="wedding-title mb-4 text-center">Contactați-ne</h1>
        <p className="text-center max-w-2xl mx-auto mb-12">
          Aveți întrebări despre produsele sau serviciile noastre? Suntem aici să vă ajutăm. Contactați-ne și vă vom răspunde cât mai curând posibil.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif mb-6">Trimiteți-ne un mesaj</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    Prenume
                  </label>
                  <Input id="firstName" placeholder="Prenumele dumneavoastră" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Nume
                  </label>
                  <Input id="lastName" placeholder="Numele dumneavoastră" />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Adresă de email
                </label>
                <Input id="email" type="email" placeholder="Adresa dumneavoastră de email" />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subiect
                </label>
                <Input id="subject" placeholder="Subiectul mesajului" />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mesaj
                </label>
                <Textarea id="message" placeholder="Mesajul dumneavoastră" rows={5} />
              </div>

              <Button type="submit" className="wedding-btn-secondary w-full">
                Trimite Mesaj
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-wedding-blush/30 p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-serif mb-6">Informații de contact</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Map className="shrink-0 mr-4 text-wedding-gold" />
                  <div>
                    <h3 className="font-medium">Showroom</h3>
                    <p className="text-gray-600">
                      Str. Universității 7-9<br />
                      Cluj-Napoca, CJ 400091
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="shrink-0 mr-4 text-wedding-gold" />
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-gray-600">(0264) 123-456</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="shrink-0 mr-4 text-wedding-gold" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">contact@veloura.ro</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="shrink-0 mr-4 text-wedding-gold" />
                  <div>
                    <h3 className="font-medium">Program</h3>
                    <p className="text-gray-600">
                      Luni - Vineri: 10:00 - 19:00<br />
                      Sâmbătă: 10:00 - 18:00<br />
                      Duminică: Doar cu programare
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <GoogleMap address="Str. Universității 7-9, Cluj-Napoca 400091, România" />
          </div>
        </div>
      </div>
    </div>
  );
}
