import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-fire/20 via-dark-800 to-fire/10"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }}></div>

          <div className="relative px-6 sm:px-12 py-16 sm:py-20 text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Get <span className="gold-shimmer italic">Exclusive</span> Offers
            </h2>
            <p className="text-gray-300 max-w-md mx-auto mb-8 font-light">
              Subscribe for early access to new menu items, special discounts, and events.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-fire/50 focus:ring-1 focus:ring-fire/30 transition-all backdrop-blur-sm" />
              <button type="submit"
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  subscribed ? 'bg-green-500 text-white' : 'bg-fire hover:bg-fireLight text-white shadow-lg shadow-fire/20 hover:shadow-fire/40'
                }`}>
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}