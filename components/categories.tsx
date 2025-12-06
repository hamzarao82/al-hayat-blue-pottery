'use client';

/**
 * Categories Section Component
 * Integrated with CMS for editable content
 */

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCategoriesData, useAdminMode } from '@/lib/cms';
import { EditButton, CategoriesEditorModal } from '@/components/admin';

// Fallback images
import Img1 from '@/assets/images/tea-set.png';
import Img2 from '@/assets/images/jar-cups.png';
import Img3 from '@/assets/images/Serving-dish.png'
import Img4 from '@/assets/images/table-decor.png';
import Img5 from '@/assets/images/karhai.png';
import Img6 from '@/assets/images/blue-karhai.png';
import Img7 from '@/assets/images/dinner-set.png';

const fallbackImages = [Img1, Img7, Img6, Img3, null, Img4, Img5, Img2];

export default function Categories() {
  const { categoriesContent } = useCategoriesData();
  const { isAdmin, isAuthenticated } = useAdminMode();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Get image source - use CMS Base64/URL or fallback
  const getImageSrc = (index: number, cmsImage: string): string => {
    // If CMS image is Base64 or valid HTTP URL, use it
    if (cmsImage && (cmsImage.startsWith('data:') || cmsImage.startsWith('http'))) {
      return cmsImage;
    }

    // Otherwise use fallback
    const fallback = fallbackImages[index];
    if (fallback) {
      return typeof fallback === 'string' ? fallback : (fallback as any).src;
    }

    return '/placeholder.svg';
  };

  return (
    <>
      <section className="bg-white py-16 sm:py-20 relative overflow-hidden">

        {/* Admin Edit Button */}
        {isAdmin && isAuthenticated && (
          <EditButton
            onClick={() => setIsEditorOpen(true)}
            label="Edit Categories"
            position="top-right"
            size="lg"
            className="!top-4 !right-4"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
              {categoriesContent.title} <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{categoriesContent.highlightedTitle}</span>
            </h2>
            <p className="text-blue-800/70 text-lg max-w-2xl mx-auto">
              {categoriesContent.subtitle}
            </p>
          </div>

          {/* Enhanced Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesContent.categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-blue-200/50 hover:border-blue-400 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container with Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getImageSrc(index, category.image)}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                  {/* Decorative Corner Element */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/80 rounded-full backdrop-blur-sm bg-blue-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-90">
                    <ArrowRight size={20} className="text-white" />
                  </div>

                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 relative">
                  <h3 className="text-blue-900 font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-600/70 text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">
                      Explore Collection
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-blue-600 group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom Border Animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-500"></div>
                </div>

                {/* Card Number Badge */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-200">
                  <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .group {
            animation: fade-in-up 0.6s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </section>

      {/* Categories Editor Modal */}
      <CategoriesEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
}