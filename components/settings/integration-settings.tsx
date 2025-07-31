import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slack, Github, Mail, Calendar, Zap } from "lucide-react"

const integrations = [
  {
    name: "Slack",
    description: "Synchronisez les notifications avec votre workspace Slack",
    icon: Slack,
    connected: true,
    status: "Connecté",
  },
  {
    name: "GitHub",
    description: "Intégrez vos projets de développement",
    icon: Github,
    connected: false,
    status: "Non connecté",
  },
  {
    name: "Google Calendar",
    description: "Synchronisez les événements avec Google Calendar",
    icon: Calendar,
    connected: true,
    status: "Connecté",
  },
  {
    name: "Mailchimp",
    description: "Gérez vos campagnes email",
    icon: Mail,
    connected: false,
    status: "Non connecté",
  },
  {
    name: "Zapier",
    description: "Automatisez vos workflows",
    icon: Zap,
    connected: true,
    status: "Connecté",
  },
]

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Intégrations disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration) => {
            const Icon = integration.icon

            return (
              <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8" />
                  <div>
                    <h4 className="font-medium">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={integration.connected ? "default" : "secondary"}>{integration.status}</Badge>
                  <Button variant={integration.connected ? "outline" : "default"} size="sm">
                    {integration.connected ? "Configurer" : "Connecter"}
                  </Button>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API et Webhooks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Clé API</Label>
            <div className="flex gap-2">
              <Input id="api-key" value="sk-1234567890abcdef..." readOnly className="font-mono" />
              <Button variant="outline">Régénérer</Button>
            </div>
            <p className="text-sm text-muted-foreground">Utilisez cette clé pour accéder à l'API OrganizationHub</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL Webhook</Label>
            <Input id="webhook-url" placeholder="https://votre-site.com/webhook" />
            <p className="text-sm text-muted-foreground">Recevez des notifications en temps réel sur cette URL</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Webhooks activés</Label>
              <p className="text-sm text-muted-foreground">Activer l'envoi de notifications webhook</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Sauvegarder la configuration</Button>
      </div>
    </div>
  )
}
