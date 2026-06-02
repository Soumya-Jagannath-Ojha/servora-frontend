import React from 'react'
import Login from '../login/Login'
import { Link } from 'react-router-dom'
import PageTransition from "../animation/PageTransition";

const Home = () => {
  return (
    // <div className="container bg-blue-50 w-full h-screen">
    //     {/* <Login /> */}
    // </div>

    <PageTransition>
      {/* Hero section - ChronoTask style */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
          
          <div className="max-w-4xl mx-auto text-center">
            {/* Central 3D icon */}
            {/* Central 3D icon */}
            <div className="inline-flex items-center justify-center mb-8 animate-scale-in">
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center gap-1 p-2 rotate-[-2deg] hover:rotate-0 transition-all duration-300 group backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-6 h-6 rounded-md bg-gray-900 dark:bg-white force-white group-hover:scale-110 transition-transform" />
                  <div className="w-6 h-6 rounded-md bg-gray-900 dark:bg-white force-white group-hover:scale-110 transition-transform" style={{ transitionDelay: '50ms' }} />
                  <div className="w-6 h-6 rounded-md bg-blue-400 group-hover:scale-110 transition-transform" style={{ transitionDelay: '100ms' }} />
                  <div className="w-6 h-6 rounded-md bg-blue-500 group-hover:scale-110 transition-transform" style={{ transitionDelay: '150ms' }} />
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Think, plan, and track
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 font-medium mb-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              all in one place
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500 max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Efficiently manage your projects, track milestones, and boost team productivity.
            </p>

            <Link
              to="/signup"
              className="inline-block px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(37,99,235,0.6)] transition-all animate-fade-in-up transform hover:-translate-y-0.5"
              style={{ animationDelay: '0.4s' }}
            >
              Get free demo
            </Link>
          </div>

          {/* Floating left - Notes card */}
          <div className="hidden xl:block absolute left-4 xl:left-0 top-40 w-64 xl:w-72 animate-float" style={{ animationDelay: '-1s' }}>
            <div className="relative bg-amber-50 dark:bg-amber-900/20 rounded-lg shadow-lg border border-amber-200/50 dark:border-amber-700/30 p-4 rotate-[-3deg]">
              <div className="absolute -top-2 left-4 w-3 h-3 rounded-full bg-red-500" />
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Take notes to keep track of crucial details, and accomplish more tasks with ease.
              </p>
              <div className="mt-3 flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Floating right - Reminders card */}
          <div className="hidden xl:block absolute right-4 xl:right-0 top-32 w-56 xl:w-64 animate-float" style={{ animationDelay: '-2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-4 rotate-[3deg]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">Reminders</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Today&apos;s Meeting</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Call with marketing team</p>
                  <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">13:00 - 13:45</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom feature cards - Today's tasks + Integrations */}
        <div className="max-w-6xl mx-auto px-4 mt-20 grid md:grid-cols-2 gap-6">
          {/* Today's tasks card */}
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/80 dark:border-white/10 p-6 hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today&apos;s tasks</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center text-xs font-medium text-amber-700 dark:text-amber-400">8</span>
                  <span className="font-medium text-gray-900 dark:text-white">New Ideas for campaign</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Sep 10</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-blue-600 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">60%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-xs font-medium text-emerald-700 dark:text-emerald-400">3</span>
                  <span className="font-medium text-gray-900 dark:text-white">Design PPT #4</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Sep 18</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-blue-600 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Health card */}
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/80 dark:border-white/10 p-6 hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Project Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Design Phase</span>
                <span className="px-2 py-1 rounded-md bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">On Track</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Development</span>
                <span className="px-2 py-1 rounded-md bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">At Risk</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">QA Testing</span>
                <span className="px-2 py-1 rounded-md bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider">Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section – Bento Grid */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Everything you need</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">Powerful features designed to simplify project management operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

            {/* Card 1: Real-time tracking (3 cols) */}
            <div className="md:col-span-3 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative min-h-[380px]">
              <div className="relative flex justify-between items-center gap-4 py-8 px-2 w-full">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  <path d="M 80,80 C 140,30 190,130 250,80" stroke="url(#conn-grad)" strokeWidth="1.5" strokeDasharray="5 4" fill="none"/>
                </svg>
                {/* Terminal card */}
                <div className="w-[38%] bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-md text-[9px] font-mono space-y-1.5 z-10 shrink-0">
                  <div className="text-blue-600">$ pmms track --live</div>
                  <div className="text-gray-400">● Fetching updates...</div>
                  <div className="text-emerald-600">✓ 12 tasks synced</div>
                </div>
                {/* Center icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 z-10 shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                {/* Status card */}
                <div className="w-[38%] bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-md text-[9px] font-bold text-gray-700 flex flex-col items-center justify-center gap-1.5 z-10 text-center shrink-0">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span className="text-[8px] text-gray-500 font-semibold mt-0.5">All systems live ✨</span>
                </div>
              </div>
              <div className="space-y-2 mt-auto">
                <h3 className="text-lg font-bold text-gray-900">Real-time tracking</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm">
                  Monitor project progress and team activity live — no refresh needed.
                </p>
              </div>
            </div>

            {/* Card 2: Smart workflow (2 cols) */}
            <div className="md:col-span-2 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden min-h-[380px]">
              <div className="space-y-2 shrink-0">
                <h3 className="text-lg font-bold text-gray-900">Smart workflow</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Automate repetitive steps and keep your team focused on what matters.
                </p>
              </div>
              {/* Mock Dashboard preview */}
              <div className="mt-6 -mb-12 overflow-hidden rounded-t-2xl border border-gray-200 shadow-xl bg-gray-50 p-4 space-y-3 w-[112%] -mr-4 flex-1">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-2/5 bg-blue-100 rounded" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-10 bg-white rounded-lg border border-gray-200 shadow-sm" />
                    <div className="h-10 bg-white rounded-lg border border-gray-200 shadow-sm" />
                  </div>
                  <div className="h-12 bg-white rounded-lg border border-gray-200 shadow-sm" />
                  <div className="h-8 bg-blue-500/10 rounded-lg border border-blue-100" />
                </div>
              </div>
            </div>

            {/* Card 3: Global edge hosting (2 cols) */}
            <div className="md:col-span-2 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative min-h-[380px]">
              <div className="space-y-2 z-10 shrink-0">
                <h3 className="text-lg font-bold text-gray-900">Global edge hosting</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Your PMMS data stays fast and available — hosted across the globe.
                </p>
              </div>
              {/* Dark Globe */}
              <div className="relative flex-1 flex items-end justify-center overflow-hidden -mb-8 mt-4">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
                <svg viewBox="0 0 200 200" className="w-52 h-52 relative z-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="globe-grad" cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>
                    <radialGradient id="globe-shine" cx="35%" cy="30%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                    <clipPath id="globe-clip">
                      <circle cx="100" cy="100" r="80" />
                    </clipPath>
                  </defs>
                  <circle cx="100" cy="100" r="80" fill="url(#globe-grad)" />
                  <g clipPath="url(#globe-clip)" stroke="#3b82f6" strokeWidth="0.6" fill="none" opacity="0.35">
                    <ellipse cx="100" cy="100" rx="80" ry="20" />
                    <ellipse cx="100" cy="100" rx="80" ry="42" />
                    <ellipse cx="100" cy="100" rx="80" ry="62" />
                    <ellipse cx="100" cy="100" rx="80" ry="75" />
                  </g>
                  <g clipPath="url(#globe-clip)" stroke="#3b82f6" strokeWidth="0.6" fill="none" opacity="0.35">
                    <line x1="100" y1="20" x2="100" y2="180" />
                    <path d="M100,20 Q140,100 100,180" />
                    <path d="M100,20 Q60,100 100,180" />
                    <path d="M100,20 Q155,100 100,180" />
                    <path d="M100,20 Q45,100 100,180" />
                  </g>
                  <circle cx="100" cy="100" r="80" fill="url(#globe-shine)" />
                  {[
                    [72, 68], [115, 72], [88, 95], [130, 88],
                    [60, 110], [148, 105], [100, 120], [78, 130],
                    [122, 52], [55, 85]
                  ].map(([cx, cy], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="3" fill="#3b82f6" opacity="0.9" />
                      <circle cx={cx} cy={cy} r="6" fill="#3b82f6" opacity="0.15" />
                    </g>
                  ))}
                  <g stroke="#60a5fa" strokeWidth="0.5" opacity="0.3" clipPath="url(#globe-clip)">
                    <line x1="72" y1="68" x2="115" y2="72" />
                    <line x1="115" y1="72" x2="130" y2="88" />
                    <line x1="88" y1="95" x2="60" y2="110" />
                    <line x1="130" y1="88" x2="148" y2="105" />
                    <line x1="100" y1="120" x2="78" y2="130" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Card 4: Insightful reports (3 cols) */}
            <div className="md:col-span-3 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative min-h-[380px]">
              <div className="space-y-2 shrink-0">
                <h3 className="text-lg font-bold text-gray-900">Insightful reports</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm">
                  Generate detailed reports on project performance, team productivity, and budget usage.
                </p>
              </div>
              <div className="mt-6 -mb-12 overflow-hidden rounded-t-2xl border border-gray-200 shadow-xl bg-gray-50 p-5 space-y-3 w-[110%] -mr-4 flex-1">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="h-1.5 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Active Projects', val: '24', color: 'bg-blue-500/10', bar: 'bg-blue-500' },
                    { label: 'Team Members', val: '87', color: 'bg-indigo-500/10', bar: 'bg-indigo-500' },
                    { label: 'Tasks Done', val: '312', color: 'bg-emerald-500/10', bar: 'bg-emerald-500' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-3 flex flex-col justify-between h-24 shadow-sm">
                      <div className="h-2 w-3/4 bg-gray-100 rounded" />
                      <div>
                        <div className={`h-1.5 w-full rounded-full ${s.color} overflow-hidden`}>
                          <div className={`h-full rounded-full ${s.bar}`} style={{ width: '65%' }} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-700 mt-1">{s.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-white/10 p-12 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to transform your projects?</h2>
            <p className="text-gray-500 dark:text-gray-300 mb-8">
              Join thousands of teams already using Servora. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all">
                Get started free
              </Link>
              <Link to="/pricing" className="px-8 py-4 rounded-xl border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Home