'use client';

export default function Footer() {
  return (
    <footer className="bg-blue text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4"><span className="text-caramel">Al Hayat</span> Blue Pottery</h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Premium handcrafted blue pottery from Multan, bringing tradition and elegance to your home.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#" className="hover:text-cream transition">New Arrival</a></li>
              <li><a href="#" className="hover:text-cream transition">Tableware</a></li>
              <li><a href="#" className="hover:text-cream transition">Decor</a></li>
              <li><a href="#" className="hover:text-cream transition">SALE</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#" className="hover:text-cream transition">Our Story</a></li>
              <li><a href="#" className="hover:text-cream transition">Craftsmanship</a></li>
              <li><a href="#" className="hover:text-cream transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#" className="hover:text-cream transition">Instagram</a></li>
              <li><a href="#" className="hover:text-cream transition">Facebook</a></li>
              <li><a href="#" className="hover:text-cream transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-8">
          <p className="text-center text-sm text-cream/60">
            © 2025 Al Hayat Blue Pottery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
