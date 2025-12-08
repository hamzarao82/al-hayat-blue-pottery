'use client';

/**
 * Gallery/Memories Section Component
 * Integrated with CMS for editable content
 */

import Image from 'next/image';
import { useState } from 'react';
import { useGalleryData, useAdminMode } from '@/lib/cms';
import { EditButton, GalleryEditorModal } from '@/components/admin';

// Fallback images (imported assets)
import Img from '@/assets/images/memories (3).png';
import Img2 from '@/assets/images/memories (4).png';
import Img3 from '@/assets/images/memories (5).png';
import Img4 from '@/assets/images/memories (6).png';
import Img5 from '@/assets/images/memories (7).png';
import Img6 from '@/assets/images/memories (8).png';

const fallbackImages = [Img, Img2, Img3, Img4, Img5, Img6];

export default function Gallery() {
  const { gallery } = useGalleryData();
  const { isAdmin, isAuthenticated } = useAdminMode();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Get image source - use CMS Base64/URL or fallback
  const getImageForIndex = (index: number) => {
    const cmsImage = gallery.images[index];

    // If CMS image is Base64 or valid HTTP URL, return it as string for <img>
    if (cmsImage && (cmsImage.image.startsWith('data:') || cmsImage.image.startsWith('http'))) {
      return { type: 'url' as const, src: cmsImage.image, alt: cmsImage.alt || 'Gallery' };
    }

    // Otherwise use fallback imported image for Next.js Image
    return { type: 'import' as const, src: fallbackImages[index], alt: 'Gallery' };
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 py-16 sm:py-24">

        {/* Admin Edit Button */}
        {isAdmin && isAuthenticated && (
          <EditButton
            onClick={() => setIsEditorOpen(true)}
            label="Edit Memories"
            position="top-right"
            size="lg"
            className="!top-4 !right-4"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {gallery.title}
            </h2>
            <p className="text-lg text-blue-100/90 max-w-2xl mx-auto">
              {gallery.subtitle}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">

            {/* Top Row - 3 images */}
            {[0, 1, 2].map((index) => {
              const imageData = getImageForIndex(index);
              return (
                <div
                  key={index}
                  className="group relative h-40 md:h-48 rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {imageData.type === 'url' ? (
                    <img
                      src={imageData.src}
                      alt={imageData.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={imageData.src || "/placeholder.svg"}
                      alt={imageData.alt}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />
                </div>
              );
            })}

            {/* Bottom Row - 3 images */}
            {[3, 4, 5].map((index) => {
              const imageData = getImageForIndex(index);
              return (
                <div
                  key={index}
                  className="group relative h-40 md:h-52 rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {imageData.type === 'url' ? (
                    <img
                      src={imageData.src}
                      alt={imageData.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={imageData.src || "/placeholder.svg"}
                      alt={imageData.alt}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Editor Modal */}
      <GalleryEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
}