'use client';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Categories from '@/components/categories';
import Gallery from '@/components/gallery';
import Products from '@/components/products';
import Reviews from '@/components/reviews';
import Heritage from '@/components/heritage';
import Collections from '@/components/collections';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <Categories />
      <Gallery />
      <Products />
      <Reviews />
      <Heritage />
      <Collections />
      <Footer />
    </div>
  );
}
