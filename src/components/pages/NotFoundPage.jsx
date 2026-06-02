import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../animation/PageTransition";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="text-center max-w-lg space-y-8 relative z-10">
          {/* Animated 404 Illustration */}
          <div className="relative flex justify-center items-center select-none">
            <h1 className="text-[120px] sm:text-[160px] font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 leading-none tracking-tight animate-scale-in">
              404
            </h1>
            <div className="absolute -top-4 text-5xl animate-bounce" style={{ animationDuration: "3s" }}>
              🛰️
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Lost in space?
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto h-12 px-6 rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Go Back</span>
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
            >
              <span className="material-symbols-outlined text-base">home</span>
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;
