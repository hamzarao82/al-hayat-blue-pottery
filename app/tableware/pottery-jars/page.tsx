import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const jarProducts = [
  { id: 1, name: 'Blue Storage Jar - Small', price: 999, discount: 30, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Storage Jar - Medium', price: 1399, discount: 29, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Storage Jar - Large', price: 1799, discount: 28, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Decorative Blue Jar - Small', price: 1199, discount: 33, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Decorative Blue Jar - Medium', price: 1499, discount: 27, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Decorative Blue Jar - Large', price: 1899, discount: 26, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function PotteryJarsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Pottery Jars</h1>
        <p className="text-blue/70 mb-12">Storage and decorative blue pottery jars for your home</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
