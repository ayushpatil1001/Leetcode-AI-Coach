import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import RoadmapBlock from "../components/RoadmapBlock";
import InteractiveBackground from "../components/InteractiveBackground";
import { generateRoadmap } from "../services/roadmapApi";
import { Sparkles, Brain, Compass } from "lucide-react";

export default function Roadmap() {

  const [concept, setConcept] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!concept.trim()) return;

    try {
      setLoading(true);

      const result = await generateRoadmap(concept);

      const clean = result.response
        .replace("```json", "")
        .replace("```", "");

      setRoadmap(JSON.parse(clean));

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-slate-50 relative overflow-hidden pb-24">

      <InteractiveBackground />
      <Navbar />

      {/* Static Ambient Orbs */}
      <div className="absolute top-28 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-52 right-10 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-40 relative z-10">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full mb-6 font-extrabold text-xs border border-sky-200 cursor-default shadow-xs"
          >
            <Compass size={18} />
            AI Powered Learning Paths
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight">
            🧠 AI <span className="text-sky-500 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 bg-clip-text text-transparent">Roadmaps</span>
          </h1>

          <p className="text-center text-slate-500 mt-4 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Master any data structure or algorithm concept step-by-step from beginner to expert.
          </p>
        </motion.div>

        {/* Input & Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-12 max-w-3xl mx-auto flex flex-col sm:flex-row gap-4"
        >

          <input
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="e.g. Dynamic Programming, Graph Theory, Binary Search..."
            className="
              flex-1
              h-14
              px-6
              rounded-2xl
              border
              border-sky-200
              bg-white/95
              backdrop-blur-xl
              shadow-lg
              hover:shadow-xl
              focus:ring-2
              focus:ring-sky-400
              outline-none
              transition-all
              text-slate-800
              font-semibold
              text-sm
            "
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleGenerate}
            disabled={loading}
            className="
              h-14
              px-8
              rounded-2xl
              text-white
              font-extrabold
              text-sm
              liquid-button
              shadow-lg
              transition-all
              cursor-pointer
              disabled:opacity-60
              whitespace-nowrap
            "
          >
            {loading ? "Generating..." : "Generate Roadmap ⚡"}
          </motion.button>

        </motion.div>

        {/* Animated Loading Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-2xl px-8 py-5 shadow-xl border border-sky-100">
              <Brain className="text-sky-500 animate-bounce w-6 h-6" />
              <span className="font-semibold text-slate-700 text-sm">
                🧠 Structuring custom AI roadmap for "{concept}"...
              </span>
            </div>
          </motion.div>
        )}

        {/* Roadmap Levels Display */}
        {roadmap && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 space-y-6 max-w-4xl mx-auto"
          >
            {roadmap.levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <RoadmapBlock level={level} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

    </div>
  );
}