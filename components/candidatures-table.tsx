"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"
import { CandidatureViewModal } from "./candidatures/candidature-view-modal"
import { useRouter } from "next/navigation"

const candidatures = [
  {
    id: 1,
    nom: "Leroy",
    prenom: "Emma",
    email: "emma.leroy@email.com",
    statut: "nouveau" as const,
    dateCreation: "2024-01-15",
    polesSouhaites: ["Design", "UX/UI"],
  },
  {
    id: 2,
    nom: "Moreau",
    prenom: "Thomas",
    email: "thomas.moreau@email.com",
    statut: "encours" as const,
    dateCreation: "2024-01-12",
    polesSouhaites: ["Développement"],
  },
  {
    id: 3,
    nom: "Simon",
    prenom: "Julie",
    email: "julie.simon@email.com",
    statut: "traité" as const,
    dateCreation: "2024-01-10",
    polesSouhaites: ["Communication", "Marketing"],
  },
  {
    id: 4,
    nom: "Laurent",
    prenom: "Alex",
    email: "alex.laurent@email.com",
    statut: "nouveau" as const,
    dateCreation: "2024-01-14",
    polesSouhaites: ["Photo", "Video"],
  },
]

const statutConfig = {
  nouveau: {
    label: "Nouveau",
    variant: "default" as const,
    icon: AlertCircle,
    color: "text-blue-500",
  },
  encours: {
    label: "En cours",
    variant: "secondary" as const,
    icon: Clock,
    color: "text-yellow-500",
  },
  traité: {
    label: "Traité",
    variant: "outline" as const,
    icon: CheckCircle,
    color: "text-green-500",
  },
}

export function CandidaturesTable() {
  const [selectedCandidature, setSelectedCandidature] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleRowClick = (candidature: any) => {
    // Convertir les données pour correspondre au format attendu par le modal
    const candidatureForModal = {
      ...candidature,
      telephone: candidature.telephone || "Non renseigné",
      polesSouhaites: candidature.polesSouhaites,
      statut:
        candidature.statut === "nouveau"
          ? "en_attente"
          : candidature.statut === "encours"
            ? "en_attente"
            : candidature.statut === "traité"
              ? "acceptee"
              : "en_attente",
      datePostulation: candidature.dateCreation,
      competences: ["React", "TypeScript", "Design"], // Données d'exemple
      experience: "2 ans d'expérience en développement web",
      disponibilite: "Temps plein",
      commentaires: "Candidature intéressante",
    }
    setSelectedCandidature(candidatureForModal)
    setIsModalOpen(true)
  }

  const handleManageAll = () => {
    router.push("/candidatures")
  }

  return (
    <Card className="border-border/40">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Candidatures Récentes</CardTitle>
        <Button variant="outline" size="sm" onClick={handleManageAll}>
          Gérer tout
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidat</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Pôles souhaités</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidatures.map((candidature) => {
              const config = statutConfig[candidature.statut]
              const Icon = config.icon

              return (
                <TableRow
                  key={candidature.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleRowClick(candidature)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {candidature.prenom} {candidature.nom}
                      </div>
                      <div className="text-sm text-muted-foreground">{candidature.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={config.variant} className="gap-1">
                      <Icon className={`h-3 w-3 ${config.color}`} />
                      {config.label}
                    </Badge>
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
                    <div className="text-sm">{new Date(candidature.dateCreation).toLocaleDateString("fr-FR")}</div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CandidatureViewModal
        candidature={selectedCandidature}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onEdit={(candidature) => {
          console.log("Éditer candidature:", candidature)
          setIsModalOpen(false)
        }}
        onAccept={(candidature) => {
          console.log("Accepter candidature:", candidature)
          setIsModalOpen(false)
        }}
        onReject={(candidature) => {
          console.log("Refuser candidature:", candidature)
          setIsModalOpen(false)
        }}
      />
    </Card>
  )
}
