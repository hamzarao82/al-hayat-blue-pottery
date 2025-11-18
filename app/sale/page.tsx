'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const saleProducts = [
  { id: 1, name: 'Dinner Set Blue Classic', price: 2499, discount: 40, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Serving Platter Indigo', price: 1899, discount: 50, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Wall Hanging Blue Art', price: 3999, discount: 45, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Blue Pottery Lamp', price: 4499, discount: 35, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Ceramic Bowl Set', price: 1299, discount: 30, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Blue Felicity Collection', price: 2999, discount: 42, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 7, name: 'Tranquility Blue Set', price: 3299, discount: 38, image: '/blue-pottery-tea-set.jpg' },
  { id: 8, name: 'Decorative Planter', price: 1599, discount: 35, image: '/blue-ceramic-plates-set.jpg' },
  { id: 9, name: 'Tea Service Set (7pc)', price: 2199, discount: 48, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 10, name: 'Blue Ceramic Vase', price: 2199, discount: 40, image: '/blue-pottery-tea-set.jpg' },
  { id: 11, name: 'Pottery Karahi Premium', price: 1599, discount: 33, image: '/blue-ceramic-plates-set.jpg' },
  { id: 12, name: 'Design Family Bundle', price: 4999, discount: 50, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function SalePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-blue mb-2">SPECIAL SALE</h1>
          <p className="text-lg text-caramel font-medium mb-2">Up to 50% Off - Limited Time!</p>
          <p className="text-lg text-blue/70">Don't miss our exclusive sale on finest blue pottery pieces. Incredible discounts on selected items.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
