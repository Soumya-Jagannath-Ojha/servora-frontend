import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {
    const { isAuthenticated, authChecked } = useSelector((state) => state.auth);
 
    if (!authChecked) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]">
                <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-xs font-black text-gray-500 uppercase tracking-widest animate-pulse">Initializing Session...</p>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login"/>
}

export default ProtectedRoute