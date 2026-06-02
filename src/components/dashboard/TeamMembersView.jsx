import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Plus, Mail, Shield, UserX, UserCheck, RefreshCw, X, ChevronDown } from "lucide-react";
import { formatDate } from "../../utils/date";
 
const TeamMembersView = () => {
  const [activeTab, setActiveTab] = useState("members"); // members | invites
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  
  const dateFormat = useSelector((state) => state.auth.user?.company?.settings?.dateFormat);
  const [loading, setLoading] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  
  // Invite Form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("MEMBER");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  // New Workspace Form state
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceEmail, setWorkspaceEmail] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");
  const [workspaceLoading, setWorkspaceLoading] = useState(false);

  // New Role Form state
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [roleLoading, setRoleLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_BACKEND_URI;

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/v1/workspace/members`, { withCredentials: true });
      if (res.data?.success) {
        setMembers(res.data.data.members || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load workspace members");
    } finally {
      setLoading(false);
    }
  };

  const fetchInvites = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/v1/workspace/invites?status=pending`, { withCredentials: true });
      if (res.data?.success) {
        setInvites(res.data.data.invites || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pending invitations");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/role-permission/roles`, { withCredentials: true });
      if (res.data?.success) {
        setRoles(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load roles", err);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchMembers();
    fetchInvites();
  }, []);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (activeTab === "members") {
      fetchMembers();
    } else {
      fetchInvites();
    }
  }, [activeTab]);

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) {
      toast.error("Email is required");
      return;
    }

    setInviteLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/workspace/invite`,
        { email: inviteEmail.trim().toLowerCase(), role: inviteRole },
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success(`Invitation sent to ${inviteEmail}`);
        setIsInviteModalOpen(false);
        setInviteEmail("");
        setInviteRole("member");
        if (activeTab === "invites") {
          fetchInvites();
        } else {
          setActiveTab("invites");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send invitation");
    } finally {
      setInviteLoading(false);
    }
  };

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    if (!workspaceName.trim() || !workspaceEmail.trim()) {
      toast.error("Workspace name and email are required");
      return;
    }

    setWorkspaceLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/workspace`, {
        workspaceName,
        workspaceEmail,
        slug: workspaceSlug || undefined
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Workspace created successfully!");
        setIsWorkspaceModalOpen(false);
        setWorkspaceName("");
        setWorkspaceEmail("");
        setWorkspaceSlug("");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create workspace");
    } finally {
      setWorkspaceLoading(false);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      toast.error("Role name is required");
      return;
    }

    setRoleLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/role-permission/roles`, {
        name: roleName.trim(),
        description: roleDesc.trim() || undefined,
        permissions: [] // Start with empty permissions
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Custom role created successfully!");
        setIsRoleModalOpen(false);
        setRoleName("");
        setRoleDesc("");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create role");
    } finally {
      setRoleLoading(false);
    }
  };

  const handleRevokeInvite = async (inviteId) => {
    if (!window.confirm("Are you sure you want to revoke this invitation?")) return;

    try {
      const res = await axios.delete(`${apiUrl}/api/v1/workspace/invite/${inviteId}`, { withCredentials: true });
      if (res.data?.success) {
        toast.success("Invitation revoked successfully");
        fetchInvites();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to revoke invitation");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Team Management</h2>
          <p className="text-xs text-gray-400 mt-1 font-bold">Manage active team members and pending invitations.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold rounded-2xl transition-all active:scale-95 text-xs uppercase"
          >
            <Plus size={14} />
            <span>Add Role</span>
          </button>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20"
          >
            <Plus size={16} />
            <span>Invite Teammate</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-white/5 gap-6">
        <button
          onClick={() => setActiveTab("members")}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === "members" ? "text-blue-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
          Active Members ({members.length})
          {activeTab === "members" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("invites")}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === "invites" ? "text-blue-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
          Pending Invites ({invites.length})
          {activeTab === "invites" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
          )}
        </button>
        <button 
          onClick={activeTab === "members" ? fetchMembers : fetchInvites}
          className="ml-auto pb-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Content */}
      <div className="glass-card p-4 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[32px] overflow-hidden">
        {loading && (activeTab === "members" ? members.length === 0 : invites.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={36} />
            <p className="text-sm font-bold">Loading records...</p>
          </div>
        ) : (
          <>
            {activeTab === "members" && (
              members.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest pb-4">
                        <th className="py-4 pl-4 w-12">S.No</th>
                        <th className="py-4">Name / Username</th>
                        <th className="py-4">Email</th>
                        <th className="py-4">Role</th>
                        <th className="py-4">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                      {members.map((member, index) => (
                        <tr key={member._id} className="text-sm group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all">
                          <td className="py-4 pl-4 text-gray-400 font-bold w-12">{index + 1}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-500 font-bold flex items-center justify-center text-xs border border-blue-500/20">
                                {member.fullName ? member.fullName.charAt(0).toUpperCase() : member.username?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white">{member.fullName || "N/A"}</p>
                                <p className="text-[10px] text-gray-400 font-bold">@{member.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-gray-500 dark:text-gray-300 font-medium">{member.email}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-1.5">
                              <Shield size={14} className={member.isAdmin ? "text-amber-500" : "text-blue-500"} />
                              <span className={`text-xs font-bold ${member.isAdmin ? "text-amber-500" : "text-blue-500"}`}>
                                {member.isAdmin ? "Workspace Admin" : "Member"}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-gray-400 text-xs font-bold">
                            {formatDate(member.createdAt, dateFormat)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <UserX size={48} className="mx-auto text-gray-300 dark:text-white/10 mb-4" />
                  <h4 className="text-lg font-bold">No active members found</h4>
                  <p className="text-xs text-gray-400 mt-1">Start by inviting team members to your workspace.</p>
                </div>
              )
            )}

            {activeTab === "invites" && (
              invites.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest pb-4">
                        <th className="py-4 pl-4 w-12">S.No</th>
                        <th className="py-4">Invitee Email</th>
                        <th className="py-4">Intended Role</th>
                        <th className="py-4">Expires At</th>
                        <th className="py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                      {invites.map((invite, index) => (
                        <tr key={invite._id} className="text-sm group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all">
                          <td className="py-4 pl-4 text-gray-400 font-bold w-12">{index + 1}</td>
                          <td className="py-4 pr-4 font-bold text-gray-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              <span>{invite.email}</span>
                            </div>
                          </td>
                          <td className="py-4 capitalize font-semibold text-gray-500 dark:text-gray-300">{invite.role}</td>
                          <td className="py-4 text-gray-400 text-xs font-bold">
                            {formatDate(invite.expiresAt, dateFormat)}
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => handleRevokeInvite(invite._id)}
                              className="px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                            >
                              Revoke Invite
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <UserCheck size={48} className="mx-auto text-gray-300 dark:text-white/10 mb-4" />
                  <h4 className="text-lg font-bold">No pending invites</h4>
                  <p className="text-xs text-gray-400 mt-1 font-semibold">Any pending email invites will appear here.</p>
                </div>
              )
            )}
          </>
        )}
      </div>

      {/* Invite Teammate Modal */}
      {isInviteModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setIsInviteModalOpen(false)} />
          
          <div className="relative w-full max-w-md bg-white dark:bg-[#161432] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-2xl z-10 animate-scale-in">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Invite new member</h3>
            <p className="text-xs text-gray-400 font-bold mb-6">Send an invitation email to join your workspace.</p>

            <form onSubmit={handleSendInvite} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Teammate Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="teammate@company.com"
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl pl-11 pr-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Role</label>
                <div className="relative">
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white appearance-none pr-10"
                  >
                    <option value="MEMBER" className="dark:bg-[#161432]">Member</option>
                    <option value="PROJECT_ADMIN" className="dark:bg-[#161432]">Project Admin</option>
                    {roles.filter(r => r.name !== "MEMBER" && r.name !== "PROJECT_ADMIN").map((r) => (
                      <option key={r._id} value={r.name} className="dark:bg-[#161432]">{r.name.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              <button
                type="submit"
                disabled={inviteLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                {inviteLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending Invite...</span>
                  </>
                ) : (
                  <>
                    <span>Send Invitation</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Create Workspace Modal */}
      {isWorkspaceModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setIsWorkspaceModalOpen(false)} />
          
          <div className="relative w-full max-w-md bg-white dark:bg-[#161432] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-2xl z-10 animate-scale-in">
            <button
              onClick={() => setIsWorkspaceModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Create Workspace</h3>
            <p className="text-xs text-gray-400 font-bold mb-6">Create a brand new workspace / company.</p>

            <form onSubmit={handleCreateWorkspace} className="space-y-5">
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
                disabled={workspaceLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                {workspaceLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating Workspace...</span>
                  </>
                ) : (
                  <span>Create Workspace</span>
                )}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Create Custom Role Modal */}
      {isRoleModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setIsRoleModalOpen(false)} />
          
          <div className="relative w-full max-w-md bg-white dark:bg-[#161432] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-2xl z-10 animate-scale-in">
            <button
              onClick={() => setIsRoleModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Create Custom Role</h3>
            <p className="text-xs text-gray-400 font-bold mb-6">Create a security role for access control.</p>

            <form onSubmit={handleCreateRole} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role Name</label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. HR_MANAGER"
                  required
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <textarea
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                  placeholder="Describe the role responsibilities..."
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={roleLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                {roleLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating Role...</span>
                  </>
                ) : (
                  <span>Create Role</span>
                )}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default TeamMembersView;
