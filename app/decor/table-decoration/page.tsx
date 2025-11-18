import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const decorProducts = [
  { id: 1, name: 'Blue Table Centre - Small', price: 1299, discount: 31, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Table Centre - Medium', price: 1699, discount: 29, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Table Centre - Large', price: 2099, discount: 29, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Decorative Table Accent - Set', price: 1899, discount: 32, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Premium Table Decor - Set', price: 2299, discount: 30, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Luxury Table Arrangement', price: 2699, discount: 30, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function TableDecorationPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Table Decoration</h1>
        <p className="text-blue/70 mb-12">Elegant blue pottery decorative pieces for your table</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
