'use client';

/**
 * Footer Editor Modal
 * Allows editing footer content including brand info, contact details, and social links
 */

import React, { useState, useEffect } from 'react';
import { X, Save, LayoutTemplate, Plus, Trash2, GripVertical } from 'lucide-react';
import { useFooterData } from '@/lib/cms';
import { SocialLink } from '@/lib/cms/types';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter, FaYoutube, FaTiktok, FaPinterest, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface FooterEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Available icons for social links
const ICON_OPTIONS = [
    { id: 'instagram', icon: FaInstagram, label: 'Instagram' },
    { id: 'facebook', icon: FaFacebook, label: 'Facebook' },
    { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp' },
    { id: 'twitter', icon: FaTwitter, label: 'Twitter' },
    { id: 'youtube', icon: FaYoutube, label: 'YouTube' },
    { id: 'tiktok', icon: FaTiktok, label: 'TikTok' },
    { id: 'pinterest', icon: FaPinterest, label: 'Pinterest' },
    { id: 'linkedin', icon: FaLinkedin, label: 'LinkedIn' },
    { id: 'email', icon: FaEnvelope, label: 'Email' },
    { id: 'phone', icon: FaPhone, label: 'Phone' },
    { id: 'map', icon: FaMapMarkerAlt, label: 'Map' },
];

export default function FooterEditorModal({ isOpen, onClose }: FooterEditorModalProps) {
    const { footer, updateFooter } = useFooterData();

    const [editData, setEditData] = useState({
        brandTitle: footer.brandTitle,
        brandSubtitle: footer.brandSubtitle,
        description: footer.description,
        phone: footer.phone,
        email: footer.email,
        address: footer.address,
        copyrightText: footer.copyrightText,
        socialLinks: footer.socialLinks || [],
    });

    // Update local state when footer data changes
    useEffect(() => {
        setEditData({
            brandTitle: footer.brandTitle,
            brandSubtitle: footer.brandSubtitle,
            description: footer.description,
            phone: footer.phone,
            email: footer.email,
            address: footer.address,
            copyrightText: footer.copyrightText,
            socialLinks: footer.socialLinks || [],
        });
    }, [footer]);

    if (!isOpen) return null;

    const handleSave = () => {
        updateFooter(editData);
        onClose();
    };

    // Social Link Handlers
    const addSocialLink = () => {
        const newLink: SocialLink = {
            id: Date.now().toString(),
            platform: 'instagram',
            url: '',
            label: 'New Link',
        };
        setEditData(prev => ({
            ...prev,
            socialLinks: [...prev.socialLinks, newLink],
        }));
    };

    const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
        setEditData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map(link =>
                link.id === id ? { ...link, ...updates } : link
            ),
        }));
    };

    const deleteSocialLink = (id: string) => {
        setEditData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter(link => link.id !== id),
        }));
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <LayoutTemplate size={24} />
                        Edit Footer
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Brand & Contact */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Brand Information</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Title</label>
                                    <input
                                        type="text"
                                        value={editData.brandTitle}
                                        onChange={(e) => setEditData({ ...editData, brandTitle: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                    <input
                                        type="text"
                                        value={editData.brandSubtitle}
                                        onChange={(e) => setEditData({ ...editData, brandSubtitle: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 pt-4">Contact Details</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={editData.phone}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="text"
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea
                                    value={editData.address}
                                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                                <input
                                    type="text"
                                    value={editData.copyrightText}
                                    onChange={(e) => setEditData({ ...editData, copyrightText: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Right Column: Social Links */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-2">
                                <h3 className="text-lg font-semibold text-gray-900">Social Media Links</h3>
                                <button
                                    onClick={addSocialLink}
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    <Plus size={16} />
                                    Add Link
                                </button>
                            </div>

                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {editData.socialLinks.map((link, index) => (
                                    <div key={link.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => deleteSocialLink(link.id)}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Link"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="flex gap-3">
                                                <div className="w-1/3">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Platform Icon</label>
                                                    <div className="relative">
                                                        <select
                                                            value={link.platform}
                                                            onChange={(e) => updateSocialLink(link.id, { platform: e.target.value as any })}
                                                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                                                        >
                                                            {ICON_OPTIONS.map(option => (
                                                                <option key={option.id} value={option.id}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                            {React.createElement(ICON_OPTIONS.find(opt => opt.id === link.platform)?.icon || FaInstagram)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                                                    <input
                                                        type="text"
                                                        value={link.label}
                                                        onChange={(e) => updateSocialLink(link.id, { label: e.target.value })}
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        placeholder="e.g. Instagram"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">URL</label>
                                                <input
                                                    type="text"
                                                    value={link.url}
                                                    onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {editData.socialLinks.length === 0 && (
                                    <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        No social links added yet.
                                    </div>
                                )}
                            </div>
                        </div>
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
