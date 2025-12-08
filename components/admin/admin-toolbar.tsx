'use client';

/**
 * Admin Toolbar
 * Floating toolbar that appears when admin mode is active and authenticated
 * Provides quick access to admin features and storage info
 */

import React, { useState, useEffect } from 'react';
import {
    Settings,
    Save,
    LogOut,
    RotateCcw,
    Download,
    Upload,
    HardDrive,
    X,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeOff,
    Lock
} from 'lucide-react';
import { useCMS, formatBytes, storageAdapter } from '@/lib/cms';
import ChangePasswordModal from './change-password-modal';

export default function AdminToolbar() {
    const {
        admin,
        setAdminMode,
        saveToStorage,
        resetToDefaults,
        exportData,
        importData
    } = useCMS();

    const [isExpanded, setIsExpanded] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [storageInfo, setStorageInfo] = useState({ used: 0, available: 0, percentage: 0 });
    const [showImportModal, setShowImportModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Update storage info periodically
    useEffect(() => {
        const updateStorageInfo = () => {
            const info = storageAdapter.getStorageInfo();
            setStorageInfo(info);
        };
        updateStorageInfo();
        const interval = setInterval(updateStorageInfo, 5000);
        return () => clearInterval(interval);
    }, []);

    // Don't render if not in admin mode or not authenticated
    if (!admin.isAdmin || !admin.isAuthenticated) {
        return null;
    }

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveToStorage();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            console.error('Failed to save:', error);
            alert('Failed to save. Storage might be full.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleExport = () => {
        const data = exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `al-hayat-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            const success = importData(content);
            if (success) {
                alert('Data imported successfully!');
                setShowImportModal(false);
            } else {
                alert('Failed to import data. Invalid format.');
            }
        };
        reader.readAsText(file);
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
            resetToDefaults();
            alert('Content reset to defaults.');
        }
    };

    const handleLogout = () => {
        setAdminMode(false);
        // Remove admin param from URL
        const url = new URL(window.location.href);
        url.searchParams.delete('admin');
        window.history.replaceState({}, '', url.toString());
    };

    return (
        <>
            {/* Main Toolbar */}
            <div
                className={`fixed top-0 left-0 right-0 z-[9998] transition-transform duration-300 ${isExpanded ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            {/* Left: Title & Status */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Settings className="text-cyan-400 animate-spin-slow" size={20} />
                                    <span className="font-semibold text-lg">Admin Mode</span>
                                </div>

                                {/* Storage Indicator */}
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                                    <HardDrive size={14} className="text-cyan-300" />
                                    <span className="text-xs text-cyan-100">
                                        {formatBytes(storageInfo.used)} / 5 MB
                                    </span>
                                    <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${storageInfo.percentage > 80 ? 'bg-red-400' :
                                                storageInfo.percentage > 50 ? 'bg-yellow-400' : 'bg-cyan-400'
                                                }`}
                                            style={{ width: `${Math.min(100, storageInfo.percentage)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Success Message */}
                                {showSuccess && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm animate-fade-in">
                                        <span>✓</span>
                                        <span>Saved!</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2">
                                {/* Save Button */}
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={16} className={isSaving ? 'animate-pulse' : ''} />
                                    <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
                                </button>

                                {/* Export Button */}
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                    title="Export Data"
                                >
                                    <Upload size={16} />
                                    <span className="hidden md:inline">Export</span>
                                </button>

                                {/* Import Button */}
                                <button
                                    onClick={() => setShowImportModal(true)}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                    title="Import Data"
                                >
                                    <Download size={16} />
                                    <span className="hidden md:inline">Import</span>
                                </button>

                                {/* Password Button */}
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                    title="Change Password"
                                >
                                    <Lock size={16} />
                                    <span className="hidden md:inline">Password</span>
                                </button>

                                {/* Reset Button */}
                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-red-500/50 transition-colors"
                                    title="Reset to Defaults"
                                >
                                    <RotateCcw size={16} />
                                    <span className="hidden md:inline">Reset</span>
                                </button>

                                {/* Divider */}
                                <div className="w-px h-8 bg-white/20 mx-2" />

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition-colors text-red-300"
                                >
                                    <LogOut size={16} />
                                    <span className="hidden sm:inline">Exit Admin</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-800 text-white rounded-b-lg shadow-lg hover:bg-slate-700 transition-colors"
                >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>

            {/* Collapsed Indicator */}
            {!isExpanded && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="fixed top-2 right-2 z-[9998] flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                    <Settings size={16} className="animate-spin-slow" />
                    <span className="text-sm font-medium">Admin</span>
                </button>
            )}

            {/* Spacer when toolbar is expanded */}
            {isExpanded && <div className="h-16" />}

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowImportModal(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                        <button
                            onClick={() => setShowImportModal(false)}
                            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">Import CMS Data</h3>
                        <p className="text-gray-500 mb-6">
                            Select a previously exported JSON file to restore content.
                        </p>

                        <label className="block">
                            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                                <div className="text-center">
                                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                    <span className="text-gray-600">Click to select JSON file</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImport}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            <ChangePasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />

            {/* Custom Styles */}
            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
