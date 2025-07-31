"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Plus, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Données simulées des membres disponibles
  const availableMembers = [
    { id: 1, nom: "Martin", prenom: "Jean", departement: "Technique", image: "/placeholder.svg" },
    { id: 2, nom: "Laurent", prenom: "Sophie", departement: "Communication", image: "/placeholder.svg" },
    { id: 3, nom: "Bernard", prenom: "Alice", departement: "Développement", image: "/placeholder.svg" },
    { id: 4, nom: "Petit", prenom: "Thomas", departement: "Administration", image: "/placeholder.svg" },
    { id: 5, nom: "Moreau", prenom: "Emma", departement: "Communication", image: "/placeholder.svg" },
    { id: 6, nom: "Roux", prenom: "Lucas", departement: "RH", image: "/placeholder.svg" },
  ]

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    heureDebut: "",
    heureFin: "",
    lieu: "",
    type: "",
    capacite: "",
    organisateur: "",
    orateur: "",
    membresService: [] as any[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddMember = (member: any) => {
    if (!formData.membresService.find((m) => m.id === member.id)) {
      setFormData((prev) => ({
        ...prev,
        membresService: [...prev.membresService, member],
      }))
    }
  }

  const handleRemoveMember = (memberId: number) => {
    setFormData((prev) => ({
      ...prev,
      membresService: prev.membresService.filter((m) => m.id !== memberId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Nouvel événement créé:", formData)

    setIsSubmitting(false)
    router.push("/events")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Nouvel Événement</h1>
              <p className="text-sm text-muted-foreground">Créez un nouvel événement et assignez des membres</p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulaire principal */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Informations de l'événement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Titre */}
                    <div className="space-y-2">
                      <Label htmlFor="titre">Titre de l'événement *</Label>
                      <Input
                        id="titre"
                        value={formData.titre}
                        onChange={(e) => handleInputChange("titre", e.target.value)}
                        placeholder="Ex: Réunion mensuelle, Formation, Conférence..."
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Décrivez l'événement, son objectif, le programme..."
                        rows={4}
                      />
                    </div>

                    {/* Date et Heures */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date *
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heureDebut" className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Heure de début *
                        </Label>
                        <Input
                          id="heureDebut"
                          type="time"
                          value={formData.heureDebut}
                          onChange={(e) => handleInputChange("heureDebut", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heureFin" className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Heure de fin *
                        </Label>
                        <Input
                          id="heureFin"
                          type="time"
                          value={formData.heureFin}
                          onChange={(e) => handleInputChange("heureFin", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Lieu */}
                    <div className="space-y-2">
                      <Label htmlFor="lieu" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Lieu *
                      </Label>
                      <Select
                        value={formData.lieu}
                        onValueChange={(value) => handleInputChange("lieu", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un lieu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auditorium-principal">Auditorium principal</SelectItem>
                          <SelectItem value="auditorium-annexe">Auditorium Annexe</SelectItem>
                          <SelectItem value="polyvalente-1">Polyvalente 1</SelectItem>
                          <SelectItem value="polyvalente-2">Polyvalente 2</SelectItem>
                          <SelectItem value="polyvalente-a">Polyvalente A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Type et Capacité */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type d'événement</Label>
                        <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reunion">Réunion</SelectItem>
                            <SelectItem value="formation">Formation</SelectItem>
                            <SelectItem value="conference">Conférence</SelectItem>
                            <SelectItem value="workshop">Atelier</SelectItem>
                            <SelectItem value="social">Événement social</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacite" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Capacité maximale
                        </Label>
                        <Input
                          id="capacite"
                          type="number"
                          value={formData.capacite}
                          onChange={(e) => handleInputChange("capacite", e.target.value)}
                          placeholder="Ex: 50"
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Organisateur et Orateur */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organisateur">Organisateur</Label>
                        <Input
                          id="organisateur"
                          value={formData.organisateur}
                          onChange={(e) => handleInputChange("organisateur", e.target.value)}
                          placeholder="Nom de l'organisateur ou du pôle responsable"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="orateur">Orateur</Label>
                        <Input
                          id="orateur"
                          value={formData.orateur}
                          onChange={(e) => handleInputChange("orateur", e.target.value)}
                          placeholder="Nom de l'orateur ou intervenant principal"
                        />
                      </div>
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-end gap-3 pt-6">
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Annuler
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Création en cours..." : "Créer l'événement"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Gestion des membres */}
            <div className="space-y-6">
              {/* Membres assignés */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Membres de service ({formData.membresService.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formData.membresService.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">Aucun membre assigné</p>
                    ) : (
                      formData.membresService.map((membre) => (
                        <div key={membre.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={membre.image || "/placeholder.svg"} />
                            <AvatarFallback>
                              {membre.prenom[0]}
                              {membre.nom[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {membre.prenom} {membre.nom}
                            </p>
                            <p className="text-xs text-muted-foreground">{membre.departement}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(membre.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ajouter des membres */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Ajouter des membres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {availableMembers
                      .filter((member) => !formData.membresService.find((m) => m.id === member.id))
                      .map((membre) => (
                        <div
                          key={membre.id}
                          className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer"
                          onClick={() => handleAddMember(membre)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={membre.image || "/placeholder.svg"} />
                            <AvatarFallback>
                              {membre.prenom[0]}
                              {membre.nom[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {membre.prenom} {membre.nom}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {membre.departement}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
