import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to SRust-Basic-Stellar-yarn</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Component Example */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Learn how to use this project</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This project uses Next.js with TypeScript and shadcn/ui components.</p>
              <Input placeholder="Enter your name" className="mb-4" />
              <Button>Learn More</Button>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Built with modern web technologies</p>
            </CardFooter>
          </Card>

          {/* Dialog Component Example */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>Try our interactive components</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
