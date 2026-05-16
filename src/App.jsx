import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { paths } from './routing/routing.jsx'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <RouterProvider router={paths} />
    </ThemeProvider>
  )
}

export default App
