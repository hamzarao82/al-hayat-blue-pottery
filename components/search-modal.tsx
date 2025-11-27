'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import QuickViewModal from './quick-view-modal';

const searchableProducts = [
  // Tableware
  { id: 1, name: 'Dinner Set Blue Classic', price: 2499, discount: 28, image: '/blue-pottery-tea-set.jpg', images: ['/blue-pottery-tea-set.jpg', '/blue-ceramic-plates-set.jpg', '/blue-pottery-bowls-collection.jpg'], category: 'Tableware', subcategory: 'Dinner Sets', rating: 4.8, reviews: 156, description: 'Exquisite handcrafted blue pottery dinner set from the artisans of Multan.' },
  { id: 2, name: 'Serving Platter Indigo', price: 1899, discount: 20, image: '/blue-ceramic-plates-set.jpg', images: ['/blue-ceramic-plates-set.jpg', '/blue-pottery-tea-set.jpg'], category: 'Tableware', subcategory: 'Serving Dishes', rating: 4.6, reviews: 89, description: 'Beautiful serving platter with traditional indigo patterns.' },
  { id: 3, name: 'Ceramic Bowl Set', price: 1299, discount: 15, image: '/blue-pottery-bowls-collection.jpg', images: ['/blue-pottery-bowls-collection.jpg', '/blue-pottery-tea-set.jpg'], category: 'Tableware', subcategory: 'Bowls', rating: 4.7, reviews: 124, description: 'Set of handcrafted ceramic bowls perfect for serving.' },
  { id: 4, name: 'Tea Mug Blue Felicity', price: 399, discount: 10, image: '/blue-pottery-tea-set.jpg', images: ['/blue-pottery-tea-set.jpg'], category: 'Tableware', subcategory: 'Tea Mugs', rating: 4.5, reviews: 67, description: 'Elegant tea mug with blue felicity design.' },
  { id: 5, name: 'Blue Pottery Karahi', price: 1599, discount: 18, image: '/blue-ceramic-plates-set.jpg', images: ['/blue-ceramic-plates-set.jpg'], category: 'Tableware', subcategory: 'Karahi', rating: 4.9, reviews: 201, description: 'Traditional blue pottery karahi for authentic cooking.' },
  { id: 6, name: 'Tea Coaster Set', price: 299, discount: 5, image: '/blue-pottery-bowls-collection.jpg', images: ['/blue-pottery-bowls-collection.jpg'], category: 'Tableware', subcategory: 'Tea Coasters', rating: 4.4, reviews: 45, description: 'Set of 6 decorative tea coasters.' },

  // Decor
  { id: 7, name: 'Blue Ceramic Vase', price: 2199, discount: 25, image: '/blue-pottery-tea-set.jpg', images: ['/blue-pottery-tea-set.jpg', '/blue-ceramic-plates-set.jpg'], category: 'Decor', subcategory: 'Vases', rating: 4.8, reviews: 178, description: 'Stunning ceramic vase with intricate blue patterns.' },
  { id: 8, name: 'Decorative Planter', price: 1599, discount: 15, image: '/blue-ceramic-plates-set.jpg', images: ['/blue-ceramic-plates-set.jpg'], category: 'Decor', subcategory: 'Planters', rating: 4.6, reviews: 92, description: 'Beautiful planter for your indoor plants.' },
  { id: 9, name: 'Wall Hanging Blue Art', price: 3999, discount: 30, image: '/blue-pottery-bowls-collection.jpg', images: ['/blue-pottery-bowls-collection.jpg', '/blue-pottery-tea-set.jpg'], category: 'Decor', subcategory: 'Wall Hangings', rating: 4.9, reviews: 234, description: 'Exquisite wall art piece showcasing traditional craftsmanship.' },
  { id: 10, name: 'Aromatic Warmer Blue', price: 899, discount: 12, image: '/blue-pottery-tea-set.jpg', images: ['/blue-pottery-tea-set.jpg'], category: 'Decor', subcategory: 'Aromatic Warmers', rating: 4.5, reviews: 78, description: 'Aromatic oil warmer with beautiful blue design.' },
  { id: 11, name: 'Blue Pottery Lamp', price: 4499, discount: 22, image: '/blue-ceramic-plates-set.jpg', images: ['/blue-ceramic-plates-set.jpg', '/blue-pottery-bowls-collection.jpg'], category: 'Decor', subcategory: 'Lamps', rating: 4.8, reviews: 156, description: 'Handcrafted pottery lamp with traditional patterns.' },

  // Design Family
  { id: 12, name: 'Blue Felicity Collection', price: 2999, discount: 20, image: '/blue-pottery-tea-set.jpg', images: ['/blue-pottery-tea-set.jpg', '/blue-ceramic-plates-set.jpg'], category: 'Design Family', subcategory: 'Blue Felicity', rating: 4.7, reviews: 189, description: 'Complete collection from the Blue Felicity design family.' },
  { id: 13, name: 'Blue Pattern Series', price: 2599, discount: 18, image: '/blue-ceramic-plates-set.jpg', images: ['/blue-ceramic-plates-set.jpg'], category: 'Design Family', subcategory: 'Blue Pattern', rating: 4.6, reviews: 134, description: 'Elegant pieces from the Blue Pattern series.' },
  { id: 14, name: 'Tranquility Blue Set', price: 3299, discount: 25, image: '/blue-pottery-bowls-collection.jpg', images: ['/blue-pottery-bowls-collection.jpg', '/blue-pottery-tea-set.jpg'], category: 'Design Family', subcategory: 'Tranquility', rating: 4.9, reviews: 267, description: 'Serene collection from the Tranquility design family.' },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof searchableProducts[0] | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchableProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleProductClick = (product: typeof searchableProducts[0]) => {
    setSelectedProduct(product);
    setShowQuickView(true);
    setIsOpen(false);
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', selectedProduct);
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue hover:text-blue/70 transition"
      >
        <Search size={20} />
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Search modal */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 max-w-2xl mx-auto mt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Search input */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
              <Search size={20} className="text-blue-600" />
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 outline-none bg-transparent text-gray-900 placeholder:text-gray-400 text-lg"
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search results */}
            <div className="max-h-96 overflow-y-auto">
              {searchQuery.trim() && filteredProducts.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-blue-50 transition cursor-pointer text-left"
                    >
                      {/* Product image */}
                      <div className="relative w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                            {product.discount}%
                          </div>
                        )}
                      </div>

                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-blue-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {product.category} • {product.subcategory}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-orange-600">
                            Rs {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-xs text-gray-400 line-through">
                              Rs {product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick View indicator */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-blue-600 font-medium">
                          Quick View →
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500">No products found</p>
                  <p className="text-sm text-gray-400 mt-2">Try searching with different keywords</p>
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-400 text-sm">
                  Start typing to search products...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          isOpen={showQuickView}
          onClose={() => {
            setShowQuickView(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
