"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* const data = [
  { mois: "Jan", nouveauxMembres: 12, candidatures: 8 },
  { mois: "Fév", nouveauxMembres: 15, candidatures: 12 },
  { mois: "Mar", nouveauxMembres: 8, candidatures: 6 },
  { mois: "Avr", nouveauxMembres: 18, candidatures: 15 },
  { mois: "Mai", nouveauxMembres: 22, candidatures: 18 },
  { mois: "Jun", nouveauxMembres: 16, candidatures: 14 },
];
 */
type ActivityChartProps = {
  data: any;
};

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Activité Mensuelle</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="mois"
              className="text-muted-foreground"
              fontSize={12}
            />
            <YAxis className="text-muted-foreground" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--card-foreground))",
              }}
            />
            <Bar
              dataKey="nouveauxMembres"
              fill="hsl(var(--primary))"
              name="Nouveaux membres"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="candidatures"
              fill="hsl(var(--muted-foreground))"
              name="Candidatures"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
