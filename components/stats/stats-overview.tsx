import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, UserPlus, Activity } from "lucide-react"

const stats = [
  {
    title: "Croissance Membres",
    value: "+12.5%",
    change: "+2.1% vs mois dernier",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Taux de Rétention",
    value: "94.2%",
    change: "+1.2% vs mois dernier",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Candidatures/Mois",
    value: "28",
    change: "-3.5% vs mois dernier",
    trend: "down",
    icon: UserPlus,
    color: "text-orange-500",
  },
  {
    title: "Engagement Moyen",
    value: "87.3%",
    change: "+5.7% vs mois dernier",
    trend: "up",
    icon: Activity,
    color: "text-purple-500",
  },
]

export function StatsOverview() {
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
            <div className="flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
