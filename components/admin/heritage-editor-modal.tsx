'use client';

/**
 * Heritage Editor Modal
 * Allows editing the heritage section content
 */

import React, { useState, useEffect } from 'react';
import { X, Save, Scroll, Plus, Trash2 } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import ImageUploader from './image-uploader';

interface HeritageEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HeritageEditorModal({ isOpen, onClose }: HeritageEditorModalProps) {
    const { data, updateHeritage } = useCMS();
    const heritage = data.heritage;

    const [editData, setEditData] = useState({
        title: heritage.title,
        subtitle: heritage.subtitle,
        description: heritage.description,
        image: heritage.image,
        features: [...heritage.features],
    });

    // Update local state when heritage data changes
    useEffect(() => {
        setEditData({
            title: heritage.title,
            subtitle: heritage.subtitle,
            description: heritage.description,
            image: heritage.image,
            features: [...heritage.features],
        });
    }, [heritage]);

    if (!isOpen) return null;

    const handleSave = () => {
        updateHeritage(editData);
        onClose();
    };

    const handleAddFeature = () => {
        setEditData({
            ...editData,
            features: [...editData.features, { icon: '✨', text: 'New Feature' }],
        });
    };

    const handleUpdateFeature = (index: number, field: 'icon' | 'text', value: string) => {
        const newFeatures = [...editData.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setEditData({ ...editData, features: newFeatures });
    };

    const handleDeleteFeature = (index: number) => {
        if (editData.features.length <= 1) {
            alert('You must have at least one feature.');
            return;
        }
        const newFeatures = editData.features.filter((_, i) => i !== index);
        setEditData({ ...editData, features: newFeatures });
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
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <Scroll size={24} />
                        Edit Heritage Section
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
                    {/* Text Content */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Content</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Our Heritage"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={editData.subtitle}
                                onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Centuries of Craftsmanship"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={editData.description}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Tell the story of your heritage..."
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Section Image</h3>
                        <ImageUploader
                            currentImage={isValidImageSrc(editData.image) ? editData.image : undefined}
                            onImageChange={(base64) => setEditData({ ...editData, image: base64 })}
                            label="Heritage Image"
                            aspectRatio="landscape"
                            maxSizeKB={200}
                        />
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                            <button
                                onClick={handleAddFeature}
                                className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                            >
                                <Plus size={16} />
                                Add Feature
                            </button>
                        </div>

                        <div className="space-y-3">
                            {editData.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <input
                                        type="text"
                                        value={feature.icon}
                                        onChange={(e) => handleUpdateFeature(index, 'icon', e.target.value)}
                                        className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="🏺"
                                    />
                                    <input
                                        type="text"
                                        value={feature.text}
                                        onChange={(e) => handleUpdateFeature(index, 'text', e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Feature text"
                                    />
                                    <button
                                        onClick={() => handleDeleteFeature(index)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
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
