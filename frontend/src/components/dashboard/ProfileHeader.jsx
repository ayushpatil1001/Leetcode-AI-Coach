import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProfileHeader({ dashboard }) {
  if (!dashboard || !dashboard.profile || !dashboard.profile.matchedUser) {
    return null;
  }

  const user = dashboard.profile.matchedUser;
  const profile = user.profile || {};
  const stats = user.submitStats?.acSubmissionNum || [];
  const solved = stats.find((s) => s.difficulty === "All") || { count: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        liquid-glass
        rounded-3xl
        overflow-hidden
        mb-10
        relative
      "
    >
      {/* Banner */}
      <div className="h-56 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 relative">
        <img
          src={profile.userAvatar || "https://assets.leetcode.com/users/default_avatar.jpg"}
          alt="avatar"
          className="
            absolute
            left-10
            bottom-[-50px]
            w-32
            h-32
            rounded-full
            border-4
            border-white
            object-cover
            shadow-2xl
            bg-white
          "
        />
      </div>

      <div className="pt-16 px-10 pb-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
              {profile.realName || user.username}
            </h1>
            <p className="mt-1 text-slate-500 font-medium">@{user.username}</p>
            {profile.aboutMe && (
              <p className="mt-3 text-slate-600 max-w-xl text-sm leading-relaxed">
                {profile.aboutMe}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
              {profile.school && (
                <span className="bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100">
                  🎓 {profile.school}
                </span>
              )}
              {profile.company && (
                <span className="bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                  💼 {profile.company}
                </span>
              )}
              {profile.countryName && (
                <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  🌍 {profile.countryName}
                </span>
              )}
            </div>
          </div>

          <div className="text-left lg:text-right">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
              <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-100 text-center">
                <h2 className="text-3xl font-extrabold text-sky-600">
                  {solved.count}
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Problems Solved
                </p>
              </div>

              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100 text-center">
                <h2 className="text-3xl font-extrabold text-emerald-600">
                  #{profile.ranking ? profile.ranking.toLocaleString() : "N/A"}
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Global Rank
                </p>
              </div>

              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-100 text-center">
                <h2 className="text-3xl font-extrabold text-amber-500">
                  {profile.reputation || 0}
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Reputation
                </p>
              </div>

              <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-100 text-center">
                <h2 className="text-3xl font-extrabold text-purple-600">
                  {profile.starRating || 0} ★
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Rating
                </p>
              </div>
            </div>

            {profile.websites && profile.websites.length > 0 && (
              <a
                href={profile.websites[0]}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-block
                  mt-6
                  px-6
                  py-2.5
                  rounded-xl
                  liquid-button
                  text-white
                  font-bold
                  text-sm
                "
              >
                Visit Website 🔗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}