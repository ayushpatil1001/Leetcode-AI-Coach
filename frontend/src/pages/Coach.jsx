import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProblemCard from "../components/ProblemCard";
import ExplanationCard from "../components/ExplanationCard";
import Navbar from "../components/Navbar";
import InteractiveBackground from "../components/InteractiveBackground";

import {
  analyzeProblem,
  explainProblem,
} from "../services/coachApi";

import toast, { Toaster } from "react-hot-toast";
import { Sparkles, Brain, Zap, Clock, Code2 } from "lucide-react";

// Loading steps list
const LOADING_STEPS = [
  {
    icon: Brain,
    title: "🧠 Reading & Understanding Problem Statement...",
    subtitle: "Parsing constraints, parameters, and core objective",
    color: "text-sky-500",
    borderColor: "border-sky-200",
    bgColor: "bg-sky-50/80"
  },
  {
    icon: Zap,
    title: "⚡ Formulating Optimal Logic & Algorithm...",
    subtitle: "Evaluating data structures and optimal approach",
    color: "text-amber-500",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50/80"
  },
  {
    icon: Clock,
    title: "📊 Computing Time & Space Complexity Analysis...",
    subtitle: "Determining exact Big-O runtime boundaries",
    color: "text-emerald-500",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50/80"
  },
  {
    icon: Sparkles,
    title: "✨ Almost there! Preparing step-by-step guide...",
    subtitle: "Finalizing intuitive breakdown and optimal solution code",
    color: "text-indigo-500",
    borderColor: "border-indigo-200",
    bgColor: "bg-indigo-50/80"
  }
];

export default function Coach() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [language, setLanguage] = useState("Python");

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast.error("Please enter a problem statement or LeetCode URL");
      return;
    }
    
    let interval;
    try {
      setLoading(true);
      setLoadingStep(0);
      setAnalysis(null);
      setExplanation(null);

      // Cycle through loading steps with longer 3s animation duration
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 3000);

      const [analysisRes, expRes] = await Promise.allSettled([
        analyzeProblem(input),
        explainProblem(input, language),
      ]);

      if (interval) clearInterval(interval);

      // Set to final step briefly before presenting results
      setLoadingStep(LOADING_STEPS.length - 1);
      await new Promise((r) => setTimeout(r, 600));

      if (analysisRes.status === "fulfilled") {
        setAnalysis(analysisRes.value);
      } else {
        toast.error("Failed to analyze problem");
      }

      if (expRes.status === "fulfilled") {
        setExplanation(expRes.value);
      }

      if (analysisRes.status === "fulfilled") {
        toast.success(`Problem analyzed & ${language} explanation generated!`);
      }
    } catch (err) {
      if (interval) clearInterval(interval);
      toast.error("Failed to analyze problem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentStepInfo = LOADING_STEPS[loadingStep];
  const StepIcon = currentStepInfo.icon;
  const progressPercent = Math.min(100, Math.round(((loadingStep + 1) / LOADING_STEPS.length) * 100));

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-sky-50/40 via-white to-slate-50 relative overflow-hidden">
      <Toaster position="top-right" />

      <InteractiveBackground />

      <Navbar />

      {/* Ambient Background Orbs */}
      <div className="absolute top-28 left-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-10 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-40 relative z-10">

        {/* Hero Section with Animations */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-2 bg-sky-100/80 text-sky-600 px-4 py-2 rounded-full mb-6 font-medium text-sm border border-sky-200/50 shadow-xs cursor-default"
          >
            <Sparkles size={18} className="text-sky-500" />
            AI Powered Problem Solving & Explanation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800"
          >
            🧠 Crack Any
            <span className="text-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"> Coding Problem</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
          >
            Get instant intuition, step-by-step guide, and detailed time & space complexity analysis tailored like a real software engineer.
          </motion.p>
        </motion.div>

        {/* Search & Language Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-12 space-y-4"
        >
          
          {/* Problem Input Field */}
          <div className="relative group">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste LeetCode URL or problem statement..."
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-sky-200
                bg-white/90
                backdrop-blur-xl
                px-5
                shadow-lg
                hover:shadow-xl
                outline-none
                focus:ring-2
                focus:ring-sky-400
                focus:border-sky-400
                transition-all
                duration-200
                text-slate-800
              "
            />
          </div>

          {/* Language Selector + Action Button Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 liquid-glass p-4 rounded-2xl">
            
            {/* Code Language Dropdown */}
            <div className="flex items-center gap-3 px-3 w-full sm:w-auto">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Code2 className="w-5 h-5 text-sky-500 flex-shrink-0" />
              </motion.div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                Target Code Language:
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-sky-200
                  bg-white/90
                  text-slate-800
                  font-bold
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-sky-400
                  cursor-pointer
                  transition-all
                  hover:bg-sky-50
                  w-full
                  sm:w-auto
                "
              >
                <option value="Python">Python 3</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="C#">C#</option>
                <option value="Go">Go</option>
                <option value="Rust">Rust</option>
                <option value="SQL">SQL</option>
              </select>
            </div>

            {/* Analyze & Explain Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAnalyze}
              disabled={loading}
              className="
                w-full
                sm:w-auto
                h-12
                px-8
                rounded-xl
                text-white
                font-bold
                liquid-button
                cursor-pointer
                flex
                items-center
                justify-center
                gap-2
                disabled:opacity-60
                disabled:cursor-not-allowed
                whitespace-nowrap
              "
            >
              {loading ? "Analyzing..." : "Analyze & Explain"}
            </motion.button>

          </div>

        </motion.div>

        {/* Animated Multi-Step Loading Screen */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-sky-100 text-center relative overflow-hidden">
              
              {/* Animated Top Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8 shadow-inner">
                <motion.div
                  className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </div>

              {/* Animated Message Stage */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingStep}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center py-6"
                >
                  <div className={`p-5 rounded-3xl ${currentStepInfo.bgColor} border ${currentStepInfo.borderColor} mb-6 shadow-md`}>
                    <StepIcon className={`w-12 h-12 ${currentStepInfo.color}`} />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                    {currentStepInfo.title}
                  </h3>

                  <p className="text-slate-500 text-base mt-3 max-w-md">
                    {currentStepInfo.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>
        )}

        {/* Analysis & Explanation Section */}
        {(!loading && (analysis || explanation)) && (
          <div className="mt-12 space-y-8 max-w-5xl mx-auto">
            
            {/* Problem Overview Card */}
            {analysis && (
              <ProblemCard analysis={analysis} />
            )}

            {/* Direct Explanation, Step-by-Step Guide & Complexity Analysis */}
            {explanation && (
              <ExplanationCard explanation={explanation} />
            )}

          </div>
        )}
      </div>
    </div>
  );
}