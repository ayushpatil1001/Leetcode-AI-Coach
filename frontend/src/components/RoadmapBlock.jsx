import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Code2 } from "lucide-react";

export default function RoadmapBlock({ level }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="
        bg-white/80
        backdrop-blur-xl
        rounded-3xl
        border
        border-sky-100/80
        shadow-xl
        hover:shadow-2xl
        overflow-hidden
        transition-all
        duration-300
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
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white font-bold flex items-center justify-center shadow-md flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {level.level}
            </h2>
            <p className="text-sm font-semibold text-sky-600 mt-0.5">
              ⏱️ {level.estimated_hours}
            </p>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-sky-100/70 text-sky-600">
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
            className="border-t border-sky-100/60 p-6 bg-slate-50/50 backdrop-blur-md space-y-6"
          >
            <p className="text-slate-700 leading-relaxed text-base">
              {level.description}
            </p>

            {/* Topics */}
            {level.topics && level.topics.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Core Topics
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {level.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="
                        bg-white/90
                        p-3.5
                        rounded-xl
                        border
                        border-sky-100
                        text-slate-800
                        font-medium
                        text-sm
                        shadow-2xs
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Questions */}
            {level.practice_questions && level.practice_questions.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-sky-500" /> Practice Problems
                </h3>
                <div className="space-y-2">
                  {level.practice_questions.map((q, index) => (
                    <div
                      key={index}
                      className="
                        bg-gradient-to-r
                        from-sky-50/80
                        to-blue-50/50
                        p-3.5
                        rounded-xl
                        border
                        border-sky-100
                        text-sky-950
                        font-medium
                        text-sm
                        shadow-2xs
                      "
                    >
                      {q}
                    </div>
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