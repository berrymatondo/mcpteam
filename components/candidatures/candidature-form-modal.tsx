"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus } from "lucide-react"

type StatutCandidature = "en_attente" | "acceptee" | "refusee" | "abandonnee"

interface Candidature {
  id?: number
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

interface CandidatureFormModalProps {
  candidature?: Candidature | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (candidature: Candidature) => void
  mode: "create" | "edit"
}

const polesDisponibles = ["Design", "Développement", "Communication", "Photo", "Marketing", "Événementiel"]

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
  "Photoshop",
  "Illustrator",
  "Figma",
  "SEO",
  "Google Ads",
  "Analytics",
]

const disponibiliteOptions = ["Temps plein", "Temps partiel", "Stage", "Freelance", "Bénévolat"]

export function CandidatureFormModal({ candidature, open, onOpenChange, onSave, mode }: CandidatureFormModalProps) {
  const [formData, setFormData] = useState<Candidature>(() => ({
    nom: candidature?.nom || "",
    prenom: candidature?.prenom || "",
    email: candidature?.email || "",
    telephone: candidature?.telephone || "",
    polesSouhaites: candidature?.polesSouhaites || [],
    statut: candidature?.statut || "en_attente",
    datePostulation: candidature?.datePostulation || new Date().toISOString().split("T")[0],
    competences: candidature?.competences || [],
    experience: candidature?.experience || "",
    disponibilite: candidature?.disponibilite || "",
    commentaires: candidature?.commentaires || "",
  }))

  useEffect(() => {
    if (candidature) {
      setFormData({
        nom: candidature.nom || "",
        prenom: candidature.prenom || "",
        email: candidature.email || "",
        telephone: candidature.telephone || "",
        polesSouhaites: candidature.polesSouhaites || [],
        statut: candidature.statut || "en_attente",
        datePostulation: candidature.datePostulation || new Date().toISOString().split("T")[0],
        competences: candidature.competences || [],
        experience: candidature.experience || "",
        disponibilite: candidature.disponibilite || "",
        commentaires: candidature.commentaires || "",
      })
    } else {
      // Réinitialiser pour le mode création
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        polesSouhaites: [],
        statut: "en_attente",
        datePostulation: new Date().toISOString().split("T")[0],
        competences: [],
        experience: "",
        disponibilite: "",
        commentaires: "",
      })
    }
  }, [candidature])

  const [newCompetence, setNewCompetence] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: candidature?.id })
    onOpenChange(false)
  }

  const handlePoleChange = (pole: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        polesSouhaites: [...prev.polesSouhaites, pole],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        polesSouhaites: prev.polesSouhaites.filter((p) => p !== pole),
      }))
    }
  }

  const handleCompetenceAdd = () => {
    if (newCompetence.trim() && !formData.competences.includes(newCompetence.trim())) {
      setFormData((prev) => ({
        ...prev,
        competences: [...prev.competences, newCompetence.trim()],
      }))
      setNewCompetence("")
    }
  }

  const handleCompetenceRemove = (competence: string) => {
    setFormData((prev) => ({
      ...prev,
      competences: prev.competences.filter((c) => c !== competence),
    }))
  }

  const getStatutOptions = () => {
    const options = [
      { value: "en_attente", label: "En attente" },
      { value: "acceptee", label: "Acceptée" },
      { value: "refusee", label: "Refusée" },
      { value: "abandonnee", label: "Abandonnée" },
    ]
    return options
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nouvelle Candidature" : "Modifier la Candidature"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                required
                value={formData.prenom}
                onChange={(e) => setFormData((prev) => ({ ...prev, prenom: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                required
                value={formData.nom}
                onChange={(e) => setFormData((prev) => ({ ...prev, nom: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input
                id="telephone"
                required
                value={formData.telephone}
                onChange={(e) => setFormData((prev) => ({ ...prev, telephone: e.target.value }))}
              />
            </div>
          </div>

          {/* Pôles souhaités */}
          <div className="space-y-3">
            <Label>Pôles souhaités *</Label>
            <div className="grid grid-cols-2 gap-3">
              {polesDisponibles.map((pole) => (
                <div key={pole} className="flex items-center space-x-2">
                  <Checkbox
                    id={pole}
                    checked={formData.polesSouhaites.includes(pole)}
                    onCheckedChange={(checked) => handlePoleChange(pole, checked as boolean)}
                  />
                  <Label htmlFor={pole} className="text-sm font-normal">
                    {pole}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Statut et disponibilité */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select
                value={formData.statut}
                onValueChange={(value: StatutCandidature) => setFormData((prev) => ({ ...prev, statut: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getStatutOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="disponibilite">Disponibilité *</Label>
              <Select
                value={formData.disponibilite}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, disponibilite: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {disponibiliteOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Compétences */}
          <div className="space-y-3">
            <Label>Compétences</Label>
            <div className="flex gap-2">
              <Select value={newCompetence} onValueChange={setNewCompetence}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Ajouter une compétence" />
                </SelectTrigger>
                <SelectContent>
                  {competencesDisponibles
                    .filter((comp) => !formData.competences.includes(comp))
                    .map((competence) => (
                      <SelectItem key={competence} value={competence}>
                        {competence}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleCompetenceAdd} disabled={!newCompetence}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.competences.map((competence) => (
                <Badge key={competence} variant="secondary" className="gap-1">
                  {competence}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCompetenceRemove(competence)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Expérience */}
          <div className="space-y-2">
            <Label htmlFor="experience">Expérience *</Label>
            <Textarea
              id="experience"
              required
              rows={3}
              placeholder="Décrivez votre expérience pertinente..."
              value={formData.experience}
              onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
            />
          </div>

          {/* Commentaires */}
          <div className="space-y-2">
            <Label htmlFor="commentaires">Commentaires</Label>
            <Textarea
              id="commentaires"
              rows={3}
              placeholder="Commentaires additionnels..."
              value={formData.commentaires}
              onChange={(e) => setFormData((prev) => ({ ...prev, commentaires: e.target.value }))}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={formData.polesSouhaites.length === 0}>
              {mode === "create" ? "Créer" : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
