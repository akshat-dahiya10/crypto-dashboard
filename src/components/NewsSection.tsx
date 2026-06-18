'use client';

import { useEffect, useState } from 'react';

export default function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss'
      );

      const data = await res.json();

      if (data.status !== 'ok') throw new Error('API failed');

      setNews(data.items || []);
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
        ❌ Unable to load news
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {news.length === 0 ? (
        <p className="text-gray-400">Loading news...</p>
      ) : (
        news.slice(0, 6).map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            className="block p-3 bg-gray-800 rounded hover:bg-gray-700"
          >
            <p className="font-semibold">{item.title}</p>
          </a>
        ))
      )}
    </div>
  );
}
