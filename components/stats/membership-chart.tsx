"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { mois: "Jan", membres: 180, nouveaux: 12, sortants: 3 },
  { mois: "Fév", membres: 195, nouveaux: 18, sortants: 3 },
  { mois: "Mar", membres: 205, nouveaux: 15, sortants: 5 },
  { mois: "Avr", membres: 220, nouveaux: 20, sortants: 5 },
  { mois: "Mai", membres: 235, nouveaux: 18, sortants: 3 },
  { mois: "Jun", membres: 247, nouveaux: 15, sortants: 3 },
]

export function MembershipChart() {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Évolution des Membres</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="mois" className="text-muted-foreground" fontSize={12} />
            <YAxis className="text-muted-foreground" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--card-foreground))",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="membres" stroke="hsl(var(--primary))" strokeWidth={2} name="Total membres" />
            <Line type="monotone" dataKey="nouveaux" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Nouveaux" />
            <Line type="monotone" dataKey="sortants" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Sortants" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
