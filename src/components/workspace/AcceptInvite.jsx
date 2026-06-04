import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, CheckCircle2, AlertTriangle, UserPlus, ArrowRight } from "lucide-react";
import { apiUrl } from "../../utils/config";

const AcceptInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Registration requirement info (from 202 status)
  const [requiresReg, setRequiresReg] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");

  useEffect(() => {
    const verifyAndAcceptInvite = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${apiUrl}/api/v1/workspace/invite/accept/${token}`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          toast.success(res.data?.message || "Successfully joined workspace!");
          const userEmail = res.data?.data?.email || "";
          setInviteEmail(userEmail);
        } else if (res.status === 202) {
          setRequiresReg(true);
          const userEmail = res.data?.data?.inviteEmail || "";
          setInviteEmail(userEmail);
          setWorkspaceName(res.data?.data?.workspaceName || "Workspace");
        }
      } catch (err) {
        console.error(err);
        const resData = err.response?.data;
        
        // Check if backend returned 202 (requires registration)
        if (err.response?.status === 202 || resData?.data?.requiresRegistration) {
          setRequiresReg(true);
          setInviteEmail(resData?.data?.inviteEmail || "");
          setWorkspaceName(resData?.data?.workspaceName || "Workspace");
        } else {
          setError(resData?.message || "Failed to process invitation. Link may be invalid or expired.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyAndAcceptInvite();
    }
  }, [token, navigate, apiUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-gray-900 dark:text-white px-4 py-12 transition-colors duration-500">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-fade-in-up">
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl text-center">
          
          {loading && (
            <div className="space-y-6 py-6">
              <Loader2 className="animate-spin text-blue-500 mx-auto" size={48} />
              <div>
                <h2 className="text-xl font-black">Joining Workspace</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Please wait while we verify your invitation...
                </p>
              </div>
            </div>
          )}

          {!loading && requiresReg && (
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
                <UserPlus size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black">You're Invited!</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  You have been invited to join <span className="font-bold text-gray-900 dark:text-white">{workspaceName}</span>.
                </p>
                <div className="mt-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Invitation Email</p>
                  <p className="text-sm font-bold text-blue-500 mt-1">{inviteEmail}</p>
                </div>
              </div>

              <Link
                to={`/signup?email=${encodeURIComponent(inviteEmail)}&token=${token}`}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>Setup Your Profile</span>
                <ArrowRight size={16} />
              </Link>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Already have an account? <Link to={`/login?email=${encodeURIComponent(inviteEmail)}`} className="text-blue-500 font-bold hover:underline">Log in</Link>
              </p>
            </div>
          )}

          {!loading && !requiresReg && !error && (
            <div className="space-y-6 py-6 animate-scale-in">
              <div className="w-16 h-16 rounded-3xl bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-green-500">Welcome Aboard!</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  You have successfully joined the workspace.
                </p>
                
                <div className="mt-6">
                  <button
                    onClick={() => {
                      navigate(`/signup?email=${encodeURIComponent(inviteEmail)}&token=${token}`);
                    }}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Setup Your Profile</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-red-500">Invitation Error</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {error}
                </p>
              </div>
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold rounded-2xl transition-all active:scale-95 text-xs uppercase flex items-center justify-center border border-gray-100 dark:border-white/5"
                >
                  Go to Login
                </Link>
                <Link
                  to="/"
                  className="text-xs text-blue-500 font-bold hover:underline"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AcceptInvite;
