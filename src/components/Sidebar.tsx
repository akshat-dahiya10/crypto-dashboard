import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart2,
  TrendingUp,
  Brain,
  Briefcase,
  Bell,
  Newspaper,   // 🆕 NEW ICON
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  market: BarChart2,
  gainers: TrendingUp,
  signals: Brain,
  portfolio: Briefcase,
  alerts: Bell,
  news: Newspaper,   // 🆕
  settings: Settings,
  help: HelpCircle,
};

type Item = { key: string; label: string; icon: string; badge?: number };

const items: Item[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'market', label: 'Market', icon: 'market' },
  { key: 'gainers', label: 'Top Movers', icon: 'gainers' },
  { key: 'signals', label: 'AI Signals', icon: 'signals' },
  { key: 'portfolio', label: 'Portfolio', icon: 'portfolio' },
  { key: 'alerts', label: 'Alerts', icon: 'alerts' },
  { key: 'news', label: 'News & Sentiment', icon: 'news', badge: 5 }, // 🔥 NEW FEATURE
  { key: 'settings', label: 'Settings', icon: 'settings' },
  { key: 'help', label: 'Help', icon: 'help' },
];

export default function Sidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (k: string) => void;
}) {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:flex flex-col w-[240px] shrink-0 bg-black/40 border-r border-white/5 p-5"
    >
      {/* 🔷 LOGO */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <span className="text-black font-bold text-sm">M</span>
        </div>
        <div>
          <div className="font-semibold text-[15px] leading-none">
            Money Lens
          </div>
          <div className="text-[10px] text-white/40 mt-1">
            Crypto OS
          </div>
        </div>
      </div>

      {/* 🔥 NAV */}
      <nav className="flex flex-col gap-1.5">
        {items.map((it) => {
          const Icon = iconMap[it.icon];
          const isActive = active === it.key;

          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {/* Active BG */}
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/10 border border-white/10"
                />
              )}

              {/* Active Left Bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-gradient-to-b from-cyan-400 to-purple-500" />
              )}

              {/* Icon */}
              <Icon className="w-4 h-4 relative z-10" />

              {/* Label */}
              <span className="relative z-10 font-medium">
                {it.label}
              </span>

              {/* 🔥 Badge (for News) */}
              {it.badge && (
                <span className="ml-auto relative z-10 text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded-md border border-pink-400/20 animate-pulse">
                  {it.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 🔻 FOOTER */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </motion.aside>
  );
}
