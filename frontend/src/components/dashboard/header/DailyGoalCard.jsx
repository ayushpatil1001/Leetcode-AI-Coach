import { Flame } from "lucide-react";

export default function DailyGoalCard({ dashboard }) {
  const submissions = dashboard?.recent?.recentAcSubmissionList?.length || 0;

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500 text-white rounded-2xl shadow-sm">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Submission Activity
            </span>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Daily Submissions
            </h2>
          </div>
        </div>
        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
          Target: 3/day
        </span>
      </div>

      <div className="flex items-baseline gap-3">
        <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">
          {submissions}
        </h1>
        <span className="text-slate-500 font-semibold text-base">accepted problems</span>
      </div>

      <p className="mt-3 text-xs font-semibold text-slate-500">
        Keep your daily problem-solving streak alive by practicing on LeetCode!
      </p>
    </div>
  );
}