
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
