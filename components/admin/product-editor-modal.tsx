'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { Product } from '@/lib/cms/types';
import { useProductsData } from '@/lib/cms';
import ImageUploader from './image-uploader';

interface ProductEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product | null; // Optional for add mode
    categoryId?: string; // Optional if using onSave
    onSave?: (data: Partial<Product>) => void; // For external save handling
    mode?: 'edit' | 'add';
    categoryTitle?: string;
}

export default function ProductEditorModal({
    isOpen,
    onClose,
    product,
    categoryId,
    onSave,
    mode = 'edit',
    categoryTitle
}: ProductEditorModalProps) {
    const { updateProduct } = useProductsData();

    // Guard: validation for existing edit mode
    if (mode === 'edit' && !product && !onSave) return null;

    // Local state for form fields
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        price: 0,
        discount: 0,
        image: '',
    });

    // Reset form when product changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: product?.name || '',
                price: product?.price || 0,
                discount: product?.discount || 0,
                image: product?.image || '',
            });
        }
    }, [isOpen, product]);

    if (!isOpen) return null;

    const handleSave = () => {
        // Validate inputs
        if (!formData.name || (formData.price === undefined)) {
            alert('Name and Price are required');
            return;
        }

        if (onSave) {
            // Dumb mode: Delegate save to parent
            onSave(formData);
        } else if (categoryId && product && product.id) {
            // Smart mode: Self-update
            updateProduct(categoryId, product.id, formData);
        }

        onClose();
    };

    const title = mode === 'add'
        ? `Add Product ${categoryTitle ? `to ${categoryTitle}` : ''}`
        : 'Edit Product';

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col my-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                        <ImageUploader
                            currentImage={formData.image}
                            onImageChange={(base64) => setFormData({ ...formData, image: base64 })}
                            label="Product Image"
                            aspectRatio="square"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Blue Pottery Vase"
                        />
                    </div>

                    {/* Price & Discount */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    {/* Preview Calculations */}
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 flex justify-between items-center">
                        <span>Original: <strong>Rs {formData.price?.toLocaleString()}</strong></span>
                        <span>Final: <strong className="text-green-600">Rs {Math.round((formData.price || 0) * (1 - (formData.discount || 0) / 100)).toLocaleString()}</strong></span>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        <Save size={18} />
                        {mode === 'add' ? 'Create Product' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
