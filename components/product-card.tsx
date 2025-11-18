'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Toast from './toast';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showToast, setShowToast] = useState(false);
  const discountedPrice = Math.round(product.price * (1 - product.discount / 100));

  const handleAddToCart = () => {
    setShowToast(true);
    if (onAddToCart) {
      onAddToCart();
    }
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group">
        {/* Product image container */}
        <div className="relative h-64 bg-blue/5 overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          
          <div className="absolute top-3 right-3 bg-caramel text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{product.discount}%
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-medium text-blue truncate mb-3">
            {product.name}
          </h3>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg font-bold text-caramel">
              Rs {discountedPrice.toLocaleString()}
            </span>
            <span className="text-sm text-blue/40 line-through">
              Rs {product.price.toLocaleString()}
            </span>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue text-cream py-2 rounded-lg font-medium hover:bg-blue/90 transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast
          product={{
            name: product.name,
            price: discountedPrice,
            image: product.image,
          }}
        />
      )}
    </>
  );
}
