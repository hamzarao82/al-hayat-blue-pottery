import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

const handiProducts = [
  { id: 1, name: 'Blue Pottery Handi - Small', price: 1199, discount: 25, image: '/blue-pottery-tea-set.jpg' },
  { id: 2, name: 'Blue Pottery Handi - Medium', price: 1599, discount: 25, image: '/blue-ceramic-plates-set.jpg' },
  { id: 3, name: 'Blue Pottery Handi - Large', price: 1999, discount: 25, image: '/blue-pottery-bowls-collection.jpg' },
  { id: 4, name: 'Decorative Handi with Lid - Small', price: 1399, discount: 29, image: '/blue-pottery-tea-set.jpg' },
  { id: 5, name: 'Decorative Handi with Lid - Medium', price: 1699, discount: 24, image: '/blue-ceramic-plates-set.jpg' },
  { id: 6, name: 'Decorative Handi with Lid - Large', price: 2099, discount: 24, image: '/blue-pottery-bowls-collection.jpg' },
];

export default function HandlesCoverPotsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-blue mb-2">Handles & Cover Pots</h1>
        <p className="text-blue/70 mb-12">Beautiful blue pottery pots with handles and decorative lids</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {handiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
