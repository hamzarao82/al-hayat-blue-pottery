'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const tablewareProducts = [
  { id: 1, name: 'Dinner Set Blue Classic', price: 2499, discount: 20, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Serving Platter Indigo', price: 1899, discount: 15, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Ceramic Bowl Set (6pc)', price: 1299, discount: 10, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Tea Mug Blue Felicity', price: 399, discount: 5, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Blue Pottery Karahi', price: 1599, discount: 12, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Tea Coaster Set (4pc)', price: 299, discount: 8, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 7, name: 'Handles & Cover Pot', price: 1799, discount: 18, image: '/blue-pottery-tea-set.jpg' },
  { id: 8, name: 'Pottery Jar Blue Classic', price: 899, discount: 10, image: '/blue-ceramic-plates-set.jpg' },
  { id: 9, name: 'Dinner Plates Set (4pc)', price: 1699, discount: 14, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 10, name: 'Blue Pottery Serving Bowl', price: 1399, discount: 12, image: '/blue-pottery-tea-set.jpg' },
  { id: 11, name: 'Tea Service Set (7pc)', price: 2199, discount: 16, image: '/blue-ceramic-plates-set.jpg' },
  { id: 12, name: 'Decorative Plate Wall Art', price: 899, discount: 9, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function TablewarePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-blue mb-4">Tableware Collection</h1>
          <p className="text-lg text-blue/70">Discover our exquisite range of blue pottery tableware, handcrafted to perfection. From daily dining to special occasions, each piece adds elegance to your table.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tablewareProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
