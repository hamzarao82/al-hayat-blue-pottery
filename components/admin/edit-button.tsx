'use client';

/**
 * Edit Button Component
 * Reusable floating edit button for each section
 * Shows only in admin mode when authenticated
 */

import React from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useAdminMode } from '@/lib/cms';

interface EditButtonProps {
    onClick: () => void;
    label?: string;
    variant?: 'edit' | 'add' | 'delete';
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function EditButton({
    onClick,
    label,
    variant = 'edit',
    position = 'top-right',
    size = 'md',
    className = ''
}: EditButtonProps) {
    const { isAdmin, isAuthenticated } = useAdminMode();

    // Only show in admin mode when authenticated
    if (!isAdmin || !isAuthenticated) {
        return null;
    }

    const positionClasses = {
        'top-right': 'top-2 right-2',
        'top-left': 'top-2 left-2',
        'bottom-right': 'bottom-2 right-2',
        'bottom-left': 'bottom-2 left-2',
        'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };

    const sizeClasses = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-3',
    };

    const iconSizes = {
        sm: 14,
        md: 16,
        lg: 20,
    };

    const variantConfig = {
        edit: {
            icon: Pencil,
            bgColor: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
            ringColor: 'ring-blue-400/50',
        },
        add: {
            icon: Plus,
            bgColor: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
            ringColor: 'ring-green-400/50',
        },
        delete: {
            icon: Trash2,
            bgColor: 'from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600',
            ringColor: 'ring-red-400/50',
        },
    };

    const config = variantConfig[variant];
    const Icon = config.icon;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClick();
            }}
            className={`
        absolute ${positionClasses[position]} z-50
        ${sizeClasses[size]}
        bg-gradient-to-r ${config.bgColor}
        text-white rounded-full shadow-lg
        ring-2 ${config.ringColor}
        transform hover:scale-110 active:scale-95
        transition-all duration-200
        flex items-center gap-1.5
        opacity-80 hover:opacity-100
        ${className}
      `}
            title={label || (variant === 'edit' ? 'Edit' : variant === 'add' ? 'Add' : 'Delete')}
        >
            <Icon size={iconSizes[size]} />
            {label && <span className="text-xs font-medium pr-1">{label}</span>}
        </button>
    );
}

/**
 * Section Edit Wrapper
 * Wraps a section and adds an edit button overlay
 */
interface SectionEditWrapperProps {
    children: React.ReactNode;
    onEdit: () => void;
    label?: string;
    className?: string;
}

export function SectionEditWrapper({
    children,
    onEdit,
    label = 'Edit Section',
    className = ''
}: SectionEditWrapperProps) {
    const { isAdmin, isAuthenticated } = useAdminMode();

    return (
        <div className={`relative group ${className}`}>
            {children}

            {isAdmin && isAuthenticated && (
                <>
                    {/* Hover Border */}
                    <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-blue-400 group-hover:border-dashed rounded-lg transition-all duration-200" />

                    {/* Edit Button */}
                    <EditButton
                        onClick={onEdit}
                        label={label}
                        position="top-right"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                </>
            )}
        </div>
    );
}

/**
 * Item Edit Overlay
 * Adds edit/delete buttons to individual items (like products)
 */
interface ItemEditOverlayProps {
    onEdit: () => void;
    onDelete?: () => void;
    className?: string;
}

export function ItemEditOverlay({
    onEdit,
    onDelete,
    className = ''
}: ItemEditOverlayProps) {
    const { isAdmin, isAuthenticated } = useAdminMode();

    if (!isAdmin || !isAuthenticated) {
        return null;
    }

    return (
        <div className={`absolute inset-0 z-40 ${className}`}>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg" />

            {/* Buttons */}
            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onEdit();
                    }}
                    className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    title="Edit"
                >
                    <Pencil size={14} />
                </button>

                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (confirm('Are you sure you want to delete this item?')) {
                                onDelete();
                            }
                        }}
                        className="p-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}
