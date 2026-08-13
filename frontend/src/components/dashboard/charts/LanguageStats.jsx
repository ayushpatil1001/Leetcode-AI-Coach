export default function LanguageStats({ dashboard }) {
  if (!dashboard?.languages?.matchedUser?.languageProblemCount) return null;

  const languages = dashboard.languages.matchedUser.languageProblemCount || [];

  if (languages.length === 0) return null;

  const maxSolved = Math.max(...languages.map((l) => l.problemsSolved || 1), 1);

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Language Breakdown
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
            Languages Used
          </h2>
        </div>
        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-100">
          LeetCode Languages
        </span>
      </div>

      <div className="space-y-5">
        {languages.map((lang) => {
          const percentage = Math.min(100, Math.round(((lang.problemsSolved || 0) / maxSolved) * 100));

          return (
            <div key={lang.languageName} className="group">
              <div className="flex justify-between items-center text-sm font-semibold mb-2">
                <span className="text-slate-800 font-bold group-hover:text-sky-600 transition-colors">
                  {lang.languageName}
                </span>
                <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl text-xs border border-emerald-100 font-mono">
                  {lang.problemsSolved} solved
                </span>
              </div>

              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full transition-all duration-700 shadow-sm"
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