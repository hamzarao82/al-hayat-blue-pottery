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
  category: string;
}

const products: Product[] = [
  // Tableware
  {
    id: 1,
    name: 'Ceramic Tea Set',
    price: 2499,
    discount: 28,
    image: '/blue-pottery-tea-set.jpg',
    category: 'tableware'
  },
  {
    id: 2,
    name: 'Handcrafted Plates',
    price: 1299,
    discount: 31,
    image: '/blue-ceramic-plates-set.jpg',
    category: 'tableware'
  },
  {
    id: 3,
    name: 'Serving Platter',
    price: 1599,
    discount: 31,
    image: '/traditional-blue-pottery-platter.jpg',
    category: 'tableware'
  },
  {
    id: 4,
    name: 'Dinner Set',
    price: 3499,
    discount: 29,
    image: '/complete-blue-pottery-dinner-set.jpg',
    category: 'tableware'
  },
  {
    id: 5,
    name: 'Coffee Mugs',
    price: 899,
    discount: 34,
    image: '/blue-ceramic-coffee-mugs.jpg',
    category: 'tableware'
  },

  // Decor
  {
    id: 6,
    name: 'Decorative Bowls',
    price: 1899,
    discount: 32,
    image: '/blue-pottery-bowls-collection.jpg',
    category: 'decor'
  },
  {
    id: 7,
    name: 'Ceramic Vase',
    price: 1799,
    discount: 25,
    image: '/blue-pottery-tea-set.jpg',
    category: 'decor'
  },
  {
    id: 8,
    name: 'Wall Hanging',
    price: 2299,
    discount: 20,
    image: '/blue-ceramic-plates-set.jpg',
    category: 'decor'
  },
  {
    id: 9,
    name: 'Table Centerpiece',
    price: 1999,
    discount: 30,
    image: '/blue-pottery-bowls-collection.jpg',
    category: 'decor'
  },
  {
    id: 10,
    name: 'Decorative Planter',
    price: 1499,
    discount: 28,
    image: '/traditional-blue-pottery-platter.jpg',
    category: 'decor'
  },

  // New Arrivals
  {
    id: 11,
    name: 'Premium Tea Set',
    price: 3299,
    discount: 35,
    image: '/blue-ceramic-coffee-mugs.jpg',
    category: 'new'
  },
  {
    id: 12,
    name: 'Artisan Bowl Set',
    price: 2199,
    discount: 30,
    image: '/complete-blue-pottery-dinner-set.jpg',
    category: 'new'
  },
  {
    id: 13,
    name: 'Designer Plates',
    price: 1699,
    discount: 33,
    image: '/blue-pottery-tea-set.jpg',
    category: 'new'
  },
  {
    id: 14,
    name: 'Luxury Serving Set',
    price: 2899,
    discount: 27,
    image: '/blue-ceramic-plates-set.jpg',
    category: 'new'
  },
  {
    id: 15,
    name: 'Modern Vase',
    price: 1899,
    discount: 32,
    image: '/blue-pottery-bowls-collection.jpg',
    category: 'new'
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

  const categories = [
    {
      title: 'Tableware Collection',
      subtitle: 'Elegant pieces for your dining experience',
      products: products.filter(p => p.category === 'tableware')
    },
    {
      title: 'Decorative Items',
      subtitle: 'Beautiful accents for your home',
      products: products.filter(p => p.category === 'decor')
    },
    {
      title: 'New Arrivals',
      subtitle: 'Fresh designs just added',
      products: products.filter(p => p.category === 'new')
    }
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-cream to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue mb-3">
              Our Premium Collection
            </h2>
            <p className="text-base text-blue/70 max-w-2xl mx-auto">
              Handcrafted blue pottery pieces that bring elegance and tradition to your home
            </p>
          </div>

          {/* Category Rows */}
          <div className="space-y-12">
            {categories.map((category, index) => (
              <div key={index} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-blue">
                      {category.title}
                    </h3>
                    <p className="text-sm text-blue/60 mt-1">{category.subtitle}</p>
                  </div>
                  <button className="text-sm text-caramel hover:text-amber-600 font-medium transition-colors duration-200">
                    View All →
                  </button>
                </div>

                {/* Horizontal Scrolling Products */}
                <div className="relative">
                  <div className="overflow-x-auto scrollbar-hide pb-4">
                    <div className="flex gap-6 min-w-max">
                      {category.products.map((product) => (
                        <div key={product.id} className="w-72 flex-shrink-0">
                          <ProductCard
                            product={product}
                            onAddToCart={() => handleAddToCart(product)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll Gradient Indicators */}
                  <div className="absolute top-0 right-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {toastData && <Toast product={toastData} />}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
