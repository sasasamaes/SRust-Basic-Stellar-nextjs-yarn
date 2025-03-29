"use client"

import { useState } from "react"
import { Terminal, Code, Play, CheckCircle2, AlertCircle, Copy, MoreHorizontal, Lock, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DebugConsoleProps {
  contractLoaded: boolean
}

export function DebugConsole({ contractLoaded }: DebugConsoleProps) {
  const [activeTab, setActiveTab] = useState("code")

  return (
    <Card className="col-span-full lg:col-span-2 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-indigo-500" />
              Debug Console
            </CardTitle>
            <CardDescription>Analyze and debug your smart contract</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {contractLoaded && (
              <Badge
                variant="outline"
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700"
              >
                <Lock className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 rounded-full"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900">
                  <Copy className="mr-2 h-4 w-4 text-indigo-500" />
                  Copy all
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900">
                  <Download className="mr-2 h-4 w-4 text-indigo-500" />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="code" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-indigo-100 dark:bg-indigo-900/50 p-1 rounded-xl">
            <TabsTrigger
              value="code"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              onClick={() => setActiveTab("code")}
            >
              <Code className="mr-2 h-4 w-4" />
              Source Code
            </TabsTrigger>
            <TabsTrigger
              value="execution"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              onClick={() => setActiveTab("execution")}
            >
              <Play className="mr-2 h-4 w-4" />
              Execution
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              onClick={() => setActiveTab("logs")}
            >
              <Terminal className="mr-2 h-4 w-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          <SourceCodeTab contractLoaded={contractLoaded} />
          <ExecutionTab contractLoaded={contractLoaded} />
          <LogsTab contractLoaded={contractLoaded} />
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface TabProps {
  contractLoaded: boolean
}

function SourceCodeTab({ contractLoaded }: TabProps) {
  return (
    <TabsContent value="code" className="mt-0 border-none p-0 transition-all duration-500 ease-in-out">
      <div className="relative">
        <Textarea
          className="font-mono h-[400px] resize-none bg-slate-950 text-slate-50 p-4 border-indigo-300 dark:border-indigo-700 rounded-lg shadow-inner"
          placeholder={contractLoaded ? "" : "// Contract source code will appear here"}
          readOnly
          value={
            contractLoaded
              ? `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenContract {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _initialSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(allowance[_from][msg.sender] >= _value, "Insufficient allowance");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}`
              : ""
          }
        />
        {contractLoaded && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-slate-800 text-slate-200 hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </TabsContent>
  )
}

function ExecutionTab({ contractLoaded }: TabProps) {
  return (
    <TabsContent value="execution" className="mt-0 border-none p-0 transition-all duration-500 ease-in-out">
      <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 h-[400px] overflow-auto bg-white dark:bg-slate-900 shadow-inner">
        <div className="space-y-4">
          {contractLoaded ? (
            <>
              <ExecutionItem
                message="Initializing Stellar contract at address: GDNF5S4REOTJN6K7UI2ZCROGFT2AVH3GQNXBIFPKQH6KPDOPOCN36ICY"
                timestamp={new Date().toISOString()}
              />
              <ExecutionItem message="Contract ABI loaded successfully" details="8 public functions identified" />
              <ExecutionItem message="Ready for function execution" details="Select a function to begin" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 mb-4 animate-pulse">
                <AlertCircle className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                No Execution Data
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Load a contract to view execution data and start debugging
              </p>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  )
}

interface ExecutionItemProps {
  message: string
  details?: string
  timestamp?: string
}

function ExecutionItem({ message, details, timestamp }: ExecutionItemProps) {
  return (
    <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-md border border-indigo-200 dark:border-indigo-800 flex items-start hover:shadow-md transition-all duration-300">
      <div className="mr-3 mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
        <CheckCircle2 className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-mono">{message}</p>
        {details && <p className="text-xs text-muted-foreground mt-1">{details}</p>}
        {timestamp && <p className="text-xs text-muted-foreground mt-1">Timestamp: {timestamp}</p>}
      </div>
    </div>
  )
}

function LogsTab({ contractLoaded }: TabProps) {
  return (
    <TabsContent value="logs" className="mt-0 border-none p-0 transition-all duration-500 ease-in-out">
      <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg h-[400px] overflow-auto bg-slate-950 text-green-400 font-mono text-sm shadow-inner">
        <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 px-4 py-2 border-b border-indigo-800">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
          </div>
          <p className="text-xs text-indigo-400">Terminal</p>
          <div></div>
        </div>
        <div className="p-4">
          {contractLoaded ? (
            <>
              <p className="animate-fade-in-1">$ Loading contract from blockchain...</p>
              <p className="animate-fade-in-2">$ Verifying bytecode...</p>
              <p className="animate-fade-in-3">
                $ Bytecode verified <span className="text-emerald-400">✓</span>
              </p>
              <p className="animate-fade-in-4">$ Analyzing contract functions...</p>
              <p className="animate-fade-in-5">$ Found 8 public functions, 3 external functions</p>
              <p className="animate-fade-in-6">$ Ready for debugging session</p>
              <p className="animate-pulse">$ _</p>
            </>
          ) : (
            <>
              <p>$ Waiting for contract...</p>
              <p className="animate-pulse">$ _</p>
            </>
          )}
        </div>
      </div>
    </TabsContent>
  )
}

