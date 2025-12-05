'use client';

/**
 * Change Password Modal
 * Allows admin to change the admin password
 */

import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { setAdminPassword, isPasswordCustomized } from '@/lib/cms';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        if (!currentPassword) {
            setError('Please enter your current password.');
            return;
        }

        if (!newPassword) {
            setError('Please enter a new password.');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        if (currentPassword === newPassword) {
            setError('New password must be different from current password.');
            return;
        }

        // Try to change password
        const result = setAdminPassword(currentPassword, newPassword);

        if (result) {
            setSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Close after showing success
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 2000);
        } else {
            setError('Current password is incorrect.');
        }
    };

    const isCustomized = isPasswordCustomized();

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Lock size={24} />
                        Change Password
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Info */}
                    {!isCustomized && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm flex items-start gap-2">
                            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                            <span>You're using the default password. It's recommended to change it.</span>
                        </div>
                    )}

                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                                placeholder="Enter current password"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter new password (min 6 characters)"
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirm new password"
                        />
                    </div>

                    {/* Show Passwords Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showPasswords}
                            onChange={(e) => setShowPasswords(e.target.checked)}
                            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">Show passwords</span>
                    </label>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
                            <Check size={18} />
                            Password changed successfully!
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={success}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-50"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
