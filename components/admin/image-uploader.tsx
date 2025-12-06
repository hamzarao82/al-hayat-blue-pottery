'use client';

/**
 * Image Uploader Component
 * Handles image upload with drag & drop, preview, and Base64 conversion
 * Compresses images for localStorage storage
 */

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { imageToBase64, getBase64Size, formatBytes } from '@/lib/cms';

interface ImageUploaderProps {
    currentImage?: string;
    onImageChange: (base64: string) => void;
    onRemove?: () => void;
    aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
    maxSizeKB?: number;
    className?: string;
    label?: string;
}

export default function ImageUploader({
    currentImage,
    onImageChange,
    onRemove,
    aspectRatio = 'auto',
    maxSizeKB = 200,
    className = '',
    label = 'Upload Image',
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const aspectRatioClasses = {
        square: 'aspect-square',
        landscape: 'aspect-video',
        portrait: 'aspect-[3/4]',
        auto: 'min-h-[200px]',
    };

    const handleFile = useCallback(async (file: File) => {
        setError(null);

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPEG, PNG, etc.)');
            return;
        }

        // Validate original file size (max 10MB before compression)
        if (file.size > 10 * 1024 * 1024) {
            setError('Image too large. Maximum size is 10MB.');
            return;
        }

        setIsLoading(true);

        try {
            // Convert and compress
            const base64 = await imageToBase64(file, 800);

            // Check compressed size
            const compressedSize = getBase64Size(base64);
            if (compressedSize > maxSizeKB * 1024) {
                // Try with smaller dimensions
                const smallerBase64 = await imageToBase64(file, 600);
                const smallerSize = getBase64Size(smallerBase64);

                if (smallerSize > maxSizeKB * 1024) {
                    setError(`Image still too large after compression (${formatBytes(smallerSize)}). Try a smaller image.`);
                    setIsLoading(false);
                    return;
                }

                setPreview(smallerBase64);
                onImageChange(smallerBase64);
            } else {
                setPreview(base64);
                onImageChange(base64);
            }
        } catch (err) {
            console.error('Failed to process image:', err);
            setError('Failed to process image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [maxSizeKB, onImageChange]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleRemove = useCallback(() => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onRemove?.();
    }, [onRemove]);

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`relative ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {/* Upload Area / Preview */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={openFileDialog}
                className={`
          relative ${aspectRatioClasses[aspectRatio]} w-full
          border-2 border-dashed rounded-xl overflow-hidden cursor-pointer
          transition-all duration-200
          ${isDragging
                        ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                        : preview
                            ? 'border-gray-200 hover:border-blue-400'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }
          ${isLoading ? 'pointer-events-none' : ''}
        `}
            >
                {/* Preview Image */}
                {preview && !isLoading && (
                    <>
                        <img
                            src={preview}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                            <div className="text-white text-center">
                                <Upload size={32} className="mx-auto mb-2" />
                                <span className="text-sm">Click to change</span>
                            </div>
                        </div>
                        {/* Remove button */}
                        {onRemove && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove();
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </>
                )}

                {/* Empty State */}
                {!preview && !isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className={`
              w-16 h-16 rounded-full flex items-center justify-center mb-4
              ${isDragging ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-400'}
              transition-colors
            `}>
                            <ImageIcon size={32} />
                        </div>
                        <p className={`text-sm font-medium ${isDragging ? 'text-blue-600' : 'text-gray-600'}`}>
                            {isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            JPEG, PNG up to 10MB
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                        <Loader2 size={32} className="text-blue-500 animate-spin mb-2" />
                        <p className="text-sm text-gray-600">Processing image...</p>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-2 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {/* Size Info */}
            {preview && (
                <p className="mt-2 text-xs text-gray-400 text-right">
                    Size: ~{formatBytes(getBase64Size(preview))}
                </p>
            )}
        </div>
    );
}

/**
 * Multi-Image Uploader
 * For uploading multiple images (like gallery)
 */
interface MultiImageUploaderProps {
    images: { id: string; src: string; alt?: string }[];
    onImagesChange: (images: { id: string; src: string; alt?: string }[]) => void;
    maxImages?: number;
    className?: string;
    label?: string;
}

export function MultiImageUploader({
    images,
    onImagesChange,
    maxImages = 10,
    className = '',
    label = 'Upload Images',
}: MultiImageUploaderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddImage = async (file: File) => {
        if (images.length >= maxImages) {
            alert(`Maximum ${maxImages} images allowed.`);
            return;
        }

        setIsLoading(true);
        try {
            const base64 = await imageToBase64(file, 800);
            const newImage = {
                id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                src: base64,
                alt: file.name.replace(/\.[^/.]+$/, ''),
            };
            onImagesChange([...images, newImage]);
        } catch (err) {
            console.error('Failed to add image:', err);
            alert('Failed to process image.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = (id: string) => {
        onImagesChange(images.filter(img => img.id !== id));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleAddImage(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} ({images.length}/{maxImages})
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {/* Existing Images */}
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                    >
                        <img
                            src={image.src}
                            alt={image.alt || 'Image'}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => handleRemoveImage(image.id)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}

                {/* Add Button */}
                {images.length < maxImages && (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-blue-500 transition-all disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : (
                            <>
                                <Upload size={24} />
                                <span className="text-xs">Add</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
}
