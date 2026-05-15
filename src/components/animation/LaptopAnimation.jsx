function LaptopAnimation() {
  return (
    <div className="relative flex justify-center mt-20 animate-scale-in">
      <div className="animate-laptop-float">
        {/* Laptop */}
        <div className="relative">
          {/* Screen */}
          <div className="relative w-[320px] sm:w-[400px] rounded-lg overflow-hidden border-4 border-gray-700 dark:border-gray-600 shadow-2xl bg-gray-100 dark:bg-gray-900">
            {/* Screen bezel */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 dark:bg-gray-700 rounded-t flex items-center justify-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            {/* Screen content - dashboard mock */}
            <div className="pt-8 pb-4 px-4 min-h-[200px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <div className="space-y-3">
                {/* Header bar */}
                <div className="flex gap-2">
                  <div className="h-2 w-16 rounded bg-brand-500/40 dark:bg-brand-400/30" />
                  <div className="h-2 w-24 rounded bg-gray-300 dark:bg-gray-600" />
                </div>
                {/* Chart bars */}
                <div className="flex items-end gap-1.5 h-12 mt-4">
                  {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-brand-600 to-cyan-500 dark:from-brand-500 dark:to-cyan-400 animate-float"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                {/* Typing line */}
                <div className="flex items-center gap-1 mt-4 font-mono text-xs text-gray-600 dark:text-gray-400">
                  <span className="tabular-nums">$ hrms status</span>
                  <span className="inline-block w-2 h-4 bg-brand-500 animate-blink" />
                </div>
                {/* Grid items */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-6 rounded bg-brand-500/20 dark:bg-brand-500/30 animate-float"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Base / keyboard */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] h-4 rounded-b-lg bg-gray-700 dark:bg-gray-600" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gray-800 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export default LaptopAnimation
