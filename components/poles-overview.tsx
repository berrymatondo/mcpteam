"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

const poles = [
  {
    id: 1,
    nom: "Design & UX/UI",
    membres: 32,
    maxMembres: 40,
    responsables: [
      { nom: "Marie Dubois", image: "/placeholder.svg?height=24&width=24" },
      { nom: "Paul Martin", image: "/placeholder.svg?height=24&width=24" },
    ],
    couleur: "bg-blue-500",
  },
  {
    id: 2,
    nom: "Développement",
    membres: 28,
    maxMembres: 35,
    responsables: [{ nom: "Pierre Bernard", image: "/placeholder.svg?height=24&width=24" }],
    couleur: "bg-green-500",
  },
  {
    id: 3,
    nom: "Communication",
    membres: 24,
    maxMembres: 30,
    responsables: [
      { nom: "Sophie Petit", image: "/placeholder.svg?height=24&width=24" },
      { nom: "Lucas Moreau", image: "/placeholder.svg?height=24&width=24" },
    ],
    couleur: "bg-purple-500",
  },
  {
    id: 4,
    nom: "Photo & Média",
    membres: 18,
    maxMembres: 25,
    responsables: [{ nom: "Emma Leroy", image: "/placeholder.svg?height=24&width=24" }],
    couleur: "bg-orange-500",
  },
]

export function PolesOverview() {
  const router = useRouter()

  const handlePoleClick = (poleId: number) => {
    router.push(`/poles?id=${poleId}`)
  }

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Aperçu des Pôles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {poles.map((pole) => {
          const pourcentage = (pole.membres / pole.maxMembres) * 100

          return (
            <div
              key={pole.id}
              className="space-y-2 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border hover:border-blue-200 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
              onClick={() => handlePoleClick(pole.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${pole.couleur}`} />
                  <span className="font-medium">{pole.nom}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {pole.membres}/{pole.maxMembres}
                </Badge>
              </div>

              <Progress value={pourcentage} className="h-2" />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Crown className="h-3 w-3 text-yellow-500" />
                  <span className="text-muted-foreground">Responsables:</span>
                </div>
                <div className="flex -space-x-1">
                  {pole.responsables.map((responsable, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={responsable.image || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {responsable.nom
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
