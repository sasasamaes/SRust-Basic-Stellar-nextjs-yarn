"use client"

import type React from "react"

import { useState } from "react"
import { GitBranch, Zap, Shield, Database, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface DebugToolsProps {
  contractLoaded: boolean
}

export function DebugTools({ contractLoaded }: DebugToolsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <Card className="col-span-full lg:col-span-1 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-indigo-500" />
            Debug Tools
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? "Hide Advanced" : "Show Advanced"}
          </Button>
        </div>
        <CardDescription>Tools to help with debugging</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <FunctionSelector disabled={!contractLoaded} />
          <DebugModeSelector disabled={!contractLoaded} />
          <GasLimitInput disabled={!contractLoaded} />

          <Separator className="bg-indigo-200 dark:bg-indigo-800" />

          {showAdvanced && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Advanced Options
              </h3>

              <AdvancedOption
                icon={<Zap className="h-4 w-4 text-amber-500" />}
                label="Advanced Mode"
                id="advanced-mode"
                disabled={!contractLoaded}
              />

              <AdvancedOption
                icon={<Database className="h-4 w-4 text-blue-500" />}
                label="Trace Storage"
                id="trace-storage"
                disabled={!contractLoaded}
              />

              <AdvancedOption
                icon={<Shield className="h-4 w-4 text-red-500" />}
                label="Trace Memory"
                id="trace-memory"
                disabled={!contractLoaded}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 px-6 py-4">
        <Button
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group"
          disabled={!contractLoaded}
        >
          <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
          Start Debugging
        </Button>
      </CardFooter>
    </Card>
  )
}

interface SelectableInputProps {
  disabled: boolean
}

function FunctionSelector({ disabled }: SelectableInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="function-selector" className="text-sm font-medium">
        Function Selector
      </Label>
      <Select disabled={disabled}>
        <SelectTrigger
          id="function-selector"
          className="w-full border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
        >
          <SelectValue placeholder="Select function" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="transfer">transfer(address,uint256)</SelectItem>
          <SelectItem value="approve">approve(address,uint256)</SelectItem>
          <SelectItem value="transferFrom">transferFrom(address,address,uint256)</SelectItem>
          <SelectItem value="balanceOf">balanceOf(address)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function DebugModeSelector({ disabled }: SelectableInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="debug-mode" className="text-sm font-medium">
        Debug Mode
      </Label>
      <Select defaultValue="step" disabled={disabled}>
        <SelectTrigger
          id="debug-mode"
          className="w-full border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
        >
          <SelectValue placeholder="Select mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="step">Step-by-step</SelectItem>
          <SelectItem value="breakpoint">Breakpoints</SelectItem>
          <SelectItem value="trace">Full trace</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function GasLimitInput({ disabled }: SelectableInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="gas-limit" className="text-sm font-medium">
        Gas Limit (Optional)
      </Label>
      <Input
        id="gas-limit"
        placeholder="21000"
        disabled={disabled}
        className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
      />
    </div>
  )
}

interface AdvancedOptionProps {
  icon: React.ReactNode
  label: string
  id: string
  disabled: boolean
}

function AdvancedOption({ icon, label, id, disabled }: AdvancedOptionProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors duration-300">
      <div className="flex items-center gap-2">
        {icon}
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      </div>
      <Switch
        id={id}
        disabled={disabled}
        className="data-[state=checked]:bg-indigo-500 data-[state=checked]:text-indigo-foreground"
      />
    </div>
  )
}

