import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject, updateProject } from "../../store/slices/projectSlice";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../../utils/config";

const CreateProjectModal = ({ isOpen, onClose, onSubmitSuccess, projectToEdit = null }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [creating, setCreating] = useState(false);

  // Zod backend matching fields
  const [template, setTemplate] = useState("none");
  const [projectType, setProjectType] = useState("");
  const [status, setStatus] = useState("Active");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [progress, setProgress] = useState(0);

  // New validation fields
  const [departments, setDepartments] = useState("");
  const [projectUpdates, setProjectUpdates] = useState("");
  const [vendorsList, setVendorsList] = useState([]);
  const [assignedMembersList, setAssignedMembersList] = useState([]);
  const [penaltiesList, setPenaltiesList] = useState([]);

  // Form helpers/temporary state for list item pushes
  const [newMemberId, setNewMemberId] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");

  const [newVendorName, setNewVendorName] = useState("");
  const [newVendorLocation, setNewVendorLocation] = useState("");
  const [newVendorGst, setNewVendorGst] = useState("");
  const [newVendorDetails, setNewVendorDetails] = useState("");

  const [newPenaltyAmount, setNewPenaltyAmount] = useState("");
  const [newPenaltyReason, setNewPenaltyReason] = useState("");
  const [newPenaltyStatus, setNewPenaltyStatus] = useState("Pending");
  const [newPenaltyCategory, setNewPenaltyCategory] = useState("");
  const [newPenaltyDate, setNewPenaltyDate] = useState("");
  const [newPenaltyImposedBy, setNewPenaltyImposedBy] = useState("");
  const [newPenaltyRemarks, setNewPenaltyRemarks] = useState("");

  const [members, setMembers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: "general", label: "General Info" },
    { id: "schedule", label: "Team & Dates" },
    { id: "client", label: "Client & Budget" },
    { id: "vendors_penalties", label: "Vendors & Penalties" }
  ];

  useEffect(() => {
    if (isOpen) {
      const fetchMembers = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/v1/workspace/members`, { withCredentials: true });
          if (res.data?.success) {
            const list = res.data.data.members || [];
            setMembers(list);
            
            // Set manager fallback if not editing
            if (!projectToEdit) {
              if (currentUser) {
                setProjectManager(currentUser._id);
              } else if (list.length > 0) {
                setProjectManager(list[0]._id);
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchMembers();
      
      if (projectToEdit) {
        // Extract raw project object if wrapped
        const p = projectToEdit.rawProject || projectToEdit;
        setProjectName(p.name || "");
        setProjectDesc(p.description || "");
        setTemplate(p.template || "none");
        setProjectType(p.projectType || "");
        setStatus(p.status || "Active");
        setClientName(p.client?.name || "");
        setClientEmail(p.client?.email || "");
        setClientPhone(p.client?.phone || "");
        setBudget(p.budget || "");
        setProgress(p.progress || 0);
        setDepartments(p.departments?.join(", ") || "");
        setProjectUpdates(p.projectUpdates || "");
        setVendorsList(p.vendors || []);
        
        // Normalize assigned members list to ensure staging name displays correctly
        const membersMapped = p.assignedMembers ? p.assignedMembers.map(m => ({
          member: m.member?._id || m.member,
          role: m.role || "Developer",
          fullName: m.fullName || (m.member?.fullName || m.member?.username) || "Workspace Member"
        })) : [];
        setAssignedMembersList(membersMapped);
        
        setPenaltiesList(p.penalties || []);
        setProjectManager(p.projectManager || "");
        setStartDate(p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : "");
        setEndDate(p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : "");
      } else {
        // Reset all defaults
        setProjectName("");
        setProjectDesc("");
        setTemplate("none");
        setProjectType("");
        setStatus("Active");
        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setBudget("");
        setProgress(0);
        setDepartments("");
        setProjectUpdates("");
        setVendorsList([]);
        setAssignedMembersList([]);
        setPenaltiesList([]);
        setStartDate("");
        setEndDate("");
      }
      
      setNewMemberId("");
      setNewMemberRole("");
      setNewVendorName("");
      setNewVendorLocation("");
      setNewVendorGst("");
      setNewVendorDetails("");
      setNewPenaltyAmount("");
      setNewPenaltyReason("");
      setNewPenaltyStatus("Pending");
      setNewPenaltyCategory("");
      setNewPenaltyDate("");
      setNewPenaltyImposedBy("");
      setNewPenaltyRemarks("");
      
      setFormErrors({});
      setCurrentStep(1);
    }
  }, [isOpen, currentUser, projectToEdit]);

  const addAssignedMember = () => {
    if (!newMemberId) {
      toast.error("Please select a workspace member");
      return;
    }
    const exists = assignedMembersList.some(m => m.member === newMemberId);
    if (exists) {
      toast.error("Member already assigned to this project");
      return;
    }
    const memberObj = members.find(m => m._id === newMemberId) || (currentUser && currentUser._id === newMemberId ? currentUser : null);
    setAssignedMembersList([...assignedMembersList, {
      member: newMemberId,
      role: newMemberRole.trim() || "Developer",
      fullName: memberObj ? (memberObj.fullName || memberObj.username) : "Workspace Member"
    }]);
    setNewMemberId("");
    setNewMemberRole("");
    toast.success("Member staged");
  };

  const removeAssignedMember = (idx) => {
    setAssignedMembersList(assignedMembersList.filter((_, i) => i !== idx));
  };

  const addVendor = () => {
    if (!newVendorName.trim()) {
      toast.error("Vendor name is required");
      return;
    }
    setVendorsList([...vendorsList, {
      name: newVendorName.trim(),
      location: newVendorLocation.trim() || undefined,
      gstNumber: newVendorGst.trim() || undefined,
      details: newVendorDetails.trim() || undefined
    }]);
    setNewVendorName("");
    setNewVendorLocation("");
    setNewVendorGst("");
    setNewVendorDetails("");
    toast.success("Vendor staged");
  };

  const removeVendor = (idx) => {
    setVendorsList(vendorsList.filter((_, i) => i !== idx));
  };

  const addPenalty = () => {
    if (!newPenaltyAmount || Number(newPenaltyAmount) <= 0) {
      toast.error("Valid penalty amount is required");
      return;
    }
    setPenaltiesList([...penaltiesList, {
      amount: Number(newPenaltyAmount),
      reason: newPenaltyReason.trim() || undefined,
      status: newPenaltyStatus,
      category: newPenaltyCategory.trim() || undefined,
      date: newPenaltyDate || undefined,
      imposedBy: newPenaltyImposedBy.trim() || undefined,
      remarks: newPenaltyRemarks.trim() || undefined
    }]);
    setNewPenaltyAmount("");
    setNewPenaltyReason("");
    setNewPenaltyStatus("Pending");
    setNewPenaltyCategory("");
    setNewPenaltyDate("");
    setNewPenaltyImposedBy("");
    setNewPenaltyRemarks("");
    toast.success("Penalty staged");
  };

  const removePenalty = (idx) => {
    setPenaltiesList(penaltiesList.filter((_, i) => i !== idx));
  };

  const validateStep = (stepNumber) => {
    const errors = {};
    if (stepNumber === 1) {
      if (!projectName.trim()) {
        errors.name = "Project name is required";
      }
    } else if (stepNumber === 2) {
      if (!startDate) {
        errors.startDate = "Start date is required";
      }
      if (!endDate) {
        errors.endDate = "End date is required";
      } else if (startDate && new Date(endDate) < new Date(startDate)) {
        errors.endDate = "End date must be after start date";
      }
      if (!projectManager) {
        errors.projectManager = "Project manager is required";
      }
    } else if (stepNumber === 3) {
      if (progress < 0 || progress > 100) {
        errors.progress = "Progress must be between 0 and 100";
      }
      if (clientEmail && !/\S+@\S+\.\S+/.test(clientEmail)) {
        errors.clientEmail = "Invalid email format";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      toast.error("Please resolve validation errors across all steps before submitting");
      return;
    }
    setCreating(true);
    try {
      const deptsArray = departments
        ? departments.split(",").map(d => d.trim()).filter(d => d.length > 0)
        : [];

      const payload = {
        name: projectName.trim(),
        template,
        projectType: projectType.trim() || undefined,
        status,
        startDate,
        endDate,
        projectManager,
        description: projectDesc.trim() || undefined,
        budget: budget ? Number(budget) : undefined,
        progress: Number(progress),
        client: {
          name: clientName.trim() || undefined,
          email: clientEmail.trim() || undefined,
          phone: clientPhone.trim() || undefined
        },
        departments: deptsArray.length > 0 ? deptsArray : undefined,
        projectUpdates: projectUpdates.trim() || undefined,
        assignedMembers: assignedMembersList?.length > 0 ? assignedMembersList.map(m => ({ member: m.member, role: m.role })) : undefined,
        vendors: vendorsList?.length > 0 ? vendorsList : undefined,
        penalties: penaltiesList?.length > 0 ? penaltiesList.map(p => ({
          ...p,
          date: p.date ? new Date(p.date) : undefined
        })) : undefined
      };

      let resultAction;
      if (projectToEdit) {
        const rawProj = projectToEdit.rawProject || projectToEdit;
        resultAction = await dispatch(updateProject({ projectId: rawProj._id, projectData: payload }));
      } else {
        resultAction = await dispatch(createProject(payload));
      }
      
      if (
        (projectToEdit && updateProject.fulfilled.match(resultAction)) ||
        (!projectToEdit && createProject.fulfilled.match(resultAction))
      ) {
        toast.success(projectToEdit ? "Project updated successfully!" : "Project created successfully!");
        onSubmitSuccess();
        onClose();
      } else {
        toast.error(resultAction.payload || "Failed to submit project data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit project data");
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#121124] rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl animate-scale-in relative z-10 my-auto flex flex-col overflow-hidden">
        
        {/* Sticky Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 px-8 pt-8 shrink-0">
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              {projectToEdit ? "Edit Project Details" : "Create New Project"}
            </h3>
            <p className="text-xs text-gray-400 font-bold mt-0.5">
              {projectToEdit ? "Modify workspace project parameters" : "Fill in workspace project parameters"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-955 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="relative flex justify-between items-start w-full px-12 pt-4 pb-6 select-none shrink-0">
          {/* Connector Progress Line */}
          <div className="absolute top-[34px] left-[65px] right-[65px] h-[3px] bg-gray-100 dark:bg-white/5 z-0 rounded-full" />
          <div 
            className="absolute top-[34px] left-[65px] h-[3px] bg-[#5c53ff] z-0 transition-all duration-300 rounded-full" 
            style={{ width: `calc(${((currentStep - 1) / 3) * 100}% - 4px)` }}
          />
          
          {/* Stepper buttons */}
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            
            return (
              <button
                key={step.id}
                type="button"
                disabled={!isCompleted && !isActive}
                onClick={() => {
                  if (isCompleted || isActive) {
                    setCurrentStep(stepNum);
                  }
                }}
                className="relative z-10 flex flex-col items-center focus:outline-none w-20"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted || isActive 
                    ? "bg-[#5c53ff] text-white shadow-md shadow-[#5c53ff]/30" 
                    : "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400"
                }`}>
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-sm font-black select-none">check</span>
                  ) : isActive ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-white transition-all duration-300" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
                  )}
                </div>
                <span className={`text-[9px] font-black mt-2 uppercase tracking-widest text-center transition-colors ${
                  isActive ? "text-[#5c53ff]" : isCompleted ? "text-gray-700 dark:text-gray-300" : "text-gray-400"
                }`}>
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleCreateProject} className="flex-1 flex flex-col overflow-hidden">
          <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-8 space-y-6">
            {/* Tab 1: General Info */}
            {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in-up">
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider pl-1 border-b border-gray-100 dark:border-white/5 pb-2">General Info</h4>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Project Name *</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    if (formErrors.name) {
                      setFormErrors(prev => {
                        const copy = { ...prev };
                        delete copy.name;
                        return copy;
                      });
                    }
                  }}
                  placeholder="e.g. Website Redesign"
                  className={`w-full bg-gray-50 dark:bg-white/5 border rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white ${
                    formErrors.name ? 'border-red-500' : 'border-transparent'
                  }`}
                />
                {formErrors.name && <p className="text-[10px] text-red-500 pl-1">{formErrors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Project Type</label>
                  <input 
                    type="text" 
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    placeholder="e.g. Software Development"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Template</label>
                  <select 
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white shadow-sm"
                  >
                    <option value="none">None (Blank)</option>
                    <option value="scrum">Scrum (Sprints & Backlogs)</option>
                    <option value="kanban">Kanban Board</option>
                    <option value="simple">Simple Tasklist</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white shadow-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Archived">Archived</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                <textarea 
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Describe what this project is about..."
                  rows="2"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Project Updates / Notes</label>
                <textarea 
                  value={projectUpdates}
                  onChange={(e) => setProjectUpdates(e.target.value)}
                  placeholder="Add initial project updates, logs or progress details..."
                  rows="2"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white resize-none"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Team & Schedule */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in-up">
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider pl-1 border-b border-gray-100 dark:border-white/5 pb-2">Team & Dates</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Start Date *</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setFormErrors(prev => {
                        const copy = { ...prev };
                        delete copy.startDate;
                        delete copy.endDate;
                        return copy;
                      });
                    }}
                    className={`w-full bg-gray-50 dark:bg-white/5 border rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white ${
                      formErrors.startDate ? 'border-red-500' : 'border-transparent'
                    }`}
                  />
                  {formErrors.startDate && <p className="text-[10px] text-red-500 pl-1">{formErrors.startDate}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">End Date *</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      if (formErrors.endDate) {
                        setFormErrors(prev => {
                          const copy = { ...prev };
                          delete copy.endDate;
                          return copy;
                        });
                      }
                    }}
                    className={`w-full bg-gray-50 dark:bg-white/5 border rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white ${
                      formErrors.endDate ? 'border-red-500' : 'border-transparent'
                    }`}
                  />
                  {formErrors.endDate && <p className="text-[10px] text-red-500 pl-1">{formErrors.endDate}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Project Manager *</label>
                  <select
                    value={projectManager}
                    onChange={(e) => {
                      setProjectManager(e.target.value);
                      if (formErrors.projectManager) {
                        setFormErrors(prev => {
                          const copy = { ...prev };
                          delete copy.projectManager;
                          return copy;
                        });
                      }
                    }}
                    className={`w-full bg-gray-50 dark:bg-white/5 border rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white ${
                      formErrors.projectManager ? 'border-red-500' : 'border-transparent'
                    }`}
                  >
                    {members.map((member) => (
                      <option key={member._id} value={member._id} className="dark:bg-[#121124]">
                        {member.fullName || member.username} ({member.email})
                      </option>
                    ))}
                    {members.length === 0 && currentUser && (
                      <option value={currentUser._id} className="dark:bg-[#121124]">
                        {currentUser.fullName || currentUser.username} ({currentUser.email})
                      </option>
                    )}
                  </select>
                  {formErrors.projectManager && <p className="text-[10px] text-red-500 pl-1">{formErrors.projectManager}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Departments (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={departments}
                    onChange={(e) => setDepartments(e.target.value)}
                    placeholder="e.g. Engineering, Design, QA"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                  />
                </div>
              </div>

              {/* Assigned Members list section */}
              <div className="border border-gray-100 dark:border-white/5 rounded-2xl p-4 space-y-3 bg-gray-50/50 dark:bg-white/5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Assign Team Members</label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <select
                    value={newMemberId}
                    onChange={(e) => setNewMemberId(e.target.value)}
                    className="flex-1 bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  >
                    <option value="">-- Select Member --</option>
                    {members.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.fullName || member.username}
                      </option>
                    ))}
                    {currentUser && <option value={currentUser._id}>{currentUser.fullName || currentUser.username} (You)</option>}
                  </select>
                  <input
                    type="text"
                    placeholder="Role (e.g. Lead Dev)"
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full sm:w-1/3 bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addAssignedMember}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase"
                  >
                    Assign
                  </button>
                </div>

                {assignedMembersList.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {assignedMembersList.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full text-xs font-bold">
                        <span>{m.fullName}: <span className="font-normal opacity-80">{m.role}</span></span>
                        <button
                          type="button"
                          onClick={() => removeAssignedMember(idx)}
                          className="w-4 h-4 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center text-[10px] transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Client & Financials */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in-up">
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider pl-1 border-b border-gray-100 dark:border-white/5 pb-2">Client & Budget</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Budget ($)</label>
                  <input 
                    type="number" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Progress (%)</label>
                  <input 
                    type="number" 
                    value={progress}
                    onChange={(e) => {
                      setProgress(e.target.value);
                      if (formErrors.progress) {
                        setFormErrors(prev => {
                          const copy = { ...prev };
                          delete copy.progress;
                          return copy;
                        });
                      }
                    }}
                    placeholder="0"
                    min="0"
                    max="100"
                    className={`w-full bg-gray-50 dark:bg-white/5 border rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white ${
                      formErrors.progress ? 'border-red-500' : 'border-transparent'
                    }`}
                  />
                  {formErrors.progress && <p className="text-[10px] text-red-500 pl-1">{formErrors.progress}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Client Name</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client contact person name"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Client Email</label>
                  <input 
                    type="email" 
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      if (formErrors.clientEmail) {
                        setFormErrors(prev => {
                          const copy = { ...prev };
                          delete copy.clientEmail;
                          return copy;
                        });
                      }
                    }}
                    placeholder="client@example.com"
                    className={`w-full bg-gray-50 dark:bg-white/5 border rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white ${
                      formErrors.clientEmail ? 'border-red-500' : 'border-transparent'
                    }`}
                  />
                  {formErrors.clientEmail && <p className="text-[10px] text-red-500 pl-1">{formErrors.clientEmail}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Client Phone</label>
                  <input 
                    type="tel" 
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-xs font-bold transition-all dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Vendors & Penalties */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in-up">
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider pl-1 border-b border-gray-100 dark:border-white/5 pb-2">Vendors & Penalties</h4>
              {/* Vendors Sub-section */}
              <div className="border border-gray-100 dark:border-white/5 rounded-2xl p-4 space-y-3 bg-gray-50/50 dark:bg-white/5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-white/5 pb-1">Stage Project Vendors</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Vendor Name"
                    value={newVendorName}
                    onChange={(e) => setNewVendorName(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newVendorLocation}
                    onChange={(e) => setNewVendorLocation(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="GST Number"
                    value={newVendorGst}
                    onChange={(e) => setNewVendorGst(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Details"
                    value={newVendorDetails}
                    onChange={(e) => setNewVendorDetails(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={addVendor}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase"
                >
                  + Add Vendor
                </button>

                {vendorsList.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {vendorsList.map((v, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white dark:bg-[#121124] p-2.5 rounded-xl border border-gray-100 dark:border-white/5 text-xs">
                        <div className="dark:text-white">
                          <span className="font-bold">{v.name}</span>
                          {v.location && <span className="text-gray-400"> ({v.location})</span>}
                          {v.gstNumber && <p className="text-[10px] text-gray-500 font-bold">GST: {v.gstNumber}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVendor(idx)}
                          className="text-red-500 hover:bg-red-50/10 p-1 rounded"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Penalties Sub-section */}
              <div className="border border-gray-100 dark:border-white/5 rounded-2xl p-4 space-y-3 bg-gray-50/50 dark:bg-white/5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-white/5 pb-1">Stage Project Penalties</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Amount ($)"
                    value={newPenaltyAmount}
                    onChange={(e) => setNewPenaltyAmount(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Reason"
                    value={newPenaltyReason}
                    onChange={(e) => setNewPenaltyReason(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <select
                    value={newPenaltyStatus}
                    onChange={(e) => setNewPenaltyStatus(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Waived">Waived</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Category"
                    value={newPenaltyCategory}
                    onChange={(e) => setNewPenaltyCategory(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <input
                    type="date"
                    value={newPenaltyDate}
                    onChange={(e) => setNewPenaltyDate(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Imposed By"
                    value={newPenaltyImposedBy}
                    onChange={(e) => setNewPenaltyImposedBy(e.target.value)}
                    className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Remarks"
                  value={newPenaltyRemarks}
                  onChange={(e) => setNewPenaltyRemarks(e.target.value)}
                  className="w-full bg-white dark:bg-[#121124] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold dark:text-white"
                />
                <button
                  type="button"
                  onClick={addPenalty}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase"
                >
                  + Add Penalty
                </button>

                {penaltiesList.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {penaltiesList.map((p, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white dark:bg-[#121124] p-2.5 rounded-xl border border-gray-100 dark:border-white/5 text-xs">
                        <div className="dark:text-white">
                          <span className="font-bold text-red-500">${p.amount}</span> - <span>{p.reason || "No Reason"}</span>
                          <p className="text-[10px] text-gray-500 font-bold">Status: {p.status} | Imposed: {p.imposedBy || "N/A"}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePenalty(idx)}
                          className="text-red-500 hover:bg-red-50/10 p-1 rounded"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

          {/* Action Buttons */}
          <div className="flex gap-4 p-8 border-t border-gray-100 dark:border-white/5 shrink-0">
            {currentStep > 1 ? (
              <button 
                key="back-step-btn"
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Back</span>
              </button>
            ) : (
              <button 
                key="cancel-modal-btn"
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase"
              >
                Cancel
              </button>
            )}

            {currentStep < 4 ? (
              <button 
                key="next-step-btn"
                type="button"
                onClick={() => {
                  if (validateStep(currentStep)) {
                    setCurrentStep(prev => prev + 1);
                  } else {
                    toast.error("Please fill the required fields.");
                  }
                }}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20"
              >
                <span>Next</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <button 
                key="submit-form-btn"
                type="submit"
                disabled={creating}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-75 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                {creating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{projectToEdit ? "Save Changes" : "Create Project"}</span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateProjectModal;
