import { motion } from "framer-motion";

export default function WelcomeCard({ dashboard }) {
  if (!dashboard?.profile?.matchedUser) return null;

  const user = dashboard.profile.matchedUser;
  const name = user.profile?.realName || user.username || "LeetCoder";

  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-3xl
        bg-gradient-to-r
        from-sky-400
        via-sky-500
        to-sky-600
        p-8
        md:p-10
        text-white
        shadow-2xl
        relative
        overflow-hidden
      "
    >
      <div className="relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3.5 py-1.5 rounded-full text-white/90 backdrop-blur-md">
          {greeting} ⚡
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3">
          Welcome back, {name}
        </h1>
        <p className="mt-3 text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
          Track your algorithmic progress, analyze LeetCode submission trends, and sharpen your coding skills.
        </p>
      </div>

      <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
    </motion.div>
  );
}