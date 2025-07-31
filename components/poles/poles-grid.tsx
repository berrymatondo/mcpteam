"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, Crown, MoreHorizontal, Eye, Edit } from "lucide-react"
import { PoleViewModal } from "./pole-view-modal"
import { PoleFormModal } from "./pole-form-modal"

const poles = [
  {
    id: 1,
    nom: "Design & UX/UI",
    description:
      "Création graphique, interfaces utilisateur et expérience utilisateur. Ce pôle s'occupe de concevoir des expériences numériques intuitives et esthétiques.",
    membres: 32,
    maxMembres: 40,
    responsables: [
      { nom: "Marie Dubois", email: "marie.dubois@email.com", image: "/placeholder.svg?height=32&width=32" },
      { nom: "Emma Leroy", email: "emma.leroy@email.com", image: "/placeholder.svg?height=32&width=32" },
    ],
    couleur: "bg-blue-500",
    projetsActifs: 12,
    dateCreation: "2023-01-15",
    objectifs: [
      "Améliorer l'expérience utilisateur sur tous les produits",
      "Développer une identité visuelle cohérente",
      "Former l'équipe aux nouvelles tendances design",
    ],
    budget: 25000,
    localisation: "Bâtiment A, 2ème étage",
    horaires: "Lun-Ven 9h-18h",
    competencesRequises: ["Figma", "Adobe Creative Suite", "UX Research", "Prototyping"],
    membresListe: [
      {
        nom: "Dubois",
        prenom: "Marie",
        email: "marie.dubois@email.com",
        role: "Responsable Design",
        image: "/placeholder.svg?height=32&width=32",
      },
      {
        nom: "Leroy",
        prenom: "Emma",
        email: "emma.leroy@email.com",
        role: "UX Designer",
        image: "/placeholder.svg?height=32&width=32",
      },
      {
        nom: "Martin",
        prenom: "Julie",
        email: "julie.martin@email.com",
        role: "UI Designer",
        image: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 2,
    nom: "Développement",
    description:
      "Développement web, mobile et applications. Équipe technique responsable de la création et maintenance des solutions digitales.",
    membres: 28,
    maxMembres: 35,
    responsables: [
      { nom: "Pierre Bernard", email: "pierre.bernard@email.com", image: "/placeholder.svg?height=32&width=32" },
      { nom: "Thomas Moreau", email: "thomas.moreau@email.com", image: "/placeholder.svg?height=32&width=32" },
    ],
    couleur: "bg-green-500",
    projetsActifs: 8,
    dateCreation: "2023-01-20",
    objectifs: [
      "Moderniser l'architecture technique",
      "Améliorer les performances des applications",
      "Implémenter les meilleures pratiques DevOps",
    ],
    budget: 45000,
    localisation: "Bâtiment B, 1er étage",
    horaires: "Lun-Ven 9h-17h (flexible)",
    competencesRequises: ["JavaScript", "React", "Node.js", "Python", "Docker"],
    membresListe: [
      {
        nom: "Bernard",
        prenom: "Pierre",
        email: "pierre.bernard@email.com",
        role: "Lead Developer",
        image: "/placeholder.svg?height=32&width=32",
      },
      {
        nom: "Moreau",
        prenom: "Thomas",
        email: "thomas.moreau@email.com",
        role: "Backend Developer",
        image: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 3,
    nom: "Communication",
    description:
      "Communication interne, externe et réseaux sociaux. Gestion de l'image de marque et des relations publiques de l'organisation.",
    membres: 24,
    maxMembres: 30,
    responsables: [
      { nom: "Sophie Petit", email: "sophie.petit@email.com", image: "/placeholder.svg?height=32&width=32" },
      { nom: "Julie Simon", email: "julie.simon@email.com", image: "/placeholder.svg?height=32&width=32" },
    ],
    couleur: "bg-purple-500",
    projetsActifs: 15,
    dateCreation: "2023-02-01",
    objectifs: [
      "Augmenter la visibilité sur les réseaux sociaux",
      "Développer une stratégie de contenu cohérente",
      "Améliorer la communication interne",
    ],
    budget: 18000,
    localisation: "Bâtiment A, 1er étage",
    horaires: "Lun-Ven 8h30-17h30",
    competencesRequises: ["Rédaction", "Social Media", "Photoshop", "Communication"],
    membresListe: [
      {
        nom: "Petit",
        prenom: "Sophie",
        email: "sophie.petit@email.com",
        role: "Responsable Communication",
        image: "/placeholder.svg?height=32&width=32",
      },
      {
        nom: "Simon",
        prenom: "Julie",
        email: "julie.simon@email.com",
        role: "Community Manager",
        image: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 4,
    nom: "Photo & Média",
    description:
      "Photographie, vidéographie et production multimédia. Création de contenu visuel pour tous les supports de communication.",
    membres: 18,
    maxMembres: 25,
    responsables: [
      { nom: "Alex Laurent", email: "alex.laurent@email.com", image: "/placeholder.svg?height=32&width=32" },
    ],
    couleur: "bg-orange-500",
    projetsActifs: 6,
    dateCreation: "2023-02-15",
    objectifs: [
      "Créer une banque d'images professionnelles",
      "Développer les compétences vidéo de l'équipe",
      "Moderniser l'équipement photo/vidéo",
    ],
    budget: 35000,
    localisation: "Studio, Bâtiment C",
    horaires: "Lun-Ven 10h-19h (selon événements)",
    competencesRequises: ["Photographie", "Vidéographie", "Lightroom", "Premiere Pro"],
    membresListe: [
      {
        nom: "Laurent",
        prenom: "Alex",
        email: "alex.laurent@email.com",
        role: "Photographe Principal",
        image: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 5,
    nom: "Marketing",
    description:
      "Stratégie marketing, campagnes et analyse de données. Développement de la stratégie commerciale et analyse des performances.",
    membres: 22,
    maxMembres: 28,
    responsables: [
      { nom: "Camille Rousseau", email: "camille.rousseau@email.com", image: "/placeholder.svg?height=32&width=32" },
      { nom: "Lucas Petit", email: "lucas.petit@email.com", image: "/placeholder.svg?height=32&width=32" },
    ],
    couleur: "bg-pink-500",
    projetsActifs: 10,
    dateCreation: "2023-03-01",
    objectifs: [
      "Augmenter le taux de conversion de 25%",
      "Développer de nouveaux canaux d'acquisition",
      "Optimiser le parcours client",
    ],
    budget: 30000,
    localisation: "Bâtiment A, 3ème étage",
    horaires: "Lun-Ven 9h-18h",
    competencesRequises: ["Marketing Digital", "SEO", "Google Analytics", "Data Analysis"],
    membresListe: [
      {
        nom: "Rousseau",
        prenom: "Camille",
        email: "camille.rousseau@email.com",
        role: "Marketing Manager",
        image: "/placeholder.svg?height=32&width=32",
      },
      {
        nom: "Petit",
        prenom: "Lucas",
        email: "lucas.petit@email.com",
        role: "Data Analyst",
        image: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 6,
    nom: "Événementiel",
    description:
      "Organisation d'événements et gestion logistique. Planification et coordination de tous les événements internes et externes.",
    membres: 16,
    maxMembres: 20,
    responsables: [
      { nom: "Marine Durand", email: "marine.durand@email.com", image: "/placeholder.svg?height=32&width=32" },
    ],
    couleur: "bg-indigo-500",
    projetsActifs: 4,
    dateCreation: "2023-03-15",
    objectifs: [
      "Organiser 12 événements majeurs cette année",
      "Améliorer la satisfaction des participants",
      "Développer des partenariats avec des prestataires",
    ],
    budget: 50000,
    localisation: "Bâtiment A, RDC",
    horaires: "Lun-Ven 9h-18h (variable selon événements)",
    competencesRequises: ["Gestion de Projet", "Logistique", "Communication", "Négociation"],
    membresListe: [
      {
        nom: "Durand",
        prenom: "Marine",
        email: "marine.durand@email.com",
        role: "Event Manager",
        image: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
]

interface PolesGridProps {
  searchTerm: string
  membresFilter: string
  statutFilter: string
  sortBy: string
}

export function PolesGrid({ searchTerm, membresFilter, statutFilter, sortBy }: PolesGridProps) {
  const [selectedPole, setSelectedPole] = useState<(typeof poles)[0] | null>(null)
  const [editingPole, setEditingPole] = useState<(typeof poles)[0] | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Filtrage des pôles
  const filteredPoles = poles.filter((pole) => {
    // Filtre par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        pole.nom.toLowerCase().includes(searchLower) || pole.description.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Filtre par nombre de membres
    if (membresFilter && membresFilter !== "all") {
      const pourcentage = (pole.membres / pole.maxMembres) * 100
      switch (membresFilter) {
        case "low":
          if (pourcentage >= 50) return false
          break
        case "medium":
          if (pourcentage < 50 || pourcentage >= 80) return false
          break
        case "high":
          if (pourcentage < 80) return false
          break
      }
    }

    // Filtre par statut (basé sur l'activité)
    if (statutFilter && statutFilter !== "all") {
      switch (statutFilter) {
        case "active":
          if (pole.projetsActifs === 0) return false
          break
        case "inactive":
          if (pole.projetsActifs > 0) return false
          break
      }
    }

    return true
  })

  // Tri des pôles
  const sortedPoles = [...filteredPoles].sort((a, b) => {
    switch (sortBy) {
      case "nom":
        return a.nom.localeCompare(b.nom)
      case "membres":
        return b.membres - a.membres
      case "projets":
        return b.projetsActifs - a.projetsActifs
      case "date":
        return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
      default:
        return 0
    }
  })

  const handleViewPole = (pole: (typeof poles)[0]) => {
    setSelectedPole(pole)
    setShowViewModal(true)
  }

  const handleEditPole = (pole: (typeof poles)[0]) => {
    setEditingPole(pole)
    setShowEditModal(true)
    setShowViewModal(false)
  }

  const handleAddMember = (pole: (typeof poles)[0]) => {
    console.log("Ajouter membre au pôle:", pole)
  }

  const handleManageMembers = (pole: (typeof poles)[0]) => {
    console.log("Gérer les membres du pôle:", pole)
  }

  const handleSavePole = (pole: (typeof poles)[0]) => {
    console.log("Sauvegarder pôle:", pole)
    setShowEditModal(false)
  }

  if (sortedPoles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun pôle ne correspond aux filtres sélectionnés.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPoles.map((pole) => {
          const pourcentage = (pole.membres / pole.maxMembres) * 100

          return (
            <Card key={pole.id} className="border-border/40 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${pole.couleur}`} />
                    <div>
                      <CardTitle className="text-lg">{pole.nom}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{pole.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Membres
                    </span>
                    <Badge variant="secondary">
                      {pole.membres}/{pole.maxMembres}
                    </Badge>
                  </div>
                  <Progress value={pourcentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(pourcentage)}% de capacité</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-sm">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    <span>Responsables</span>
                  </div>
                  <div className="space-y-2">
                    {pole.responsables.map((responsable, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={responsable.image || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {responsable.nom
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{responsable.nom}</p>
                          <p className="text-xs text-muted-foreground">{responsable.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div className="text-sm">
                    <span className="font-medium">{pole.projetsActifs}</span>
                    <span className="text-muted-foreground"> projets actifs</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleViewPole(pole)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditPole(pole)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Créé le {new Date(pole.dateCreation).toLocaleDateString("fr-FR")}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
        <p>
          {sortedPoles.length} pôle{sortedPoles.length > 1 ? "s" : ""}
          {sortedPoles.length !== poles.length && ` sur ${poles.length}`}
        </p>
      </div>

      {/* Modals */}
      <PoleViewModal
        pole={selectedPole}
        open={showViewModal}
        onOpenChange={setShowViewModal}
        onEdit={handleEditPole}
        onAddMember={handleAddMember}
        onManageMembers={handleManageMembers}
      />

      <PoleFormModal
        key={editingPole?.id || "new"}
        pole={editingPole}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSave={handleSavePole}
        mode="edit"
      />
    </>
  )
}
