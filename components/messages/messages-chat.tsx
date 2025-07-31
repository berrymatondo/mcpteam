import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile, Phone, Video, MoreHorizontal } from "lucide-react"

const messages = [
  {
    id: 1,
    sender: "Marie Dubois",
    content: "Salut tout le monde ! J'ai terminé les maquettes pour le nouveau projet",
    timestamp: "14:25",
    avatar: "/placeholder.svg?height=32&width=32",
    isMe: false,
  },
  {
    id: 2,
    sender: "Moi",
    content: "Super ! Est-ce que tu peux les partager sur Figma ?",
    timestamp: "14:26",
    avatar: "/placeholder.svg?height=32&width=32",
    isMe: true,
  },
  {
    id: 3,
    sender: "Marie Dubois",
    content: "Bien sûr, je vais créer le lien de partage maintenant",
    timestamp: "14:27",
    avatar: "/placeholder.svg?height=32&width=32",
    isMe: false,
  },
  {
    id: 4,
    sender: "Pierre Martin",
    content: "Parfait, j'ai hâte de voir ça ! On pourra commencer l'intégration dès demain",
    timestamp: "14:28",
    avatar: "/placeholder.svg?height=32&width=32",
    isMe: false,
  },
  {
    id: 5,
    sender: "Marie Dubois",
    content: "Voici le lien : https://figma.com/design/project-2024",
    timestamp: "14:30",
    avatar: "/placeholder.svg?height=32&width=32",
    isMe: false,
  },
]

export function MessagesChat() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>ED</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Équipe Design</h3>
            <p className="text-sm text-muted-foreground">5 membres • 3 en ligne</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.isMe ? "flex-row-reverse" : ""}`}>
              {!message.isMe && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {message.sender
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`flex flex-col ${message.isMe ? "items-end" : ""}`}>
                {!message.isMe && <span className="text-sm font-medium mb-1">{message.sender}</span>}
                <div
                  className={`max-w-md p-3 rounded-lg ${
                    message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border/40">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input placeholder="Tapez votre message..." className="pr-10" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
