import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function ContributionHeatmap({ dashboard }) {
  if (!dashboard?.calendar?.matchedUser?.userCalendar) return null;

  const calendar = dashboard.calendar.matchedUser.userCalendar;

  let raw = {};
  try {
    raw = JSON.parse(calendar.submissionCalendar || "{}");
  } catch (e) {
    raw = {};
  }

  const today = new Date();
  const days = [];

  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const ts = Math.floor(d.getTime() / 1000);
    const count = raw[ts] || 0;

    days.push({
      date: d.toDateString(),
      count,
    });
  }

  function getColorClass(count) {
    if (count === 0) return "bg-slate-100/80 border border-slate-200/50";
    if (count < 3) return "bg-emerald-200 shadow-2xs";
    if (count < 6) return "bg-emerald-400 shadow-xs";
    if (count < 10) return "bg-emerald-600 shadow-xs";
    return "bg-emerald-800 shadow-sm";
  }

  return (
    <div className="liquid-glass rounded-3xl p-8 mt-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Annual Activity Tracker
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
            Submission Heatmap
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {calendar.totalActiveDays || 0} active days in past year • Current streak: {calendar.streak || 0} days
          </p>
        </div>
        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-100">
          365 Days
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[720px]">
          {days.map((day, index) => (
            <div
              key={index}
              data-tooltip-id="heat"
              data-tooltip-content={`${day.date}: ${day.count} submissions`}
              className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-pointer ${getColorClass(
                day.count
              )}`}
            />
          ))}
        </div>
      </div>

      <Tooltip id="heat" />

      <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-500 mt-6 pt-4 border-t border-slate-100">
        <span>Less</span>
        <div className="w-3 h-3 bg-slate-100 rounded-sm border border-slate-200/60" />
        <div className="w-3 h-3 bg-emerald-200 rounded-sm" />
        <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
        <div className="w-3 h-3 bg-emerald-600 rounded-sm" />
        <div className="w-3 h-3 bg-emerald-800 rounded-sm" />
        <span>More</span>
      </div>
    </div>
  );
}