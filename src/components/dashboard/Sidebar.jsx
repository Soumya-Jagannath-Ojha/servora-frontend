import React from "react";

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
      active 
        ? "bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white shadow-sm" 
        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
    }`}
  >
    <span className={`material-symbols-outlined text-xl ${active ? "text-primary-brand" : ""}`}>{icon}</span>
    <span className={`text-sm font-bold tracking-tight ${active ? "font-black" : ""}`}>{label}</span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-[#0b0a19] border-r border-gray-100 dark:border-white/5 flex flex-col py-8 px-6 z-[70] transition-all duration-700 transform shadow-2xl shadow-gray-200/50 dark:shadow-black/60 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex items-center justify-between mb-10 px-2 lg:block">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent-brand rounded-lg flex items-center justify-center shadow-accent-brand">
            <span className="material-symbols-outlined text-white font-bold text-xl">rocket_launch</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-gray-900 dark:text-white leading-none">Servora</h1>
          </div>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        <NavItem icon="grid_view" label="Dashboard" active={activeTab === "Dashboard"} onClick={() => { setActiveTab("Dashboard"); toggleSidebar(); }} />
        <NavItem icon="folder" label="My Projects" active={activeTab === "My Projects"} onClick={() => { setActiveTab("My Projects"); toggleSidebar(); }} />
        <NavItem icon="assignment" label="Tasks" active={activeTab === "Tasks"} onClick={() => { setActiveTab("Tasks"); toggleSidebar(); }} />
        <NavItem icon="group" label="Team Members" active={activeTab === "Team Members"} onClick={() => { setActiveTab("Team Members"); toggleSidebar(); }} />
        <NavItem icon="security" label="Roles & Permissions" active={activeTab === "Roles & Permissions"} onClick={() => { setActiveTab("Roles & Permissions"); toggleSidebar(); }} />
        <NavItem icon="corporate_fare" label="Companies" active={activeTab === "Companies"} onClick={() => { setActiveTab("Companies"); toggleSidebar(); }} />
        <NavItem icon="description" label="Notes" active={activeTab === "Notes"} onClick={() => { setActiveTab("Notes"); toggleSidebar(); }} />
        <NavItem icon="settings" label="Settings" active={activeTab === "Settings"} onClick={() => { setActiveTab("Settings"); toggleSidebar(); }} />
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
        <button className="w-full bg-accent-brand text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 mb-4 transition-all active:scale-95 shadow-accent-brand text-sm">
          <span className="material-symbols-outlined text-base">add</span>
          <span>Create Project</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
