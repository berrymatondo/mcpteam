"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Crown, Calendar, Target, Edit, Settings, UserPlus, BarChart3 } from "lucide-react"

interface Pole {
  id: number
  nom: string
  description: string
  membres: number
  maxMembres: number
  responsables: Array<{
    nom: string
    email: string
    image?: string
  }>
  couleur: string
  projetsActifs: number
  dateCreation: string
  objectifs?: string[]
  budget?: number
  localisation?: string
  horaires?: string
  competencesRequises?: string[]
  membresListe?: Array<{
    nom: string
    prenom: string
    email: string
    role: string
    image?: string
  }>
}

interface PoleViewModalProps {
  pole: Pole | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (pole: Pole) => void
  onAddMember: (pole: Pole) => void
  onManageMembers: (pole: Pole) => void
}

export function PoleViewModal({ pole, open, onOpenChange, onEdit, onAddMember, onManageMembers }: PoleViewModalProps) {
  if (!pole) return null

  const pourcentage = (pole.membres / pole.maxMembres) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${pole.couleur}`} />
            {pole.nom}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header avec actions */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-muted-foreground">{pole.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Créé le {new Date(pole.dateCreation).toLocaleDateString("fr-FR")}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {pole.projetsActifs} projets actifs
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onAddMember(pole)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter membre
              </Button>
              <Button variant="outline" size="sm" onClick={() => onManageMembers(pole)}>
                <Users className="h-4 w-4 mr-2" />
                Gérer membres
              </Button>
              <Button variant="outline" size="sm" onClick={() => onEdit(pole)}>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Statistiques */}
            <div className="lg:col-span-2 space-y-6">
              {/* Membres */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Membres ({pole.membres}/{pole.maxMembres})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Progress value={pourcentage} className="h-3" />
                    <p className="text-sm text-muted-foreground">{Math.round(pourcentage)}% de capacité utilisée</p>
                  </div>

                  {/* Liste des membres */}
                  {pole.membresListe && pole.membresListe.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Membres récents</h4>
                      <div className="space-y-2">
                        {pole.membresListe.slice(0, 5).map((membre, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={membre.image || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {membre.prenom[0]}
                                {membre.nom[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {membre.prenom} {membre.nom}
                              </p>
                              <p className="text-xs text-muted-foreground">{membre.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {pole.membresListe.length > 5 && (
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Voir tous les membres ({pole.membresListe.length})
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Objectifs */}
              {pole.objectifs && pole.objectifs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Objectifs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pole.objectifs.map((objectif, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{objectif}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Compétences requises */}
              {pole.competencesRequises && pole.competencesRequises.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Compétences Requises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {pole.competencesRequises.map((competence) => (
                        <Badge key={competence} variant="outline">
                          {competence}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar avec infos détaillées */}
            <div className="space-y-6">
              {/* Responsables */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Responsables
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pole.responsables.map((responsable, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={responsable.image || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {responsable.nom
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{responsable.nom}</p>
                        <p className="text-xs text-muted-foreground">{responsable.email}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Informations pratiques */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations Pratiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pole.localisation && (
                    <div>
                      <p className="font-medium text-sm">Localisation</p>
                      <p className="text-sm text-muted-foreground">{pole.localisation}</p>
                    </div>
                  )}

                  {pole.horaires && (
                    <div>
                      <p className="font-medium text-sm">Horaires</p>
                      <p className="text-sm text-muted-foreground">{pole.horaires}</p>
                    </div>
                  )}

                  {pole.budget && (
                    <div>
                      <p className="font-medium text-sm">Budget annuel</p>
                      <p className="text-sm text-muted-foreground">{pole.budget.toLocaleString("fr-FR")} €</p>
                    </div>
                  )}

                  <div>
                    <p className="font-medium text-sm">Projets actifs</p>
                    <p className="text-sm text-muted-foreground">{pole.projetsActifs} en cours</p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions rapides */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Voir les statistiques
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres avancés
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Target className="h-4 w-4 mr-2" />
                    Gérer les projets
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
