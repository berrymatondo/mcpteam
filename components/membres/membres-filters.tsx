"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, SortAsc, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface MembresFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string
    poleFilter: string
    statutFilter: string
    sortBy: string
    sortOrder: "asc" | "desc"
  }) => void
}

export function MembresFilters({ onFiltersChange }: MembresFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [poleFilter, setPoleFilter] = useState("all")
  const [statutFilter, setStatutFilter] = useState("all")
  const [sortBy, setSortBy] = useState("nom")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [competencesFilter, setCompetencesFilter] = useState<string[]>([])
  const [dateAdhesionFrom, setDateAdhesionFrom] = useState<Date>()
  const [dateAdhesionTo, setDateAdhesionTo] = useState<Date>()
  const [experienceFilter, setExperienceFilter] = useState<string[]>([])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onFiltersChange({
      searchTerm: value,
      poleFilter,
      statutFilter,
      sortBy,
      sortOrder,
    })
  }

  const handlePoleChange = (value: string) => {
    setPoleFilter(value)
    onFiltersChange({
      searchTerm,
      poleFilter: value,
      statutFilter,
      sortBy,
      sortOrder,
    })
  }

  const handleStatutChange = (value: string) => {
    setStatutFilter(value)
    onFiltersChange({
      searchTerm,
      poleFilter,
      statutFilter: value,
      sortBy,
      sortOrder,
    })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onFiltersChange({
      searchTerm,
      poleFilter,
      statutFilter,
      sortBy: value,
      sortOrder,
    })
  }

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newOrder)
    onFiltersChange({
      searchTerm,
      poleFilter,
      statutFilter,
      sortBy,
      sortOrder: newOrder,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPoleFilter("all")
    setStatutFilter("all")
    setSortBy("nom")
    setSortOrder("asc")
    onFiltersChange({
      searchTerm: "",
      poleFilter: "all",
      statutFilter: "all",
      sortBy: "nom",
      sortOrder: "asc",
    })
  }

  const hasActiveFilters =
    searchTerm || poleFilter !== "all" || statutFilter !== "all" || sortBy !== "nom" || sortOrder !== "asc"

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un membre..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <Select value={poleFilter} onValueChange={handlePoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par pôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les pôles</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="dev">Développement</SelectItem>
            <SelectItem value="comm">Communication</SelectItem>
            <SelectItem value="photo">Photo</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="event">Événementiel</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statutFilter} onValueChange={handleStatutChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="active">Actifs</SelectItem>
            <SelectItem value="inactive">Inactifs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Effacer les filtres
          </Button>
        )}
        <Popover open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Plus de filtres
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Compétences</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["React", "Vue.js", "Design", "Marketing", "Photo", "Vidéo"].map((competence) => (
                    <div key={competence} className="flex items-center space-x-2">
                      <Checkbox
                        id={competence}
                        checked={competencesFilter.includes(competence)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCompetencesFilter([...competencesFilter, competence])
                          } else {
                            setCompetencesFilter(competencesFilter.filter((c) => c !== competence))
                          }
                        }}
                      />
                      <Label htmlFor={competence} className="text-sm">
                        {competence}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Expérience</Label>
                <div className="space-y-2 mt-2">
                  {["Débutant", "Intermédiaire", "Avancé", "Expert"].map((niveau) => (
                    <div key={niveau} className="flex items-center space-x-2">
                      <Checkbox
                        id={niveau}
                        checked={experienceFilter.includes(niveau)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setExperienceFilter([...experienceFilter, niveau])
                          } else {
                            setExperienceFilter(experienceFilter.filter((e) => e !== niveau))
                          }
                        }}
                      />
                      <Label htmlFor={niveau} className="text-sm">
                        {niveau}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Période d'adhésion</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Du</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateAdhesionFrom ? format(dateAdhesionFrom, "dd/MM/yyyy", { locale: fr }) : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateAdhesionFrom}
                          onSelect={setDateAdhesionFrom}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Au</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateAdhesionTo ? format(dateAdhesionTo, "dd/MM/yyyy", { locale: fr }) : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dateAdhesionTo} onSelect={setDateAdhesionTo} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCompetencesFilter([])
                    setDateAdhesionFrom(undefined)
                    setDateAdhesionTo(undefined)
                    setExperienceFilter([])
                  }}
                >
                  Réinitialiser
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // Ici vous pouvez étendre onFiltersChange pour inclure les filtres avancés
                    setShowAdvancedFilters(false)
                  }}
                >
                  Appliquer
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nom">Nom</SelectItem>
            <SelectItem value="dateAdhesion">Date d'adhésion</SelectItem>
            <SelectItem value="poles">Pôles</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={handleSortOrderToggle}>
          <SortAsc className={`h-4 w-4 mr-2 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
          {sortOrder === "asc" ? "Croissant" : "Décroissant"}
        </Button>
      </div>
    </div>
  )
}
