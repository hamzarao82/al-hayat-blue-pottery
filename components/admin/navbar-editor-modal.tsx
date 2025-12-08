'use client';

/**
 * Navbar Editor Modal
 * Allows editing the top banner text, logo, and navigation items
 */

import React, { useState, useEffect } from 'react';
import { X, Save, LayoutTemplate, Image as ImageIcon, ChevronRight, ChevronLeft, Plus, Trash2, Edit2, GripVertical, Type, Link as LinkIcon, Folder } from 'lucide-react';
import { useNavbarData } from '@/lib/cms';
import { NavbarItem, NavDropdown, NavGroup, NavLink } from '@/lib/cms/types';
import { generateId } from '@/lib/cms/storage-adapter';
import ImageUploader from './image-uploader';

interface NavbarEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ViewState =
    | { type: 'root' }
    | { type: 'dropdown', index: number }
    | { type: 'group', dropdownIndex: number, groupIndex: number };

export default function NavbarEditorModal({ isOpen, onClose }: NavbarEditorModalProps) {
    const { navbar, updateNavbar } = useNavbarData();
    const [activeTab, setActiveTab] = useState<'general' | 'menu'>('general');
    const [viewStack, setViewStack] = useState<ViewState[]>([{ type: 'root' }]);

    const [editData, setEditData] = useState({
        topBannerLeft: navbar.topBannerLeft,
        topBannerRight: navbar.topBannerRight,
        logo: navbar.logo,
        items: navbar.items || [],
    });

    // Update local state when navbar data changes
    useEffect(() => {
        setEditData({
            topBannerLeft: navbar.topBannerLeft,
            topBannerRight: navbar.topBannerRight,
            logo: navbar.logo,
            items: navbar.items || [],
        });
    }, [navbar, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        updateNavbar(editData);
        onClose();
    };

    // Helper to get current view
    const currentView = viewStack[viewStack.length - 1];

    // Navigation Helpers
    const pushView = (view: ViewState) => setViewStack([...viewStack, view]);
    const popView = () => setViewStack(viewStack.slice(0, -1));

    // CRUD Helpers
    const updateRootItem = (index: number, updates: Partial<NavbarItem>) => {
        const newItems = [...editData.items];
        newItems[index] = { ...newItems[index], ...updates } as NavbarItem;
        setEditData({ ...editData, items: newItems });
    };

    const addRootItem = (type: 'link' | 'dropdown') => {
        const newItem: NavbarItem = type === 'link'
            ? { id: generateId(), type: 'link', label: 'New Link', href: '/' }
            : { id: generateId(), type: 'dropdown', label: 'New Dropdown', groups: [] };

        setEditData({ ...editData, items: [...editData.items, newItem] });
    };

    const deleteRootItem = (index: number) => {
        const newItems = editData.items.filter((_: NavbarItem, i: number) => i !== index);
        setEditData({ ...editData, items: newItems });
    };

    // Group CRUD
    const addGroup = (dropdownIndex: number) => {
        const newItems = [...editData.items];
        const dropdown = newItems[dropdownIndex] as NavDropdown;
        dropdown.groups = [...(dropdown.groups || []), {
            id: generateId(),
            type: 'group',
            label: 'New Section',
            items: []
        }];
        setEditData({ ...editData, items: newItems });
    };

    const updateGroup = (dropdownIndex: number, groupIndex: number, updates: Partial<NavGroup>) => {
        const newItems = [...editData.items];
        const dropdown = newItems[dropdownIndex] as NavDropdown;
        dropdown.groups[groupIndex] = { ...dropdown.groups[groupIndex], ...updates };
        setEditData({ ...editData, items: newItems });
    };

    const deleteGroup = (dropdownIndex: number, groupIndex: number) => {
        const newItems = [...editData.items];
        const dropdown = newItems[dropdownIndex] as NavDropdown;
        dropdown.groups = dropdown.groups.filter((_, i) => i !== groupIndex);
        setEditData({ ...editData, items: newItems });
    };

    // Nested Link CRUD
    const addNestedLink = (dropdownIndex: number, groupIndex: number) => {
        const newItems = [...editData.items];
        const dropdown = newItems[dropdownIndex] as NavDropdown;
        dropdown.groups[groupIndex].items.push({
            id: generateId(),
            type: 'link',
            label: 'New Link',
            href: '/'
        });
        setEditData({ ...editData, items: newItems });
    };

    const updateNestedLink = (dropdownIndex: number, groupIndex: number, linkIndex: number, updates: Partial<NavLink>) => {
        const newItems = [...editData.items];
        const dropdown = newItems[dropdownIndex] as NavDropdown;
        dropdown.groups[groupIndex].items[linkIndex] = { ...dropdown.groups[groupIndex].items[linkIndex], ...updates };
        setEditData({ ...editData, items: newItems });
    };

    const deleteNestedLink = (dropdownIndex: number, groupIndex: number, linkIndex: number) => {
        const newItems = [...editData.items];
        const dropdown = newItems[dropdownIndex] as NavDropdown;
        dropdown.groups[groupIndex].items = dropdown.groups[groupIndex].items.filter((_, i) => i !== linkIndex);
        setEditData({ ...editData, items: newItems });
    };

    // Render Functions
    const renderGeneralTab = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Top Banner</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Left Text</label>
                    <input
                        type="text"
                        value={editData.topBannerLeft}
                        onChange={(e) => setEditData({ ...editData, topBannerLeft: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Right Text</label>
                    <input
                        type="text"
                        value={editData.topBannerRight}
                        onChange={(e) => setEditData({ ...editData, topBannerRight: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Logo</h3>
                <ImageUploader
                    currentImage={editData.logo}
                    onImageChange={(base64) => setEditData({ ...editData, logo: base64 })}
                    label="Website Logo"
                    aspectRatio="landscape"
                    maxSizeKB={100}
                />
            </div>
        </div>
    );

    const renderRootView = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Manage main navigation items</p>
                <div className="flex gap-2">
                    <button onClick={() => addRootItem('link')} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1 transition-colors">
                        <Plus size={14} /> Link
                    </button>
                    <button onClick={() => addRootItem('dropdown')} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1 transition-colors">
                        <Plus size={14} /> Dropdown
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                {editData.items.map((item: NavbarItem, idx: number) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm hover:border-blue-300 transition-colors">
                        <GripVertical className="text-gray-400 cursor-move" size={16} />
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                {item.type === 'link' ? <LinkIcon size={14} className="text-blue-500" /> : <Folder size={14} className="text-orange-500" />}
                                <input
                                    type="text"
                                    value={item.label}
                                    onChange={(e) => updateRootItem(idx, { label: e.target.value })}
                                    className="px-2 py-1 border rounded text-sm w-40"
                                    placeholder="Label"
                                />
                                {item.type === 'link' && (
                                    <input
                                        type="text"
                                        value={(item as NavLink).href}
                                        onChange={(e) => updateRootItem(idx, { href: e.target.value })}
                                        className="px-2 py-1 border rounded text-sm flex-1 text-gray-600 font-mono"
                                        placeholder="/path"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {item.type === 'dropdown' && (
                                <button
                                    onClick={() => pushView({ type: 'dropdown', index: idx })}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                    title="Edit Sub-menu"
                                >
                                    <Edit2 size={16} />
                                </button>
                            )}
                            <button
                                onClick={() => deleteRootItem(idx)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDropdownView = (index: number) => {
        const item = editData.items[index] as NavDropdown;
        if (!item) return <div>Error: Item not found</div>;

        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                    <button onClick={popView} className="p-1 hover:bg-gray-100 rounded-full">
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-semibold">Editing: {item.label}</h3>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Manage sections (groups) inside this dropdown</p>
                    <button onClick={() => addGroup(index)} className="px-3 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md flex items-center gap-1 transition-colors">
                        <Plus size={14} /> Add Section
                    </button>
                </div>

                <div className="space-y-3">
                    {item.groups?.map((group, groupIdx) => (
                        <div key={group.id} className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <Type size={14} className="text-gray-500" />
                                    <input
                                        type="text"
                                        value={group.label}
                                        onChange={(e) => updateGroup(index, groupIdx, { label: e.target.value })}
                                        className="px-2 py-1 border rounded text-sm font-medium"
                                        placeholder="Section Title"
                                    />
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => pushView({ type: 'group', dropdownIndex: index, groupIndex: groupIdx })}
                                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors text-xs flex items-center gap-1"
                                    >
                                        <Edit2 size={12} /> Manage Links ({group.items.length})
                                    </button>
                                    <button onClick={() => deleteGroup(index, groupIdx)} className="p-1.5 text-red-500 hover:bg-red-100 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {(!item.groups || item.groups.length === 0) && (
                        <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed">
                            No sections yet. Add one to start.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderGroupView = (dropdownIndex: number, groupIndex: number) => {
        const dropdown = editData.items[dropdownIndex] as NavDropdown;
        const group = dropdown?.groups?.[groupIndex];

        if (!group) return <div>Error: Group not found</div>;

        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                    <button onClick={popView} className="p-1 hover:bg-gray-100 rounded-full">
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-semibold text-sm text-gray-500">
                        {dropdown.label} / <span className="text-black">{group.label}</span>
                    </h3>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Manage links in this section</p>
                    <button onClick={() => addNestedLink(dropdownIndex, groupIndex)} className="px-3 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md flex items-center gap-1 transition-colors">
                        <Plus size={14} /> Add Link
                    </button>
                </div>

                <div className="space-y-2">
                    {group.items.map((link, linkIdx) => (
                        <div key={link.id} className="flex items-center gap-2 p-2 bg-white border rounded shadow-sm">
                            <GripVertical className="text-gray-300 cursor-move" size={14} />
                            <input
                                type="text"
                                value={link.label}
                                onChange={(e) => updateNestedLink(dropdownIndex, groupIndex, linkIdx, { label: e.target.value })}
                                className="px-2 py-1 border rounded text-sm w-1/3"
                                placeholder="Link Name"
                            />
                            <input
                                type="text"
                                value={link.href}
                                onChange={(e) => updateNestedLink(dropdownIndex, groupIndex, linkIdx, { href: e.target.value })}
                                className="px-2 py-1 border rounded text-sm flex-1 text-gray-600 font-mono"
                                placeholder="/url"
                            />
                            <button onClick={() => deleteNestedLink(dropdownIndex, groupIndex, linkIdx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    {group.items.length === 0 && (
                        <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-lg border border-dashed text-sm">
                            No links in this section.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <LayoutTemplate size={24} />
                        Edit Navbar
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b bg-gray-50">
                    <button
                        onClick={() => { setActiveTab('general'); setViewStack([{ type: 'root' }]); }}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general' ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        General Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'menu' ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Menu Items
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {activeTab === 'general' ? renderGeneralTab() : (
                        <>
                            {currentView.type === 'root' && renderRootView()}
                            {currentView.type === 'dropdown' && renderDropdownView(currentView.index)}
                            {currentView.type === 'group' && renderGroupView(currentView.dropdownIndex, currentView.groupIndex)}
                        </>
                    )}
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
                        {activeTab === 'menu' && viewStack.length > 1 ? 'Save All & Close' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
