import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Briefcase, Key, ArrowRight, Loader2 } from "lucide-react";

const SetupWorkspace = () => {
  const [mode, setMode] = useState("choose"); // choose | create | join
  const [loading, setLoading] = useState(false);
  
  // Create Workspace Form States
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceEmail, setWorkspaceEmail] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");

  // Join Workspace Form State
  const [inviteCode, setInviteCode] = useState("");

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_URI;

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    if (!workspaceName.trim() || !workspaceEmail.trim()) {
      toast.error("Workspace name and email are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/workspace`, {
        workspaceName,
        workspaceEmail,
        slug: workspaceSlug || undefined
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Workspace created successfully! Welcome aboard.");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinWorkspace = async (e) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      toast.error("Invite code is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/workspace/join-by-code`, {
        code: inviteCode.trim()
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Successfully joined the workspace! Welcome aboard.");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to join workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-gray-900 dark:text-white px-4 py-12 transition-colors duration-500">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl z-10 animate-fade-in-up">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Set Up Your Workspace</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Create a brand new workspace or join an existing organization.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl space-y-6">
          
          {mode === "choose" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Option 1: Create */}
              <button
                onClick={() => setMode("create")}
                className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-500/5 dark:hover:bg-blue-500/5 transition-all text-center group active:scale-95 duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase size={28} />
                </div>
                <h3 className="font-bold text-base">Create Workspace</h3>
                <p className="text-xs text-gray-400 mt-2">
                  Build a fresh space for your organization, invite members, and configure details.
                </p>
              </button>

              {/* Option 2: Join */}
              <button
                onClick={() => setMode("join")}
                className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500/50 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/5 transition-all text-center group active:scale-95 duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Key size={28} />
                </div>
                <h3 className="font-bold text-base">Join with Invite Code</h3>
                <p className="text-xs text-gray-400 mt-2">
                  Enter a workspace invitation code or join-code provided by your company admin.
                </p>
              </button>
            </div>
          )}

          {mode === "create" && (
            <form onSubmit={handleCreateWorkspace} className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 mb-2">
                <h2 className="text-lg font-bold">Create New Workspace</h2>
                <button
                  type="button"
                  onClick={() => setMode("choose")}
                  className="text-xs text-blue-500 font-bold hover:underline"
                >
                  Go Back
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="e.g. Acme Industries"
                  required
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Email</label>
                <input
                  type="email"
                  value={workspaceEmail}
                  onChange={(e) => setWorkspaceEmail(e.target.value)}
                  placeholder="e.g. contact@acme.com"
                  required
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Slug (Optional)</label>
                <input
                  type="text"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                  placeholder="e.g. acme-industries"
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Create & Get Started</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {mode === "join" && (
            <form onSubmit={handleJoinWorkspace} className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 mb-2">
                <h2 className="text-lg font-bold">Join Workspace</h2>
                <button
                  type="button"
                  onClick={() => setMode("choose")}
                  className="text-xs text-blue-500 font-bold hover:underline"
                >
                  Go Back
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Invitation Code</label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="e.g. ACME or A3F2C1B8"
                  required
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500 uppercase"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Ask your workspace administrator for the join code.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Joining workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Join Workspace</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default SetupWorkspace;
