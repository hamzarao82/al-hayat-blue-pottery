'use client';

import { X, Check } from 'lucide-react';

interface CartToastProps {
  productName: string;
  productPrice: number;
  productImage: string;
}

export default function CartToast({
  productName,
  productPrice,
  productImage,
}: CartToastProps) {
  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right-4 fade-in">
      <div className="bg-cream border-2 border-caramel rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center gap-4 p-4">
          {/* Product image */}
          <div className="w-16 h-16 rounded-lg bg-blue/10 flex-shrink-0 overflow-hidden">
            <img
              src={productImage || "/placeholder.svg"}
              alt={productName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Check size={18} className="text-caramel flex-shrink-0" />
              <p className="text-sm font-semibold text-blue">Added to cart</p>
            </div>
            <p className="text-sm text-blue/70 truncate">{productName}</p>
            <p className="text-sm font-bold text-caramel">Rs {productPrice.toLocaleString()}</p>
          </div>

          {/* Close button */}
          <button className="text-blue/40 hover:text-blue transition flex-shrink-0">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
