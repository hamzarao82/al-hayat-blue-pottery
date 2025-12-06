'use client';

/**
 * Navbar Editor Modal
 * Allows editing the top banner text and logo
 */

import React, { useState, useEffect } from 'react';
import { X, Save, LayoutTemplate, Image as ImageIcon } from 'lucide-react';
import { useNavbarData } from '@/lib/cms';
import ImageUploader from './image-uploader';

interface NavbarEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NavbarEditorModal({ isOpen, onClose }: NavbarEditorModalProps) {
    const { navbar, updateNavbar } = useNavbarData();

    const [editData, setEditData] = useState({
        topBannerLeft: navbar.topBannerLeft,
        topBannerRight: navbar.topBannerRight,
        logo: navbar.logo,
    });

    // Update local state when navbar data changes
    useEffect(() => {
        setEditData({
            topBannerLeft: navbar.topBannerLeft,
            topBannerRight: navbar.topBannerRight,
            logo: navbar.logo,
        });
    }, [navbar]);

    if (!isOpen) return null;

    const handleSave = () => {
        updateNavbar(editData);
        onClose();
    };

    // Check if image is valid
    const isValidImageSrc = (src: string): boolean => {
        return Boolean(src && (src.startsWith('data:') || src.startsWith('http')));
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <LayoutTemplate size={24} />
                        Edit Navbar
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    {/* Top Banner Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Top Banner</h3>
                        <p className="text-sm text-gray-500">
                            Edit the text displayed in the blue bar at the very top of the page.
                        </p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Left Text</label>
                            <input
                                type="text"
                                value={editData.topBannerLeft}
                                onChange={(e) => setEditData({ ...editData, topBannerLeft: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 🚚 FREE SHIPPING ACROSS PAKISTAN 📍"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Right Text</label>
                            <input
                                type="text"
                                value={editData.topBannerRight}
                                onChange={(e) => setEditData({ ...editData, topBannerRight: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 🛡️ SAFE DELIVERY IS OUR RESPONSIBILITY ⭐"
                            />
                        </div>
                    </div>

                    {/* Logo Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Logo</h3>
                        <p className="text-sm text-gray-500">
                            Upload a custom logo to replace the default one.
                        </p>

                        <ImageUploader
                            currentImage={isValidImageSrc(editData.logo) ? editData.logo : undefined}
                            onImageChange={(base64) => setEditData({ ...editData, logo: base64 })}
                            label="Website Logo"
                            aspectRatio="landscape"
                            maxSizeKB={100}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                    >
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
