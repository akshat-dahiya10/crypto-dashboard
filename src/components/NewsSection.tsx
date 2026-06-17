'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type News = {
  title: string;
  url: string;
  source_info?: { name: string };
  published_at?: string;
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
        // 🔥 BETTER FREE API (more stable)
        const res = await fetch(
          'https://api.coingecko.com/api/v3/news'
        );

        const data = await res.json();

        if (data?.data?.length) {
          setNews(data.data.slice(0, 12));
        } else {
          setNews([]);
        }
      } catch (err) {
        console.error('News fetch error:', err);
        setNews([]); // ❗ fail safe
      } finally {
        setLoading(false); // 🔥 IMPORTANT FIX
      }
    };

    fetchNews();

    const interval = setInterval(fetchNews, 86400000); // 24h

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-5 text-white/40">Loading News...</div>;
  }

  if (!news.length) {
    return (
      <div className="p-5 text-white/40">
        ❌ Unable to load news (API limit or blocked)
      </div>
    );
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
              <span>{n.source_info?.name || 'Crypto News'}</span>
              <span>
                {n.published_at
                  ? new Date(n.published_at).toLocaleDateString()
                  : ''}
              </span>
            </div>

            <h3 className="text-sm font-semibold leading-snug">
              {n.title}
            </h3>

            <div className="mt-3 text-[11px] flex justify-between">
              <span className={sentiment.color}>
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
