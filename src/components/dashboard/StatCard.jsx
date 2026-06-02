import React from "react";

const StatCard = ({ label, value, subValue, subColor, hasTrend, isProgress, progress, icon }) => {
  let colorTheme = {
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/20",
    barColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/5",
    iconName: icon || "folder"
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

export default StatCard;
