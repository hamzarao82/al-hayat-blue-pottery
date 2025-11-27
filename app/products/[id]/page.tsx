'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, Package, ChevronLeft, ChevronRight, Check, Link2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Toast from '@/components/toast';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

// Mock product data - In production, fetch from API/database
const getProductData = (id: string) => {
    return {
        id: parseInt(id),
        name: 'Handcrafted Blue Pottery Tea Set',
        price: 2499,
        discount: 28,
        rating: 4.8,
        reviewCount: 156,
        sold: 342,
        images: [
            '/blue-pottery-tea-set.jpg',
            '/blue-ceramic-plates-set.jpg',
            '/blue-pottery-bowls-collection.jpg',
            '/traditional-blue-pottery-platter.jpg',
        ],
        description: 'Exquisite handcrafted blue pottery tea set from the artisans of Multan. Each piece is meticulously crafted using traditional techniques passed down through generations. The intricate blue patterns are hand-painted, making every set unique.',
        features: [
            'Handcrafted by skilled artisans',
            'Traditional Multani blue pottery',
            'Food-safe glazing',
            'Microwave and dishwasher safe',
            'Unique hand-painted patterns',
            'Eco-friendly materials'
        ],
        specifications: {
            'Material': 'Premium Ceramic',
            'Origin': 'Multan, Pakistan',
            'Set Includes': '6 Cups, 6 Saucers, 1 Teapot',
            'Color': 'Traditional Blue & White',
            'Care': 'Hand wash recommended',
            'Weight': '2.5 kg'
        },
        shipping: {
            freeShipping: true,
            estimatedDays: '3-5 business days',
            safePackaging: true
        },
        reviews: [
            {
                id: 1,
                name: 'Ayesha Khan',
                rating: 5,
                date: '2 weeks ago',
                comment: 'Absolutely beautiful! The craftsmanship is outstanding. Perfect addition to my dining collection.',
                verified: true
            },
            {
                id: 2,
                name: 'Ahmed Ali',
                rating: 5,
                date: '1 month ago',
                comment: 'Bought this as a gift and it was a hit! The packaging was excellent and delivery was prompt.',
                verified: true
            },
            {
                id: 3,
                name: 'Fatima Malik',
                rating: 4,
                date: '1 month ago',
                comment: 'Very nice quality. The blue color is vibrant and the design is intricate. Highly recommend!',
                verified: true
            }
        ],
        relatedProducts: [2, 3, 4, 5]
    };
};

