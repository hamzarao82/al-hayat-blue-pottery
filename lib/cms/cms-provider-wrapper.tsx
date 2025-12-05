'use client';

/**
 * CMS Provider Wrapper
 * Wraps CMSProvider with Suspense for useSearchParams compatibility
 * 
 * This is needed because useSearchParams requires a Suspense boundary
 * in Next.js 14+ for proper hydration on both localhost and Vercel
 */

import React, { Suspense } from 'react';
import { CMSProvider } from './cms-context';

interface CMSProviderWrapperProps {
    children: React.ReactNode;
}

/**
 * Loading fallback during SSR/hydration
 * This shows briefly while the CMS context initializes
 */
function CMSLoadingFallback() {
    return null; // Silent loading, no visual indicator
}

/**
 * Wrapper component that handles Suspense boundary for useSearchParams
 * Use this instead of CMSProvider directly in your layout
 */
export function CMSProviderWrapper({ children }: CMSProviderWrapperProps) {
    return (
        <Suspense fallback={<CMSLoadingFallback />}>
            <CMSProvider>
                {children}
            </CMSProvider>
        </Suspense>
    );
}

export default CMSProviderWrapper;
