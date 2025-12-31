import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { paths } from './routing/routing.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={paths} />
    </>
  )
}

export default App
