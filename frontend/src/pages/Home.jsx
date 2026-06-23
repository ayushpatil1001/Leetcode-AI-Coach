import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeatureCard from "../components/FeatureCard";

import {
  FaBrain,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Quick Features Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800">
              Learn Smarter
            </h2>

            <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto">
              Everything you need to improve your problem-solving skills
              without relying on copied solutions.
            </p>
          </div>

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
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">

          <div
            className="
              bg-white/80
              backdrop-blur-xl
              border
              border-white/50
              rounded-[40px]
              shadow-xl
              p-12
              text-center
            "
          >

            <h2 className="text-5xl font-bold text-slate-800">
              Ready To Master LeetCode?
            </h2>

            <p className="mt-6 text-lg text-slate-500">
              Start solving problems with AI guidance,
              structured thinking, and detailed feedback.
            </p>

            <button
              className="
                mt-10
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-sky-500
                to-blue-600
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Try AI Coach
            </button>

          </div>

        </div>
      </section>

    </div>
  );
}