'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TopCoinsTable from './components/TopCoinsTable';
import StatsStrip from './components/StatsStrip';
import TopMovers from './components/TopMovers';
import TopGainerChart from './components/TopGainerChart';

export default function App() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen bg-bg text-white relative overflow-hidden">
      
      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 bg-grid" />
      <div className="pointer-events-none fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[120px]" />

      <div className="relative flex min-h-screen">
        
        {/* 🔵 SIDEBAR */}
        <Sidebar active={active} onChange={setActive} />

        {/* 🟢 MAIN */}
        <main className="flex-1 min-w-0 px-4 lg:px-8 pb-10">
          
          <Header />
          <StatsStrip />

          {/* 🔥 MAIN GRID */}
          <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
            
            {/* LEFT SIDE */}
            <div className="xl:col-span-2 flex flex-col gap-5">
              
              {/* 🚀 NEW: TOP GAINER CHART */}
              <TopGainerChart />

              {/* 📊 TOP MOVERS */}
              <TopMovers />

              {/* 📈 COINS TABLE */}
              <TopCoinsTable />
            </div>

            {/* RIGHT SIDE (balanced UI ke liye) */}
            <div className="flex flex-col gap-5">
              
              {/* Coming Soon Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <h2 className="text-sm font-semibold text-white/70 mb-2">
                  Coming Soon 🚀
                </h2>
                <p className="text-xs text-white/40">
                  Portfolio tracking, Watchlist, Alerts & AI insights yahan aayenge.
                </p>
              </div>

              {/* Tip Card */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-5">
                <p className="text-xs text-white/50">
                  Tip: Coins pe click karke detailed analytics open kar sakta hai.
                </p>
              </div>

            </div>

          </div>

          {/* FOOTER */}
          <footer className="mt-10 text-center text-[11px] text-white/30">
            MoneyLens · Premium Crypto OS · Built with ♥ for fintech
          </footer>
        </main>
      </div>
    </div>
  );
}
