import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import Navbar from "../components/Navbar";
import InteractiveBackground from "../components/InteractiveBackground";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

      login(
        response.data.user,
        response.data.token
      );

      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "✓ AI Coding Coach",
    "✓ Learning Roadmaps",
    "✓ Progress Tracking",
    "✓ Interview Prep"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-slate-50">

      <InteractiveBackground />

      <Navbar />

      {/* Static Ambient Orbs */}
      <div className="absolute top-24 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

      <div
        className="
          min-h-screen
          grid
          lg:grid-cols-2
          pt-28
          relative
          z-10
        "
      >

        {/* Left Side */}

        <div
          className="
            hidden
            lg:flex
            flex-col
            justify-center
            px-20
          "
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1
              className="
                text-6xl
                font-extrabold
                leading-tight
                text-slate-800
              "
            >
              Continue Your

              <span className="text-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Coding Journey
              </span>
            </h1>

            <p
              className="
                mt-8
                text-xl
                text-slate-600
                max-w-lg
                leading-relaxed
              "
            >
              Solve LeetCode smarter
              with AI hints, guided
              explanations, learning
              roadmaps and progress
              tracking.
            </p>

            <div className="mt-10 space-y-4">
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-3 text-slate-700 font-semibold text-lg"
                >
                  <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold shadow-2xs">
                    ✓
                  </span>
                  {item.replace("✓ ", "")}
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* Right Side */}

        <div
          className="
            flex
            items-center
            justify-center
            px-6
            py-12
          "
        >

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="
              w-full
              max-w-md
              bg-white/80
              backdrop-blur-xl
              border
              border-sky-100/80
              rounded-3xl
              shadow-2xl
              p-8
              relative
            "
          >

            <h2
              className="
                text-4xl
                font-extrabold
                text-center
                text-slate-800
              "
            >
              Welcome Back
            </h2>

            <p
              className="
                text-center
                text-slate-500
                mt-3
              "
            >
              Login to continue your learning progress
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="
                  mt-5
                  bg-red-100
                  text-red-600
                  p-3.5
                  rounded-xl
                  text-sm
                  font-medium
                  text-center
                  border
                  border-red-200
                "
              >
                {error}
              </motion.div>
            )}

            <form
              onSubmit={handleLogin}
              className="
                mt-8
                space-y-4
              "
            >

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-sky-400
                  focus:border-sky-400
                  transition-all
                  text-slate-800
                "
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-sky-400
                  focus:border-sky-400
                  transition-all
                  text-slate-800
                "
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-4
                  rounded-xl
                  text-white
                  font-semibold
                  bg-gradient-to-r
                  from-sky-500
                  to-blue-600
                  shadow-lg
                  hover:shadow-sky-500/25
                  transition-all
                  cursor-pointer
                  disabled:opacity-60
                "
              >
                {loading ? "Logging In..." : "Login"}
              </motion.button>

            </form>

            <p
              className="
                mt-6
                text-center
                text-slate-600
              "
            >
              New User?

              <Link
                to="/register"
                className="
                  text-sky-600
                  ml-2
                  font-bold
                  hover:underline
                "
              >
                Create Account
              </Link>
            </p>

          </motion.div>

        </div>

      </div>

    </div>
  );
}