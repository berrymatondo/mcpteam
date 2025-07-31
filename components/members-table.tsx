"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MembreViewModal } from "./membres/membre-view-modal"
import { MembreFormModal } from "./membres/membre-form-modal"

const members = [
  {
    id: 1,
    nom: "Dubois",
    prenom: "Marie",
    email: "marie.dubois@email.com",
    telephone: "06 12 34 56 78",
    image: "/placeholder.svg?height=32&width=32",
    poles: ["Design", "Communication"],
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Pierre",
    email: "pierre.martin@email.com",
    telephone: "06 98 76 54 32",
    image: "/placeholder.svg?height=32&width=32",
    poles: ["Développement", "Tech"],
  },
  {
    id: 3,
    nom: "Bernard",
    prenom: "Sophie",
    email: "sophie.bernard@email.com",
    telephone: "06 11 22 33 44",
    image: "/placeholder.svg?height=32&width=32",
    poles: ["Photo", "Media"],
  },
  {
    id: 4,
    nom: "Petit",
    prenom: "Lucas",
    email: "lucas.petit@email.com",
    telephone: "06 55 66 77 88",
    image: "/placeholder.svg?height=32&width=32",
    poles: ["Marketing", "Communication"],
  },
]

export function MembersTable() {
  const [selectedMembre, setSelectedMembre] = useState<(typeof members)[0] | null>(null)
  const [editingMembre, setEditingMembre] = useState<(typeof members)[0] | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const router = useRouter()

  const handleViewMembre = (membre: (typeof members)[0]) => {
    setSelectedMembre(membre)
    setShowViewModal(true)
  }

  const handleEditMembre = (membre: (typeof members)[0]) => {
    setEditingMembre(membre)
    setShowEditModal(true)
    setShowViewModal(false)
  }

  const handleDeleteMembre = (membre: (typeof members)[0]) => {
    console.log("Supprimer membre:", membre)
    setShowViewModal(false)
  }

  const handleSaveMembre = (membre: (typeof members)[0]) => {
    console.log("Sauvegarder membre:", membre)
    setShowEditModal(false)
  }

  const handleViewAll = () => {
    router.push("/membres")
  }

  return (
    <Card className="border-border/40">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Membres Récents</CardTitle>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membre</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Pôles</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() =>
                  handleViewMembre({
                    id: member.id,
                    nom: member.nom,
                    prenom: member.prenom,
                    email: member.email,
                    telephone: member.telephone,
                    image: member.image,
                    poles: member.poles,
                    statut: "active" as const,
                    isResponsable: false,
                    dateAdhesion: "2023-01-15",
                    adresse: "123 Rue de la Paix, 75001 Paris",
                    dateNaissance: "1990-05-15",
                    competences: ["Design Graphique", "Communication"],
                    bio: "Membre actif de l'organisation.",
                  })
                }
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.prenom[0]}
                        {member.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {member.prenom} {member.nom}
                      </div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{member.telephone}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.poles.map((pole) => (
                      <Badge key={pole} variant="secondary" className="text-xs">
                        {pole}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
      </CardContent>
    </Card>
  )
}
