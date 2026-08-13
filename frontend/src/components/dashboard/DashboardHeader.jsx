import CountUpRaw from "react-countup";
import { motion } from "framer-motion";

const CountUp = typeof CountUpRaw === "function" ? CountUpRaw : (CountUpRaw?.default || null);

export default function DashboardHeader({ dashboard }) {
  if (!dashboard?.profile?.matchedUser) return null;

  const profile = dashboard.profile.matchedUser.profile || {};
  const stats = dashboard.profile.matchedUser.submitStats?.acSubmissionNum || [];
  const solved = stats.find((s) => s.difficulty === "All")?.count || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-gradient-to-r
        from-sky-600
        via-blue-600
        to-indigo-700
        rounded-3xl
        p-10
        text-white
        shadow-xl
      "
    >
      <h1 className="text-4xl font-bold">
        Welcome back, {profile.realName || "Coder"} 👋
      </h1>

      <p className="mt-3 opacity-90">
        Keep pushing your limits today.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-10">
        <div>
          <h3 className="text-sm opacity-80">Total Solved</h3>
          <p className="text-4xl font-bold">
            {CountUp ? <CountUp end={solved} duration={2} /> : solved}
          </p>
        </div>

        <div>
          <h3 className="text-sm opacity-80">Reputation</h3>
          <p className="text-4xl font-bold">
            {CountUp ? <CountUp end={profile.reputation || 0} duration={2} /> : (profile.reputation || 0)}
          </p>
        </div>

        <div>
          <h3 className="text-sm opacity-80">Ranking</h3>
          <p className="text-4xl font-bold">
            #{CountUp ? <CountUp end={profile.ranking || 0} duration={2} /> : (profile.ranking || 0)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}