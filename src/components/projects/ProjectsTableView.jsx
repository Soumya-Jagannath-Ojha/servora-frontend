import React from "react";

const ProjectsTableView = ({ displayProjects }) => (
  <div className="glass-card rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5 bg-white/40 dark:bg-[#121124]/40 backdrop-blur-md">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <th className="py-5 px-6">SL No.</th>
            <th className="py-5 px-8">Project Name</th>
            <th className="py-5 px-6">Status</th>
            <th className="py-5 px-6">Progress</th>
            <th className="py-5 px-6">Due Date</th>
            <th className="py-5 px-6">Team Size</th>
            <th className="py-5 px-8 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
          {displayProjects.map((project,index) => (
            <tr key={project.id} className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors group">
              <td className="py-5 px-6">
                {index+1}
              </td>
              <td className="py-5 px-8">
                <div className="flex items-center gap-3">
                  <div className={`${project.iconBg} w-9 h-9 rounded-xl flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined ${project.iconColor} text-lg`}>{project.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{project.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 max-w-xs">{project.description}</p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className={`px-2.5 py-0.5 text-[9px] font-black rounded-full uppercase tracking-widest border border-white/5 ${
                  project.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  project.status === 'ON HOLD' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                  'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                  {project.status}
                </span>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center gap-3 min-w-[120px]">
                  <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shrink-0">
                    <div
                      className={`h-full ${project.iconColor.replace('text', 'bg')} rounded-full transition-all duration-1000`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-black text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
              </td>
              <td className="py-5 px-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
                {project.dueDate}
              </td>
              <td className="py-5 px-6">
                <div className="flex -space-x-1.5">
                  {project.members && project.members.map((m, idx) => (
                    <img key={idx} className="w-6 h-6 rounded-full border border-white dark:border-[#161432] object-cover" src={m.avatar} alt="Member" />
                  ))}
                  {project.extraMembers > 0 && (
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[9px] font-bold text-gray-400 border border-white dark:border-[#161432]">+{project.extraMembers}</div>
                  )}
                </div>
              </td>
              <td className="py-5 px-8 text-right">
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProjectsTableView;
