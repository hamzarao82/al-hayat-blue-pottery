'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-serif font-bold text-blue text-center mb-2">Sign In</h1>
            <p className="text-center text-blue/60 mb-8">Welcome back to Al Hayat Blue Pottery</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-blue mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-caramel" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-blue/20 rounded-lg focus:outline-none focus:border-blue bg-cream/50 text-blue"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-blue mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-caramel" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2 border border-blue/20 rounded-lg focus:outline-none focus:border-blue bg-cream/50 text-blue"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-blue/60 hover:text-blue"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-blue/20 accent-caramel" />
                  <span className="text-sm text-blue/60">Remember me</span>
                </label>
                <a href="#" className="text-sm text-caramel hover:text-caramel/80 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-blue text-cream py-3 rounded-lg font-medium hover:bg-blue/90 transition mt-6"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-blue/60">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link href="/signup">
              <button className="w-full border-2 border-blue text-blue py-3 rounded-lg font-medium hover:bg-blue/5 transition">
                Create Account
              </button>
            </Link>

            <p className="text-center text-blue/60 text-xs mt-6">
              By signing in, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
