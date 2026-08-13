export default function Badges({ dashboard }) {
  const badges = dashboard?.badges?.matchedUser?.badges || [];

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-sky-100 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Achievement Showcase
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              Badges Earned
            </h2>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200">
            {badges.length} Unlocked
          </span>
        </div>

        {badges.length === 0 ? (
          <div className="p-8 text-center bg-sky-50/50 rounded-2xl border border-sky-100">
            <p className="text-slate-500 font-semibold text-sm">
              No badges earned yet. Solve daily challenges and participate in contests on LeetCode to unlock achievement badges!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const iconUrl = badge.icon
                ? badge.icon.startsWith("http")
                  ? badge.icon
                  : `https://leetcode.com${badge.icon}`
                : "https://assets.leetcode.com/static_assets/public/images/badges/2026/monthly.png";

              return (
                <div
                  key={badge.id || badge.displayName}
                  className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-white/90 border border-sky-100 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all group"
                >
                  <img
                    src={iconUrl}
                    className="w-14 h-14 object-contain group-hover:scale-110 transition-transform"
                    alt={badge.displayName}
                  />
                  <p className="mt-2.5 font-bold text-slate-800 text-xs">
                    {badge.displayName}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}