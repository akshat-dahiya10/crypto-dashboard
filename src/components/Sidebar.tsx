import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Package,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  invoice: FileText,
  products: Package,
  messages: MessageSquare,
  settings: Settings,
  help: HelpCircle,
};

type Item = { key: string; label: string; icon: string; badge?: number };

const items: Item[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'invoices', label: 'Invoices', icon: 'invoice', badge: 3 },
  { key: 'products', label: 'Products', icon: 'products' },
  { key: 'messages', label: 'Messages', icon: 'messages' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
  { key: 'help', label: 'Help', icon: 'help' },
];

export default function Sidebar({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="hidden lg:flex flex-col w-[240px] shrink-0 bg-black/40 border-r border-white/5 p-5"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <span className="text-black font-bold text-sm">M</span>
        </div>
        <div>
          <div className="font-semibold text-[15px] leading-none">Money lens</div>
          <div className="text-[10px] text-white/40 mt-1">Crypto OS</div>
        </div>
      </div>

      {/* Nav */}
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
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/10 border border-white/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-gradient-to-b from-cyan-400 to-purple-500" />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 font-medium">{it.label}</span>
              {it.badge ? (
                <span className="ml-auto relative z-10 text-[10px] bg-cyan-400/20 text-cyan-300 px-1.5 py-0.5 rounded-md border border-cyan-400/20">
                  {it.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </motion.aside>
  );
}
