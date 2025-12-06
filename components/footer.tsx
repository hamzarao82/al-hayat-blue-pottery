'use client';

import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter, FaYoutube, FaTiktok, FaPinterest, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useFooterData, useAdminMode } from '@/lib/cms';
import { EditButton, FooterEditorModal } from '@/components/admin';

// Map icon names to components
const ICON_MAP: Record<string, any> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
  twitter: FaTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  phone: FaPhone,
  map: FaMapMarkerAlt,
};

export default function Footer() {
  const { footer } = useFooterData();
  const { isAdmin, isAuthenticated } = useAdminMode();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Helper to get icon component
  const getIcon = (iconName: string) => {
    return ICON_MAP[iconName] || FaInstagram;
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-cream overflow-hidden">

        {/* Admin Edit Button */}
        {isAdmin && isAuthenticated && (
          <EditButton
            onClick={() => setIsEditorOpen(true)}
            label="Edit Footer"
            position="top-right"
            size="lg"
            className="!top-4 !right-4 z-50"
          />
        )}

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-caramel rounded-full blur-3xl"></div>
        </div>

        {/* Animated Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-caramel to-transparent animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold mb-2 group cursor-default">
                  <span className="text-caramel group-hover:text-amber-400 transition-colors duration-300">{footer.brandTitle}</span>
                  <br />
                  <span className="text-cream group-hover:text-cream/80 transition-colors duration-300">{footer.brandSubtitle}</span>
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-caramel to-transparent rounded-full"></div>
              </div>
              <p className="text-cream/70 text-sm leading-relaxed mb-6">
                {footer.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-cream/60">
                <FaHeart className="text-red-400 animate-pulse" />
                <span>Handmade with love since 1990</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6 relative inline-block">
                Shop
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-caramel rounded-full"></span>
              </h4>
              <ul className="space-y-3 text-sm">
                {['New Arrivals', 'Tableware', 'Decorative Pieces', 'Gift Sets', 'Sale Items'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-cream/70 hover:text-caramel hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group">
                      <span className="w-0 h-0.5 bg-caramel group-hover:w-3 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6 relative inline-block">
                About Us
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-caramel rounded-full"></span>
              </h4>
              <ul className="space-y-3 text-sm">
                {['Our Story', 'Craftsmanship', 'Artisans', 'Sustainability', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-cream/70 hover:text-caramel hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group">
                      <span className="w-0 h-0.5 bg-caramel group-hover:w-3 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="font-semibold text-lg mb-6 relative inline-block">
                Get in Touch
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-caramel rounded-full"></span>
              </h4>

              {/* Contact Info */}
              <div className="space-y-4 mb-6 text-sm">
                <a href={`tel:${footer.phone}`} className="flex items-start gap-3 text-cream/70 hover:text-caramel transition-colors duration-300 group">
                  <FaPhone className="mt-1 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{footer.phone}</span>
                </a>
                <a href={`mailto:${footer.email}`} className="flex items-start gap-3 text-cream/70 hover:text-caramel transition-colors duration-300 group">
                  <FaEnvelope className="mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <span>{footer.email}</span>
                </a>
                <div className="flex items-start gap-3 text-cream/70">
                  <FaMapMarkerAlt className="mt-1 text-caramel" />
                  <span className="whitespace-pre-line">{footer.address}</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-xs text-cream/60 mb-3 uppercase tracking-wider">Follow Us</p>
                <div className="flex gap-3 flex-wrap">
                  {footer.socialLinks?.map((link) => {
                    const Icon = getIcon(link.platform);
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredSocial(link.label)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        className="relative group"
                        aria-label={link.label}
                      >
                        <div className={`absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500`}></div>
                        <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-sm border border-cream/20 group-hover:border-transparent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <Icon className={`text-lg text-cream/70 group-hover:text-cream transition-colors duration-300 ${hoveredSocial === link.label ? 'animate-bounce' : ''}`} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-cream/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-cream/50 text-center md:text-left">
                {footer.copyrightText}
              </p>
              <div className="flex gap-6 text-xs text-cream/50">
                <a href="#" className="hover:text-caramel transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-caramel transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-caramel transition-colors duration-300">Shipping Info</a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-caramel/50 to-transparent"></div>
      </footer>

      {/* Footer Editor Modal */}
      <FooterEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
}

// Helper component for Links to avoid hydration errors with <a> tags in Next.js if needed, 
// but standard <a> for external links and Link for internal is fine.
// I used Link for internal nav items above.
import Link from 'next/link';
