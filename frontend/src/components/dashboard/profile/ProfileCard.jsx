import { motion } from "framer-motion";
import ProfileCompletion from "./ProfileCompletion";

export default function ProfileCard({ dashboard }) {
  if (!dashboard?.profile?.matchedUser) return null;

  const user = dashboard.profile.matchedUser;
  const profile = user.profile || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <img
          src={profile.userAvatar || "https://assets.leetcode.com/users/default_avatar.jpg"}
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-sky-400 shadow-xl object-cover"
        />

        <h2 className="text-2xl font-extrabold text-slate-800 mt-5 text-center tracking-tight">
          {profile.realName || user.username}
        </h2>

        <p className="text-slate-500 font-medium mt-1">@{user.username}</p>

        <div className="mt-6 w-full grid grid-cols-2 gap-4">
          <div className="bg-sky-50/80 rounded-2xl p-4 text-center border border-sky-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reputation
            </p>
            <h3 className="text-2xl font-bold text-sky-600 mt-1">
              {profile.reputation || 0}
            </h3>
          </div>

          <div className="bg-indigo-50/80 rounded-2xl p-4 text-center border border-indigo-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ranking
            </p>
            <h3 className="text-2xl font-bold text-indigo-600 mt-1">
              #{profile.ranking ? profile.ranking.toLocaleString() : "N/A"}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ProfileCompletion percentage={82} />
      </div>
    </motion.div>
  );
}