"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Filter } from "lucide-react"

export function EventsHeader() {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleNewEvent = () => {
    setIsCreating(true)
    // Simulate event creation process
    setTimeout(() => {
      setIsCreating(false)
      // Here you would typically open a modal or navigate to a form
      // For now, we'll navigate to a new event form page
      router.push("/events/new")
    }, 500)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Événements</h1>
            <p className="text-sm text-muted-foreground">Planifiez et gérez les événements de l'organisation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button size="sm" onClick={handleNewEvent} disabled={isCreating}>
            <Plus className="h-4 w-4 mr-2" />
            {isCreating ? "Création..." : "Nouvel événement"}
          </Button>
        </div>
      </div>
    </header>
  )
}
