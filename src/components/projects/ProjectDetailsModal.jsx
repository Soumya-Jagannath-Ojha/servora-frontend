import React from "react";
import { createPortal } from "react-dom";

const ProjectDetailsModal = ({ project, onClose, onEdit }) => {
  if (!project) return null;

  // Retrieve raw project values from the Redux mapped project
  // project has all mapped fields, but some details might be nested or direct
  const p = project.rawProject || project;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#121124] rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl animate-scale-in relative z-10 my-auto flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-gray-100 dark:border-white/5 pb-5 px-8 pt-8 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Project ID: <span className="font-mono text-gray-900 dark:text-gray-100">{p.projectId || p._id}</span></span>
              <span className="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {project.status || "ACTIVE"}
              </span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{project.name}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-955 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-8 space-y-8">
          {/* Progress & Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {project.description || "No description provided."}
              </p>
            </div>
            
            <div className="glass-card p-5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-3 bg-gray-50/30 dark:bg-white/5">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>Progress</span>
                <span className="text-gray-900 dark:text-white">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${project.iconColor ? project.iconColor.replace('text', 'bg') : 'bg-blue-500'} rounded-full transition-all duration-1000`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">{project.progressLabel}</p>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-white/5" />

          {/* Key Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Start Date</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {p.startDate ? new Date(p.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Due Date</p>
              <p className="text-sm font-bold text-gray-950 dark:text-white">
                {p.endDate ? new Date(p.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Budget</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {p.budget ? `$${p.budget.toLocaleString()}` : "Not Specified"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Project Type</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {p.projectType || "N/A"}
              </p>
            </div>
          </div>

          {/* Client Information */}
          <div className="glass-card p-6 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">Client Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Client Name</p>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{p.client?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Client Email</p>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{p.client?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Client Phone</p>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{p.client?.phone || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Members / Team Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Assigned Members ({p.assignedMembers?.length || 0})</h4>
            <div className="flex flex-wrap gap-2">
              {p.assignedMembers && p.assignedMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-xl text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>{member.fullName || member.username || "Member"}: <span className="font-normal opacity-85">{member.role || "Developer"}</span></span>
                </div>
              ))}
              {(!p.assignedMembers || p.assignedMembers.length === 0) && (
                <p className="text-xs text-gray-400 italic">No assigned members staged for this project.</p>
              )}
            </div>
          </div>

          {/* Vendors & Penalties tabs/lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vendors List */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">Vendors ({p.vendors?.length || 0})</h4>
              <div className="space-y-2">
                {p.vendors && p.vendors.map((vendor, index) => (
                  <div key={index} className="bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-3.5 space-y-1.5">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{vendor.name}</p>
                    {vendor.location && <p className="text-[10px] text-gray-400 font-bold">Location: {vendor.location}</p>}
                    {vendor.gstNumber && <p className="text-[10px] text-gray-400 font-mono">GST: {vendor.gstNumber}</p>}
                    {vendor.details && <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{vendor.details}</p>}
                  </div>
                ))}
                {(!p.vendors || p.vendors.length === 0) && (
                  <p className="text-xs text-gray-400 italic">No staged vendors listed.</p>
                )}
              </div>
            </div>

            {/* Penalties List */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">Penalties ({p.penalties?.length || 0})</h4>
              <div className="space-y-2">
                {p.penalties && p.penalties.map((penalty, index) => (
                  <div key={index} className="bg-red-500/5 border border-red-500/10 dark:border-red-500/20 rounded-2xl p-3.5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-red-500">${penalty.amount?.toLocaleString()}</span>
                      <span className="px-2 py-0.5 text-[8px] font-black rounded-full uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20">
                        {penalty.status || "Pending"}
                      </span>
                    </div>
                    {penalty.reason && <p className="text-[10px] text-gray-700 dark:text-gray-300 font-bold">{penalty.reason}</p>}
                    {penalty.imposedBy && <p className="text-[9px] text-gray-400">Imposed By: {penalty.imposedBy}</p>}
                    {penalty.date && <p className="text-[9px] text-gray-400">Date: {new Date(penalty.date).toLocaleDateString()}</p>}
                  </div>
                ))}
                {(!p.penalties || p.penalties.length === 0) && (
                  <p className="text-xs text-gray-400 italic">No project penalties listed.</p>
                )}
              </div>
            </div>
          </div>

          {/* Departments & Updates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Departments</h4>
              <div className="flex flex-wrap gap-1.5">
                {p.departments && p.departments.map((dept, index) => (
                  <span key={index} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-wider rounded-lg dark:text-gray-300">
                    {dept}
                  </span>
                ))}
                {(!p.departments || p.departments.length === 0) && (
                  <p className="text-xs text-gray-400 italic">No departments listed.</p>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Project Updates / Notes</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                {p.projectUpdates || "No updates or logs added yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-4 p-8 border-t border-gray-100 dark:border-white/5 shrink-0 justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase"
          >
            Close Details
          </button>
          <button 
            onClick={() => {
              onEdit(project);
              onClose();
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Edit Project</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectDetailsModal;
