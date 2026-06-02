import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

// Modular Components
import Sidebar from "./Sidebar";
import Header from "./Header";
import RolesPermissionsView from "./RolesPermissionsView";
import CompaniesListView from "./CompaniesListView";
import TeamMembersView from "./TeamMembersView";
import MyProjectsView from "./MyProjectsView";
import SettingsView from "./SettingsView";
import StatCard from "./StatCard";
import RecentProjectCard from "./RecentProjectCard";

const taskData = [
  { id: 1, name: "Update design tokens", due: "Oct 24, 2023", priority: "High", priorityColor: "bg-red-500/10 text-red-500", status: "pending" },
  { id: 2, name: "Fix mobile sidebar", due: "Oct 25, 2023", priority: "Medium", priorityColor: "bg-blue-500/10 text-blue-500", status: "completed" },
  { id: 3, name: "API Documentation", due: "Oct 26, 2023", priority: "Low", priorityColor: "bg-gray-500/10 text-gray-500", status: "pending" },
  { id: 4, name: "Client presentation", due: "Oct 27, 2023", priority: "High", priorityColor: "bg-red-500/10 text-red-500", status: "pending" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkUserSetupStatus = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URI;
        const res = await axios.post(`${apiUrl}/api/v1/auth/current-user`, {}, { withCredentials: true });
        const user = res.data?.data?.user;
        if (user) {
          dispatch(setUser(user));
          if (!user.isEmailVerified) {
            navigate(`/check-email/${encodeURIComponent(user.email)}`);
          } else if (!user.company) {
            navigate("/setup-workspace");
          } else if (!user.setupCompleted && user.isAdmin) {
            navigate("/setup-workspace");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkUserSetupStatus();
  }, [navigate, dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URI;

      const res = await axios.post(`${apiUrl}/api/v1/auth/logout`, {}, {
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(clearAuth());
        toast.success(res.data.message || "Logged out successfully!");
        navigate("/");
      } else {
        toast.error(res.data.message || "Failed to logout");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred during logout");
      // Fallback: clear flag and redirect anyway if the backend call fails
      dispatch(clearAuth());
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-gray-900 dark:text-white font-geist transition-all duration-700 ease-in-out overflow-x-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 min-h-screen transition-all duration-700 lg:ml-72">
        {/* Top App Bar */}
        <Header 
          toggleSidebar={toggleSidebar} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          handleLogout={handleLogout} 
        />

        {/* Dashboard Body */}
        <div
          key={activeTab}
          className="p-4 sm:p-6 md:p-12 space-y-10 max-w-[1600px] mx-auto animate-fade-in-up shadow-inner dark:shadow-black/20"
        >
          {activeTab === "Dashboard" ? (
            <MainDashboardView onSeeAllProjects={() => setActiveTab("My Projects")} currentUser={currentUser} />
          ) : activeTab === "My Projects" ? (
            <MyProjectsView />
          ) : activeTab === "Roles & Permissions" ? (
            <RolesPermissionsView />
          ) : activeTab === "Companies" ? (
            <CompaniesListView />
          ) : activeTab === "Team Members" ? (
            <TeamMembersView />
          ) : activeTab === "Settings" ? (
            <SettingsView />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <span className="material-symbols-outlined text-6xl mb-4 animate-float">construction</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeTab} Section</h2>
              <p className="text-sm text-center max-w-md">Our engineers are working hard to prepare this module for flight. Please check back shortly.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const MainDashboardView = ({ onSeeAllProjects, currentUser }) => {
  const displayName = currentUser?.fullName?.split(" ")[0] || currentUser?.username || "Alex";
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Welcome back, {displayName}!</h2>
      <div className="flex items-center gap-3 bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl w-fit">
        <span className="material-symbols-outlined text-blue-500">info</span>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">You have 12 active tasks across 4 projects today.</p>
      </div>
    </div>

    {/* Stats Cards Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Active Projects" value="14" subValue="+2 this month" subColor="text-emerald-500" />
      <StatCard label="Total Tasks" value="128" subValue="8 completed today" subColor="text-gray-400" />
      <StatCard label="Team Members" value="32" hasTrend icon="trending_up" />
      <StatCard label="Overall Progress" value="76%" isProgress progress={76} icon="analytics" />
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      {/* Left Column: Recent Projects & System Load */}
      <div className="xl:col-span-2 space-y-10">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Recent Projects</h3>
            <button onClick={onSeeAllProjects} className="text-sm font-bold text-blue-600 hover:underline">View all projects</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RecentProjectCard name="Nebula UI Kit" desc="Design system for enterprise monitoring.." progress={70} status="IN PROGRESS" statusColor="emerald" icon="cloud" iconBg="bg-blue-500/10" iconColor="text-blue-500" />
            <RecentProjectCard name="API Integration" desc="Connecting core services to the global.." progress={90} status="REVIEW" statusColor="amber" icon="hub" iconBg="bg-purple-500/10" iconColor="text-purple-500" />
            <RecentProjectCard name="Security Audit" desc="Quarterly security review of the productio.." progress={30} status="IN PROGRESS" statusColor="emerald" icon="security" iconBg="bg-emerald-500/10" iconColor="text-emerald-500" />
          </div>
        </section>

        <section className="glass-card p-8 rounded-[32px] space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">System Load</h3>
              <p className="text-xs text-gray-400 mt-1 font-bold">Real-time resource allocation monitoring.</p>
            </div>
            <span className="material-symbols-outlined text-gray-400">more_horiz</span>
          </div>
          <div className="flex items-end gap-3 h-48 pt-4">
            {[40, 60, 30, 90, 50, 70, 100, 60, 40].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-100 dark:bg-white/5 rounded-t-lg transition-all hover:bg-blue-500/20 relative group" style={{ height: `${h}%` }}>
                <div className={`absolute inset-0 rounded-t-lg transition-all ${h > 80 ? 'bg-blue-400/40' : h > 50 ? 'bg-blue-400/20' : 'bg-transparent'}`}></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: Recent Tasks & Pro Feature */}
      <div className="space-y-10">
        <section className="glass-card p-8 rounded-[32px] space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Recent Tasks</h3>
            <span className="material-symbols-outlined text-gray-400 cursor-pointer">filter_list</span>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-3 text-[10px] font-black text-gray-400 uppercase tracking-widest pb-2 border-b border-gray-100 dark:border-white/5">
              <span>Task Name</span>
              <span className="text-center">Priority</span>
              <span className="text-right">Status</span>
            </div>
            {taskData.map(task => (
              <div key={task.id} className="grid grid-cols-3 items-center group">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors cursor-pointer">{task.name}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Due {task.due}</p>
                </div>
                <div className="flex justify-center">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${task.priorityColor}`}>{task.priority}</span>
                </div>
                <div className="flex justify-right">
                  <button className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'completed' ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-200 dark:border-white/10'}`}>
                    {task.status === 'completed' && <span className="material-symbols-outlined text-[12px] font-black">done</span>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-xl shadow-blue-500/20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black tracking-tight">Pro Feature</h3>
            <p className="text-sm font-medium text-blue-50/80 leading-relaxed">Unlock advanced analytics and team performance metrics.</p>
            <button className="w-full py-3 bg-white text-blue-600 font-black rounded-xl hover:bg-blue-50 transition-all shadow-lg active:scale-95">Upgrade Now</button>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};



export default Dashboard;
