import { motion } from "framer-motion";

export default function ProfileHeader({ dashboard }) {
  if (!dashboard || !dashboard.profile || !dashboard.profile.matchedUser) {
    return null;
  }

  const user = dashboard.profile.matchedUser;
  const profile = user.profile || {};
  const stats = user.submitStats?.acSubmissionNum || [];
  const solved = stats.find((s) => s.difficulty === "All") || { count: 0 };
  const contestBadge = dashboard.contest?.userContestRanking?.badge?.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        liquid-glass
        rounded-3xl
        overflow-hidden
        mb-8
        relative
        shadow-2xl
      "
    >
      {/* Banner in Light Sky Blue gradient */}
      <div className="h-52 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 relative">
        <img
          src={profile.userAvatar || "https://assets.leetcode.com/users/default_avatar.jpg"}
          alt="avatar"
          className="
            absolute
            left-8
            bottom-[-45px]
            w-28
            h-28
            md:w-32
            md:h-32
            rounded-full
            border-4
            border-white
            object-cover
            shadow-2xl
            bg-white
          "
        />

        {contestBadge && (
          <div className="absolute right-6 top-6 bg-white/25 backdrop-blur-md border border-white/40 text-white px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-md">
            🛡️ {contestBadge}
          </div>
        )}
      </div>

      <div className="pt-14 px-6 md:px-8 pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                {profile.realName || user.username}
              </h1>
              {contestBadge && (
                <span className="bg-sky-100 text-sky-700 text-xs font-extrabold px-3 py-1 rounded-xl border border-sky-200">
                  {contestBadge}
                </span>
              )}
            </div>
            <p className="mt-1 text-slate-500 font-semibold text-sm">@{user.username}</p>

            {profile.aboutMe && (
              <p className="mt-2.5 text-slate-600 max-w-xl text-sm leading-relaxed font-medium">
                {profile.aboutMe}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2.5 text-xs font-bold text-slate-600">
              {profile.school && (
                <span className="bg-sky-50 px-3 py-1 rounded-xl border border-sky-100">
                  🎓 {profile.school}
                </span>
              )}
              {profile.company && (
                <span className="bg-sky-50 px-3 py-1 rounded-xl border border-sky-100">
                  💼 {profile.company}
                </span>
              )}
              {profile.countryName && (
                <span className="bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                  🌍 {profile.countryName}
                </span>
              )}
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
              <div className="bg-sky-50/90 p-3.5 rounded-2xl border border-sky-100 text-center">
                <h2 className="text-2xl font-extrabold text-sky-600">
                  {solved.count}
                </h2>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-0.5">
                  Problems Solved
                </p>
              </div>

              <div className="bg-emerald-50/90 p-3.5 rounded-2xl border border-emerald-100 text-center">
                <h2 className="text-2xl font-extrabold text-emerald-600">
                  #{profile.ranking ? profile.ranking.toLocaleString() : "N/A"}
                </h2>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-0.5">
                  Global Rank
                </p>
              </div>

              <div className="bg-amber-50/90 p-3.5 rounded-2xl border border-amber-100 text-center">
                <h2 className="text-2xl font-extrabold text-amber-500">
                  {profile.reputation || 0}
                </h2>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-0.5">
                  Reputation
                </p>
              </div>

              <div className="bg-sky-50/90 p-3.5 rounded-2xl border border-sky-100 text-center">
                <h2 className="text-2xl font-extrabold text-sky-600">
                  {profile.starRating || 0} ★
                </h2>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-0.5">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}