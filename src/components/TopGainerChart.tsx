'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function TopGainerChart() {
  const [coin, setCoin] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. TOP GAINER
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'percent_change_24h_desc',
              per_page: 1,
              page: 1,
            },
          }
        );

        const topCoin = res.data[0];
        setCoin(topCoin);

        // 2. CHART DATA
        const chartRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${topCoin.id}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: 1,
            },
          }
        );

        const formatted = chartRes.data.prices.map((p: any) => ({
          time: new Date(p[0]).toLocaleTimeString(),
          price: p[1],
        }));

        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">
      
      <h2 className="text-sm text-white/60 mb-2">
        🚀 Top Gainer Today
      </h2>

      {coin && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {coin.name}
          </h3>
          <p className="text-green-400 text-sm">
            +{coin.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
      )}

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00f0ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
