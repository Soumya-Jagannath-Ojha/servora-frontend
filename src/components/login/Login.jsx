import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {



  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()

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
        `${apiUrl}/api/v1/auth/login`, // your login endpoint
        {
          email: formdata.email,
          password: formdata.password
        },
       
      );
      console.log(res.data)

      if (res.data.success === true) {
        const accesstoken = res.data.data.accessToken;
        localStorage.setItem("accessToken",JSON.stringify(accesstoken))
        navigate("/dashboard")
        setFormdata({
          email: "",
          password: ""
        })

        alert(res.data.message)
      } else {
        alert("Invalid credential")
        
      }

      
    } catch (error) {
      console.error(error)
    }

  }


  return (
    <div className='mx-auto  w-[30%] h-[80%] flex items-center justify-center'>

      <form action="" onSubmit={handleSubmit} className='w-full h-[75%] flex flex-col p-12 items-center gap-4 bg-white text-black rounded-lg shadow-xl'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <label htmlFor="" className='text-left w-full'>Email address</label>
        <input type="text" name="email" id="" placeholder='Enter your email address' className='w-full h-[14%] rounded-xl p-4 border border-gray-200' onChange={handlchange} />
        <label htmlFor="" className='text-left w-full'>Password</label>
        <input type="password" name="password" id="" placeholder='Enter your password' className='w-full h-[14%] rounded-xl p-4 border border-gray-200' onChange={handlchange} />
        <button className='bg-black text-white w-full h-[16%] rounded-xl'>Login</button>

        <p>Don't have an account? <Link to="/signup" className='text-blue-700 font-bold underline'>Signup</Link></p>
      </form>
    </div>
  )
}

export default Login