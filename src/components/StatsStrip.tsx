'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

export default function StatsStrip() {
  const [data, setData] = useState<any>(null);
  const [prevData, setPrevData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/global'
        );

        setPrevData(data);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  const format = (num: number) =>
    Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(num);

  // 🔥 Dynamic Change Calculation
  const getChange = (current: number, prev: number | null) => {
    if (!prev) return { value: '0%', positive: true };

    const change = ((current - prev) / prev) * 100;
    return {
      value: `${change > 0 ? '+' : ''}${change.toFixed(2)}%`,
      positive: change >= 0,
    };
  };

  const marketCapChange = getChange(
    data.total_market_cap.usd,
    prevData?.total_market_cap?.usd
  );

  const volumeChange = getChange(
    data.total_volume.usd,
    prevData?.total_volume?.usd
  );

  const btcChange = getChange(
    data.market_cap_percentage.btc,
    prevData?.market_cap_percentage?.btc
  );

  // simulated but dynamic feel
  const activeTrades = data.active_cryptocurrencies * 1200;

  const stats = [
    {
      label: '24h Volume',
      value: `$${format(data.total_volume.usd)}`,
      change: volumeChange.value,
      positive: volumeChange.positive,
      icon: Activity,
      accent: 'from-cyan-400/20 to-cyan-400/0',
      iconColor: 'text-cyan-400',
    },
    {
      label: 'Market Cap',
      value: `$${format(data.total_market_cap.usd)}`,
      change: marketCapChange.value,
      positive: marketCapChange.positive,
      icon: DollarSign,
      accent: 'from-purple-500/20 to-purple-500/0',
      iconColor: 'text-purple-400',
    },
    {
      label: 'BTC Dominance',
      value: `${data.market_cap_percentage.btc.toFixed(2)}%`,
      change: btcChange.value,
      positive: btcChange.positive,
      icon: btcChange.positive ? TrendingUp : TrendingDown,
      accent: 'from-pink-500/20 to-pink-500/0',
      iconColor: 'text-pink-400',
    },
    {
      label: 'Active Trades',
      value: format(activeTrades),
      change: '+Live',
      positive: true,
      icon: TrendingUp,
      accent: 'from-green-400/20 to-green-400/0',
      iconColor: 'text-green-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-[#101018] border border-white/5 p-4 card-hover"
          >
            <div
              className={`pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.accent} blur-2xl`}
            />

            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-[11px] text-white/50">{s.label}</div>
                <div className="mt-1 text-lg font-bold tabular-nums">
                  {s.value}
                </div>
              </div>

              <div
                className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${s.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="relative mt-2 flex items-center gap-1.5">
              <span
                className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${
                  s.positive
                    ? 'bg-green-400/10 text-green-400'
                    : 'bg-red-400/10 text-red-400'
                }`}
              >
                {s.change}
              </span>
              <span className="text-[10px] text-white/40">
                vs last refresh
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
