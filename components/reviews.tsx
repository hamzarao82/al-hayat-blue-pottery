'use client';

import { Star, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  product: string;
  image: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Fatima Khan',
    rating: 5,
    text: 'Absolutely beautiful pottery! The quality is exceptional and it arrived perfectly packaged. I have already recommended Arraish to all my friends.',
    product: 'Ceramic Tea Set',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    rating: 5,
    text: 'The attention to detail in these pieces is incredible. Each item feels handcrafted with love. My dinner set has become the talk of the town!',
    product: 'Dinner Set',
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 3,
    name: 'Ayesha Malik',
    rating: 5,
    text: 'Love the traditional designs combined with modern functionality. The serving platters are perfect for entertaining. Delivery was quick and elegant.',
    product: 'Serving Platter',
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 4,
    name: 'Hassan Ali',
    rating: 5,
    text: 'As someone who values authentic craftsmanship, I am truly impressed. Every piece tells a story of the artisans behind it. Worth every penny!',
    product: 'Decorative Bowls',
    image: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 5,
    name: 'Zainab Ahmed',
    rating: 5,
    text: 'The craftsmanship is outstanding! These pieces add such elegance to my home. Customer service was also excellent.',
    product: 'Vase Collection',
    image: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 6,
    name: 'Omar Farooq',
    rating: 4,
    text: 'Beautiful work and great quality. Slightly expensive but worth it for the artisanal touch. Would buy again!',
    product: 'Coffee Mugs',
    image: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 7,
    name: 'Sana Butt',
    rating: 5,
    text: 'Each piece is a work of art. I love supporting local artisans and Al Hayat Blue Pottery makes it so easy. Absolutely love my purchase!',
    product: 'Fruit Bowl',
    image: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: 8,
    name: 'Bilal Raza',
    rating: 5,
    text: 'The quality exceeded my expectations. Perfect gift for my mother and she absolutely loved it. Will order more soon!',
    product: 'Decorative Plates',
    image: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 9,
    name: 'Maryam Siddiqui',
    rating: 5,
    text: 'Simply stunning! The colors and designs are so vibrant. These pieces brighten up my entire dining room.',
    product: 'Table Set',
    image: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 10,
    name: 'Kamran Shah',
    rating: 5,
    text: 'Exceptional craftsmanship and attention to detail. The packaging was superb and delivery was prompt. Highly recommended!',
    product: 'Kitchen Canisters',
    image: 'https://i.pravatar.cc/150?img=33',
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: '',
    product: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.product || !formData.text) {
      alert('Please fill in all fields');
      return;
    }

    const newReview: Review = {
      id: reviews.length + 1,
      ...formData,
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    };
    setReviews([...reviews, newReview]);
    setIsModalOpen(false);
    setFormData({ name: '', rating: 5, text: '', product: '' });
  };

  // Create enough duplicates for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-blue-900 mb-4">
              Customer Reviews
            </h2>
            <p className="text-lg text-blue-700/70 max-w-2xl">
              Hear from our delighted customers about their experience with Al Hayat Blue Pottery
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 px-6 py-3 rounded-lg hover:bg-orange-700 transition shadow-md"
          >
            <Plus size={20} />
            Add Review
          </button>
        </div>

        <div className="relative">
          <div className="flex gap-6 animate-scroll-seamless">
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="bg-cream rounded-xl p-6 shadow-md flex-shrink-0 w-[400px]"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'fill-orange-600 text-orange-600' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <img
                    src={review.image || "/api/placeholder/40/40"}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-blue-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-600">{review.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-serif font-bold text-blue-900 mb-6">
              Share Your Experience
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Purchased
                </label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                    >
                      <Star
                        size={24}
                        className={star <= formData.rating ? 'fill-orange-600 text-orange-600' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 4));
          }
        }
        
        .animate-scroll-seamless {
          animation: scroll-seamless 80s linear infinite;
          width: max-content;
        }
        
        .animate-scroll-seamless:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}