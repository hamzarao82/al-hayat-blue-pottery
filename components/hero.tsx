"use client";

/**
 * Hero Section Component
 * Integrated with CMS for editable content
 */

import { useState, useEffect } from 'react';
import { useHeroData, useAdminMode } from '@/lib/cms';
import { EditButton, HeroEditorModal } from '@/components/admin';

// Fallback images for initial load (imported assets)
import hero1 from '@/assets/images/serving-plate.png';
import hero2 from '@/assets/images/flower-decor.png';
import hero3 from '@/assets/images/tea-pot (6).png';
import hero4 from '@/assets/images/hot-pot.png';
import hero5 from '@/assets/images/hot-karhai.png';

const fallbackImages = [hero1, hero2, hero3, hero4, hero5];

export default function Hero() {
  const { hero } = useHeroData();
  const { isAdmin, isAuthenticated } = useAdminMode();

  const [currentImg, setCurrentImg] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Get image source for a given index
  // Use CMS Base64/URL images when available, otherwise use fallback imports
  const getImageSrc = (index: number): string => {
    const cmsImage = hero.images[index];

    // If CMS image is Base64 or valid HTTP URL, use it
    if (cmsImage && (cmsImage.src.startsWith('data:') || cmsImage.src.startsWith('http'))) {
      return cmsImage.src;
    }

    // Otherwise use fallback imported images
    const fallback = fallbackImages[index];
    if (fallback) {
      return typeof fallback === 'string' ? fallback : (fallback as any).src;
    }

    return '/placeholder.svg';
  };

  const imageCount = fallbackImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % imageCount);
      }, 400);
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, [imageCount]);

  const handleDotClick = (idx: number) => {
    if (idx !== currentImg && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImg(idx);
      }, 400);
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  };

  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 px-6 lg:px-20 py-16 overflow-hidden">

        {/* Admin Edit Button */}
        {isAdmin && isAuthenticated && (
          <EditButton
            onClick={() => setIsEditorOpen(true)}
            label="Edit Hero"
            position="top-right"
            size="lg"
            className="!top-4 !right-4"
          />
        )}

        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        {/* Left Text Content */}
        <div className="lg:w-1/2 text-left relative z-10 space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-400/20 rounded-full backdrop-blur-sm border border-blue-300/30 mb-4">
            <span className="text-blue-200 text-sm font-medium tracking-wide">
              {hero.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
            {hero.title}{' '}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {hero.highlightedTitle}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-100/90 max-w-xl leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              {hero.buttonText}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Stats or features */}
          <div className="flex gap-8 pt-8">
            <div>
              <div className="text-3xl font-bold text-blue-300">{hero.stats.uniqueDesigns}</div>
              <div className="text-sm text-blue-200/70">Unique Designs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300">{hero.stats.handcrafted}</div>
              <div className="text-sm text-blue-200/70">Handcrafted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300">{hero.stats.customerMemories}</div>
              <div className="text-sm text-blue-200/70">Customer Memories</div>
            </div>
          </div>
        </div>

        {/* Right Image Container with Swap Effect */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center items-center relative">

          {/* Decorative rings */}
          <div className="absolute w-[420px] h-[420px] border-2 border-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute w-[460px] h-[460px] border border-blue-400/10 rounded-full"></div>

          {/* Main image container with perspective */}
          <div className="relative w-80 h-80 lg:w-96 lg:h-96" style={{ perspective: '1000px' }}>
            <div
              className={`w-full h-full relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-700 ${isAnimating ? 'animate-swap-out' : 'animate-swap-in'}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={getImageSrc(currentImg)}
                alt={`Blue Pottery ${currentImg + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>
          </div>

          {/* Navigation dots with improved design */}
          <div className="flex mt-8 space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            {fallbackImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-300 rounded-full ${idx === currentImg
                  ? 'w-8 h-3 bg-gradient-to-r from-blue-400 to-cyan-400'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`View image ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes swap-out {
            0% {
              transform: rotateY(0deg) scale(1);
              opacity: 1;
            }
            50% {
              transform: rotateY(90deg) scale(0.8);
              opacity: 0;
            }
            100% {
              transform: rotateY(90deg) scale(0.8);
              opacity: 0;
            }
          }

          @keyframes swap-in {
            0% {
              transform: rotateY(-90deg) scale(0.8);
              opacity: 0;
            }
            50% {
              transform: rotateY(-90deg) scale(0.8);
              opacity: 0;
            }
            100% {
              transform: rotateY(0deg) scale(1);
              opacity: 1;
            }
          }

          .animate-swap-out {
            animation: swap-out 0.8s ease-in-out;
          }

          .animate-swap-in {
            animation: swap-in 0.8s ease-in-out;
          }
        `}</style>
      </section>

      {/* Hero Editor Modal */}
      <HeroEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
}