'use client';

import { ShoppingCart, Share2, Eye } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Toast from './toast';
import QuickViewModal from './quick-view-modal';

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
  const [showQuickView, setShowQuickView] = useState(false);
  const [cartButtonState, setCartButtonState] = useState<'idle' | 'quantity' | 'loading' | 'success'>('idle');
  const [quantity, setQuantity] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = Math.round(product.price * (1 - product.discount / 100));

  const handleFirstClick = () => {
    setCartButtonState('quantity');
  };

  const handleAddToCart = async () => {
    setCartButtonState('loading');

    setTimeout(() => {
      setCartButtonState('success');
      setShowToast(true);
      if (onAddToCart) {
        onAddToCart();
      }

      setTimeout(() => {
        setCartButtonState('idle');
        setQuantity(1);
        setShowToast(false);
      }, 2000);
    }, 600);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Image Section */}
        <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
          <img
            src={product.image || "/api/placeholder/300/300"}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-lg z-10">
              <span className="text-xs font-bold">{product.discount}% off</span>
            </div>
          )}

          {/* Quick View Button - Shows on Hover */}
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="px-6 py-3 bg-white text-blue-900 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:scale-105"
            >
              <Eye size={18} />
              <span>Quick View</span>
            </button>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-4 space-y-3">

          {/* Product Name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-blue-800 text-base leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-orange-600">
              Rs {discountedPrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              Rs {product.price.toLocaleString()}
            </span>
          </div>

          {/* Add to Cart Button / Quantity Selector */}
          {cartButtonState === 'idle' && (
            <button
              onClick={handleFirstClick}
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-700 hover:bg-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 transform flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          )}

          {cartButtonState === 'quantity' && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 bg-gray-100 rounded-xl p-1.5">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all text-sm"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all text-sm"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          )}

          {cartButtonState === 'loading' && (
            <button
              disabled
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-gray-400 cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding...</span>
            </button>
          )}

          {cartButtonState === 'success' && (
            <button
              disabled
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-green-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Added!</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        onAddToCart={onAddToCart}
      />

      {showToast && (
        <Toast
          product={{
            name: product.name,
            price: discountedPrice,
            image: product.image,
          }}
        />
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}