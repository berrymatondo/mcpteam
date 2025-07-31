import { StatsHeader } from "@/components/stats/stats-header"
import { StatsOverview } from "@/components/stats/stats-overview"
import { MembershipChart } from "@/components/stats/membership-chart"
import { PolesChart } from "@/components/stats/poles-chart"
import { ActivityHeatmap } from "@/components/stats/activity-heatmap"

export default function StatsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <StatsHeader />
      <div className="flex-1 space-y-6 p-6">
        <StatsOverview />

        <div className="grid gap-6 lg:grid-cols-2">
          <MembershipChart />
          <PolesChart />
        </div>

        <ActivityHeatmap />
      </div>
    </div>
  )
}
