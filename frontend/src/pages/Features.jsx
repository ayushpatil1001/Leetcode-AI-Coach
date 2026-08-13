import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import InteractiveBackground from "../components/InteractiveBackground";

const features = [
  {
    title: "Target Language Selection",
    description:
      "Select your preferred language (Python 3, C++, Java, JS, TS, C#, Go, Rust, SQL) before generating answers.",
    icon: "💻",
  },
  {
    title: "Direct Logic Explanation",
    description:
      "Gain core algorithmic intuition with plain-English breakdowns of core engineering concepts.",
    icon: "🧠",
  },
  {
    title: "Step-by-Step Guide",
    description:
      "Follow numbered, structured algorithmic steps designed to build real problem-solving confidence.",
    icon: "⚡",
  },
  {
    title: "Highlighted Time Complexity",
    description:
      "Get exact Big-O Time Complexity & Space Complexity metrics highlighted for peak performance.",
    icon: "📊",
  },
  {
    title: "4-Stage Animated Analysis",
    description:
      "Enjoy multi-stage loading screen animations describing real-time AI reasoning progress.",
    icon: "✨",
  },
  {
    title: "1-Click Copyable Code",
    description:
      "Instantly copy clean, formatted, optimal solution code directly to your clipboard.",
    icon: "📋",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-slate-50">

      <InteractiveBackground />
      <Navbar />

      {/* Static Ambient Orbs */}
      <div className="absolute top-32 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-64 right-10 w-[450px] h-[450px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 relative z-10">

        <div className="max-w-7xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              text-4xl
              md:text-6xl
              font-extrabold
              leading-tight
              text-slate-800
              tracking-tight
            "
          >
            Explore What Makes
            <span className="text-sky-500 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 bg-clip-text text-transparent">
              {" "}AI Coaching{" "}
            </span>
            Different
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              text-slate-600
              mt-6
              max-w-3xl
              mx-auto
              text-lg
              leading-relaxed
              font-medium
            "
          >
            Learn how to solve coding problems,
            understand algorithms,
            and build real problem-solving skills.
          </motion.p>

        </div>

      </section>

      {/* FEATURES GRID */}

      <section className="px-6 relative z-10">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
                className="
                  liquid-glass
                  rounded-3xl
                  shadow-xl
                  p-8
                  border
                  border-sky-100
                  transition-all
                  duration-300
                "
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-5xl mb-5 inline-block"
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* LEETCODE EXAMPLES */}

      <section className="py-32 px-6 relative z-10">

        <div className="max-w-7xl mx-auto">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              text-4xl
              md:text-5xl
              font-extrabold
              text-center
              text-slate-800
              tracking-tight
            "
          >
            Example AI Coaching
          </motion.h2>

          <p className="text-center text-slate-500 mt-4 text-lg font-medium">
            See how the coach guides you through real problem breakdown.
          </p>

          <div className="grid lg:grid-cols-2 gap-10 mt-16">

            {/* TWO SUM */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="
                liquid-glass
                rounded-3xl
                shadow-xl
                p-8
                border
                border-sky-100
                transition-all
              "
            >

              <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Two Sum
              </h3>

              <p className="mt-3 text-slate-500 font-medium">
                Given an array and target value,
                find two numbers that add up to target.
              </p>

              <div className="mt-6 space-y-4">

                <motion.div whileHover={{ scale: 1.01 }} className="bg-sky-50/90 p-5 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-sky-900 text-sm">
                    Hint #1
                  </h4>

                  <p className="text-slate-600 mt-1.5 text-sm font-medium">
                    Can you remember previously
                    visited values?
                  </p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="bg-sky-50/90 p-5 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-sky-900 text-sm">
                    Hint #2
                  </h4>

                  <p className="text-slate-600 mt-1.5 text-sm font-medium">
                    What if you store numbers
                    inside a HashMap?
                  </p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="bg-sky-50/90 p-5 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-sky-900 text-sm">
                    Complexity
                  </h4>

                  <p className="text-sky-700 font-mono font-extrabold mt-1.5 text-sm">
                    Time: O(n) | Space: O(n)
                  </p>
                </motion.div>

              </div>

            </motion.div>

            {/* VALID PARENTHESES */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="
                liquid-glass
                rounded-3xl
                shadow-xl
                p-8
                border
                border-sky-100
                transition-all
              "
            >

              <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Valid Parentheses
              </h3>

              <p className="mt-3 text-slate-500 font-medium">
                Determine whether the input string
                has valid matching brackets.
              </p>

              <div className="mt-6 space-y-4">

                <motion.div whileHover={{ scale: 1.01 }} className="bg-sky-50/90 p-5 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-sky-900 text-sm">
                    Hint #1
                  </h4>

                  <p className="text-slate-600 mt-1.5 text-sm font-medium">
                    Think about the most recent
                    opening bracket.
                  </p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="bg-sky-50/90 p-5 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-sky-900 text-sm">
                    Data Structure
                  </h4>

                  <p className="text-slate-600 mt-1.5 text-sm font-medium">
                    Stack
                  </p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="bg-sky-50/90 p-5 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-sky-900 text-sm">
                    Complexity
                  </h4>

                  <p className="text-sky-700 font-mono font-extrabold mt-1.5 text-sm">
                    Time: O(n) | Space: O(n)
                  </p>
                </motion.div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="pb-32 px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            max-w-5xl
            mx-auto
            bg-gradient-to-r
            from-sky-400
            via-sky-500
            to-sky-600
            rounded-[40px]
            p-12
            text-center
            text-white
            shadow-2xl
          "
        >

          <h2
            className="
              text-4xl
              md:text-5xl
              font-extrabold
              tracking-tight
            "
          >
            Ready to Level Up?
          </h2>

          <p className="mt-5 text-lg text-white/90 font-medium">
            Stop memorizing solutions.
            Start mastering problem solving.
          </p>

          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-block"
          >
            <Link
              to="/coach"
              className="
                inline-block
                bg-white
                text-sky-600
                px-8
                py-4
                rounded-2xl
                font-extrabold
                shadow-lg
                hover:bg-sky-50
                transition
                cursor-pointer
              "
            >
              Try AI Coach ⚡
            </Link>
          </motion.div>

        </motion.div>

      </section>

    </div>
  );
}