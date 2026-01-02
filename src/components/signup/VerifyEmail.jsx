import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdMarkEmailUnread } from "react-icons/md";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle"); 
  // idle | verifying | success | error
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    setStatus("verifying");
    setMessage("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/auth/verify-email/${verificationToken}`
      );

      // ✅ Properly read backend response
      if (res.data?.data?.isEmailVerified) {
        setStatus("success");
        setMessage(res.data.message || "Email verified successfully");

        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus("error");
        setMessage("Email verification failed");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error?.response?.data?.message ||
          "Verification link expired or invalid"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  relative px-4">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96  rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96  rounded-full blur-3xl opacity-30" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          {status === "success" && <span className="text-4xl">✅</span>}
          {status === "error" && <span className="text-4xl">❌</span>}
          {status === "idle" && (
            <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
              <MdMarkEmailUnread />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Account Confirmation
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          {status === "idle" &&
            "To confirm your account, please click the button below."}
          {status === "verifying" && "Confirming your account, please wait..."}
          {(status === "success" || status === "error") && message}
        </p>

        {/* Button / Loader */}
        {status === "verifying" ? (
          <div className="flex justify-center">
            <div className="h-10 w-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <button
            onClick={handleVerify}
            disabled={status === "success"}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition"
          >
            {status === "success" ? "Account Confirmed ✅" : "Confirm Account"}
          </button>
        )}

        {/* Footer */}
        <p className="text-gray-500 text-xs mt-6">
          If you have any issues confirming your account, please contact{" "}
          <span className="underline">support@example.com</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
