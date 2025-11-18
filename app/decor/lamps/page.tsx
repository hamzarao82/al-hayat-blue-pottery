import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const lampProducts = [
  { id: 1, name: 'Blue Pottery Table Lamp - Small', price: 1899, discount: 32, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Pottery Table Lamp - Medium', price: 2299, discount: 30, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Pottery Table Lamp - Large', price: 2799, discount: 29, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Decorative Pendant Lamp', price: 2599, discount: 31, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Premium Floor Lamp', price: 3299, discount: 30, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Luxury Accent Lamp Set', price: 3999, discount: 30, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function LampsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Lamps</h1>
        <p className="text-blue/70 mb-12">Beautiful blue pottery lamps for ambient lighting</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lampProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
