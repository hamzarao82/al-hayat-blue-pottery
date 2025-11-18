'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

export default function SerinaBluePage() {
  const [cartNotification, setCartNotification] = useState<{ name: string; image: string; price: number } | null>(null);

  const products = [
    { id: 1, name: 'Serina Blue Dinner Set', price: 2699, originalPrice: 3499, image: '/blue-pottery-tea-set.jpg', discount: 23 },
    { id: 2, name: 'Serina Blue Bowls', price: 1999, originalPrice: 2599, image: '/blue-ceramic-plates-set.jpg', discount: 23 },
    { id: 3, name: 'Serina Blue Serving', price: 1899, originalPrice: 2599, image: '/blue-pottery-bowls-collection.jpg', discount: 27 },
    { id: 4, name: 'Serina Blue Tea Set', price: 2299, originalPrice: 3099, image: '/blue-pottery-tea-set.jpg', discount: 26 },
    { id: 5, name: 'Serina Blue Plates', price: 1699, originalPrice: 2299, image: '/blue-ceramic-plates-set.jpg', discount: 26 },
    { id: 6, name: 'Serina Blue Collection', price: 2999, originalPrice: 3999, image: '/blue-pottery-bowls-collection.jpg', discount: 25 },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    setCartNotification({ name: product.name, image: product.image, price: product.price });
    setTimeout(() => setCartNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Serina Blue Collection</h1>
        <p className="text-blue/70 mb-12">Discover the sophistication of our Serina Blue design family</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </main>

      {cartNotification && (
        <div className="fixed top-4 right-4 bg-white border-2 border-caramel rounded-lg shadow-lg p-4 flex gap-4 max-w-sm animate-in slide-in-from-right z-50">
          <img src={cartNotification.image || "/placeholder.svg"} alt={cartNotification.name} className="w-16 h-16 rounded object-cover" />
          <div>
            <p className="font-semibold text-blue">{cartNotification.name}</p>
            <p className="text-caramel font-bold">Rs {cartNotification.price.toLocaleString()}</p>
            <p className="text-sm text-green-600">Added to cart</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
