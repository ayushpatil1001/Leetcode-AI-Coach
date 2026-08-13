import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Clock, 
  Cpu, 
  Code2, 
  Copy, 
  Check, 
  BookOpen, 
  Zap 
} from "lucide-react";

export default function ExplanationCard({ explanation }) {
  const [copied, setCopied] = useState(false);

  if (!explanation) return null;

  const handleCopyCode = () => {
    if (explanation.solution_code) {
      navigator.clipboard.writeText(explanation.solution_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const steps = Array.isArray(explanation.steps) ? explanation.steps : [];
  const timeComp = explanation.complexity?.time || "O(N) - Linear time complexity";
  const spaceComp = explanation.complexity?.space || "O(1) - Constant auxiliary space";

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="liquid-glass rounded-3xl p-8 space-y-10 relative overflow-hidden"
    >
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
        <motion.div
          whileHover={{ rotate: -10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-3 bg-sky-50 text-sky-500 rounded-2xl shadow-sm border border-sky-100/80"
        >
          <BookOpen className="w-7 h-7" />
        </motion.div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Direct Explanation & Solution Guide
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Intuitive breakdown, step-by-step algorithm guide, and complexity analysis
          </p>
        </div>
      </div>

      {/* Direct Explanation / Core Logic */}
      {explanation.logic && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.005 }}
          className="bg-gradient-to-br from-sky-50/90 to-blue-50/40 rounded-2xl p-6 border border-sky-100 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-all" />
          <h3 className="text-xl font-bold text-sky-900 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-sky-600" />
            Core Intuition & Direct Explanation
          </h3>
          <p className="text-slate-700 leading-relaxed text-base relative z-10">
            {explanation.logic}
          </p>
        </motion.div>
      )}

      {/* Step-by-Step Guide */}
      {steps.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-500" />
            Step-by-Step Guide
          </h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 + 0.25 }}
                whileHover={{ scale: 1.01, x: 4 }}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-sky-500 text-white font-bold flex items-center justify-center text-sm shadow-md group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {step}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Complexity Analysis Section - Highlighted Time Complexity */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-500" />
          Complexity Analysis
        </h3>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Time Complexity Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-sky-50/90 via-blue-50/50 to-white border border-sky-200/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-sky-400/15 rounded-full blur-2xl -mr-6 -mt-6 group-hover:scale-125 transition-all"></div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-sky-500 text-white rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Primary Metric
                </span>
                <h4 className="text-lg font-bold text-slate-800">
                  Time Complexity
                </h4>
              </div>
            </div>
            <div className="mt-4 inline-block bg-sky-100 text-sky-800 font-mono font-bold px-4 py-2 rounded-xl text-base border border-sky-200 shadow-2xs">
              {timeComp}
            </div>
          </motion.div>

          {/* Space Complexity Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-gray-50/50 to-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-slate-700 text-white rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Memory Usage
                </span>
                <h4 className="text-lg font-bold text-slate-800">
                  Space Complexity
                </h4>
              </div>
            </div>
            <div className="mt-4 inline-block bg-slate-100 text-slate-700 font-mono font-bold px-4 py-2 rounded-xl text-base border border-slate-200 shadow-2xs">
              {spaceComp}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Code Solution Section */}
      {explanation.solution_code && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="pt-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-sky-500" />
              Optimal Solution Code
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyCode}
              className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </motion.button>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900 group">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-mono text-sky-400 font-semibold capitalize">
                {explanation.language ? `${explanation.language} Solution` : "Optimal Solution"}
              </span>
              <span>Optimal Approach</span>
            </div>
            <pre className="p-6 text-emerald-400 overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm leading-relaxed selection:bg-sky-500 selection:text-white">
              {explanation.solution_code}
            </pre>
          </div>
        </motion.div>
      )}

    </motion.div>
  );
}