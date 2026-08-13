import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ContestChart({ dashboard }) {
  if (!dashboard) return null;

  const history = dashboard.history?.userContestRankingHistory || [];
  const contests = history
    .filter((c) => c && c.attended)
    .map((c) => ({
      contest: c.contest?.title || "Contest",
      rating: Math.round(c.rating || 1500),
      rank: c.ranking || 0,
      solved: c.problemsSolved || 0,
    }));

  const contestInfo = dashboard.contest?.userContestRanking;

  return (
    <div className="liquid-glass rounded-3xl p-8 mt-10 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Competitive Rating History
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
            Contest Rating Curve
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Weekly and Biweekly LeetCode contest rating progression
          </p>
        </div>

        {contestInfo && (
          <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-100 text-left sm:text-right w-full sm:w-auto">
            <h1 className="text-3xl font-extrabold text-sky-600">
              {Math.round(contestInfo.rating || 1500)}
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Current Rating
            </p>
            <p className="text-xs font-semibold text-emerald-600 mt-1">
              Global Rank #{contestInfo.globalRanking ? contestInfo.globalRanking.toLocaleString() : "N/A"}
            </p>
          </div>
        )}
      </div>

      {contests.length > 0 ? (
        <div className="h-[380px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={contests}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.6)" />
              <XAxis dataKey="contest" hide />
              <YAxis domain={["auto", "auto"]} stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  border: "1px solid #e0f2fe",
                  boxShadow: "0 10px 25px rgba(14, 165, 233, 0.15)",
                }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#0ea5e9"
                strokeWidth={3.5}
                dot={{ fill: "#0ea5e9", r: 4, strokeWidth: 2, stroke: "#ffffff" }}
                activeDot={{ r: 7, fill: "#2563eb" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-50/60 rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">
            No attended contest history available yet. Participate in weekly LeetCode contests to track your rating curve!
          </p>
        </div>
      )}
    </div>
  );
}