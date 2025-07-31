"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Edit, CheckCircle, XCircle, MoreHorizontal } from "lucide-react"
import { CandidatureViewModal } from "./candidature-view-modal"
import { CandidatureFormModal } from "./candidature-form-modal"

type StatutCandidature = "en_attente" | "acceptee" | "refusee" | "abandonnee"

interface Candidature {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  polesSouhaites: string[]
  statut: StatutCandidature
  datePostulation: string
  cv?: string
  lettreMotivation?: string
  competences: string[]
  experience: string
  disponibilite: string
  commentaires?: string
}

const candidatures: Candidature[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    polesSouhaites: ["Design", "Communication"],
    statut: "en_attente",
    datePostulation: "2024-01-15",
    competences: ["Photoshop", "Illustrator", "Figma"],
    experience: "2 ans en agence de communication",
    disponibilite: "Temps plein",
    commentaires: "Très motivé pour rejoindre l'équipe design",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@email.com",
    telephone: "06 98 76 54 32",
    polesSouhaites: ["Développement"],
    statut: "acceptee",
    datePostulation: "2024-01-10",
    competences: ["React", "Node.js", "TypeScript"],
    experience: "3 ans développeur full-stack",
    disponibilite: "Temps partiel",
  },
  {
    id: 3,
    nom: "Bernard",
    prenom: "Lucas",
    email: "lucas.bernard@email.com",
    telephone: "06 11 22 33 44",
    polesSouhaites: ["Marketing", "Communication"],
    statut: "refusee",
    datePostulation: "2024-01-08",
    competences: ["SEO", "Google Ads", "Analytics"],
    experience: "1 an en startup",
    disponibilite: "Temps plein",
  },
  {
    id: 4,
    nom: "Leroy",
    prenom: "Emma",
    email: "emma.leroy@email.com",
    telephone: "06 55 66 77 88",
    polesSouhaites: ["Photo", "Media"],
    statut: "abandonnee",
    datePostulation: "2024-01-05",
    competences: ["Photographie", "Lightroom", "Premiere"],
    experience: "Freelance depuis 2 ans",
    disponibilite: "Temps plein",
  },
  {
    id: 5,
    nom: "Petit",
    prenom: "Thomas",
    email: "thomas.petit@email.com",
    telephone: "06 77 88 99 00",
    polesSouhaites: ["Design"],
    statut: "en_attente",
    datePostulation: "2024-01-20",
    competences: ["UI/UX", "Sketch", "Prototyping"],
    experience: "Étudiant en design",
    disponibilite: "Stage",
  },
]

const getStatutConfig = (statut: StatutCandidature) => {
  switch (statut) {
    case "en_attente":
      return { label: "En attente", variant: "secondary" as const, color: "text-yellow-600" }
    case "acceptee":
      return { label: "Acceptée", variant: "default" as const, color: "text-green-600" }
    case "refusee":
      return { label: "Refusée", variant: "destructive" as const, color: "text-red-600" }
    case "abandonnee":
      return { label: "Abandonnée", variant: "outline" as const, color: "text-gray-600" }
  }
}

interface CandidaturesTableProps {
  searchTerm: string
  statutFilter: string
  poleFilter: string
  dateFilter: string
}

export function CandidaturesTable({ searchTerm, statutFilter, poleFilter, dateFilter }: CandidaturesTableProps) {
  const [selectedCandidature, setSelectedCandidature] = useState<Candidature | null>(null)
  const [editingCandidature, setEditingCandidature] = useState<Candidature | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Filtrage des candidatures
  const filteredCandidatures = candidatures.filter((candidature) => {
    // Filtre par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        candidature.nom.toLowerCase().includes(searchLower) ||
        candidature.prenom.toLowerCase().includes(searchLower) ||
        candidature.email.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Filtre par statut
    if (statutFilter && statutFilter !== "all") {
      if (candidature.statut !== statutFilter) return false
    }

    // Filtre par pôle
    if (poleFilter && poleFilter !== "all") {
      if (!candidature.polesSouhaites.some((pole) => pole.toLowerCase().includes(poleFilter.toLowerCase()))) {
        return false
      }
    }

    // Filtre par date
    if (dateFilter && dateFilter !== "all") {
      const candidatureDate = new Date(candidature.datePostulation)
      const now = new Date()

      switch (dateFilter) {
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          if (candidatureDate < weekAgo) return false
          break
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          if (candidatureDate < monthAgo) return false
          break
        case "3months":
          const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          if (candidatureDate < threeMonthsAgo) return false
          break
      }
    }

    return true
  })

  const handleViewCandidature = (candidature: Candidature) => {
    setSelectedCandidature(candidature)
    setShowViewModal(true)
  }

  const handleEditCandidature = (candidature: Candidature) => {
    setEditingCandidature(candidature)
    setShowEditModal(true)
    setShowViewModal(false)
  }

  const handleAcceptCandidature = (candidature: Candidature) => {
    // Logique d'acceptation
    console.log("Accepter candidature:", candidature)
  }

  const handleRejectCandidature = (candidature: Candidature) => {
    // Logique de refus
    console.log("Refuser candidature:", candidature)
  }

  const handleSaveCandidature = (candidature: Candidature) => {
    // Logique de sauvegarde
    console.log("Sauvegarder candidature:", candidature)
    setShowEditModal(false)
  }

  if (filteredCandidatures.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucune candidature ne correspond aux filtres sélectionnés.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidat</TableHead>
              <TableHead>Pôles souhaités</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidatures.map((candidature) => {
              const statutConfig = getStatutConfig(candidature.statut)

              return (
                <TableRow key={candidature.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {candidature.prenom[0]}
                          {candidature.nom[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {candidature.prenom} {candidature.nom}
                        </p>
                        <p className="text-sm text-muted-foreground">{candidature.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidature.polesSouhaites.map((pole) => (
                        <Badge key={pole} variant="outline" className="text-xs">
                          {pole}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statutConfig.variant}>{statutConfig.label}</Badge>
                  </TableCell>
                  <TableCell>{new Date(candidature.datePostulation).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewCandidature(candidature)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditCandidature(candidature)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {candidature.statut === "en_attente" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:text-green-700"
                            onClick={() => handleAcceptCandidature(candidature)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => handleRejectCandidature(candidature)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
        <p>
          {filteredCandidatures.length} candidature{filteredCandidatures.length > 1 ? "s" : ""}
          {filteredCandidatures.length !== candidatures.length && ` sur ${candidatures.length}`}
        </p>
      </div>

      {/* Modals */}
      <CandidatureViewModal
        candidature={selectedCandidature}
        open={showViewModal}
        onOpenChange={setShowViewModal}
        onEdit={handleEditCandidature}
        onAccept={handleAcceptCandidature}
        onReject={handleRejectCandidature}
      />

      <CandidatureFormModal
        candidature={editingCandidature}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSave={handleSaveCandidature}
        mode="edit"
      />
    </>
  )
}
