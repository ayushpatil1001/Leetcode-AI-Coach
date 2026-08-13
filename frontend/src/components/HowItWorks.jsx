import Reveal from "./Reveal";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Code2, Brain, Zap, Clock, Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-32 px-6 relative z-10">

      <div className="max-w-6xl mx-auto">

        <Reveal>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/80 px-4 py-1.5 rounded-full border border-sky-200/50">
              Workflow Breakdown
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mt-4">
              How Our <span className="text-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">AI Coach</span> Works
            </h2>

            <p className="text-center text-slate-500 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience a streamlined 4-step process from problem statement to optimal algorithm intuition.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 space-y-24">

          {/* STEP 1: Input & Language Selection */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="
                  bg-white/90
                  backdrop-blur-xl
                  p-8
                  rounded-3xl
                  shadow-xl
                  border
                  border-sky-100/80
                  space-y-4
                "
              >
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                  <input
                    className="
                      w-full
                      bg-transparent
                      text-slate-800
                      font-mono
                      text-sm
                      outline-none
                    "
                    value="leetcode.com/problems/two-sum"
                    readOnly
                  />
                </div>

                <div className="flex items-center justify-between bg-sky-50/80 p-3.5 rounded-2xl border border-sky-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Code2 className="w-4 h-4 text-sky-500" />
                    Target Language:
                  </div>
                  <span className="text-xs font-bold text-sky-600 bg-white px-3 py-1 rounded-xl shadow-2xs border border-sky-200">
                    Python 3 / C++ / Java / JS
                  </span>
                </div>
              </motion.div>

              <div>
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white font-bold flex items-center justify-center mb-4 shadow-md text-base">
                  1
                </div>
                <h3 className="text-3xl font-extrabold text-slate-800">
                  Paste Problem & Choose Language
                </h3>

                <p className="mt-4 text-slate-500 leading-relaxed text-base">
                  Simply paste any LeetCode problem link or raw statement, and pick your preferred coding language (Python, C++, Java, JS, TS, Rust, Go, or SQL).
                </p>
              </div>

            </div>
          </Reveal>

          {/* STEP 2: Multi-Stage Animated Processing */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">

              <div className="order-2 md:order-1">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-bold flex items-center justify-center mb-4 shadow-md text-base">
                  2
                </div>
                <h3 className="text-3xl font-extrabold text-slate-800">
                  4-Stage Animated Deep Analysis
                </h3>

                <p className="mt-4 text-slate-500 leading-relaxed text-base">
                  Watch the AI coach dynamically cycle through understanding constraint parameters, evaluating data structures, computing Big-O complexities, and structuring optimal steps.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="
                  order-1
                  md:order-2
                  bg-white/90
                  backdrop-blur-xl
                  p-6
                  rounded-3xl
                  shadow-xl
                  border
                  border-amber-100
                  space-y-3
                "
              >
                <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-2xl border border-sky-100">
                  <Brain className="w-5 h-5 text-sky-500" />
                  <span className="text-xs font-bold text-slate-700">1. Parsing constraints & objectives</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-100">
                  <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700">2. Formulating optimal logic</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-700">3. Computing Time & Space complexity</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs font-bold text-slate-700">4. Finalizing step-by-step solution</span>
                </div>
              </motion.div>

            </div>
          </Reveal>

          {/* STEP 3: Intuition, Step-by-Step & Code Output */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="
                  bg-white/90
                  backdrop-blur-xl
                  p-5
                  rounded-3xl
                  shadow-xl
                  border
                  border-sky-100
                "
              >
                <div
                  className="
                    h-80
                    rounded-2xl
                    bg-slate-900
                    p-6
                    shadow-2xl
                    overflow-hidden
                    font-mono
                    text-xs
                  "
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
                    <span className="text-sky-400 font-bold">Optimal Solution Code</span>
                    <span className="text-emerald-400 font-bold">O(N) Time</span>
                  </div>

                  <TypeAnimation
                    sequence={[
                  `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
                    ]}
                    speed={80}
                    cursor={true}
                    repeat={1}
                    className="text-emerald-400 whitespace-pre-line leading-relaxed"
                  />
                </div>
              </motion.div>

              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center mb-4 shadow-md text-base">
                  3
                </div>
                <h3 className="text-3xl font-extrabold text-slate-800">
                  Direct Intuition & Target Language Code
                </h3>

                <p className="mt-4 text-slate-500 leading-relaxed text-base">
                  Get clean core intuition, a clear numbered step-by-step breakdown, highlighted time and space complexity metrics, and copyable solution code generated directly in your selected programming language.
                </p>
              </div>

            </div>
          </Reveal>

        </div>

      </div>

    </section>
  );
}