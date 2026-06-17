'use client';

import { useEffect, useRef } from 'react';

export default function TradingViewChart({ symbol = 'BTCUSDT' }) {
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
