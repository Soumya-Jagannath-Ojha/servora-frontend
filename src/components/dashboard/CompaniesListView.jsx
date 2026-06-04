import React from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../../utils/config";

const CompaniesListView = () => {
  const [companies, setCompanies] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [planFilter, setPlanFilter] = React.useState("");

  // Create Company Form States
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [newCompanyName, setNewCompanyName] = React.useState("");
  const [newCompanyEmail, setNewCompanyEmail] = React.useState("");
  const [newCompanySlug, setNewCompanySlug] = React.useState("");
  const [newCompanyPlan, setNewCompanyPlan] = React.useState("free");
  const [newCompanyLogoUrl, setNewCompanyLogoUrl] = React.useState("");
  const [newCompanyLogoPath, setNewCompanyLogoPath] = React.useState("");

  // Edit/View Company Form States
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState(null);
  const [editCompanyName, setEditCompanyName] = React.useState("");
  const [editCompanyEmail, setEditCompanyEmail] = React.useState("");
  const [editCompanySlug, setEditCompanySlug] = React.useState("");
  const [editCompanyPlan, setEditCompanyPlan] = React.useState("free");
  const [editCompanyIsActive, setEditCompanyIsActive] = React.useState(true);
  const [editCompanyTimezone, setEditCompanyTimezone] = React.useState("Asia/Kolkata");
  const [editCompanyDateFormat, setEditCompanyDateFormat] = React.useState("DD/MM/YYYY");
  const [editCompanyCurrency, setEditCompanyCurrency] = React.useState("INR");
  const [editCompanyLanguage, setEditCompanyLanguage] = React.useState("en");
  const [editCompanyLogoUrl, setEditCompanyLogoUrl] = React.useState("");
  const [editCompanyLogoPath, setEditCompanyLogoPath] = React.useState("");

  const handleOpenEditModal = (c) => {
    setSelectedCompany(c);
    setEditCompanyName(c.companyName || "");
    setEditCompanyEmail(c.companyEmail || "");
    setEditCompanySlug(c.slug || "");
    setEditCompanyPlan(c.plan || "free");
    setEditCompanyIsActive(c.isActive !== undefined ? c.isActive : true);
    setEditCompanyTimezone(c.settings?.timezone || "Asia/Kolkata");
    setEditCompanyDateFormat(c.settings?.dateFormat || "DD/MM/YYYY");
    setEditCompanyCurrency(c.settings?.currency || "INR");
    setEditCompanyLanguage(c.settings?.language || "en");
    setEditCompanyLogoUrl(c.logo?.url || "");
    setEditCompanyLogoPath(c.logo?.localPath || "");
    setEditModalOpen(true);
  };

  const handleUpdateCompanyDetails = async (e) => {
    e.preventDefault();
    if (!editCompanyName.trim() || !editCompanyEmail.trim()) {
      toast.error("Company name and email are required");
      return;
    }

    try {
      const res = await axios.put(`${apiUrl}/api/v1/companies/${selectedCompany._id}`, {
        companyName: editCompanyName,
        companyEmail: editCompanyEmail,
        slug: editCompanySlug || undefined,
        plan: editCompanyPlan,
        isActive: editCompanyIsActive,
        logo: {
          url: editCompanyLogoUrl,
          localPath: editCompanyLogoPath
        },
        settings: {
          timezone: editCompanyTimezone,
          dateFormat: editCompanyDateFormat,
          currency: editCompanyCurrency,
          language: editCompanyLanguage
        }
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Company updated successfully!");
        setEditModalOpen(false);
        fetchCompanies();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update company");
    }
  };

  const handleLogoUpload = async (file, isEdit = false) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("logo", file);
    
    const previousPath = isEdit ? editCompanyLogoPath : newCompanyLogoPath;
    if (previousPath) {
      formData.append("previousPath", previousPath);
    }
    
    try {
      toast.loading("Uploading logo...", { id: "logo-upload" });
      const res = await axios.post(`${apiUrl}/api/v1/companies/upload-logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      
      if (res.data?.success) {
        const uploadedUrl = res.data.data.logoUrl;
        const uploadedLocalPath = res.data.data.localPath;
        if (isEdit) {
          setEditCompanyLogoUrl(uploadedUrl);
          setEditCompanyLogoPath(uploadedLocalPath);
        } else {
          setNewCompanyLogoUrl(uploadedUrl);
          setNewCompanyLogoPath(uploadedLocalPath);
        }
        toast.success("Logo uploaded successfully!", { id: "logo-upload" });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to upload logo", { id: "logo-upload" });
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/v1/companies`, {
        params: { page, limit, search, plan: planFilter },
        withCredentials: true
      });
      if (res.data?.success) {
        setCompanies(res.data.data.companies);
        setTotal(res.data.data.total);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load registered companies");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCompanies();
  }, [page, search, planFilter]);

  const handleToggleStatus = async (companyId, currentStatus) => {
    try {
      const res = await axios.put(`${apiUrl}/api/v1/companies/${companyId}`, {
        isActive: !currentStatus
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Company status updated successfully");
        fetchCompanies();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteCompany = async (companyId) => {
    if (!window.confirm("Are you sure you want to delete this company? All departments and user relations will be removed!")) {
      return;
    }

    try {
      const res = await axios.delete(`${apiUrl}/api/v1/companies/${companyId}`, { withCredentials: true });
      if (res.data?.success) {
        toast.success("Company deleted successfully");
        fetchCompanies();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete company");
    }
  };

  const handleUpdatePlan = async (companyId, newPlan) => {
    try {
      const res = await axios.put(`${apiUrl}/api/v1/companies/${companyId}`, {
        plan: newPlan
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success(`Plan updated to ${newPlan} successfully`);
        fetchCompanies();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update plan");
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    if (!newCompanyName.trim() || !newCompanyEmail.trim()) {
      toast.error("Company name and email are required");
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/api/v1/companies`, {
        companyName: newCompanyName,
        companyEmail: newCompanyEmail,
        slug: newCompanySlug || undefined,
        plan: newCompanyPlan,
        logo: {
          url: newCompanyLogoUrl,
          localPath: newCompanyLogoPath
        }
      }, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Company created successfully!");
        setCreateModalOpen(false);
        setNewCompanyName("");
        setNewCompanyEmail("");
        setNewCompanySlug("");
        setNewCompanyPlan("free");
        setNewCompanyLogoUrl("");
        setNewCompanyLogoPath("");
        fetchCompanies();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create company");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Registered Companies</h2>
          <p className="text-xs text-gray-500 font-bold mt-1">Manage and audit all registered workspaces and organizations.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
          <div className="relative w-full max-w-xs">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input 
              type="text" 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search companies..."
              className="w-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl pl-12 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500 shadow-sm"
            />
          </div>
          <div className="relative">
            <select
              value={planFilter}
              onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
              className="h-11 pl-4 pr-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-bold transition-all dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm"
            >
              <option value="" className="bg-white dark:bg-[#161432]">All Plans</option>
              <option value="free" className="bg-white dark:bg-[#161432]">Free</option>
              <option value="pro" className="bg-white dark:bg-[#161432]">Pro</option>
              <option value="enterprise" className="bg-white dark:bg-[#161432]">Enterprise</option>
            </select>
          </div>
          <button 
            onClick={() => setCreateModalOpen(true)}
            className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-blue-500/20 shrink-0"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-card rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">S.No.</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Company Details</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Code / Slug</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Plan & Access</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {companies.length > 0 ? (
                    companies.map((c, index) => (
                      <tr key={c._id} className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                              {c.logo?.url ? (
                                <img 
                                  src={c.logo.url.startsWith("http") ? c.logo.url : `${apiUrl}${c.logo.url}`} 
                                  alt="Logo" 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                c.companyName.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-900 dark:text-white">{c.companyName}</p>
                              <p className="text-[10px] text-gray-400 font-medium mt-0.5">{c.companyEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{c.code || "N/A"}</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">{c.slug}</p>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={c.plan}
                            onChange={(e) => handleUpdatePlan(c._id, e.target.value)}
                            className="bg-gray-100 dark:bg-white/5 border-none rounded-xl text-[10px] font-black uppercase py-1 px-2.5 focus:ring-2 focus:ring-blue-500/20 text-gray-700 dark:text-white cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors"
                          >
                            <option value="free" className="bg-white dark:bg-[#161432]">Free</option>
                            <option value="pro" className="bg-white dark:bg-[#161432]">Pro</option>
                            <option value="enterprise" className="bg-white dark:bg-[#161432]">Enterprise</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${c.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                            {c.isActive ? 'Active' : 'Suspended'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                               onClick={() => handleOpenEditModal(c)}
                              className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all active:scale-95 flex items-center gap-1"
                              title="View & Edit Details"
                            >
                              <span className="material-symbols-outlined text-xs">visibility</span>
                              <span>View / Edit</span>
                            </button>
                            <button 
                              onClick={() => handleToggleStatus(c._id, c.isActive)}
                              className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all active:scale-95 ${c.isActive
                                ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                              }`}
                            >
                              {c.isActive ? 'Suspend' : 'Activate'}
                            </button>
                            <button 
                              onClick={() => handleDeleteCompany(c._id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"
                              title="Delete Organization"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-xs text-gray-400 italic">
                        No registered companies found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-2">
              <p className="text-[10px] font-bold text-gray-400">
                Showing Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-white disabled:opacity-50 text-[10px] font-black uppercase transition-all"
                >
                  Prev
                </button>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-white disabled:opacity-50 text-[10px] font-black uppercase transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Company Modal */}
      {createModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-[#121124] rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl p-8 space-y-6 max-h-[90vh] flex flex-col animate-scale-in">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 shrink-0">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Register New Company</h3>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar min-h-0">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Name</label>
                  <input 
                    type="text" 
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="e.g. Acme Industries"
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Email</label>
                  <input 
                    type="email" 
                    value={newCompanyEmail}
                    onChange={(e) => setNewCompanyEmail(e.target.value)}
                    placeholder="e.g. contact@acme.com"
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Slug (Optional)</label>
                  <input 
                    type="text" 
                    value={newCompanySlug}
                    onChange={(e) => setNewCompanySlug(e.target.value)}
                    placeholder="e.g. acme-industries"
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white dark:placeholder-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Logo</label>
                  <div className="flex items-center gap-4">
                    {newCompanyLogoUrl && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img 
                          src={newCompanyLogoUrl.startsWith("http") ? newCompanyLogoUrl : `${apiUrl}${newCompanyLogoUrl}`} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleLogoUpload(e.target.files[0], false)}
                      className="w-full text-xs font-bold text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 file:cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan</label>
                  <select 
                    value={newCompanyPlan}
                    onChange={(e) => setNewCompanyPlan(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                  >
                    <option value="free" className="bg-white dark:bg-[#161432]">Free</option>
                    <option value="pro" className="bg-white dark:bg-[#161432]">Pro</option>
                    <option value="enterprise" className="bg-white dark:bg-[#161432]">Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4 mt-4 border-t border-gray-100 dark:border-white/5 shrink-0">
                <button 
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20"
                >
                  Create Company
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Edit Company Modal */}
      {editModalOpen && selectedCompany && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-[#121124] rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl p-8 space-y-6 my-8 max-h-[90vh] flex flex-col animate-scale-in">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 shrink-0">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Edit Company Details</h3>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">ID: {selectedCompany._id}</p>
              </div>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdateCompanyDetails} className="flex flex-col flex-1 overflow-hidden min-h-0">
              {/* Scrollable container for fields */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar min-h-0">
                {/* 2 Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Core Identity Details */}
                  <div className="space-y-5">
                    <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">Core Identity</h4>

                    {/* Logo Display */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                       <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-md shrink-0">
                        {editCompanyLogoUrl ? (
                          <img 
                            src={editCompanyLogoUrl.startsWith("http") ? editCompanyLogoUrl : `${apiUrl}${editCompanyLogoUrl}`} 
                            alt="Logo" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          editCompanyName.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white">Company Logo</h5>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {editCompanyLogoUrl ? "Logo updated." : "No logo uploaded."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Name</label>
                      <input 
                        type="text" 
                        value={editCompanyName}
                        onChange={(e) => setEditCompanyName(e.target.value)}
                        required
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Email</label>
                      <input 
                        type="email" 
                        value={editCompanyEmail}
                        onChange={(e) => setEditCompanyEmail(e.target.value)}
                        required
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Slug</label>
                      <input 
                        type="text" 
                        value={editCompanySlug}
                        onChange={(e) => setEditCompanySlug(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                      />
                    </div>

                     <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Logo</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e.target.files[0], true)}
                        className="w-full text-xs font-bold text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 file:cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan</label>
                        <select 
                          value={editCompanyPlan}
                          onChange={(e) => setEditCompanyPlan(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                        >
                          <option value="free" className="bg-white dark:bg-[#161432]">Free</option>
                          <option value="pro" className="bg-white dark:bg-[#161432]">Pro</option>
                          <option value="enterprise" className="bg-white dark:bg-[#161432]">Enterprise</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</label>
                        <select 
                          value={editCompanyIsActive ? "true" : "false"}
                          onChange={(e) => setEditCompanyIsActive(e.target.value === "true")}
                          className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                        >
                          <option value="true" className="bg-white dark:bg-[#161432]">Active</option>
                          <option value="false" className="bg-white dark:bg-[#161432]">Suspended</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Settings & Invite Details */}
                  <div className="space-y-5">
                    <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">Workspace Settings</h4>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Timezone</label>
                      <input 
                        type="text" 
                        value={editCompanyTimezone}
                        onChange={(e) => setEditCompanyTimezone(e.target.value)}
                        placeholder="e.g. Asia/Kolkata"
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Currency</label>
                        <input 
                          type="text" 
                          value={editCompanyCurrency}
                          onChange={(e) => setEditCompanyCurrency(e.target.value)}
                          placeholder="e.g. INR"
                          className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Language</label>
                        <input 
                          type="text" 
                          value={editCompanyLanguage}
                          onChange={(e) => setEditCompanyLanguage(e.target.value)}
                          placeholder="e.g. en"
                          className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Format</label>
                      <select 
                        value={editCompanyDateFormat}
                        onChange={(e) => setEditCompanyDateFormat(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                      >
                        <option value="DD/MM/YYYY" className="bg-white dark:bg-[#161432]">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY" className="bg-white dark:bg-[#161432]">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD" className="bg-white dark:bg-[#161432]">YYYY-MM-DD</option>
                      </select>
                    </div>

                    {/* Read Only Stats */}
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-400">Workspace Code:</span>
                        <span className="font-black text-gray-700 dark:text-white select-all">{selectedCompany.code || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-400">Invite Code:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-black text-gray-700 dark:text-white select-all">{selectedCompany.inviteCode || "N/A"}</span>
                          {selectedCompany.inviteCode && (
                            <button 
                              type="button" 
                              onClick={() => {
                                navigator.clipboard.writeText(selectedCompany.inviteCode);
                                toast.success("Invite code copied!");
                              }}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded text-blue-500"
                              title="Copy code"
                            >
                              <span className="material-symbols-outlined text-[14px]">content_copy</span>
                            </button>
                          )}
                        </div>
                      </div>
                      {selectedCompany.inviteCodeExpiry && (
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-400">Code Expiry:</span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                            {new Date(selectedCompany.inviteCodeExpiry).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Pinned Footer */}
              <div className="flex gap-4 pt-4 mt-4 border-t border-gray-100 dark:border-white/5 shrink-0">
                <button 
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20"
                >
                  Save Changes
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

export default CompaniesListView;
