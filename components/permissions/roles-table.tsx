import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Crown, User, Settings, MoreHorizontal } from "lucide-react"

const roles = [
  {
    id: 1,
    nom: "Super Admin",
    description: "Accès complet à toutes les fonctionnalités",
    utilisateurs: 2,
    couleur: "bg-red-500",
    icon: Crown,
    permissions: ["all"],
  },
  {
    id: 2,
    nom: "Admin",
    description: "Gestion des membres et des pôles",
    utilisateurs: 5,
    couleur: "bg-orange-500",
    icon: Shield,
    permissions: ["manage_members", "manage_poles", "view_stats"],
  },
  {
    id: 3,
    nom: "Responsable Pôle",
    description: "Gestion d'un pôle spécifique",
    utilisateurs: 24,
    couleur: "bg-blue-500",
    icon: Settings,
    permissions: ["manage_pole_members", "view_pole_stats"],
  },
  {
    id: 4,
    nom: "Membre",
    description: "Accès de base aux fonctionnalités",
    utilisateurs: 216,
    couleur: "bg-green-500",
    icon: User,
    permissions: ["view_profile", "participate_events"],
  },
]

export function RolesTable() {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Rôles et Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rôle</TableHead>
              <TableHead>Utilisateurs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => {
              const Icon = role.icon

              return (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${role.couleur}/10`}>
                        <Icon
                          className={`h-4 w-4 text-white`}
                          style={{ color: role.couleur.replace("bg-", "").replace("-500", "") }}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{role.nom}</div>
                        <div className="text-sm text-muted-foreground">{role.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{role.utilisateurs}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
