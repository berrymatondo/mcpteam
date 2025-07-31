"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Calendar, MapPin, Crown, Edit, Trash2, Upload, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import { useState, useRef } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Membre {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  image?: string
  poles: string[]
  statut: "active" | "inactive"
  isResponsable: boolean
  dateAdhesion: string
  adresse?: string
  dateNaissance?: string
  competences?: string[]
  bio?: string
}

interface MembreViewModalProps {
  membre: Membre | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (membre: Membre) => void
  onDelete: (membre: Membre) => void
}

export function MembreViewModal({ membre, open, onOpenChange, onEdit, onDelete }: MembreViewModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditingPhoto, setIsEditingPhoto] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageScale, setImageScale] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setIsEditingPhoto(true)
        setImageScale(1)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePhoto = () => {
    if (canvasRef.current && selectedImage) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          // Set canvas size to desired output size (200x200 for avatar)
          canvas.width = 200
          canvas.height = 200

          // Clear canvas
          ctx.clearRect(0, 0, 200, 200)

          // Calculate dimensions to maintain aspect ratio and fill the square
          const size = Math.min(img.width, img.height) * imageScale
          const sourceX = (img.width - size / imageScale) / 2
          const sourceY = (img.height - size / imageScale) / 2

          // Draw the scaled and cropped image
          ctx.drawImage(img, sourceX, sourceY, size / imageScale, size / imageScale, 0, 0, 200, 200)

          // Convert to blob and save
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob)
                // Here you would typically upload to your server
                // For now, we'll just update the local state
                console.log("Photo saved:", url)
                setIsEditingPhoto(false)
                setSelectedImage(null)
                setImageScale(1)
              }
            },
            "image/jpeg",
            0.9,
          )
        }
        img.src = selectedImage
      }
    }
  }

  const handleCancelPhotoEdit = () => {
    setIsEditingPhoto(false)
    setSelectedImage(null)
    setImageScale(1)
  }

  if (!membre) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profil du Membre</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header avec photo et infos principales */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={membre.image || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {membre.prenom[0]}
                  {membre.nom[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-3 w-3" />
              </Button>
              <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {membre.prenom} {membre.nom}
                </h2>
                {membre.isResponsable && <Crown className="h-5 w-5 text-yellow-500" />}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={membre.statut === "active" ? "default" : "secondary"}>
                  {membre.statut === "active" ? "Actif" : "Inactif"}
                </Badge>
                {membre.isResponsable && (
                  <Badge variant="outline" className="text-yellow-600">
                    Responsable
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Informations de contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Informations de Contact</h3>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{membre.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{membre.telephone}</span>
              </div>
              {membre.adresse && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{membre.adresse}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Pôles */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Pôles</h3>
            <div className="flex flex-wrap gap-2">
              {membre.poles.map((pole) => (
                <Badge key={pole} variant="outline">
                  {pole}
                </Badge>
              ))}
            </div>
          </div>

          {/* Compétences */}
          {membre.competences && membre.competences.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Compétences</h3>
                <div className="flex flex-wrap gap-2">
                  {membre.competences.map((competence) => (
                    <Badge key={competence} variant="secondary">
                      {competence}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Bio */}
          {membre.bio && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Biographie</h3>
                <p className="text-muted-foreground">{membre.bio}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Informations d'adhésion */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Informations d'Adhésion</h3>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Membre depuis le {new Date(membre.dateAdhesion).toLocaleDateString("fr-FR")}</span>
            </div>
            {membre.dateNaissance && (
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Né(e) le {new Date(membre.dateNaissance).toLocaleDateString("fr-FR")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t border-border/40">
          <Button
            variant="outline"
            onClick={() =>
              onEdit({
                ...membre,
                // S'assurer que toutes les propriétés sont présentes pour le pré-remplissage
                adresse: membre.adresse || "",
                dateNaissance: membre.dateNaissance || "",
                competences: membre.competences || [],
                bio: membre.bio || "",
              })
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>

        {/* Photo Editing Modal */}
        {isEditingPhoto && selectedImage && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Redimensionner la photo</h3>

              <div className="relative mb-4">
                <div className="w-64 h-64 mx-auto border-2 border-dashed border-gray-300 overflow-hidden rounded-lg relative bg-gray-50">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transform: `scale(${imageScale})`,
                      transformOrigin: "center",
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Taille de l'image</label>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setImageScale(Math.max(0.5, imageScale - 0.1))}
                      disabled={imageScale <= 0.5}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={imageScale}
                      onChange={(e) => setImageScale(Number.parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setImageScale(Math.min(2, imageScale + 0.1))}
                      disabled={imageScale >= 2}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium min-w-[50px]">{Math.round(imageScale * 100)}%</span>
                  </div>
                </div>

                <Button size="sm" variant="outline" onClick={() => setImageScale(1)} className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={handleCancelPhotoEdit}>
                  Annuler
                </Button>
                <Button onClick={handleSavePhoto}>Sauvegarder</Button>
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer le membre {membre.prenom} {membre.nom} ? Cette action est
                irréversible et supprimera définitivement toutes les données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDelete(membre)
                  setShowDeleteConfirm(false)
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer définitivement
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  )
}
