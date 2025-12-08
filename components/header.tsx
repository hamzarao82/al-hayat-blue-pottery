'use client';

import { useState } from 'react';
import { Menu, X, User, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import SearchDropdown from './search-dropdown';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/Picsart_25-11-22_18-30-01-618.png';
import { useNavbarData, useAdminMode } from '@/lib/cms';
import { EditButton, NavbarEditorModal } from '@/components/admin';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const { navbar } = useNavbarData();
  const { isAdmin, isAuthenticated } = useAdminMode();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Helper to render desktop navigation items
  const renderDesktopItem = (item: any) => {
    if (item.type === 'link') {
      return (
        <Link
          key={item.id}
          href={item.href}
          className="text-blue hover:text-caramel hover:bg-blue/5 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 relative group whitespace-nowrap"
        >
          {item.label}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-caramel group-hover:w-3/4 transition-all duration-300"></span>
        </Link>
      );
    }

    if (item.type === 'dropdown') {
      return (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setOpenDropdown(item.id)}
          onMouseLeave={() => {
            setOpenDropdown(null);
            setOpenSubmenu(null);
          }}
        >
          <button className="text-blue hover:text-caramel hover:bg-blue/5 text-sm font-medium px-3 py-2 rounded-md flex items-center gap-1 transition-all duration-200 relative group/btn whitespace-nowrap">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-caramel group-hover/btn:w-3/4 transition-all duration-300"></span>
          </button>

          {/* MAIN DROPDOWN PANEL */}
          <div className="absolute left-0 mt-2 bg-cream/95 backdrop-blur-md border border-blue/10 rounded-lg shadow-xl
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2
              w-56 md:w-60">

            {item.groups?.map((group: any) => (
              <div
                key={group.id}
                className="relative group/sub"
                onMouseEnter={() => setOpenSubmenu(group.id)}
              >
                <button className="w-full flex justify-between items-center text-blue hover:bg-caramel/10 hover:text-caramel
                    px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
                  {group.label} <ChevronRight size={14} className="group-hover/sub:translate-x-1 transition-transform duration-200" />
                </button>

                {openSubmenu === group.id && (
                  <div className="absolute top-0 left-full ml-2 bg-cream/95 backdrop-blur-md border border-blue/10 shadow-xl
                      rounded-lg w-48 sm:w-56 max-w-[80vw] z-50 p-2 animate-in fade-in slide-in-from-left-2 duration-200 max-h-[80vh] overflow-y-auto">
                    {group.items?.map((subItem: any) => (
                      <Link key={subItem.id} href={subItem.href}
                        className="block px-3 py-2 text-sm text-blue hover:bg-caramel/10 hover:text-caramel hover:translate-x-1 rounded-md transition-all duration-200">
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  // Helper to render mobile navigation items
  const renderMobileItem = (item: any) => {
    if (item.type === 'link') {
      return (
        <Link
          key={item.id}
          href={item.href}
          className="block text-blue font-medium px-3 py-2 hover:bg-blue/5 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    if (item.type === 'dropdown') {
      const isDropdownOpen = openDropdown === item.id;
      return (
        <div key={item.id}>
          <button
            onClick={() => setOpenDropdown(isDropdownOpen ? null : item.id)}
            className="w-full flex justify-between items-center text-blue px-3 py-2 text-sm font-medium hover:bg-blue/5 rounded-md transition-colors"
          >
            {item.label}
            <ChevronDown size={16}
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="ml-4 mt-1 space-y-3">
              {item.groups?.map((group: any) => (
                <div key={group.id}>
                  <p className="text-blue font-semibold mb-1 text-sm">{group.label}</p>
                  <div className="bg-blue/5 rounded-md border-l-2 border-caramel">
                    {group.items?.map((subItem: any) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-blue hover:bg-blue/10 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-blue text-cream text-center py-2 text-xs sm:text-sm flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2 relative">

        {/* Admin Edit Button */}
        {isAdmin && isAuthenticated && (
          <EditButton
            onClick={() => setIsEditorOpen(true)}
            label="Edit Navbar"
            position="top-right"
            size="sm"
            className="!top-1 !right-1 z-50"
          />
        )}

        <div className="flex flex-wrap items-center gap-1 justify-center">
          <span className="whitespace-nowrap">{navbar.topBannerLeft}</span>
        </div>

        <span className="hidden sm:block mx-2">|</span>

        <div className="flex flex-wrap items-center gap-1 justify-center">
          <span className="whitespace-nowrap">{navbar.topBannerRight}</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-cream border-b border-blue/10 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-cream/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* LEFT — LOGO */}
            <div className="flex-shrink-0 z-30">
              <Link href="/" className="inline-block group">
                {navbar.logo ? (
                  <img
                    src={navbar.logo}
                    alt="Al Hayat Blue Pottery"
                    className="h-12 sm:h-14 md:h-16 w-auto hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Image
                    src={logo}
                    alt="Al Hayat Blue Pottery"
                    height={70}
                    width={180}
                    className="h-12 sm:h-14 md:h-16 w-auto hover:scale-105 transition-transform duration-300"
                    priority
                  />
                )}
              </Link>
            </div>

            {/* CENTER — NAVIGATION */}
            <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 absolute left-1/2 -translate-x-1/2 z-20">
              {navbar.items?.map(renderDesktopItem)}
            </nav>

            {/* RIGHT — Search, Account, Cart, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 z-30">

              <SearchDropdown isMobile={true} />

              <Link href="/account" className="text-blue hover:text-caramel transition-colors duration-200 p-2">
                <User size={20} />
              </Link>

              <Link href="/cart" className="text-blue hover:text-caramel transition-colors duration-200 p-2">
                <ShoppingCart size={20} />
              </Link>

              <button
                className="lg:hidden text-blue hover:text-caramel transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

            </div>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="lg:hidden pb-4 space-y-2 mt-2">
              {navbar.items?.map(renderMobileItem)}

              <Link href="/account" className="block text-blue font-medium px-3 py-2 hover:bg-blue/5 rounded-md transition-colors" onClick={() => setIsOpen(false)}>
                Account
              </Link>
            </div>
          )}

        </div>
      </header>

      {/* Navbar Editor Modal */}
      <NavbarEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
}
