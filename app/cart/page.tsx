'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Dinner Set Blue Classic', price: 1999, quantity: 1, image: '/blue-pottery-tea-set.jpg' },
    { id: 2, name: 'Blue Ceramic Vase', price: 1759, quantity: 2, image: '/blue-ceramic-plates-set.jpg' },
    { id: 3, name: 'Tea Mug Blue Felicity', price: 379, quantity: 3, image: '/blue-pottery-bowls-collection.jpg' },
  ]);

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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 300;
  const tax = Math.round(subtotal * 0.17);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-2 text-blue hover:text-blue/70 mb-6 font-medium">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-serif font-bold text-blue mb-2">Shopping Cart</h1>
          <p className="text-blue/70">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6 hover:shadow-lg transition">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg bg-blue/5 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-blue mb-2">{item.name}</h3>
                      <p className="text-lg font-bold text-caramel">Rs {item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-blue/20 flex items-center justify-center text-blue hover:bg-blue/5 transition"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-12 text-center border border-blue/20 rounded py-1 text-blue focus:outline-none focus:border-blue"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-blue/20 flex items-center justify-center text-blue hover:bg-blue/5 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-fit">
                      <p className="text-sm text-blue/60 mb-2">Subtotal</p>
                      <p className="font-bold text-blue text-lg">Rs {(item.price * item.quantity).toLocaleString()}</p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-blue/40 hover:text-red-500 transition self-start pt-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
                <h2 className="text-2xl font-serif font-bold text-blue mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-blue/10">
                  <div className="flex justify-between text-blue/70">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-blue/70">
                    <span>Tax (17%)</span>
                    <span>Rs {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-blue/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-caramel font-medium">FREE</span> : `Rs ${shipping}`}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-blue">Total</span>
                  <span className="text-2xl font-bold text-caramel">Rs {total.toLocaleString()}</span>
                </div>

                {shipping === 0 && (
                  <p className="text-xs text-caramel mb-4 text-center">Free shipping applied!</p>
                )}

                <button onClick={() => window.location.href='/checkout'} className="w-full bg-blue text-cream py-3 rounded-lg font-medium hover:bg-blue/90 transition mb-3">
                  Proceed to Checkout
                </button>

                <Link href="/" className="block w-full border-2 border-blue text-blue py-3 rounded-lg font-medium hover:bg-blue/5 transition text-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="text-blue/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-blue mb-4">Your cart is empty</h2>
            <p className="text-blue/70 mb-8">Explore our beautiful blue pottery collection and add some items!</p>
            <Link href="/" className="inline-block bg-blue text-cream px-8 py-3 rounded-lg font-medium hover:bg-blue/90 transition">
              Start Shopping
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
