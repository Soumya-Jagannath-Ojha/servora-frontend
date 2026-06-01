import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const IconButton = ({ icon, badge = false, className = "", onClick }) => (
  <button 
    onClick={onClick}
    className={`w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all duration-300 relative group shrink-0 ${className}`}
  >
    <span className="material-symbols-outlined text-xl group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{icon}</span>
    {badge && (
      <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white dark:border-[#0b0a19]"></span>
      </span>
    )}
  </button>
);

const Header = ({ toggleSidebar, isDark, toggleTheme, handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const userDisplayName = currentUser?.fullName || currentUser?.username || "Alex Rivera";
  const userRole = currentUser?.isAdmin ? "Admin" : "Member";
  const userAvatar = currentUser?.avatar?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0b0a19]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 h-20 flex justify-between items-center px-6 md:px-12 transition-colors duration-700">

      <div className="flex items-center gap-4 flex-1">
        <button onClick={toggleSidebar} className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all duration-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full max-w-xl hidden sm:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
          <input 
            className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all dark:text-white dark:placeholder-gray-500" 
            placeholder="Search resources, projects or team..." 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <IconButton 
          icon={isDark ? "light_mode" : "dark_mode"} 
          onClick={toggleTheme}
          className={`flex transition-colors duration-700 ${isDark ? 'text-amber-500' : 'text-blue-400'}`}
        />
        <IconButton icon="notifications" badge className="flex" />
        
        {/* User Profile with Dropdown */}
        <div className="relative z-50" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-4 pl-0 md:pl-4 border-l-0 md:border-l border-gray-100 dark:border-white/5 group transition-all"
          >
            <div className="text-right hidden md:block group-hover:opacity-70 transition-opacity">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{userDisplayName}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{userRole}</p>
            </div>
            <img 
              alt="Profile" 
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-white/10 object-cover ring-0 group-hover:ring-4 ring-accent-brand/10 transition-all" 
              src={userAvatar} 
            />
          </button>
 
          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-[#161432] rounded-[24px] shadow-2xl border border-gray-100 dark:border-white/5 py-3 z-[60] animate-scale-in backdrop-blur-xl">
              <div className="px-4 py-3 border-b border-gray-50 dark:border-white/5 md:hidden">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{userDisplayName}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{userRole}</p>
              </div>
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => { setIsProfileModalOpen(true); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all group"
                >
                  <span className="material-symbols-outlined text-lg group-hover:text-primary-brand transition-colors">person</span>
                  <span>My Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all group">
                  <span className="material-symbols-outlined text-lg group-hover:text-primary-brand transition-colors">settings</span>
                  <span>Account Settings</span>
                </button>
                <div className="h-px bg-gray-50 dark:bg-white/5 my-2 mx-2"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-black text-error-brand hover:bg-error-soft rounded-xl transition-all group">
                  <span className="material-symbols-outlined text-lg">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Details Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        currentUser={currentUser} 
      />
    </header>
  );
};

export default Header;
export { IconButton };
