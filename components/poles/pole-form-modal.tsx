"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Plus } from "lucide-react"

interface Pole {
  id?: number
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
}

interface PoleFormModalProps {
  pole?: Pole | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (pole: Pole) => void
  mode: "create" | "edit"
}

const couleursDisponibles = [
  { nom: "Bleu", classe: "bg-blue-500" },
  { nom: "Vert", classe: "bg-green-500" },
  { nom: "Violet", classe: "bg-purple-500" },
  { nom: "Orange", classe: "bg-orange-500" },
  { nom: "Rose", classe: "bg-pink-500" },
  { nom: "Indigo", classe: "bg-indigo-500" },
  { nom: "Rouge", classe: "bg-red-500" },
  { nom: "Jaune", classe: "bg-yellow-500" },
]

const competencesDisponibles = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Design Graphique",
  "UX/UI Design",
  "Photographie",
  "Vidéographie",
  "Marketing Digital",
  "Communication",
  "Gestion de Projet",
  "Leadership",
  "Comptabilité",
  "Ressources Humaines",
  "Événementiel",
  "Rédaction",
]

// Simulation d'une liste de membres disponibles
const membresDisponibles = [
  { nom: "Marie Dubois", email: "marie.dubois@email.com", image: "/placeholder.svg?height=32&width=32" },
  { nom: "Pierre Martin", email: "pierre.martin@email.com", image: "/placeholder.svg?height=32&width=32" },
  { nom: "Sophie Bernard", email: "sophie.bernard@email.com", image: "/placeholder.svg?height=32&width=32" },
  { nom: "Lucas Petit", email: "lucas.petit@email.com", image: "/placeholder.svg?height=32&width=32" },
  { nom: "Emma Leroy", email: "emma.leroy@email.com", image: "/placeholder.svg?height=32&width=32" },
]

