import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

const stats = [
  {
    label: '24h Volume',
    value: '$1.24B',
    change: '+5.4%',
    positive: true,
    icon: Activity,
    accent: 'from-cyan-400/20 to-cyan-400/0',
    iconColor: 'text-cyan-400',
  },
  {
    label: 'Market Cap',
    value: '$2.41T',
    change: '+1.8%',
    positive: true,
    icon: DollarSign,
    accent: 'from-purple-500/20 to-purple-500/0',
    iconColor: 'text-purple-400',
  },
  {
    label: 'BTC Dominance',
    value: '52.3%',
    change: '-0.4%',
    positive: false,
    icon: TrendingDown,
    accent: 'from-pink-500/20 to-pink-500/0',
    iconColor: 'text-pink-400',
  },
  {
    label: 'Active Trades',
    value: '24,801',
    change: '+12.4%',
    positive: true,
    icon: TrendingUp,
    accent: 'from-green-400/20 to-green-400/0',
    iconColor: 'text-green-400',
  },
];

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-[#101018] border border-white/5 p-4 card-hover"
          >
            <div className={`pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.accent} blur-2xl`} />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-[11px] text-white/50">{s.label}</div>
                <div className="mt-1 text-lg font-bold tabular-nums">{s.value}</div>
              </div>
              <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${s.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="relative mt-2 flex items-center gap-1.5">
              <span
                className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${
                  s.positive
                    ? 'bg-green-400/10 text-green-400'
                    : 'bg-red-400/10 text-red-400'
                }`}
              >
                {s.change}
              </span>
              <span className="text-[10px] text-white/40">vs yesterday</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
