'use client';

import { useEffect, useState } from 'react';
import { fetchCoins } from '@/services/cryptoApi';
import { motion } from 'framer-motion';

export default function TopMovers() {
  const [gainers, setGainers] = useState<any[]>([]);
  const [losers, setLosers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const processData = (coins: any[]) => {
    const sorted = [...coins].sort(
      (a, b) =>
        b.price_change_percentage_24h - a.price_change_percentage_24h
    );

    setGainers(sorted.slice(0, 5));
    setLosers(sorted.slice(-5).reverse());
  };

  const loadData = async () => {
    setLoading(true);
    const data = await fetchCoins();
    processData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-white/50">Loading movers...</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      
      {/* GAINERS */}
      <motion.div className="bg-[#101018] p-4 rounded-2xl border border-white/5">
        <h3 className="text-sm font-semibold text-green-400 mb-3">
          🚀 Top Gainers
        </h3>

        {gainers.map((coin, i) => (
          <div
            key={coin.id}
            className="flex justify-between items-center py-2 border-b border-white/5 last:border-none"
          >
            <div className="flex items-center gap-2">
              <img src={coin.image} className="w-5 h-5" />
              <span className="text-sm">{coin.symbol.toUpperCase()}</span>
            </div>

            <span className="text-green-400 text-sm">
              +{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>

      {/* LOSERS */}
      <motion.div className="bg-[#101018] p-4 rounded-2xl border border-white/5">
        <h3 className="text-sm font-semibold text-red-400 mb-3">
          📉 Top Losers
        </h3>

        {losers.map((coin, i) => (
          <div
            key={coin.id}
            className="flex justify-between items-center py-2 border-b border-white/5 last:border-none"
          >
            <div className="flex items-center gap-2">
              <img src={coin.image} className="w-5 h-5" />
              <span className="text-sm">{coin.symbol.toUpperCase()}</span>
            </div>

            <span className="text-red-400 text-sm">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>

    </div>
  );
}
