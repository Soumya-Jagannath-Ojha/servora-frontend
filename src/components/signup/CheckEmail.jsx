import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../../utils/config";

const CheckEmail = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/resend-email-verification`,
        { email }
      );
      toast.success(res.data?.message || "Verification email resent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Soft background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
            <svg
              className="h-7 w-7 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Check your email
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          We just sent a verification link to{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            {email || "your email address"}
          </span>
          . Please check your inbox and click the link to continue.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Go to login →
          </button>
          
          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-lg transition border border-gray-200 dark:border-white/10 disabled:opacity-50"
          >
            {resending ? "Resending..." : "Resend verification email"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-xs mt-6">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
