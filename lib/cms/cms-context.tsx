'use client';

/**
 * CMS Context Provider
 * Manages all CMS data and admin state
 * 
 * Admin Mode Activation:
 * - URL: yoursite.com?admin=true (works on localhost and Vercel)
 * - Shows password prompt when admin param is detected
 * 
 * Design: Central state management for all editable content
 * Backend-agnostic: Just swap the storage adapter to change backends
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    CMSData,
    CMSContextType,
    AdminState,
    HeroContent,
    HeroImage,
    Product,
    ProductCategory,
    GalleryContent,
    GalleryImage,
    Category,
    Review,
    HeritageContent,
    NavbarContent,
    FooterContent,
} from './types';
import { storageAdapter, verifyAdminPassword, generateId } from './storage-adapter';
import { getInitialData, cloneInitialData } from './initial-data';

// ============================================
// Context Creation
// ============================================

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// ============================================
// Provider Component
// ============================================

interface CMSProviderProps {
    children: React.ReactNode;
}

export function CMSProvider({ children }: CMSProviderProps) {
    // Core state
    const [data, setData] = useState<CMSData>(getInitialData());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Admin state
    const [admin, setAdmin] = useState<AdminState>({
        isAdmin: false,
        isAuthenticated: false,
        currentEditor: null,
    });

    // Get URL search params (works on both localhost and Vercel)
    const searchParams = useSearchParams();

    // ============================================
    // Initialize data from storage
    // ============================================
    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true);
                const storedData = await storageAdapter.get();
                if (storedData) {
                    setData(storedData);
                }
            } catch (err) {
                console.error('Failed to load CMS data:', err);
                setError('Failed to load content. Using defaults.');
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    // ============================================
    // Check for admin URL parameter
    // ============================================
    useEffect(() => {
        const adminParam = searchParams.get('admin');
        if (adminParam === 'true') {
            // Admin param detected, but not yet authenticated
            setAdmin(prev => ({
                ...prev,
                isAdmin: true,
                isAuthenticated: false,
            }));
        }
    }, [searchParams]);

    // ============================================
    // Admin Functions
    // ============================================
    const setAdminMode = useCallback((enabled: boolean) => {
        setAdmin(prev => ({
            ...prev,
            isAdmin: enabled,
            isAuthenticated: enabled ? prev.isAuthenticated : false,
            currentEditor: enabled ? prev.currentEditor : null,
        }));
    }, []);

    const authenticateAdmin = useCallback((password: string): boolean => {
        const isValid = verifyAdminPassword(password);
        if (isValid) {
            setAdmin(prev => ({
                ...prev,
                isAuthenticated: true,
            }));
        }
        return isValid;
    }, []);

    // ============================================
    // Save to Storage
    // ============================================
    const saveToStorage = useCallback(async () => {
        try {
            await storageAdapter.set(data);
            console.log('CMS data saved successfully');
        } catch (err) {
            console.error('Failed to save CMS data:', err);
            setError(err instanceof Error ? err.message : 'Failed to save');
            throw err;
        }
    }, [data]);

    // Auto-save when data changes (debounced)
    useEffect(() => {
        if (isLoading) return;

        const timeoutId = setTimeout(() => {
            saveToStorage().catch(console.error);
        }, 1000); // 1 second debounce

        return () => clearTimeout(timeoutId);
    }, [data, isLoading, saveToStorage]);

    // ============================================
    // Hero Section CRUD
    // ============================================
    const updateHero = useCallback((content: Partial<HeroContent>) => {
        setData(prev => ({
            ...prev,
            hero: { ...prev.hero, ...content },
        }));
    }, []);

    const updateHeroImage = useCallback((imageId: string, image: Partial<HeroImage>) => {
        setData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                images: prev.hero.images.map(img =>
                    img.id === imageId ? { ...img, ...image } : img
                ),
            },
        }));
    }, []);

    const addHeroImage = useCallback((image: Omit<HeroImage, 'id'>) => {
        const newImage: HeroImage = {
            ...image,
            id: generateId(),
        };
        setData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                images: [...prev.hero.images, newImage],
            },
        }));
    }, []);

    const deleteHeroImage = useCallback((imageId: string) => {
        setData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                images: prev.hero.images.filter(img => img.id !== imageId),
            },
        }));
    }, []);

    // ============================================
    // Product CRUD
    // ============================================
    const updateProduct = useCallback((categoryId: string, productId: string, product: Partial<Product>) => {
        setData(prev => ({
            ...prev,
            products: prev.products.map(cat =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        products: cat.products.map(p =>
                            p.id === productId ? { ...p, ...product } : p
                        ),
                    }
                    : cat
            ),
        }));
    }, []);

    const addProduct = useCallback((categoryId: string, product: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...product,
            id: generateId(),
        };
        setData(prev => ({
            ...prev,
            products: prev.products.map(cat =>
                cat.id === categoryId
                    ? { ...cat, products: [...cat.products, newProduct] }
                    : cat
            ),
        }));
    }, []);

    const deleteProduct = useCallback((categoryId: string, productId: string) => {
        setData(prev => ({
            ...prev,
            products: prev.products.map(cat =>
                cat.id === categoryId
                    ? { ...cat, products: cat.products.filter(p => p.id !== productId) }
                    : cat
            ),
        }));
    }, []);

    // ============================================
    // Product Category CRUD
    // ============================================
    const updateProductCategory = useCallback((categoryId: string, category: Partial<ProductCategory>) => {
        setData(prev => ({
            ...prev,
            products: prev.products.map(cat =>
                cat.id === categoryId ? { ...cat, ...category } : cat
            ),
        }));
    }, []);

    const addProductCategory = useCallback((category: Omit<ProductCategory, 'id'>) => {
        const newCategory: ProductCategory = {
            ...category,
            id: generateId(),
        };
        setData(prev => ({
            ...prev,
            products: [...prev.products, newCategory],
        }));
    }, []);

    const deleteProductCategory = useCallback((categoryId: string) => {
        setData(prev => ({
            ...prev,
            products: prev.products.filter(cat => cat.id !== categoryId),
        }));
    }, []);

    // ============================================
    // Gallery CRUD
    // ============================================
    const updateGallery = useCallback((content: Partial<GalleryContent>) => {
        setData(prev => ({
            ...prev,
            gallery: { ...prev.gallery, ...content },
        }));
    }, []);

    const updateGalleryImage = useCallback((imageId: string, image: Partial<GalleryImage>) => {
        setData(prev => ({
            ...prev,
            gallery: {
                ...prev.gallery,
                images: prev.gallery.images.map(img =>
                    img.id === imageId ? { ...img, ...image } : img
                ),
            },
        }));
    }, []);

    const addGalleryImage = useCallback((image: Omit<GalleryImage, 'id'>) => {
        const newImage: GalleryImage = {
            ...image,
            id: generateId(),
        };
        setData(prev => ({
            ...prev,
            gallery: {
                ...prev.gallery,
                images: [...prev.gallery.images, newImage],
            },
        }));
    }, []);

    const deleteGalleryImage = useCallback((imageId: string) => {
        setData(prev => ({
            ...prev,
            gallery: {
                ...prev.gallery,
                images: prev.gallery.images.filter(img => img.id !== imageId),
            },
        }));
    }, []);

    // ============================================
    // Categories CRUD
    // ============================================
    const updateCategory = useCallback((categoryId: string, category: Partial<Category>) => {
        setData(prev => ({
            ...prev,
            categories: {
                ...prev.categories,
                categories: prev.categories.categories.map(cat =>
                    cat.id === categoryId ? { ...cat, ...category } : cat
                ),
            },
        }));
    }, []);

    const addCategory = useCallback((category: Omit<Category, 'id'>) => {
        const newCategory: Category = {
            ...category,
            id: generateId(),
        };
        setData(prev => ({
            ...prev,
            categories: {
                ...prev.categories,
                categories: [...prev.categories.categories, newCategory],
            },
        }));
    }, []);

    const deleteCategory = useCallback((categoryId: string) => {
        setData(prev => ({
            ...prev,
            categories: {
                ...prev.categories,
                categories: prev.categories.categories.filter(cat => cat.id !== categoryId),
            },
        }));
    }, []);

    // ============================================
    // Reviews CRUD
    // ============================================
    const updateReview = useCallback((reviewId: string, review: Partial<Review>) => {
        setData(prev => ({
            ...prev,
            reviews: {
                ...prev.reviews,
                reviews: prev.reviews.reviews.map(r =>
                    r.id === reviewId ? { ...r, ...review } : r
                ),
            },
        }));
    }, []);

    const addReview = useCallback((review: Omit<Review, 'id' | 'createdAt'>) => {
        const newReview: Review = {
            ...review,
            id: generateId(),
            createdAt: new Date().toISOString(),
        };
        setData(prev => ({
            ...prev,
            reviews: {
                ...prev.reviews,
                reviews: [...prev.reviews.reviews, newReview],
            },
        }));
    }, []);

    const deleteReview = useCallback((reviewId: string) => {
        setData(prev => ({
            ...prev,
            reviews: {
                ...prev.reviews,
                reviews: prev.reviews.reviews.filter(r => r.id !== reviewId),
            },
        }));
    }, []);

    // ============================================
    // Heritage CRUD
    // ============================================
    const updateHeritage = useCallback((content: Partial<HeritageContent>) => {
        setData(prev => ({
            ...prev,
            heritage: { ...prev.heritage, ...content },
        }));
    }, []);

    // ============================================
    // Utility Functions
    // ============================================
    // ============================================
    // Navbar & Footer CRUD
    // ============================================
    const updateNavbar = useCallback((content: Partial<NavbarContent>) => {
        setData(prev => ({
            ...prev,
            navbar: { ...prev.navbar, ...content },
        }));
    }, []);

    const updateFooter = useCallback((content: Partial<FooterContent>) => {
        setData(prev => ({
            ...prev,
            footer: { ...prev.footer, ...content },
        }));
    }, []);

    // ============================================
    // Utility Functions
    // ============================================
    const resetToDefaults = useCallback(() => {
        setData(cloneInitialData());
    }, []);

    const exportData = useCallback((): string => {
        return JSON.stringify(data, null, 2);
    }, [data]);

    const importData = useCallback((jsonString: string): boolean => {
        try {
            const parsed = JSON.parse(jsonString) as CMSData;
            // Basic validation
            if (!parsed.hero || !parsed.products || !parsed.gallery) {
                throw new Error('Invalid CMS data structure');
            }
            setData(parsed);
            return true;
        } catch (err) {
            console.error('Failed to import data:', err);
            return false;
        }
    }, []);

    // ============================================
    // Context Value
    // ============================================
    const value = useMemo<CMSContextType>(() => ({
        data,
        isLoading,
        error,
        admin,
        setAdminMode,
        authenticateAdmin,
        updateHero,
        updateHeroImage,
        addHeroImage,
        deleteHeroImage,
        updateProduct,
        addProduct,
        deleteProduct,
        updateProductCategory,
        addProductCategory,
        deleteProductCategory,
        updateGallery,
        updateGalleryImage,
        addGalleryImage,
        deleteGalleryImage,
        updateCategory,
        addCategory,
        deleteCategory,
        updateReview,
        addReview,
        deleteReview,
        updateHeritage,
        updateNavbar,
        updateFooter,
        saveToStorage,
        resetToDefaults,
        exportData,
        importData,
    }), [
        data,
        isLoading,
        error,
        admin,
        setAdminMode,
        authenticateAdmin,
        updateHero,
        updateHeroImage,
        addHeroImage,
        deleteHeroImage,
        updateProduct,
        addProduct,
        deleteProduct,
        updateProductCategory,
        addProductCategory,
        deleteProductCategory,
        updateGallery,
        updateGalleryImage,
        addGalleryImage,
        deleteGalleryImage,
        updateCategory,
        addCategory,
        deleteCategory,
        updateReview,
        addReview,
        deleteReview,
        updateHeritage,
        updateNavbar,
        updateFooter,
        saveToStorage,
        resetToDefaults,
        exportData,
        importData,
    ]);

    return (
        <CMSContext.Provider value={value}>
            {children}
        </CMSContext.Provider>
    );
}

// ============================================
// Custom Hook for accessing CMS
// ============================================

export function useCMS(): CMSContextType {
    const context = useContext(CMSContext);
    if (context === undefined) {
        throw new Error('useCMS must be used within a CMSProvider');
    }
    return context;
}

// ============================================
// Convenience Hooks
// ============================================

export function useHeroData() {
    const { data, updateHero, updateHeroImage, addHeroImage, deleteHeroImage } = useCMS();
    return {
        hero: data.hero,
        updateHero,
        updateHeroImage,
        addHeroImage,
        deleteHeroImage,
    };
}

export function useProductsData() {
    const {
        data,
        updateProduct,
        addProduct,
        deleteProduct,
        updateProductCategory,
        addProductCategory,
        deleteProductCategory,
    } = useCMS();
    return {
        categories: data.products,
        updateProduct,
        addProduct,
        deleteProduct,
        updateCategory: updateProductCategory,
        addCategory: addProductCategory,
        deleteCategory: deleteProductCategory,
    };
}

export function useGalleryData() {
    const { data, updateGallery, updateGalleryImage, addGalleryImage, deleteGalleryImage } = useCMS();
    return {
        gallery: data.gallery,
        updateGallery,
        updateGalleryImage,
        addGalleryImage,
        deleteGalleryImage,
    };
}

export function useCategoriesData() {
    const { data, updateCategory, addCategory, deleteCategory } = useCMS();
    return {
        categoriesContent: data.categories,
        updateCategory,
        addCategory,
        deleteCategory,
    };
}

export function useReviewsData() {
    const { data, updateReview, addReview, deleteReview } = useCMS();
    return {
        reviewsContent: data.reviews,
        updateReview,
        addReview,
        deleteReview,
    };
}

export function useNavbarData() {
    const { data, updateNavbar } = useCMS();
    return {
        navbar: data.navbar || getInitialData().navbar,
        updateNavbar,
    };
}

export function useFooterData() {
    const { data, updateFooter } = useCMS();
    return {
        footer: data.footer || getInitialData().footer,
        updateFooter,
    };
}

export function useAdminMode() {
    const { admin, setAdminMode, authenticateAdmin } = useCMS();
    return {
        isAdmin: admin.isAdmin,
        isAuthenticated: admin.isAuthenticated,
        currentEditor: admin.currentEditor,
        setAdminMode,
        authenticateAdmin,
    };
}
