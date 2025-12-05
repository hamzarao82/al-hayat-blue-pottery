'use client';

/**
 * Categories Editor Modal
 * Allows editing category titles and images
 */

import React, { useState } from 'react';
import { X, Save, Grid, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useCategoriesData } from '@/lib/cms';
import ImageUploader from './image-uploader';

interface CategoriesEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CategoriesEditorModal({ isOpen, onClose }: CategoriesEditorModalProps) {
    const {
        categoriesContent,
        updateCategory,
    } = useCategoriesData();

    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editData, setEditData] = useState({ title: '', image: '' });

    if (!isOpen) return null;

    const handleEditCategory = (categoryId: string) => {
        const category = categoriesContent.categories.find(c => c.id === categoryId);
        if (category) {
            setEditData({ title: category.title, image: category.image });
            setEditingCategoryId(categoryId);
        }
    };

    const handleSaveCategory = () => {
        if (editingCategoryId && editData.title.trim()) {
            updateCategory(editingCategoryId, editData);
            setEditingCategoryId(null);
            setEditData({ title: '', image: '' });
        }
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setEditData({ title: '', image: '' });
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
                        <Grid size={24} />
                        Edit Categories
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
                    <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                        💡 Click on a category to edit its title and image.
                    </p>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categoriesContent.categories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleEditCategory(category.id)}
                                className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${editingCategoryId === category.id
                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                {/* Image */}
                                <div className="aspect-square bg-gray-100">
                                    {isValidImageSrc(category.image) ? (
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                                            <ImageIcon size={40} />
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <div className="p-3 bg-white">
                                    <h4 className="font-medium text-gray-900 text-center truncate">
                                        {category.title}
                                    </h4>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600 shadow-lg transition-opacity">
                                        Click to Edit
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Edit Form */}
                    {editingCategoryId && (
                        <div className="p-5 bg-blue-50 rounded-xl border-2 border-blue-200 space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Grid size={18} className="text-blue-600" />
                                Edit Category
                            </h4>

                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category Title
                                </label>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Tableware"
                                />
                            </div>

                            {/* Image Upload */}
                            <ImageUploader
                                currentImage={isValidImageSrc(editData.image) ? editData.image : undefined}
                                onImageChange={(base64) => setEditData({ ...editData, image: base64 })}
                                label="Category Image"
                                aspectRatio="square"
                                maxSizeKB={150}
                            />

                            {/* Buttons */}
                            <div className="flex gap-2 justify-end pt-2">
                                <button
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveCategory}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                >
                                    Save Category
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                    >
                        <Save size={18} />
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
