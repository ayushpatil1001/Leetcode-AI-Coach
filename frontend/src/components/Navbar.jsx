import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Roadmap", path: "/roadmap" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        fixed
        top-5
        left-1/2
        -translate-x-1/2
        w-[95%]
        lg:w-[88%]
        max-w-7xl
        z-50
      "
    >
      <div
        className="
          bg-white/70
          backdrop-blur-2xl
          border
          border-white/50
          rounded-3xl
          shadow-[0_8px_30px_rgb(0,0,0,0.08)]
          px-6
          lg:px-8
          py-4
        "
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-gradient-to-br
                from-sky-500
                to-blue-600
                flex
                items-center
                justify-center
                text-white
                font-bold
                shadow-lg
              "
            >
              LC
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  relative
                  font-medium
                  transition-all
                  duration-300
                  group
                  ${
                    location.pathname === item.path
                      ? "text-sky-600"
                      : "text-slate-600 hover:text-sky-600"
                  }
                `}
              >
                {item.name}

                <span
                  className={`
                    absolute
                    left-0
                    -bottom-1
                    h-[2px]
                    bg-sky-500
                    transition-all
                    duration-300
                    ${
                      location.pathname === item.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">

            <button
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-sky-200
                text-sky-600
                hover:bg-sky-50
                transition-all
                duration-300
              "
            >
              Login
            </button>

            <Link
              to="/coach"
              className="
                px-6
                py-2.5
                rounded-xl
                text-white
                font-medium
                bg-gradient-to-r
                from-sky-500
                to-blue-600
                hover:scale-105
                transition-all
                duration-300
                shadow-lg
              "
            >
              Try AI Coach
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-sky-600"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
          >
            {mobileMenuOpen ? (
              <HiX size={28} />
            ) : (
              <HiMenu size={28} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6">

            <div className="flex flex-col gap-4">

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={`
                    px-4
                    py-3
                    rounded-xl
                    transition
                    ${
                      location.pathname === item.path
                        ? "bg-sky-100 text-sky-600"
                        : "hover:bg-sky-50 text-slate-700"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}

              <button
                className="
                  mt-2
                  px-5
                  py-3
                  rounded-xl
                  border
                  border-sky-200
                  text-sky-600
                "
              >
                Login
              </button>

              <Link
                to="/coach"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="
                  text-center
                  px-5
                  py-3
                  rounded-xl
                  text-white
                  bg-gradient-to-r
                  from-sky-500
                  to-blue-600
                "
              >
                Try AI Coach
              </Link>

            </div>

          </div>
        )}

      </div>
    </motion.nav>
  );
}