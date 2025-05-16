
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string }[]>([
    { sender: 'bot', text: 'Bună ziua! Sunt asistentul virtual Eleganță Eternă. Cu ce vă pot ajuta astăzi?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    
    // Simulate bot response based on keywords
    setTimeout(() => {
      let botResponse = "Ne pare rău, nu am înțeles întrebarea. Puteți încerca să întrebați despre rochii de mireasă, accesorii, decorațiuni, sau invitații.";
      
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('rochie') || lowercaseInput.includes('rochii')) {
        botResponse = "Avem o gamă variată de rochii de mireasă, de la modele clasice la cele moderne. Vizitați secțiunea noastră Rochii pentru a explora colecția completă.";
      } 
      else if (lowercaseInput.includes('accesorii') || lowercaseInput.includes('tiară') || lowercaseInput.includes('voal')) {
        botResponse = "Colecția noastră de accesorii include tiare, voaluri, pantofi și bijuterii. Puteți găsi toate acestea în secțiunea Accesorii.";
      } 
      else if (lowercaseInput.includes('decorațiuni') || lowercaseInput.includes('decoruri') || lowercaseInput.includes('decor')) {
        botResponse = "Oferim o gamă largă de decorațiuni pentru nuntă, inclusiv aranjamente florale, lumânări și decor pentru locație. Vizitați secțiunea Decoruri.";
      } 
      else if (lowercaseInput.includes('invitații') || lowercaseInput.includes('invitatie')) {
        botResponse = "Invitațiile noastre sunt personalizabile și disponibile în mai multe stiluri. Vedeți toate opțiunile în secțiunea Invitații.";
      }
      else if (lowercaseInput.includes('pret') || lowercaseInput.includes('cost') || lowercaseInput.includes('preț')) {
        botResponse = "Prețurile variază în funcție de produs. Pentru rochii de mireasă, prețurile încep de la 3800 Lei. Pentru informații exacte, vă rugăm să vizitați pagina fiecărui produs.";
      }
      else if (lowercaseInput.includes('livrare') || lowercaseInput.includes('transport')) {
        botResponse = "Oferim livrare gratuită pentru comenzi peste 300 Lei. Timpul de livrare este de 3-5 zile lucrătoare în România.";
      }
      else if (lowercaseInput.includes('contact') || lowercaseInput.includes('telefon') || lowercaseInput.includes('email')) {
        botResponse = "Ne puteți contacta la numărul de telefon 0700 123 456 sau prin email la contact@elegantaeterna.ro. De asemenea, puteți vizita pagina noastră de Contact.";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
    
    // Clear input field
    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      <Button 
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 flex items-center justify-center bg-wedding-gold hover:bg-wedding-gold/90 shadow-lg z-40"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      
      {/* Chat Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[85%] max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle>Asistent Virtual Eleganță Eternă</DrawerTitle>
            <DrawerDescription>
              Întrebați-mă orice despre produsele și serviciile noastre pentru nuntă
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 py-2 flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-wedding-gold text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Scrieți un mesaj..."
                className="flex-1 border rounded-md px-3 py-2"
              />
              <Button onClick={handleSend}>Trimite</Button>
            </div>
          </div>
          
          <DrawerFooter>
            <p className="text-xs text-center text-gray-500">
              Acest chatbot oferă asistență de bază pentru întrebări despre produsele noastre.
              Pentru asistență detaliată, vă rugăm să ne contactați direct.
            </p>
            <DrawerClose asChild>
              <Button variant="outline">Închide</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
