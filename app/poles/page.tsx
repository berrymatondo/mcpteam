"use client"

import { useState } from "react"
import { PolesHeader } from "@/components/poles/poles-header"
import { PolesGrid } from "@/components/poles/poles-grid"
import { PolesStats } from "@/components/poles/poles-stats"
import { PolesFilters } from "@/components/poles/poles-filters"

export default function PolesPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    membresFilter: "all",
    statutFilter: "all",
    sortBy: "nom",
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PolesHeader />
      <div className="flex-1 space-y-6 p-6">
        <PolesStats />
        <PolesFilters onFiltersChange={setFilters} />
        <PolesGrid {...filters} />
      </div>
    </div>
  )
}
