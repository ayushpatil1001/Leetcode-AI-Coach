import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import InteractiveBackground from "../components/InteractiveBackground";
import { useAuth } from "../context/AuthContext";
import { getDashboard } from "../services/dashboardService";

import DashboardLayout from "../components/dashboard/layout/DashboardLayout";
import Content from "../components/dashboard/layout/Content";
import AnalyticsGrid from "../components/dashboard/layout/AnalyticsGrid";
import ProfileHeader from "../components/dashboard/ProfileHeader";
import LanguageStats from "../components/dashboard/charts/LanguageStats";
import DashboardHero from "../components/dashboard/header/DashboardHero";

import StatsCards from "../components/dashboard/cards/StatsCards";
import AIInsights from "../components/dashboard/cards/AIInsights";

import SolvedChart from "../components/dashboard/charts/SolvedChart";
import ContributionHeatmap from "../components/dashboard/charts/Heatmap";
import TopicStats from "../components/dashboard/charts/TopicStats";

import ContestChart from "../components/dashboard/charts/ContestChart";
import Badges from "../components/dashboard/Badges";
import RecentActivity from "../components/dashboard/RecentActivity";

import AnimatedCard from "../components/dashboard/animations/AnimatedCard";
import DashboardMotion from "../components/dashboard/animations/DashboardMotion";
import DashboardLoader from "../components/dashboard/animations/DashboardLoader";

