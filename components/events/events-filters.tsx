"use client"

import { useState } from "react"
import { Search, Filter, Calendar, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface EventsFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function EventsFilters({ onFiltersChange }: EventsFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statutFilter, setStatutFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [isCalendarView, setIsCalendarView] = useState(false)

  // Filtres avancés
  const [capaciteMin, setCapaciteMin] = useState("")
  const [capaciteMax, setCapaciteMax] = useState("")
  const [selectedOrganisateurs, setSelectedOrganisateurs] = useState<string[]>([])
  const [selectedLieux, setSelectedLieux] = useState<string[]>([])

  const organisateurs = ["Marie Dubois", "Jean Martin", "Sophie Laurent", "Pierre Moreau", "Emma Bernard"]

  const lieux = [
    "Salle de conférence A",
    "Auditorium principal",
    "Salle de réunion B",
    "Espace coworking",
    "Salle polyvalente",
  ]

  const updateFilters = () => {
    const filters = {
      searchTerm,
      statutFilter,
      typeFilter,
      dateFilter,
      isCalendarView,
      capaciteMin,
      capaciteMax,
      selectedOrganisateurs,
      selectedLieux,
    }
    onFiltersChange(filters)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatutFilter("all")
    setTypeFilter("all")
    setDateFilter("all")
    setCapaciteMin("")
    setCapaciteMax("")
    setSelectedOrganisateurs([])
    setSelectedLieux([])
    updateFilters()
  }

  const handleOrganisateurChange = (organisateur: string, checked: boolean) => {
    if (checked) {
      setSelectedOrganisateurs([...selectedOrganisateurs, organisateur])
    } else {
      setSelectedOrganisateurs(selectedOrganisateurs.filter((o) => o !== organisateur))
    }
  }

  const handleLieuChange = (lieu: string, checked: boolean) => {
    if (checked) {
      setSelectedLieux([...selectedLieux, lieu])
    } else {
      setSelectedLieux(selectedLieux.filter((l) => l !== lieu))
    }
  }

  const hasActiveFilters =
    searchTerm ||
    statutFilter !== "all" ||
    typeFilter !== "all" ||
    dateFilter !== "all" ||
    capaciteMin ||
    capaciteMax ||
    selectedOrganisateurs.length > 0 ||
    selectedLieux.length > 0

  const hasAdvancedFilters = capaciteMin || capaciteMax || selectedOrganisateurs.length > 0 || selectedLieux.length > 0

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              updateFilters()
            }}
            className="pl-10"
          />
        </div>

        <Select
          value={statutFilter}
          onValueChange={(value) => {
            setStatutFilter(value)
            updateFilters()
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="planifie">Planifié</SelectItem>
            <SelectItem value="en-cours">En cours</SelectItem>
            <SelectItem value="termine">Terminé</SelectItem>
            <SelectItem value="annule">Annulé</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value)
            updateFilters()
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="reunion">Réunion</SelectItem>
            <SelectItem value="formation">Formation</SelectItem>
            <SelectItem value="conference">Conférence</SelectItem>
            <SelectItem value="atelier">Atelier</SelectItem>
            <SelectItem value="seminaire">Séminaire</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={dateFilter}
          onValueChange={(value) => {
            setDateFilter(value)
            updateFilters()
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les dates</SelectItem>
            <SelectItem value="today">Aujourd'hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={isCalendarView ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setIsCalendarView(!isCalendarView)
            updateFilters()
          }}
          className="gap-2"
        >
          <Calendar className="h-4 w-4" />
          {isCalendarView ? "Vue liste" : "Vue calendrier"}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 relative bg-transparent">
              <Filter className="h-4 w-4" />
              Plus de filtres
              <ChevronDown className="h-4 w-4" />
              {hasAdvancedFilters && <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filtres avancés</h4>
                {hasAdvancedFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCapaciteMin("")
                      setCapaciteMax("")
                      setSelectedOrganisateurs([])
                      setSelectedLieux([])
                      updateFilters()
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Capacité</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={capaciteMin}
                    onChange={(e) => {
                      setCapaciteMin(e.target.value)
                      updateFilters()
                    }}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={capaciteMax}
                    onChange={(e) => {
                      setCapaciteMax(e.target.value)
                      updateFilters()
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Organisateurs</Label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {organisateurs.map((organisateur) => (
                    <div key={organisateur} className="flex items-center space-x-2">
                      <Checkbox
                        id={organisateur}
                        checked={selectedOrganisateurs.includes(organisateur)}
                        onCheckedChange={(checked) => {
                          handleOrganisateurChange(organisateur, checked as boolean)
                          updateFilters()
                        }}
                      />
                      <Label htmlFor={organisateur} className="text-sm">
                        {organisateur}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Lieux</Label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {lieux.map((lieu) => (
                    <div key={lieu} className="flex items-center space-x-2">
                      <Checkbox
                        id={lieu}
                        checked={selectedLieux.includes(lieu)}
                        onCheckedChange={(checked) => {
                          handleLieuChange(lieu, checked as boolean)
                          updateFilters()
                        }}
                      />
                      <Label htmlFor={lieu} className="text-sm">
                        {lieu}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Effacer les filtres
          </Button>
        )}
      </div>
    </div>
  )
}
