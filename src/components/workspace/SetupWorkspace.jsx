import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  Briefcase, 
  Key, 
  ArrowRight, 
  Loader2, 
  Plus, 
  Trash2, 
  Mail, 
  FolderPlus, 
  Users, 
  Check 
} from "lucide-react";

const SetupWorkspace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const apiUrl = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    const checkUserSetupStatus = async () => {
      try {
        const res = await axios.post(`${apiUrl}/api/v1/auth/current-user`, {}, { withCredentials: true });
        const user = res.data?.data?.user;
        if (user) {
          dispatch(setUser(user));
          if (!user.isEmailVerified) {
            navigate(`/check-email/${encodeURIComponent(user.email)}`);
          } else if (!user.isAdmin && user.company) {
            navigate("/dashboard");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkUserSetupStatus();
  }, [navigate, apiUrl, dispatch]);
  const [mode, setMode] = useState("choose"); // choose | create | join
  const [step, setStep] = useState(1); // 1: Create Workspace, 2: Invite Teammates, 3: Create Project
  const [loading, setLoading] = useState(false);
  
  // Create Workspace Form States (Step 1)
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceEmail, setWorkspaceEmail] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");

  // Invite Teammates Form States (Step 2)
  const [currentEmail, setCurrentEmail] = useState("");
  const [inviteEmails, setInviteEmails] = useState([]);

  // Create Project Form States (Step 3)
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  // Join Workspace Form State
  const [inviteCode, setInviteCode] = useState("");


  // Step 1: Create Workspace
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
        toast.success("Workspace created successfully!");
        setStep(2); // Proceed to Step 2
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Invite Teammates
  const handleAddEmail = (e) => {
    e.preventDefault();
    const email = currentEmail.trim().toLowerCase();
    if (!email) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (inviteEmails.includes(email)) {
      toast.error("This email is already in the list");
      return;
    }

    setInviteEmails([...inviteEmails, email]);
    setCurrentEmail("");
  };

  const handleRemoveEmail = (emailToRemove) => {
    setInviteEmails(inviteEmails.filter(email => email !== emailToRemove));
  };

  const handleSendInvites = async () => {
    if (inviteEmails.length === 0) {
      setStep(3); // Skip to Step 3 if no emails to invite
      return;
    }

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    // Send invites in parallel/sequence
    for (const email of inviteEmails) {
      try {
        await axios.post(`${apiUrl}/api/v1/workspace/invite`, {
          email,
          role: "member"
        }, { withCredentials: true });
        successCount++;
      } catch (err) {
        console.error(`Failed to invite ${email}`, err);
        failCount++;
      }
    }

    setLoading(false);
    if (successCount > 0) {
      toast.success(`Successfully sent ${successCount} invitation(s).`);
    }
    if (failCount > 0) {
      toast.error(`Failed to send ${failCount} invitation(s).`);
    }
    
    setStep(3); // Proceed to Step 3
  };

  // Step 3: Create First Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      toast.error("Project name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/projects`, {
        name: projectName.trim(),
        description: projectDesc.trim() || undefined
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Project created successfully! Welcome to your dashboard.");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  // Join Existing Workspace
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

        {/* Wizard Steps indicator */}
        {mode === "create" && (
          <div className="flex justify-between items-center max-w-xs mx-auto mb-8 px-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                step >= 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-gray-200 dark:bg-white/10 text-gray-400"
              }`}>
                {step > 1 ? <Check size={14} /> : "1"}
              </div>
              <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${step >= 1 ? "text-blue-500" : "text-gray-400"}`}>Workspace</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 bg-gray-200 dark:bg-white/10 transition-colors ${step > 1 ? "bg-blue-600" : ""}`} />
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                step >= 2 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-gray-200 dark:bg-white/10 text-gray-400"
              }`}>
                {step > 2 ? <Check size={14} /> : "2"}
              </div>
              <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${step >= 2 ? "text-blue-500" : "text-gray-400"}`}>Teammates</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 bg-gray-200 dark:bg-white/10 transition-colors ${step > 2 ? "bg-blue-600" : ""}`} />
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                step >= 3 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-gray-200 dark:bg-white/10 text-gray-400"
              }`}>
                3
              </div>
              <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${step >= 3 ? "text-blue-500" : "text-gray-400"}`}>First Project</span>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl space-y-6">
          
          {mode === "choose" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Option 1: Create */}
              <button
                onClick={() => {
                  setMode("create");
                  setStep(1);
                }}
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

          {mode === "create" && step === 1 && (
            <form onSubmit={handleCreateWorkspace} className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 mb-2">
                <h2 className="text-lg font-bold">Step 1: Create New Workspace</h2>
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
                    <span>Next: Invite Teammates</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {mode === "create" && step === 2 && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 mb-2">
                <div>
                  <h2 className="text-lg font-bold">Step 2: Invite Your Teammates</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Workspace: {workspaceName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-gray-400 font-bold hover:underline hover:text-white"
                >
                  Skip for now
                </button>
              </div>

              <form onSubmit={handleAddEmail} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    placeholder="teammate@example.com"
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl pl-11 pr-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-1.5"
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </form>

              {/* Invited list */}
              {inviteEmails.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Members to Invite ({inviteEmails.length})</p>
                  {inviteEmails.map((email, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-xs font-bold">{email}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-gray-100 dark:border-white/5 rounded-2xl">
                  <Users size={28} className="mx-auto text-gray-400/50 mb-2" />
                  <p className="text-xs text-gray-400 font-bold">No teammates added yet.</p>
                  <p className="text-[10px] text-gray-500 mt-1">Add emails above or click next to invite them later.</p>
                </div>
              )}

              <button
                onClick={handleSendInvites}
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending invitations...</span>
                  </>
                ) : (
                  <>
                    <span>{inviteEmails.length > 0 ? "Send Invites & Continue" : "Next: Create Project"}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}

          {mode === "create" && step === 3 && (
            <form onSubmit={handleCreateProject} className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 mb-2">
                <div>
                  <h2 className="text-lg font-bold">Step 3: Create Your First Project</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Set up a space to track tasks</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Welcome aboard! Let's explore your dashboard.");
                    navigate("/dashboard");
                  }}
                  className="text-xs text-gray-400 font-bold hover:underline hover:text-white"
                >
                  Skip & Go to Dashboard
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Name</label>
                <div className="relative">
                  <FolderPlus size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Website Redesign"
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl pl-11 pr-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Description</label>
                <textarea
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Describe what this project is about..."
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500 resize-none"
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
                    <span>Creating project...</span>
                  </>
                ) : (
                  <>
                    <span>Finish Setup</span>
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
