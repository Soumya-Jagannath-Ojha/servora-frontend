import { useNavigate, useParams } from "react-router-dom";

const CheckEmail = () => {
  const navigate = useNavigate();
  const {email} = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden px-4">
      {/* Soft background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="h-7 w-7 text-blue-600"
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Check your email
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          We just sent a verification link to{" "}
          <span className="font-medium text-gray-800">
            {email || "your email address"}
          </span>
          . Please check your inbox and click the link to continue.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition"
        >
          Go to login →
        </button>

        {/* Footer */}
        <p className="text-gray-500 text-xs mt-6">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
