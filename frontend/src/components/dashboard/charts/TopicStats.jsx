export default function TopicStats({ dashboard }) {
  if (!dashboard?.topics?.matchedUser?.tagProblemCounts) return null;

  const topics = dashboard.topics.matchedUser.tagProblemCounts;

  const list = [
    ...(topics.fundamental || []),
    ...(topics.intermediate || []),
    ...(topics.advanced || []),
  ];

  if (list.length === 0) return null;

  const top = [...list]
    .sort((a, b) => (b.problemsSolved || 0) - (a.problemsSolved || 0))
    .slice(0, 7);

  const maxSolved = Math.max(...top.map((t) => t.problemsSolved || 1), 1);

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-sky-100 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Algorithmic Domains
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              Top Topics
            </h2>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200">
            {top.length} Topics
          </span>
        </div>

        <div className="space-y-4">
          {top.map((topic) => {
            const percentage = Math.min(100, Math.round(((topic.problemsSolved || 0) / maxSolved) * 100));

            return (
              <div key={topic.tagName} className="group">
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-slate-800 font-bold group-hover:text-sky-600 transition-colors">
                    {topic.tagName}
                  </span>
                  <span className="text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg text-xs border border-sky-100 font-mono">
                    {topic.problemsSolved} solved
                  </span>
                </div>

                <div className="h-2.5 bg-sky-100/60 rounded-full overflow-hidden p-0.5 border border-sky-200/50">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 rounded-full transition-all duration-700 shadow-2xs"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}