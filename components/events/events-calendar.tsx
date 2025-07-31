"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, User, Download } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventsCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditingReferents, setIsEditingReferents] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [showMonthExport, setShowMonthExport] = useState(false)

  const events = [
    {
      id: 1,
      titre: "Réunion Design Sprint",
      date: "2024-01-25",
      heureDebut: "14:00",
      heureFin: "16:00",
      lieu: "Salle de conférence A",
      participants: 12,
      type: "reunion",
      couleur: "bg-blue-500",
      description: "Sprint de design pour le nouveau projet mobile",
      orateur: "Marie Dubois",
      organisateur: "Équipe Design",
      membresService: [
        {
          id: 1,
          nom: "Jean Martin",
          prenom: "Jean",
          departement: "Technique",
          image: "/placeholder.svg",
          telephone: "+33 6 12 34 56 78",
          isReferent: true,
        },
        {
          id: 2,
          nom: "Sophie Laurent",
          prenom: "Sophie",
          departement: "Communication",
          image: "/placeholder.svg",
          telephone: "+33 6 98 76 54 32",
          isReferent: false,
        },
      ],
    },
    {
      id: 2,
      titre: "Workshop Développement",
      date: "2024-01-26",
      heureDebut: "10:00",
      heureFin: "12:00",
      lieu: "Lab informatique",
      participants: 25,
      type: "formation",
      couleur: "bg-green-500",
      description: "Formation sur les nouvelles technologies React",
      orateur: "Pierre Durand",
      organisateur: "Pôle Développement",
      membresService: [
        {
          id: 3,
          nom: "Alice Bernard",
          prenom: "Alice",
          departement: "Développement",
          image: "/placeholder.svg",
          telephone: "+33 6 00 00 00 00",
          isReferent: false,
        },
      ],
    },
    {
      id: 3,
      titre: "Présentation Projet",
      date: "2024-01-28",
      heureDebut: "16:00",
      heureFin: "17:30",
      lieu: "Amphithéâtre",
      participants: 80,
      type: "presentation",
      couleur: "bg-purple-500",
      description: "Présentation des résultats du trimestre",
      orateur: "Directeur Général",
      organisateur: "Direction",
      membresService: [
        {
          id: 4,
          nom: "Thomas Petit",
          prenom: "Thomas",
          departement: "Administration",
          image: "/placeholder.svg",
          telephone: "+33 6 00 00 00 00",
          isReferent: false,
        },
        {
          id: 5,
          nom: "Emma Moreau",
          prenom: "Emma",
          departement: "Communication",
          image: "/placeholder.svg",
          telephone: "+33 6 00 00 00 00",
          isReferent: false,
        },
      ],
    },
    {
      id: 4,
      titre: "Team Building",
      date: "2024-01-30",
      heureDebut: "18:00",
      heureFin: "20:00",
      lieu: "Parc central",
      participants: 45,
      type: "social",
      couleur: "bg-orange-500",
      description: "Activité de cohésion d'équipe en extérieur",
      orateur: "Coach externe",
      organisateur: "RH",
      membresService: [
        {
          id: 6,
          nom: "Lucas Roux",
          prenom: "Lucas",
          departement: "RH",
          image: "/placeholder.svg",
          telephone: "+33 6 00 00 00 00",
          isReferent: false,
        },
      ],
    },
  ]

  const typeLabels = {
    reunion: "Réunion",
    formation: "Formation",
    presentation: "Présentation",
    social: "Social",
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleEdit = () => {
    // Rediriger vers la page d'édition avec l'ID de l'événement
    window.location.href = `/events/edit/${selectedEvent.id}`
    setIsModalOpen(false)
  }

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // Logique pour supprimer l'événement
    console.log("Supprimer l'événement:", selectedEvent)
    setShowDeleteConfirm(false)
    setIsModalOpen(false)
  }

  const handleExportExcel = () => {
    if (!selectedEvent) return

    // Créer le contenu Excel avec encodage UTF-8 correct
    const excelContent = `
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>
  <body>
  <table border="1">
    <tr>
      <th colspan="2" style="background-color: #f0f0f0; font-weight: bold; text-align: center;">
        DETAILS DE L'EVENEMENT
      </th>
    </tr>
    <tr>
      <td><strong>Titre</strong></td>
      <td>${selectedEvent.titre}</td>
    </tr>
    <tr>
      <td><strong>Date</strong></td>
      <td>${new Date(selectedEvent.date).toLocaleDateString("fr-FR")}</td>
    </tr>
    <tr>
      <td><strong>Heure</strong></td>
      <td>${selectedEvent.heureDebut} - ${selectedEvent.heureFin}</td>
    </tr>
    <tr>
      <td><strong>Lieu</strong></td>
      <td>${selectedEvent.lieu}</td>
    </tr>
    <tr>
      <td><strong>Orateur</strong></td>
      <td>${selectedEvent.orateur}</td>
    </tr>
    <tr>
      <td><strong>Organisateur</strong></td>
      <td>${selectedEvent.organisateur}</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td>${selectedEvent.description}</td>
    </tr>
    <tr>
      <td><strong>Participants</strong></td>
      <td>${selectedEvent.participants}</td>
    </tr>
    <tr><td colspan="2"></td></tr>
    <tr>
      <th colspan="5" style="background-color: #f0f0f0; font-weight: bold; text-align: center;">
        MEMBRES DE SERVICE
      </th>
    </tr>
    <tr>
      <th style="background-color: #f8f8f8;">Prenom</th>
      <th style="background-color: #f8f8f8;">Nom</th>
      <th style="background-color: #f8f8f8;">Departement</th>
      <th style="background-color: #f8f8f8;">Telephone</th>
      <th style="background-color: #f8f8f8;">Statut</th>
    </tr>
${
  selectedEvent.membresService
    ?.map(
      (membre: any) => `
    <tr ${membre.isReferent ? 'style="background-color: #dbeafe; font-weight: bold;"' : ""}>
      <td>${membre.prenom}</td>
      <td>${membre.nom}</td>
      <td>${membre.departement}</td>
      <td style="color: #2563eb; font-weight: 500;">${membre.telephone}</td>
      <td>${membre.isReferent ? '<span style="color: #2563eb; font-weight: bold;">REFERENT</span>' : "Membre"}</td>
    </tr>
  `,
    )
    .join("") || '<tr><td colspan="5">Aucun membre assigne</td></tr>'
}
  </table>
  </body>
  </html>
`

    // Créer et télécharger le fichier avec BOM UTF-8
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + excelContent], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `evenement_${selectedEvent.titre.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.xls`,
    )
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleMonthExport = () => {
    const monthNames = [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ]

    // Filtrer les événements du mois sélectionné
    const eventsInMonth = events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear
    })

    // Créer le contenu Excel
    const excelContent = `
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>
  <body>
  <table border="1">
    <tr>
      <th colspan="6" style="background-color: #f0f0f0; font-weight: bold; text-align: center; font-size: 16px;">
        PLANNING DES SERVICES - ${monthNames[selectedMonth].toUpperCase()} ${selectedYear}
      </th>
    </tr>
    <tr><td colspan="6"></td></tr>
    <tr>
      <th style="background-color: #f8f8f8;">Date</th>
      <th style="background-color: #f8f8f8;">Evenement</th>
      <th style="background-color: #f8f8f8;">Lieu</th>
      <th style="background-color: #f8f8f8;">Membre</th>
      <th style="background-color: #f8f8f8;">Telephone</th>
      <th style="background-color: #f8f8f8;">Statut</th>
    </tr>
${eventsInMonth
  .map(
    (event) =>
      event.membresService
        ?.map(
          (membre: any, index: number) => `
    <tr ${membre.isReferent ? 'style="background-color: #dbeafe; font-weight: bold;"' : ""}>
      <td>${index === 0 ? new Date(event.date).toLocaleDateString("fr-FR") : ""}</td>
      <td>${index === 0 ? event.titre : ""}</td>
      <td>${index === 0 ? event.lieu : ""}</td>
      <td>${membre.prenom} ${membre.nom}</td>
      <td style="color: #2563eb; font-weight: 500;">${membre.telephone}</td>
      <td>${membre.isReferent ? '<span style="color: #2563eb; font-weight: bold;">REFERENT</span>' : "Membre"}</td>
    </tr>
  `,
        )
        .join("") ||
      `
    <tr>
      <td>${new Date(event.date).toLocaleDateString("fr-FR")}</td>
      <td>${event.titre}</td>
      <td>${event.lieu}</td>
      <td colspan="3">Aucun membre assigne</td>
    </tr>
  `,
  )
  .join("")}
  </table>
  </body>
  </html>
`

    // Créer et télécharger le fichier
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + excelContent], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `planning_services_${monthNames[selectedMonth]}_${selectedYear}.xls`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowMonthExport(false)
  }

  const toggleReferent = (membreId: number) => {
    if (!selectedEvent) return

    const updatedMembres = selectedEvent.membresService.map((membre: any) =>
      membre.id === membreId ? { ...membre, isReferent: !membre.isReferent } : membre,
    )

    setSelectedEvent({
      ...selectedEvent,
      membresService: updatedMembres,
    })
  }

  return (
    <Card className="border-border/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendrier des Événements
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowMonthExport(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export mensuel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-border/40 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <div className={`w-1 h-16 rounded-full ${event.couleur}`} />

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{event.titre}</h3>
                  <Badge variant="outline">{typeLabels[event.type as keyof typeof typeLabels]}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString("fr-FR")} à {event.heureDebut}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.lieu}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {event.participants} participants
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Modal de détail de l'événement */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedEvent?.titre}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportExcel}>
                  <Download className="h-4 w-4 mr-1" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer l'événement "{selectedEvent?.titre}" ? Cette action est
                        irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={confirmDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              {/* Informations principales */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Date et heure</h4>
                  <p>{new Date(selectedEvent.date).toLocaleDateString("fr-FR")}</p>
                  <p>
                    {selectedEvent.heureDebut} - {selectedEvent.heureFin}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Lieu</h4>
                  <p>{selectedEvent.lieu}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Orateur</h4>
                  <p>{selectedEvent.orateur}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Organisateur</h4>
                  <p>{selectedEvent.organisateur}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Description</h4>
                <p className="text-sm">{selectedEvent.description}</p>
              </div>

              {/* Membres de service */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Membres de service ({selectedEvent.membresService?.length || 0})
                  </h4>
                  <Button variant="outline" size="sm" onClick={() => setIsEditingReferents(!isEditingReferents)}>
                    {isEditingReferents ? "Terminer" : "Modifier référents"}
                  </Button>
                </div>
                <div className="space-y-2">
                  {selectedEvent.membresService?.map((membre: any) => (
                    <div
                      key={membre.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        membre.isReferent ? "bg-blue-50 border-blue-200" : "bg-muted/50 border-transparent"
                      } ${isEditingReferents ? "cursor-pointer hover:bg-blue-100" : ""}`}
                      onClick={isEditingReferents ? () => toggleReferent(membre.id) : undefined}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={membre.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {membre.prenom[0]}
                          {membre.nom[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">
                            {membre.prenom} {membre.nom}
                          </p>
                          {membre.isReferent && (
                            <Badge variant="default" className="text-xs bg-blue-600 hover:bg-blue-700">
                              Référent
                            </Badge>
                          )}
                          {isEditingReferents && (
                            <Badge variant="outline" className="text-xs">
                              {membre.isReferent ? "Cliquer pour retirer" : "Cliquer pour définir"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{membre.departement}</p>
                        <p className="text-xs text-blue-600 font-medium">{membre.telephone}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {isEditingReferents && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Cliquez sur un membre pour le définir ou le retirer comme référent
                  </p>
                )}
              </div>

              {/* Statistiques */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedEvent.participants}</p>
                  <p className="text-xs text-muted-foreground">Participants</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedEvent.membresService?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">En service</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal d'export mensuel */}
      <Dialog open={showMonthExport} onOpenChange={setShowMonthExport}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export mensuel des services</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Mois</label>
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Janvier</SelectItem>
                  <SelectItem value="1">Fevrier</SelectItem>
                  <SelectItem value="2">Mars</SelectItem>
                  <SelectItem value="3">Avril</SelectItem>
                  <SelectItem value="4">Mai</SelectItem>
                  <SelectItem value="5">Juin</SelectItem>
                  <SelectItem value="6">Juillet</SelectItem>
                  <SelectItem value="7">Aout</SelectItem>
                  <SelectItem value="8">Septembre</SelectItem>
                  <SelectItem value="9">Octobre</SelectItem>
                  <SelectItem value="10">Novembre</SelectItem>
                  <SelectItem value="11">Decembre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Annee</label>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowMonthExport(false)} className="flex-1">
                Annuler
              </Button>
              <Button onClick={handleMonthExport} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
