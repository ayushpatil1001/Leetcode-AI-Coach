import { motion } from "framer-motion";
import { BookOpen, Tag, Target } from "lucide-react";

export default function ProblemCard({ analysis }) {
  if (!analysis) return null;

  const getDifficultyBadge = (difficulty) => {
    const diff = (difficulty || "").toLowerCase();
    if (diff.includes("easy")) {
      return "bg-emerald-100 text-emerald-700 border-emerald-200/80 shadow-emerald-100/50";
    }
    if (diff.includes("medium")) {
      return "bg-amber-100 text-amber-700 border-amber-200/80 shadow-amber-100/50";
    }
    if (diff.includes("hard")) {
      return "bg-rose-100 text-rose-700 border-rose-200/80 shadow-rose-100/50";
    }
    return "bg-sky-100 text-sky-700 border-sky-200/80 shadow-sky-100/50";
  };

  const topics = Array.isArray(analysis.topics) ? analysis.topics : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass rounded-3xl p-8 relative overflow-hidden group"
    >
      {/* Decorative ambient background accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-all group-hover:scale-125" />

      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-3 bg-sky-50 text-sky-500 rounded-2xl shadow-sm border border-sky-100/80"
          >
            <BookOpen className="w-6 h-6" />
          </motion.div>
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Problem Overview
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {analysis.title || "LeetCode Problem"}
            </h2>
          </div>
        </div>

        {/* Difficulty Badge */}
        {analysis.difficulty && (
          <motion.span
            whileHover={{ scale: 1.06 }}
            className={`px-4 py-1.5 rounded-full font-bold text-sm border shadow-sm ${getDifficultyBadge(
              analysis.difficulty
            )}`}
          >
            {analysis.difficulty}
          </motion.span>
        )}
      </div>

      {/* Topics / Tags */}
      {topics.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-6 relative z-10">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Tag className="w-3.5 h-3.5" /> Topics:
          </span>
          {topics.map((topic, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06 + 0.2 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="bg-slate-100 text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs cursor-default transition-colors hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
            >
              {topic}
            </motion.span>
          ))}
        </div>
      )}

      {/* Summary Description */}
      {analysis.summary && (
        <div className="mt-6 relative z-10">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Problem Description
          </h3>
          <p className="text-slate-700 text-base leading-relaxed bg-slate-50/70 p-5 rounded-2xl border border-slate-100/80 shadow-inner">
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Expected Target Complexity */}
      {analysis.complexity && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-6 flex items-center gap-3 bg-gradient-to-r from-sky-50/90 to-blue-50/50 p-4 rounded-2xl border border-sky-100 shadow-xs relative z-10"
        >
          <div className="p-2 bg-sky-500 text-white rounded-xl shadow-sm">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
              Expected Target Complexity
            </span>
            <span className="text-sm font-semibold text-sky-950">
              {analysis.complexity}
            </span>
          </div>
        </motion.div>
      )}

    </motion.div>
  );
}