const DEFAULT_DEMO_USERNAME = "PurpleCrayon";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeUsername, setActiveUsername] = useState(DEFAULT_DEMO_USERNAME);
  const [inputUsername, setInputUsername] = useState("");
  const [savingUsername, setSavingUsername] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [user]);

  async function loadDashboard(usernameOverride = null) {
    setLoading(true);
    try {
      let usernameToFetch = usernameOverride;

      if (!usernameToFetch && user) {
        const userId = user.id || user.user_id;
        if (userId) {
          try {
            const profileRes = await axios.get(
              `http://localhost:8000/api/profile/${userId}`
            );
            if (profileRes.data && profileRes.data.leetcode_username) {
              usernameToFetch = profileRes.data.leetcode_username.trim();
            }
          } catch (err) {
            console.warn("Could not fetch profile API:", err);
          }
        }

        if (!usernameToFetch) {
          usernameToFetch = (user.leetcode_username || user.leetcodeUsername || "").trim();
        }
      }

      if (!usernameToFetch) {
        usernameToFetch = DEFAULT_DEMO_USERNAME;
        setIsDemoMode(true);
      } else {
        setIsDemoMode(false);
      }

      setActiveUsername(usernameToFetch);
      const data = await getDashboard(usernameToFetch);
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      try {
        const demoData = await getDashboard(DEFAULT_DEMO_USERNAME);
        setDashboard(demoData);
        setActiveUsername(DEFAULT_DEMO_USERNAME);
        setIsDemoMode(true);
      } catch (fallbackErr) {
        setDashboard(null);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleConnectUsername = async (e) => {
    if (e) e.preventDefault();
    const usernameToSave = inputUsername.trim();
    if (!usernameToSave) return;

    try {
      setSavingUsername(true);
      setLoading(true);

      if (user && (user.id || user.user_id)) {
        const userId = user.id || user.user_id;
        try {
          await axios.put(`http://localhost:8000/api/profile/${userId}`, {
            leetcode_username: usernameToSave,
          });
        } catch (err) {
          console.warn("Could not update profile database:", err);
        }
      }

      const data = await getDashboard(usernameToSave);
      setDashboard(data);
      setActiveUsername(usernameToSave);
      setIsDemoMode(false);
    } catch (err) {
      console.error("Connect Username Error:", err);
    } finally {
      setSavingUsername(false);
      setLoading(false);
    }
  };

  const loadDemoUser = async (demoUsername) => {
    setInputUsername(demoUsername);
    setLoading(true);
    try {
      const data = await getDashboard(demoUsername);
      setDashboard(data);
      setActiveUsername(demoUsername);
      setIsDemoMode(true);
    } catch (err) {
      console.error("Demo User Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardLoader username={activeUsername} />;
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-sky-50/50 relative overflow-hidden">
        <InteractiveBackground />
        <Navbar />

        <div className="max-w-4xl mx-auto pt-36 pb-20 px-6 relative z-10">
          <div className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl border border-sky-200/80 text-center relative overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white text-4xl shadow-lg mb-6">
              🚀
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Connect Your <span className="text-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">LeetCode</span> Account
            </h1>

            <p className="mt-4 text-slate-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              Enter any LeetCode username below to instantly unlock your complete analytics dashboard and AI performance insights.
            </p>

            {/* Form */}
            <form onSubmit={handleConnectUsername} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="Enter LeetCode Username (e.g. PurpleCrayon)"
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white/95 border border-sky-200 outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-slate-800 text-sm shadow-sm"
                required
              />
              <button
                type="submit"
                disabled={savingUsername}
                className="px-7 py-3.5 rounded-2xl liquid-button text-white font-bold text-sm shadow-lg cursor-pointer flex-shrink-0 disabled:opacity-60"
              >
                {savingUsername ? "Connecting..." : "Unlock Dashboard 🔓"}
              </button>
            </form>

            {/* Quick Demo Selector */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Try Demo Accounts:</span>
              <button
                onClick={() => loadDemoUser("PurpleCrayon")}
                className="px-3.5 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-xs border border-sky-300 cursor-pointer transition shadow-2xs"
              >
                ⭐ @PurpleCrayon (Rohin Garg)
              </button>
              <button
                onClick={() => loadDemoUser("leetcode")}
                className="px-3 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 cursor-pointer transition"
              >
                @leetcode
              </button>
              <button
                onClick={() => loadDemoUser("neal_wu")}
                className="px-3 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 cursor-pointer transition"
              >
                @neal_wu
              </button>
              <button
                onClick={() => loadDemoUser("tourist")}
                className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer transition"
              >
                @tourist
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/70 to-blue-50/60 relative overflow-hidden">
      <InteractiveBackground />
      <Navbar />

      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-sky-300/25 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-200/25 blur-[160px] pointer-events-none" />

      {/* Demo Banner */}
      {isDemoMode && (
        <div className="pt-28 pb-0 max-w-7xl mx-auto px-4 md:px-8 relative z-20">
          <div className="bg-gradient-to-r from-sky-400/95 via-sky-500/95 to-sky-600/95 backdrop-blur-md p-3.5 px-6 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg border border-white/40">
            <div className="flex items-center gap-3">
              <span className="bg-white text-sky-600 font-extrabold text-xs px-2.5 py-1 rounded-xl shadow-2xs">DEMO MODE</span>
              <p className="text-sm font-semibold">
                Viewing live metrics for demo account: <span className="font-bold underline">@{activeUsername}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="Connect your username..."
                className="px-3.5 py-1.5 rounded-xl text-xs text-slate-800 bg-white font-semibold outline-none border border-sky-100 shadow-2xs"
              />
              <button
                onClick={() => handleConnectUsername()}
                className="px-4 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs transition cursor-pointer shadow-sm"
              >
                Connect 🔗
              </button>
            </div>
          </div>
        </div>
      )}

      <DashboardLayout>
        <Content>
          <DashboardMotion>
            {/* 1. Full-Width Profile Banner */}
            <ProfileHeader dashboard={dashboard} />

            {/* 2. Welcome & Daily Activity Hero Section */}
            <DashboardHero dashboard={dashboard} />

            {/* 3. 4-Column Performance Metrics Cards */}
            <div className="mt-8">
              <AnimatedCard delay={0.1}>
                <StatsCards dashboard={dashboard} />
              </AnimatedCard>
            </div>

            {/* 4. Solved Problems & AI Performance Insights Grid */}
            <div className="mt-8">
              <AnimatedCard delay={0.15}>
                <AnalyticsGrid>
                  <SolvedChart dashboard={dashboard} />
                  <AIInsights dashboard={dashboard} />
                </AnalyticsGrid>
              </AnimatedCard>
            </div>

            {/* 5. 365-Day Annual Submission Heatmap */}
            <div className="mt-8">
              <AnimatedCard delay={0.2}>
                <ContributionHeatmap dashboard={dashboard} />
              </AnimatedCard>
            </div>

            {/* 6. Algorithmic Topics & Language Breakdown Grid */}
            <div className="mt-8">
              <AnimatedCard delay={0.25}>
                <AnalyticsGrid>
                  <TopicStats dashboard={dashboard} />
                  <LanguageStats dashboard={dashboard} />
                </AnalyticsGrid>
              </AnimatedCard>
            </div>

            {/* 7. Weekly Contest Rating Curve */}
            <div className="mt-8">
              <AnimatedCard delay={0.3}>
                <ContestChart dashboard={dashboard} />
              </AnimatedCard>
            </div>

            {/* 8. Recent Accepted Submissions & Badges Earned Grid */}
            <div className="mt-8 mb-10">
              <AnimatedCard delay={0.35}>
                <AnalyticsGrid>
                  <RecentActivity dashboard={dashboard} />
                  <Badges dashboard={dashboard} />
                </AnalyticsGrid>
              </AnimatedCard>
            </div>
          </DashboardMotion>
        </Content>
      </DashboardLayout>
    </div>
  );
}