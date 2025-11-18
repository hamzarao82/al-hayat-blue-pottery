import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const springPatternProducts = [
  { id: 1, name: 'Spring Pattern Dinner Set', price: 2899, discount: 22, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Spring Pattern Serving Dish', price: 1999, discount: 23, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Spring Pattern Bowl Set', price: 2399, discount: 23, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Spring Pattern Mug Set', price: 1349, discount: 30, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Spring Pattern Planter', price: 1849, discount: 27, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Spring Pattern Vase', price: 2149, discount: 23, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function SpringPatternPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Spring Pattern Collection</h1>
        <p className="text-blue/70 mb-12">Beautiful blue pottery with fresh spring patterns</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {springPatternProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
