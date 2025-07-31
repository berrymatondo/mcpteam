import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Crown } from "lucide-react"

const stats = [
  {
    title: "Total Membres",
    value: "247",
    change: "+12 ce mois",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Membres Actifs",
    value: "231",
    change: "93.5% du total",
    icon: UserCheck,
    color: "text-green-500",
  },
  {
    title: "Membres Inactifs",
    value: "16",
    change: "6.5% du total",
    icon: UserX,
    color: "text-red-500",
  },
  {
    title: "Responsables",
    value: "24",
    change: "9.7% du total",
    icon: Crown,
    color: "text-yellow-500",
  },
]

export function MembresStats() {
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
