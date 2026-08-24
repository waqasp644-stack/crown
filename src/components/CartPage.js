import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CartPage({ cart, updateQuantity, removeItem, onContinueShopping, clearCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Dubai'
  });
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Firebase Firestore database mein order save karna
      await addDoc(collection(db, "orders"), {
        customer: formData,
        items: cart,
        totalAmount: subtotal,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      alert(`Order Placed Successfully for ${formData.fullName}!`);

      // 2. Order hone k baad Cart empty karna aur page redirect karna
      if (clearCart) clearCart();
      if (onContinueShopping) onContinueShopping();
    } catch (error) {
      console.error("Error adding order: ", error);
      alert("Something went wrong while placing the order. Please check Firebase rules or internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1E293B] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-8 font-display">
          Shopping cart.
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
            <p className="text-gray-500 text-lg">Your shopping cart is currently empty.</p>
            <button
              onClick={onContinueShopping}
              className="px-6 py-3 bg-[#064E3B] hover:bg-[#043E2E] text-white font-semibold rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 last:border-none last:pb-0 gap-4"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-medium text-gray-400 block mb-0.5">
                        {item.category || 'Burgers'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="text-sm font-bold text-[#0F172A] mt-1">
                        AED {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-1.5 bg-gray-50/50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-black transition-colors px-2 font-medium text-sm"
                      >
                        –
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#0F172A]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-black transition-colors px-2 font-medium text-sm"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Remove item"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#0F172A]">Order summary</h2>

              <div className="space-y-3 border-b border-gray-100 pb-4 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0F172A]">AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className="font-semibold text-[#0F172A]">Free / Standard</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-base font-bold text-[#0F172A] pt-1">
                <span>Total</span>
                <span>AED {subtotal.toFixed(2)}</span>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-3.5 pt-2">
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#064E3B] transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#064E3B] transition-colors"
                />

                <textarea
                  name="address"
                  required
                  rows="3"
                  placeholder="Delivery Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#064E3B] transition-colors resize-none"
                ></textarea>

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#064E3B] transition-colors text-gray-700"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#064E3B] hover:bg-[#043E2E] active:scale-[0.99] disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md mt-4"
                >
                  <span>{loading ? 'Placing Order...' : 'Confirm & Place Order'}</span>
                  {!loading && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={onContinueShopping}
                  className="text-sm font-semibold text-[#064E3B] hover:underline"
                >
                  Continue shopping
                </button>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}