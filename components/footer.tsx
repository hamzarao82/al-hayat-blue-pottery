'use client';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/alhayatbluepottery/",
      label: "Instagram",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/share/17DER9uZJd/",
      label: "Facebook",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/03126331041",
      label: "WhatsApp",
      color: "from-green-400 to-green-500"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-cream overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
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
                <span className="text-caramel group-hover:text-amber-400 transition-colors duration-300">Al Hayat</span>
                <br />
                <span className="text-cream group-hover:text-cream/80 transition-colors duration-300">Blue Pottery</span>
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-caramel to-transparent rounded-full"></div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Premium handcrafted blue pottery from Multan, bringing centuries of tradition and timeless elegance to your home.
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
                  <a
                    href="#"
                    className="text-cream/70 hover:text-caramel hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group"
                  >
                    <span className="w-0 h-0.5 bg-caramel group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </a>
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
                  <a
                    href="#"
                    className="text-cream/70 hover:text-caramel hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group"
                  >
                    <span className="w-0 h-0.5 bg-caramel group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </a>
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
              <a href="tel:03126331041" className="flex items-start gap-3 text-cream/70 hover:text-caramel transition-colors duration-300 group">
                <FaPhone className="mt-1 group-hover:rotate-12 transition-transform duration-300" />
                <span>+92 312 6331041</span>
              </a>
              <a href="mailto:info@alhayatbluepottery.com" className="flex items-start gap-3 text-cream/70 hover:text-caramel transition-colors duration-300 group">
                <FaEnvelope className="mt-1 group-hover:scale-110 transition-transform duration-300" />
                <span>info@alhayatbluepottery.com</span>
              </a>
              <div className="flex items-start gap-3 text-cream/70">
                <FaMapMarkerAlt className="mt-1 text-caramel" />
                <span>Multan, Punjab<br />Pakistan</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-xs text-cream/60 mb-3 uppercase tracking-wider">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className="relative group"
                    aria-label={label}
                  >
                    <div className={`absolute -inset-2 bg-gradient-to-r ${color} rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500`}></div>
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-sm border border-cream/20 group-hover:border-transparent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className={`text-lg text-cream/70 group-hover:text-cream transition-colors duration-300 ${hoveredSocial === label ? 'animate-bounce' : ''}`} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-cream/50 text-center md:text-left">
              © 2025 Al Hayat Blue Pottery. All rights reserved.
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
  );
}
