"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"
import { Key, Smartphone, Eye, EyeOff, AlertTriangle, CheckCircle, Clock, Monitor, MapPin } from "lucide-react"

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    // Logique de changement de mot de passe
    console.log("Changement de mot de passe")
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const activeSessions = [
    {
      id: 1,
      device: "Chrome sur Windows",
      location: "Paris, France",
      lastActive: "Maintenant",
      current: true,
    },
    {
      id: 2,
      device: "Safari sur iPhone",
      location: "Paris, France",
      lastActive: "Il y a 2 heures",
      current: false,
    },
    {
      id: 3,
      device: "Firefox sur Linux",
      location: "Lyon, France",
      lastActive: "Il y a 1 jour",
      current: false,
    },
  ]

  const loginHistory = [
    {
      id: 1,
      date: "2024-01-15 09:30",
      device: "Chrome sur Windows",
      location: "Paris, France",
      status: "success",
    },
    {
      id: 2,
      date: "2024-01-14 18:45",
      device: "Safari sur iPhone",
      location: "Paris, France",
      status: "success",
    },
    {
      id: 3,
      date: "2024-01-14 08:15",
      device: "Chrome sur Windows",
      location: "Paris, France",
      status: "success",
    },
    {
      id: 4,
      date: "2024-01-13 14:20",
      device: "Inconnu",
      location: "Marseille, France",
      status: "failed",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Sécurité</h1>
            <p className="text-muted-foreground">Gérez la sécurité de votre compte</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Changement de mot de passe */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Mot de passe
                </CardTitle>
                <CardDescription>Modifiez votre mot de passe pour sécuriser votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button onClick={handlePasswordChange} className="w-full">
                  Changer le mot de passe
                </Button>
              </CardContent>
            </Card>

            {/* Authentification à deux facteurs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Authentification à deux facteurs
                </CardTitle>
                <CardDescription>Renforcez la sécurité avec la 2FA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">2FA activée</p>
                    <p className="text-sm text-muted-foreground">Protection supplémentaire pour votre compte</p>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>

                {twoFactorEnabled && (
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">2FA configurée</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                      Votre compte est protégé par l'authentification à deux facteurs
                    </p>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-muted-foreground">Recevoir des alertes de sécurité</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertes de connexion</p>
                      <p className="text-sm text-muted-foreground">Notifications pour les nouvelles connexions</p>
                    </div>
                    <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions actives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Sessions actives
              </CardTitle>
              <CardDescription>Gérez vos connexions actives sur différents appareils</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{session.location}</span>
                          <span>•</span>
                          <span>{session.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.current ? (
                        <Badge variant="default">Session actuelle</Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          Déconnecter
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historique des connexions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Historique des connexions
              </CardTitle>
              <CardDescription>Consultez l'historique de vos dernières connexions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loginHistory.map((login) => (
                  <div key={login.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {login.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{login.device}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{login.location}</span>
                          <span>•</span>
                          <span>{login.date}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={login.status === "success" ? "default" : "destructive"}>
                      {login.status === "success" ? "Réussie" : "Échouée"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
