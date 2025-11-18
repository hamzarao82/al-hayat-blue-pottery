import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const coasterProducts = [
  { id: 1, name: 'Blue Coaster - Single', price: 199, discount: 50, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Coaster - Set of 4', price: 599, discount: 50, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Coaster - Set of 6', price: 799, discount: 50, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Patterned Coaster - Set of 4', price: 649, discount: 46, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Premium Coaster - Set of 6', price: 899, discount: 50, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Artisan Coaster - Set of 8', price: 1199, discount: 50, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function TeaCoastersPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Tea Coasters</h1>
        <p className="text-blue/70 mb-12">Beautiful blue pottery coasters to protect your surfaces</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coasterProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
