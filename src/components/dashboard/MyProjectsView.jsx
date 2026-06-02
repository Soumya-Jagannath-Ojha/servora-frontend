import React from "react";

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
};

export default MyProjectsView;
