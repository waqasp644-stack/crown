import React from 'react';
import { ShoppingBagIcon, XIcon } from './Icons';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeItem }) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] text-white shadow-2xl flex flex-col justify-between border-l border-white/10">
          
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBagIcon size={22} className="text-[#10B981]" />
              <h2 className="text-lg font-bold text-white tracking-wide">Your Order</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <XIcon size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
                <ShoppingBagIcon size={48} className="opacity-30 text-gray-400" />
                <p className="text-sm font-medium">Your cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#18181b] border border-white/5 rounded-xl p-4 flex items-center justify-between shadow-md"
                >
                  <div className="flex-1 pr-3">
                    <h3 className="text-sm font-semibold text-white tracking-wide mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-[#10B981]">
                      AED {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#27272a] rounded-lg px-2 py-1 gap-3 border border-white/5">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-white transition-colors text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-white min-w-[12px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-white transition-colors text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500/80 hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-5 border-t border-white/10 bg-[#121212] space-y-4">
            <div className="flex items-center justify-between text-base font-bold">
              <span className="text-white">Total Amount:</span>
              <span className="text-[#10B981]">AED {totalAmount.toFixed(2)}</span>
            </div>

            <button 
              disabled={cart.length === 0}
              className="w-full bg-[#10B981] hover:bg-[#059669] active:scale-[0.99] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#10B981]/20 transition-all text-sm tracking-wide"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}