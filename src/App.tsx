'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroCard from './components/HeroCard';
import RecentDeposits from './components/RecentDeposits';
import AssetsCard from './components/AssetsCard';
import TopCoinsTable from './components/TopCoinsTable';
import StatsStrip from './components/StatsStrip';
import TopMovers from './components/TopMovers';

export default function App() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen bg-bg text-white relative overflow-hidden">
      
      {/* 🌌 BACKGROUND EFFECTS */}
      <div className="pointer-events-none fixed inset-0 bg-grid" />
      <div className="pointer-events-none fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[120px]" />

      <div className="relative flex min-h-screen">
        
        {/* 🔵 SIDEBAR */}
        <Sidebar active={active} onChange={setActive} />

        {/* 🟢 MAIN CONTENT */}
        <main className="flex-1 min-w-0 px-4 lg:px-8 pb-10">
          
          <Header />
          <StatsStrip />

          {/* 🚀 HERO + MOVERS SECTION */}
          <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
            
            {/* LEFT SIDE */}
            <div className="xl:col-span-2 flex flex-col gap-5">
              <HeroCard />

              {/* 🔥 NEW: TOP MOVERS HERE */}
              <TopMovers />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-5">
              <RecentDeposits />
              <AssetsCard />
            </div>
          </div>

          {/* 📊 TABLE SECTION (FULL WIDTH) */}
          <div className="mt-5">
            <TopCoinsTable />
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
