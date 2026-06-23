export default function ProblemCard({
  analysis
}) {

  if (!analysis) return null;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8
      "
    >
      <h2
        className="
          text-3xl
          font-bold
        "
      >
        {analysis.title}
      </h2>

      <div className="mt-4">

        <span
          className="
            bg-sky-100
            text-sky-600
            px-3
            py-1
            rounded-full
          "
        >
          {analysis.difficulty}
        </span>

      </div>

      <p className="mt-6">
        {analysis.summary}
      </p>
    </div>
  );
}