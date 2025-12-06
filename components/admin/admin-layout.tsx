'use client';

/**
 * Admin Layout
 * Combines AdminLoginModal and AdminToolbar
 * Add this to your pages to enable admin functionality
 */

import React from 'react';
import AdminLoginModal from './admin-login-modal';
import AdminToolbar from './admin-toolbar';
import { useAdminMode } from '@/lib/cms';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { isAdmin, isAuthenticated } = useAdminMode();

    return (
        <>
            {/* Admin Login Modal - Shows when admin param is present but not logged in */}
            <AdminLoginModal />

            {/* Admin Toolbar - Shows when logged in */}
            <AdminToolbar />

            {/* Page Content */}
            {children}

            {/* Admin Mode Indicator (when authenticated) */}
            {isAdmin && isAuthenticated && (
                <style jsx global>{`
          /* Add visual indicator for editable sections */
          .admin-editable {
            position: relative;
          }
          
          .admin-editable:hover {
            outline: 2px dashed rgba(59, 130, 246, 0.5);
            outline-offset: 4px;
          }
          
          /* Smooth transitions for edit buttons */
          .admin-edit-button {
            transition: all 0.2s ease;
          }
          
          /* Ensure modals are on top */
          .admin-modal-overlay {
            z-index: 9999;
          }
        `}</style>
            )}
        </>
    );
}
