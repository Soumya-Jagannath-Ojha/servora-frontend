import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, ChevronRight, ChevronLeft, Briefcase, User, GraduationCap, Heart, CheckCircle2, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'
import { apiUrl } from '../../utils/config';

const countries = {
  "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
  "USA": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
  "UK": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"]
};

const Signup = () => {
  const [searchParams] = useSearchParams();
  const isInvited = !!searchParams.get("token") || !!sessionStorage.getItem("inviteToken");
  
  const [step, setStep] = useState(0);
  const [formdata, setFormdata] = useState({
    email: searchParams.get("email") || "",
    fullName: "",
    password: "",
    organizationName: searchParams.get("workspace") || "Invited Workspace",
    country: "India",
    state: "Delhi",
    phoneNumber: "",
    onboarding: {
      purpose: "WORK",
      role: "Other",
      teamSize: "2-10",
      companySize: "1-19",
      firstManagementArea: "Other"
    }
  });

  React.useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      sessionStorage.setItem("inviteToken", token);
    }
  }, [searchParams]);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
        break;
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "organizationName":
        if (!value) error = "Organization name is required";
        break;
      case "country":
        if (!value) error = "Please select a country";
        break;
      case "state":
        if (!value) error = "Please select a state";
        break;
      default:
        break;
    }
    return error;
  };

  const handleOnboardingChange = (field, value) => {
    setFormdata({
      ...formdata,
      onboarding: { ...formdata.onboarding, [field]: value }
    });
  };

  const handlchange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "country") {
      setFormdata({ ...formdata, country: value, state: "" });
    } else {
      setFormdata({ ...formdata, [name]: value })
    }
  }

  const nextStep = () => {
    if (step === 0) {
      const newErrors = {};
      const fieldsToValidate = isInvited 
        ? ["email", "fullName", "password"] 
        : ["email", "fullName", "password", "organizationName", "country", "state"];

      fieldsToValidate.forEach(field => {
        const error = validateField(field, formdata[field]);
        if (error) newErrors[field] = error;
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please fill these fields before proceeding");
        return;
      }
    }
    if (step === 1 && !formdata.onboarding.purpose) {
      toast.error("Please select a purpose");
      return;
    }
    if (step === 2 && !formdata.onboarding.role) {
      toast.error("Please select your role");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isInvited) {
      // Validate fullName and password
      const nameError = validateField("fullName", formdata.fullName);
      const passError = validateField("password", formdata.password);
      if (nameError || passError) {
        setErrors({ fullName: nameError, password: passError });
        toast.error(nameError || passError);
        return;
      }
    } else if (!formdata.onboarding.firstManagementArea) {
      toast.error("Please select what you'd like to manage first");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/register`,
        formdata
      );

      if (res.data.success === true) {
        toast.success(res.data.message || "Account created successfully!");
        navigate(`/check-email/${formdata.email}`)
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isInvited ? "Set Up Your Profile Password" : "What are your account and organization details?"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {isInvited ? `Complete your registration to join ${searchParams.get("workspace") || "the workspace"}` : "Tell us a bit about you and your organization"}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">What's your email address?</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formdata.email}
                  disabled={isInvited}
                  className={`w-full rounded-xl px-4 py-3 border bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-75 ${
                    errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                  onChange={handlchange}
                  required
                />
                {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">What's your full name?</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formdata.fullName}
                  className={`w-full rounded-xl px-4 py-3 border bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                  onChange={handlchange}
                  required
                />
                {errors.fullName && <p className="text-xs text-red-500 ml-1">{errors.fullName}</p>}
              </div>

              {!isInvited && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">What is your organization's name?</label>
                    <input
                      type="text"
                      name="organizationName"
                      placeholder="Organization Name"
                      value={formdata.organizationName}
                      className={`w-full rounded-xl px-4 py-3 border bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                        errors.organizationName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      onChange={handlchange}
                      required
                    />
                    {errors.organizationName && <p className="text-xs text-red-500 ml-1">{errors.organizationName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Where are you located?</label>
                      <div className="relative">
                        <select
                          name="country"
                          value={formdata.country}
                          className={`w-full rounded-xl px-4 py-3 border bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all appearance-none pr-10 ${
                            errors.country ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:ring-blue-500/20 focus:border-blue-500'
                          }`}
                          onChange={handlchange}
                          required
                        >
                          <option value="">Select Country</option>
                          {Object.keys(countries).map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                      {errors.country && <p className="text-xs text-red-500 ml-1">{errors.country}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Select your state</label>
                      <div className="relative">
                        <select
                          name="state"
                          value={formdata.state}
                          disabled={!formdata.country}
                          className={`w-full rounded-xl px-4 py-3 border bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all appearance-none pr-10 disabled:opacity-50 ${
                            errors.state ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:ring-blue-500/20 focus:border-blue-500'
                          }`}
                          onChange={handlchange}
                          required
                        >
                          <option value="">Select State</option>
                          {formdata.country && countries[formdata.country].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                      {errors.state && <p className="text-xs text-red-500 ml-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Phone number (Optional)</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="+1 234 567 890"
                      value={formdata.phoneNumber}
                      className="w-full rounded-xl px-4 py-3 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      onChange={handlchange}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Choose a password</label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formdata.password}
                    className={`w-full rounded-xl px-4 py-3 pr-12 border bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    onChange={handlchange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
              </div>
            </div>
          </div>
        );

      case 1:
        const purposes = [
          { id: 'WORK', label: 'WORK', icon: <Briefcase size={20} /> },
          { id: 'Personal', label: 'Personal', icon: <User size={20} /> },
          { id: 'School', label: 'School', icon: <GraduationCap size={20} /> },
          { id: 'Nonprofits', label: 'Nonprofits', icon: <Heart size={20} /> },
        ];
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-1 text-left">
              <h2 className="text-xl font-semibold dark:text-white">Hey there, What brings you here today?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {purposes.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleOnboardingChange('purpose', p.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all gap-3 ${
                    formdata.onboarding.purpose === p.id
                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'border-gray-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {p.icon}
                  <span className="font-medium">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        const roles = ["Business owner", "Team leader", "Director", "C-Level", "VP", "Other"];
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold dark:text-white">What best describes your current role?</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleOnboardingChange('role', r)}
                  className={`px-5 py-2.5 rounded-full border-2 transition-all text-sm font-medium ${
                    formdata.onboarding.role === r
                      ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'border-gray-200 dark:border-white/10 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold dark:text-white">How many people are on your team?</h2>
              <div className="flex flex-wrap gap-3">
                {["Only me", "2-10", "11-50", "51-100", "101-500", "501+"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleOnboardingChange('teamSize', s)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                      formdata.onboarding.teamSize === s
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-200 dark:border-white/10 dark:text-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold dark:text-white">How many people work at your company?</h2>
              <div className="flex flex-wrap gap-3">
                {["1-19", "20-49", "50-99", "100-499", "500-1499", "1500+"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleOnboardingChange('companySize', s)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                      formdata.onboarding.companySize === s
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-200 dark:border-white/10 dark:text-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        const areas = [
          "Operations", "Legal", "Design & Creative", "Projects & Tasks", "IT",
          "Sales & CRM", "Software development", "Education", "Marketing",
          "Construction", "HR & Recruiting", "Product management", "Other"
        ];
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold dark:text-white">What would you like to manage first?</h2>
              <p className="text-sm text-gray-500 mt-1">You can always add more in the future</p>
            </div>
            <div className="flex flex-wrap gap-3 max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
              {areas.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => handleOnboardingChange('firstManagementArea', a)}
                  className={`px-5 py-2.5 rounded-full border-2 transition-all text-sm font-medium ${
                    formdata.onboarding.firstManagementArea === a
                      ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'border-gray-200 dark:border-white/10 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        {!isInvited && (
          <div className="mb-8 flex items-center gap-2 px-2">
            {[0, 1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= s ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'bg-gray-200 dark:bg-white/10'
                }`}
              />
            ))}
          </div>
        )}

        {/* Signup Card */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 p-8 md:p-10 min-h-[500px] flex flex-col">
          <div className="flex-1">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button 
                onClick={prevStep} 
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Back
              </button>
            )}
            <button
              disabled={loading}
              onClick={step === 4 || isInvited ? handleSubmit : nextStep}
              className={`py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                step === 0 ? 'w-full' : 'flex-[2]'
              } bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25`}
            >
              {loading ? 'Creating...' : step === 4 || isInvited ? 'Finalize & Register' : 'Continue'}
            </button>
          </div>

          {step === 0 && (
            <div className="mt-8 text-center pt-6 border-t border-gray-100 dark:border-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup