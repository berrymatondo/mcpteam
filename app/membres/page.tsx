"use client"

import { useState } from "react"
import { MembresHeader } from "@/components/membres/membres-header"
import { MembresFilters } from "@/components/membres/membres-filters"
import { MembresGrid } from "@/components/membres/membres-grid"
import { MembresStats } from "@/components/membres/membres-stats"

export default function MembresPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    poleFilter: "all",
    statutFilter: "all",
    sortBy: "nom",
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MembresHeader />
      <div className="flex-1 space-y-6 p-6">
        <MembresStats />
        <MembresFilters onFiltersChange={setFilters} />
        <MembresGrid {...filters} />
      </div>
    </div>
  )
}
