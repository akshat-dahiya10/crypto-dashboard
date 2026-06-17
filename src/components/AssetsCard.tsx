import { motion } from 'framer-motion';

const cards = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '6401,20',
    gradient: 'from-cyan-400 via-sky-500 to-purple-500',
    icon: '₿',
    pattern: 'btc',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    balance: '12.847',
    gradient: 'from-fuchsia-400 via-pink-500 to-rose-500',
    icon: 'Ξ',
    pattern: 'eth',
  },
];

function TopoPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay" viewBox="0 0 300 180" preserveAspectRatio="none">
      {[...Array(10)].map((_, i) => (
        <path
          key={i}
          d={`M0 ${30 + i * 14} Q 75 ${10 + (i % 3) * 20}, 150 ${40 + (i % 4) * 10} T 300 ${20 + i * 12}`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </svg>
  );
}

export default function AssetsCard() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl bg-[#101018] border border-white/5 p-5 card-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Your assets</h3>
          <p className="text-[11px] text-white/40 mt-0.5">Tap to manage cards</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.symbol}
            initial={{ rotateY: -10, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
            className={`relative overflow-hidden rounded-2xl aspect-[1.8/1] bg-gradient-to-br ${c.gradient} p-4 shadow-xl animate-float`}
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <TopoPattern />
            {/* Shine */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-black/30 backdrop-blur flex items-center justify-center text-white font-bold">
                  {c.icon}
                </div>
                <div>
                  <div className="text-[11px] text-white/80 font-medium">{c.name}</div>
                  <div className="text-[10px] text-white/60">Crypto card</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Balance</div>
                <div className="text-sm font-bold text-white tabular-nums">{c.balance} {c.symbol}</div>
              </div>
            </div>

            <div className="relative mt-auto pt-6 flex items-end justify-between">
              <div className="flex gap-1">
                {[...Array(12)].map((_, k) => (
                  <span key={k} className="w-1 h-3 rounded-sm bg-white/30" />
                ))}
              </div>
              <div className="text-[10px] text-white/80 font-mono tracking-widest">•••• 4829</div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-4 w-full text-[11px] font-medium py-2.5 rounded-xl border border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/20 transition">
        + Add new card
      </button>
    </motion.div>
  );
}
