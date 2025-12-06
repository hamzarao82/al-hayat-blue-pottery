'use client';

/**
 * Reviews Editor Modal
 * Allows adding, editing, and deleting customer reviews
 * With image URL input and upload option
 */

import React, { useState, useRef } from 'react';
import { X, Save, Star, Plus, Trash2, MessageSquare, Upload, Link } from 'lucide-react';
import { useReviewsData, Review, imageToBase64 } from '@/lib/cms';

interface ReviewsEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReviewsEditorModal({ isOpen, onClose }: ReviewsEditorModalProps) {
    const {
        reviewsContent,
        updateReview,
        addReview,
        deleteReview,
    } = useReviewsData();

    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        location: '',
        rating: 5,
        text: '',
        avatar: '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleEditReview = (review: Review) => {
        setEditData({
            name: review.name,
            location: review.location,
            rating: review.rating,
            text: review.text,
            avatar: review.avatar || '',
        });
        setEditingReviewId(review.id);
        setShowAddForm(false);
    };

    const handleSaveEdit = () => {
        if (editingReviewId && editData.name.trim() && editData.text.trim()) {
            updateReview(editingReviewId, editData);
            setEditingReviewId(null);
            resetForm();
        }
    };

    const handleAddNew = () => {
        setShowAddForm(true);
        setEditingReviewId(null);
        resetForm();
    };

    const handleSaveNew = () => {
        if (editData.name.trim() && editData.text.trim()) {
            addReview({
                name: editData.name,
                location: editData.location || 'Customer',
                rating: editData.rating,
                text: editData.text,
                avatar: editData.avatar || undefined,
            });
            setShowAddForm(false);
            resetForm();
        }
    };

    const handleDelete = (reviewId: string) => {
        if (reviewsContent.reviews.length <= 1) {
            alert('You must have at least one review.');
            return;
        }
        if (confirm('Are you sure you want to delete this review?')) {
            deleteReview(reviewId);
        }
    };

    const resetForm = () => {
        setEditData({
            name: '',
            location: '',
            rating: 5,
            text: '',
            avatar: '',
        });
    };

    const handleCancel = () => {
        setEditingReviewId(null);
        setShowAddForm(false);
        resetForm();
    };

    // Handle image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await imageToBase64(file, 150, 0.8);
            setEditData({ ...editData, avatar: base64 });
        } catch (error) {
            console.error('Failed to process image:', error);
            alert('Failed to process image. Please try a smaller file.');
        }
    };

    // Star rating component
    const StarRating = ({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange?.(star)}
                    className={`${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    disabled={!onChange}
                >
                    <Star
                        size={20}
                        className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                </button>
            ))}
        </div>
    );

    // Check if avatar is valid
    const isValidAvatar = (src: string): boolean => {
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
                        <MessageSquare size={24} />
                        Manage Reviews
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
                    {/* Add Button */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            {reviewsContent.reviews.length} reviews
                        </p>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                            <Plus size={18} />
                            Add Review
                        </button>
                    </div>

                    {/* Add/Edit Form */}
                    {(showAddForm || editingReviewId) && (
                        <div className="p-5 bg-blue-50 rounded-xl border-2 border-blue-200 space-y-4">
                            <h4 className="font-semibold text-gray-900">
                                {showAddForm ? 'Add New Review' : 'Edit Review'}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Customer Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Sarah Ahmed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={editData.location}
                                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Lahore, Pakistan"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating
                                </label>
                                <StarRating
                                    rating={editData.rating}
                                    onChange={(r) => setEditData({ ...editData, rating: r })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Review Text *
                                </label>
                                <textarea
                                    value={editData.text}
                                    onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="What did the customer say about your products?"
                                />
                            </div>

                            {/* Avatar Image - URL + Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Image (URL or Upload)
                                </label>
                                <div className="flex gap-2 items-start">
                                    {/* Current Avatar Preview */}
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0 border-2 border-gray-200">
                                        {isValidAvatar(editData.avatar) ? (
                                            <img
                                                src={editData.avatar}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            editData.name.charAt(0).toUpperCase() || '?'
                                        )}
                                    </div>

                                    {/* URL Input */}
                                    <div className="flex-1">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Link size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={editData.avatar}
                                                    onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                                    placeholder="https://example.com/avatar.jpg"
                                                />
                                            </div>

                                            {/* Upload Button */}
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                                            >
                                                <Upload size={16} />
                                                Upload
                                            </button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Enter an image URL or upload from device
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end pt-2">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={showAddForm ? handleSaveNew : handleSaveEdit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                >
                                    {showAddForm ? 'Add Review' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {reviewsContent.reviews.map((review) => (
                            <div
                                key={review.id}
                                className={`p-4 rounded-xl border-2 transition-all ${editingReviewId === review.id
                                        ? 'border-blue-400 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
                                            {isValidAvatar(review.avatar || '') ? (
                                                <img
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                review.name.charAt(0).toUpperCase()
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h5 className="font-semibold text-gray-900">{review.name}</h5>
                                                <span className="text-sm text-gray-500">• {review.location}</span>
                                            </div>
                                            <StarRating rating={review.rating} />
                                            <p className="text-gray-600 mt-2 text-sm">{review.text}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleEditReview(review)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <MessageSquare size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
