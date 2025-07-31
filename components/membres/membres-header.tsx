"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserPlus, Download } from "lucide-react"
import { MembreFormModal } from "./membre-form-modal"

export function MembresHeader() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simulation d'export - ici vous pourriez appeler une API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Créer un contenu Excel en HTML
      const excelContent = `
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Pôles</th>
            <th>Statut</th>
            <th>Date d'adhésion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dubois</td>
            <td>Marie</td>
            <td>marie.dubois@email.com</td>
            <td>06 12 34 56 78</td>
            <td>Design, Communication</td>
            <td>Actif</td>
            <td>2023-01-15</td>
          </tr>
          <tr>
            <td>Martin</td>
            <td>Pierre</td>
            <td>pierre.martin@email.com</td>
            <td>06 98 76 54 32</td>
            <td>Développement, Tech</td>
            <td>Actif</td>
            <td>2023-02-20</td>
          </tr>
          <tr>
            <td>Bernard</td>
            <td>Sophie</td>
            <td>sophie.bernard@email.com</td>
            <td>06 11 22 33 44</td>
            <td>Photo, Media</td>
            <td>Actif</td>
            <td>2023-03-10</td>
          </tr>
          <tr>
            <td>Petit</td>
            <td>Lucas</td>
            <td>lucas.petit@email.com</td>
            <td>06 55 66 77 88</td>
            <td>Marketing, Communication</td>
            <td>Inactif</td>
            <td>2023-04-05</td>
          </tr>
        </tbody>
      </table>
    `

      // Créer et télécharger le fichier Excel
      const blob = new Blob([excelContent], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `membres_${new Date().toISOString().split("T")[0]}.xlsx`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log("Export Excel terminé avec succès")
    } catch (error) {
      console.error("Erreur lors de l'export Excel:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCreateMember = () => {
    setShowCreateModal(true)
  }

  const handleSaveMember = (membre: any) => {
    console.log("Nouveau membre créé:", membre)
    // Ici vous pourriez appeler une API pour sauvegarder le membre
    setShowCreateModal(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold">Membres</h1>
              <p className="text-sm text-muted-foreground">Gérez tous les membres de l'organisation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Export en cours..." : "Exporter"}
            </Button>
            <Button size="sm" onClick={handleCreateMember}>
              <UserPlus className="h-4 w-4 mr-2" />
              Nouveau membre
            </Button>
          </div>
        </div>
      </header>

      {/* Modal de création de membre */}
      <MembreFormModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSave={handleSaveMember}
        mode="create"
      />
    </>
  )
}
