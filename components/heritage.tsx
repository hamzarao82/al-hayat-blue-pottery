export default function Heritage() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
              The Heritage of <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Blue Pottery</span>
            </h2>

            <p className="text-lg text-blue-100/90 mb-6 leading-relaxed">
              Blue pottery, originating from the artisan traditions of Multan, Pakistan, is a centuries-old craft that blends Persian and South Asian influences. This exquisite art form has been perfected over generations, with master craftsmen dedicating their lives to preserving this magnificent legacy.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-caramel text-2xl font-bold flex-shrink-0">🏺</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Ancient Craftsmanship</h3>
                  <p className="text-blue-100/90">Each piece is hand-thrown and meticulously hand-painted using traditional techniques passed down through families.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-caramel text-2xl font-bold flex-shrink-0">🎨</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Artisan Excellence</h3>
                  <p className="text-blue-100/90">Our master artisans use natural cobalt-based pigments to create the signature deep blue patterns that define our collection.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-caramel text-2xl font-bold flex-shrink-0">♻️</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Sustainable Legacy</h3>
                  <p className="text-blue-100/90">We remain committed to ethical sourcing and sustainable production methods, ensuring this heritage thrives for generations to come.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96">
            <img
              src="/traditional-blue-pottery-artisan-crafting-handmade.jpg"
              alt="Blue pottery heritage"
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue/50 to-transparent rounded-xl"></div>
          </div>
        </div>

        {/* Heritage Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-cream/20">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-300 mb-2">500+</p>
            <p className="text-blue-200/70">Years of Heritage</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-300 mb-2">100%</p>
            <p className="text-blue-200/70">Handcrafted Pieces</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-300 mb-2">1000+</p>
            <p className="text-blue-200/70">Artisans Supported</p>
          </div>
        </div>
      </div>
    </section>
  );
}
