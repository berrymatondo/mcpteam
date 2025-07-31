import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Crown, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Pôles",
    value: "8",
    change: "Tous actifs",
    icon: Building2,
    color: "text-blue-500",
  },
  {
    title: "Membres Total",
    value: "247",
    change: "Répartis dans les pôles",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Responsables",
    value: "24",
    change: "3 par pôle en moyenne",
    icon: Crown,
    color: "text-yellow-500",
  },
  {
    title: "Taux d'Occupation",
    value: "78%",
    change: "+5% ce mois",
    icon: TrendingUp,
    color: "text-purple-500",
  },
]

export function PolesStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
