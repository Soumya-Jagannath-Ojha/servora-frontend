import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, createProject } from "../../store/slices/projectSlice";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../../utils/config";

const projectData = [
  {
    id: 1,
    name: "Nebula UI Kit",
    description: "Enterprise-grade design system for high-performance cloud architectures.",
    status: "IN PROGRESS",
    statusColor: "emerald",
    progress: 78,
    progressLabel: "DEVELOPMENT PROGRESS",
    manager: "Alex Rivera",
    icon: "grid_view",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    indicator: "On Track",
    indicatorColor: "text-emerald-500",
    members: [
      { id: 1, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 2, avatar: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 3, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    extraMembers: 4
  },
  {
    id: 2,
    name: "Titan Firewall",
    description: "Next-gen security layer with automated threat detection and...",
    status: "REVIEW",
    statusColor: "amber",
    progress: 92,
    progressLabel: "CODE AUDIT STATUS",
    manager: "Alex Rivera",
    icon: "security",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    indicator: "Due in 2d",
    indicatorIcon: "schedule",
    indicatorColor: "text-gray-400",
    members: [
      { id: 4, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    id: 3,
    name: "API Integration",
    description: "Legacy system migration and multi-cloud API gateway implementation fo...",
    status: "ON HOLD",
    statusColor: "gray",
    progress: 45,
    progressLabel: "MIGRATION PHASE",
    manager: "Alex Rivera",
    icon: "hub",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    indicator: "Delayed",
    indicatorIcon: "warning",
    indicatorColor: "text-red-500",
    members: [
      { id: 6, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    id: 4,
    name: "Quantum DB Engine",
    description: "Developing a revolutionary non-relational database engine optimized for sub-millisecond querying across exabyte-scale datasets.",
    status: "IN PROGRESS",
    statusColor: "emerald",
    progress: 60,
    progressLabel: "60% DONE",
    manager: "Alex Rivera",
    icon: "database",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    indicator: "Ahead of Schedule",
    indicatorIcon: "trending_up",
    indicatorColor: "text-emerald-500",
    membersCount: 12,
    dueDate: "Oct 24",
    isLarge: true
  },
  {
    id: 5,
    name: "Orbit Sync v2",
    description: "High-frequency data synchronization service for edge computing nodes an...",
    status: "COMPLETED",
    statusColor: "emerald",
    progress: 100,
    progressLabel: "DEPLOYMENT",
    manager: "Alex Rivera",
    icon: "rocket_launch",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    indicator: "Archived Aug 12",
    indicatorIcon: "archive",
    indicatorColor: "text-gray-400",
    members: [
      { id: 7, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  }
];

const ProjectCard = ({ project }) => (
  <div className="glass-card p-6 md:p-8 rounded-3xl space-y-6 group">
    <div className="flex justify-between items-start">
      <div className={`${project.iconBg} w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center shrink-0`}>
        <span className={`material-symbols-outlined ${project.iconColor} text-2xl`}>{project.icon}</span>
      </div>
      <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest border border-white/5 ${project.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
          project.statusColor === 'amber' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }`}>
        {project.status}
      </span>
    </div>

    <div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{project.name}</h4>
      <p className="text-xs text-gray-400 mt-2 font-medium leading-relaxed line-clamp-2">{project.description}</p>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <span>{project.progressLabel}</span>
        <span className="text-gray-900 dark:text-white">{project.progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${project.iconColor.replace('text', 'bg')} rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
    </div>

    <div className="flex items-center justify-between pt-5 border-t border-gray-50 dark:border-white/5">
      <div className="flex -space-x-2">
        {project.members && project.members.map((m, idx) => (
          <img key={idx} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#161432] shadow-sm object-cover" src={m.avatar} alt="Member" />
        ))}
        {project.extraMembers > 0 && (
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400 border-2 border-white dark:border-[#161432] shadow-sm">+{project.extraMembers}</div>
        )}
      </div>
      <div className={`flex items-center gap-1.5 text-[11px] font-black ${project.indicatorColor}`}>
        {project.indicatorIcon && <span className="material-symbols-outlined text-sm">{project.indicatorIcon}</span>}
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        <span className="hidden xs:inline">{project.indicator}</span>
      </div>
    </div>
  </div>
);

const LargeProjectCard = ({ project }) => (
  <div className="lg:col-span-2 glass-card p-6 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col md:flex-row gap-8 md:gap-10 items-center group relative overflow-hidden">
    {/* Abstract Glow */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

    <div className="flex-1 space-y-6 md:space-y-8 z-10 w-full">
      <div className="flex items-center gap-4">
        <div className={`${project.iconBg} w-14 h-14 rounded-xl flex items-center justify-center shrink-0`}>
          <span className={`material-symbols-outlined ${project.iconColor} text-3xl`}>{project.icon}</span>
        </div>
        <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
          {project.status}
        </span>
      </div>

      <div>
        <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{project.name}</h4>
        <p className="text-sm text-gray-400 mt-4 leading-relaxed font-medium">{project.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:gap-10 pt-4">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Team Size</p>
          <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{project.membersCount} Leads</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Due Date</p>
          <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{project.dueDate}</p>
        </div>
      </div>
    </div>

    <div className="relative w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center z-10 shrink-0">
      <svg className="w-full h-full -rotate-90">
        <circle className="text-gray-100 dark:text-white/5" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeWidth="12"></circle>
        <circle
          className="text-blue-600/20"
          cx="50%" cy="50%"
          fill="transparent"
          r="42%"
          stroke="currentColor"
          strokeWidth="12"
        ></circle>
        <circle
          className="text-blue-600 drop-shadow-[0_0_12px_rgba(37,99,235,0.4)]"
          cx="50%" cy="50%"
          fill="transparent"
          r="42%"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray="596.6"
          strokeDashoffset={596.6 - (596.6 * project.progress) / 100}
          strokeLinecap="round"
          style={{ strokeDasharray: '264', strokeDashoffset: 264 - (264 * project.progress) / 100 }}
        ></circle>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{project.progress}%</span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Done</span>
      </div>
      <div className={`mt-4 md:mt-6 flex items-center gap-2 text-[11px] font-black ${project.indicatorColor}`}>
        <span className="material-symbols-outlined text-sm">{project.indicatorIcon}</span>
        {project.indicator}
      </div>
    </div>
  </div>
);

const ProjectsTableView = ({ displayProjects }) => (
  <div className="glass-card rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5 bg-white/40 dark:bg-[#121124]/40 backdrop-blur-md">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <th className="py-5 px-8">Project Name</th>
            <th className="py-5 px-6">Status</th>
            <th className="py-5 px-6">Progress</th>
            <th className="py-5 px-6">Due Date</th>
            <th className="py-5 px-6">Team Size</th>
            <th className="py-5 px-8 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
          {displayProjects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors group">
              <td className="py-5 px-8">
                <div className="flex items-center gap-3">
                  <div className={`${project.iconBg} w-9 h-9 rounded-xl flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined ${project.iconColor} text-lg`}>{project.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{project.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 max-w-xs">{project.description}</p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className={`px-2.5 py-0.5 text-[9px] font-black rounded-full uppercase tracking-widest border border-white/5 ${
                  project.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  project.status === 'ON HOLD' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                  'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                  {project.status}
                </span>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center gap-3 min-w-[120px]">
                  <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shrink-0">
                    <div
                      className={`h-full ${project.iconColor.replace('text', 'bg')} rounded-full transition-all duration-1000`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-black text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
              </td>
              <td className="py-5 px-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
                {project.dueDate}
              </td>
              <td className="py-5 px-6">
                <div className="flex -space-x-1.5">
                  {project.members && project.members.map((m, idx) => (
                    <img key={idx} className="w-6 h-6 rounded-full border border-white dark:border-[#161432] object-cover" src={m.avatar} alt="Member" />
                  ))}
                  {project.extraMembers > 0 && (
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[9px] font-bold text-gray-400 border border-white dark:border-[#161432]">+{project.extraMembers}</div>
                  )}
                </div>
              </td>
              <td className="py-5 px-8 text-right">
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MyProjectsView = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { projects = [], loading = false } = useSelector((state) => state.projects || {});
  
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"
  const [createModalOpen, setCreateModalOpen] = useState(false);
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
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (createModalOpen) {
      const fetchMembers = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/v1/workspace/members`, { withCredentials: true });
          if (res.data?.success) {
            const list = res.data.data.members || [];
            setMembers(list);
            if (currentUser) {
              setProjectManager(currentUser._id);
            } else if (list.length > 0) {
              setProjectManager(list[0]._id);
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchMembers();
      
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
      
      setStartDate("");
      setEndDate("");
    }
  }, [createModalOpen, currentUser]);

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

      const resultAction = await dispatch(createProject(payload));
      
      if (createProject.fulfilled.match(resultAction)) {
        toast.success("Project created successfully!");
        setCreateModalOpen(false);
        dispatch(fetchProjects()); // reload list
      } else {
        toast.error(resultAction.payload || "Failed to create project");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const avatarUrls = [
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop"
  ];

  // Map real projects to the structure the card component expects
  const displayProjects = projects.length > 0 ? projects.map((item, index) => {
    const p = item.project || item;
    const isCompleted = p.status === "Completed";
    const isOnHold = p.status === "On Hold";
    
    const count = p.members || 1;
    const membersList = Array.from({ length: Math.min(count, 3) }, (_, idx) => ({
      id: idx,
      avatar: avatarUrls[idx % avatarUrls.length]
    }));
    
    return {
      id: p._id,
      name: p.name,
      description: p.description || "No description provided.",
      status: p.status ? p.status.toUpperCase() : "ACTIVE",
      statusColor: isCompleted ? "emerald" : isOnHold ? "amber" : "emerald",
      progress: p.progress || 0,
      progressLabel: "DEVELOPMENT PROGRESS",
      manager: "Manager",
      icon: index % 3 === 0 ? "grid_view" : index % 3 === 1 ? "security" : "hub",
      iconBg: index % 3 === 0 ? "bg-blue-500/10" : index % 3 === 1 ? "bg-amber-500/10" : "bg-purple-500/10",
      iconColor: index % 3 === 0 ? "text-blue-500" : index % 3 === 1 ? "text-amber-500" : "text-purple-500",
      indicator: p.status || "Active",
      indicatorIcon: isCompleted ? "archive" : isOnHold ? "warning" : "trending_up",
      indicatorColor: isCompleted ? "text-emerald-500" : isOnHold ? "text-red-500" : "text-emerald-500",
      members: membersList,
      extraMembers: count > 3 ? count - 3 : 0,
      isLarge: false,
      membersCount: count,
      dueDate: p.endDate ? new Date(p.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Oct 24",
    };
  }) : [];

  if (loading && projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest animate-pulse">Loading Projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">My Projects</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <p className="text-[11px] text-gray-500 font-bold">{displayProjects.length} Active Projects</p>
            </div>
          </div>
          <div className="flex sm:hidden bg-gray-100 dark:bg-white/5 p-1 rounded-xl h-10 items-center">
            <button 
              onClick={() => setViewType("grid")}
              className={`h-full px-3 rounded-lg flex items-center justify-center transition-all ${
                viewType === "grid" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">grid_view</span>
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`h-full px-3 rounded-lg flex items-center justify-center transition-all ${
                viewType === "list" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">list</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
          <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-between px-4 h-11 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm">
              <span>Status: All</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <button className="flex items-center justify-between px-4 h-11 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm">
              <span>Category: All</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
          <button 
            onClick={() => setCreateModalOpen(true)}
            className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-blue-500/20 shrink-0"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Create Project</span>
          </button>
          <div className="hidden sm:flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl h-11 items-center">
            <button 
              onClick={() => setViewType("grid")}
              className={`h-full px-4 rounded-lg flex items-center justify-center transition-all ${
                viewType === "grid" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`h-full px-4 rounded-lg flex items-center justify-center transition-all ${
                viewType === "list" 
                  ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" 
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-lg">list</span>
            </button>
          </div>
        </div>
      </div>

      {displayProjects.length > 0 ? (
        viewType === "list" ? (
          <ProjectsTableView displayProjects={displayProjects} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 border border-dashed border-gray-100 dark:border-white/5 rounded-3xl">
          <span className="material-symbols-outlined text-6xl mb-4 animate-float">folder_open</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">No Projects Found</h2>
          <p className="text-xs text-center max-w-xs mt-1 text-gray-400">Get started by setting up a project in your workspace.</p>
        </div>
      )}

      {/* Create Project Modal */}
      {createModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm overflow-hidden font-sans">
          <div className="w-full max-w-2xl bg-white dark:bg-[#121124] rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl animate-scale-in relative my-auto flex flex-col overflow-y-auto" style={{maxHeight: 'min(90vh, 800px)', overscrollBehavior: 'contain'}}>
            
            {/* Sticky Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 px-8 pt-8 shrink-0">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Create New Project</h3>
                <p className="text-xs text-gray-400 font-bold mt-0.5">Fill in workspace project parameters</p>
              </div>
              <button 
                onClick={() => setCreateModalOpen(false)}
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

            {/* Form */}
            <form onSubmit={handleCreateProject} className="px-8 pb-8">
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

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-white/5 shrink-0 mt-4">
                {currentStep > 1 ? (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="flex-1 py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Back</span>
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="flex-1 py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase"
                  >
                    Cancel
                  </button>
                )}

                {currentStep < 4 ? (
                  <button 
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
                    type="submit"
                    disabled={creating}
                    className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-75 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    {creating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <span>Create Project</span>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MyProjectsView;
