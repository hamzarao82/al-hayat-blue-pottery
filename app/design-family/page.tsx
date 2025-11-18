'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const designFamilyProducts = [
  { id: 1, name: 'Blue Felicity Collection', price: 2999, discount: 20, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Pattern Series', price: 2599, discount: 15, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Tranquility Blue Set', price: 3299, discount: 22, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Serina Blue Collection', price: 2799, discount: 18, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Blue Flower Design Set', price: 3599, discount: 20, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Blue Celico Series', price: 2899, discount: 16, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 7, name: 'Spring Pattern Set', price: 2699, discount: 14, image: '/blue-pottery-tea-set.jpg' },
  { id: 8, name: 'Azure Dreams Collection', price: 3199, discount: 19, image: '/blue-ceramic-plates-set.jpg' },
  { id: 9, name: 'Indigo Elegance Series', price: 2899, discount: 17, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 10, name: 'Celestial Blue Set', price: 3499, discount: 21, image: '/blue-pottery-tea-set.jpg' },
  { id: 11, name: 'Mystique Blue Design', price: 3099, discount: 18, image: '/blue-ceramic-plates-set.jpg' },
  { id: 12, name: 'Heritage Blue Collection', price: 3399, discount: 20, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function DesignFamilyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-blue mb-4">Design Family</h1>
          <p className="text-lg text-blue/70">Explore our curated design families, each with its own unique aesthetic and artistic expression. Discover collections that tell stories through color and pattern.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {designFamilyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
