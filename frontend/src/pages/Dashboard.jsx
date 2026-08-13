import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import InteractiveBackground from "../components/InteractiveBackground";
import { useAuth } from "../context/AuthContext";
import { getDashboard } from "../services/dashboardService";

import DashboardLayout from "../components/dashboard/layout/DashboardLayout";
import Sidebar from "../components/dashboard/layout/Sidebar";
import Content from "../components/dashboard/layout/Content";
import AnalyticsGrid from "../components/dashboard/layout/AnalyticsGrid";
import ProfileHeader from "../components/dashboard/ProfileHeader";
import ProfileCard from "../components/dashboard/profile/ProfileCard";
import RankCard from "../components/dashboard/profile/RankCard";
import BadgeCard from "../components/dashboard/profile/BadgeCard";
import QuickLinks from "../components/dashboard/profile/QuickLinks";
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

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputUsername, setInputUsername] = useState("");
  const [savingUsername, setSavingUsername] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, [user]);

  async function loadDashboard() {
    setLoading(true);
    try {
      let usernameToFetch = "";

      if (user) {
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

      if (usernameToFetch) {
        const data = await getDashboard(usernameToFetch);
        setDashboard(data);
      } else {
        setDashboard(null);
      }
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  }

  const handleConnectUsername = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      console.error("Connect Username Error:", err);
      setDashboard(null);
    } finally {
      setSavingUsername(false);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 relative overflow-hidden">
        <InteractiveBackground />
        <Navbar />
        <div className="max-w-7xl mx-auto pt-36 px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-56 rounded-3xl bg-white/60 backdrop-blur-md" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-36 rounded-3xl bg-white/60 backdrop-blur-md" />
              ))}
            </div>
            <div className="h-96 rounded-3xl bg-white/60 backdrop-blur-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-slate-50 relative overflow-hidden">
        <InteractiveBackground />
        <Navbar />

        <div className="max-w-4xl mx-auto pt-36 pb-20 px-6 relative z-10">
          <div className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl border border-sky-100/90 text-center relative overflow-hidden">
            {/* Header Icon */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-4xl shadow-lg mb-6">
              🚀
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Connect Your <span className="text-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">LeetCode</span> Account
            </h1>

            <p className="mt-4 text-slate-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Enter any LeetCode username below to instantly unlock your complete analytics dashboard and AI performance insights.
            </p>

            {/* Inline Username Form */}
            <form onSubmit={handleConnectUsername} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="Enter LeetCode Username (e.g. leetcode)"
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white/90 border border-sky-200 outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-slate-800 text-sm shadow-sm"
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

            {/* Features Checklist Grid */}
            <div className="mt-10 grid sm:grid-cols-2 gap-3.5 text-left max-w-xl mx-auto">
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100/80 flex items-center gap-3 text-sm font-semibold text-slate-700 shadow-2xs">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                Contest Rating Tracking
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100/80 flex items-center gap-3 text-sm font-semibold text-slate-700 shadow-2xs">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                Contribution Heatmap
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100/80 flex items-center gap-3 text-sm font-semibold text-slate-700 shadow-2xs">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                Solved Problem Analytics
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100/80 flex items-center gap-3 text-sm font-semibold text-slate-700 shadow-2xs">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                AI Performance Insights
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100/80 flex items-center gap-3 text-sm font-semibold text-slate-700 shadow-2xs">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                Topic & Language Breakdown
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100/80 flex items-center gap-3 text-sm font-semibold text-slate-700 shadow-2xs">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                Badges & Contest History
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 relative overflow-hidden">
      <InteractiveBackground />
      <Navbar />

      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-sky-300/20 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-300/20 blur-[180px] pointer-events-none" />

      <DashboardLayout
        sidebar={
          <Sidebar dashboard={dashboard}>
            <ProfileCard dashboard={dashboard} />
            <RankCard dashboard={dashboard} />
            <BadgeCard dashboard={dashboard} />
            <LanguageStats dashboard={dashboard} />
            <QuickLinks dashboard={dashboard} />
          </Sidebar>
        }
      >
        <Content>
          <DashboardMotion>
            <ProfileHeader dashboard={dashboard} />
            <DashboardHero dashboard={dashboard} />

            <AnimatedCard delay={0.1}>
              <StatsCards dashboard={dashboard} />
            </AnimatedCard>

            <div className="mt-8">
              <AnimatedCard delay={0.15}>
                <SolvedChart dashboard={dashboard} />
              </AnimatedCard>
            </div>

            <div className="mt-8">
              <AnimatedCard delay={0.2}>
                <ContributionHeatmap dashboard={dashboard} />
              </AnimatedCard>
            </div>

            <div className="mt-8">
              <AnimatedCard delay={0.25}>
                <AnalyticsGrid>
                  <TopicStats dashboard={dashboard} />
                </AnalyticsGrid>
              </AnimatedCard>
            </div>

            <div className="mt-8">
              <AnimatedCard delay={0.3}>
                <ContestChart dashboard={dashboard} />
              </AnimatedCard>
            </div>

            <div className="mt-8">
              <AnimatedCard delay={0.32}>
                <Badges dashboard={dashboard} />
              </AnimatedCard>
            </div>

            <div className="mt-8 mb-10">
              <AnimatedCard delay={0.35}>
                <AnalyticsGrid>
                  <RecentActivity dashboard={dashboard} />
                  <AIInsights dashboard={dashboard} />
                </AnalyticsGrid>
              </AnimatedCard>
            </div>
          </DashboardMotion>
        </Content>
      </DashboardLayout>
    </div>
  );
}