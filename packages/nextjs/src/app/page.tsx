import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@/components/ui/navbar"
import { theme } from '@/theme'
import { homePageConfig } from '@/config'
import { Wallet } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24" style={{ backgroundColor: theme.colors.background }}>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm" style={{ color: theme.colors.text }}>
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: theme.colors.primary }}>Welcome to SRust-Basic-Stellar-yarn</h1>
        
        <Navbar className="w-full bg-white shadow-md mb-8" style={{ backgroundColor: theme.colors.secondary }}>
          <NavbarBrand href="#" style={{ color: theme.colors.accent }}>SRust-Basic-Stellar-yarn</NavbarBrand>
          <NavbarContent className="flex flex-col md:flex-row items-center justify-end">
            <NavbarItem>
              <Button variant="outline" style={{ borderColor: theme.colors.accent, color: theme.colors.accent }}>
              <Wallet className="h-4 w-4" />
                Connect Wallet</Button>
            </NavbarItem>
            <NavbarItem>
              <a href="#debugContractsSection" className="text-accent">
                <Button variant="ghost" style={{ color: theme.colors.accent }}>Debug Contracts</Button>
              </a>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 justify-items-center">
          {homePageConfig.sections.map((section, index) => (
            <Card key={section.id} className={`w-full ${index < 2 ? 'max-w-md' : 'max-w-2xl'} p-4 md:p-8`}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {section.id === 'welcome' && (
                  <>
                    <p className="mb-4">{section.description}</p>
                    <Input placeholder="Enter your name" className="mb-4" />
                    <Button>Learn More</Button>
                  </>
                )}
                {section.id === 'interactiveDemo' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Welcome!</DialogTitle>
                        <DialogDescription>
                          This is a sample dialog using shadcn/ui components.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Input id="name" placeholder="Enter your name" className="col-span-3" />
                        </div>
                        <Button>Submit</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {section.id === 'debugContracts' && (
                  <div id="debugContractsSection">
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

// This Navbar component is designed to be easily customizable. 
// You can change the theme and layout by modifying the theme variables or adding new sections as needed. 

// The Connect Wallet button is for visual purposes only and does not include functionality. 
// The Debug Contracts section is included for future development purposes. 

// Ensure to use theme variables for consistent styling and easy customization.
// Ensure to use the configuration for dynamic rendering of sections.
