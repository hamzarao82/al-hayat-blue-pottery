'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ArrowLeft, Check, CreditCard, Lock, Truck, Shield, Package, MapPin, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
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
    { id: 1, name: 'Handcrafted Blue Pottery Tea Set', price: 2499, discount: 28, quantity: 1, image: '/blue-pottery-tea-set.jpg' },
    { id: 2, name: 'Blue Ceramic Plates Set', price: 1999, discount: 20, quantity: 2, image: '/blue-ceramic-plates-set.jpg' },
  ];

  const calculateItemPrice = (item: typeof cartItems[0]) => {
    return Math.round(item.price * (1 - item.discount / 100));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (calculateItemPrice(item) * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 300;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderNumber = 'AHP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(newOrderNumber);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-white">
        <Header />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Success Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <Check size={48} className="text-white" strokeWidth={3} />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-4">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Thank you for your purchase! Your order has been confirmed and will be carefully packaged and shipped soon.
            </p>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-3xl font-bold text-blue-900 mb-2">{orderNumber}</p>
                <p className="text-sm text-gray-600">
                  Confirmation email sent to <span className="font-semibold text-blue-600">{formData.email}</span>
                </p>
              </div>

              {/* Delivery Info */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Truck className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-600">Estimated Delivery</p>
                    <p className="font-semibold text-blue-900">3-5 Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Shield className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-600">Safe Delivery</p>
                    <p className="font-semibold text-green-900">Guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Package className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-600">Packaging</p>
                    <p className="font-semibold text-purple-900">Premium</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="text-left border-t border-gray-200 pt-6">
                <p className="font-bold text-lg text-blue-900 mb-4">Order Summary</p>
                <div className="space-y-3 mb-4">
                  {cartItems.map(item => {
                    const itemPrice = calculateItemPrice(item);
                    return (
                      <div key={item.id} className="flex justify-between text-gray-700">
                        <span>{item.name} x {item.quantity}</span>
                        <span className="font-semibold">Rs {(itemPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? <span className="text-green-600">FREE</span> : `Rs ${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-orange-600 pt-3 border-t border-gray-200">
                    <span>Total Paid</span>
                    <span>Rs {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-3">Secure Checkout</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Lock size={16} className="text-green-600" />
            <p className="text-sm">Your information is protected with SSL encryption</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-900">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="text-green-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-900">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />

                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number (16 digits)"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={16}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV (3 digits)"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      maxLength={3}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-4 rounded-xl">
                    <Lock size={16} className="text-blue-600" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Lock size={20} />
                Place Order - Rs {total.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map((item) => {
                  const itemPrice = calculateItemPrice(item);
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{item.name}</p>
                        <p className="text-sm font-bold text-orange-600">Rs {itemPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `Rs ${shipping}`
                    )}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-orange-600">Rs {total.toLocaleString()}</span>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Truck className="text-blue-600" size={16} />
                  </div>
                  <span>Free shipping on orders over Rs 5,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Shield className="text-green-600" size={16} />
                  </div>
                  <span>Safe & secure delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Package className="text-purple-600" size={16} />
                  </div>
                  <span>Premium gift packaging</span>
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
