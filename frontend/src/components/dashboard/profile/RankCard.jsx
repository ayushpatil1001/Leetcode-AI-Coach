import { Trophy } from "lucide-react";

export default function RankCard({ dashboard }) {
  const rank = dashboard?.contest?.userContestRanking || {
    rating: 1500,
    globalRanking: 0,
    attendedContestsCount: 0,
  };

  return (
    <div className="liquid-glass rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
        <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
          <Trophy className="w-5 h-5" />
        </div>
        <h2 className="font-extrabold text-xl text-slate-800 tracking-tight">
          Contest Rating
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Current Rating
          </p>
          <h1 className="text-3xl font-extrabold text-amber-600 mt-1">
            {Math.round(rank.rating || 1500)}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-sky-50/80 p-3.5 rounded-2xl border border-sky-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Global Rank
            </p>
            <h2 className="text-xl font-bold text-sky-600 mt-1">
              #{rank.globalRanking ? rank.globalRanking.toLocaleString() : "N/A"}
            </h2>
          </div>

          <div className="bg-indigo-50/80 p-3.5 rounded-2xl border border-indigo-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Attended
            </p>
            <h2 className="text-xl font-bold text-indigo-600 mt-1">
              {rank.attendedContestsCount || 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}