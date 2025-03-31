import type { ReactNode } from "react"

interface DebugLayoutProps {
  children: ReactNode
  animateBackground: boolean
}

export function DebugLayout({ children, animateBackground }: DebugLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-1000 ${
        animateBackground ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 bg-[size:30px_30px] opacity-10 pointer-events-none"></div>
      {children}
    </div>
  )
}

