import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const blueFlowerProducts = [
  { id: 1, name: 'Blue Flower Dinner Set', price: 2799, discount: 21, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Flower Serving Dish', price: 1999, discount: 25, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Flower Bowl Set', price: 2299, discount: 22, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Blue Flower Mug Set', price: 1299, discount: 31, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Blue Flower Planter', price: 1799, discount: 28, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Blue Flower Vase', price: 2099, discount: 24, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function BlueFlowerPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Blue Flower Collection</h1>
        <p className="text-blue/70 mb-12">Exquisite blue pottery collection with beautiful flower patterns</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blueFlowerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
