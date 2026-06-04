import React from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../../utils/config";

const RolesPermissionsView = () => {
  const [subTab, setSubTab] = React.useState("roles"); // "roles" or "users"
  const [roles, setRoles] = React.useState([]);
  const [permissions, setPermissions] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState(null);

  // Form states
  const [roleName, setRoleName] = React.useState("");
  const [roleDesc, setRoleDesc] = React.useState("");
  const [selectedPermissions, setSelectedPermissions] = React.useState([]); // list of permission IDs

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesRes, permRes, usersRes] = await Promise.all([
        axios.get(`${apiUrl}/api/v1/role-permission/roles`, { withCredentials: true }),
        axios.get(`${apiUrl}/api/v1/role-permission/permissions`, { withCredentials: true }),
        axios.get(`${apiUrl}/api/v1/role-permission/users`, { withCredentials: true })
      ]);
      if (rolesRes.data?.success) setRoles(rolesRes.data.data);
      if (permRes.data?.success) setPermissions(permRes.data.data);
      if (usersRes.data?.success) setUsers(usersRes.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load roles and permissions data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingRole(null);
    setRoleName("");
    setRoleDesc("");
    setSelectedPermissions([]);
    setModalOpen(true);
  };

  const handleOpenEditModal = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDesc(role.description || "");
    setSelectedPermissions(role.permissions.map(p => p._id || p));
    setModalOpen(true);
  };

  const handleTogglePermission = (id) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions(selectedPermissions.filter(pId => pId !== id));
    } else {
      setSelectedPermissions([...selectedPermissions, id]);
    }
  };

  const handleSaveRole = async (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      toast.error("Role name is required");
      return;
    }

    try {
      if (editingRole) {
        // Edit existing
        const res = await axios.put(`${apiUrl}/api/v1/role-permission/roles/${editingRole._id}`, {
          name: roleName,
          description: roleDesc,
          permissions: selectedPermissions
        }, { withCredentials: true });

        if (res.data?.success) {
          toast.success("Role updated successfully!");
          setModalOpen(false);
          fetchData();
        }
      } else {
        // Create new
        const res = await axios.post(`${apiUrl}/api/v1/role-permission/roles`, {
          name: roleName,
          description: roleDesc,
          permissions: selectedPermissions
        }, { withCredentials: true });

        if (res.data?.success) {
          toast.success("Role created successfully!");
          setModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save role");
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!window.confirm("Are you sure you want to delete this role? Any users with this role will be unassigned.")) {
      return;
    }

    try {
      const res = await axios.delete(`${apiUrl}/api/v1/role-permission/roles/${roleId}`, { withCredentials: true });
      if (res.data?.success) {
        toast.success("Role deleted successfully");
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete role");
    }
  };

  const handleAssignRole = async (userId, roleId) => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/role-permission/assign-role`, {
        userId,
        roleId: roleId || null
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("User role updated successfully");
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to assign role");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Roles & Permissions</h2>
          <p className="text-xs text-gray-500 font-bold mt-1">Configure role-based access control and assign security levels to team members.</p>
        </div>

        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl h-11 items-center shrink-0">
          <button 
            onClick={() => setSubTab("roles")}
            className={`h-full px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              subTab === "roles" ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            <span className="material-symbols-outlined text-base">security</span>
            <span>Manage Roles</span>
          </button>
          <button 
            onClick={() => setSubTab("users")}
            className={`h-full px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              subTab === "users" ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            <span className="material-symbols-outlined text-base">group</span>
            <span>Assign Members</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : subTab === "roles" ? (
        /* --- Roles List View --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role._id} className="glass-card p-6 md:p-8 rounded-3xl space-y-6 flex flex-col justify-between group relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest border border-blue-500/20 bg-blue-500/10 text-blue-500">
                    {role.name}
                  </span>
                  {!role.isSystemRole && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        onClick={() => handleOpenEditModal(role)}
                        className="w-8 h-8 shrink-0 aspect-square flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors"
                        title="Edit Role"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteRole(role._id)}
                        className="w-8 h-8 shrink-0 aspect-square flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                        title="Delete Role"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{role.name.replace(/_/g, " ")}</h4>
                  <p className="text-xs text-gray-400 mt-2 font-medium leading-relaxed">{role.description || "No description provided."}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Modules Access</p>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions?.length > 0 ? (
                    role.permissions.map((p) => (
                      <span key={p._id || p} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-[9px] font-bold text-gray-600 dark:text-gray-300">
                        {p.label || p.module || "Access"}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-gray-400 italic">No permissions assigned</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add New Role Card */}
          <button 
            onClick={handleOpenCreateModal}
            className="border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg group bg-transparent text-gray-400 hover:text-blue-500"
          >
            <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">add_moderator</span>
            <span className="text-xs font-black uppercase tracking-wider">Add Custom Role</span>
          </button>
        </div>
      ) : (
        /* --- Users List / Assignment View --- */
        <div className="glass-card rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Current Role</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-right">Assign Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-500 font-bold flex items-center justify-center text-sm">
                        {u.fullName ? u.fullName.charAt(0).toUpperCase() : u.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{u.fullName || u.username}</p>
                        {u.isAdmin && <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Workspace Owner</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        u.role ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-100 dark:bg-white/5 text-gray-400'
                      }`}>
                        {u.role ? u.role.name : 'No Role'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={u.role?._id || ""}
                        onChange={(e) => handleAssignRole(u._id, e.target.value)}
                        className="bg-gray-100 dark:bg-white/5 border-none rounded-xl text-xs font-bold py-1.5 px-3 focus:ring-2 focus:ring-blue-500/20 text-gray-700 dark:text-white cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors"
                      >
                        <option value="" className="bg-white dark:bg-[#161432]">Unassigned</option>
                        {roles.map((r) => (
                          <option key={r._id} value={r._id} className="bg-white dark:bg-[#161432]">{r.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-[#121124] rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar animate-scale-in">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {editingRole ? "Edit Custom Role" : "Create Custom Role"}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-100   rounded-full transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role Name</label>
                <input 
                  type="text" 
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. HR_MANAGER"
                  disabled={editingRole?.isSystemRole}
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <textarea 
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                  placeholder="Describe the responsibilities of this security role..."
                  rows="3"
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Choose Permissions Modules</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {permissions.map((p) => {
                    const isSelected = selectedPermissions.includes(p._id);
                    return (
                      <div 
                        key={p._id} 
                        onClick={() => handleTogglePermission(p._id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all flex justify-between items-start group ${isSelected
                            ? "bg-blue-500/5 border-blue-500/50 shadow-md shadow-blue-500/5"
                            : "bg-gray-50 dark:bg-white/5 border-transparent hover:border-gray-200 dark:hover:border-white/10"
                          }`}
                      >
                        <div className="space-y-1">
                          <p className={`text-xs font-bold transition-colors ${isSelected ? "text-blue-500" : "text-gray-900 dark:text-white"}`}>
                            {p.label || p.module}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium">Access controls for module actions</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 dark:border-white/10"
                          }`}>
                          {isSelected && <span className="material-symbols-outlined text-[10px] font-black">done</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
                <button 
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-sm shadow-lg shadow-blue-500/20"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default RolesPermissionsView;
