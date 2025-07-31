"use client"

import { Bell, Search, Settings, User, LogOut, Shield, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const handleProfile = () => {
    router.push("/profile")
  }

  const handleSecurity = () => {
    router.push("/security")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  const handleLogout = () => {
    // Ici vous pouvez ajouter la logique de déconnexion
    console.log("Déconnexion...")
    // Par exemple: signOut() ou clearSession()
    router.push("/login")
  }

  // Éviter l'hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <SidebarTrigger />

        <div className="flex flex-1 items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher des membres, candidatures..." className="pl-10 bg-muted/50" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative"
            title={`Basculer vers le mode ${theme === "dark" ? "clair" : "sombre"}`}
          >
            {mounted && (
              <>
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 transition-all" />
                ) : (
                  <Moon className="h-4 w-4 transition-all" />
                )}
              </>
            )}
            {!mounted && <div className="h-4 w-4" />}
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="ml-2">
                  3
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-64">
                <div className="space-y-1">
                  <DropdownMenuItem
                    className="flex flex-col items-start p-3 cursor-pointer"
                    onClick={() => router.push("/notifications/new-candidate")}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">Nouvelle candidature</span>
                      <span className="text-xs text-muted-foreground">Il y a 2h</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      Marie Dubois a postulé pour le pôle Développement
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex flex-col items-start p-3 cursor-pointer"
                    onClick={() => router.push("/notifications/upcoming-event")}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">Événement à venir</span>
                      <span className="text-xs text-muted-foreground">Il y a 4h</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Réunion mensuelle demain à 14h00</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex flex-col items-start p-3 cursor-pointer"
                    onClick={() => router.push("/notifications/new-member")}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">Nouveau membre</span>
                      <span className="text-xs text-muted-foreground">Il y a 1j</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      Thomas Martin a rejoint le pôle Communication
                    </span>
                  </DropdownMenuItem>
                </div>
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center" onClick={() => router.push("/notifications")}>
                Voir toutes les notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Paramètres rapides</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>Mon profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSecurity}>
                <Shield className="mr-2 h-4 w-4" />
                <span>Sécurité</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSettings}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres complets</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
