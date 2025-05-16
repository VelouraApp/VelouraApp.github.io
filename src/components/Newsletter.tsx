
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  return (
    <section className="py-16 bg-wedding-navy text-white">
      <div className="wedding-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="wedding-subtitle text-white mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to get special offers, wedding inspiration, and planning tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Your email address" 
              type="email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="wedding-btn-secondary">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
