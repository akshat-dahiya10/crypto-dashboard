import { motion } from 'framer-motion';
import { topCoins } from '../data/mock';
import { MoreHorizontal, RefreshCw, Filter } from 'lucide-react';

// Since react-sparklines may not be installed, we'll use a simple inline sparkline
function MiniSpark({ positive }: { positive: boolean }) {
  const data = positive
    ? [4, 6, 5, 8, 7, 10, 9, 12, 11, 14]
    : [14, 12, 13, 10, 11, 8, 9, 6, 7, 4];
  const w = 80;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(' ');
  const color = positive ? '#22c55e' : '#ef4444';
  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={`g-${positive ? 'p' : 'n'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={pts}
        style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}
      />
      <polygon
        fill={`url(#g-${positive ? 'p' : 'n'})`}
        points={`0,${h} ${pts} ${w},${h}`}
      />
    </svg>
  );
}

const gradients: Record<string, string> = {
  BTC: 'from-orange-400 to-amber-600',
  MATIC: 'from-violet-400 to-purple-600',
  XRP: 'from-slate-300 to-slate-500',
  AVAX: 'from-red-400 to-rose-600',
  SOL: 'from-fuchsia-400 to-pink-500',
  ADA: 'from-sky-400 to-blue-600',
};

export default function TopCoinsTable() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="rounded-2xl bg-[#101018] border border-white/5 p-5 card-hover"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold">CoinMarketCap 100 Index Constituents</h3>
          <p className="text-[11px] text-white/40 mt-0.5">Top movers · updated 2 min ago</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
          <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-white/50" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-white/40">
              <th className="text-left font-medium py-3 pl-3 w-8">#</th>
              <th className="text-left font-medium py-3">Coin</th>
              <th className="text-right font-medium py-3 hidden md:table-cell">Price</th>
              <th className="text-right font-medium py-3 hidden sm:table-cell">Trend</th>
              <th className="text-right font-medium py-3">Market Cap</th>
              <th className="text-right font-medium py-3 pr-3">Coin Weight</th>
            </tr>
          </thead>
          <tbody>
            {topCoins.map((c, i) => {
              const positive = c.change > 0;
              return (
                <motion.tr
                  key={c.symbol}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="group border-t border-white/[0.04] hover:bg-white/[0.02] transition"
                >
                  <td className="py-3 pl-3 text-white/40 text-xs tabular-nums">{c.rank}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                          gradients[c.symbol] || 'from-slate-400 to-slate-600'
                        } flex items-center justify-center text-black font-bold text-xs shadow-lg`}
                      >
                        {c.symbol[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium leading-tight">{c.name}</div>
                        <div className="text-[10px] text-white/40">{c.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right hidden md:table-cell tabular-nums font-medium">
                    ${c.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 hidden sm:table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <MiniSpark positive={positive} />
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          positive ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {positive ? '▲' : '▼'} {Math.abs(c.change).toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-right tabular-nums text-white/70">
                    ${c.cap.toLocaleString()}
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(c.weight, 100)}%` }}
                          transition={{ duration: 1.2, delay: 0.6 + i * 0.05, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        />
                      </div>
                      <span className="text-xs tabular-nums text-white/60 w-10 text-right">
                        {c.weight.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
