export default function AICoachDemo() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold mb-8">
            Try AI Coach
          </h2>

          <input
            placeholder="Paste LeetCode URL..."
            className="
            w-full
            p-5
            rounded-xl
            border
            border-sky-200
            outline-none
            "
          />

          <button
            className="
            mt-5
            bg-sky-500
            text-white
            px-8
            py-4
            rounded-xl
            "
          >
            Analyze Problem
          </button>

        </div>

      </div>
    </section>
  );
}