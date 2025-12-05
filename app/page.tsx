'use client';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Categories from '@/components/categories';
import Gallery from '@/components/gallery';
import Products from '@/components/products';
import Reviews from '@/components/reviews';
import Heritage from '@/components/heritage';
import Footer from '@/components/footer';
import { AdminLayout } from '@/components/admin';

export default function Home() {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-cream">
        <Header />
        <Hero />
        <Categories />
        <Gallery />
        <Products />
        <Heritage />
        <Reviews />
        <Footer />
      </div>
    </AdminLayout>
  );
}

