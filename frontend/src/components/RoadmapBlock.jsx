import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function RoadmapBlock({
  level
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <div
      className="
        bg-white/80
        backdrop-blur-xl
        rounded-3xl
        border
        border-sky-100
        shadow-xl
        overflow-hidden
      "
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          w-full
          p-6
          flex
          justify-between
          items-center
        "
      >
        <div>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {level.level}
          </h2>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            {level.estimated_hours}
          </p>

        </div>

        <ChevronDown
          className={`
            transition-transform
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {open && (
        <div className="p-6">

          <p className="mb-6">
            {level.description}
          </p>

          <h3
            className="
              font-bold
              mb-3
            "
          >
            Topics
          </h3>

          <div className="space-y-2">

            {level.topics.map(
              (topic, index) => (
                <div
                  key={index}
                  className="
                    bg-sky-50
                    p-3
                    rounded-xl
                  "
                >
                  {topic}
                </div>
              )
            )}

          </div>

          <h3
            className="
              font-bold
              mt-8
              mb-3
            "
          >
            Practice Questions
          </h3>

          <div className="space-y-2">

            {level.practice_questions.map(
              (q, index) => (
                <div
                  key={index}
                  className="
                    bg-blue-50
                    p-3
                    rounded-xl
                  "
                >
                  {q}
                </div>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}