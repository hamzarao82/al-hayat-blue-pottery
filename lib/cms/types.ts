/**
 * CMS Type Definitions
 * All editable content types for the Al Hayat Blue Pottery website
 * Designed to be backend-agnostic (works with localStorage, Firebase, etc.)
 */

// ============================================
// Hero Section Types
// ============================================
export interface HeroImage {
    id: string;
    src: string; // Base64 for localStorage, URL for Firebase
    alt: string;
    order: number;
}

export interface HeroStats {
    uniqueDesigns: string;
    handcrafted: string;
    customerMemories: string;
}

export interface HeroContent {
    badge: string;
    title: string;
    highlightedTitle: string;
    subtitle: string;
    buttonText: string;
    stats: HeroStats;
    images: HeroImage[];
}

// ============================================
// Product Types
// ============================================
export interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    image: string; // Base64 or URL
    categoryId: string;
}

export interface ProductCategory {
    id: string;
    title: string;
    subtitle: string;
    products: Product[];
    order: number;
}

// ============================================
// Gallery/Memories Types
// ============================================
export interface GalleryImage {
    id: string;
    image: string; // Base64 or URL
    alt: string;
    order: number;
}

export interface GalleryContent {
    title: string;
    subtitle: string;
    images: GalleryImage[];
}

// ============================================
// Categories Types
// ============================================
export interface Category {
    id: string;
    title: string;
    image: string; // Base64 or URL
    link: string;
    order: number;
}

export interface CategoriesContent {
    title: string;
    highlightedTitle: string;
    subtitle: string;
    categories: Category[];
}

// ============================================
// Reviews Types
// ============================================
export interface Review {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    avatar?: string; // Avatar URL or Base64
    createdAt: string;
}

export interface ReviewsContent {
    title: string;
    subtitle: string;
    reviews: Review[];
}

// ============================================
// Heritage Section Types
// ============================================
export interface HeritageFeature {
    icon: string;
    title: string;
    description: string;
}

export interface HeritageContent {
    title: string;
    subtitle: string;
    description: string;
    features: HeritageFeature[];
    image: string;
}

// ============================================
// Navbar & Footer Types
// ============================================
export interface NavbarContent {
    topBannerLeft: string;
    topBannerRight: string;
    logo: string;
}

export interface SocialLink {
    id: string;
    platform: 'instagram' | 'facebook' | 'whatsapp' | 'twitter' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin' | 'email' | 'phone' | 'map';
    url: string;
    label: string;
}

export interface FooterContent {
    brandTitle: string;
    brandSubtitle: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    copyrightText: string;
    socialLinks: SocialLink[];
}

// ============================================
// Complete CMS Data Structure
// ============================================
export interface CMSData {
    hero: HeroContent;
    products: ProductCategory[];
    gallery: GalleryContent;
    categories: CategoriesContent;
    reviews: ReviewsContent;
    heritage: HeritageContent;
    navbar: NavbarContent;
    footer: FooterContent;
    lastUpdated: string;
    version: string;
}

// ============================================
// Admin Types
// ============================================
export interface AdminState {
    isAdmin: boolean;
    isAuthenticated: boolean;
    currentEditor: string | null; // Which modal is open
}

export interface CMSContextType {
    data: CMSData;
    isLoading: boolean;
    error: string | null;

    // Admin state
    admin: AdminState;
    setAdminMode: (enabled: boolean) => void;
    authenticateAdmin: (password: string) => boolean;

    // CRUD Operations
    updateHero: (content: Partial<HeroContent>) => void;
    updateHeroImage: (imageId: string, image: Partial<HeroImage>) => void;
    addHeroImage: (image: Omit<HeroImage, 'id'>) => void;
    deleteHeroImage: (imageId: string) => void;

    updateProduct: (categoryId: string, productId: string, product: Partial<Product>) => void;
    addProduct: (categoryId: string, product: Omit<Product, 'id'>) => void;
    deleteProduct: (categoryId: string, productId: string) => void;

    updateProductCategory: (categoryId: string, category: Partial<ProductCategory>) => void;
    addProductCategory: (category: Omit<ProductCategory, 'id'>) => void;
    deleteProductCategory: (categoryId: string) => void;

    updateGallery: (content: Partial<GalleryContent>) => void;
    updateGalleryImage: (imageId: string, image: Partial<GalleryImage>) => void;
    addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
    deleteGalleryImage: (imageId: string) => void;

    updateCategory: (categoryId: string, category: Partial<Category>) => void;
    addCategory: (category: Omit<Category, 'id'>) => void;
    deleteCategory: (categoryId: string) => void;

    updateReview: (reviewId: string, review: Partial<Review>) => void;
    addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
    deleteReview: (reviewId: string) => void;

    updateHeritage: (content: Partial<HeritageContent>) => void;
    updateNavbar: (content: Partial<NavbarContent>) => void;
    updateFooter: (content: Partial<FooterContent>) => void;

    // Utility
    saveToStorage: () => void;
    resetToDefaults: () => void;
    exportData: () => string;
    importData: (jsonString: string) => boolean;
}

// ============================================
// Storage Adapter Interface
// ============================================
export interface StorageAdapter {
    get: () => Promise<CMSData | null>;
    set: (data: CMSData) => Promise<void>;
    clear: () => Promise<void>;
    getStorageInfo: () => { used: number; available: number; percentage: number };
}
