import { DashboardHeader } from "@/components/dashboard-header";
import { StatsCards } from "@/components/stats-cards";
import { MembersTable } from "@/components/members-table";
import { CandidaturesTable } from "@/components/candidatures-table";
import { PolesOverview } from "@/components/poles-overview";
import { ActivityChart } from "@/components/activity-chart";
import { BirthdaySpotlight } from "@/components/birthday-spotlight";
import { Suspense } from "react";

const data = [
  { mois: "Jan", nouveauxMembres: 12, candidatures: 8 },
  { mois: "Fév", nouveauxMembres: 15, candidatures: 12 },
  { mois: "Mar", nouveauxMembres: 8, candidatures: 6 },
  { mois: "Avr", nouveauxMembres: 18, candidatures: 15 },
  { mois: "Mai", nouveauxMembres: 22, candidatures: 18 },
  { mois: "Jun", nouveauxMembres: 16, candidatures: 14 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        {/* Section anniversaire en vedette */}
        <Suspense fallback={<p>Loading ...</p>}>
          <BirthdaySpotlight />
        </Suspense>
        <StatsCards />
        <div className="grid gap-6 lg:grid-cols-2">
          <Suspense fallback={<p>Loading ...</p>}>
            <ActivityChart data={data} />
          </Suspense>
          <PolesOverview />
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <MembersTable />
          <CandidaturesTable />
        </div>
      </div>
    </div>
  );
}
