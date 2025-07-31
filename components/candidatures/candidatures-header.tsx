"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Download, CheckCircle } from "lucide-react"

export function CandidaturesHeader() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Simulate data fetching - replace with actual API call
      const candidatures = [
        {
          nom: "Dupont",
          prenom: "Jean",
          email: "jean.dupont@email.com",
          pole: "Développement",
          statut: "En attente",
          dateCreation: "2024-01-15",
        },
        {
          nom: "Martin",
          prenom: "Marie",
          email: "marie.martin@email.com",
          pole: "Design",
          statut: "Acceptée",
          dateCreation: "2024-01-14",
        },
        {
          nom: "Bernard",
          prenom: "Pierre",
          email: "pierre.bernard@email.com",
          pole: "Marketing",
          statut: "Refusée",
          dateCreation: "2024-01-13",
        },
        {
          nom: "Durand",
          prenom: "Sophie",
          email: "sophie.durand@email.com",
          pole: "Communication",
          statut: "En attente",
          dateCreation: "2024-01-12",
        },
        {
          nom: "Moreau",
          prenom: "Lucas",
          email: "lucas.moreau@email.com",
          pole: "Développement",
          statut: "En cours",
          dateCreation: "2024-01-11",
        },
      ]

      // Create Excel content using HTML table format
      const excelContent = `
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Pôle</th>
              <th>Statut</th>
              <th>Date de création</th>
            </tr>
          </thead>
          <tbody>
            ${candidatures
              .map(
                (candidature) => `
              <tr>
                <td>${candidature.nom}</td>
                <td>${candidature.prenom}</td>
                <td>${candidature.email}</td>
                <td>${candidature.pole}</td>
                <td>${candidature.statut}</td>
                <td>${candidature.dateCreation}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      `

      // Create and download the file
      const blob = new Blob([excelContent], {
        type: "application/vnd.ms-excel;charset=utf-8",
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `candidatures_${new Date().toISOString().split("T")[0]}.xls`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erreur lors de l'export:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Candidatures</h1>
            <p className="text-sm text-muted-foreground">Gérez les candidatures des futurs membres</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Export en cours..." : "Exporter"}
          </Button>
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Traitement en lot
          </Button>
        </div>
      </div>
    </header>
  )
}
