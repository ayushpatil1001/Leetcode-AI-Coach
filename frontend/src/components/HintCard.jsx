import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HintCard({
  title,
  content
}) {

  const [open, setOpen] =
    useState(false);

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
      "
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          w-full
          flex
          justify-between
          items-center
          p-5
        "
      >
        <h3 className="font-semibold">
          {title}
        </h3>

        <ChevronDown
          className={
            open
              ? "rotate-180 transition"
              : "transition"
          }
        />
      </button>

      {open && (
        <div className="px-5 pb-5">
          {content}
        </div>
      )}
    </div>
  );
}