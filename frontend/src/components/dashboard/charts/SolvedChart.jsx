import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SolvedChart({ dashboard }) {
  if (!dashboard?.profile?.matchedUser) return null;

  const stats = dashboard.profile.matchedUser.submitStats?.acSubmissionNum || [];

  const easy = stats.find((s) => s.difficulty === "Easy") || { count: 0 };
  const medium = stats.find((s) => s.difficulty === "Medium") || { count: 0 };
  const hard = stats.find((s) => s.difficulty === "Hard") || { count: 0 };
  const all = stats.find((s) => s.difficulty === "All") || { count: 0 };

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-sky-100 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Problem Solving Breakdown
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              Solved Stats
            </h2>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200">
            {all.count} Total
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center pt-2">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28">
              <CircularProgressbar
                value={all.count}
                maxValue={3500}
                text={`${all.count}`}
                styles={buildStyles({
                  pathColor: "#0ea5e9",
                  textColor: "#0f172a",
                  trailColor: "rgba(224, 242, 254, 0.7)",
                  textSize: "18px",
                })}
              />
            </div>
            <p className="mt-3 font-bold text-slate-800 text-sm">Total Solved</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={easy.count}
                maxValue={900}
                text={`${easy.count}`}
                styles={buildStyles({
                  pathColor: "#10b981",
                  textColor: "#0f172a",
                  trailColor: "rgba(209, 250, 229, 0.7)",
                  textSize: "18px",
                })}
              />
            </div>
            <p className="mt-2.5 font-bold text-emerald-600 text-xs">Easy</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={medium.count}
                maxValue={1900}
                text={`${medium.count}`}
                styles={buildStyles({
                  pathColor: "#f59e0b",
                  textColor: "#0f172a",
                  trailColor: "rgba(254, 243, 199, 0.7)",
                  textSize: "18px",
                })}
              />
            </div>
            <p className="mt-2.5 font-bold text-amber-600 text-xs">Medium</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={hard.count}
                maxValue={700}
                text={`${hard.count}`}
                styles={buildStyles({
                  pathColor: "#f43f5e",
                  textColor: "#0f172a",
                  trailColor: "rgba(2ffe, 228, 232, 0.7)",
                  textSize: "18px",
                })}
              />
            </div>
            <p className="mt-2.5 font-bold text-rose-600 text-xs">Hard</p>
          </div>
        </div>
      </div>
    </div>
  );
}