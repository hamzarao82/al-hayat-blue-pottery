/**
 * Storage Adapter for CMS
 * Currently uses localStorage - can be swapped to Firebase later
 * 
 * Design: All storage operations go through this adapter
 * To switch to Firebase: Just replace implementation in this file
 */

import { CMSData, StorageAdapter } from './types';
import { getInitialData } from './initial-data';

const STORAGE_KEY = 'al-hayat-cms-data';
const ADMIN_PASSWORD_KEY = 'al-hayat-admin-hash';

// Simple hash function for password (not secure, just for demo)
// Replace with proper auth when moving to Firebase
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Default admin password (change this!)
const DEFAULT_ADMIN_PASSWORD = 'alhayat2024';

/**
 * Check if we're running in browser environment
 */
function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/**
 * LocalStorage Adapter Implementation
 */
export const localStorageAdapter: StorageAdapter = {
    /**
     * Get CMS data from localStorage
     * Returns initial data if nothing stored
     */
    async get(): Promise<CMSData | null> {
        if (!isBrowser()) return null;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as CMSData;
                // Validate version compatibility
                const initialData = getInitialData();
                if (parsed.version !== initialData.version) {
                    console.log('CMS data version mismatch, merging with new structure...');
                    // Merge old data with new structure
                    return mergeWithDefaults(parsed, initialData);
                }
                return parsed;
            }
            return null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    /**
     * Save CMS data to localStorage
     */
    async set(data: CMSData): Promise<void> {
        if (!isBrowser()) return;

        try {
            const dataWithTimestamp = {
                ...data,
                lastUpdated: new Date().toISOString(),
            };
            const jsonString = JSON.stringify(dataWithTimestamp);

            // Check storage limit before saving
            const storageInfo = this.getStorageInfo();
            const newDataSize = new Blob([jsonString]).size;
            const totalSize = storageInfo.used + newDataSize;

            if (totalSize > 4.5 * 1024 * 1024) { // 4.5MB warning threshold
                console.warn('LocalStorage is getting full! Consider reducing image sizes or switching to cloud storage.');
            }

            localStorage.setItem(STORAGE_KEY, jsonString);
        } catch (error) {
            if (error instanceof Error && error.name === 'QuotaExceededError') {
                console.error('LocalStorage quota exceeded! Cannot save data.');
                throw new Error('Storage full. Please reduce image sizes or remove some content.');
            }
            console.error('Error saving to localStorage:', error);
            throw error;
        }
    },

    /**
     * Clear all CMS data from localStorage
     */
    async clear(): Promise<void> {
        if (!isBrowser()) return;
        localStorage.removeItem(STORAGE_KEY);
    },

    /**
     * Get storage usage information
     */
    getStorageInfo(): { used: number; available: number; percentage: number } {
        if (!isBrowser()) {
            return { used: 0, available: 5 * 1024 * 1024, percentage: 0 };
        }

        let totalSize = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage.getItem(key)?.length || 0;
            }
        }

        // LocalStorage limit is typically 5MB
        const limit = 5 * 1024 * 1024;
        return {
            used: totalSize,
            available: limit - totalSize,
            percentage: (totalSize / limit) * 100,
        };
    },
};

/**
 * Merge old data structure with new defaults
 * Preserves user content while adding new fields
 */
function mergeWithDefaults(oldData: Partial<CMSData>, defaults: CMSData): CMSData {
    return {
        hero: { ...defaults.hero, ...oldData.hero },
        products: oldData.products?.length ? oldData.products : defaults.products,
        gallery: { ...defaults.gallery, ...oldData.gallery },
        categories: { ...defaults.categories, ...oldData.categories },
        reviews: { ...defaults.reviews, ...oldData.reviews },
        heritage: { ...defaults.heritage, ...oldData.heritage },
        lastUpdated: new Date().toISOString(),
        version: defaults.version,
    };
}

// ============================================
// Admin Password Management
// ============================================

/**
 * Verify admin password
 */
export function verifyAdminPassword(password: string): boolean {
    if (!isBrowser()) return false;

    const storedHash = localStorage.getItem(ADMIN_PASSWORD_KEY);
    const inputHash = simpleHash(password);

    // If no password set, check against default
    if (!storedHash) {
        return password === DEFAULT_ADMIN_PASSWORD;
    }

    return storedHash === inputHash;
}

/**
 * Set new admin password
 */
export function setAdminPassword(currentPassword: string, newPassword: string): boolean {
    if (!verifyAdminPassword(currentPassword)) {
        return false;
    }

    if (!isBrowser()) return false;

    localStorage.setItem(ADMIN_PASSWORD_KEY, simpleHash(newPassword));
    return true;
}

/**
 * Check if admin password has been set (not using default)
 */
export function isPasswordCustomized(): boolean {
    if (!isBrowser()) return false;
    return localStorage.getItem(ADMIN_PASSWORD_KEY) !== null;
}

// ============================================
// Image Utilities
// ============================================

/**
 * Compress and convert image file to Base64
 * Max dimension: 800px, Quality: 0.8
 */
export async function imageToBase64(file: File, maxDimension: number = 800): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxDimension) {
                        height = (height * maxDimension) / width;
                        width = maxDimension;
                    }
                } else {
                    if (height > maxDimension) {
                        width = (width * maxDimension) / height;
                        height = maxDimension;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Convert to JPEG for smaller file size
                const base64 = canvas.toDataURL('image/jpeg', 0.8);
                resolve(base64);
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

/**
 * Get approximate size of Base64 string in bytes
 */
export function getBase64Size(base64: string): number {
    const padding = (base64.match(/=/g) || []).length;
    return Math.floor((base64.length * 3) / 4) - padding;
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ============================================
// Export for future Firebase migration
// ============================================

/**
 * Current storage adapter in use
 * Change this to firebaseAdapter when migrating
 */
export const storageAdapter = localStorageAdapter;

/**
 * Generate unique ID
 * Uses crypto.randomUUID when available, fallback for older browsers
 */
export function generateId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}
