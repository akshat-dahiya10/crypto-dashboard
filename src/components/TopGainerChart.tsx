'use client';

import { useEffect, useState, useRef } from 'react';

// ===============================
// 🔥 SYMBOL MAP (FIX FOR XLM ETC)
// ===============================
const symbolMap: Record<string, string> = {
  bitcoin: 'BTCUSDT',
  ethereum: 'ETHUSDT',
  ripple: 'XRPUSDT',
  solana: 'SOLUSDT',
  cardano: 'ADAUSDT',
  dogecoin: 'DOGEUSDT',
  stellar: 'XLMUSDT',
};

// ===============================
// 📊 TradingView Chart
// ===============================
function TradingViewChart({ symbol = 'BTCUSDT' }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      //@ts-ignore
      new window.TradingView.widget({
        container_id: 'tv_chart_container',
        symbol: `BINANCE:${symbol}`,
        interval: '60',
        theme: 'dark',
        style: '1',
        locale: 'en',
        width: '100%',
        height: 400,
      });
    };

    container.current.appendChild(script);
  }, [symbol]);

  return <div id="tv_chart_container" ref={container} />;
}

// ===============================
// 🚀 MAIN COMPONENT
// ===============================
export default function TopGainerChart() {
  const [coin, setCoin] = useState<any>(null);
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [search, setSearch] = useState('');
  const [signal, setSignal] = useState('HOLD 🤝');
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(true);

  // ===============================
  // 🏆 FETCH TOP GAINER
  // ===============================
  const fetchTopGainer = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_desc'
      );

      const data = await res.json();
      const top = data[0];

      setCoin(top);

      const mappedSymbol =
        symbolMap[top.id] ||
        top.symbol.toUpperCase() + 'USDT';

      setSymbol(mappedSymbol);

      generateSignal(top.id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🔍 SEARCH COIN
  // ===============================
  const handleSearch = async () => {
    if (!search) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );

      const data = await res.json();

      if (!data.coins.length) return;

      const coinId = data.coins[0].id;

      const coinRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );

      const coinData = await coinRes.json();

      setCoin(coinData);

      const mappedSymbol =
        symbolMap[coinData.id] ||
        coinData.symbol.toUpperCase() + 'USDT';

      setSymbol(mappedSymbol);

      generateSignal(coinId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🧠 AI SIGNAL ENGINE
  // ===============================
  const generateSignal = async (coinId: string) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );

      const data = await res.json();
      const prices = data.prices.map((p: any) => p[1]);

      if (prices.length < 6) return;

      let gains = 0;
      let losses = 0;

      for (let i = 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        if (diff > 0) gains += diff;
        else losses -= diff;
      }

      const rs = gains / (losses || 1);
      const rsi = 100 - 100 / (1 + rs);

      const ema = (period: number) => {
        const k = 2 / (period + 1);
        let val = prices[0];
        for (let i = 1; i < prices.length; i++) {
          val = prices[i] * k + val * (1 - k);
        }
        return val;
      };

      const ema9 = ema(9);
      const ema21 = ema(21);

      // ✅ FIXED MOMENTUM
      const last = prices[prices.length - 1];
      const prev = prices[prices.length - 5];
      const momentum = ((last - prev) / prev) * 100;

      let score = 0;

      if (rsi < 30) score += 2;
      if (rsi > 70) score -= 2;

      if (ema9 > ema21) score += 2;
      else score -= 2;

      if (momentum > 3) score += 2;
      if (momentum < -3) score -= 2;

      if (score >= 4) setSignal('BUY 🟢');
      else if (score <= -4) setSignal('SELL 🔴');
      else setSignal('HOLD 🤝');

      setConfidence(Math.min(100, Math.abs(score) * 20));
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // ⚡ INITIAL LOAD
  // ===============================
  useEffect(() => {
    fetchTopGainer();
  }, []);

  // ✅ SAFE PRICE
  const price =
    coin?.current_price ??
    coin?.market_data?.current_price?.usd ??
    0;

  return (
    <div className="p-6 bg-black text-white rounded-2xl space-y-4">
      {/* 🔍 Search */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-800 w-full"
        />
        <button
          onClick={handleSearch}
          className="px-4 bg-blue-600 rounded"
        >
          Search
        </button>
      </div>

      {/* 📊 Info */}
      {coin && !loading && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p>💰 ${price}</p>
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
      <TradingViewChart symbol={symbol} />
    </div>
  );
}
