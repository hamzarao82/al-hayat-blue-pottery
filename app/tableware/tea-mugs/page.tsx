import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const mugProducts = [
  { id: 1, name: 'Blue Tea Mug - Classic', price: 499, discount: 40, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Tea Mug - Premium', price: 599, discount: 33, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Tea Mug - Deluxe', price: 799, discount: 38, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Patterned Tea Mug - Set of 2', price: 999, discount: 40, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Patterned Tea Mug - Set of 4', price: 1799, discount: 39, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Artisan Tea Mug - Premium', price: 699, discount: 36, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function TeaMugsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Tea Mugs</h1>
        <p className="text-blue/70 mb-12">Handcrafted blue pottery tea mugs for your daily enjoyment</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mugProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
