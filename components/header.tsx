'use client';

import { useState } from 'react';
import { Menu, X, User, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import SearchDropdown from './search-dropdown';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/Picsart_25-11-22_18-30-01-618.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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
      <div className="bg-blue text-cream text-center py-2 text-xs sm:text-sm flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2">

        <div className="flex flex-wrap items-center gap-1 justify-center">
          <span>🚚</span>
          <span className="whitespace-nowrap">FREE SHIPPING ACROSS PAKISTAN</span>
          <span>📍</span>
        </div>

        <span className="hidden sm:block mx-2">|</span>

        <div className="flex flex-wrap items-center gap-1 justify-center">
          <span>🛡️</span>
          <span className="whitespace-nowrap">SAFE DELIVERY</span>
          <span>IS OUR RESPONSIBILITY</span>
          <span>⭐</span>
        </div>

      </div>

      {/* Main Header */}
      <header className="bg-cream border-b border-blue/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-2">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* LEFT — NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] flex-shrink-0 -ml-6 xl:-ml-14">

              <Link href="/new-arrivals" className="text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                New Arrivals
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
                <button className="text-blue hover:text-blue/70 text-sm font-medium px-3 py-2 flex items-center gap-1">
                  Products <ChevronDown size={16} />
                </button>

                {/* MAIN DROPDOWN PANEL */}
                <div className="absolute left-0 mt-1 bg-cream border border-blue/10 rounded-lg shadow-lg
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-40 p-2
                    w-56 md:w-60 max-w-[85vw]">

                  {/* TABLEWARE */}
                  <div
                    className="relative group/sub"
                    onMouseEnter={() => setOpenSubmenu('tableware')}
                  >
                    <button className="w-full flex justify-between items-center text-blue hover:bg-blue/5
                        px-3 py-2 rounded text-sm font-medium">
                      Tableware <ChevronRight size={14} />
                    </button>

                    {openSubmenu === 'tableware' && (
                      <div className="absolute top-0 left-full ml-2 bg-cream border border-blue/10 shadow-lg
                          rounded-lg w-48 sm:w-56 max-w-[80vw] z-50 p-2">
                        {dropdownItems.tableware.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-3 py-2 text-sm text-blue hover:bg-blue/10 rounded">
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
                    <button className="w-full flex justify-between items-center text-blue hover:bg-blue/5
                        px-3 py-2 rounded text-sm font-medium">
                      Decor <ChevronRight size={14} />
                    </button>

                    {openSubmenu === 'decor' && (
                      <div className="absolute top-0 left-full ml-2 bg-cream border border-blue/10 shadow-lg
                          rounded-lg w-48 sm:w-56 max-w-[80vw] z-50 p-2">
                        {dropdownItems.decor.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-3 py-2 text-sm text-blue hover:bg-blue/10 rounded">
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
                    <button className="w-full flex justify-between items-center text-blue hover:bg-blue/5
                        px-3 py-2 rounded text-sm font-medium">
                      Design Family <ChevronRight size={14} />
                    </button>

                    {openSubmenu === 'designFamily' && (
                      <div className="absolute top-0 left-full ml-2 bg-cream border border-blue/10 shadow-lg
                          rounded-lg w-48 sm:w-56 max-w-[80vw] z-50 p-2 max-h-48 overflow-y-auto">
                        {dropdownItems.designFamily.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-3 py-2 text-sm text-blue hover:bg-blue/10 rounded">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link href="/packaging-video" className="text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                Packaging
              </Link>

              <Link href="/sale" className="text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                SALE
              </Link>

              <Link href="/b-stock" className="text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                B-Stock
              </Link>
            </nav>

            {/* CENTER — LOGO */}
            <div className="flex-grow text-center ml-0 -ml-4 sm:-ml-20 md:-ml-40 lg:-ml-52 xl:-ml-60 mb-1">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Al Hayat Blue Pottery"
                  height={30}
                  width={180}
                  className="mx-auto max-w-[140px] sm:max-w-[160px] md:max-w-[180px]"
                />
              </Link>
            </div>

            {/* RIGHT — Search, Account, Cart */}
            <div className="flex items-center gap-2 sm:gap-3 mr-4 sm:mr-8 md:mr-10 lg:mr-12">

              <SearchDropdown isMobile={true} />

              <Link href="/account" className="text-blue hover:text-blue/70 p-2">
                <User size={20} />
              </Link>

              <Link href="/cart" className="text-blue hover:text-blue/70 p-2">
                <ShoppingCart size={20} />
              </Link>

              <button
                className="lg:hidden text-blue"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

            </div>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="lg:hidden pb-4 space-y-2 mt-2">

              <Link href="/new-arrivals" className="block text-blue font-medium px-3 py-2">
                New Arrivals
              </Link>

              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'products' ? null : 'products')}
                  className="w-full flex justify-between items-center text-blue px-3 py-2 text-sm font-medium"
                >
                  Products
                  <ChevronDown size={16}
                    className={`${openDropdown === 'products' ? 'rotate-180' : ''}`}
                  />
                </button>

                {openDropdown === 'products' && (
                  <div className="ml-4 mt-1 space-y-3">

                    <div>
                      <p className="text-blue font-semibold mb-1">Tableware</p>
                      <div className="bg-blue/5 rounded-md border-l-2 border-caramel">
                        {dropdownItems.tableware.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-4 py-2 text-blue hover:bg-blue/10">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-blue font-semibold mb-1">Decor</p>
                      <div className="bg-blue/5 rounded-md border-l-2 border-caramel">
                        {dropdownItems.decor.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-4 py-2 text-blue hover:bg-blue/10">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-blue font-semibold mb-1">Design Family</p>
                      <div className="bg-blue/5 rounded-md border-l-2 border-caramel max-h-52 overflow-y-auto">
                        {dropdownItems.designFamily.map(item => (
                          <Link key={item.label} href={item.href}
                            className="block px-4 py-2 text-blue hover:bg-blue/10">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              <Link href="/packaging-video" className="block text-blue font-medium px-3 py-2">
                Packaging
              </Link>

              <Link href="/sale" className="block text-blue font-medium px-3 py-2">
                SALE
              </Link>

              <Link href="/b-stock" className="block text-blue font-medium px-3 py-2">
                B-Stock
              </Link>

              <Link href="/account" className="block text-blue font-medium px-3 py-2">
                Account
              </Link>

            </div>
          )}

        </div>
      </header>
    </>
  );
}
