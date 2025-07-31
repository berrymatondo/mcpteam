"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MoreHorizontal, Crown } from "lucide-react"
import { MembreViewModal } from "./membre-view-modal"
import { MembreFormModal } from "./membre-form-modal"

const membres = [
  {
    id: 1,
    nom: "Dubois",
    prenom: "Marie",
    email: "marie.dubois@email.com",
    telephone: "06 12 34 56 78",
    image: "/placeholder.svg?height=80&width=80",
    poles: ["Design", "Communication"],
    statut: "active" as const,
    isResponsable: true,
    dateAdhesion: "2023-01-15",
    adresse: "123 Rue de la Paix, 75001 Paris",
    dateNaissance: "1990-05-15",
    competences: ["Design Graphique", "UX/UI Design", "Figma", "Adobe Creative Suite"],
    bio: "Designer passionnée avec 5 ans d'expérience dans la création d'interfaces utilisateur modernes et intuitives.",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Pierre",
    email: "pierre.martin@email.com",
    telephone: "06 98 76 54 32",
    image: "/placeholder.svg?height=80&width=80",
    poles: ["Développement", "Tech"],
    statut: "active" as const,
    isResponsable: false,
    dateAdhesion: "2023-02-20",
    adresse: "456 Avenue des Champs, 75008 Paris",
    dateNaissance: "1988-03-22",
    competences: ["JavaScript", "React", "Node.js", "Python"],
    bio: "Développeur full-stack spécialisé dans les technologies web modernes.",
  },
  {
    id: 3,
    nom: "Bernard",
    prenom: "Sophie",
    email: "sophie.bernard@email.com",
    telephone: "06 11 22 33 44",
    image: "/placeholder.svg?height=80&width=80",
    poles: ["Photo", "Media"],
    statut: "active" as const,
    isResponsable: true,
    dateAdhesion: "2023-03-10",
    adresse: "789 Boulevard Saint-Germain, 75006 Paris",
    dateNaissance: "1992-07-08",
    competences: ["Photographie", "Vidéographie", "Adobe Premiere", "Lightroom"],
    bio: "Photographe professionnelle avec une expertise en événementiel et portrait.",
  },
  {
    id: 4,
    nom: "Petit",
    prenom: "Lucas",
    email: "lucas.petit@email.com",
    telephone: "06 55 66 77 88",
    image: "/placeholder.svg?height=80&width=80",
    poles: ["Marketing", "Communication"],
    statut: "inactive" as const,
    isResponsable: false,
    dateAdhesion: "2023-04-05",
    adresse: "321 Rue de Rivoli, 75004 Paris",
    dateNaissance: "1991-11-12",
    competences: ["Marketing Digital", "SEO", "Google Analytics", "Social Media"],
    bio: "Spécialiste en marketing digital avec une forte expérience en growth hacking.",
  },
  {
    id: 5,
    nom: "Leroy",
    prenom: "Emma",
    email: "emma.leroy@email.com",
    telephone: "06 77 88 99 00",
    image: "/placeholder.svg?height=80&width=80",
    poles: ["Design", "UX/UI"],
    statut: "active" as const,
    isResponsable: true,
    dateAdhesion: "2023-05-12",
    adresse: "654 Rue du Faubourg, 75011 Paris",
    dateNaissance: "1993-01-25",
    competences: ["UX Research", "Prototyping", "User Testing", "Design Systems"],
    bio: "UX Designer focalisée sur la recherche utilisateur et l'amélioration de l'expérience.",
  },
  {
    id: 6,
    nom: "Moreau",
    prenom: "Thomas",
    email: "thomas.moreau@email.com",
    telephone: "06 33 44 55 66",
    image: "/placeholder.svg?height=80&width=80",
    poles: ["Développement"],
    statut: "active" as const,
    isResponsable: false,
    dateAdhesion: "2023-06-18",
    adresse: "987 Avenue de la République, 75011 Paris",
    dateNaissance: "1989-09-30",
    competences: ["Vue.js", "Laravel", "MySQL", "Docker"],
    bio: "Développeur backend avec une solide expérience en architecture de systèmes.",
  },
]

