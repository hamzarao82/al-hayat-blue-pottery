'use client';

interface ToastProps {
  product: {
    name: string;
    price: number;
    image: string;
  };
}

export default function Toast({ product }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in-0 duration-300">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-l-4 border-caramel p-4 max-w-sm">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm font-semibold text-blue line-clamp-1">{product.name}</p>
            <p className="text-lg font-bold text-caramel mt-1">
              Rs {product.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">✓ Added to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
