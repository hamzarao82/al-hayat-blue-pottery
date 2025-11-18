'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

export default function BlueFelicityPage() {
  const [cartNotification, setCartNotification] = useState<{ name: string; image: string; price: number } | null>(null);

  const products = [
    { id: 1, name: 'Blue Felicity Dinner Set', price: 2499, originalPrice: 3199, image: '/blue-pottery-tea-set.jpg', discount: 22 },
    { id: 2, name: 'Blue Felicity Bowl Set', price: 1899, originalPrice: 2499, image: '/blue-ceramic-plates-set.jpg', discount: 24 },
    { id: 3, name: 'Blue Felicity Platter', price: 1699, originalPrice: 2299, image: '/blue-pottery-bowls-collection.jpg', discount: 26 },
    { id: 4, name: 'Blue Felicity Tea Set', price: 2199, originalPrice: 2899, image: '/blue-pottery-tea-set.jpg', discount: 24 },
    { id: 5, name: 'Blue Felicity Serving Dish', price: 1449, originalPrice: 1999, image: '/blue-ceramic-plates-set.jpg', discount: 28 },
    { id: 6, name: 'Blue Felicity Collection', price: 2799, originalPrice: 3699, image: '/blue-pottery-bowls-collection.jpg', discount: 24 },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    setCartNotification({ name: product.name, image: product.image, price: product.price });
    setTimeout(() => setCartNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Blue Felicity Collection</h1>
        <p className="text-blue/70 mb-12">Discover the elegance of our Blue Felicity design family</p>

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
