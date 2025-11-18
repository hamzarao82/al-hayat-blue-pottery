'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

export default function VasesPage() {
  const [cartNotification, setCartNotification] = useState<{ name: string; image: string; price: number } | null>(null);

  const products = [
    { id: 51, name: 'Blue Ceramic Vase', price: 799, originalPrice: 1099, image: '/blue-pottery-tea-set.jpg', discount: 27 },
    { id: 52, name: 'Tall Flower Vase', price: 599, originalPrice: 799, image: '/blue-ceramic-plates-set.jpg', discount: 25 },
    { id: 53, name: 'Felicity Vase Set', price: 1199, originalPrice: 1599, image: '/blue-pottery-bowls-collection.jpg', discount: 25 },
    { id: 54, name: 'Wide Mouth Vase', price: 649, originalPrice: 899, image: '/blue-pottery-tea-set.jpg', discount: 28 },
    { id: 55, name: 'Decorative Blue Vase', price: 899, originalPrice: 1199, image: '/blue-ceramic-plates-set.jpg', discount: 25 },
    { id: 56, name: 'Table Centerpiece Vase', price: 749, originalPrice: 999, image: '/blue-pottery-bowls-collection.jpg', discount: 25 },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    setCartNotification({ name: product.name, image: product.image, price: product.price });
    setTimeout(() => setCartNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Vases</h1>
        <p className="text-blue/70 mb-12">Elegant blue pottery vases for flowers and decor</p>

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