interface MembresGridProps {
  searchTerm: string
  poleFilter: string
  statutFilter: string
  sortBy: string
}

export function MembresGrid({ searchTerm, poleFilter, statutFilter, sortBy }: MembresGridProps) {
  const [selectedMembre, setSelectedMembre] = useState<(typeof membres)[0] | null>(null)
  const [editingMembre, setEditingMembre] = useState<(typeof membres)[0] | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Filtrage des membres
  const filteredMembres = membres.filter((membre) => {
    // Filtre par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        membre.nom.toLowerCase().includes(searchLower) ||
        membre.prenom.toLowerCase().includes(searchLower) ||
        membre.email.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Filtre par pôle
    if (poleFilter && poleFilter !== "all") {
      const poleMap: { [key: string]: string[] } = {
        design: ["Design", "UX/UI"],
        dev: ["Développement", "Tech"],
        comm: ["Communication"],
        photo: ["Photo", "Media"],
        marketing: ["Marketing"],
        event: ["Événementiel"],
      }

      const targetPoles = poleMap[poleFilter] || [poleFilter]
      if (
        !membre.poles.some((pole) => targetPoles.some((target) => pole.toLowerCase().includes(target.toLowerCase())))
      ) {
        return false
      }
    }

    // Filtre par statut
    if (statutFilter && statutFilter !== "all") {
      if (membre.statut !== statutFilter) return false
    }

    return true
  })

  // Tri des membres
  const sortedMembres = [...filteredMembres].sort((a, b) => {
    switch (sortBy) {
      case "nom":
        return `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`)
      case "dateAdhesion":
        return new Date(b.dateAdhesion).getTime() - new Date(a.dateAdhesion).getTime()
      case "poles":
        return a.poles.join(", ").localeCompare(b.poles.join(", "))
      default:
        return 0
    }
  })

  const handleViewMembre = (membre: (typeof membres)[0]) => {
    setSelectedMembre(membre)
    setShowViewModal(true)
  }

  const handleEditMembre = (membre: (typeof membres)[0]) => {
    setEditingMembre(membre)
    setShowEditModal(true)
    setShowViewModal(false)
  }

  const handleDeleteMembre = (membre: (typeof membres)[0]) => {
    // Logique de suppression
    console.log("Supprimer membre:", membre)
    setShowViewModal(false)
  }

  const handleSaveMembre = (membre: (typeof membres)[0]) => {
    // Logique de sauvegarde
    console.log("Sauvegarder membre:", membre)
    setShowEditModal(false)
    setShowCreateModal(false)
  }

  if (sortedMembres.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun membre ne correspond aux filtres sélectionnés.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedMembres.map((membre) => (
          <Card key={membre.id} className="border-border/40 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6" onClick={() => handleViewMembre(membre)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={membre.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {membre.prenom[0]}
                      {membre.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {membre.prenom} {membre.nom}
                      </h3>
                      {membre.isResponsable && <Crown className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <Badge variant={membre.statut === "active" ? "default" : "secondary"} className="text-xs">
                      {membre.statut === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Menu contextuel
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {membre.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {membre.telephone}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Pôles</p>
                <div className="flex flex-wrap gap-1">
                  {membre.poles.map((pole) => (
                    <Badge key={pole} variant="outline" className="text-xs">
                      {pole}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/40">
                <p className="text-xs text-muted-foreground">
                  Membre depuis {new Date(membre.dateAdhesion).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
        <p>
          {sortedMembres.length} membre{sortedMembres.length > 1 ? "s" : ""}
          {sortedMembres.length !== membres.length && ` sur ${membres.length}`}
        </p>
      </div>

      {/* Modals */}
      <MembreViewModal
        membre={selectedMembre}
        open={showViewModal}
        onOpenChange={setShowViewModal}
        onEdit={handleEditMembre}
        onDelete={handleDeleteMembre}
      />

      <MembreFormModal
        membre={editingMembre}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSave={handleSaveMembre}
        mode="edit"
      />

      <MembreFormModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSave={handleSaveMembre}
        mode="create"
      />
    </>
  )
}
