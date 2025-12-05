'use client';

/**
 * Heritage Section Component
 * Integrated with CMS for editable content
 */

import { useState } from 'react';
import { useCMS, useAdminMode } from '@/lib/cms';
import { EditButton, HeritageEditorModal } from '@/components/admin';

export default function Heritage() {
  const { data } = useCMS();
  const heritage = data.heritage;
  const { isAdmin, isAuthenticated } = useAdminMode();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Check if image is valid
  const isValidImageSrc = (src: string): boolean => {
    return Boolean(src && (src.startsWith('data:') || src.startsWith('http')));
  };

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-cream py-16 sm:py-24 relative">

        {/* Admin Edit Button */}
        {isAdmin && isAuthenticated && (
          <EditButton
            onClick={() => setIsEditorOpen(true)}
            label="Edit Heritage"
            position="top-right"
            size="lg"
            className="!top-4 !right-4"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
                {heritage.title} <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">{heritage.subtitle}</span>
              </h2>

              <p className="text-lg text-blue-100/90 mb-6 leading-relaxed">
                {heritage.description}
              </p>

              <div className="space-y-4">
                {heritage.features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-caramel text-2xl font-bold flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-blue-100/90">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96">
              <img
                src={isValidImageSrc(heritage.image) ? heritage.image : "/traditional-blue-pottery-artisan-crafting-handmade.jpg"}
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

      {/* Heritage Editor Modal */}
      <HeritageEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
}
