import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const features = [
  {
    title: "AI Hints",
    description:
      "Get progressive hints without instantly revealing the solution.",
    icon: "💡",
  },
  {
    title: "Step-by-Step Thinking",
    description:
      "Learn how experienced engineers approach coding problems.",
    icon: "🧠",
  },
  {
    title: "Complexity Analysis",
    description:
      "Understand time and space complexity with clear explanations.",
    icon: "⚡",
  },
  {
    title: "Progress Tracking",
    description:
      "Track solved problems and monitor your growth over time.",
    icon: "📈",
  },
  {
    title: "Problem Breakdown",
    description:
      "AI summarizes the problem and highlights key patterns.",
    icon: "📚",
  },
  {
    title: "Learning Focused",
    description:
      "Designed to teach problem-solving, not encourage copying.",
    icon: "🎯",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen relative">

      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-24 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              text-4xl
              md:text-6xl
              font-extrabold
              leading-tight
            "
          >
            Explore What Makes
            <span className="text-sky-500">
              {" "}AI Coaching{" "}
            </span>
            Different
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="
              text-gray-600
              mt-6
              max-w-3xl
              mx-auto
              text-lg
            "
          >
            Learn how to solve coding problems,
            understand algorithms,
            and build real problem-solving skills.
          </motion.p>

        </div>

      </section>

      {/* FEATURES GRID */}

      <section className="px-6">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                  bg-white/80
                  backdrop-blur-xl
                  rounded-3xl
                  shadow-xl
                  p-8
                  border
                  border-white/50
                "
              >
                <div className="text-5xl mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-500">
                  {feature.description}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* LEETCODE EXAMPLES */}

      <section className="py-32 px-6">

        <div className="max-w-7xl mx-auto">

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-center
            "
          >
            Example AI Coaching
          </h2>

          <p className="text-center text-gray-500 mt-4">
            See how the coach guides you.
          </p>

          <div className="grid lg:grid-cols-2 gap-10 mt-16">

            {/* TWO SUM */}

            <motion.div
              whileHover={{ y: -5 }}
              className="
                bg-white/80
                backdrop-blur-xl
                rounded-3xl
                shadow-xl
                p-8
              "
            >

              <h3 className="text-3xl font-bold">
                Two Sum
              </h3>

              <p className="mt-3 text-gray-500">
                Given an array and target value,
                find two numbers that add up to target.
              </p>

              <div className="mt-6 space-y-4">

                <div className="bg-sky-50 p-5 rounded-2xl">
                  <h4 className="font-semibold">
                    Hint #1
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Can you remember previously
                    visited values?
                  </p>
                </div>

                <div className="bg-sky-50 p-5 rounded-2xl">
                  <h4 className="font-semibold">
                    Hint #2
                  </h4>

                  <p className="text-gray-500 mt-2">
                    What if you store numbers
                    inside a HashMap?
                  </p>
                </div>

                <div className="bg-sky-50 p-5 rounded-2xl">
                  <h4 className="font-semibold">
                    Complexity
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Time: O(n)
                  </p>
                </div>

              </div>

            </motion.div>

            {/* VALID PARENTHESES */}

            <motion.div
              whileHover={{ y: -5 }}
              className="
                bg-white/80
                backdrop-blur-xl
                rounded-3xl
                shadow-xl
                p-8
              "
            >

              <h3 className="text-3xl font-bold">
                Valid Parentheses
              </h3>

              <p className="mt-3 text-gray-500">
                Determine whether the input string
                has valid matching brackets.
              </p>

              <div className="mt-6 space-y-4">

                <div className="bg-sky-50 p-5 rounded-2xl">
                  <h4 className="font-semibold">
                    Hint #1
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Think about the most recent
                    opening bracket.
                  </p>
                </div>

                <div className="bg-sky-50 p-5 rounded-2xl">
                  <h4 className="font-semibold">
                    Data Structure
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Stack
                  </p>
                </div>

                <div className="bg-sky-50 p-5 rounded-2xl">
                  <h4 className="font-semibold">
                    Complexity
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Time: O(n)
                  </p>
                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="pb-32 px-6">

        <div
          className="
            max-w-5xl
            mx-auto
            bg-gradient-to-r
            from-sky-500
            to-blue-600
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
              font-bold
            "
          >
            Ready to Level Up?
          </h2>

          <p className="mt-5 text-lg text-white/90">
            Stop memorizing solutions.
            Start mastering problem solving.
          </p>

          <button
            className="
              mt-8
              bg-white
              text-sky-600
              px-8
              py-4
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
            "
          >
            Try AI Coach
          </button>

        </div>

      </section>

    </div>
  );
}