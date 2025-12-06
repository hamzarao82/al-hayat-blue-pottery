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

  const dropdownItems = {
    tableware: [
      { label: 'Dinner Sets', href: '/tableware/dinner-sets' },
      { label: 'Serving Dishes', href: '/tableware/serving-dishes' },
      { label: 'Plates & Platters', href: '/tableware/plates-platters' },
      { label: 'Bowls', href: '/tableware/bowls' },
      { label: 'Blue Pottery Karahi', href: '/tableware/blue-pottery-karahi' },
      { label: 'Handles & Cover Pots', href: '/tableware/handles-cover-pots' },
      { label: 'Pottery Jars', href: '/tableware/pottery-jars' },
      { label: 'Tea Mugs', href: '/tableware/tea-mugs' },
      { label: 'Tea Coasters', href: '/tableware/tea-coasters' },
    ],
    decor: [
      { label: 'Planters', href: '/decor/planters' },
      { label: 'Vases', href: '/decor/vases' },
      { label: 'Wall Hangings', href: '/decor/wall-hangings' },
      { label: 'Aromatic Warmers', href: '/decor/aromatic-warmers' },
      { label: 'Table Decoration', href: '/decor/table-decoration' },
      { label: 'Lamps', href: '/decor/lamps' },
    ],
    designFamily: [
      { label: 'Blue Felicity', href: '/design-family/blue-felicity' },
      { label: 'Blue Pattern', href: '/design-family/blue-pattern' },
      { label: 'Tranquility', href: '/design-family/tranquility' },
      { label: 'Serina Blue', href: '/design-family/serina-blue' },
      { label: 'Blue Flower', href: '/design-family/blue-flower' },
      { label: 'Blue Celico', href: '/design-family/blue-celico' },
      { label: 'Spring Pattern', href: '/design-family/spring-pattern' },
    ],
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

              <Link
                href="/new-arrivals"
                className="text-blue hover:text-caramel hover:bg-blue/5 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 relative group whitespace-nowrap"
              >
                New Arrivals
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-caramel group-hover:w-3/4 transition-all duration-300"></span>
              </Link>

              {/* PRODUCTS (MULTI LEVEL DROPDOWN) */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenDropdown('products')}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setOpenSubmenu(null);
                }}
              >
                <button className="text-blue hover:text-caramel hover:bg-blue/5 text-sm font-medium px-3 py-2 rounded-md flex items-center gap-1 transition-all duration-200 relative group/btn whitespace-nowrap">
                  Products
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-caramel group-hover/btn:w-3/4 transition-all duration-300"></span>
                </button>

                {/* MAIN DROPDOWN PANEL */}
                <div className="absolute left-0 mt-2 bg-cream/95 backdrop-blur-md border border-blue/10 rounded-lg shadow-xl
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2
                    w-56 md:w-60">

                  {/* TABLEWARE */}
                  <div
                    className="relative group/sub"
                    onMouseEnter={() => setOpenSubmenu('tableware')}
                  >
                    <button className="w-full flex justify-between items-center text-blue hover:bg-caramel/10 hover:text-caramel
                        px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
                      Tableware <ChevronRight size={14} className="group-hover/sub:translate-x-1 transition-transform duration-200" />
                    </button>

                    {openSubmenu === 'tableware' && (
                      <div className="absolute top-0 left-full ml-2 bg-cream/95 backdrop-blur-md border border-blue/10 shadow-xl
                          rounded-lg w-48 sm:w-56 max-w-[80vw] z-50 p-2 animate-in fade-in slide-in-from-left-2 duration-200">
                        {dropdownItems.tableware.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-3 py-2 text-sm text-blue hover:bg-caramel/10 hover:text-caramel hover:translate-x-1 rounded-md transition-all duration-200">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DECOR */}
                  <div
                    className="relative group/sub"
                    onMouseEnter={() => setOpenSubmenu('decor')}
                  >
                    <button className="w-full flex justify-between items-center text-blue hover:bg-caramel/10 hover:text-caramel
                        px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
                      Decor <ChevronRight size={14} className="group-hover/sub:translate-x-1 transition-transform duration-200" />
                    </button>

                    {openSubmenu === 'decor' && (
                      <div className="absolute top-0 left-full ml-2 bg-cream/95 backdrop-blur-md border border-blue/10 shadow-xl
                          rounded-lg w-48 sm:w-56 max-w-[80vw] z-50 p-2 animate-in fade-in slide-in-from-left-2 duration-200">
                        {dropdownItems.decor.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-3 py-2 text-sm text-blue hover:bg-caramel/10 hover:text-caramel hover:translate-x-1 rounded-md transition-all duration-200">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DESIGN FAMILY */}
                  <div
                    className="relative group/sub"
                    onMouseEnter={() => setOpenSubmenu('designFamily')}
                  >
                    <button className="w-full flex justify-between items-center text-blue hover:bg-caramel/10 hover:text-caramel
                        px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
                      Design Family <ChevronRight size={14} className="group-hover/sub:translate-x-1 transition-transform duration-200" />
                    </button>

                    {openSubmenu === 'designFamily' && (
                      <div className="absolute top-0 left-full ml-2 bg-cream/95 backdrop-blur-md border border-blue/10 shadow-xl
                          rounded-lg w-48 sm:w-56 max-w-[80vw] z-50 p-2 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-left-2 duration-200">
                        {dropdownItems.designFamily.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-3 py-2 text-sm text-blue hover:bg-caramel/10 hover:text-caramel hover:translate-x-1 rounded-md transition-all duration-200">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/packaging-video"
                className="text-blue hover:text-caramel hover:bg-blue/5 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 relative group whitespace-nowrap"
              >
                Packaging
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-caramel group-hover:w-3/4 transition-all duration-300"></span>
              </Link>

              <Link
                href="/sale"
                className="text-blue hover:text-caramel hover:bg-blue/5 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 relative group whitespace-nowrap"
              >
                SALE
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-caramel group-hover:w-3/4 transition-all duration-300"></span>
              </Link>

              <Link
                href="/b-stock"
                className="text-blue hover:text-caramel hover:bg-blue/5 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 relative group whitespace-nowrap"
              >
                B-Stock
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-caramel group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
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

              <Link href="/new-arrivals" className="block text-blue font-medium px-3 py-2 hover:bg-blue/5 rounded-md transition-colors">
                New Arrivals
              </Link>

              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'products' ? null : 'products')}
                  className="w-full flex justify-between items-center text-blue px-3 py-2 text-sm font-medium hover:bg-blue/5 rounded-md transition-colors"
                >
                  Products
                  <ChevronDown size={16}
                    className={`transition-transform duration-200 ${openDropdown === 'products' ? 'rotate-180' : ''}`}
                  />
                </button>

                {openDropdown === 'products' && (
                  <div className="ml-4 mt-1 space-y-3">

                    <div>
                      <p className="text-blue font-semibold mb-1 text-sm">Tableware</p>
                      <div className="bg-blue/5 rounded-md border-l-2 border-caramel">
                        {dropdownItems.tableware.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-4 py-2 text-sm text-blue hover:bg-blue/10 transition-colors">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-blue font-semibold mb-1 text-sm">Decor</p>
                      <div className="bg-blue/5 rounded-md border-l-2 border-caramel">
                        {dropdownItems.decor.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-4 py-2 text-sm text-blue hover:bg-blue/10 transition-colors">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-blue font-semibold mb-1 text-sm">Design Family</p>
                      <div className="bg-blue/5 rounded-md border-l-2 border-caramel max-h-52 overflow-y-auto">
                        {dropdownItems.designFamily.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-4 py-2 text-sm text-blue hover:bg-blue/10 transition-colors">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              <Link href="/packaging-video" className="block text-blue font-medium px-3 py-2 hover:bg-blue/5 rounded-md transition-colors">
                Packaging
              </Link>

              <Link href="/sale" className="block text-blue font-medium px-3 py-2 hover:bg-blue/5 rounded-md transition-colors">
                SALE
              </Link>

              <Link href="/b-stock" className="block text-blue font-medium px-3 py-2 hover:bg-blue/5 rounded-md transition-colors">
                B-Stock
              </Link>

              <Link href="/account" className="block text-blue font-medium px-3 py-2 hover:bg-blue/5 rounded-md transition-colors">
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
