"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DebugLayout } from "@/components/debug/layout-debug"
import { ContractInfoCard } from "@/components/debug/contract-info-card"
import { DebugConsole } from "@/components/debug/debug-console"
import { DebugTools } from "@/components/debug/debug-tools"
import { PageHeader } from "@/components/debug/page-header"
import { AnimatedBackground } from "@/components/debug/animated-background"

export default function DebugPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [contractLoaded, setContractLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [animateBackground, setAnimateBackground] = useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {
      setAnimateBackground(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleLoadContract = () => {
    setIsLoading(true)
    setProgress(0)


    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          setContractLoaded(true)
          return 100
        }
        return prev + 10
      })
    }, 150)
  }

  const navigateToHome = () => {
    router.push("/")
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <DebugLayout animateBackground={animateBackground}>
      <AnimatedBackground />

      <div className="container mx-auto p-4 relative">
        <PageHeader navigateToHome={navigateToHome} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-8">
          <ContractInfoCard
            isLoading={isLoading}
            contractLoaded={contractLoaded}
            progress={progress}
            handleLoadContract={handleLoadContract}
          />

          <DebugConsole contractLoaded={contractLoaded} />

          <DebugTools contractLoaded={contractLoaded} />
        </div>
      </div>
    </DebugLayout>
  )
}

