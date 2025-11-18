import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const blueCelicoProducts = [
  { id: 1, name: 'Blue Celico Dinner Set', price: 2999, discount: 22, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Celico Serving Dish', price: 2099, discount: 24, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Celico Bowl Set', price: 2499, discount: 24, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Blue Celico Mug Set', price: 1399, discount: 29, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Blue Celico Planter', price: 1899, discount: 26, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Blue Celico Vase', price: 2199, discount: 23, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function BlueCelicoPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Blue Celico Collection</h1>
        <p className="text-blue/70 mb-12">Premium blue pottery with exquisite celico patterns</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blueCelicoProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
