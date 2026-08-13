import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeatureCard from "../components/FeatureCard";
import InteractiveBackground from "../components/InteractiveBackground";
import { Link } from "react-router-dom";

import {
  FaBrain,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-slate-50 overflow-hidden">

      <InteractiveBackground />
      <Navbar />

      {/* Static Ambient Orbs */}
      <div className="absolute top-32 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <Hero />

      {/* Quick Features Preview */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Learn <span className="text-sky-500 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 bg-clip-text text-transparent">Smarter</span>
            </h2>

            <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Everything you need to improve your problem-solving skills
              without relying on copied solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">

            <FeatureCard
              icon={<FaLightbulb />}
              title="Progressive Hints"
              description="Get guided hints one step at a time without revealing the full answer."
            />

            <FeatureCard
              icon={<FaBrain />}
              title="AI Thinking Coach"
              description="Learn how experienced engineers approach and break down coding problems."
            />

            <FeatureCard
              icon={<FaChartLine />}
              title="Progress Tracking"
              description="Track solved problems, streaks, weak topics and overall growth."
            />

          </div>

        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* CTA Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              liquid-glass
              rounded-[40px]
              shadow-2xl
              p-12
              text-center
              relative
              overflow-hidden
            "
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight relative z-10">
              Ready To Master LeetCode?
            </h2>

            <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto relative z-10 font-medium">
              Start solving problems with AI guidance,
              structured thinking, and detailed feedback.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-10 inline-block relative z-10">
              <Link
                to="/coach"
                className="
                  inline-block
                  px-8
                  py-4
                  rounded-2xl
                  liquid-button
                  text-white
                  font-extrabold
                  shadow-lg
                  transition-all
                  duration-300
                "
              >
                Try AI Coach ⚡
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </section>

    </div>
  );
}