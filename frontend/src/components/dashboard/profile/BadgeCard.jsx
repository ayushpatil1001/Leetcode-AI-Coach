export default function BadgeCard({ dashboard }) {
  const badges = dashboard?.badges?.matchedUser?.badges || [];

  return (
    <div className="liquid-glass rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
          Recent Badges
        </h2>
        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-100">
          {badges.length}
        </span>
      </div>

      <div className="space-y-3">
        {badges.length === 0 ? (
          <p className="text-slate-500 text-xs font-medium p-3 text-center bg-slate-50 rounded-xl">
            No badges unlocked yet.
          </p>
        ) : (
          badges.slice(0, 4).map((badge) => {
            const iconUrl = badge.icon
              ? badge.icon.startsWith("http")
                ? badge.icon
                : `https://leetcode.com${badge.icon}`
              : "https://assets.leetcode.com/static_assets/public/images/badges/2026/monthly.png";

            return (
              <div
                key={badge.id || badge.displayName}
                className="flex items-center gap-3 bg-white/80 p-3 rounded-2xl border border-slate-100 shadow-2xs group"
              >
                <img
                  src={iconUrl}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                  alt={badge.displayName}
                />
                <div>
                  <h3 className="font-bold text-slate-800 text-xs">
                    {badge.displayName}
                  </h3>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}