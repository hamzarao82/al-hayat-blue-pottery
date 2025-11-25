'use client';
import Img from '@/assets/images/memories (3).png';
import Img2 from '@/assets/images/memories (4).png';
import Img3 from '@/assets/images/memories (5).png';
import Img4 from '@/assets/images/memories (6).png';
import Img5 from '@/assets/images/memories (7).png';
import Img6 from '@/assets/images/memories (8).png';
import Image from 'next/image';

const importedImagesMap: Record<number, any> = {
  1: Img,
  2: Img2,
  3: Img3,
  4: Img4,
  5: Img5,
  6: Img6,
};
const galleryImages = [
  {
    id: 1,
    image: importedImagesMap[1],
  },
  {
    id: 2,
    image: importedImagesMap[2],
  },
  {
    id: 3,
    image: importedImagesMap[3],
  },
  {
    id: 4,
    image: importedImagesMap[4],
  },
  {
    id: 5,
    image: importedImagesMap[5],
  },
  {
    id: 6,
    image: importedImagesMap[6],
  },
];

export default function Gallery() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Customer Memories
          </h2>
          <p className="text-lg text-blue-100/90 max-w-2xl mx-auto">
            Our beloved Customer have shared their memories with us, we are grateful for their support and love.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">

          {/* Top Row - 3 equal images */}
          {galleryImages.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="group relative h-40 md:h-48 rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.image || "/api/placeholder/400/300"}
                alt="Gallery"
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />
            </div>
          ))}

          {/* Bottom Row - 3 equal images */}
          {galleryImages.slice(3, 6).map((item) => (
            <div
              key={item.id}
              className="group relative h-40 md:h-52 rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.image || "/api/placeholder/500/350"}
                alt="Gallery"
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}