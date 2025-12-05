'use client';

/**
 * Hero Section Editor Modal
 * Allows editing hero images, text content, and stats
 */

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { useHeroData } from '@/lib/cms';
import ImageUploader from './image-uploader';

interface HeroEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HeroEditorModal({ isOpen, onClose }: HeroEditorModalProps) {
    const {
        hero,
        updateHero,
        updateHeroImage,
        addHeroImage,
        deleteHeroImage
    } = useHeroData();

    // Local state for editing
    const [editData, setEditData] = useState({
        badge: hero.badge,
        title: hero.title,
        highlightedTitle: hero.highlightedTitle,
        subtitle: hero.subtitle,
        buttonText: hero.buttonText,
        stats: { ...hero.stats },
    });
    const [editingImageId, setEditingImageId] = useState<string | null>(null);
    const [showAddImage, setShowAddImage] = useState(false);
    const [newImageSrc, setNewImageSrc] = useState('');

    // Update local state when hero data changes
    useEffect(() => {
        setEditData({
            badge: hero.badge,
            title: hero.title,
            highlightedTitle: hero.highlightedTitle,
            subtitle: hero.subtitle,
            buttonText: hero.buttonText,
            stats: { ...hero.stats },
        });
    }, [hero]);

    if (!isOpen) return null;

    const handleSave = () => {
        updateHero(editData);
        onClose();
    };

    const handleImageUpdate = (imageId: string, newSrc: string) => {
        updateHeroImage(imageId, { src: newSrc });
        setEditingImageId(null);
    };

    const handleAddImage = () => {
        if (newImageSrc) {
            addHeroImage({
                src: newImageSrc,
                alt: `Hero Image ${hero.images.length + 1}`,
                order: hero.images.length + 1,
            });
            setNewImageSrc('');
            setShowAddImage(false);
        }
    };

    const handleDeleteImage = (imageId: string) => {
        if (hero.images.length <= 1) {
            alert('You must have at least one hero image.');
            return;
        }
        if (confirm('Are you sure you want to delete this image?')) {
            deleteHeroImage(imageId);
        }
    };

    // Check if image is valid (Base64 or HTTP URL)
    const isValidImageSrc = (src: string): boolean => {
        return src.startsWith('data:') || src.startsWith('http');
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
                        <ImageIcon size={24} />
                        Edit Hero Section
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
                    {/* Text Content Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Text Content</h3>

                        {/* Badge */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                            <input
                                type="text"
                                value={editData.badge}
                                onChange={(e) => setEditData({ ...editData, badge: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="HANDCRAFTED EXCELLENCE"
                            />
                        </div>

                        {/* Title */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title (First Part)</label>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Discover the"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Title</label>
                                <input
                                    type="text"
                                    value={editData.highlightedTitle}
                                    onChange={(e) => setEditData({ ...editData, highlightedTitle: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Art of Blue Pottery"
                                />
                            </div>
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <textarea
                                value={editData.subtitle}
                                onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="Crafted with love..."
                            />
                        </div>

                        {/* Button Text */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                            <input
                                type="text"
                                value={editData.buttonText}
                                onChange={(e) => setEditData({ ...editData, buttonText: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Explore Collection"
                            />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Statistics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Unique Designs</label>
                                <input
                                    type="text"
                                    value={editData.stats.uniqueDesigns}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        stats: { ...editData.stats, uniqueDesigns: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="5000+"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Handcrafted</label>
                                <input
                                    type="text"
                                    value={editData.stats.handcrafted}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        stats: { ...editData.stats, handcrafted: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="100%"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Memories</label>
                                <input
                                    type="text"
                                    value={editData.stats.customerMemories}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        stats: { ...editData.stats, customerMemories: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="1000+"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="text-lg font-semibold text-gray-900">Hero Images ({hero.images.length})</h3>
                            <button
                                onClick={() => setShowAddImage(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                            >
                                <Plus size={16} />
                                Add Image
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                            💡 Upload images to replace the default ones. Uploaded images will be stored and persist.
                        </p>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {hero.images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200"
                                >
                                    {isValidImageSrc(image.src) ? (
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                            <div className="text-center p-2">
                                                <ImageIcon size={24} className="mx-auto mb-1" />
                                                <span className="text-xs">Default Image {index + 1}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingImageId(image.id)}
                                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                                title="Change Image"
                                            >
                                                <ImageIcon size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteImage(image.id)}
                                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Badge */}
                                    <div className="absolute top-2 left-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                                        {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Image Modal */}
                        {showAddImage && (
                            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <ImageUploader
                                    onImageChange={(base64) => setNewImageSrc(base64)}
                                    label="Upload New Hero Image"
                                    aspectRatio="square"
                                />
                                {newImageSrc && (
                                    <div className="mt-4 flex gap-2 justify-end">
                                        <button
                                            onClick={() => {
                                                setShowAddImage(false);
                                                setNewImageSrc('');
                                            }}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddImage}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Add Image
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Edit Image Modal */}
                        {editingImageId && (
                            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                <h4 className="font-medium text-gray-900 mb-3">Change Image</h4>
                                <ImageUploader
                                    currentImage={(() => {
                                        const img = hero.images.find(i => i.id === editingImageId);
                                        return img && isValidImageSrc(img.src) ? img.src : undefined;
                                    })()}
                                    onImageChange={(base64) => handleImageUpdate(editingImageId, base64)}
                                    label="Upload Replacement Image"
                                    aspectRatio="square"
                                />
                                <button
                                    onClick={() => setEditingImageId(null)}
                                    className="mt-3 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 sm:px-6 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                    >
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
