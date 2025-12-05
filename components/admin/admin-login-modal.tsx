'use client';

/**
 * Admin Login Modal
 * Shows when ?admin=true is in URL but user is not authenticated
 * Provides password protection for admin features
 */

import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, X, Shield } from 'lucide-react';
import { useAdminMode } from '@/lib/cms';

interface AdminLoginModalProps {
    onClose?: () => void;
}

export default function AdminLoginModal({ onClose }: AdminLoginModalProps) {
    const { isAdmin, isAuthenticated, authenticateAdmin, setAdminMode } = useAdminMode();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isShaking, setIsShaking] = useState(false);

    // Don't show if not in admin mode or already authenticated
    if (!isAdmin || isAuthenticated) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!password.trim()) {
            setError('Please enter the admin password');
            return;
        }

        const success = authenticateAdmin(password);

        if (success) {
            setPassword('');
        } else {
            setError('Incorrect password. Please try again.');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    };

    const handleCancel = () => {
        setAdminMode(false);
        // Remove admin param from URL without reload
        const url = new URL(window.location.href);
        url.searchParams.delete('admin');
        window.history.replaceState({}, '', url.toString());
        onClose?.();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleCancel}
            />

            {/* Modal */}
            <div
                className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 ${isShaking ? 'animate-shake' : ''
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                    <Shield className="text-white" size={32} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    Admin Access
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Enter the admin password to edit website content
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Hint */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    Default password: alhayat2024
                </p>
            </div>

            {/* Shake Animation */}
            <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
        </div>
    );
}
