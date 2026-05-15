import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();

  const handlchange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URI;
      const res = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email: formdata.email,
        password: formdata.password,
      });

      if (res.data.success === true) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.data.accessToken)
        );
        navigate("/dashboard");
        setFormdata({ email: "", password: "" });
        alert(res.data.message);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Please enter your details to sign in</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
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

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">Remember me</label>
              </div>
              <Link to="/forgot-password" strokeLinecap="round" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Forgot password?
              </Link>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              Sign in
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Login;
