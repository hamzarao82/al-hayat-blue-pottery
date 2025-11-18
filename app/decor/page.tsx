'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const decorProducts = [
  { id: 1, name: 'Blue Ceramic Vase Large', price: 2199, discount: 20, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Decorative Planter Medium', price: 1599, discount: 15, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Wall Hanging Blue Art (3pc)', price: 3999, discount: 25, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Aromatic Warmer Blue', price: 899, discount: 10, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Blue Pottery Lamp Base', price: 4499, discount: 18, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Table Decoration Set', price: 1999, discount: 12, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 7, name: 'Ceramic Vase Medium', price: 1799, discount: 14, image: '/blue-pottery-tea-set.jpg' },
  { id: 8, name: 'Blue Pottery Plant Pot', price: 1299, discount: 11, image: '/blue-ceramic-plates-set.jpg' },
  { id: 9, name: 'Decorative Wall Hanging', price: 2599, discount: 17, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 10, name: 'Table Top Blue Sculpture', price: 1899, discount: 13, image: '/blue-pottery-tea-set.jpg' },
  { id: 11, name: 'Blue Pottery Candleholder Set', price: 1099, discount: 9, image: '/blue-ceramic-plates-set.jpg' },
  { id: 12, name: 'Bedroom Decor Blue Vase', price: 1599, discount: 15, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function DecorPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-blue mb-4">Decor Collection</h1>
          <p className="text-lg text-blue/70">Transform your space with our beautiful blue pottery decor pieces. Each handcrafted item brings timeless elegance and artisan quality to your home.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {decorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
