'use client';

const galleryImages = [
  {
    id: 1,
    image: '/blue-pottery-plates-with-food-styling.jpg',
  },
  {
    id: 2,
    image: '/blue-pottery-dishes-collection-flat-lay.jpg',
  },
  {
    id: 3,
    image: '/traditional-blue-pottery-bowls.jpg',
  },
  {
    id: 4,
    image: '/blue-and-white-pottery-teapot-set.jpg',
  },
];

export default function Gallery() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 sm:h-80 rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt="Gallery"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
