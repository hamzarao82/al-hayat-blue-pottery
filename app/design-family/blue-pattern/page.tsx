'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

export default function BluePatternPage() {
  const [cartNotification, setCartNotification] = useState<{ name: string; image: string; price: number } | null>(null);

  const products = [
    { id: 1, name: 'Blue Pattern Dinner Set', price: 2599, originalPrice: 3399, image: '/blue-pottery-tea-set.jpg', discount: 24 },
    { id: 2, name: 'Blue Pattern Bowls', price: 1999, originalPrice: 2699, image: '/blue-ceramic-plates-set.jpg', discount: 26 },
    { id: 3, name: 'Blue Pattern Plates', price: 1799, originalPrice: 2499, image: '/blue-pottery-bowls-collection.jpg', discount: 28 },
    { id: 4, name: 'Blue Pattern Serving Set', price: 2299, originalPrice: 3099, image: '/blue-pottery-tea-set.jpg', discount: 26 },
    { id: 5, name: 'Blue Pattern Teapot', price: 1599, originalPrice: 2199, image: '/blue-ceramic-plates-set.jpg', discount: 27 },
    { id: 6, name: 'Blue Pattern Collection', price: 2899, originalPrice: 3899, image: '/blue-pottery-bowls-collection.jpg', discount: 26 },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    setCartNotification({ name: product.name, image: product.image, price: product.price });
    setTimeout(() => setCartNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Blue Pattern Collection</h1>
        <p className="text-blue/70 mb-12">Explore the timeless beauty of our Blue Pattern design family</p>

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
