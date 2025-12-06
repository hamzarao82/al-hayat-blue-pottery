'use client';

/**
 * Gallery Editor Modal
 * Allows editing the memories/gallery section images
 */

import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useGalleryData } from '@/lib/cms';
import ImageUploader from './image-uploader';

interface GalleryEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GalleryEditorModal({ isOpen, onClose }: GalleryEditorModalProps) {
    const {
        gallery,
        updateGallery,
        updateGalleryImage,
        addGalleryImage,
        deleteGalleryImage
    } = useGalleryData();

    const [editData, setEditData] = useState({
        title: gallery.title,
        subtitle: gallery.subtitle,
    });
    const [editingImageId, setEditingImageId] = useState<string | null>(null);
    const [showAddImage, setShowAddImage] = useState(false);
    const [newImageSrc, setNewImageSrc] = useState('');

    if (!isOpen) return null;

    const handleSaveText = () => {
        updateGallery(editData);
    };

    const handleAddImage = () => {
        if (newImageSrc) {
            addGalleryImage({
                image: newImageSrc,
                alt: `Customer Memory ${gallery.images.length + 1}`,
                order: gallery.images.length + 1,
            });
            setNewImageSrc('');
            setShowAddImage(false);
        }
    };

    const handleUpdateImage = (imageId: string, newSrc: string) => {
        updateGalleryImage(imageId, { image: newSrc });
        setEditingImageId(null);
    };

    const handleDeleteImage = (imageId: string) => {
        if (gallery.images.length <= 1) {
            alert('You must have at least one image in the gallery.');
            return;
        }
        if (confirm('Are you sure you want to delete this image?')) {
            deleteGalleryImage(imageId);
        }
    };

    const handleClose = () => {
        handleSaveText();
        onClose();
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
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <ImageIcon size={24} />
                        Edit Customer Memories
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    {/* Section Text */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Section Content</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Customer Memories"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <textarea
                                value={editData.subtitle}
                                onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="Our beloved customers..."
                            />
                        </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Memory Images ({gallery.images.length})
                            </h3>
                            <button
                                onClick={() => setShowAddImage(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                            >
                                <Plus size={16} />
                                Add Image
                            </button>
                        </div>

                        {/* Info Text */}
                        <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                            💡 Upload customer photos to replace the default ones. Images will be compressed automatically.
                        </p>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            {gallery.images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-sm"
                                >
                                    {isValidImageSrc(image.image) ? (
                                        <img
                                            src={image.image}
                                            alt={image.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                            <div className="text-center p-2">
                                                <ImageIcon size={32} className="mx-auto mb-1" />
                                                <span className="text-xs">Default Image {index + 1}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingImageId(image.id)}
                                                className="p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                                                title="Change Image"
                                            >
                                                <ImageIcon size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteImage(image.id)}
                                                className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Badge */}
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded-full text-xs font-bold text-gray-700 shadow">
                                        #{index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Image Section */}
                        {showAddImage && (
                            <div className="p-4 sm:p-5 bg-green-50 rounded-xl border-2 border-dashed border-green-300">
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <Plus size={18} className="text-green-600" />
                                    Add New Memory Image
                                </h4>
                                <ImageUploader
                                    onImageChange={(base64) => setNewImageSrc(base64)}
                                    label="Upload Customer Photo"
                                    aspectRatio="landscape"
                                    maxSizeKB={200}
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
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                        >
                                            Add to Gallery
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Edit Image Section */}
                        {editingImageId && (
                            <div className="p-4 sm:p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <ImageIcon size={18} className="text-blue-600" />
                                    Replace Image
                                </h4>
                                <ImageUploader
                                    currentImage={(() => {
                                        const img = gallery.images.find(i => i.id === editingImageId);
                                        return img && isValidImageSrc(img.image) ? img.image : undefined;
                                    })()}
                                    onImageChange={(base64) => handleUpdateImage(editingImageId, base64)}
                                    label="Upload New Photo"
                                    aspectRatio="landscape"
                                    maxSizeKB={200}
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
                        onClick={handleClose}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                    >
                        <Save size={18} />
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
