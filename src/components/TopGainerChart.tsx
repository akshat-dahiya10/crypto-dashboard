'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// ===============================
// 📊 TradingView Chart
// ===============================
function TradingViewChart({ symbol = 'BTCUSDT' }) {
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
        width: '100%',
        height: 400,
      });
    };

    container.current.appendChild(script);
  }, [symbol]);

  return <div id="tradingview_chart" ref={container} />;
}

// ===============================
// 🚀 MAIN COMPONENT
// ===============================
export default function TopGainerChart() {
  const [coin, setCoin] = useState<any>(null);
  const [search, setSearch] = useState('bitcoin');
  const [signal, setSignal] = useState('HOLD 🤝');
  const [confidence, setConfidence] = useState(0);

  // ===============================
  // 📡 FETCH COIN DATA
  // ===============================
  const fetchCoin = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${search}`
      );
      setCoin(res.data);

      generateSignal(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // 🧠 ULTIMATE AI ENGINE
  // ===============================
  const generateSignal = async (data: any) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${search}/market_chart?vs_currency=usd&days=14`
      );

      const prices = res.data.prices.map((p: any) => p[1]);
      const volumes = res.data.total_volumes.map((v: any) => v[1]);

      // RSI
      let gains = 0;
      let losses = 0;
      for (let i = 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        if (diff > 0) gains += diff;
        else losses -= diff;
      }
      const avgGain = gains / prices.length;
      const avgLoss = losses / prices.length || 1;
      const rs = avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);

      // EMA
      const ema = (period: number) => {
        const k = 2 / (period + 1);
        let emaVal = prices[0];
        for (let i = 1; i < prices.length; i++) {
          emaVal = prices[i] * k + emaVal * (1 - k);
        }
        return emaVal;
      };

      const ema9 = ema(9);
      const ema21 = ema(21);

      // MACD
      const macd = ema9 - ema21;

      // Volume
      const recentVol = volumes[volumes.length - 1];
      const avgVol =
        volumes.reduce((a: number, b: number) => a + b, 0) /
        volumes.length;
      const volumeSpike = recentVol > avgVol * 1.7;

      // Momentum
      const momentum =
        ((prices[prices.length - 1] - prices[prices.length - 10]) /
          prices[prices.length - 10]) *
        100;

      // Volatility
      const mean =
        prices.reduce((a: number, b: number) => a + b, 0) /
        prices.length;

      const variance =
        prices.reduce(
          (a: number, b: number) => a + Math.pow(b - mean, 2),
          0
        ) / prices.length;

      const volatility = Math.sqrt(variance);

      // ============================
      // 🧠 SCORING SYSTEM
      // ============================
      let score = 0;

      if (rsi < 30) score += 2;
      else if (rsi < 40) score += 1;
      else if (rsi > 70) score -= 2;
      else if (rsi > 60) score -= 1;

      if (ema9 > ema21) score += 2;
      else score -= 2;

      if (macd > 0) score += 1;
      else score -= 1;

      if (momentum > 5) score += 2;
      else if (momentum > 2) score += 1;
      else if (momentum < -5) score -= 2;
      else if (momentum < -2) score -= 1;

      if (volumeSpike) score += 2;

      if (volatility > mean * 0.05) score -= 1;

      // ============================
      // 🎯 FINAL OUTPUT
      // ============================
      if (score >= 6) {
        setSignal('ULTRA BUY 🚀🔥');
      } else if (score >= 3) {
        setSignal('BUY 🟢');
      } else if (score <= -6) {
        setSignal('ULTRA SELL 🔻🔥');
      } else if (score <= -3) {
        setSignal('SELL 🔴');
      } else {
        setSignal('HOLD 🤝');
      }

      setConfidence(Math.min(100, Math.abs(score) * 15));
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // ⚡ AUTO REFRESH
  // ===============================
  useEffect(() => {
    fetchCoin();

    const interval = setInterval(() => {
      fetchCoin();
    }, 5000);

    return () => clearInterval(interval);
  }, [search]);

  return (
    <div className="p-6 bg-black text-white rounded-2xl space-y-4">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="p-2 rounded bg-gray-800 w-full"
      />

      {/* 📊 Info */}
      {coin && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p>💰 ${coin.market_data.current_price.usd}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">AI Signal</p>
            <p className="text-lg font-bold">{signal}</p>
            <p className="text-sm text-gray-400">
              Confidence: {confidence}%
            </p>
          </div>
        </div>
      )}

      {/* 📊 Chart */}
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
