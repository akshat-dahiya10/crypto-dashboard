'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MoreHorizontal, RefreshCw, Filter } from 'lucide-react';
import { fetchCoins } from '@/services/cryptoApi';

function MiniSpark({ positive }: { positive: boolean }) {
  const data = positive
    ? [4, 6, 5, 8, 7, 10, 9, 12, 11, 14]
    : [14, 12, 13, 10, 11, 8, 9, 6, 7, 4];

  const w = 80;
  const h = 28;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(' ');

  const color = positive ? '#22c55e' : '#ef4444';

  return (
    <svg width={w} height={h}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={pts}
      />
    </svg>
  );
}

export default function TopCoinsTable() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchCoins();
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-5 text-white/60">Loading live crypto data...</div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="rounded-2xl bg-[#101018] border border-white/5 p-5"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">Live Crypto Market</h3>

        <div className="flex gap-2">
          <button
            onClick={loadData}
            className="flex items-center gap-1 text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>

          <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-white/50" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase text-white/40">
              <th className="text-left py-3">#</th>
              <th className="text-left py-3">Coin</th>
              <th className="text-right py-3">Price</th>
              <th className="text-right py-3">24h</th>
              <th className="text-right py-3">Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin, i) => {
              const positive = coin.price_change_percentage_24h >= 0;

              return (
                <motion.tr
                  key={coin.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="py-3 text-white/40">{i + 1}</td>

                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6"
                      />
                      <div>
                        <div>{coin.name}</div>
                        <div className="text-xs text-white/40 uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 text-right">
                    ${coin.current_price.toLocaleString()}
                  </td>

                  <td
                    className={`py-3 text-right ${
                      positive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {positive ? '+' : ''}
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>

                  <td className="py-3 text-right text-white/70">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
