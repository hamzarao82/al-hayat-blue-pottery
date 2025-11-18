'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const cartItems = [
    { id: 1, name: 'Dinner Set Blue Classic', price: 1999, quantity: 1 },
    { id: 2, name: 'Blue Ceramic Vase', price: 1759, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 300;
  const tax = Math.round(subtotal * 0.17);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-serif font-bold text-blue mb-4">Order Placed Successfully!</h1>
            <p className="text-blue/70 mb-8">Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <p className="text-sm text-blue/60 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-blue mb-6">AHP-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              
              <div className="text-left">
                <p className="font-medium text-blue mb-4">Order Summary</p>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-blue/70 mb-3">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-blue/10 pt-4 mt-4">
                  <div className="flex justify-between text-blue mb-2">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-blue mb-2">
                    <span>Shipping</span>
                    <span>Rs {shipping}</span>
                  </div>
                  <div className="flex justify-between text-blue mb-2">
                    <span>Tax</span>
                    <span>Rs {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-caramel">
                    <span>Total</span>
                    <span>Rs {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/" className="inline-block bg-blue text-cream px-8 py-3 rounded-lg font-medium hover:bg-blue/90 transition">
              Continue Shopping
            </Link>
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
        <Link href="/cart" className="flex items-center gap-2 text-blue hover:text-blue/70 mb-8 font-medium">
          <ArrowLeft size={20} />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-serif font-bold text-blue mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder}>
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-blue mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="col-span-1 px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="col-span-1 px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue mb-4"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue mb-4"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue mb-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-blue mb-6">Payment Information</h2>
                
                <input
                  type="text"
                  name="cardName"
                  placeholder="Cardholder Name"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue mb-4"
                />

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (16 digits)"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={16}
                  className="w-full px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue mb-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    required
                    maxLength={5}
                    className="px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV (3 digits)"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={3}
                    className="px-4 py-3 border border-blue/20 rounded-lg text-blue placeholder-blue/50 focus:outline-none focus:border-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue text-cream py-4 rounded-lg font-bold text-lg hover:bg-blue/90 transition mb-4"
              >
                Place Order - Rs {total.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
              <h2 className="text-xl font-bold text-blue mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-blue/10">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-blue/70 text-sm">
                    <span>{item.name}</span>
                    <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-blue/70">
                  <span>Subtotal</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-blue/70">
                  <span>Shipping</span>
                  <span>Rs {shipping}</span>
                </div>
                <div className="flex justify-between text-blue/70">
                  <span>Tax (17%)</span>
                  <span>Rs {tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-blue/10 pt-4 flex justify-between">
                  <span className="font-bold text-blue">Total</span>
                  <span className="text-xl font-bold text-caramel">Rs {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
