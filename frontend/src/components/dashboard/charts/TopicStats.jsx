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
    .slice(0, 10);

  const maxSolved = Math.max(...top.map((t) => t.problemsSolved || 1), 1);

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Algorithmic Domain Mastery
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
            Top Topic Statistics
          </h2>
        </div>
        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-100">
          LeetCode Topics
        </span>
      </div>

      <div className="space-y-5">
        {top.map((topic) => {
          const percentage = Math.min(100, Math.round(((topic.problemsSolved || 0) / maxSolved) * 100));

          return (
            <div key={topic.tagName} className="group">
              <div className="flex justify-between items-center text-sm font-semibold mb-2">
                <span className="text-slate-800 font-bold group-hover:text-sky-600 transition-colors">
                  {topic.tagName}
                </span>
                <span className="text-sky-600 bg-sky-50 px-3 py-1 rounded-xl text-xs border border-sky-100 font-mono">
                  {topic.problemsSolved} solved
                </span>
              </div>

              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}