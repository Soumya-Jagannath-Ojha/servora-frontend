import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="container bg-blue-200 w-full h-screen">

      <div className='mx-auto  w-[30%] h-[90%] flex items-center justify-center'>

        <form action="" className='w-full h-[85%] flex flex-col p-12 items-center gap-4 bg-white text-black rounded-lg'>
          <h1 className='text-2xl font-bold'>Signup</h1>
          <label htmlFor="" className='text-left w-full'>Username</label>
          <input type="text" name="" id="" placeholder='Enter your username' className='w-full h-[11%] rounded-xl p-4 border border-gray-200' />
          <label htmlFor="" className='text-left w-full'>Email address</label>
          <input type="text" name="" id="" placeholder='Enter your email address' className='w-full h-[11%] rounded-xl p-4 border border-gray-200' />
          <label htmlFor="" className='text-left w-full'>Password</label>
          <input type="password" name="" id="" placeholder='Enter your password' className='w-full h-[11%] rounded-xl p-4 border border-gray-200' />
          <button className='bg-black text-white w-full h-[10%] rounded-xl'>Signup</button>
          <p>Already have an account? <Link to="/" className='text-blue-700 font-bold underline'>Login</Link> </p>

        </form>
      </div>
    </div>
  )
}

export default Signup