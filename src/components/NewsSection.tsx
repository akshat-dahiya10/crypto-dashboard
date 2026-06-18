'use client';

import { useEffect, useState } from 'react';

export default function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/news'
      );

      const data = await res.json();

      setNews(data.data || []);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (error) {
    return (
      <p className="text-red-400">
        ❌ Unable to load news (API error)
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">📰 News & Sentiment</h2>

      {news.slice(0, 5).map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          className="block p-3 bg-gray-800 rounded hover:bg-gray-700"
        >
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm text-gray-400">
            {item.source}
          </p>
        </a>
      ))}
    </div>
  );
}
