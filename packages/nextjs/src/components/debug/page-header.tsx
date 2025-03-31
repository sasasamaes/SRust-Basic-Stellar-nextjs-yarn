"use client"

import { ArrowLeft, Eye, EyeOff, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PageHeaderProps {
  navigateToHome: () => void
  toggleDarkMode: () => void
  isDarkMode: boolean
}

export function PageHeader({ navigateToHome, toggleDarkMode, isDarkMode }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700 py-4 px-4 -mx-4 mb-6 rounded-b-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300"
            onClick={navigateToHome}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to home</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Stellar Smart Contract Debugger
            </h1>
            <p className="text-sm text-muted-foreground">Analyze and debug Stellar smart contracts with ease</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure debugging options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  )
}

