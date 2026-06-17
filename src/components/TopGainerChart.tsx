'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// 🔥 TradingView Component (inline hi bana diya)
function TradingViewChart({ symbol = 'BTCUSDT' }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      new window.TradingView.widget({
        container_id: container.current.id,
        symbol: symbol,
        interval: '60',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#0f172a',
        enable_publishing: false,
        hide_top_toolbar: false,
        save_image: false,
        width: '100%',
        height: 400,
      });
    };

    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      id="tradingview_chart"
      ref={container}
      className="rounded-2xl overflow-hidden"
    />
  );
}

// ⏱ Filters
const ranges = [
  { label: '1D', value: 1 },
  { label: '7D', value: 7 },
  { label: '1M', value: 30 },
  { label: '1Y', value: 365 },
];

export default function TopGainerChart() {
  const [coin, setCoin] = useState<any>(null);
  const [days, setDays] = useState(1);
  const [search, setSearch] = useState('');

  // 🔥 Fetch Top Gainer OR Search Coin
  const fetchCoin = async () => {
    try {
      if (search) {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${search.toLowerCase()}`
        );
        setCoin(res.data);
      } else {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'price_change_percentage_24h_desc',
              per_page: 1,
              page: 1,
            },
          }
        );
        setCoin(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 Initial + filter change
  useEffect(() => {
    fetchCoin();
  }, [days]);

  // ⚡ Auto refresh every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCoin();
    }, 5000);

    return () => clearInterval(interval);
  }, [search, days]);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">
      
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm text-white/60">
          🚀 Top Gainer / Search Coin
        </h2>

        <input
          placeholder="Search (bitcoin, solana...)"
          className="bg-white/10 text-xs px-3 py-1 rounded-md outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchCoin()}
        />
      </div>

      {/* 🪙 COIN INFO */}
      {coin && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {coin.name}
          </h3>
          <p className="text-green-400 text-sm">
            +{coin.market_data
              ? coin.market_data.price_change_percentage_24h?.toFixed(2)
              : coin.price_change_percentage_24h?.toFixed(2)
            }%
          </p>
        </div>
      )}

      {/* ⏱ FILTERS */}
      <div className="flex gap-2 mb-4">
        {ranges.map((r) => (
          <button
            key={r.value}
            onClick={() => setDays(r.value)}
            className={`px-3 py-1 text-xs rounded-md ${
              days === r.value
                ? 'bg-cyan-500 text-black'
                : 'bg-white/10'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* 📊 TRADINGVIEW CHART */}
      <TradingViewChart
        symbol={
          coin?.symbol
            ? coin.symbol.toUpperCase() + 'USDT'
            : 'BTCUSDT'
        }
      />
    </div>
  );
}
