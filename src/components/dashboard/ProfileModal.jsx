import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { X, User, Mail, Phone, Globe, MapPin, Loader2, Building, Shield, Camera } from "lucide-react";

const ProfileModal = ({ isOpen, onClose, currentUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = React.useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        phoneNumber: currentUser.phoneNumber || "",
        country: currentUser.country || "",
        state: currentUser.state || "",
      });
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("Profile photo must be less than 1MB");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("avatar", file);

    setUploadingAvatar(true);
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URI;
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/update-avatar`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        toast.success("Profile photo updated successfully!");
        dispatch(setUser(res.data.data.user));
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to upload photo");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URI;
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/update-profile`,
        formData,
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success("Profile updated successfully!");
        dispatch(setUser(res.data.data.user));
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glass Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white dark:bg-[#161432] w-full max-w-lg rounded-[32px] border border-gray-100 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden animate-scale-in">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Modal Header */}
        <div className="flex justify-between items-center px-8 pt-8 pb-4">
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Profile Details</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-0.5">View and update your personal information</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-full transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          
          {/* Avatar and Summary Info */}
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
            <div className="relative group cursor-pointer shrink-0" onClick={handleAvatarClick}>
              <img 
                src={currentUser?.avatar?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"}
                alt="Avatar" 
                className="w-16 h-16 rounded-full border border-gray-200 dark:border-white/10 object-cover group-hover:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {uploadingAvatar ? (
                  <Loader2 size={16} className="text-white animate-spin" />
                ) : (
                  <Camera size={18} className="text-white" />
                )}
              </div>
              {uploadingAvatar && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 size={16} className="text-white animate-spin" />
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">{currentUser?.fullName || currentUser?.username}</h4>
              <p className="text-[10px] text-gray-400 dark:text-gray-400 font-extrabold uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                <Shield size={10} className="text-blue-500" />
                {currentUser?.isAdmin ? "Workspace Admin" : "Workspace Member"}
              </p>
              {currentUser?.department && (
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5 flex items-center gap-1.5">
                  <Building size={10} />
                  {currentUser.department?.name || "General"} Department
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><User size={16} /></span>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Alex Rivera"
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Email (Disabled) */}
            <div className="space-y-1.5 opacity-60">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={16} /></span>
                <input 
                  type="email" 
                  value={currentUser?.email || ""}
                  disabled
                  className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Phone size={16} /></span>
                <input 
                  type="tel" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Username (Disabled) */}
            <div className="space-y-1.5 opacity-60">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest pl-1">Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><User size={16} /></span>
                <input 
                  type="text" 
                  value={currentUser?.username || ""}
                  disabled
                  className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest pl-1">Country</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Globe size={16} /></span>
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="India"
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* State */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest pl-1">State</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><MapPin size={16} /></span>
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Delhi"
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white py-3 rounded-2xl font-bold text-sm transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ProfileModal;
