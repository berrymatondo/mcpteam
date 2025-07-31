import { MessagesHeader } from "@/components/messages/messages-header"
import { MessagesSidebar } from "@/components/messages/messages-sidebar"
import { MessagesChat } from "@/components/messages/messages-chat"

export default function MessagesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MessagesHeader />
      <div className="flex-1 flex overflow-hidden">
        <MessagesSidebar />
        <MessagesChat />
      </div>
    </div>
  )
}
