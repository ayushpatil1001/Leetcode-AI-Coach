import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaLightbulb,
  FaStickyNote,
  FaPen,
} from "react-icons/fa";

export default function ProblemSolvingArt() {
  return (
    <div className="relative w-full max-w-lg h-[440px] md:h-[480px] flex items-center justify-center mx-auto">

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-sky-300/30 blur-3xl animate-pulse" />
      </div>

      {/* Notebook */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-2
          left-2
          md:left-6
          liquid-glass
          rounded-3xl
          shadow-xl
          p-5
          w-44
          border
          border-sky-100
          z-10
        "
      >
        <div className="flex items-center gap-2 mb-2.5">
          <FaStickyNote className="text-sky-500 text-base" />
          <span className="font-extrabold text-slate-800 text-xs">
            AI Notes 📝
          </span>
        </div>

        <div className="space-y-2">
          <div className="h-2 bg-sky-200/70 rounded-full w-full"></div>
          <div className="h-2 bg-sky-200/70 rounded-full w-5/6"></div>
          <div className="h-2 bg-sky-400/80 rounded-full w-2/3"></div>
        </div>
      </motion.div>

      {/* Lightbulb */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-2
          right-2
          md:right-6
          bg-gradient-to-br
          from-amber-100
          to-amber-200
          p-4
          rounded-full
          shadow-xl
          border
          border-amber-300/50
          z-10
        "
      >
        <FaLightbulb
          size={30}
          className="text-amber-500 drop-shadow-md"
        />
      </motion.div>

      {/* Main Central Code Screen */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          liquid-glass
          rounded-3xl
          shadow-2xl
          p-7
          w-72
          sm:w-80
          md:w-88
          border
          border-sky-200/90
          z-20
        "
      >
        <div className="flex items-center gap-3 mb-4 border-b border-sky-100 pb-3">
          <div className="p-2 rounded-2xl bg-sky-100 text-sky-600">
            <FaLaptopCode size={22} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm tracking-tight">
              Solving Problem
            </h3>
            <p className="text-[10px] font-bold text-slate-400">
              Two Sum • HashMap O(N)
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="h-2.5 bg-slate-100 rounded-full w-full"></div>
          <div className="h-2.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full w-4/5 shadow-2xs"></div>
          <div className="h-2.5 bg-slate-100 rounded-full w-3/5"></div>
          <div className="h-2.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full w-5/6 shadow-2xs"></div>
        </div>
      </motion.div>

      {/* Pencil */}
      <motion.div
        animate={{
          rotate: [-12, 12, -12],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-4
          left-6
          md:left-12
          bg-white
          p-3.5
          rounded-full
          shadow-xl
          border
          border-sky-100
          z-10
        "
      >
        <FaPen
          size={20}
          className="text-sky-500"
        />
      </motion.div>

      {/* Sticky Idea Badge */}
      <motion.div
        animate={{
          y: [0, -14, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-4
          right-4
          md:right-8
          bg-gradient-to-r
          from-sky-400
          to-sky-500
          text-white
          rounded-2xl
          px-5
          py-2.5
          shadow-xl
          font-extrabold
          text-xs
          border
          border-sky-300
          z-10
        "
      >
        HashMap Pattern 💡
      </motion.div>

    </div>
  );
}