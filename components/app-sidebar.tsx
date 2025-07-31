"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Users,
  UserPlus,
  BarChart3,
  Settings,
  Home,
  Calendar,
  Mail,
  Shield,
  LogOut,
  LogIn,
  User,
  Building2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"
import { FaSatelliteDish } from "react-icons/fa"

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { setOpenMobile } = useSidebar()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Simuler un utilisateur connecté
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@organization.com",
    avatar: "/placeholder.svg?height=32&width=32",
  })

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [profileForm, setProfileForm] = useState({
    nom: user.name,
    email: user.email,
    statut: "Actif",
    role: "Admin",
  })

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Membres",
      url: "/membres",
      icon: Users,
    },
    {
      title: "Candidatures",
      url: "/candidatures",
      icon: UserPlus,
    },
    {
      title: "Pôles",
      url: "/poles",
      icon: Building2,
    },
    {
      title: "Statistiques",
      url: "/stats",
      icon: BarChart3,
    },
    {
      title: "Événements",
      url: "/events",
      icon: Calendar,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: Mail,
    },
  ]

  const adminItems = [
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Permissions",
      url: "/permissions",
      icon: Shield,
    },
  ]

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser({ name: "", email: "", avatar: "" })
  }

  const handleRegister = () => {
    setShowRegisterModal(true)
  }

  const handleProfile = () => {
    setShowProfileModal(true)
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de connexion
    setIsLoggedIn(true)
    setUser({
      name: "Admin User",
      email: loginForm.email,
      avatar: "/placeholder.svg?height=32&width=32",
    })
    setShowLoginModal(false)
    setLoginForm({ email: "", password: "" })
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    // Logique d'inscription
    setIsLoggedIn(true)
    setUser({
      name: registerForm.nom,
      email: registerForm.email,
      avatar: "/placeholder.svg?height=32&width=32",
    })
    setShowRegisterModal(false)
    setRegisterForm({ nom: "", email: "", password: "", confirmPassword: "" })
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de mise à jour du profil
    setUser((prev) => ({
      ...prev,
      name: profileForm.nom,
      email: profileForm.email,
    }))
    setShowProfileModal(false)
  }

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <>
      <Sidebar variant={isMobile ? "sidebar" : "inset"} className="border-r border-border/40">
        <SidebarHeader className="border-b border-border/40 p-4">
          <Link href="/" onClick={handleNavClick}>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FaSatelliteDish className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">MCP</span>
                <span className="text-xs text-muted-foreground">Ministère de la production et de la communication</span>
              </div>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url} onClick={handleNavClick}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url} onClick={handleNavClick}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className={`border-t border-border/40 ${isMobile ? "p-2" : "p-4"}`}>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className={`flex items-center gap-3 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors ${isMobile ? "p-3" : "p-2"}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleProfile}>
                  <User className="h-4 w-4 mr-2" />
                  Mon profil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleLogin}
                className={`w-full flex items-center gap-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${isMobile ? "px-4 py-3" : "px-3 py-2"}`}
              >
                <LogIn className="h-4 w-4" />
                Se connecter
              </button>
              <button
                onClick={handleRegister}
                className={`w-full flex items-center gap-2 text-sm font-medium rounded-lg border border-border hover:bg-muted/50 transition-colors ${isMobile ? "px-4 py-3" : "px-3 py-2"}`}
              >
                <UserPlus className="h-4 w-4" />
                S'inscrire
              </button>
            </div>
          )}
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Modals */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Se connecter</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Mot de passe</Label>
              <Input
                id="login-password"
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowLoginModal(false)}>
                Annuler
              </Button>
              <Button type="submit">Se connecter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>S'inscrire</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-nom">Nom</Label>
              <Input
                id="register-nom"
                required
                value={registerForm.nom}
                onChange={(e) => setRegisterForm((prev) => ({ ...prev, nom: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                required
                value={registerForm.email}
                onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Mot de passe</Label>
              <Input
                id="register-password"
                type="password"
                required
                value={registerForm.password}
                onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm">Confirmation du mot de passe</Label>
              <Input
                id="register-confirm"
                type="password"
                required
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowRegisterModal(false)}>
                Annuler
              </Button>
              <Button type="submit">S'inscrire</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mon profil</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-nom">Nom</Label>
              <Input
                id="profile-nom"
                required
                value={profileForm.nom}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, nom: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                required
                value={profileForm.email}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-statut">Statut</Label>
              <Select
                value={profileForm.statut}
                onValueChange={(value) => setProfileForm((prev) => ({ ...prev, statut: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-role">Rôle</Label>
              <Select
                value={profileForm.role}
                onValueChange={(value) => setProfileForm((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Utilisateur">Utilisateur</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowProfileModal(false)}>
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
