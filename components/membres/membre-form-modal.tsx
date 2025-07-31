"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from "lucide-react"

interface Membre {
  id?: number
  nom: string
  prenom: string
  email: string
  telephone: string
  image?: string
  poles: string[]
  statut: "active" | "inactive"
  isResponsable: boolean
  dateAdhesion: string
  adresse?: string
  dateNaissance?: string
  competences?: string[]
  bio?: string
}

interface MembreFormModalProps {
  membre?: Membre | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (membre: Membre) => void
  mode: "create" | "edit"
}

const polesDisponibles = [
  "Design & UX/UI",
  "Développement",
  "Communication",
  "Marketing",
  "Photo & Média",
  "Événementiel",
  "Administration",
  "Ressources Humaines",
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
]

export function MembreFormModal({ membre, open, onOpenChange, onSave, mode }: MembreFormModalProps) {
  const [formData, setFormData] = useState<Membre>(() => ({
    nom: membre?.nom || "",
    prenom: membre?.prenom || "",
    email: membre?.email || "",
    telephone: membre?.telephone || "",
    image: membre?.image || "",
    poles: membre?.poles || [],
    statut: membre?.statut || "active",
    isResponsable: membre?.isResponsable || false,
    dateAdhesion: membre?.dateAdhesion || new Date().toISOString().split("T")[0],
    adresse: membre?.adresse || "",
    dateNaissance: membre?.dateNaissance || "",
    competences: membre?.competences || [],
    bio: membre?.bio || "",
  }))

  const [newCompetence, setNewCompetence] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: membre?.id })
    onOpenChange(false)
  }

  const handlePoleToggle = (pole: string) => {
    setFormData((prev) => ({
      ...prev,
      poles: prev.poles.includes(pole) ? prev.poles.filter((p) => p !== pole) : [...prev.poles, pole],
    }))
  }

  const handleCompetenceAdd = () => {
    if (newCompetence.trim() && !formData.competences?.includes(newCompetence.trim())) {
      setFormData((prev) => ({
        ...prev,
        competences: [...(prev.competences || []), newCompetence.trim()],
      }))
      setNewCompetence("")
    }
  }

  const handleCompetenceRemove = (competence: string) => {
    setFormData((prev) => ({
      ...prev,
      competences: prev.competences?.filter((c) => c !== competence) || [],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Ajouter un Membre" : "Modifier le Membre"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo de profil */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.image || "/placeholder.svg"} />
              <AvatarFallback>
                {formData.prenom[0] || "?"}
                {formData.nom[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="image">Photo de profil</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  type="url"
                  placeholder="URL de l'image"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

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

          {/* Contact */}
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

          {/* Adresse */}
          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse</Label>
            <Input
              id="adresse"
              value={formData.adresse}
              onChange={(e) => setFormData((prev) => ({ ...prev, adresse: e.target.value }))}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateNaissance">Date de naissance</Label>
              <Input
                id="dateNaissance"
                type="date"
                value={formData.dateNaissance}
                onChange={(e) => setFormData((prev) => ({ ...prev, dateNaissance: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateAdhesion">Date d'adhésion *</Label>
              <Input
                id="dateAdhesion"
                type="date"
                required
                value={formData.dateAdhesion}
                onChange={(e) => setFormData((prev) => ({ ...prev, dateAdhesion: e.target.value }))}
              />
            </div>
          </div>

          {/* Statut et responsabilité */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select
                value={formData.statut}
                onValueChange={(value: "active" | "inactive") => setFormData((prev) => ({ ...prev, statut: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Responsabilités</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="responsable"
                  checked={formData.isResponsable}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isResponsable: checked as boolean }))}
                />
                <Label htmlFor="responsable">Responsable de pôle</Label>
              </div>
            </div>
          </div>

          {/* Pôles */}
          <div className="space-y-3">
            <Label>Pôles *</Label>
            <div className="grid grid-cols-2 gap-2">
              {polesDisponibles.map((pole) => (
                <div key={pole} className="flex items-center space-x-2">
                  <Checkbox
                    id={pole}
                    checked={formData.poles.includes(pole)}
                    onCheckedChange={() => handlePoleToggle(pole)}
                  />
                  <Label htmlFor={pole} className="text-sm">
                    {pole}
                  </Label>
                </div>
              ))}
            </div>
            {formData.poles.length === 0 && <p className="text-sm text-red-500">Sélectionnez au moins un pôle</p>}
          </div>

          {/* Compétences */}
          <div className="space-y-3">
            <Label>Compétences</Label>
            <div className="flex gap-2">
              <Select value={newCompetence} onValueChange={setNewCompetence}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner une compétence" />
                </SelectTrigger>
                <SelectContent>
                  {competencesDisponibles
                    .filter((comp) => !formData.competences?.includes(comp))
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
              {formData.competences?.map((competence) => (
                <Badge key={competence} variant="secondary" className="gap-1">
                  {competence}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCompetenceRemove(competence)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              rows={3}
              placeholder="Décrivez brièvement le membre..."
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={formData.poles.length === 0}>
              {mode === "create" ? "Ajouter" : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
