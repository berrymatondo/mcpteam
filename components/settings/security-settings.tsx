import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, AlertTriangle } from "lucide-react"

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Mot de passe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mot de passe actuel</Label>
            <Input id="current-password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nouveau mot de passe</Label>
            <Input id="new-password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input id="confirm-password" type="password" />
          </div>

          <Button>Changer le mot de passe</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Authentification à deux facteurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Activer 2FA</Label>
              <p className="text-sm text-muted-foreground">
                Sécurisez votre compte avec l'authentification à deux facteurs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600">
                Activé
              </Badge>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">
              L'authentification à deux facteurs est activée via l'application Google Authenticator.
            </p>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              Reconfigurer
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sessions actives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Session actuelle</p>
                <p className="text-sm text-muted-foreground">Chrome sur Windows • Paris, France</p>
                <p className="text-xs text-muted-foreground">Dernière activité: maintenant</p>
              </div>
              <Badge>Actuelle</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">iPhone Safari</p>
                <p className="text-sm text-muted-foreground">Safari sur iOS • Paris, France</p>
                <p className="text-xs text-muted-foreground">Dernière activité: il y a 2 heures</p>
              </div>
              <Button variant="outline" size="sm">
                Révoquer
              </Button>
            </div>
          </div>

          <Button variant="destructive" className="w-full">
            Déconnecter toutes les autres sessions
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Zone de danger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Supprimer le compte</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </p>
            <Button variant="destructive" size="sm">
              Supprimer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
