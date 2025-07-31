"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Design", value: 32, color: "#3b82f6" },
  { name: "Développement", value: 28, color: "#10b981" },
  { name: "Communication", value: 24, color: "#8b5cf6" },
  { name: "Marketing", value: 22, color: "#ec4899" },
  { name: "Photo", value: 18, color: "#f97316" },
  { name: "Événementiel", value: 16, color: "#6366f1" },
]

export function PolesChart() {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Répartition par Pôles</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--card-foreground))",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
