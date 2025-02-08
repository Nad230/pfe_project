"use client"

import { LineChart, Wallet, Clock, ListTodo, Users, Trophy, Menu, X, Brain, Sparkles, User, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetClose
} from "./ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/", icon: LineChart },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Time Tracker", href: "/time-tracker", icon: Clock },
  { name: "Habits", href: "/habits", icon: ListTodo },
  { name: "Community", href: "/community", icon: Users },
  { name: "Challenges", href: "/community/challenges", icon: Trophy },
  { name: "Simulator", href: "/simulator", icon: Brain },
  { name: "Marketplace", href: "/marketplace", icon: Sparkles },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)  // Initialize with null for async fetching

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the user profile data from your backend (replace `userId` with actual data from session)
        const userId = 'yourUserId';  // Fetch this from session or context
        const response = await fetch(`/api/user/profile/${userId}`);
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [])

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-xl font-semibold ml-4">IndieTracker</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-6 w-6" />
              </Button>
            </Link>
            
            <ModeToggle />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {user ? (
                      <>
                        <AvatarImage src={user.profile_photo || '/default-avatar.png'} alt={user.fullname} />
                        <AvatarFallback>{user.fullname?.[0] ?? user.email?.[0]}</AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback>U</AvatarFallback> // Default fallback
                    )}
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40">
                <nav className="flex flex-col gap-2">
                  <Link href="/profile" className="px-3 py-2 hover:bg-accent rounded-md">Profile</Link>
                  <Link href="/logout" className="px-3 py-2 hover:bg-accent rounded-md">Logout</Link>
                </nav>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[250px]">
          <SheetHeader className="mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              <SheetClose asChild>
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
