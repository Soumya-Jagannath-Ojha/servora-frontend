import React from "react";

const ProjectCard = ({ project, onClick }) => (
  <div onClick={onClick} className="glass-card p-6 md:p-8 rounded-3xl space-y-6 group bg-white/40 dark:bg-[#121124]/40 backdrop-blur-md border border-gray-100 dark:border-white/5 cursor-pointer hover:-translate-y-1 transition-all duration-300">
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

    <div className="flex items-center justify-between pt-5 border-t border-gray-55 dark:border-white/5">
      <div className="flex -space-x-2">
        {project.members && project.members.map((m, idx) => (
          <img key={idx} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#161432] shadow-sm object-cover" src={m.avatar} alt="Member" />
        ))}
        {project.extraMembers > 0 && (
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

export default ProjectCard;
