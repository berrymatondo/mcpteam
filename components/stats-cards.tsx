import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Building2, TrendingUp } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Membres",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "Membres actifs",
  },
  {
    title: "Candidatures",
    value: "18",
    change: "+3",
    changeType: "positive" as const,
    icon: UserPlus,
    description: "En attente de traitement",
  },
  {
    title: "Pôles Actifs",
    value: "8",
    change: "Stable",
    changeType: "neutral" as const,
    icon: Building2,
    description: "Pôles opérationnels",
  },
  {
    title: "Taux d'Engagement",
    value: "87%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Participation aux activités",
  },
]

const getNavigationUrl = (title: string) => {
  switch (title) {
    case "Total Membres":
      return "/membres"
    case "Candidatures":
      return "/candidatures"
    case "Pôles Actifs":
      return "/poles"
    case "Taux d'Engagement":
      return "/stats"
    default:
      return "/"
  }
}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Link key={stat.title} href={getNavigationUrl(stat.title)}>
          <Card className="border-border/40 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : stat.changeType === "negative"
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">depuis le mois dernier</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
