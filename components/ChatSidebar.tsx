'use client'

import { ChatSession } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, MessageSquare } from 'lucide-react'

interface ChatSidebarProps {
  sessions: ChatSession[]
  activeSessionId?: string
  onNewChat: () => void
  onSelectSession: (id: string) => void
  onDeleteSession: (id: string) => void
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}: ChatSidebarProps) {
  return (
    <div className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar">
      {/* Header */}
      <div className="border-b border-sidebar-border p-4">
        <Button
          onClick={onNewChat}
          className="w-full gap-2"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="p-4 text-center text-sm text-sidebar-foreground/60">
            <p>No conversations yet</p>
          </div>
        ) : (
          <div className="space-y-2 p-3">
            {sessions.map(session => (
              <div
                key={session.id}
                className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeSessionId === session.id
                    ? 'bg-sidebar-accent text-sidebar-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
                }`}
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <button
                  onClick={() => onSelectSession(session.id)}
                  className="flex-1 truncate text-left"
                  title={session.title}
                >
                  {session.title}
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteSession(session.id)}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 text-xs text-sidebar-foreground/60">
        <p>v0 Coding Assistant</p>
        <p className="mt-1">Powered by AI</p>
      </div>
    </div>
  )
}
