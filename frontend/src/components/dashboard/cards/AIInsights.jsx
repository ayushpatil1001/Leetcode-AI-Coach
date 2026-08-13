export default function AIInsights({ dashboard }) {
  if (!dashboard?.profile?.matchedUser) return null;

  const stats = dashboard.profile.matchedUser.submitStats?.acSubmissionNum || [];
  const all = stats.find((x) => x.difficulty === "All") || { count: 0, submissions: 0 };

  const solved = all.count || 0;
  const submissions = all.submissions || 0;
  const accuracy = submissions > 0 ? ((solved / submissions) * 100).toFixed(1) : 0;

  let level = "Beginner";
  if (solved > 700) level = "Expert";
  else if (solved > 300) level = "Advanced";
  else if (solved > 100) level = "Intermediate";

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            AI Analytics & Mentorship
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
            AI Performance Insights
          </h2>
        </div>
        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-100">
          AI Coach
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Acceptance Rate
          </span>
          <p className="text-4xl font-extrabold text-emerald-600 mt-2">
            {accuracy}%
          </p>
        </div>

        <div className="bg-sky-50/80 p-5 rounded-2xl border border-sky-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Current Tier
          </span>
          <p className="text-4xl font-extrabold text-sky-600 mt-2">{level}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-sky-50/90 to-blue-50/50 p-6 border border-sky-100">
        <h3 className="font-bold text-sky-900 text-lg mb-2 flex items-center gap-2">
          💡 Personalized Next Steps
        </h3>
        {level === "Beginner" && (
          <p className="text-slate-700 text-sm leading-relaxed">
            Solidify core fundamentals! Focus on Array manipulations, String parsing, Hash Map frequency counts, and Two Pointer techniques.
          </p>
        )}
        {level === "Intermediate" && (
          <p className="text-slate-700 text-sm leading-relaxed">
            Level up your algorithmic depth! Master Dynamic Programming state transitions, Graph BFS/DFS traversals, and Binary Tree recursion patterns.
          </p>
        )}
        {level === "Advanced" && (
          <p className="text-slate-700 text-sm leading-relaxed">
            Push towards top competitive tiers! Tackle Hard DP problems, Advanced Graph algorithms (Dijkstra, Tarjan, Segment Trees), and System Design basics.
          </p>
        )}
        {level === "Expert" && (
          <p className="text-slate-700 text-sm leading-relaxed">
            Maintain peak performance! Participate in weekly LeetCode contests and solve 2-3 Hard level problems daily to refine speed and edge cases.
          </p>
        )}
      </div>
    </div>
  );
}