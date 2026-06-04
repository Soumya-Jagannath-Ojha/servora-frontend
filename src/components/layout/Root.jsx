import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useTheme } from '../../context/ThemeContext'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useDispatch } from 'react-redux'
import { setUser, clearAuth } from '../../store/slices/authSlice'
import axios from 'axios'
import { apiUrl } from '../../utils/config'

function Root() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserSetupStatus = async () => {
      try {
        const res = await axios.post(`${apiUrl}/api/v1/auth/current-user`, {}, { withCredentials: true });
        const user = res.data?.data?.user;
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(clearAuth());
        }
      } catch (err) {
        console.error(err);
        dispatch(clearAuth());
      }
    };
    checkUserSetupStatus();
  }, [dispatch]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  const isDashboard = location.pathname.startsWith('/dashboard')

  if (isDashboard) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f0d24]">
        <Toaster position="top-center" reverseOrder={false} />
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Main content container - soft-edged, centered like ChronoTask */}
      <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-white force-white border border-gray-200 dark:border-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Servora</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors ${location.pathname === path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}

              >
                {label}
              </Link>
            ))}
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
            >
              Login
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-300 font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            >
              Get demo
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-white/10 space-y-2 animate-slide-up">
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path} className={`block py-2 ${location.pathname === path ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>
                {label}
              </Link>
            ))}

            <Link to="/login" className="block py-3 text-center rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="block mt-2 py-3 text-center rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
              Get demo
            </Link>
          </div>
        )}

        <main className="relative">
          <Outlet />
        </main>

        <footer className="py-16 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white force-white border border-gray-200 dark:border-white/20" />
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Servora</span>
            </Link>
            <div className="flex gap-8 text-sm text-gray-600 dark:text-gray-500">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">About</Link>
              <Link to="/pricing" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Pricing</Link>
              <Link to="/contact" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 text-center text-gray-500 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} Servora. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Root
