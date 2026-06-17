import { motion } from 'framer-motion';
import { useState } from 'react';
import { btcSeries, timeframes, type Timeframe } from '../data/mock';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Wallet, Landmark, Coins, Users, Calendar } from 'lucide-react';

const tabs = [
  { key: 'portfolio', label: 'Portfolio', icon: Wallet },
  { key: 'funding', label: 'Funding', icon: Landmark },
  { key: 'assets', label: 'Assets', icon: Coins },
  { key: 'p2p', label: 'P2P', icon: Users },
];

export default function HeroCard() {
  const [tab, setTab] = useState('portfolio');
  const [tf, setTf] = useState<Timeframe>('1W');
  const [showBtc, setShowBtc] = useState(true);
  const [showEth, setShowEth] = useState(true);

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#0e0e18] via-[#11111c] to-[#0a0a12] card-hover"
    >
      {/* glow */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      <div className="relative p-6 lg:p-7">
        {/* Row: balance + tabs */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-white/50 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Total Balance
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl lg:text-4xl font-bold tracking-tight tabular-nums">
                0.97689522
              </span>
              <span className="text-lg text-white/60 font-medium">BTC</span>
            </div>
            <div className="mt-1 text-sm text-white/50 tabular-nums">$40,098.36</div>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-green-400/10 text-green-400 border border-green-400/20">
                ▲ +2.34%
              </span>
              <span className="text-[11px] text-white/40">vs last 24h</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
                    active
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="hero-tab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-white/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl bg-black/30 border border-white/5 p-4 lg:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
              {timeframes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTf(t)}
                  className={`px-3 py-1.5 text-[11px] rounded-lg font-medium transition ${
                    tf === t
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
              <button className="px-2 py-1.5 text-[11px] text-white/40 hover:text-white">
                <Calendar className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <span
                  onClick={() => setShowBtc((v) => !v)}
                  className={`w-2.5 h-2.5 rounded-full ${showBtc ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-white/20'}`}
                />
                <span className="text-white/60">BTC</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <span
                  onClick={() => setShowEth((v) => !v)}
                  className={`w-2.5 h-2.5 rounded-full ${showEth ? 'bg-fuchsia-400 shadow-[0_0_10px_#ec4899]' : 'bg-white/20'}`}
                />
                <span className="text-white/60">ETH</span>
              </label>
            </div>
          </div>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={btcSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="btcFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ethFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1c1c26" />
                <XAxis
                  dataKey="d"
                  tick={{ fill: '#8a8a99', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: '#8a8a99', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10,10,15,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    fontSize: 12,
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.8)',
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 600 }}
                  itemStyle={{ color: '#8a8a99' }}
                />
                {showBtc && (
                  <Area
                    type="monotone"
                    dataKey="btc"
                    stroke="#22d3ee"
                    strokeWidth={2.2}
                    fill="url(#btcFill)"
                    filter="url(#glow)"
                    animationDuration={1400}
                    dot={false}
                    activeDot={{ r: 5, fill: '#22d3ee', stroke: '#0a0a0f', strokeWidth: 2 }}
                  />
                )}
                {showEth && (
                  <Area
                    type="monotone"
                    dataKey="eth"
                    stroke="#ec4899"
                    strokeWidth={2.2}
                    fill="url(#ethFill)"
                    filter="url(#glow)"
                    animationDuration={1600}
                    dot={false}
                    activeDot={{ r: 5, fill: '#ec4899', stroke: '#0a0a0f', strokeWidth: 2 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
