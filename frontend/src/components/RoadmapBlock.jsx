import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Code2 } from "lucide-react";

export default function RoadmapBlock({ level }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.005 }}
      transition={{ duration: 0.3 }}
      className="
        liquid-glass
        rounded-3xl
        border
        border-sky-200/90
        shadow-xl
        hover:shadow-2xl
        overflow-hidden
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          p-6
          flex
          justify-between
          items-center
          cursor-pointer
          hover:bg-sky-50/50
          transition-colors
          text-left
        "
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white font-extrabold flex items-center justify-center shadow-md flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {level.level}
            </h2>
            <p className="text-xs font-bold text-sky-600 mt-1">
              ⏱️ {level.estimated_hours}
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-sky-100/90 text-sky-700">
          <ChevronDown
            className={`
              w-5 h-5
              transition-transform
              duration-300
              ${open ? "rotate-180" : ""}
            `}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-sky-100 p-6 bg-white/70 backdrop-blur-md space-y-6"
          >
            <p className="text-slate-700 leading-relaxed text-sm font-medium">
              {level.description}
            </p>

            {/* Topics */}
            {level.topics && level.topics.length > 0 && (
              <div>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Core Topics
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {level.topics.map((topic, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 2 }}
                      className="
                        bg-white/95
                        p-3.5
                        rounded-2xl
                        border
                        border-sky-100
                        text-slate-800
                        font-bold
                        text-xs
                        shadow-2xs
                        flex
                        items-center
                        gap-2.5
                      "
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-xs" />
                      {topic}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Questions */}
            {level.practice_questions && level.practice_questions.length > 0 && (
              <div>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-sky-500" /> Recommended Problems
                </h3>
                <div className="space-y-2">
                  {level.practice_questions.map((q, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01, x: 3 }}
                      className="
                        bg-gradient-to-r
                        from-sky-50/90
                        to-blue-50/70
                        p-3.5
                        rounded-2xl
                        border
                        border-sky-100
                        text-sky-950
                        font-bold
                        text-xs
                        shadow-2xs
                      "
                    >
                      {q}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}