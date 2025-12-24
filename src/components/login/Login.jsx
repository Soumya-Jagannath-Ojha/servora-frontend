import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='mx-auto  w-[30%] h-[80%] flex items-center justify-center'>
    
      <form action="" className='w-full h-[75%] flex flex-col p-12 items-center gap-4 bg-white text-black rounded-lg shadow-xl'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <label htmlFor="" className='text-left w-full'>Email address</label>
        <input type="text" name="" id="" placeholder='Enter your email address' className='w-full h-[14%] rounded-xl p-4 border border-gray-200'/>
        <label htmlFor="" className='text-left w-full'>Password</label>
        <input type="password" name="" id="" placeholder='Enter your password' className='w-full h-[14%] rounded-xl p-4 border border-gray-200' />
        <button className='bg-black text-white w-full h-[16%] rounded-xl'>Login</button>

        <p>Don't have an account? <Link to="/signup"  className='text-blue-700 font-bold underline'>Signup</Link></p>
      </form>
    </div>
  )
}

export default Login