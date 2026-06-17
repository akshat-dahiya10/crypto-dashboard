import { Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 px-2 py-4"
    >
      <div>
        <h1 className="text-xl font-semibold">
          Hi <span className="text-gradient-brand">David</span>
        </h1>
        <p className="text-xs text-white/40">Welcome back to your portfolio</p>
      </div>

      <div className="ml-4 md:ml-10 flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-cyan-400 transition" />
          <input
            placeholder="Search assets, txs, wallets…"
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-white/30 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition"
          />
          <kbd className="hidden md:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition flex items-center justify-center">
          <Bell className="w-4 h-4 text-white/70" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-black" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-black">
              D
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-black" />
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium leading-tight">David K.</div>
            <div className="text-[10px] text-white/40">Pro · Verified</div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