export function PoleFormModal({ pole, open, onOpenChange, onSave, mode }: PoleFormModalProps) {
  const [formData, setFormData] = useState<Pole>(() => ({
    nom: pole?.nom || "",
    description: pole?.description || "",
    membres: pole?.membres || 0,
    maxMembres: pole?.maxMembres || 20,
    responsables: pole?.responsables || [],
    couleur: pole?.couleur || "bg-blue-500",
    projetsActifs: pole?.projetsActifs || 0,
    dateCreation: pole?.dateCreation || new Date().toISOString().split("T")[0],
    objectifs: pole?.objectifs || [],
    budget: pole?.budget || 0,
    localisation: pole?.localisation || "",
    horaires: pole?.horaires || "",
    competencesRequises: pole?.competencesRequises || [],
  }))

  const [newObjectif, setNewObjectif] = useState("")
  const [newCompetence, setNewCompetence] = useState("")
  const [showResponsableSelect, setShowResponsableSelect] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: pole?.id })
    onOpenChange(false)
  }

  const handleObjectifAdd = () => {
    if (newObjectif.trim() && !formData.objectifs?.includes(newObjectif.trim())) {
      setFormData((prev) => ({
        ...prev,
        objectifs: [...(prev.objectifs || []), newObjectif.trim()],
      }))
      setNewObjectif("")
    }
  }

  const handleObjectifRemove = (objectif: string) => {
    setFormData((prev) => ({
      ...prev,
      objectifs: prev.objectifs?.filter((o) => o !== objectif) || [],
    }))
  }

  const handleCompetenceAdd = () => {
    if (newCompetence.trim() && !formData.competencesRequises?.includes(newCompetence.trim())) {
      setFormData((prev) => ({
        ...prev,
        competencesRequises: [...(prev.competencesRequises || []), newCompetence.trim()],
      }))
      setNewCompetence("")
    }
  }

  const handleCompetenceRemove = (competence: string) => {
    setFormData((prev) => ({
      ...prev,
      competencesRequises: prev.competencesRequises?.filter((c) => c !== competence) || [],
    }))
  }

  const handleResponsableAdd = (membre: { nom: string; email: string; image?: string }) => {
    if (!formData.responsables.find((r) => r.email === membre.email)) {
      setFormData((prev) => ({
        ...prev,
        responsables: [...prev.responsables, membre],
      }))
    }
    setShowResponsableSelect(false)
  }

  const handleResponsableRemove = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      responsables: prev.responsables.filter((r) => r.email !== email),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Créer un Pôle" : "Modifier le Pôle"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom du pôle *</Label>
              <Input
                id="nom"
                required
                value={formData.nom}
                onChange={(e) => setFormData((prev) => ({ ...prev, nom: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                rows={3}
                placeholder="Décrivez les activités et missions de ce pôle..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxMembres">Nombre maximum de membres *</Label>
              <Input
                id="maxMembres"
                type="number"
                min="1"
                required
                value={formData.maxMembres}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxMembres: Number.parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget annuel (€)</Label>
              <Input
                id="budget"
                type="number"
                min="0"
                value={formData.budget || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number.parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          {/* Couleur */}
          <div className="space-y-3">
            <Label>Couleur du pôle *</Label>
            <div className="flex flex-wrap gap-2">
              {couleursDisponibles.map((couleur) => (
                <button
                  key={couleur.classe}
                  type="button"
                  className={`w-8 h-8 rounded-full ${couleur.classe} ${
                    formData.couleur === couleur.classe ? "ring-2 ring-offset-2 ring-primary" : ""
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, couleur: couleur.classe }))}
                  title={couleur.nom}
                />
              ))}
            </div>
          </div>

          {/* Responsables */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Responsables</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowResponsableSelect(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>

            {formData.responsables.length > 0 && (
              <div className="space-y-2">
                {formData.responsables.map((responsable, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={responsable.image || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {responsable.nom
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{responsable.nom}</p>
                      <p className="text-xs text-muted-foreground">{responsable.email}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleResponsableRemove(responsable.email)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Sélection de responsable */}
            {showResponsableSelect && (
              <div className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Sélectionner un responsable</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowResponsableSelect(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {membresDisponibles
                    .filter((membre) => !formData.responsables.find((r) => r.email === membre.email))
                    .map((membre, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg text-left"
                        onClick={() => handleResponsableAdd(membre)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={membre.image || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {membre.nom
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{membre.nom}</p>
                          <p className="text-xs text-muted-foreground">{membre.email}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Informations pratiques */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="localisation">Localisation</Label>
              <Input
                id="localisation"
                placeholder="Salle, bâtiment, étage..."
                value={formData.localisation}
                onChange={(e) => setFormData((prev) => ({ ...prev, localisation: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horaires">Horaires</Label>
              <Input
                id="horaires"
                placeholder="Lun-Ven 9h-17h"
                value={formData.horaires}
                onChange={(e) => setFormData((prev) => ({ ...prev, horaires: e.target.value }))}
              />
            </div>
          </div>

          {/* Objectifs */}
          <div className="space-y-3">
            <Label>Objectifs</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un objectif..."
                value={newObjectif}
                onChange={(e) => setNewObjectif(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleObjectifAdd())}
              />
              <Button type="button" onClick={handleObjectifAdd} disabled={!newObjectif.trim()}>
                Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {formData.objectifs?.map((objectif, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="flex-1 text-sm">{objectif}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleObjectifRemove(objectif)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences requises */}
          <div className="space-y-3">
            <Label>Compétences requises</Label>
            <div className="flex gap-2">
              <Select value={newCompetence} onValueChange={setNewCompetence}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner une compétence" />
                </SelectTrigger>
                <SelectContent>
                  {competencesDisponibles
                    .filter((comp) => !formData.competencesRequises?.includes(comp))
                    .map((competence) => (
                      <SelectItem key={competence} value={competence}>
                        {competence}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleCompetenceAdd} disabled={!newCompetence}>
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.competencesRequises?.map((competence) => (
                <Badge key={competence} variant="secondary" className="gap-1">
                  {competence}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCompetenceRemove(competence)} />
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={formData.responsables.length === 0}>
              {mode === "create" ? "Créer le pôle" : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
