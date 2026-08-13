import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FloatingArt from "./FloatingArt";


export default function Hero() {
  return (
    <section className="relative z-10">
        
    <div className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">

        <div
            className="
            absolute
            -top-40
            -left-40
            w-[500px]
            h-[500px]
            bg-sky-300/20
            rounded-full
            blur-3xl
            animate-pulse
            "
        />

        <div
            className="
            absolute
            top-20
            right-0
            w-[600px]
            h-[600px]
            bg-blue-200/20
            rounded-full
            blur-3xl
            animate-pulse
            "
        />

        <div
            className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[400px]
            bg-sky-100/30
            rounded-full
            blur-3xl
            "
        />

  

        <div
          className="
            absolute
            bottom-10
            right-10
            w-[500px]
            h-[500px]
            bg-blue-100
            rounded-full
            blur-3xl
            opacity-40
          "
        />

      </div>

      {/* Main Content */}
         <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-6
            pt-32
            lg:pt-24
            min-h-screen
            grid
            lg:grid-cols-[1fr_1.1fr]
            gap-12
            items-center
          "
        >

        {/* Left Side */}
        <div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              inline-flex
              items-center
              gap-2
              bg-sky-100
              text-sky-600
              px-5
              py-2
              rounded-full
              font-medium
              mb-8
            "
          >
            🚀 AI Powered Coding Mentor
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
            text-4xl
            sm:text-5xl
            lg:text-7xl
            font-extrabold
            leading-[1.1]
            tracking-tight
            "
          >
            Master
            <span className="text-sky-500"> LeetCode </span>

            <br />

            Like A Pro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="
              mt-8
              text-lg
              lg:text-xl
              text-gray-600
              leading-relaxed
              max-w-xl
            "
          >
            Get hints instead of answers,
            learn step-by-step thinking,
            analyze complexity,
            and track your coding growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 mt-10"
          >
           <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
              mt-10
            "
          > 

            <Link
              to="/coach"
              className="
                liquid-button
                text-white
                font-bold
                px-8
                py-4
                rounded-2xl
                text-center
                inline-block
              "
            >
              Try AI Coach 🚀
            </Link>

            <Link
              to="/features"
              className="
                liquid-glass
                liquid-glass-hover
                text-sky-700
                font-bold
                px-8
                py-4
                rounded-2xl
                text-center
                inline-block
              "
            >
              Explore Features ✨
            </Link>

            </div>
          </motion.div>

        </div>

        {/* Right Side Dashboard Mockup */}
        <FloatingArt />
       

      </div></div>
    </section>
  );
}