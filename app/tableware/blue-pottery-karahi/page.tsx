'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const karahiProducts = [
  { id: 1, name: 'Traditional Blue Karahi - Medium', price: 1899, discount: 21, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Royal Blue Karahi - Large', price: 2299, discount: 22, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Pattern Karahi - Small', price: 1599, discount: 19, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Artisan Blue Karahi - Medium', price: 1999, discount: 20, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Premium Blue Karahi - Large', price: 2399, discount: 21, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Elegant Blue Karahi - Medium', price: 2099, discount: 19, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function BlueKarahiPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Blue Pottery Karahi</h1>
        <p className="text-blue/70 mb-12">Handcrafted traditional blue pottery karahis for cooking</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {karahiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
