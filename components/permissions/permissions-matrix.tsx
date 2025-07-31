import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const permissions = [
  { id: "view_dashboard", nom: "Voir le dashboard", categorie: "Général" },
  { id: "manage_members", nom: "Gérer les membres", categorie: "Membres" },
  { id: "view_members", nom: "Voir les membres", categorie: "Membres" },
  { id: "manage_candidatures", nom: "Gérer les candidatures", categorie: "Candidatures" },
  { id: "view_candidatures", nom: "Voir les candidatures", categorie: "Candidatures" },
  { id: "manage_poles", nom: "Gérer les pôles", categorie: "Pôles" },
  { id: "view_poles", nom: "Voir les pôles", categorie: "Pôles" },
  { id: "manage_events", nom: "Gérer les événements", categorie: "Événements" },
  { id: "view_stats", nom: "Voir les statistiques", categorie: "Statistiques" },
  { id: "manage_settings", nom: "Gérer les paramètres", categorie: "Administration" },
]

const rolePermissions = {
  "Super Admin": permissions.map((p) => p.id),
  Admin: [
    "view_dashboard",
    "manage_members",
    "view_members",
    "manage_candidatures",
    "view_candidatures",
    "manage_poles",
    "view_poles",
    "manage_events",
    "view_stats",
  ],
  "Responsable Pôle": ["view_dashboard", "view_members", "view_candidatures", "view_poles", "view_stats"],
  Membre: ["view_dashboard", "view_members", "view_poles"],
}

export function PermissionsMatrix() {
  const roles = Object.keys(rolePermissions)

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Matrice des Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Permission</TableHead>
                {roles.map((role) => (
                  <TableHead key={role} className="text-center min-w-[120px]">
                    {role}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{permission.nom}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {permission.categorie}
                      </Badge>
                    </div>
                  </TableCell>
                  {roles.map((role) => (
                    <TableCell key={role} className="text-center">
                      <Checkbox
                        checked={rolePermissions[role as keyof typeof rolePermissions]?.includes(permission.id)}
                        readOnly
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
