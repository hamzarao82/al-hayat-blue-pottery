/**
 * CMS Module Exports
 * Central export file for the CMS system
 */

// Types
export * from './types';

// Storage Adapter
export {
    storageAdapter,
    localStorageAdapter,
    verifyAdminPassword,
    setAdminPassword,
    isPasswordCustomized,
    imageToBase64,
    getBase64Size,
    formatBytes,
    generateId,
} from './storage-adapter';

// Initial Data
export { getInitialData, cloneInitialData } from './initial-data';

// Context and Hooks
export {
    CMSProvider,
    useCMS,
    useHeroData,
    useProductsData,
    useGalleryData,
    useCategoriesData,
    useReviewsData,
    useAdminMode,
    useNavbarData,
    useFooterData,
} from './cms-context';

// Provider Wrapper (use this in layout)
export { CMSProviderWrapper } from './cms-provider-wrapper';
