import { useState, useEffect } from "react";
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
import { Sparkles, Brain, Zap, Clock, Code2, History, Trash2, X, ChevronRight, BookOpen } from "lucide-react";

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
    color: "text-sky-600",
    borderColor: "border-sky-200",
    bgColor: "bg-sky-50/80"
  }
];

export default function Coach() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [language, setLanguage] = useState("Python");

  // History Drawer State
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("leetcode_coach_history");
      if (saved) {
        setHistoryList(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load coach history:", e);
    }
  }, []);

  // Save item to history
  const saveToHistory = (problemInput, lang, analysisData, expData) => {
    try {
      const newItem = {
        id: Date.now(),
        title: problemInput.length > 50 ? problemInput.substring(0, 50) + "..." : problemInput,
        fullInput: problemInput,
        language: lang,
        analysis: analysisData,
        explanation: expData,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: new Date().toLocaleDateString()
      };

      const updated = [newItem, ...historyList.filter((h) => h.fullInput !== problemInput)].slice(0, 15);
      setHistoryList(updated);
      localStorage.setItem("leetcode_coach_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save coach history:", e);
    }
  };

  const handleClearHistory = () => {
    setHistoryList([]);
    localStorage.removeItem("leetcode_coach_history");
    toast.success("Explanation history cleared");
  };

  const handleSelectHistoryItem = (item) => {
    setInput(item.fullInput);
    setLanguage(item.language || "Python");
    setAnalysis(item.analysis);
    setExplanation(item.explanation);
    setHistoryOpen(false);
    toast.success(`Loaded explanation for "${item.title}"`);
  };

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

      // Cycle through loading steps
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 3000);

      const [analysisRes, expRes] = await Promise.allSettled([
        analyzeProblem(input),
        explainProblem(input, language),
      ]);

      if (interval) clearInterval(interval);

      setLoadingStep(LOADING_STEPS.length - 1);
      await new Promise((r) => setTimeout(r, 600));

      let finalAnalysis = null;
      let finalExplanation = null;

      if (analysisRes.status === "fulfilled") {
        finalAnalysis = analysisRes.value;
        setAnalysis(finalAnalysis);
      } else {
        toast.error("Failed to analyze problem");
      }

      if (expRes.status === "fulfilled") {
        finalExplanation = expRes.value;
        setExplanation(finalExplanation);
      }

      if (finalAnalysis || finalExplanation) {
        saveToHistory(input, language, finalAnalysis, finalExplanation);
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

      {/* Floating Side History Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08, x: -3 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setHistoryOpen(!historyOpen)}
        className="
          fixed
          right-5
          top-32
          z-40
          bg-white/95
          backdrop-blur-xl
          border
          border-sky-200/90
          text-sky-700
          shadow-xl
          hover:shadow-2xl
          px-4
          py-2.5
          rounded-2xl
          flex
          items-center
          gap-2
          font-extrabold
          text-xs
          cursor-pointer
          transition-all
        "
        title="View Explanation History"
      >
        <History className="w-4 h-4 text-sky-500 animate-spin-slow" />
        <span className="hidden sm:inline">History</span>
        {historyList.length > 0 && (
          <span className="bg-sky-500 text-white font-extrabold px-2 py-0.5 rounded-full text-[10px]">
            {historyList.length}
          </span>
        )}
      </motion.button>

      {/* Side History Popover Modal / Drawer */}
      <AnimatePresence>
        {historyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end p-4 sm:p-6"
            onClick={() => setHistoryOpen(false)}
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="
                w-full
                max-w-md
                bg-white/95
                backdrop-blur-2xl
                rounded-3xl
                shadow-2xl
                border
                border-sky-200/90
                flex
                flex-col
                h-full
                max-h-[85vh]
                my-auto
                overflow-hidden
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-5 border-b border-sky-100 flex items-center justify-between bg-sky-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-100 text-sky-600">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base">Explanation History</h3>
                    <p className="text-[11px] font-semibold text-slate-400">
                      Previously analyzed LeetCode problems
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setHistoryOpen(false)}
                  className="p-2 rounded-xl hover:bg-sky-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* History List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {historyList.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-sky-300 opacity-60" />
                    <p className="font-bold text-sm text-slate-600">No History Saved Yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Problems you analyze will appear here for quick access.
                    </p>
                  </div>
                ) : (
                  historyList.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectHistoryItem(item)}
                      className="
                        p-4
                        rounded-2xl
                        border
                        border-sky-100
                        bg-white
                        hover:bg-sky-50/70
                        shadow-2xs
                        hover:shadow-md
                        cursor-pointer
                        transition-all
                        space-y-2
                        group
                      "
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
                          {item.language || "Python"}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {item.timestamp} • {item.date}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-800 text-xs line-clamp-2 group-hover:text-sky-600">
                        {item.title}
                      </h4>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-sky-600 font-bold">
                        <span>Click to view breakdown</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {historyList.length > 0 && (
                <div className="p-4 border-t border-sky-100 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {historyList.length} Saved {historyList.length === 1 ? "Item" : "Items"}
                  </span>
                  <button
                    onClick={handleClearHistory}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-extrabold text-xs transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAnalyze}
              disabled={loading}
              className="
                w-full
                sm:w-auto
                px-8
                py-3.5
                rounded-xl
                text-white
                font-extrabold
                text-sm
                liquid-button
                shadow-lg
                transition-all
                cursor-pointer
                disabled:opacity-60
              "
            >
              {loading ? "Analyzing Problem..." : "Analyze & Explain 🚀"}
            </motion.button>

          </div>

        </motion.div>

        {/* 4-Stage Multi-Step Animated Loading Screen */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-12 max-w-3xl mx-auto"
            >
              <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 border border-sky-100 shadow-2xl space-y-6">
                
                {/* Header & Step Status */}
                <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${currentStepInfo.bgColor} ${currentStepInfo.color}`}>
                      <StepIcon className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg">
                        AI Coach Deep Analysis
                      </h3>
                      <p className="text-xs font-semibold text-slate-400">
                        Step {loadingStep + 1} of {LOADING_STEPS.length}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-sm font-extrabold text-sky-600 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
                    {progressPercent}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>

                {/* Active Step Indicator Banner */}
                <motion.div
                  key={loadingStep}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-2xl border ${currentStepInfo.borderColor} ${currentStepInfo.bgColor} space-y-1`}
                >
                  <h4 className={`font-bold text-sm ${currentStepInfo.color}`}>
                    {currentStepInfo.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {currentStepInfo.subtitle}
                  </p>
                </motion.div>

                {/* Steps List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {LOADING_STEPS.map((s, idx) => {
                    const Icon = s.icon;
                    const isDone = idx < loadingStep;
                    const isCurrent = idx === loadingStep;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isCurrent
                            ? "border-sky-400 bg-sky-50/90 shadow-2xs"
                            : isDone
                            ? "border-emerald-200 bg-emerald-50/50 text-emerald-600"
                            : "border-slate-100 bg-slate-50/50 text-slate-400"
                        }`}
                      >
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${isCurrent ? "animate-bounce text-sky-500" : isDone ? "text-emerald-500" : "text-slate-400"}`} />
                        <span className="text-[10px] font-bold block truncate">
                          Step {idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hints Section */}
        {analysis && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <ProblemCard analysis={analysis} />
          </motion.div>
        )}

        {/* Explanation Section */}
        {explanation && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <ExplanationCard explanation={explanation} />
          </motion.div>
        )}

      </div>
    </div>
  );
}