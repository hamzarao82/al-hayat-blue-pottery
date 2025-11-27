'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, Tag, Truck, Shield, Gift } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Handcrafted Blue Pottery Tea Set', price: 2499, discount: 28, quantity: 1, image: '/blue-pottery-tea-set.jpg' },
    { id: 2, name: 'Blue Ceramic Plates Set', price: 1999, discount: 20, quantity: 2, image: '/blue-ceramic-plates-set.jpg' },
    { id: 3, name: 'Traditional Blue Pottery Bowl', price: 899, discount: 15, quantity: 1, image: '/blue-pottery-bowls-collection.jpg' },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'POTTERY10') {
      setPromoApplied(true);
    }
  };

  const calculateItemPrice = (item: CartItem) => {
    return Math.round(item.price * (1 - item.discount / 100));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (calculateItemPrice(item) * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 300;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - promoDiscount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-3">Shopping Cart</h1>
          <p className="text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const itemPrice = calculateItemPrice(item);
                const originalPrice = item.price;

                return (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-32 h-32 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden group">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {item.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {item.discount}% OFF
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-blue-900 mb-2 hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-bold text-orange-600">
                              Rs {itemPrice.toLocaleString()}
                            </span>
                            {item.discount > 0 && (
                              <>
                                <span className="text-sm text-gray-400 line-through">
                                  Rs {originalPrice.toLocaleString()}
                                </span>
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                  Save Rs {(originalPrice - itemPrice).toLocaleString()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Control */}
                          <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-9 h-9 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all shadow-sm hover:shadow"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-bold text-lg text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-9 h-9 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all shadow-sm hover:shadow"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Subtotal & Remove */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                              <p className="font-bold text-xl text-blue-900">
                                Rs {(itemPrice * item.quantity).toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Promo Code Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-blue-900">Have a promo code?</h3>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g., POTTERY10)"
                    className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={promoApplied}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${promoApplied
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                      }`}
                  >
                    {promoApplied ? '✓ Applied' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-green-600 font-medium mt-3">
                    🎉 Promo code applied! You saved Rs {promoDiscount.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">Order Summary</h2>

                {/* Benefits */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Truck className="text-blue-600" size={18} />
                    </div>
                    <span>{shipping === 0 ? 'Free shipping applied!' : 'Add Rs ' + (5000 - subtotal).toLocaleString() + ' for free shipping'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Shield className="text-green-600" size={18} />
                    </div>
                    <span>Safe & secure delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Gift className="text-purple-600" size={18} />
                    </div>
                    <span>Premium gift packaging</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `Rs ${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span className="font-semibold">- Rs {promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-orange-600">Rs {total.toLocaleString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/checkout'}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                  <Link
                    href="/"
                    className="block w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-center text-gray-500">
                    🔒 Secure checkout powered by SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={64} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Discover our exquisite collection of handcrafted blue pottery from Multan and add some beautiful pieces to your cart!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag size={20} />
              Start Shopping
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
