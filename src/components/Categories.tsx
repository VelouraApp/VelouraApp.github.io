
import React from 'react';
import { Link } from 'react-router-dom';

// Mock categories data
const categories = [
  {
    id: 1,
    name: 'Rochii',
    image: '/lovable-uploads/rochie1.jpg',
    link: '/shop?categorie=Rochii',
  },
  {
    id: 2,
    name: 'Accesorii',
    image: '/lovable-uploads/tiara.jpg',
    link: '/shop',
  },
  {
    id: 3,
    name: 'Decoratiuni',
    image: '/lovable-uploads/aranj-masa.jpeg',
    link: '/shop',
  },
  {
    id: 4,
    name: 'Invitatii',
    image: '/lovable-uploads/set_invitatii.jpg',
    link: '/shop',
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-wedding-ivory">
      <div className="wedding-container">
        <div className="text-center mb-12">
          <h2 className="wedding-subtitle mb-4">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find everything you need for your perfect wedding day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="relative overflow-hidden rounded-lg h-[300px] group"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <h3 className="text-white font-serif text-xl">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
