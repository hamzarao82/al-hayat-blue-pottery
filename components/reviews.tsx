'use client';

/**
 * Reviews Section Component
 * Integrated with CMS for editable content
 * Includes public "Add Review" button for customers
 */

import { Star, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useReviewsData, useAdminMode } from '@/lib/cms';
import { EditButton, ReviewsEditorModal } from '@/components/admin';

export default function Reviews() {
  const { reviewsContent, addReview } = useReviewsData();
  const { isAdmin, isAuthenticated } = useAdminMode();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Public add review modal
  const [isPublicModalOpen, setIsPublicModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    text: '',
  });

  const handlePublicSubmit = () => {
    if (!formData.name || !formData.text) {
      alert('Please fill in your name and review');
      return;
    }

    addReview({
      name: formData.name,
      location: formData.location || 'Customer',
      rating: formData.rating,
      text: formData.text,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    });
    setIsPublicModalOpen(false);
    setFormData({ name: '', location: '', rating: 5, text: '' });
  };

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
              <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-2">
                {reviewsContent.title}
              </h2>
              <p className="text-blue-800/70 text-lg max-w-xl">
                {reviewsContent.subtitle}
              </p>
            </div>

            {/* Public Add Review Button */}
            <button
              onClick={() => setIsPublicModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Review</span>
            </button>
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

      {/* Admin Reviews Editor Modal */}
      <ReviewsEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* Public Add Review Modal */}
      {isPublicModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPublicModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Star size={24} />
                Add Your Review
              </h2>
              <button
                onClick={() => setIsPublicModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Sarah Ahmed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Lahore, Pakistan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        size={28}
                        className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Share your experience with our products..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsPublicModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublicSubmit}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}