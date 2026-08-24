import React, { useState } from 'react';
import { 
  updateProfile, 
  verifyBeforeUpdateEmail, 
  RecaptchaVerifier, 
  linkWithPhoneNumber 
} from 'firebase/auth';
import { auth } from '../firebase';

export default function ProfileModal({ isOpen, onClose, currentUser, onLogout }) {
  // States
  const [editingField, setEditingField] = useState(null); // 'name', 'email', 'phone'
  const [displayName, setDisplayName] = useState(currentUser?.displayName || currentUser?.email?.split('@')[0] || '');
  const [newEmail, setNewEmail] = useState(currentUser?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  if (!isOpen || !currentUser) return null;

  // 1. Name Update Function
  const handleSaveName = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      setMessage({ text: 'Name updated successfully!', type: 'success' });
      setEditingField(null);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // 2. Verified Email Change (Verification Link Sent)
  const handleSendEmailVerification = async (e) => {
    e.preventDefault();
    if (!newEmail || newEmail === currentUser.email) return;
    setLoading(true);
    try {
      // Firebase standard security: updates email only AFTER user clicks link sent to new email
      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
      setMessage({ 
        text: `Verification link sent to ${newEmail}. Please click it to finalize update!`, 
        type: 'success' 
      });
      setEditingField(null);
    } catch (error) {
      setMessage({ text: 'Error: Re-authentication or valid email required.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Setup Recaptcha for Phone Verification
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
  };

  // 3. Send Phone OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber.startsWith('+')) {
      setMessage({ text: 'Please include country code (e.g., +92XXXXXXXXXX)', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const result = await linkWithPhoneNumber(auth.currentUser, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setMessage({ text: 'OTP code sent to your phone!', type: 'success' });
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // 4. Verify OTP & Link Phone
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmationResult.confirm(otpCode);
      setMessage({ text: 'Phone number verified and linked successfully!', type: 'success' });
      setEditingField(null);
      setConfirmationResult(null);
    } catch (error) {
      setMessage({ text: 'Invalid OTP Code. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      {/* Invisible Recaptcha container */}
      <div id="recaptcha-container"></div>

      <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl text-white">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full transition-all"
        >
          ✕
        </button>

        {/* Header Avatar & Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-red-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg">
            {(displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            {editingField === 'name' ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-white/10 border border-orange-500 text-white rounded-lg px-2 py-1 text-sm font-semibold focus:outline-none w-full"
                  autoFocus
                />
                <button type="submit" disabled={loading} className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                  {loading ? '...' : 'Save'}
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold capitalize">{currentUser.displayName || currentUser.email.split('@')[0]}</h3>
                <button onClick={() => setEditingField('name')} className="text-gray-400 hover:text-orange-400 text-sm">✏️</button>
              </div>
            )}
            <span className="inline-block mt-1 text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
              Verified User
            </span>
          </div>
        </div>

        {/* Global Notification Banner */}
        {message.text && (
          <div className={`mb-4 p-3 border text-xs rounded-xl flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 'bg-red-500/20 border-red-500/30 text-red-300'
          }`}>
            <span>{message.type === 'success' ? '✓' : '⚠️'}</span> {message.text}
          </div>
        )}

        <div className="space-y-3">
          {/* EMAIL SECTION */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-base text-gray-400">✉️</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email Address</p>
                  <p className="text-xs font-mono text-gray-200 mt-0.5">{currentUser.email}</p>
                </div>
              </div>
              <button onClick={() => setEditingField(editingField === 'email' ? null : 'email')} className="text-gray-400 hover:text-orange-400 text-sm">✏️</button>
            </div>

            {editingField === 'email' && (
              <form onSubmit={handleSendEmailVerification} className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Enter new email address" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  required
                />
                <button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-1.5 rounded-xl text-xs">
                  {loading ? 'Sending Verification Link...' : 'Send Verification Email'}
                </button>
              </form>
            )}
          </div>

          {/* PHONE NUMBER SECTION */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-base text-gray-400">📱</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Phone Number</p>
                  <p className="text-xs font-mono text-gray-200 mt-0.5">{currentUser.phoneNumber || 'Not Linked'}</p>
                </div>
              </div>
              <button onClick={() => setEditingField(editingField === 'phone' ? null : 'phone')} className="text-gray-400 hover:text-orange-400 text-sm">✏️</button>
            </div>

            {editingField === 'phone' && (
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                {!confirmationResult ? (
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-2">
                    <input 
                      type="tel" 
                      placeholder="e.g. +923001234567" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      required
                    />
                    <button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-1.5 rounded-xl text-xs">
                      {loading ? 'Sending OTP...' : 'Send OTP Code'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP code" 
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      required
                    />
                    <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-xl text-xs">
                      {loading ? 'Verifying OTP...' : 'Verify OTP & Link Phone'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Account ID */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex items-center gap-3">
            <span className="text-base text-gray-400">🛡️</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Account ID</p>
              <p className="text-xs font-mono text-gray-300 truncate max-w-[260px] mt-0.5">{currentUser.uid}</p>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={onLogout}
          className="w-full mt-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <span>🚪</span> Sign Out of Account
        </button>

      </div>
    </div>
  );
}