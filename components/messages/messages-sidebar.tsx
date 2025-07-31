import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const conversations = [
  {
    id: 1,
    nom: "Équipe Design",
    type: "group",
    lastMessage: "Les maquettes sont prêtes pour review",
    timestamp: "14:30",
    unread: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 2,
    nom: "Marie Dubois",
    type: "direct",
    lastMessage: "Parfait, on se voit demain pour la présentation",
    timestamp: "13:45",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 3,
    nom: "Pôle Développement",
    type: "group",
    lastMessage: "Le déploiement est terminé ✅",
    timestamp: "12:20",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 4,
    nom: "Pierre Martin",
    type: "direct",
    lastMessage: "Merci pour ton aide sur le projet",
    timestamp: "11:15",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 5,
    nom: "Communication",
    type: "group",
    lastMessage: "Nouveau post sur les réseaux sociaux",
    timestamp: "10:30",
    unread: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
]

export function MessagesSidebar() {
  return (
    <div className="w-80 border-r border-border/40 bg-muted/20">
      <div className="p-4 border-b border-border/40">
        <h2 className="font-semibold">Conversations</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {conversation.nom
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{conversation.nom}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>

              {conversation.unread > 0 && (
                <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {conversation.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
