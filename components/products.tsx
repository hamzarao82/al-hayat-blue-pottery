'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Toast from '@/components/toast';
import ProductCard from './product-card';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Ceramic Tea Set',
    price: 2499,
    discount: 28,
    image: '/blue-pottery-tea-set.jpg',
  },
  {
    id: 2,
    name: 'Handcrafted Plates',
    price: 1299,
    discount: 31,
    image: '/blue-ceramic-plates-set.jpg',
  },
  {
    id: 3,
    name: 'Decorative Bowls',
    price: 1899,
    discount: 32,
    image: '/blue-pottery-bowls-collection.jpg',
  },
  {
    id: 4,
    name: 'Serving Platter',
    price: 1599,
    discount: 31,
    image: '/traditional-blue-pottery-platter.jpg',
  },
  {
    id: 5,
    name: 'Coffee Mugs',
    price: 899,
    discount: 34,
    image: '/blue-ceramic-coffee-mugs.jpg',
  },
  {
    id: 6,
    name: 'Dinner Set',
    price: 3499,
    discount: 29,
    image: '/complete-blue-pottery-dinner-set.jpg',
  },
];

export default function Products() {
  const [toastData, setToastData] = useState<{ name: string; price: number; image: string } | null>(null);

  const handleAddToCart = (product: Product) => {
    setToastData({
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setTimeout(() => {
      setToastData(null);
    }, 3000);
  };

  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-blue mb-4">
              Our Premium Collection
            </h2>
            <p className="text-lg text-blue/70 max-w-2xl mx-auto">
              Handcrafted blue pottery pieces that bring elegance and tradition to your home
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
            ))}
          </div>
        </div>
      </section>

      {toastData && <Toast product={toastData} />}
    </>
  );
}
