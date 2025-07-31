"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, X, Plus } from "lucide-react"

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assignedMembers, setAssignedMembers] = useState<any[]>([])
  const [selectedPole, setSelectedPole] = useState<string>("tous")

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    heureDebut: "",
    heureFin: "",
    lieu: "",
    type: "",
    capacite: "",
    orateur: "",
    organisateur: "",
  })

  // Données simulées - à remplacer par un appel API
  const availableMembers = [
    { id: 1, nom: "Martin", prenom: "Jean", departement: "Technique", image: "/placeholder.svg" },
    { id: 2, nom: "Laurent", prenom: "Sophie", departement: "Communication", image: "/placeholder.svg" },
    { id: 3, nom: "Bernard", prenom: "Alice", departement: "Développement", image: "/placeholder.svg" },
    { id: 4, nom: "Petit", prenom: "Thomas", departement: "Administration", image: "/placeholder.svg" },
    { id: 5, nom: "Moreau", prenom: "Emma", departement: "Communication", image: "/placeholder.svg" },
    { id: 6, nom: "Roux", prenom: "Lucas", departement: "RH", image: "/placeholder.svg" },
  ]

  const poles = ["tous", "Technique", "Communication", "Développement", "Administration", "RH"]

  const lieux = ["Auditorium principal", "Auditorium Annexe", "Polyvalente 1", "Polyvalente 2", "Polyvalente A"]

  const typesEvenement = [
    { value: "reunion", label: "Réunion" },
    { value: "formation", label: "Formation" },
    { value: "presentation", label: "Présentation" },
    { value: "social", label: "Social" },
  ]

  // Charger les données de l'événement
  useEffect(() => {
    // Simulation du chargement des données - à remplacer par un appel API
    const eventData = {
      titre: "Réunion Design Sprint",
      description: "Sprint de design pour le nouveau projet mobile",
      date: "2024-01-25",
      heureDebut: "14:00",
      heureFin: "16:00",
      lieu: "Auditorium principal",
      type: "reunion",
      capacite: "50",
      orateur: "Marie Dubois",
      organisateur: "Équipe Design",
    }

    const membresAssignes = [
      { id: 1, nom: "Martin", prenom: "Jean", departement: "Technique", image: "/placeholder.svg" },
      { id: 2, nom: "Laurent", prenom: "Sophie", departement: "Communication", image: "/placeholder.svg" },
    ]

    setFormData(eventData)
    setAssignedMembers(membresAssignes)
  }, [eventId])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulation d'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Événement modifié:", { ...formData, membresService: assignedMembers })
      router.push("/events")
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addMember = (member: any) => {
    if (!assignedMembers.find((m) => m.id === member.id)) {
      setAssignedMembers((prev) => [...prev, member])
    }
  }

  const removeMember = (memberId: number) => {
    setAssignedMembers((prev) => prev.filter((m) => m.id !== memberId))
  }

  const availableMembersFiltered = availableMembers.filter(
    (member) =>
      !assignedMembers.find((assigned) => assigned.id === member.id) &&
      (selectedPole === "tous" || member.departement === selectedPole),
  )

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Modifier l'événement</h1>
          <p className="text-muted-foreground">Modifiez les détails de l'événement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Détails de l'événement
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
                    placeholder="Ex: Réunion équipe design"
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
                    placeholder="Décrivez l'événement..."
                    rows={3}
                  />
                </div>

                {/* Date et heures */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heureDebut">Heure de début *</Label>
                    <Input
                      id="heureDebut"
                      type="time"
                      value={formData.heureDebut}
                      onChange={(e) => handleInputChange("heureDebut", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heureFin">Heure de fin *</Label>
                    <Input
                      id="heureFin"
                      type="time"
                      value={formData.heureFin}
                      onChange={(e) => handleInputChange("heureFin", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Lieu et Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lieu">Lieu *</Label>
                    <Select value={formData.lieu} onValueChange={(value) => handleInputChange("lieu", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        {lieux.map((lieu) => (
                          <SelectItem key={lieu} value={lieu}>
                            {lieu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type d'événement</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typesEvenement.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Orateur et Organisateur */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orateur">Orateur</Label>
                    <Input
                      id="orateur"
                      value={formData.orateur}
                      onChange={(e) => handleInputChange("orateur", e.target.value)}
                      placeholder="Nom de l'orateur"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organisateur">Organisateur</Label>
                    <Input
                      id="organisateur"
                      value={formData.organisateur}
                      onChange={(e) => handleInputChange("organisateur", e.target.value)}
                      placeholder="Nom de l'organisateur"
                    />
                  </div>
                </div>

                {/* Capacité */}
                <div className="space-y-2">
                  <Label htmlFor="capacite">Capacité maximale</Label>
                  <Input
                    id="capacite"
                    type="number"
                    value={formData.capacite}
                    onChange={(e) => handleInputChange("capacite", e.target.value)}
                    placeholder="Nombre maximum de participants"
                  />
                </div>

                {/* Boutons */}
                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Modification..." : "Modifier l'événement"}
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
                <User className="h-5 w-5" />
                Membres de service ({assignedMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignedMembers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Aucun membre assigné</p>
              ) : (
                assignedMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.prenom[0]}
                        {member.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {member.prenom} {member.nom}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {member.departement}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeMember(member.id)} className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Membres disponibles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Ajouter des membres
              </CardTitle>
              <div className="space-y-2">
                <Label htmlFor="poleFilter">Filtrer par pôle</Label>
                <Select value={selectedPole} onValueChange={setSelectedPole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les pôles" />
                  </SelectTrigger>
                  <SelectContent>
                    {poles.map((pole) => (
                      <SelectItem key={pole} value={pole}>
                        {pole === "tous" ? "Tous les pôles" : pole}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableMembersFiltered.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Tous les membres sont assignés</p>
              ) : (
                availableMembersFiltered.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => addMember(member)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.prenom[0]}
                        {member.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {member.prenom} {member.nom}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {member.departement}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
