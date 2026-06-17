'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type News = {
  title: string;
  url: string;
  source: string;
  published_on: number;
};

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const getSentiment = (title: string) => {
    const t = title.toLowerCase();

    if (t.includes('surge') || t.includes('bull') || t.includes('rise'))
      return { label: 'Bullish', color: 'text-green-400' };

    if (t.includes('crash') || t.includes('fall') || t.includes('bear'))
      return { label: 'Bearish', color: 'text-red-400' };

    return { label: 'Neutral', color: 'text-yellow-400' };
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
        );
        const data = await res.json();

        setNews(data.Data.slice(0, 12));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();

    // 🔥 Auto refresh every 24h
    const interval = setInterval(fetchNews, 86400000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-5 text-white/40">Loading News...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {news.map((n, i) => {
        const sentiment = getSentiment(n.title);

        return (
          <motion.a
            key={i}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition"
          >
            <div className="text-xs text-white/40 mb-2 flex justify-between">
              <span>{n.source}</span>
              <span>
                {new Date(n.published_on * 1000).toLocaleDateString()}
              </span>
            </div>

            <h3 className="text-sm font-semibold leading-snug">
              {n.title}
            </h3>

            <div className="mt-3 text-[11px] flex justify-between">
              <span className={`${sentiment.color}`}>
                {sentiment.label}
              </span>
              <span className="text-white/30">Read →</span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
