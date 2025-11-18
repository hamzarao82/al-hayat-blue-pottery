'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

const searchableProducts = [
  // Tableware
  { name: 'Dinner Set Blue Classic', price: '2,499', image: '/blue-pottery-tea-set.jpg', category: 'Tableware', subcategory: 'Dinner Sets', page: '/tableware' },
  { name: 'Serving Platter Indigo', price: '1,899', image: '/blue-ceramic-plates-set.jpg', category: 'Tableware', subcategory: 'Serving Dishes', page: '/tableware' },
  { name: 'Ceramic Bowl Set', price: '1,299', image: '/blue-pottery-bowls-collection.jpg', category: 'Tableware', subcategory: 'Bowls', page: '/tableware' },
  { name: 'Tea Mug Blue Felicity', price: '399', image: '/blue-pottery-tea-set.jpg', category: 'Tableware', subcategory: 'Tea Mugs', page: '/tableware' },
  { name: 'Blue Pottery Karahi', price: '1,599', image: '/blue-ceramic-plates-set.jpg', category: 'Tableware', subcategory: 'Karahi', page: '/tableware' },
  { name: 'Tea Coaster Set', price: '299', image: '/blue-pottery-bowls-collection.jpg', category: 'Tableware', subcategory: 'Tea Coasters', page: '/tableware' },
  
  // Decor
  { name: 'Blue Ceramic Vase', price: '2,199', image: '/blue-pottery-tea-set.jpg', category: 'Decor', subcategory: 'Vases', page: '/decor' },
  { name: 'Decorative Planter', price: '1,599', image: '/blue-ceramic-plates-set.jpg', category: 'Decor', subcategory: 'Planters', page: '/decor' },
  { name: 'Wall Hanging Blue Art', price: '3,999', image: '/blue-pottery-bowls-collection.jpg', category: 'Decor', subcategory: 'Wall Hangings', page: '/decor' },
  { name: 'Aromatic Warmer Blue', price: '899', image: '/blue-pottery-tea-set.jpg', category: 'Decor', subcategory: 'Aromatic Warmers', page: '/decor' },
  { name: 'Blue Pottery Lamp', price: '4,499', image: '/blue-ceramic-plates-set.jpg', category: 'Decor', subcategory: 'Lamps', page: '/decor' },
  
  // Design Family
  { name: 'Blue Felicity Collection', price: '2,999', image: '/blue-pottery-tea-set.jpg', category: 'Design Family', subcategory: 'Blue Felicity', page: '/design-family' },
  { name: 'Blue Pattern Series', price: '2,599', image: '/blue-ceramic-plates-set.jpg', category: 'Design Family', subcategory: 'Blue Pattern', page: '/design-family' },
  { name: 'Tranquility Blue Set', price: '3,299', image: '/blue-pottery-bowls-collection.jpg', category: 'Design Family', subcategory: 'Tranquility', page: '/design-family' },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchableProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
          <div className="bg-cream rounded-xl shadow-2xl overflow-hidden">
            {/* Search input */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-blue/10">
              <Search size={20} className="text-blue" />
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 outline-none bg-transparent text-blue placeholder:text-blue/40 text-lg"
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="text-blue/40 hover:text-blue transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search results */}
            <div className="max-h-96 overflow-y-auto">
              {searchQuery.trim() && filteredProducts.length > 0 ? (
                <div className="divide-y divide-blue/10">
                  {filteredProducts.map((product, idx) => (
                    <a
                      key={idx}
                      href={product.page}
                      onClick={() => {
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-4 p-4 hover:bg-blue/5 transition cursor-pointer"
                    >
                      {/* Product image */}
                      <div className="w-16 h-16 rounded-lg bg-blue/5 flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-blue truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-blue/60 mt-1">
                          {product.category} • {product.subcategory}
                        </p>
                      </div>

                      {/* Price and page link */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-caramel">
                          Rs {product.price}
                        </p>
                        <p className="text-xs text-blue/40 mt-1">
                          View
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-blue/60">No products found</p>
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-blue/40 text-sm">
                  Start typing to search...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
