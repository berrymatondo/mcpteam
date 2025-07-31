"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  Calendar,
  FileText,
  User,
  Target,
  Clock,
  MessageSquare,
  Edit,
  CheckCircle,
  XCircle,
} from "lucide-react"

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

interface CandidatureViewModalProps {
  candidature: Candidature | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (candidature: Candidature) => void
  onAccept: (candidature: Candidature) => void
  onReject: (candidature: Candidature) => void
}

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

export function CandidatureViewModal({
  candidature,
  open,
  onOpenChange,
  onEdit,
  onAccept,
  onReject,
}: CandidatureViewModalProps) {
  if (!candidature) return null

  const statutConfig = getStatutConfig(candidature.statut)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {candidature.prenom[0]}
                {candidature.nom[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">
                {candidature.prenom} {candidature.nom}
              </h2>
              <Badge variant={statutConfig.variant} className="mt-1">
                {statutConfig.label}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations de contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations de Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{candidature.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{candidature.telephone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Postulé le {new Date(candidature.datePostulation).toLocaleDateString("fr-FR")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pôles souhaités */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Pôles Souhaités
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidature.polesSouhaites.map((pole) => (
                    <Badge key={pole} variant="outline">
                      {pole}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compétences */}
            <Card>
              <CardHeader>
                <CardTitle>Compétences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidature.competences.map((competence) => (
                    <Badge key={competence} variant="secondary">
                      {competence}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expérience */}
            <Card>
              <CardHeader>
                <CardTitle>Expérience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{candidature.experience}</p>
              </CardContent>
            </Card>

            {/* Commentaires */}
            {candidature.commentaires && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Commentaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{candidature.commentaires}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar avec informations complémentaires */}
          <div className="space-y-6">
            {/* Disponibilité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Disponibilité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{candidature.disponibilite}</p>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {candidature.cv && (
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Télécharger CV
                  </Button>
                )}
                {candidature.lettreMotivation && (
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Lettre de motivation
                  </Button>
                )}
                {!candidature.cv && !candidature.lettreMotivation && (
                  <p className="text-sm text-muted-foreground">Aucun document joint</p>
                )}
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onEdit(candidature)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>

                {candidature.statut === "en_attente" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent text-green-600 hover:text-green-700"
                      onClick={() => onAccept(candidature)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accepter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent text-red-600 hover:text-red-700"
                      onClick={() => onReject(candidature)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Refuser
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          {candidature.statut === "en_attente" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 bg-transparent"
                onClick={() => onReject(candidature)}
              >
                Refuser
              </Button>
              <Button onClick={() => onAccept(candidature)}>Accepter</Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
