'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen md:h-screen overflow-hidden" id="products">
      {/* Blue pottery background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/placeholder.svg?height=1080&width=1920&query=traditional blue pottery multan background texture)',
        }}
      />
      
      <div className="absolute inset-0 bg-blue/30" />

      {/* Content */}
      <div className="relative w-full min-h-screen md:h-screen flex items-center justify-start">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto sm:mx-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-cream mb-4 sm:mb-6 leading-tight text-balance">
              Blue Pottery of Multan: A Timeless Heritage for Modern Homes
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cream/90 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              Made for Everyday Use. Crafted with Care. Experience Authentic Blue Pottery Crockery
            </p>
            <Link href="/#products">
              <button className="bg-caramel text-white px-6 sm:px-8 py-3 sm:py-4 font-medium hover:bg-caramel/90 transition rounded-lg shadow-lg text-sm sm:text-base">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
