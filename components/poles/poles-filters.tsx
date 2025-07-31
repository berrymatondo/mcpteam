"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

interface PolesFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string
    membresFilter: string
    statutFilter: string
    sortBy: string
  }) => void
}

export function PolesFilters({ onFiltersChange }: PolesFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [membresFilter, setMembresFilter] = useState("all")
  const [statutFilter, setStatutFilter] = useState("all")
  const [sortBy, setSortBy] = useState("nom")

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onFiltersChange({
      searchTerm: value,
      membresFilter,
      statutFilter,
      sortBy,
    })
  }

  const handleMembresChange = (value: string) => {
    setMembresFilter(value)
    onFiltersChange({
      searchTerm,
      membresFilter: value,
      statutFilter,
      sortBy,
    })
  }

  const handleStatutChange = (value: string) => {
    setStatutFilter(value)
    onFiltersChange({
      searchTerm,
      membresFilter,
      statutFilter: value,
      sortBy,
    })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onFiltersChange({
      searchTerm,
      membresFilter,
      statutFilter,
      sortBy: value,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setMembresFilter("all")
    setStatutFilter("all")
    setSortBy("nom")
    onFiltersChange({
      searchTerm: "",
      membresFilter: "all",
      statutFilter: "all",
      sortBy: "nom",
    })
  }

  const hasActiveFilters = searchTerm || membresFilter !== "all" || statutFilter !== "all" || sortBy !== "nom"

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un pôle..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <Select value={membresFilter} onValueChange={handleMembresChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par capacité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes capacités</SelectItem>
            <SelectItem value="low">Faible (&lt; 50%)</SelectItem>
            <SelectItem value="medium">Moyenne (50-80%)</SelectItem>
            <SelectItem value="high">Élevée (&gt; 80%)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statutFilter} onValueChange={handleStatutChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Activité" />
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
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Plus de filtres
        </Button>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nom">Nom</SelectItem>
            <SelectItem value="membres">Membres</SelectItem>
            <SelectItem value="projets">Projets</SelectItem>
            <SelectItem value="date">Date création</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
