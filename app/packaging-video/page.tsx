'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PackagingVideoPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-blue mb-4">Our Packaging Video</h1>
          <p className="text-lg text-blue/70 mb-8">See how we carefully package your precious blue pottery items for safe delivery.</p>
        </div>

        <div className="aspect-video bg-blue/10 rounded-xl overflow-hidden mb-8">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Al Hayat Blue Pottery Packaging"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="bg-cream border border-blue/10 rounded-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-blue mb-4">Why Our Packaging Matters</h2>
          <ul className="space-y-3 text-blue/80">
            <li className="flex gap-3">
              <span className="text-caramel font-bold">•</span>
              <span>Carefully wrapped in protective materials to ensure your pottery arrives in perfect condition</span>
            </li>
            <li className="flex gap-3">
              <span className="text-caramel font-bold">•</span>
              <span>Eco-friendly packaging that reflects our commitment to sustainability</span>
            </li>
            <li className="flex gap-3">
              <span className="text-caramel font-bold">•</span>
              <span>Premium presentation box perfect for gifting to loved ones</span>
            </li>
            <li className="flex gap-3">
              <span className="text-caramel font-bold">•</span>
              <span>Safe handling and secure shipping across Pakistan</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
