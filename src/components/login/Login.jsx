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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[90%] md:w-[420px] bg-white text-black rounded-xl shadow-xl p-6 sm:p-8 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handlchange}
            required
          />
        </div>

        {/* <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handlchange}
            required
          />
        </div> */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-lg px-4 py-3 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handlchange}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition">
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-700 font-semibold underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
