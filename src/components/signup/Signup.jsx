import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: ""
  });

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
          username:formdata.username,
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
    <div className="container bg-blue-50 w-full h-screen">

      <div className='mx-auto  w-[30%] h-[90%] flex items-center justify-center'>

        <form action="" onSubmit={handleSubmit} className='w-full h-[85%] flex flex-col p-12 items-center gap-4 bg-white shadow-xl text-black rounded-lg'>
          <h1 className='text-2xl font-bold'>Signup</h1>
          <label htmlFor="" className='text-left w-full'>Username</label>
          <input type="text" name="username" id="username" placeholder='Enter your username' className='w-full h-[11%] rounded-xl p-4 border border-gray-200' value={formdata.username} onChange={handlchange} />
          <label htmlFor="" className='text-left w-full'>Email address</label>
          <input type="text" name="email" id="email" placeholder='Enter your email address' className='w-full h-[11%] rounded-xl p-4 border border-gray-200' value={formdata.email} onChange={handlchange} />
          <label htmlFor="" className='text-left w-full'>Password</label>
          <input type="password" name="password" id="password" placeholder='Enter your password' className='w-full h-[11%] rounded-xl p-4 border border-gray-200' value={formdata.password} onChange={handlchange} />
          <button className='bg-black text-white w-full h-[10%] rounded-xl'>Signup</button>
          <p>Already have an account? <Link to="/" className='text-blue-700 font-bold underline'>Login</Link> </p>

        </form>
      </div>
    </div>
  )
}

export default Signup