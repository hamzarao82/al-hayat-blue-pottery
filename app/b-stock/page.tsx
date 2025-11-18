'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const bStockProducts = [
  { id: 1, name: 'B-Stock Dinner Set', price: 1899, discount: 45, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'B-Stock Serving Platter', price: 1299, discount: 40, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'B-Stock Bowl Set', price: 899, discount: 35, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'B-Stock Vase', price: 1699, discount: 42, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'B-Stock Planter', price: 999, discount: 38, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'B-Stock Tea Mug Set', price: 299, discount: 25, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 7, name: 'B-Stock Karahi', price: 1199, discount: 40, image: '/blue-pottery-tea-set.jpg' },
  { id: 8, name: 'B-Stock Ceramic Lamp', price: 2899, discount: 50, image: '/blue-ceramic-plates-set.jpg' },
  { id: 9, name: 'B-Stock Serving Set', price: 1499, discount: 45, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 10, name: 'B-Stock Wall Hanging', price: 1999, discount: 48, image: '/blue-pottery-tea-set.jpg' },
  { id: 11, name: 'B-Stock Tea Service', price: 1599, discount: 42, image: '/blue-ceramic-plates-set.jpg' },
  { id: 12, name: 'B-Stock Design Set', price: 1799, discount: 46, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function BStockPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-blue mb-4">B-Stock Collection</h1>
          <p className="text-lg text-blue/70 mb-4">Second quality items at exceptional prices. Perfect for those seeking great value without compromising on quality!</p>
          <div className="bg-blue/5 border-l-4 border-caramel p-4 rounded">
            <p className="text-sm text-blue/80">
              B-Stock items are perfect pieces with minor cosmetic imperfections. They are fully functional and come with the same quality guarantee as our premium collection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bStockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
