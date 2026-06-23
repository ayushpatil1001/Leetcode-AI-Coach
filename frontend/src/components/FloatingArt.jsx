import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaLightbulb,
  FaStickyNote,
  FaPen,
} from "react-icons/fa";

export default function ProblemSolvingArt() {
  return (
    <div className="relative w-full h-[600px]">

      {/* Background Glow */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            w-80
            h-80
            rounded-full
            bg-sky-300/20
            blur-3xl
          "
        />
      </div>

      {/* Notebook */}

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 5,
          repeat: 10,
        }}
        className="
          absolute
          top-12
          left-16
          bg-white
          rounded-3xl
          shadow-xl
          p-6
          w-48
        "
      >
        <div className="flex items-center gap-2 mb-3">
          <FaStickyNote className="text-sky-500" />
          <span className="font-semibold">
            Notes
          </span>
        </div>

        <div className="space-y-2">
          <div className="h-2 bg-sky-100 rounded"></div>
          <div className="h-2 bg-sky-100 rounded"></div>
          <div className="h-2 bg-sky-100 rounded w-2/3"></div>
        </div>
      </motion.div>

      {/* Lightbulb */}

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: 10,
        }}
        className="
          absolute
          top-6
          right-20
          bg-yellow-100
          p-5
          rounded-full
          shadow-lg
        "
      >
        <FaLightbulb
          size={35}
          className="text-yellow-500"
        />
      </motion.div>

      {/* Laptop */}

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 6,
          repeat: 10,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
          w-80
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <FaLaptopCode
            size={28}
            className="text-sky-500"
          />
          <h3 className="font-bold">
            Solving Problem
          </h3>
        </div>

        <div className="space-y-3">
          <div className="h-3 bg-slate-200 rounded w-full"></div>
          <div className="h-3 bg-sky-300 rounded w-4/5"></div>
          <div className="h-3 bg-slate-200 rounded w-3/5"></div>
          <div className="h-3 bg-sky-300 rounded w-5/6"></div>
        </div>
      </motion.div>

      {/* Pencil */}

      <motion.div
        animate={{
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 5,
          repeat: 10,
        }}
        className="
          absolute
          bottom-20
          left-20
          bg-white
          p-5
          rounded-full
          shadow-lg
        "
      >
        <FaPen
          size={24}
          className="text-sky-500"
        />
      </motion.div>

      {/* Sticky Idea */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: 10,
        }}
        className="
          absolute
          bottom-20
          right-12
          bg-sky-100
          rounded-2xl
          px-6
          py-4
          shadow-lg
        "
      >
        <p className="font-semibold">
          HashMap 💡
        </p>
      </motion.div>

    </div>
  );
}