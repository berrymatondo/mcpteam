"use client"

import { useState } from "react"
import { EventsHeader } from "@/components/events/events-header"
import { EventsCalendar } from "@/components/events/events-calendar"
import { EventsList } from "@/components/events/events-list"
import { EventsStats } from "@/components/events/events-stats"
import { EventsFilters } from "@/components/events/events-filters"

export default function EventsPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    statutFilter: "all",
    typeFilter: "all",
    dateFilter: "all",
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <EventsHeader />
      <div className="flex-1 space-y-6 p-6">
        <EventsStats />
        <EventsFilters onFiltersChange={setFilters} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EventsCalendar />
          </div>
          <EventsList {...filters} />
        </div>
      </div>
    </div>
  )
}
