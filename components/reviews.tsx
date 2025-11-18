'use client';

import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  product: string;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Fatima Khan',
    rating: 5,
    text: 'Absolutely beautiful pottery! The quality is exceptional and it arrived perfectly packaged. I have already recommended Arraish to all my friends. Highly satisfied with my purchase!',
    product: 'Ceramic Tea Set',
    image: '/portrait-woman-smiling.jpg',
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    rating: 5,
    text: 'The attention to detail in these pieces is incredible. Each item feels handcrafted with love. My dinner set has become the talk of the town whenever we have guests over!',
    product: 'Dinner Set',
    image: '/portrait-man-smiling.jpg',
  },
  {
    id: 3,
    name: 'Ayesha Malik',
    rating: 4.5,
    text: 'Love the traditional designs combined with modern functionality. The serving platters are perfect for entertaining. Delivery was quick and the packaging was elegant.',
    product: 'Serving Platter',
    image: '/portrait-woman.png',
  },
  {
    id: 4,
    name: 'Hassan Ali',
    rating: 5,
    text: 'As someone who values authentic craftsmanship, I am truly impressed. Every piece tells a story of the artisans behind it. Worth every penny!',
    product: 'Decorative Bowls',
    image: '/thoughtful-man.png',
  },
];

export default function Reviews() {
  return (
    <section className="bg-gradient-to-b from-cream to-caramel/5 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-blue mb-4">
            Customer Reviews
          </h2>
          <p className="text-lg text-blue/70 max-w-2xl mx-auto">
            Hear from our delighted customers about their experience with Arraish pottery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(review.rating) ? 'fill-caramel text-caramel' : 'text-gray-300'}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed text-balance">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <img
                  src={review.image || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-blue">{review.name}</p>
                  <p className="text-sm text-gray-600">Purchased: {review.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
