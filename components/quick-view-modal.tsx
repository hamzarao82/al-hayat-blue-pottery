'use client';

import { X, ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Star, Truck, Shield, Package, Link2, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

interface Product {
    id: number;
    name: string;
    price: number;
    discount: number;
    image: string;
    images?: string[];
    description?: string;
    rating?: number;
    reviews?: number;
}

interface QuickViewModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart?: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) {
    const [mounted, setMounted] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const discountedPrice = Math.round(product.price * (1 - product.discount / 100));
    const images = product.images || [product.image, product.image, product.image];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart();
        }
    };

    const productUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/${product.id}` : '';
    const shareText = `Check out ${product.name} - Rs ${discountedPrice.toLocaleString()}!`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(productUrl);
        alert('Link copied to clipboard!');
        setShowShareMenu(false);
    };

    const handleShareWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`;
        window.open(url, '_blank');
        setShowShareMenu(false);
    };

    const handleShareFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    const handleShareInstagram = () => {
        alert('To share on Instagram, please take a screenshot and post it to your story or feed!');
        setShowShareMenu(false);
    };

    const handleShareTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    const handleShareLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    const handleSharePinterest = () => {
        const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    const handleShareEmail = () => {
        const subject = encodeURIComponent(product.name);
        const body = encodeURIComponent(`${shareText}\n\n${productUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        setShowShareMenu(false);
    };

    if (!isOpen || !mounted) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fadeIn"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    >
                        <X size={24} className="text-gray-700" />
                    </button>

                    <div className="grid md:grid-cols-2 gap-8 p-8 overflow-y-auto max-h-[90vh]">
                        {/* Left: Image Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Discount Badge */}
                                {product.discount > 0 && (
                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                                        <span className="text-sm font-bold">{product.discount}% OFF</span>
                                    </div>
                                )}

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${idx === currentImageIndex
                                                ? 'border-blue-600 scale-105'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Product Details */}
                        <div className="flex flex-col space-y-6">
                            {/* Product Name */}
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-blue-900 mb-2">
                                    {product.name}
                                </h2>

                                {/* Rating */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={i < (product.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {product.rating || 4.5} ({product.reviews || 128} reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-orange-600">
                                    Rs {discountedPrice.toLocaleString()}
                                </span>
                                <span className="text-xl text-gray-400 line-through">
                                    Rs {product.price.toLocaleString()}
                                </span>
                                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    Save Rs {(product.price - discountedPrice).toLocaleString()}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {product.description || 'Handcrafted blue pottery piece from Multan, featuring traditional designs and premium quality craftsmanship. Each piece is unique and made with care by skilled artisans.'}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-3 bg-blue-50 rounded-xl">
                                    <Truck className="text-blue-600 mb-2" size={24} />
                                    <span className="text-xs font-medium text-blue-900 text-center">Free Shipping</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-green-50 rounded-xl">
                                    <Shield className="text-green-600 mb-2" size={24} />
                                    <span className="text-xs font-medium text-green-900 text-center">Safe Delivery</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-purple-50 rounded-xl">
                                    <Package className="text-purple-600 mb-2" size={24} />
                                    <span className="text-xs font-medium text-purple-900 text-center">Premium Pack</span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center font-bold text-lg text-gray-900">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        Total: <span className="font-bold text-blue-900">Rs {(discountedPrice * quantity).toLocaleString()}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                                >
                                    <ShoppingCart size={20} />
                                    <span>Add to Cart</span>
                                </button>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${isWishlisted
                                        ? 'bg-red-50 border-red-500 text-red-500'
                                        : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                                        }`}
                                >
                                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                                </button>

                                {/* Share Button with Dropdown - Opens Upward */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowShareMenu(!showShareMenu)}
                                        className="p-4 rounded-xl border-2 border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:scale-105"
                                    >
                                        <Share2 size={20} />
                                    </button>

                                    {/* Share Menu Dropdown - Opens Upward and to the Left */}
                                    {showShareMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowShareMenu(false)}
                                            ></div>
                                            <div className="absolute right-0 bottom-full mb-2 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 w-64 z-20 animate-slideUpMenu">
                                                {/* Main Share Options */}
                                                <button
                                                    onClick={handleCopyLink}
                                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                                                >
                                                    <Link2 size={18} className="text-gray-600" />
                                                    <span className="font-medium">Copy Link</span>
                                                </button>
                                                <button
                                                    onClick={handleShareWhatsApp}
                                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                                                >
                                                    <FaWhatsapp size={18} className="text-green-600" />
                                                    <span className="font-medium">Share to WhatsApp</span>
                                                </button>
                                                <button
                                                    onClick={handleShareFacebook}
                                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                                                >
                                                    <FaFacebookF size={18} className="text-blue-600" />
                                                    <span className="font-medium">Share to Facebook</span>
                                                </button>
                                                <button
                                                    onClick={handleShareInstagram}
                                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                                                >
                                                    <FaInstagram size={18} className="text-pink-600" />
                                                    <span className="font-medium">Share to Instagram</span>
                                                </button>

                                                {/* Divider */}
                                                <div className="my-2 border-t border-gray-200"></div>

                                                {/* Social Media Icons */}
                                                <div className="px-4 py-2">
                                                    <p className="text-xs text-gray-500 mb-3 font-medium">More Options</p>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={handleShareTwitter}
                                                            className="p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                                                            title="Share on Twitter"
                                                        >
                                                            <FaTwitter size={20} className="text-gray-600 group-hover:text-blue-500" />
                                                        </button>
                                                        <button
                                                            onClick={handleShareLinkedIn}
                                                            className="p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                                                            title="Share on LinkedIn"
                                                        >
                                                            <FaLinkedinIn size={20} className="text-gray-600 group-hover:text-blue-700" />
                                                        </button>
                                                        <button
                                                            onClick={handleSharePinterest}
                                                            className="p-2.5 rounded-lg hover:bg-red-50 transition-colors group"
                                                            title="Share on Pinterest"
                                                        >
                                                            <FaPinterestP size={20} className="text-gray-600 group-hover:text-red-600" />
                                                        </button>
                                                        <button
                                                            onClick={handleShareEmail}
                                                            className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors group"
                                                            title="Share via Email"
                                                        >
                                                            <Mail size={20} className="text-gray-600 group-hover:text-gray-800" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* View Full Details Link */}
                            <Link
                                href={`/products/${product.id}`}
                                className="block text-center py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                            >
                                View Full Details & Reviews →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUpMenu {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-slideUpMenu {
          animation: slideUpMenu 0.2s ease-out;
        }
      `}</style>
        </>,
        document.body
    );
}

