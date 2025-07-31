import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const weeks = Array.from({ length: 12 }, (_, i) => i)

// Simulation de données d'activité (0-4 pour l'intensité)
const generateActivityData = () => {
  return weeks.map(() => days.map(() => Math.floor(Math.random() * 5)))
}

const activityData = generateActivityData()

const getIntensityColor = (intensity: number) => {
  const colors = [
    "bg-muted/30",
    "bg-green-200 dark:bg-green-900/30",
    "bg-green-300 dark:bg-green-800/50",
    "bg-green-400 dark:bg-green-700/70",
    "bg-green-500 dark:bg-green-600/90",
  ]
  return colors[intensity] || colors[0]
}

export function ActivityHeatmap() {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Activité des Membres (12 dernières semaines)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex gap-1 text-xs text-muted-foreground">
            <div className="w-8"></div>
            {days.map((day) => (
              <div key={day} className="w-3 text-center">
                {day[0]}
              </div>
            ))}
          </div>

          {activityData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-1 items-center">
              <div className="w-8 text-xs text-muted-foreground">S{weekIndex + 1}</div>
              {week.map((intensity, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
                  title={`Semaine ${weekIndex + 1}, ${days[dayIndex]}: ${intensity} activités`}
                />
              ))}
            </div>
          ))}

          <div className="flex items-center justify-between pt-4 text-xs text-muted-foreground">
            <span>Moins actif</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`} />
              ))}
            </div>
            <span>Plus actif</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
