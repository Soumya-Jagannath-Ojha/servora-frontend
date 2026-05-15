import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'


const Signup = () => {

  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlchange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URI;
      // Send login request to backend
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/register`, // your login endpoint
        {
          username: formdata.username,
          email: formdata.email,
          password: formdata.password
        },

      );
      console.log(res.data)

      if (res.data.success === true) {
        const emailVerificationToken = res.data.data.user.emailVerificationToken;
        const email = formdata.email;
        // localStorage.setItem("accessToken",JSON.stringify(accesstoken))
        toast.success(res.data.message || "Account created successfully!");
        navigate(`/check-email/${email}`)
        setFormdata({
          username: "",
          email: "",
          password: ""
        })

      } else {
        toast.error(res.data.message || "Invalid credentials");

      }


    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }

  }




  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Start your 14-day free trial today</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
              <input
                type="text"
                name="username"
                placeholder="John Doe"
                value={formdata.username}
                className="w-full rounded-xl px-4 py-3 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                onChange={handlchange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={formdata.email}
                className="w-full rounded-xl px-4 py-3 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                onChange={handlchange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formdata.password}
                  className="w-full rounded-xl px-4 py-3 pr-12 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
            </div>

            <div className="py-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              Create account
            </button>
          </form>

          <div className="mt-8 text-center">
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
        </div>
      </div>
    </div>
  );
}

export default Signup