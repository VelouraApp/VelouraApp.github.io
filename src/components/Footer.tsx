
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Abonare reușită!",
      description: "Vă mulțumim pentru abonare la newsletter-ul nostru.",
    });
  };
  
  return (
    <footer className="bg-wedding-navy text-wedding-white pt-16 pb-8">
      <div className="wedding-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company information */}
          <div>
            <h3 className="font-serif text-xl mb-2 text-wedding-gold">Veloura</h3>
            <p className="text-sm italic mb-3 text-gray-300">
              Where Every 'Yes' Begins in Style
            </p>
            <p className="text-sm mb-4 text-gray-300">
              Creăm amintiri atemporale pentru ziua perfectă. Esențiale premium pentru nuntă, alese cu dragoste și grijă.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-wedding-gold">Magazin</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/rochii" className="hover:text-wedding-gold transition-colors">Rochii de Mireasă</Link>
              </li>
              <li>
                <Link to="/accesorii" className="hover:text-wedding-gold transition-colors">Accesorii</Link>
              </li>
              <li>
                <Link to="/decoruri" className="hover:text-wedding-gold transition-colors">Decorațiuni</Link>
              </li>
              <li>
                <Link to="/invitatii" className="hover:text-wedding-gold transition-colors">Invitații</Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-wedding-gold">Informații</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/about" className="hover:text-wedding-gold transition-colors">Despre noi</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-wedding-gold transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/planificare" className="hover:text-wedding-gold transition-colors">Planificare</Link>
              </li>
              <li>
                <Link to="/termeni" className="hover:text-wedding-gold transition-colors">Termeni și condiții</Link>
              </li>
              <li>
                <Link to="/confidentialitate" className="hover:text-wedding-gold transition-colors">Politica de confidențialitate</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-wedding-gold">Newsletter</h3>
            <p className="text-sm mb-4 text-gray-300">
              Abonează-te la newsletter-ul nostru pentru oferte exclusive și inspirație pentru nuntă.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input 
                placeholder="Adresa ta de email" 
                className="bg-wedding-navy border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button type="submit" className="wedding-btn-secondary">Abonare</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Veloura. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
