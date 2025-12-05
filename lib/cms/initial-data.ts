/**
 * Initial CMS Data
 * Default content for the website - used when no localStorage data exists
 * This data was extracted from the hardcoded component values
 */

import { CMSData } from './types';

/**
 * Get initial/default CMS data
 * This function returns fresh data each time (not a reference)
 */
export function getInitialData(): CMSData {
    return {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),

        // ============================================
        // Hero Section
        // ============================================
        hero: {
            badge: 'HANDCRAFTED EXCELLENCE',
            title: 'Discover the',
            highlightedTitle: 'Art of Blue Pottery',
            subtitle: 'Crafted with love, preserving tradition in every piece. Bring timeless artistry into your home.',
            buttonText: 'Explore Collection',
            stats: {
                uniqueDesigns: '5000+',
                handcrafted: '100%',
                customerMemories: '1000+',
            },
            images: [
                { id: 'hero-1', src: '/assets/images/serving-plate.png', alt: 'Serving Plate', order: 1 },
                { id: 'hero-2', src: '/assets/images/flower-decor.png', alt: 'Flower Decor', order: 2 },
                { id: 'hero-3', src: '/assets/images/tea-pot (6).png', alt: 'Tea Pot', order: 3 },
                { id: 'hero-4', src: '/assets/images/hot-pot.png', alt: 'Hot Pot', order: 4 },
                { id: 'hero-5', src: '/assets/images/hot-karhai.png', alt: 'Hot Karhai', order: 5 },
            ],
        },

        // ============================================
        // Product Categories & Products
        // ============================================
        products: [
            {
                id: 'tableware',
                title: 'Tableware Collection',
                subtitle: 'Elegant pieces for your dining experience',
                order: 1,
                products: [
                    { id: 'prod-1', name: 'Ceramic Tea Set', price: 2499, discount: 28, image: '/blue-pottery-tea-set.jpg', categoryId: 'tableware' },
                    { id: 'prod-2', name: 'Handcrafted Plates', price: 1299, discount: 31, image: '/blue-ceramic-plates-set.jpg', categoryId: 'tableware' },
                    { id: 'prod-3', name: 'Serving Platter', price: 1599, discount: 31, image: '/traditional-blue-pottery-platter.jpg', categoryId: 'tableware' },
                    { id: 'prod-4', name: 'Dinner Set', price: 3499, discount: 29, image: '/complete-blue-pottery-dinner-set.jpg', categoryId: 'tableware' },
                    { id: 'prod-5', name: 'Coffee Mugs', price: 899, discount: 34, image: '/blue-ceramic-coffee-mugs.jpg', categoryId: 'tableware' },
                ],
            },
            {
                id: 'decor',
                title: 'Decorative Items',
                subtitle: 'Beautiful accents for your home',
                order: 2,
                products: [
                    { id: 'prod-6', name: 'Decorative Bowls', price: 1899, discount: 32, image: '/blue-pottery-bowls-collection.jpg', categoryId: 'decor' },
                    { id: 'prod-7', name: 'Ceramic Vase', price: 1799, discount: 25, image: '/blue-pottery-tea-set.jpg', categoryId: 'decor' },
                    { id: 'prod-8', name: 'Wall Hanging', price: 2299, discount: 20, image: '/blue-ceramic-plates-set.jpg', categoryId: 'decor' },
                    { id: 'prod-9', name: 'Table Centerpiece', price: 1999, discount: 30, image: '/blue-pottery-bowls-collection.jpg', categoryId: 'decor' },
                    { id: 'prod-10', name: 'Decorative Planter', price: 1499, discount: 28, image: '/traditional-blue-pottery-platter.jpg', categoryId: 'decor' },
                ],
            },
            {
                id: 'new-arrivals',
                title: 'New Arrivals',
                subtitle: 'Fresh designs just added',
                order: 3,
                products: [
                    { id: 'prod-11', name: 'Premium Tea Set', price: 3299, discount: 35, image: '/blue-ceramic-coffee-mugs.jpg', categoryId: 'new-arrivals' },
                    { id: 'prod-12', name: 'Artisan Bowl Set', price: 2199, discount: 30, image: '/complete-blue-pottery-dinner-set.jpg', categoryId: 'new-arrivals' },
                    { id: 'prod-13', name: 'Designer Plates', price: 1699, discount: 33, image: '/blue-pottery-tea-set.jpg', categoryId: 'new-arrivals' },
                    { id: 'prod-14', name: 'Luxury Serving Set', price: 2899, discount: 27, image: '/blue-ceramic-plates-set.jpg', categoryId: 'new-arrivals' },
                    { id: 'prod-15', name: 'Modern Vase', price: 1899, discount: 32, image: '/blue-pottery-bowls-collection.jpg', categoryId: 'new-arrivals' },
                ],
            },
        ],

        // ============================================
        // Gallery/Memories Section
        // ============================================
        gallery: {
            title: 'Customer Memories',
            subtitle: 'Our beloved Customer have shared their memories with us, we are grateful for their support and love.',
            images: [
                { id: 'gallery-1', image: '/assets/images/memories (3).png', alt: 'Customer Memory 1', order: 1 },
                { id: 'gallery-2', image: '/assets/images/memories (4).png', alt: 'Customer Memory 2', order: 2 },
                { id: 'gallery-3', image: '/assets/images/memories (5).png', alt: 'Customer Memory 3', order: 3 },
                { id: 'gallery-4', image: '/assets/images/memories (6).png', alt: 'Customer Memory 4', order: 4 },
                { id: 'gallery-5', image: '/assets/images/memories (7).png', alt: 'Customer Memory 5', order: 5 },
                { id: 'gallery-6', image: '/assets/images/memories (8).png', alt: 'Customer Memory 6', order: 6 },
            ],
        },

        // ============================================
        // Shop Categories Section
        // ============================================
        categories: {
            title: 'Shop our top',
            highlightedTitle: 'categories',
            subtitle: 'Discover handcrafted blue pottery pieces that blend tradition with contemporary design',
            categories: [
                { id: 'cat-1', title: 'Blue Pottery Tea Sets', image: '/assets/images/tea-set.png', link: '/tableware/tea-sets', order: 1 },
                { id: 'cat-2', title: 'Dinner Sets', image: '/assets/images/dinner-set.png', link: '/tableware/dinner-sets', order: 2 },
                { id: 'cat-3', title: 'Ceramic Blue Pottery Karahi', image: '/assets/images/blue-karhai.png', link: '/tableware/karahi', order: 3 },
                { id: 'cat-4', title: 'Serving Dishes', image: '/assets/images/Serving-dish.png', link: '/tableware/serving-dishes', order: 4 },
                { id: 'cat-5', title: 'Plates And Platters', image: '/decorative-blue-pottery-plates.jpg', link: '/tableware/plates', order: 5 },
                { id: 'cat-6', title: 'Table Decoration', image: '/assets/images/table-decor.png', link: '/decor/table', order: 6 },
                { id: 'cat-7', title: 'Bowls', image: '/assets/images/karhai.png', link: '/tableware/bowls', order: 7 },
                { id: 'cat-8', title: 'Water Sets', image: '/assets/images/jar-cups.png', link: '/tableware/water-sets', order: 8 },
            ],
        },

        // ============================================
        // Reviews Section
        // ============================================
        reviews: {
            title: 'Customer Reviews',
            subtitle: 'Hear from our delighted customers about their experience with Al Hayat Blue Pottery',
            reviews: [
                {
                    id: 'review-1',
                    name: 'Fatima Khan',
                    location: 'Lahore, Pakistan',
                    rating: 5,
                    text: 'Absolutely beautiful pottery! The quality is exceptional and it arrived perfectly packaged. I have already recommended Arraish to all my friends.',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                    createdAt: '2024-01-15T10:00:00Z',
                },
                {
                    id: 'review-2',
                    name: 'Ahmed Hassan',
                    location: 'Karachi, Pakistan',
                    rating: 5,
                    text: 'The attention to detail in these pieces is incredible. Each item feels handcrafted with love. My dinner set has become the talk of the town!',
                    avatar: 'https://i.pravatar.cc/150?img=12',
                    createdAt: '2024-02-20T14:30:00Z',
                },
                {
                    id: 'review-3',
                    name: 'Ayesha Malik',
                    location: 'Islamabad, Pakistan',
                    rating: 5,
                    text: 'Love the traditional designs combined with modern functionality. The serving platters are perfect for entertaining. Delivery was quick and elegant.',
                    avatar: 'https://i.pravatar.cc/150?img=5',
                    createdAt: '2024-03-10T09:15:00Z',
                },
                {
                    id: 'review-4',
                    name: 'Hassan Ali',
                    location: 'Multan, Pakistan',
                    rating: 5,
                    text: 'As someone who values authentic craftsmanship, I am truly impressed. Every piece tells a story of the artisans behind it. Worth every penny!',
                    avatar: 'https://i.pravatar.cc/150?img=13',
                    createdAt: '2024-03-25T16:45:00Z',
                },
                {
                    id: 'review-5',
                    name: 'Zainab Ahmed',
                    location: 'Faisalabad, Pakistan',
                    rating: 5,
                    text: 'The craftsmanship is outstanding! These pieces add such elegance to my home. Customer service was also excellent.',
                    avatar: 'https://i.pravatar.cc/150?img=9',
                    createdAt: '2024-04-05T11:20:00Z',
                },
                {
                    id: 'review-6',
                    name: 'Omar Farooq',
                    location: 'Rawalpindi, Pakistan',
                    rating: 4,
                    text: 'Beautiful work and great quality. Slightly expensive but worth it for the artisanal touch. Would buy again!',
                    avatar: 'https://i.pravatar.cc/150?img=14',
                    createdAt: '2024-04-18T13:00:00Z',
                },
                {
                    id: 'review-7',
                    name: 'Sana Butt',
                    location: 'Sialkot, Pakistan',
                    rating: 5,
                    text: 'Each piece is a work of art. I love supporting local artisans and Al Hayat Blue Pottery makes it so easy. Absolutely love my purchase!',
                    avatar: 'https://i.pravatar.cc/150?img=10',
                    createdAt: '2024-05-02T08:30:00Z',
                },
                {
                    id: 'review-8',
                    name: 'Bilal Raza',
                    location: 'Gujranwala, Pakistan',
                    rating: 5,
                    text: 'The quality exceeded my expectations. Perfect gift for my mother and she absolutely loved it. Will order more soon!',
                    avatar: 'https://i.pravatar.cc/150?img=15',
                    createdAt: '2024-05-15T17:10:00Z',
                },
                {
                    id: 'review-9',
                    name: 'Maryam Siddiqui',
                    location: 'Peshawar, Pakistan',
                    rating: 5,
                    text: 'Simply stunning! The colors and designs are so vibrant. These pieces brighten up my entire dining room.',
                    avatar: 'https://i.pravatar.cc/150?img=20',
                    createdAt: '2024-06-01T12:45:00Z',
                },
                {
                    id: 'review-10',
                    name: 'Kamran Shah',
                    location: 'Hyderabad, Pakistan',
                    rating: 5,
                    text: 'Exceptional craftsmanship and attention to detail. The packaging was superb and delivery was prompt. Highly recommended!',
                    avatar: 'https://i.pravatar.cc/150?img=33',
                    createdAt: '2024-06-20T10:00:00Z',
                },
            ],
        },

        // ============================================
        // Heritage Section
        // ============================================
        heritage: {
            title: 'Our Heritage',
            subtitle: 'A Legacy of Craftsmanship',
            description: 'For generations, our artisans have been perfecting the art of blue pottery, passing down techniques and traditions that make each piece unique.',
            features: [
                { icon: '🎨', text: 'Hand-painted designs' },
                { icon: '🏺', text: 'Traditional techniques' },
                { icon: '🌿', text: 'Eco-friendly materials' },
                { icon: '👪', text: 'Family heritage' },
            ],
            image: '/assets/images/heritage-bg.jpg',
        },
    };
}

/**
 * Get a deep clone of the initial data
 * Useful for resetting to defaults
 */
export function cloneInitialData(): CMSData {
    return JSON.parse(JSON.stringify(getInitialData()));
}
