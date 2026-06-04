import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../store/slices/projectSlice";
import ProjectCard from "./ProjectCard";
import ProjectsTableView from "./ProjectsTableView";
import CreateProjectModal from "./CreateProjectModal";
import ProjectDetailsModal from "./ProjectDetailsModal";

const avatarUrls = [
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop"
];

const MyProjectsView = () => {
  const dispatch = useDispatch();
  const { projects = [], loading = false } = useSelector((state) => state.projects || {});
  
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Map real projects to the structure the card/table component expects
  const displayProjects = projects.length > 0 ? projects.map((item, index) => {
    const p = item.project || item;
    const isCompleted = p.status === "Completed";
    const isOnHold = p.status === "On Hold";
    
    const count = p.members || 1;
    const membersList = Array.from({ length: Math.min(count, 3) }, (_, idx) => ({
      id: idx,
      avatar: avatarUrls[idx % avatarUrls.length]
    }));
    
    return {
      id: p._id,
      name: p.name,
      description: p.description || "No description provided.",
      status: p.status ? p.status.toUpperCase() : "ACTIVE",
      statusColor: isCompleted ? "emerald" : isOnHold ? "amber" : "emerald",
      progress: p.progress || 0,
      progressLabel: "DEVELOPMENT PROGRESS",
      manager: "Manager",
      icon: index % 3 === 0 ? "grid_view" : index % 3 === 1 ? "security" : "hub",
      iconBg: index % 3 === 0 ? "bg-blue-500/10" : index % 3 === 1 ? "bg-amber-500/10" : "bg-purple-500/10",
      iconColor: index % 3 === 0 ? "text-blue-500" : index % 3 === 1 ? "text-amber-500" : "text-purple-500",
      indicator: p.status || "Active",
      indicatorIcon: isCompleted ? "archive" : isOnHold ? "warning" : "trending_up",
      indicatorColor: isCompleted ? "text-emerald-500" : isOnHold ? "text-red-500" : "text-emerald-500",
      members: membersList,
      extraMembers: count > 3 ? count - 3 : 0,
      isLarge: false,
      membersCount: count,
      dueDate: p.endDate ? new Date(p.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Oct 24",
      rawProject: p,
    };
  }) : [];

  if (loading && projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest animate-pulse">Loading Projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">My Projects</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <p className="text-[11px] text-gray-500 font-bold">{displayProjects.length} Active Projects</p>
            </div>
          </div>
          <div className="flex sm:hidden bg-gray-100 dark:bg-white/5 p-1 rounded-xl h-10 items-center">
            <button 
              onClick={() => setViewType("grid")}
              className={`h-full px-3 rounded-lg flex items-center justify-center transition-all ${
                viewType === "grid" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">grid_view</span>
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`h-full px-3 rounded-lg flex items-center justify-center transition-all ${
                viewType === "list" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
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
          <button 
            onClick={() => {
              setProjectToEdit(null);
              setCreateModalOpen(true);
            }}
            className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black  rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-blue-500/20 shrink-0"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Create Project</span>
          </button>
          <div className="hidden sm:flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl h-11 items-center">
            <button 
              onClick={() => setViewType("grid")}
              className={`h-full px-4 rounded-lg flex items-center justify-center transition-all ${
                viewType === "grid" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`h-full px-4 rounded-lg flex items-center justify-center transition-all ${
                viewType === "list" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-lg">list</span>
            </button>
          </div>
        </div>
      </div>

      {displayProjects.length > 0 ? (
        viewType === "list" ? (
          <ProjectsTableView 
            displayProjects={displayProjects} 
            onSelectProject={(project) => setSelectedProject(project)} 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up">
            {displayProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 border border-dashed border-gray-100 dark:border-white/5 rounded-3xl">
          <span className="material-symbols-outlined text-6xl mb-4 animate-float">folder_open</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">No Projects Found</h2>
          <p className="text-xs text-center max-w-xs mt-1 text-gray-400">Get started by setting up a project in your workspace.</p>
        </div>
      )}

      {/* Modular Project Creation Modal */}
      <CreateProjectModal 
        isOpen={createModalOpen} 
        onClose={() => {
          setCreateModalOpen(false);
          setProjectToEdit(null);
        }} 
        onSubmitSuccess={() => dispatch(fetchProjects())} 
        projectToEdit={projectToEdit}
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onEdit={(proj) => {
          setProjectToEdit(proj);
          setCreateModalOpen(true);
        }}
      />
    </div>
  );
};

export default MyProjectsView;
