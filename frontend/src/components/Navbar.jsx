import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { User, LogOut, Flame } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getDashboard } from "../services/dashboardService";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [streakCount, setStreakCount] = useState(7);
  const profileMenuRef = useRef(null);

  // Smooth scroll listener to trigger navbar shrinking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch real LeetCode realtime streak for logged-in user or demo
  useEffect(() => {
    async function fetchUserStreak() {
      try {
        const username = user?.leetcode_username || user?.leetcodeUsername || "PurpleCrayon";
        const data = await getDashboard(username);
        const calendarData = data?.calendar?.matchedUser?.userCalendar || {};
        const streak = calendarData.realtimeStreak ?? calendarData.streak ?? calendarData.totalActiveDays ?? 7;
        setStreakCount(streak);
      } catch (err) {
        console.warn("Could not fetch streak for navbar:", err);
      }
    }
    fetchUserStreak();
  }, [user]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    { name: "Features", path: "/features" },
    { name: "Roadmap", path: "/roadmap" },
  ];

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto transition-all duration-300 ease-out"
        style={{
          width: scrolled ? "82%" : "92%",
          maxWidth: scrolled ? "1100px" : "1280px",
          marginTop: scrolled ? "12px" : "20px",
        }}
      >
        <div
          className={`liquid-glass border border-sky-200/90 shadow-2xl relative transition-all duration-300 ease-out ${
            scrolled
              ? "py-2.5 px-5 lg:px-6 rounded-2xl"
              : "py-3.5 px-6 lg:px-8 rounded-3xl"
          }`}
        >
          <div className="flex items-center justify-between gap-4">

            {/* Light Sky Blue Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div
                className={`rounded-2xl bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-sky-200 transition-all duration-300 ${
                  scrolled ? "w-9 h-9" : "w-10 h-10"
                }`}
              >
                LAC
              </div>

              <div className="flex flex-col">
                <h1
                  className={`font-extrabold text-slate-800 tracking-tight leading-none group-hover:text-sky-600 transition-all duration-300 ${
                    scrolled ? "text-base" : "text-lg"
                  }`}
                >
                  LeetCode AI Coach
                </h1>

                {!scrolled && (
                  <p className="text-[11px] font-semibold text-slate-500 mt-1 hidden sm:block">
                    Learn • Practice • Improve
                  </p>
                )}
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm font-bold transition-all duration-300 group py-1 ${
                    location.pathname === item.path
                      ? "text-sky-600"
                      : "text-slate-600 hover:text-sky-600"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 bottom-0 h-[2.5px] bg-sky-400 rounded-full transition-all duration-300 ${
                      location.pathname === item.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {/* Flame Symbol & Number Badge - Tracing Cursor shows "LeetCode Streak" */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
              >
                <div
                  className={`rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-sky-500/10 border border-amber-300/80 text-amber-800 flex items-center gap-1 shadow-2xs font-extrabold transition-all duration-300 ${
                    scrolled ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs"
                  }`}
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span className="tracking-tight font-extrabold">{streakCount}</span>
                </div>

                {/* Cursor Hover Tooltip */}
                <div className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center bg-slate-900 text-white text-[11px] font-extrabold py-1.5 px-3 rounded-xl shadow-2xl whitespace-nowrap z-50 border border-amber-400/40 pointer-events-none">
                  LeetCode Streak: {streakCount} {streakCount === 1 ? "Day" : "Days"}
                </div>
              </motion.div>

              {!user ? (
                <div className="flex items-center gap-2.5">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/login"
                      className={`rounded-xl border border-sky-200 text-sky-600 hover:bg-sky-50 transition-all inline-block font-bold text-xs ${
                        scrolled ? "px-4 py-1.5" : "px-5 py-2.5"
                      }`}
                    >
                      Login
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/register"
                      className={`rounded-xl liquid-button text-white transition-all inline-block font-bold text-xs shadow-md ${
                        scrolled ? "px-4 py-1.5" : "px-5 py-2.5"
                      }`}
                    >
                      Register
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Light Sky Blue AI Coach Quick CTA */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/coach"
                      className={`rounded-xl text-white font-bold text-xs liquid-button shadow-md inline-flex items-center gap-1.5 ${
                        scrolled ? "px-4 py-1.5" : "px-5 py-2.5"
                      }`}
                    >
                      AI Coach ⚡
                    </Link>
                  </motion.div>

                  {/* Light Sky Blue Profile Avatar Dropdown Trigger */}
                  <div className="relative" ref={profileMenuRef}>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className={`rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md ring-2 ring-sky-300 cursor-pointer outline-none transition-all duration-300 ${
                        scrolled ? "w-9 h-9" : "w-10 h-10"
                      }`}
                      title="User Profile Menu"
                    >
                      {user?.name?.charAt(0) || "U"}
                    </motion.button>

                    {/* Profile Dropdown Popover */}
                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-sky-200/90 p-2 z-50 space-y-1"
                        >
                          {/* Profile Option */}
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              navigate("/profile");
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors text-left cursor-pointer"
                          >
                            <User className="w-4 h-4 text-sky-500" />
                            Profile
                          </button>

                          <div className="border-t border-sky-100 my-1" />

                          {/* Logout Option */}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                          >
                            <LogOut className="w-4 h-4 text-rose-500" />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden text-sky-600 cursor-pointer p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-sky-100">
              {/* Clean Mobile Streak Badge */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-amber-50 to-sky-50 rounded-xl border border-amber-200 mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-amber-800">LeetCode Streak</span>
                </div>
                <span className="text-xs font-extrabold text-amber-700 bg-white px-2.5 py-0.5 rounded-lg border border-amber-200">
                  {streakCount} {streakCount === 1 ? "Day" : "Days"}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm transition ${
                      location.pathname === item.path
                        ? "bg-sky-100 text-sky-600"
                        : "hover:bg-sky-50 text-slate-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {!user ? (
                  <div className="flex flex-col gap-2 pt-2 border-t border-sky-100">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center px-4 py-2.5 rounded-xl border border-sky-200 text-sky-600 font-bold text-xs"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center px-4 py-2.5 rounded-xl liquid-button text-white font-bold text-xs"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-2 border-t border-sky-100">
                    <Link
                      to="/coach"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center px-4 py-2.5 rounded-xl liquid-button text-white font-bold text-xs"
                    >
                      AI Coach ⚡
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center px-4 py-2.5 rounded-xl bg-sky-50 text-sky-600 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}