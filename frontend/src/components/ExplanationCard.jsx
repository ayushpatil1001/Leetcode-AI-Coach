export default function ExplanationCard({
  explanation
}) {

  if (!explanation) return null;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-8
        shadow-xl
      "
    >
      <h2
        className="
          text-3xl
          font-bold
        "
      >
        Explanation
      </h2>

      <p className="mt-6">
        {explanation.logic}
      </p>

      <div className="mt-8">

        <h3 className="font-bold">
          Steps
        </h3>

        {explanation.steps.map(
          (step, index) => (
            <div
              key={index}
              className="
                mt-3
                bg-sky-50
                p-4
                rounded-xl
              "
            >
              {step}
            </div>
          )
        )}

      </div>

      <div className="mt-8">

        <h3 className="font-bold">
          Complexity
        </h3>

        <p>
          Time:
          {" "}
          {explanation.complexity.time}
        </p>

        <p>
          Space:
          {" "}
          {explanation.complexity.space}
        </p>

      </div>

      <div className="mt-8">

        <h3 className="font-bold">
          Solution
        </h3>

        <pre
          className="
            bg-slate-900
            text-white
            p-4
            rounded-xl
            mt-4
            overflow-auto
          "
        >
          {explanation.solution}
        </pre>

      </div>

    </div>
  );
}