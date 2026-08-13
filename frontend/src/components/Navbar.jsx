import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);

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
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] lg:w-[88%] max-w-7xl z-50"
    >
      <div className="liquid-glass rounded-3xl px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
              LAC
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-800">
                LeetCode AI Coach
              </h1>
              <p className="text-xs text-slate-500">
                Learn • Practice • Improve
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-all duration-300 group ${
                  location.pathname === item.path
                    ? "text-sky-600"
                    : "text-slate-600 hover:text-sky-600"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-sky-500 transition-all duration-300 ${
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 rounded-xl border border-sky-200 text-sky-600 hover:bg-sky-50 transition-all inline-block font-medium"
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-xl border border-sky-200 text-sky-600 hover:bg-sky-50 transition-all inline-block font-medium"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* AI Coach Quick CTA */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/coach"
                    className="px-6 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-sky-500 to-blue-600 transition shadow-lg inline-block"
                  >
                    AI Coach
                  </Link>
                </motion.div>

                {/* Profile Avatar Dropdown Trigger */}
                <div className="relative" ref={profileMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="w-11 h-11 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-sky-200 cursor-pointer outline-none"
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
                        className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-sky-100/90 p-2 z-50 space-y-1"
                      >
                        {/* Profile Option */}
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigate("/profile");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors text-left cursor-pointer"
                        >
                          <User className="w-4 h-4 text-sky-500" />
                          Profile
                        </button>

                        <div className="border-t border-slate-100 my-1" />

                        {/* Logout Option */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
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
            className="lg:hidden text-sky-600 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl transition ${
                    location.pathname === item.path
                      ? "bg-sky-100 text-sky-600"
                      : "hover:bg-sky-50 text-slate-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-5 py-3 rounded-xl border border-sky-200 text-sky-600 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-5 py-3 rounded-xl border border-sky-200 text-sky-600 font-medium"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/coach"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-5 py-3 rounded-xl bg-sky-500 text-white font-medium"
                  >
                    AI Coach
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-5 py-3 rounded-xl bg-sky-50 text-sky-600 font-medium flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-3 rounded-xl border border-rose-200 text-rose-600 font-medium flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}