import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FloatingArt from "./FloatingArt";

export default function Hero() {
  return (
    <section className="relative z-10 pt-32 pb-16 lg:pt-36 lg:pb-20">
      {/* Ambient Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-100/30 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

        {/* Left Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-sky-100/90 text-sky-700 px-5 py-2 rounded-full font-extrabold text-xs mb-6 border border-sky-200 shadow-xs"
          >
            🚀 AI Powered Coding Mentor
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-800"
          >
            Master{" "}
            <span className="text-sky-500 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 bg-clip-text text-transparent">
              LeetCode
            </span>{" "}
            <br />
            Like A Pro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-medium"
          >
            Get hints instead of answers, learn step-by-step thinking, analyze time complexity, and track your coding growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/coach"
                className="liquid-button text-white font-extrabold px-8 py-4 rounded-2xl text-center inline-block text-sm shadow-lg w-full sm:w-auto"
              >
                Try AI Coach 🚀
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/features"
                className="liquid-glass liquid-glass-hover text-sky-700 font-extrabold px-8 py-4 rounded-2xl text-center inline-block text-sm shadow-md w-full sm:w-auto"
              >
                Explore Features ✨
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column Floating Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center w-full"
        >
          <FloatingArt />
        </motion.div>

      </div>
    </section>
  );
}