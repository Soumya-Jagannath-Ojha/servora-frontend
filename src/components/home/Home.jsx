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

      {/* Features section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need</h2>
            <p className="text-gray-500 dark:text-gray-300 max-w-xl mx-auto">Powerful features designed to simplify project monitoring</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📊', title: 'Project Monitoring', desc: 'Real-time tracking of project health, milestones, and KPIs.' },
              { icon: '✅', title: 'Task Management', desc: 'Assign tasks, set priorities, and track progress seamlessly.' },
              { icon: '📅', title: 'Timeline Planning', desc: 'Visual Gantt charts and deadline tracking for every phase.' },
              { icon: '📈', title: 'Advanced Analytics', desc: 'Actionable insights into project ROI and team performance.' },
              { icon: '🔗', title: 'Smart Integrations', desc: 'Connect with your existing project tools and workflows.' },
              { icon: '🔒', title: 'Secure Data', desc: 'Enterprise-grade security for your sensitive project data.' },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-white/10 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
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