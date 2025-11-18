'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

export default function NewArrivalsPage() {
  const [cartNotification, setCartNotification] = useState<{ name: string; image: string; price: number } | null>(null);

  const products = [
    { id: 101, name: 'Limited Edition Blue Set', price: 2599, originalPrice: 3299, image: '/blue-pottery-tea-set.jpg', discount: 21 },
    { id: 102, name: 'Newest Felicity Collection', price: 2799, originalPrice: 3499, image: '/blue-ceramic-plates-set.jpg', discount: 20 },
    { id: 103, name: 'Exclusive Pattern Vase', price: 1299, originalPrice: 1699, image: '/blue-pottery-bowls-collection.jpg', discount: 24 },
    { id: 104, name: 'Fresh Arrival Dinner Set', price: 2199, originalPrice: 2799, image: '/blue-pottery-tea-set.jpg', discount: 21 },
    { id: 105, name: 'Modern Design Bowl Set', price: 1599, originalPrice: 1999, image: '/blue-ceramic-plates-set.jpg', discount: 20 },
    { id: 106, name: 'Latest Blue Planter', price: 899, originalPrice: 1299, image: '/blue-pottery-bowls-collection.jpg', discount: 31 },
    { id: 107, name: 'New Season Mugs Set', price: 499, originalPrice: 699, image: '/blue-pottery-tea-set.jpg', discount: 29 },
    { id: 108, name: 'Fresh Pattern Platter', price: 799, originalPrice: 1099, image: '/blue-ceramic-plates-set.jpg', discount: 27 },
    { id: 109, name: 'Latest Design Serving Bowl', price: 699, originalPrice: 999, image: '/blue-pottery-bowls-collection.jpg', discount: 30 },
    { id: 110, name: 'Newest Decorative Pot', price: 649, originalPrice: 899, image: '/blue-pottery-tea-set.jpg', discount: 28 },
    { id: 111, name: 'Fresh Arrival Wall Art', price: 899, originalPrice: 1299, image: '/blue-ceramic-plates-set.jpg', discount: 31 },
    { id: 112, name: 'Latest Collection Vase', price: 749, originalPrice: 999, image: '/blue-pottery-bowls-collection.jpg', discount: 25 },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    setCartNotification({ name: product.name, image: product.image, price: product.price });
    setTimeout(() => setCartNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="inline-block bg-caramel text-cream px-4 py-2 rounded-full text-sm font-medium mb-4">Just Arrived</div>
          <h1 className="text-4xl font-serif font-bold text-blue mb-2">New Arrivals</h1>
          <p className="text-blue/70">Discover our latest additions to the Al Hayat Blue Pottery collection</p>
        </div>

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
