import React from "react";

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

export default RecentProjectCard;
