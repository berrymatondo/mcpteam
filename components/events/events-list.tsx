"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MoreHorizontal, MapPin, Calendar } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    titre: "Hackathon 2024",
    date: "2024-02-15",
    participants: 120,
    statut: "confirmed" as const,
    type: "hackathon" as const,
    lieu: "Campus Principal",
    description: "48h de développement intensif sur des projets innovants",
  },
  {
    id: 2,
    titre: "Conférence Tech",
    date: "2024-02-20",
    participants: 200,
    statut: "planning" as const,
    type: "conference" as const,
    lieu: "Amphithéâtre A",
    description: "Les dernières tendances en développement web",
  },
  {
    id: 3,
    titre: "Soirée Networking",
    date: "2024-02-25",
    participants: 60,
    statut: "confirmed" as const,
    type: "networking" as const,
    lieu: "Rooftop",
    description: "Rencontres professionnelles dans un cadre détendu",
  },
  {
    id: 4,
    titre: "Atelier Design Thinking",
    date: "2024-03-05",
    participants: 30,
    statut: "planning" as const,
    type: "workshop" as const,
    lieu: "Salle de créativité",
    description: "Méthodologie de conception centrée utilisateur",
  },
  {
    id: 5,
    titre: "Conférence IA",
    date: "2024-01-20",
    participants: 150,
    statut: "confirmed" as const,
    type: "conference" as const,
    lieu: "Grand Amphithéâtre",
    description: "L'intelligence artificielle dans le développement moderne",
  },
]

const getStatutConfig = (statut: string) => {
  switch (statut) {
    case "confirmed":
      return { label: "Confirmé", variant: "default" as const }
    case "planning":
      return { label: "Planification", variant: "secondary" as const }
    case "cancelled":
      return { label: "Annulé", variant: "destructive" as const }
    default:
      return { label: "Inconnu", variant: "outline" as const }
  }
}

const getTypeConfig = (type: string) => {
  switch (type) {
    case "conference":
      return { label: "Conférence", color: "bg-blue-100 text-blue-800" }
    case "workshop":
      return { label: "Atelier", color: "bg-green-100 text-green-800" }
    case "networking":
      return { label: "Networking", color: "bg-purple-100 text-purple-800" }
    case "hackathon":
      return { label: "Hackathon", color: "bg-orange-100 text-orange-800" }
    default:
      return { label: "Autre", color: "bg-gray-100 text-gray-800" }
  }
}

interface EventsListProps {
  searchTerm: string
  statutFilter: string
  typeFilter: string
  dateFilter: string
}

export function EventsList({ searchTerm, statutFilter, typeFilter, dateFilter }: EventsListProps) {
  const [selectedEvent, setSelectedEvent] = useState<(typeof upcomingEvents)[0] | null>(null)

  // Filtrage des événements
  const filteredEvents = upcomingEvents.filter((event) => {
    // Filtre par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        event.titre.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.lieu.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Filtre par statut
    if (statutFilter && statutFilter !== "all") {
      if (event.statut !== statutFilter) return false
    }

    // Filtre par type
    if (typeFilter && typeFilter !== "all") {
      if (event.type !== typeFilter) return false
    }

    // Filtre par date
    if (dateFilter && dateFilter !== "all") {
      const eventDate = new Date(event.date)
      const now = new Date()

      switch (dateFilter) {
        case "upcoming":
          if (eventDate <= now) return false
          break
        case "this_month":
          const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
          const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
          if (eventDate < thisMonth || eventDate >= nextMonth) return false
          break
        case "next_month":
          const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
          const monthAfter = new Date(now.getFullYear(), now.getMonth() + 2, 1)
          if (eventDate < nextMonthStart || eventDate >= monthAfter) return false
          break
        case "past":
          if (eventDate > now) return false
          break
      }
    }

    return true
  })

  if (filteredEvents.length === 0) {
    return (
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>Événements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun événement ne correspond aux filtres sélectionnés.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Événements ({filteredEvents.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredEvents.map((event) => {
          const statutConfig = getStatutConfig(event.statut)
          const typeConfig = getTypeConfig(event.type)

          return (
            <div
              key={event.id}
              className="flex items-start justify-between p-4 rounded-lg border border-border/40 hover:shadow-sm transition-shadow"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{event.titre}</h4>
                  <Badge variant={statutConfig.variant} className="text-xs">
                    {statutConfig.label}
                  </Badge>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                    {typeConfig.label}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(event.date).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.lieu}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {event.participants} participants
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
