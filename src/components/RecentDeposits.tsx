import { motion } from 'framer-motion';
import { deposits } from '../data/mock';
import { MoreHorizontal, ArrowUpRight } from 'lucide-react';

export default function RecentDeposits() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl bg-[#101018] border border-white/5 p-5 card-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Recent deposits</h3>
          <p className="text-[11px] text-white/40 mt-0.5">Last 7 days activity</p>
        </div>
        <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center">
          <MoreHorizontal className="w-4 h-4 text-white/50" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {deposits.map((d, i) => (
          <motion.div
            key={d.coin}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-black font-bold text-sm shrink-0 shadow-lg`}
            >
              {d.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{d.coin}</span>
              </div>
              <div className="text-[11px] text-white/40">{d.type} · {d.time}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold tabular-nums text-green-400 flex items-center gap-0.5 justify-end">
                <ArrowUpRight className="w-3 h-3" />
                {d.amount}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-3 w-full text-[11px] text-cyan-400 hover:text-cyan-300 font-medium py-2 rounded-lg hover:bg-cyan-400/5 transition">
        Show more →
      </button>
    </motion.div>
  );
}
