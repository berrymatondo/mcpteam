"use client"

import { useState } from "react"
import { CandidaturesHeader } from "@/components/candidatures/candidatures-header"
import { CandidaturesFilters } from "@/components/candidatures/candidatures-filters"
import { CandidaturesTable } from "@/components/candidatures/candidatures-table"
import { CandidaturesStats } from "@/components/candidatures/candidatures-stats"

export default function CandidaturesPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    statutFilter: "all",
    poleFilter: "all",
    dateFilter: "all",
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <CandidaturesHeader />
      <div className="flex-1 space-y-6 p-6">
        <CandidaturesStats />
        <CandidaturesFilters onFiltersChange={setFilters} />
        <CandidaturesTable {...filters} />
      </div>
    </div>
  )
}
