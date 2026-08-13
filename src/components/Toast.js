import React from 'react';
import { CheckIcon } from './Icons';

export default function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50" style={{ animation: 'toastIn 0.3s ease forwards' }}>
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-dark-700 border border-fire/30 shadow-2xl shadow-fire/10 backdrop-blur-xl">
        <div className="w-8 h-8 rounded-lg bg-fire/20 flex items-center justify-center">
          <CheckIcon size={16} className="text-fire" />
        </div>
        <span className="text-sm text-white font-medium">{message}</span>
      </div>
    </div>
  );
}