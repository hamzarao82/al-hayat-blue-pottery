'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const searchableProducts = [
  // Tableware
  { name: 'Dinner Set Blue Classic', price: '2,499', image: '/blue-pottery-tea-set.jpg', category: 'Tableware', page: '/tableware' },
  { name: 'Serving Platter Indigo', price: '1,899', image: '/blue-ceramic-plates-set.jpg', category: 'Tableware', page: '/tableware' },
  { name: 'Ceramic Bowl Set', price: '1,299', image: '/blue-pottery-bowls-collection.jpg', category: 'Tableware', page: '/tableware' },
  { name: 'Tea Mug Blue Felicity', price: '399', image: '/blue-pottery-tea-set.jpg', category: 'Tableware', page: '/tableware' },
  { name: 'Blue Pottery Karahi', price: '1,599', image: '/blue-ceramic-plates-set.jpg', category: 'Tableware', page: '/tableware' },
  { name: 'Tea Coaster Set', price: '299', image: '/blue-pottery-bowls-collection.jpg', category: 'Tableware', page: '/tableware' },
  
  // Decor
  { name: 'Blue Ceramic Vase', price: '2,199', image: '/blue-pottery-tea-set.jpg', category: 'Decor', page: '/decor' },
  { name: 'Decorative Planter', price: '1,599', image: '/blue-ceramic-plates-set.jpg', category: 'Decor', page: '/decor' },
  { name: 'Wall Hanging Blue Art', price: '3,999', image: '/blue-pottery-bowls-collection.jpg', category: 'Decor', page: '/decor' },
  { name: 'Aromatic Warmer Blue', price: '899', image: '/blue-pottery-tea-set.jpg', category: 'Decor', page: '/decor' },
  { name: 'Blue Pottery Lamp', price: '4,499', image: '/blue-ceramic-plates-set.jpg', category: 'Decor', page: '/decor' },
  
  // Design Family
  { name: 'Blue Felicity Collection', price: '2,999', image: '/blue-pottery-tea-set.jpg', category: 'Design Family', page: '/design-family' },
  { name: 'Blue Pattern Series', price: '2,599', image: '/blue-ceramic-plates-set.jpg', category: 'Design Family', page: '/design-family' },
  { name: 'Tranquility Blue Set', price: '3,299', image: '/blue-pottery-bowls-collection.jpg', category: 'Design Family', page: '/design-family' },
];

export default function SearchDropdown({ isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<typeof searchableProducts>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchableProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue hover:text-blue/70 transition"
      >
        <Search size={isMobile ? 18 : 20} />
      </button>

      {/* Dropdown search input */}
      {isOpen && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 z-50 bg-cream border border-blue/20 rounded-lg shadow-lg w-[90vw] sm:w-80 md:w-96 max-w-sm sm:max-w-none">
          {/* Search input field */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-blue/10">
            <Search size={18} className="text-blue flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none bg-transparent text-blue placeholder:text-blue/40 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue/40 hover:text-blue transition"
              >
                <X size={18} />
              </button>
            )}
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
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-blue/5 transition cursor-pointer"
                  >
                    {/* Product image */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue/5 flex-shrink-0 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-blue truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-blue/50">
                        {product.category}
                      </p>
                    </div>

                    {/* Price */}
                    <p className="text-xs sm:text-sm font-medium text-caramel flex-shrink-0">
                      Rs {product.price}
                    </p>
                  </a>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-blue/60">No products found</p>
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-blue/40 text-sm">
                Start typing to search...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
