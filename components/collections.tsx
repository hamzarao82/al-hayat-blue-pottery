'use client';

const collections = [
  {
    id: 1,
    title: 'By Design',
    image: '/blue-pottery-geometric-design-plate.jpg',
  },
  {
    id: 2,
    image: '/blue-pottery-traditional-design.jpg',
  },
  {
    id: 3,
    image: '/blue-and-white-pottery-pattern.jpg',
  },
  {
    id: 4,
    image: '/modern-blue-pottery-design.jpg',
  },
  {
    id: 5,
    image: '/contemporary-blue-pottery.jpg',
  },
  {
    id: 6,
    image: '/placeholder.svg?height=400&width=300',
  },
];

export default function Collections() {
  return (
    <section className="bg-navy py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-cream mb-12">Shop by designs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 rounded-lg overflow-hidden bg-gray-300 cursor-pointer"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt="Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/50 transition duration-300 flex items-center justify-center">
                <span className="text-cream font-serif text-2xl font-bold">{item.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
