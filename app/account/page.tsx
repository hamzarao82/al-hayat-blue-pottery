'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { LogOut, User, Mail, Phone, MapPin } from 'lucide-react';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-serif font-bold text-blue text-center mb-8">Welcome</h1>
              
              <div className="space-y-4">
                <Link href="/login" className="w-full">
                  <button className="w-full bg-blue text-cream py-3 rounded-lg font-medium hover:bg-blue/90 transition">
                    Sign In
                  </button>
                </Link>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-blue/60">or</span>
                  </div>
                </div>

                <Link href="/signup" className="w-full">
                  <button className="w-full border-2 border-blue text-blue py-3 rounded-lg font-medium hover:bg-blue/5 transition">
                    Create Account
                  </button>
                </Link>
              </div>

              <p className="text-center text-blue/60 text-sm mt-6">
                By continuing, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-serif font-bold text-blue mb-8">My Account</h1>

          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-blue mb-6">Profile Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-blue/10">
                <User size={20} className="text-caramel" />
                <div>
                  <p className="text-sm text-blue/60">Full Name</p>
                  <p className="font-medium text-blue">Ahmed Hassan</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-blue/10">
                <Mail size={20} className="text-caramel" />
                <div>
                  <p className="text-sm text-blue/60">Email</p>
                  <p className="font-medium text-blue">ahmed.hassan@email.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-blue/10">
                <Phone size={20} className="text-caramel" />
                <div>
                  <p className="text-sm text-blue/60">Phone</p>
                  <p className="font-medium text-blue">+92 300 1234567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-caramel" />
                <div>
                  <p className="text-sm text-blue/60">Address</p>
                  <p className="font-medium text-blue">Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            <button className="mt-8 border-2 border-blue text-blue px-6 py-2 rounded-lg font-medium hover:bg-blue/5 transition">
              Edit Profile
            </button>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-blue mb-6">Recent Orders</h2>
            
            <div className="space-y-4">
              <div className="border border-blue/10 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-blue">Order #12345</p>
                  <span className="text-xs bg-caramel/20 text-caramel px-3 py-1 rounded-full">Delivered</span>
                </div>
                <p className="text-sm text-blue/60 mb-2">Dinner Set Blue Classic × 1</p>
                <p className="text-sm font-medium text-blue">Rs 1,999</p>
              </div>

              <div className="border border-blue/10 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-blue">Order #12344</p>
                  <span className="text-xs bg-blue/20 text-blue px-3 py-1 rounded-full">In Transit</span>
                </div>
                <p className="text-sm text-blue/60 mb-2">Tea Mug Blue Felicity × 3</p>
                <p className="text-sm font-medium text-blue">Rs 1,137</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
