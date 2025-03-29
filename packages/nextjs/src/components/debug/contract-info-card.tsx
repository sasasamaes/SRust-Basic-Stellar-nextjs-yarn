"use client"

import { FileCode, Copy, ChevronRight, RefreshCw, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ContractInfoCardProps {
  isLoading: boolean
  contractLoaded: boolean
  progress: number
  handleLoadContract: () => void
}

export function ContractInfoCard({ isLoading, contractLoaded, progress, handleLoadContract }: ContractInfoCardProps) {
  return (
    <Card className="col-span-full overflow-hidden border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-indigo-500" />
              Stellar Contract Information
            </CardTitle>
            <CardDescription>Enter your Stellar contract details to begin debugging</CardDescription>
          </div>
          <Badge
            variant={contractLoaded ? "default" : "outline"}
            className={
              contractLoaded
                ? "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white animate-pulse"
                : ""
            }
          >
            {contractLoaded ? "Contract Loaded" : "Not Loaded"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <NetworkSelector />
          <ContractAddressInput />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <OptionToggle id="auto-verify" label="Auto-verify source code" />
          <OptionToggle id="advanced-debug" label="Advanced debugging mode" defaultChecked={true} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 px-6 py-4">
        {isLoading && (
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Loading contract...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            onClick={handleLoadContract}
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <FileCode className="mr-2 h-4 w-4" />
                Load Contract
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function NetworkSelector() {
  return (
    <div className="space-y-2">
      <Label htmlFor="network" className="text-sm font-medium">
        Network
      </Label>
      <Select defaultValue="public">
        <SelectTrigger id="network" className="w-full border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500">
          <SelectValue placeholder="Select network" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Stellar Public Network</SelectItem>
          <SelectItem value="testnet">Stellar Testnet</SelectItem>
          <SelectItem value="futurenet">Stellar Futurenet</SelectItem>
          <SelectItem value="standalone">Standalone Network</SelectItem>
          <SelectItem value="custom">Custom Horizon Server</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function ContractAddressInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="contract-address" className="text-sm font-medium">
        Contract Address
      </Label>
      <div className="flex group">
        <Input
          id="contract-address"
          placeholder="G..."
          className="rounded-r-none focus-visible:ring-indigo-500 focus-visible:ring-offset-0 border-indigo-200 dark:border-indigo-800 group-hover:border-indigo-400 dark:group-hover:border-indigo-600 transition-colors duration-300"
        />
        <Button
          variant="secondary"
          className="rounded-l-none border border-l-0 border-indigo-200 dark:border-indigo-800 group-hover:border-indigo-400 dark:group-hover:border-indigo-600 transition-colors duration-300 bg-indigo-50 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800"
        >
          <Copy className="h-4 w-4 text-indigo-500" />
        </Button>
      </div>
    </div>
  )
}

interface OptionToggleProps {
  id: string
  label: string
  defaultChecked?: boolean
}

function OptionToggle({ id, label, defaultChecked = false }: OptionToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-indigo-200 dark:border-indigo-800 p-3 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-300 bg-white/50 dark:bg-slate-900/50">
      <div className="flex items-center space-x-2">
        <Switch
          id={id}
          defaultChecked={defaultChecked}
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:text-indigo-foreground"
        />
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
      </div>
      <ChevronRight className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300" />
    </div>
  )
}

