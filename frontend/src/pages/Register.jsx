import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import Navbar from "../components/Navbar";
import InteractiveBackground from "../components/InteractiveBackground";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name,
          email,
          password,
          leetcode_username: leetcodeUsername.trim() || undefined,
        }
      );

      login(
        response.data.user,
        response.data.token
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-slate-50 flex flex-col justify-between">

      <div>
        <InteractiveBackground />
        <Navbar />

        {/* Static Ambient Orbs */}
        <div className="absolute top-24 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
            pt-36
            pb-20
            px-6
            relative
            z-10
          "
        >

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="
              w-full
              max-w-md
              liquid-glass
              rounded-3xl
              shadow-2xl
              p-8
              md:p-10
              relative
              border
              border-sky-200/90
            "
          >

            <h2
              className="
                text-3xl
                md:text-4xl
                font-extrabold
                text-center
                text-slate-800
                tracking-tight
              "
            >
              Create Account
            </h2>

            <p
              className="
                text-center
                text-slate-500
                mt-2
                text-sm
                font-medium
              "
            >
              Start mastering LeetCode with AI Mentorship
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="
                  mt-5
                  bg-rose-50
                  text-rose-600
                  p-3.5
                  rounded-2xl
                  text-xs
                  font-bold
                  text-center
                  border
                  border-rose-200
                "
              >
                {error}
              </motion.div>
            )}

            <form
              onSubmit={handleRegister}
              className="
                mt-8
                space-y-4
              "
            >

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="
                    w-full
                    p-3.5
                    px-4
                    rounded-2xl
                    border
                    border-sky-200
                    bg-white/95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-400
                    transition-all
                    text-slate-800
                    font-semibold
                    text-sm
                  "
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    w-full
                    p-3.5
                    px-4
                    rounded-2xl
                    border
                    border-sky-200
                    bg-white/95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-400
                    transition-all
                    text-slate-800
                    font-semibold
                    text-sm
                  "
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                    w-full
                    p-3.5
                    px-4
                    rounded-2xl
                    border
                    border-sky-200
                    bg-white/95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-400
                    transition-all
                    text-slate-800
                    font-semibold
                    text-sm
                  "
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">LeetCode Username (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. PurpleCrayon"
                  value={leetcodeUsername}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                  className="
                    w-full
                    p-3.5
                    px-4
                    rounded-2xl
                    border
                    border-sky-200
                    bg-white/95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-400
                    transition-all
                    text-slate-800
                    font-semibold
                    text-sm
                  "
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-3.5
                  rounded-2xl
                  text-white
                  font-extrabold
                  text-sm
                  liquid-button
                  shadow-lg
                  transition-all
                  cursor-pointer
                  disabled:opacity-60
                  mt-2
                "
              >
                {loading ? "Creating Account..." : "Create Account 🚀"}
              </motion.button>

            </form>

            <p
              className="
                mt-6
                text-center
                text-slate-500
                text-xs
                font-semibold
              "
            >
              Already have an account?

              <Link
                to="/login"
                className="
                  text-sky-600
                  ml-1.5
                  font-extrabold
                  hover:underline
                "
              >
                Login Here
              </Link>
            </p>

          </motion.div>

        </div>
      </div>

    </div>
  );
}