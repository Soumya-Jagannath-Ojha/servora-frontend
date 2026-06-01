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

const projectData = [
  {
    id: 1,
    name: "Nebula UI Kit",
    description: "Enterprise-grade design system for high-performance cloud architectures.",
    status: "IN PROGRESS",
    statusColor: "emerald",
    progress: 78,
    progressLabel: "DEVELOPMENT PROGRESS",
    manager: "Alex Rivera",
    icon: "grid_view",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    indicator: "On Track",
    indicatorColor: "text-emerald-500",
    members: [
      { id: 1, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 2, avatar: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 3, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    extraMembers: 4
  },
  {
    id: 2,
    name: "Titan Firewall",
    description: "Next-gen security layer with automated threat detection and...",
    status: "REVIEW",
    statusColor: "amber",
    progress: 92,
    progressLabel: "CODE AUDIT STATUS",
    manager: "Alex Rivera",
    icon: "security",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    indicator: "Due in 2d",
    indicatorIcon: "schedule",
    indicatorColor: "text-gray-400",
    members: [
      { id: 4, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    id: 3,
    name: "API Integration",
    description: "Legacy system migration and multi-cloud API gateway implementation fo...",
    status: "ON HOLD",
    statusColor: "gray",
    progress: 45,
    progressLabel: "MIGRATION PHASE",
    manager: "Alex Rivera",
    icon: "hub",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    indicator: "Delayed",
    indicatorIcon: "warning",
    indicatorColor: "text-red-500",
    members: [
      { id: 6, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    id: 4,
    name: "Quantum DB Engine",
    description: "Developing a revolutionary non-relational database engine optimized for sub-millisecond querying across exabyte-scale datasets.",
    status: "IN PROGRESS",
    statusColor: "emerald",
    progress: 60,
    progressLabel: "60% DONE",
    manager: "Alex Rivera",
    icon: "database",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    indicator: "Ahead of Schedule",
    indicatorIcon: "trending_up",
    indicatorColor: "text-emerald-500",
    membersCount: 12,
    dueDate: "Oct 24",
    isLarge: true
  },
  {
    id: 5,
    name: "Orbit Sync v2",
    description: "High-frequency data synchronization service for edge computing nodes an...",
    status: "COMPLETED",
    statusColor: "emerald",
    progress: 100,
    progressLabel: "DEPLOYMENT",
    manager: "Alex Rivera",
    icon: "rocket_launch",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    indicator: "Archived Aug 12",
    indicatorIcon: "archive",
    indicatorColor: "text-gray-400",
    members: [
      { id: 7, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  }
];

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
      <main className="flex-1 min-h-screen transition-all duration-700 lg:ml-72">
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
          className="p-6 md:p-12 space-y-10 max-w-[1600px] mx-auto animate-fade-in-up shadow-inner dark:shadow-black/20"
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

// --- View: My Projects ---

const MyProjectsView = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">My Projects</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <p className="text-[11px] text-gray-500 font-bold">14 Active Projects</p>
            </div>
          </div>
          <div className="flex sm:hidden bg-gray-100 dark:bg-white/5 p-1 rounded-xl h-10 items-center">
            <button className="h-full px-3 rounded-lg bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-base">grid_view</span>
            </button>
            <button className="h-full px-3 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-base">list</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
          <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-between px-4 h-11 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm">
              <span>Status: All</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <button className="flex items-center justify-between px-4 h-11 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm">
              <span>Category: All</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
          <div className="hidden sm:flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl h-11 items-center">
            <button className="h-full px-4 rounded-lg bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button className="h-full px-4 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">list</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projectData.map((project) => (
          project.isLarge ? (
            <LargeProjectCard key={project.id} project={project} />
          ) : (
            <ProjectCard key={project.id} project={project} />
          )
        ))}
      </div>
    </div>
  );
}

// --- Specialized Components ---

const StatCard = ({ label, value, subValue, subColor, hasTrend, isProgress, progress, icon }) => {
  let colorTheme = {
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/20",
    barColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/5",
    iconName: icon || "work"
  };

  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("task")) {
    colorTheme = {
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
      text: "text-purple-500 dark:text-purple-400",
      border: "border-purple-500/20",
      barColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      glow: "shadow-purple-500/5",
      iconName: icon || "task_alt"
    };
  } else if (lowerLabel.includes("member") || lowerLabel.includes("team")) {
    colorTheme = {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      text: "text-emerald-500 dark:text-emerald-400",
      border: "border-emerald-500/20",
      barColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/5",
      iconName: icon || "group"
    };
  } else if (lowerLabel.includes("progress") || lowerLabel.includes("analytics")) {
    colorTheme = {
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      text: "text-amber-500 dark:text-amber-400",
      border: "border-amber-500/20",
      barColor: "bg-gradient-to-r from-amber-500 to-orange-500",
      glow: "shadow-amber-500/5",
      iconName: icon || "analytics"
    };
  }

  return (
    <div className={`glass-card p-6 rounded-[28px] relative overflow-hidden group border border-gray-100 dark:border-white/5 shadow-lg ${colorTheme.glow} transition-all duration-300`}>
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorTheme.text}`} />
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">{label}</p>
          <h4 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{value}</h4>
        </div>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${colorTheme.bg}`}>
          <span className={`material-symbols-outlined text-xl ${colorTheme.text}`}>{colorTheme.iconName}</span>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        {isProgress ? (
          <div className="w-full space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-gray-500">
              <span>Progress</span>
              <span className={colorTheme.text}>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${colorTheme.barColor}`} 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            {hasTrend && (
              <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs font-black">trending_up</span>
                <span>+12%</span>
              </div>
            )}
            {subValue && (
              <span className={`text-[11px] font-bold ${subColor || 'text-gray-400'}`}>
                {subValue}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const RecentProjectCard = ({ name, desc, progress, status, statusColor, icon, iconBg, iconColor }) => (
  <div className="glass-card p-6 rounded-[28px] space-y-6 group">
    <div className="flex justify-between items-start">
      <div className={`${iconBg} w-10 h-10 rounded-xl flex items-center justify-center`}>
        <span className={`material-symbols-outlined ${iconColor} text-xl`}>{icon}</span>
      </div>
      <span className={`px-2 py-0.5 text-[8px] font-black rounded-full border border-white/5 ${statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
        }`}>
        {status}
      </span>
    </div>
    <div>
      <h4 className="text-sm font-black text-gray-900 dark:text-white">{name}</h4>
      <p className="text-[10px] text-gray-400 font-bold mt-1 line-clamp-1">{desc}</p>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex -space-x-1.5">
        <img className="w-6 h-6 rounded-full border border-white dark:border-[#161432] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="" />
        <img className="w-6 h-6 rounded-full border border-white dark:border-[#161432] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="" />
        <img className="w-6 h-6 rounded-full border border-white dark:border-[#161432] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="" />
      </div>
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle className="text-gray-100 dark:text-white/5" cx="50%" cy="50%" r="40%" fill="transparent" stroke="currentColor" strokeWidth="2"></circle>
          <circle className="text-blue-500" cx="50%" cy="50%" r="40%" fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - progress}></circle>
        </svg>
        <span className="absolute text-[7px] font-black text-gray-900 dark:text-white">{progress}%</span>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="glass-card p-6 md:p-8 rounded-3xl space-y-6 group">
    <div className="flex justify-between items-start">
      <div className={`${project.iconBg} w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center shrink-0`}>
        <span className={`material-symbols-outlined ${project.iconColor} text-2xl`}>{project.icon}</span>
      </div>
      <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest border border-white/5 ${project.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
          project.statusColor === 'amber' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }`}>
        {project.status}
      </span>
    </div>

    <div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{project.name}</h4>
      <p className="text-xs text-gray-400 mt-2 font-medium leading-relaxed line-clamp-2">{project.description}</p>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <span>{project.progressLabel}</span>
        <span className="text-gray-900 dark:text-white">{project.progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${project.iconColor.replace('text', 'bg')} rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
    </div>

    <div className="flex items-center justify-between pt-5 border-t border-gray-50 dark:border-white/5">
      <div className="flex -space-x-2">
        {project.members && project.members.map((m, idx) => (
          <img key={idx} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#161432] shadow-sm object-cover" src={m.avatar} alt="Member" />
        ))}
        {project.extraMembers && (
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400 border-2 border-white dark:border-[#161432] shadow-sm">+{project.extraMembers}</div>
        )}
      </div>
      <div className={`flex items-center gap-1.5 text-[11px] font-black ${project.indicatorColor}`}>
        {project.indicatorIcon && <span className="material-symbols-outlined text-sm">{project.indicatorIcon}</span>}
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        <span className="hidden xs:inline">{project.indicator}</span>
      </div>
    </div>
  </div>
);

const LargeProjectCard = ({ project }) => (
  <div className="lg:col-span-2 glass-card p-6 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col md:flex-row gap-8 md:gap-10 items-center group relative overflow-hidden">
    {/* Abstract Glow */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

    <div className="flex-1 space-y-6 md:space-y-8 z-10 w-full">
      <div className="flex items-center gap-4">
        <div className={`${project.iconBg} w-14 h-14 rounded-xl flex items-center justify-center shrink-0`}>
          <span className={`material-symbols-outlined ${project.iconColor} text-3xl`}>{project.icon}</span>
        </div>
        <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
          {project.status}
        </span>
      </div>

      <div>
        <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{project.name}</h4>
        <p className="text-sm text-gray-400 mt-4 leading-relaxed font-medium">{project.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:gap-10 pt-4">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Team Size</p>
          <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{project.membersCount} Leads</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Due Date</p>
          <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{project.dueDate}</p>
        </div>
      </div>
    </div>

    <div className="relative w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center z-10 shrink-0">
      <svg className="w-full h-full -rotate-90">
        <circle className="text-gray-100 dark:text-white/5" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeWidth="12"></circle>
        <circle
          className="text-blue-600/20"
          cx="50%" cy="50%"
          fill="transparent"
          r="42%"
          stroke="currentColor"
          strokeWidth="12"
        ></circle>
        <circle
          className="text-blue-600 drop-shadow-[0_0_12px_rgba(37,99,235,0.4)]"
          cx="50%" cy="50%"
          fill="transparent"
          r="42%"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray="596.6"
          strokeDashoffset={596.6 - (596.6 * project.progress) / 100}
          strokeLinecap="round"
          style={{ strokeDasharray: '264', strokeDashoffset: 264 - (264 * project.progress) / 100 }}
        ></circle>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{project.progress}%</span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Done</span>
      </div>
      <div className={`mt-4 md:mt-6 flex items-center gap-2 text-[11px] font-black ${project.indicatorColor}`}>
        <span className="material-symbols-outlined text-sm">{project.indicatorIcon}</span>
        {project.indicator}
      </div>
    </div>
  </div>
);

export default Dashboard;
