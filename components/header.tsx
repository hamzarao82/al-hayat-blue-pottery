'use client';

import { useState } from 'react';
import { Menu, X, User, ShoppingCart, ChevronDown, Search } from 'lucide-react';
import SearchDropdown from './search-dropdown';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
      {/* Top banner */}
      <div className="bg-blue text-cream text-center py-2 text-xs sm:text-sm">
        FREE SHIPPING ACROSS PAKISTAN | SAFE DELIVERY IS OUR RESPONSIBILITY
      </div>

      {/* Main header */}
      <header className="bg-cream border-b border-blue/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 min-w-fit">
              <Link href="/">
                <h1 className="text-base sm:text-lg md:text-2xl font-serif font-bold text-blue">
                  Al Hayat <span className="text-caramel">Blue Pottery</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <a href="/new-arrivals" className="text-blue hover:text-blue/70 text-xs xl:text-sm font-medium transition px-2 xl:px-3 py-2 whitespace-nowrap">
                New Arrival
              </a>
              
              {/* Tableware dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('tableware')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-blue hover:text-blue/70 text-xs xl:text-sm font-medium transition px-2 xl:px-3 py-2 flex items-center gap-1 whitespace-nowrap">
                  Tableware
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 mt-0 max-h-96 overflow-y-auto w-48 bg-cream border border-blue/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-40">
                  {dropdownItems.tableware.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-blue hover:bg-blue/5 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Decor dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('decor')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-blue hover:text-blue/70 text-xs xl:text-sm font-medium transition px-2 xl:px-3 py-2 flex items-center gap-1 whitespace-nowrap">
                  Decor
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-cream border border-blue/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-40">
                  {dropdownItems.decor.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-blue hover:bg-blue/5 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Design Family dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('designFamily')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-blue hover:text-blue/70 text-xs xl:text-sm font-medium transition px-2 xl:px-3 py-2 flex items-center gap-1 whitespace-nowrap">
                  Design Family
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 mt-0 max-h-80 overflow-y-auto w-48 bg-cream border border-blue/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-40">
                  {dropdownItems.designFamily.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-blue hover:bg-blue/5 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <a href="/packaging-video" className="text-blue hover:text-blue/70 text-xs xl:text-sm font-medium transition px-2 xl:px-3 py-2 whitespace-nowrap">
                Packaging
              </a>
              <a href="/sale" className="text-blue hover:text-blue/70 text-xs xl:text-sm font-medium transition px-2 xl:px-3 py-2 whitespace-nowrap">
                SALE
              </a>
              <a href="/b-stock" className="text-blue hover:text-blue/70 text-xs xl:text-sm font-medium transition px-2 xl:px-3 py-2 whitespace-nowrap">
                B-Stock
              </a>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              <SearchDropdown isMobile={true} />

              {/* Account icon */}
              <Link href="/account" className="text-blue hover:text-blue/70 transition p-1.5 sm:p-2">
                <User size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Link>

              {/* Cart icon */}
              <Link href="/cart" className="text-blue hover:text-blue/70 transition p-1.5 sm:p-2">
                <ShoppingCart size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Link>
            </div>

            {/* Mobile/Tablet menu button */}
            <button
              className="lg:hidden text-blue ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile/Tablet menu */}
          {isOpen && (
            <div className="lg:hidden pb-4 space-y-2 max-h-96 overflow-y-auto">
              <Link href="/new-arrivals" className="block text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                New Arrival
              </Link>
              
              {/* Mobile Tableware */}
              <div>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'tableware' ? null : 'tableware')}
                  className="w-full text-left text-blue hover:text-blue/70 text-sm font-medium px-3 py-2 flex items-center justify-between"
                >
                  Tableware
                  <ChevronDown size={16} className={`transition ${openDropdown === 'tableware' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'tableware' && (
                  <div className="bg-blue/5 rounded-md ml-3 mt-1 border-l-2 border-caramel max-h-64 overflow-y-auto">
                    {dropdownItems.tableware.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-blue hover:bg-blue/10"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Decor */}
              <div>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'decor' ? null : 'decor')}
                  className="w-full text-left text-blue hover:text-blue/70 text-sm font-medium px-3 py-2 flex items-center justify-between"
                >
                  Decor
                  <ChevronDown size={16} className={`transition ${openDropdown === 'decor' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'decor' && (
                  <div className="bg-blue/5 rounded-md ml-3 mt-1 border-l-2 border-caramel max-h-64 overflow-y-auto">
                    {dropdownItems.decor.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-blue hover:bg-blue/10"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Design Family */}
              <div>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'designFamily' ? null : 'designFamily')}
                  className="w-full text-left text-blue hover:text-blue/70 text-sm font-medium px-3 py-2 flex items-center justify-between"
                >
                  Design Family
                  <ChevronDown size={16} className={`transition ${openDropdown === 'designFamily' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'designFamily' && (
                  <div className="bg-blue/5 rounded-md ml-3 mt-1 border-l-2 border-caramel max-h-64 overflow-y-auto">
                    {dropdownItems.designFamily.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-blue hover:bg-blue/10"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/packaging-video" className="block text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                Packaging Video
              </Link>
              <Link href="/sale" className="block text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                SALE
              </Link>
              <Link href="/b-stock" className="block text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                B-Stock
              </Link>
              <Link href="/account" className="block text-blue hover:text-blue/70 text-sm font-medium px-3 py-2">
                Account
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