export default function ProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const product = getProductData(params.id);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'description' | 'specifications' | 'reviews'>('description');
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const discountedPrice = Math.round(product.price * (1 - product.discount / 100));
    const savings = product.price - discountedPrice;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleAddToCart = () => {
        // Add to cart logic here
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleBuyNow = () => {
        // Add to cart and redirect to cart page
        handleAddToCart();
        setTimeout(() => {
            router.push('/cart');
        }, 500);
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
        const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(product.images[0])}&description=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    const handleShareEmail = () => {
        const subject = encodeURIComponent(product.name);
        const body = encodeURIComponent(`${shareText}\n\n${productUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        setShowShareMenu(false);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-cream to-white">
                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
                            <span>/</span>
                            <span className="text-blue-900 font-medium">{product.name}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left: Image Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 group">
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Discount Badge */}
                                {product.discount > 0 && (
                                    <div className="absolute top-6 left-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl">
                                        <span className="text-lg font-bold">{product.discount}% OFF</span>
                                    </div>
                                )}

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl transition-all duration-200 hover:scale-110"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl transition-all duration-200 hover:scale-110"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Image Counter */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                                    {currentImageIndex + 1} / {product.images.length}
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`aspect-square rounded-xl overflow-hidden border-3 transition-all duration-300 ${idx === currentImageIndex
                                                ? 'border-blue-600 scale-105 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="space-y-8">
                            {/* Product Title & Rating */}
                            <div>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-4">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-6 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={20}
                                                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                                    </div>
                                    <span className="text-gray-600">|</span>
                                    <span className="text-gray-600">{product.reviewCount} reviews</span>
                                    <span className="text-gray-600">|</span>
                                    <span className="text-green-600 font-semibold">{product.sold} sold</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-5xl font-bold text-orange-600">
                                        Rs {discountedPrice.toLocaleString()}
                                    </span>
                                    <span className="text-2xl text-gray-400 line-through">
                                        Rs {product.price.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-semibold text-green-600 bg-green-100 px-4 py-1.5 rounded-full">
                                        Save Rs {savings.toLocaleString()} ({product.discount}% OFF)
                                    </span>
                                    <span className="text-sm text-gray-600">Inclusive of all taxes</span>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <Truck className="text-blue-600 mb-2" size={28} />
                                    <span className="text-sm font-semibold text-blue-900 text-center">Free Shipping</span>
                                    <span className="text-xs text-blue-600 text-center mt-1">Across Pakistan</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-green-50 rounded-2xl border border-green-100">
                                    <Shield className="text-green-600 mb-2" size={28} />
                                    <span className="text-sm font-semibold text-green-900 text-center">Safe Delivery</span>
                                    <span className="text-xs text-green-600 text-center mt-1">Guaranteed</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-purple-50 rounded-2xl border border-purple-100">
                                    <Package className="text-purple-600 mb-2" size={28} />
                                    <span className="text-sm font-semibold text-purple-900 text-center">Premium Pack</span>
                                    <span className="text-xs text-purple-600 text-center mt-1">Gift Ready</span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-3">
                                <label className="text-lg font-semibold text-gray-900">Quantity</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-4 bg-gray-100 rounded-2xl p-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 rounded-xl bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all shadow-sm"
                                        >
                                            -
                                        </button>
                                        <span className="w-16 text-center font-bold text-2xl text-gray-900">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-12 rounded-xl bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all shadow-sm"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-600">Total Price</div>
                                        <div className="text-2xl font-bold text-blue-900">
                                            Rs {(discountedPrice * quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
                                >
                                    <ShoppingCart size={24} />
                                    <span>Add to Cart</span>
                                </button>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-5 rounded-2xl border-3 transition-all duration-300 hover:scale-105 shadow-lg ${isWishlisted
                                            ? 'bg-red-50 border-red-500 text-red-500'
                                            : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                                        }`}
                                >
                                    <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
                                </button>

                                {/* Share Button with Dropdown - Opens Upward */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowShareMenu(!showShareMenu)}
                                        className="p-5 rounded-2xl border-3 border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:scale-105 shadow-lg"
                                    >
                                        <Share2 size={24} />
                                    </button>

                                    {/* Share Menu Dropdown */}
                                    {showShareMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowShareMenu(false)}
                                            ></div>
                                            <div className="absolute right-0 bottom-full mb-2 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 w-64 z-20 animate-slideUpMenu">
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

                                                <div className="my-2 border-t border-gray-200"></div>

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

                            {/* Buy Now Button */}
                            <button
                                onClick={handleBuyNow}
                                className="w-full py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-16">
                        {/* Tab Headers */}
                        <div className="flex gap-2 border-b-2 border-gray-200 mb-8">
                            {(['description', 'specifications', 'reviews'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={`px-8 py-4 font-semibold text-lg capitalize transition-all duration-300 relative ${selectedTab === tab
                                            ? 'text-blue-600'
                                            : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    {tab}
                                    {selectedTab === tab && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            {selectedTab === 'description' && (
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4">Key Features</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {product.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'specifications' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                            <span className="font-semibold text-gray-900">{key}</span>
                                            <span className="text-gray-700">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedTab === 'reviews' && (
                                <div className="space-y-6">
                                    {/* Review Summary */}
                                    <div className="flex items-center gap-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-blue-900 mb-2">{product.rating}</div>
                                            <div className="flex items-center gap-1 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-600">{product.reviewCount} reviews</div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            {[5, 4, 3, 2, 1].map((stars) => (
                                                <div key={stars} className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-600 w-12">{stars} star</span>
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-yellow-400"
                                                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600 w-12">{stars === 5 ? 70 : stars === 4 ? 20 : 10}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Individual Reviews */}
                                    <div className="space-y-6">
                                        {product.reviews.map((review) => (
                                            <div key={review.id} className="p-6 bg-gray-50 rounded-2xl">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="font-semibold text-gray-900">{review.name}</span>
                                                            {review.verified && (
                                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                                                    Verified Purchase
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={16}
                                                                    className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500">{review.date}</span>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    product={{
                        name: product.name,
                        price: discountedPrice,
                        image: product.images[0]
                    }}
                />
            )}

            <style jsx>{`
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

        .animate-slideUpMenu {
          animation: slideUpMenu 0.2s ease-out;
        }
      `}</style>
        </>
    );
}
