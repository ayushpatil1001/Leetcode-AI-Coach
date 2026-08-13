import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-sky-100 bg-white/70 backdrop-blur-md pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-sky-200">
            LAC
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
              LeetCode AI Coach
            </h3>
            <p className="text-xs font-medium text-slate-400">
              Personalized Algorithmic Mentorship
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-600">
          <Link to="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-sky-600 transition-colors">
            Dashboard
          </Link>
          <Link to="/features" className="hover:text-sky-600 transition-colors">
            Features
          </Link>
          <Link to="/roadmap" className="hover:text-sky-600 transition-colors">
            Roadmap
          </Link>
          <Link to="/coach" className="hover:text-sky-600 transition-colors">
            AI Coach
          </Link>
          <Link to="/profile" className="hover:text-sky-600 transition-colors">
            Profile
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs font-semibold text-slate-400">
          © {new Date().getFullYear()} LeetCode AI Coach. Built with Light Sky Blue Theme.
        </p>

      </div>
    </footer>
  );
}
