'use client';

import { ShoppingCart, Share2 } from 'lucide-react';
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
  const [cartButtonState, setCartButtonState] = useState<'idle' | 'quantity' | 'loading' | 'success'>('idle');
  const [quantity, setQuantity] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);

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

  const handleCopyLink = () => {
    const productUrl = window.location.href;
    navigator.clipboard.writeText(productUrl);
    alert('Link copied to clipboard!');
    setShowShareMenu(false);
  };

  const handleShareWhatsApp = () => {
    const text = `Check out ${product.name} - Rs ${discountedPrice.toLocaleString()} (${product.discount}% off!)`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const handleShareInstagram = () => {
    alert('To share on Instagram, please take a screenshot and post it to your story or feed!');
    setShowShareMenu(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 max-w-sm border border-gray-100">

        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/api/placeholder/400/400"}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Discount Badge - Top Right */}
          {product.discount > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-bold">{product.discount}% off</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">

          {/* Product Name & Share Button */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-blue-800 text-xl leading-tight flex-1">
              {product.name}
            </h3>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShareMenu(!showShareMenu);
                }}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-all duration-300 flex-shrink-0"
              >
                <Share2 size={20} />
              </button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowShareMenu(false)}
                  ></div>
                  <div className="absolute right-full top-0 mr-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 w-64 z-20 animate-slideIn max-h-80 overflow-y-auto">
                    <button
                      onClick={handleCopyLink}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Copy Link</span>
                    </button>
                    <button
                      onClick={handleShareWhatsApp}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                    >
                      <svg className="w-5 h-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span className="font-medium">Share via WhatsApp</span>
                    </button>
                    <button
                      onClick={handleShareInstagram}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                    >
                      <svg className="w-5 h-5 flex-shrink-0 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="font-medium">Share via Instagram</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-orange-600">
              Rs {discountedPrice.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400 line-through">
              Rs {product.price.toLocaleString()}
            </span>
          </div>

          {/* Add to Cart Button / Quantity Selector */}
          {cartButtonState === 'idle' && (
            <button
              onClick={handleFirstClick}
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 transform flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          )}

          {cartButtonState === 'quantity' && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 flex-1 bg-gray-100 rounded-xl p-2">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-lg text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          )}

          {cartButtonState === 'loading' && (
            <button
              disabled
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-gray-400 cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding...</span>
            </button>
          )}

          {cartButtonState === 'success' && (
            <button
              disabled
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-green-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Added!</span>
            </button>
          )}
        </div>
      </div>

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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}