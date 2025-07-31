"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface CandidaturesFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string
    statutFilter: string
    poleFilter: string
    dateFilter: string
  }) => void
}

export function CandidaturesFilters({ onFiltersChange }: CandidaturesFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statutFilter, setStatutFilter] = useState("all")
  const [poleFilter, setPoleFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [experienceFilter, setExperienceFilter] = useState<string[]>([])
  const [motivationFilter, setMotivationFilter] = useState("")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onFiltersChange({
      searchTerm: value,
      statutFilter,
      poleFilter,
      dateFilter,
    })
  }

  const handleStatutChange = (value: string) => {
    setStatutFilter(value)
    onFiltersChange({
      searchTerm,
      statutFilter: value,
      poleFilter,
      dateFilter,
    })
  }

  const handlePoleChange = (value: string) => {
    setPoleFilter(value)
    onFiltersChange({
      searchTerm,
      statutFilter,
      poleFilter: value,
      dateFilter,
    })
  }

  const handleDateChange = (value: string) => {
    setDateFilter(value)
    onFiltersChange({
      searchTerm,
      statutFilter,
      poleFilter,
      dateFilter: value,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatutFilter("all")
    setPoleFilter("all")
    setDateFilter("all")
    onFiltersChange({
      searchTerm: "",
      statutFilter: "all",
      poleFilter: "all",
      dateFilter: "all",
    })
  }

  const hasActiveFilters = searchTerm || statutFilter !== "all" || poleFilter !== "all" || dateFilter !== "all"

  const handleExperienceChange = (experience: string, checked: boolean) => {
    const newExperience = checked ? [...experienceFilter, experience] : experienceFilter.filter((e) => e !== experience)
    setExperienceFilter(newExperience)
    // You can extend onFiltersChange to include these advanced filters
  }

  const applyAdvancedFilters = () => {
    setShowAdvancedFilters(false)
    // Apply the advanced filters logic here
  }

  const resetAdvancedFilters = () => {
    setExperienceFilter([])
    setMotivationFilter("")
    setDateFrom(undefined)
    setDateTo(undefined)
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un candidat..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <Select value={statutFilter} onValueChange={handleStatutChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="en_attente">En attente</SelectItem>
            <SelectItem value="acceptee">Acceptées</SelectItem>
            <SelectItem value="refusee">Refusées</SelectItem>
            <SelectItem value="abandonnee">Abandonnées</SelectItem>
          </SelectContent>
        </Select>

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

        <Select value={dateFilter} onValueChange={handleDateChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="3months">3 derniers mois</SelectItem>
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
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filtres avancés</h4>
                <p className="text-sm text-muted-foreground">
                  Affinez votre recherche avec des critères supplémentaires
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Expérience</Label>
                  <div className="space-y-2 mt-2">
                    {["Débutant", "Intermédiaire", "Avancé", "Expert"].map((exp) => (
                      <div key={exp} className="flex items-center space-x-2">
                        <Checkbox
                          id={exp}
                          checked={experienceFilter.includes(exp)}
                          onCheckedChange={(checked) => handleExperienceChange(exp, checked as boolean)}
                        />
                        <Label htmlFor={exp} className="text-sm">
                          {exp}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="motivation" className="text-sm font-medium">
                    Motivation
                  </Label>
                  <Input
                    id="motivation"
                    placeholder="Rechercher dans les motivations..."
                    value={motivationFilter}
                    onChange={(e) => setMotivationFilter(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Période de candidature</Label>
                  <div className="flex gap-2 mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: fr }) : "Du"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: fr }) : "Au"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" size="sm" onClick={resetAdvancedFilters}>
                  Réinitialiser
                </Button>
                <Button size="sm" onClick={applyAdvancedFilters}>
                  Appliquer
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
