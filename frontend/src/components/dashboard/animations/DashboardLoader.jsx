import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InteractiveBackground from "../../InteractiveBackground";
import Navbar from "../../Navbar";

const STATUS_STEPS = [
  "⚡ Connecting to LeetCode GraphQL Engine...",
  "📊 Fetching Solved Problem Statistics & Difficulty Ratios...",
  "🔥 Syncing 365-Day Submission Heatmap & Active Streaks...",
  "🏆 Fetching Weekly Contest Rating Curve & Badges...",
  "🤖 AI Coach Generating Algorithmic Performance Insights...",
];

export default function DashboardLoader({ username = "PurpleCrayon" }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STATUS_STEPS.length);
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 12 : 95));
    }, 150);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 relative overflow-hidden">
      <InteractiveBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto pt-36 pb-20 px-6 relative z-10">
        {/* Animated Central Loading Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="liquid-glass rounded-3xl p-8 md:p-10 shadow-2xl border border-sky-200/90 text-center max-w-2xl mx-auto mb-12 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Spinner Ring Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-sky-200 border-t-sky-500 animate-spin" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xl shadow-md font-extrabold">
              ⚡
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200">
            Syncing @{username} Metrics
          </span>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
            Loading LeetCode Dashboard
          </h2>

          {/* Animated Status Message */}
          <div className="h-8 mt-3 flex items-center justify-center">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-xs md:text-sm font-semibold text-slate-600"
            >
              {STATUS_STEPS[stepIndex]}
            </motion.p>
          </div>

          {/* Light Blue Animated Progress Bar */}
          <div className="w-full bg-sky-100/70 rounded-full h-3.5 mt-6 p-0.5 border border-sky-200/80 overflow-hidden">
            <motion.div
              initial={{ width: "10%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 shadow-sm"
            />
          </div>
        </motion.div>

        {/* Shimmer Light Blue Skeleton Wireframe */}
        <div className="animate-pulse space-y-8 max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="h-52 rounded-3xl bg-white/80 border border-sky-100 backdrop-blur-md shadow-lg" />

          {/* 4 Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-36 rounded-3xl bg-white/80 border border-sky-100 backdrop-blur-md shadow-md" />
            ))}
          </div>

          {/* 2-Column Grid Skeleton */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-80 rounded-3xl bg-white/80 border border-sky-100 backdrop-blur-md shadow-md" />
            <div className="h-80 rounded-3xl bg-white/80 border border-sky-100 backdrop-blur-md shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
