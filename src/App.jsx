import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login/Login'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './components/home/Home'
import Signup from './components/signup/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
