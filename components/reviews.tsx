'use client';

/**
 * Reviews Section Component
 * Integrated with CMS for editable content
 */

import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useReviewsData, useAdminMode } from '@/lib/cms';
import { EditButton, ReviewsEditorModal } from '@/components/admin';

export default function Reviews() {
  const { reviewsContent } = useReviewsData();
  const { isAdmin, isAuthenticated } = useAdminMode();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Create enough duplicates for seamless infinite scroll
  const duplicatedReviews = [...reviewsContent.reviews, ...reviewsContent.reviews, ...reviewsContent.reviews, ...reviewsContent.reviews];

  return (
    <>
      <section className="bg-white py-16 sm:py-24 overflow-hidden relative">

        {/* Admin Edit Button */}
        {isAdmin && isAuthenticated && (
          <EditButton
            onClick={() => setIsEditorOpen(true)}
            label="Edit Reviews"
            position="top-right"
            size="lg"
            className="!top-4 !right-4"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-12">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
                {reviewsContent.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-xl">
                {reviewsContent.subtitle}
              </p>
            </div>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative">
            {/* Single Row Infinite Scroll */}
            <div className="overflow-hidden">
              <div className="flex gap-6 animate-scroll-seamless hover:pause-animation">
                {duplicatedReviews.map((review, idx) => (
                  <div
                    key={`${review.id}-${idx}`}
                    className="flex-shrink-0 w-80 sm:w-96 bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {/* User Info Row */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          review.name.charAt(0).toUpperCase()
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 font-semibold truncate">{review.name}</h4>
                        <p className="text-gray-500 text-sm truncate">{review.location}</p>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-seamless {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-25%);
            }
          }

          .animate-scroll-seamless {
            animation: scroll-seamless 60s linear infinite;
            width: max-content;
          }

          .animate-scroll-seamless:hover {
            animation-play-state: paused;
          }

          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </section>

      {/* Reviews Editor Modal */}
      <ReviewsEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
}