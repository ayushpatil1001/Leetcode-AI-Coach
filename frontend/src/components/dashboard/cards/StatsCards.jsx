import { motion } from "framer-motion";
import CountUpRaw from "react-countup";
import { CheckCircle2, Circle, Flame, Trophy } from "lucide-react";

const CountUp = typeof CountUpRaw === "function" ? CountUpRaw : (CountUpRaw?.default || null);

export default function StatsCards({ dashboard }) {
  if (!dashboard?.profile?.matchedUser) {
    return null;
  }

  const stats = dashboard.profile.matchedUser.submitStats?.acSubmissionNum || [];

  const allCount = stats.find((s) => s.difficulty === "All")?.count || 0;
  const easyCount = stats.find((s) => s.difficulty === "Easy")?.count || 0;
  const mediumCount = stats.find((s) => s.difficulty === "Medium")?.count || 0;
  const hardCount = stats.find((s) => s.difficulty === "Hard")?.count || 0;

  const cards = [
    {
      title: "Total Solved",
      value: allCount,
      color: "from-sky-500 to-blue-600",
      icon: Trophy,
    },
    {
      title: "Easy Problems",
      value: easyCount,
      color: "from-emerald-400 to-emerald-600",
      icon: CheckCircle2,
    },
    {
      title: "Medium Problems",
      value: mediumCount,
      color: "from-amber-400 to-amber-600",
      icon: Circle,
    },
    {
      title: "Hard Problems",
      value: hardCount,
      color: "from-rose-500 to-rose-600",
      icon: Flame,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className="liquid-glass liquid-glass-hover rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                LeetCode Metrics
              </span>
            </div>

            <h3 className="mt-6 text-sm font-semibold text-slate-500">
              {card.title}
            </h3>

            <div className="text-4xl font-extrabold text-slate-800 tracking-tight mt-2">
              {CountUp ? (
                <CountUp end={card.value} duration={1.8} />
              ) : (
                card.value ? card.value.toLocaleString() : 0
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}