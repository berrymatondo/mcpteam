import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Clock, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Événements ce mois",
    value: "12",
    change: "+3 vs mois dernier",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Participants total",
    value: "1,247",
    change: "+18% de participation",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "À venir",
    value: "8",
    change: "Dans les 30 prochains jours",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    title: "Terminés",
    value: "4",
    change: "Ce mois-ci",
    icon: CheckCircle,
    color: "text-purple-500",
  },
]

export function EventsStats() {
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
