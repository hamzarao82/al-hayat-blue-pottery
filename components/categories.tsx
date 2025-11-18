'use client';

const categories = [
  {
    id: 1,
    title: 'Blue Pottery Tea Sets',
    image: '/blue-pottery-tea-set-with-teapot-and-cups.jpg',
  },
  {
    id: 2,
    title: 'Bowls',
    image: '/ceramic-blue-bowls-with-patterns.jpg',
  },
  {
    id: 3,
    title: 'Ceramic Blue Pottery Karahi',
    image: '/blue-ceramic-cooking-pot-karahi.jpg',
  },
  {
    id: 4,
    title: 'Serving Dishes',
    image: '/serving-platters-blue-pottery.jpg',
  },
  {
    id: 5,
    title: 'Plates And Platters',
    image: '/decorative-blue-pottery-plates.jpg',
  },
  {
    id: 6,
    title: 'Table Decoration',
    image: '/decorative-blue-pottery-vase.jpg',
  },
];

export default function Categories() {
  return (
    <section className="bg-navy py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-cream mb-12">Shop our top categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-cream rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-navy font-serif text-lg font-semibold group-hover:text-navy/70 transition">
                  {category.title}
                </h3>
                <span className="text-navy/60 text-sm mt-2 inline-block group-hover:text-navy transition">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
