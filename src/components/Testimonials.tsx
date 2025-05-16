
import React from 'react';
import { Star } from 'lucide-react';

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Jessica & Michael',
    image: 'https://images.unsplash.com/photo-1623091970997-e2e86df4b262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'We found everything we needed for our special day at Eternal Elegance. The dress was absolutely perfect and the customer service was outstanding.',
  },
  {
    id: 2,
    name: 'Sarah & David',
    image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'Their wedding planning service took so much stress off our shoulders. Everything was beautifully coordinated and exactly what we envisioned.',
  },
  {
    id: 3,
    name: 'Emily & James',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    rating: 4,
    text: "The personalized wedding invitations were stunning! Our guests couldn't stop talking about how beautiful they were.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-wedding-blush/30">
      <div className="wedding-container">
        <div className="text-center mb-12">
          <h2 className="wedding-subtitle mb-4">Happy Couples</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what our customers have to say about their experience with Eternal Elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <h3 className="font-medium">{testimonial.name}</h3>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-wedding-gold fill-wedding-gold" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
