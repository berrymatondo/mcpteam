"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Cake, Gift } from "lucide-react"
import { useState, useEffect } from "react"

interface BirthdayMember {
  id: string
  nom: string
  prenom: string
  image?: string
  pole: string
  poste: string
  dateNaissance: string
  age: number
}

export function BirthdaySpotlight() {
  const [birthdayMembers, setBirthdayMembers] = useState<BirthdayMember[]>([])

  useEffect(() => {
    // Simuler la récupération des membres qui fêtent leur anniversaire aujourd'hui
    // Dans une vraie application, ceci serait un appel API
    const checkBirthdayMembers = () => {
      const today = new Date()
      const todayString = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}`

      // Données simulées - remplacer par un vrai appel API
      const membres = [
        {
          id: "1",
          nom: "Dubois",
          prenom: "Marie",
          image: "/placeholder.svg?height=80&width=80",
          pole: "Communication",
          poste: "Responsable Communication",
          dateNaissance: "15-01-1990",
          age: 34,
        },
        {
          id: "2",
          nom: "Martin",
          prenom: "Pierre",
          image: "/placeholder.svg?height=80&width=80",
          pole: "Production",
          poste: "Chef de Production",
          dateNaissance: todayString + "-1988", // Anniversaire aujourd'hui
          age: 36,
        },
        {
          id: "3",
          nom: "Durand",
          prenom: "Sophie",
          image: "/placeholder.svg?height=80&width=80",
          pole: "Communication",
          poste: "Chargée de Communication",
          dateNaissance: todayString + "-1992", // Anniversaire aujourd'hui
          age: 32,
        },
        {
          id: "4",
          nom: "Bernard",
          prenom: "Lucas",
          image: "/placeholder.svg?height=80&width=80",
          pole: "Production",
          poste: "Technicien",
          dateNaissance: todayString + "-1995", // Anniversaire aujourd'hui
          age: 29,
        },
      ]

      const membersWithBirthday = membres.filter((membre) => {
        const [day, month] = membre.dateNaissance.split("-")
        return `${day}-${month}` === todayString
      })

      setBirthdayMembers(membersWithBirthday)
    }

    checkBirthdayMembers()
  }, [])

  if (birthdayMembers.length === 0) {
    return null
  }

  const renderSingleMember = (member: BirthdayMember) => (
    <div key={member.id} className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="h-6 w-6">
            <AvatarImage src={member.image || "/placeholder.svg"} />
            <AvatarFallback className="text-xs bg-yellow-100">
              {member.prenom[0]}
              {member.nom[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-0.5 -right-0.5">
            <Gift className="h-3 w-3 text-red-500" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {member.prenom} {member.nom}
          </h3>
          <p className="text-xs text-gray-600">{member.poste}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
          🎂 Message
        </Button>
      </div>
    </div>
  )

  const renderMultipleMembers = () => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">{birthdayMembers.length} anniversaires</span>
        <Button size="sm" variant="outline" className="h-5 px-1 text-xs bg-transparent">
          🎂
        </Button>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto">
        {birthdayMembers.slice(0, 4).map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-md px-2 py-1 min-w-fit shadow-sm"
          >
            <div className="relative">
              <Avatar className="h-6 w-6 border-2 border-yellow-400">
                <AvatarImage src={member.image || "/placeholder.svg"} />
                <AvatarFallback className="text-xs bg-yellow-200 font-semibold">{member.prenom[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -top-1 -right-1">
                <Gift className="h-3 w-3 text-red-600 drop-shadow-sm" />
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-800">{member.prenom}</span>
            </div>
          </div>
        ))}
        {birthdayMembers.length > 4 && (
          <span className="text-xs text-gray-600 px-1">+{birthdayMembers.length - 4}</span>
        )}
      </div>
    </div>
  )

  return (
    <Card className="border border-gray-200 bg-gray-50 shadow-sm">
      <CardHeader className="py-1 px-3">
        <CardTitle className="flex items-center gap-1 text-xs">
          <Cake className="h-3 w-3 text-yellow-600" />
          <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            {birthdayMembers.length === 1 ? "Anniversaire" : "Anniversaires"}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="py-1 px-3">
        {birthdayMembers.length === 1 ? renderSingleMember(birthdayMembers[0]) : renderMultipleMembers()}
      </CardContent>
    </Card>
  )
}
