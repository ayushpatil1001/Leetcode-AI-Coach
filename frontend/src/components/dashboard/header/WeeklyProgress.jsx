import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function WeeklyProgress() {
  const progress = 75;

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
            Weekly Milestone
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Weekly Goal Completion
          </h2>
        </div>
        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100">
          75% Complete
        </span>
      </div>

      <div>
        <div className="flex justify-between items-center text-sm font-semibold mb-2">
          <span className="text-slate-600">Weekly Target Progress</span>
          <span className="text-sky-600 font-bold">{progress}%</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-4 p-0.5 border border-slate-200/60 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 shadow-sm"
          />
        </div>
      </div>

      <Link
        to="/coach"
        className="
          mt-6
          w-full
          py-3.5
          rounded-xl
          liquid-button
          text-white
          font-bold
          text-center
          inline-block
          cursor-pointer
        "
      >
        Practice Next Problem 🚀
      </Link>
    </div>
  );
}