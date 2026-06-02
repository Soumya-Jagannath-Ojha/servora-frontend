import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Globe, Clock, Calendar, DollarSign, ShieldAlert, Check } from "lucide-react";

const SettingsView = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_BACKEND_URI;

  const [settings, setSettings] = useState({
    timezone: "",
    dateFormat: "",
    currency: "",
    language: ""
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (currentUser?.company?.settings) {
      setSettings({
        timezone: currentUser.company.settings.timezone || "",
        dateFormat: currentUser.company.settings.dateFormat || "",
        currency: currentUser.company.settings.currency || "",
        language: currentUser.company.settings.language || ""
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.company?._id) {
      toast.error("No company profile associated with this user.");
      return;
    }

    setUpdating(true);
    try {
      const res = await axios.put(
        `${apiUrl}/api/v1/companies/${currentUser.company._id}`,
        { settings },
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success("Company settings updated successfully!");
        // Update local Redux store
        const updatedUser = {
          ...currentUser,
          company: {
            ...currentUser.company,
            settings: res.data.data.settings
          }
        };
        dispatch(setUser(updatedUser));
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update settings");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Settings</h2>
        <p className="text-xs text-gray-400 mt-1 font-bold">Manage your organization configurations and defaults.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Form Card */}
        <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5">
          <div className="mb-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white">Company Preferences</h3>
            <p className="text-xs text-gray-400 font-bold">Set global parameters for dates, currencies, and translation.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date Format */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                  <Calendar size={12} className="text-blue-500" />
                  Date Format
                </label>
                <div className="relative">
                  <select
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white appearance-none"
                  >
                    <option value="DD/MM/YYYY" className="dark:bg-[#161432]">DD/MM/YYYY (e.g. 02/06/2026)</option>
                    <option value="MM/DD/YYYY" className="dark:bg-[#161432]">MM/DD/YYYY (e.g. 06/02/2026)</option>
                    <option value="YYYY-MM-DD" className="dark:bg-[#161432]">YYYY-MM-DD (e.g. 2026-06-02)</option>
                  </select>
                </div>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                  <Clock size={12} className="text-blue-500" />
                  Timezone
                </label>
                <div className="relative">
                  <select
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white appearance-none"
                  >
                    <option value="Asia/Kolkata" className="dark:bg-[#161432]">Asia/Kolkata (IST)</option>
                    <option value="UTC" className="dark:bg-[#161432]">UTC</option>
                    <option value="America/New_York" className="dark:bg-[#161432]">America/New_York (EST/EDT)</option>
                    <option value="Europe/London" className="dark:bg-[#161432]">Europe/London (GMT/BST)</option>
                  </select>
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                  <DollarSign size={12} className="text-blue-500" />
                  Default Currency
                </label>
                <div className="relative">
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white appearance-none"
                  >
                    <option value="INR" className="dark:bg-[#161432]">INR (₹) - Indian Rupee</option>
                    <option value="USD" className="dark:bg-[#161432]">USD ($) - US Dollar</option>
                    <option value="EUR" className="dark:bg-[#161432]">EUR (€) - Euro</option>
                    <option value="GBP" className="dark:bg-[#161432]">GBP (£) - British Pound</option>
                  </select>
                </div>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                  <Globe size={12} className="text-blue-500" />
                  Language
                </label>
                <div className="relative">
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white appearance-none"
                  >
                    <option value="en" className="dark:bg-[#161432]">English (EN)</option>
                    <option value="es" className="dark:bg-[#161432]">Spanish (ES)</option>
                    <option value="fr" className="dark:bg-[#161432]">French (FR)</option>
                    <option value="de" className="dark:bg-[#161432]">German (DE)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/70 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20"
              >
                {updating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Informational Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-[28px] border border-gray-100 dark:border-white/5 shadow-md">
            <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-3">Organization Details</h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 font-bold block">Company Name</span>
                <span className="text-gray-950 dark:text-white font-extrabold">{currentUser?.company?.companyName || "N/A"}</span>
              </div>
              <div>
                <span className="text-gray-400 font-bold block">Slug</span>
                <span className="text-gray-950 dark:text-white font-extrabold">{currentUser?.company?.slug || "N/A"}</span>
              </div>
              <div>
                <span className="text-gray-400 font-bold block">Company Code</span>
                <span className="text-gray-950 dark:text-white font-extrabold">{currentUser?.company?.code || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-[28px] border border-amber-500/20 bg-amber-500/5 shadow-md flex gap-3">
            <ShieldAlert className="text-amber-500 shrink-0" size={18} />
            <div>
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">Workspace Admin Access</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold leading-normal">
                Only organization administrators can modify settings. Changes will be reflected globally across all workspaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
