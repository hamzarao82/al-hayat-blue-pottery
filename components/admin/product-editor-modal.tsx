'use client';

/**
 * Product Editor Modal
 * Allows editing individual product details: name, price, discount, image
 * Responsive design for all screen sizes
 */

import React, { useState, useEffect } from 'react';
import { X, Save, Package, DollarSign, Percent, Tag } from 'lucide-react';
import { Product } from '@/lib/cms';
import ImageUploader from './image-uploader';

interface ProductEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onSave: (product: Partial<Product>) => void;
    mode?: 'edit' | 'add';
    categoryTitle?: string;
}

export default function ProductEditorModal({
    isOpen,
    onClose,
    product,
    onSave,
    mode = 'edit',
    categoryTitle = 'Products'
}: ProductEditorModalProps) {
    const [editData, setEditData] = useState({
        name: '',
        price: 0,
        discount: 0,
        image: '',
    });

    // Update local state when product changes
    useEffect(() => {
        if (product) {
            setEditData({
                name: product.name,
                price: product.price,
                discount: product.discount,
                image: product.image,
            });
        } else {
            setEditData({
                name: '',
                price: 0,
                discount: 0,
                image: '',
            });
        }
    }, [product]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!editData.name.trim()) {
            alert('Please enter a product name.');
            return;
        }
        if (editData.price <= 0) {
            alert('Please enter a valid price.');
            return;
        }

        onSave(editData);
        onClose();
    };

    // Calculate discounted price
    const discountedPrice = editData.price - (editData.price * editData.discount / 100);

    // Check if image is valid
    const isValidImageSrc = (src: string): boolean => {
        return Boolean(src && (src.startsWith('data:') || src.startsWith('http') || src.startsWith('/')));
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <Package size={24} />
                        <span className="truncate">
                            {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
                        </span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Category Info */}
                {categoryTitle && (
                    <div className="px-4 sm:px-6 py-2 bg-blue-50 border-b text-sm text-blue-700">
                        Category: <span className="font-medium">{categoryTitle}</span>
                    </div>
                )}

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                    {/* Product Image */}
                    <ImageUploader
                        currentImage={isValidImageSrc(editData.image) ? editData.image : undefined}
                        onImageChange={(base64) => setEditData({ ...editData, image: base64 })}
                        onRemove={() => setEditData({ ...editData, image: '' })}
                        label="Product Image"
                        aspectRatio="square"
                        maxSizeKB={150}
                    />

                    {/* Product Name */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Tag size={16} />
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            placeholder="e.g., Ceramic Tea Set"
                        />
                    </div>

                    {/* Price & Discount */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <DollarSign size={16} />
                                Price (PKR)
                            </label>
                            <input
                                type="number"
                                value={editData.price}
                                onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                                placeholder="2499"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Percent size={16} />
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                value={editData.discount}
                                onChange={(e) => setEditData({ ...editData, discount: Math.min(100, Math.max(0, Number(e.target.value))) })}
                                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                                placeholder="25"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    {/* Price Preview */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-sm text-gray-600">Customer Price:</span>
                            <div className="text-right">
                                {editData.discount > 0 && (
                                    <span className="text-sm text-gray-400 line-through mr-2">
                                        Rs. {editData.price.toLocaleString()}
                                    </span>
                                )}
                                <span className="text-xl font-bold text-green-600">
                                    Rs. {Math.round(discountedPrice).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        {editData.discount > 0 && (
                            <div className="text-right text-sm text-green-600 mt-1">
                                Save Rs. {Math.round(editData.price - discountedPrice).toLocaleString()} ({editData.discount}% off)
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
                        <span className="hidden sm:inline">
                            {mode === 'edit' ? 'Save Changes' : 'Add Product'}
                        </span>
                        <span className="sm:hidden">Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
