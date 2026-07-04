'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { ChatSession, Message, ServiceType } from '@/lib/types'
import { ChatSidebar } from './ChatSidebar'
import { ChatInput } from './ChatInput'
import { Message as MessageComponent } from './Message'
import { sendMessage } from '@/lib/api-client'

export function ChatInterface() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load sessions from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('chat-sessions')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSessions(
          parsed.map((s: any) => ({
            ...s,
            createdAt: new Date(s.createdAt),
            updatedAt: new Date(s.updatedAt),
            messages: s.messages.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            })),
          }))
        )
        if (parsed.length > 0) {
          setActiveSessionId(parsed[0].id)
        }
      } catch (error) {
        console.error('[v0] Failed to load sessions:', error)
        createNewSession()
      }
    } else {
      // Create first session
      createNewSession()
    }
  }, [])

  const activeSession = sessions.find(s => s.id === activeSessionId)

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chat-sessions', JSON.stringify(sessions))
  }, [sessions])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSession?.messages])

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  function createNewSession() {
    const id = Math.random().toString(36).slice(2, 9)
    const session: ChatSession = {
      id,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSessions(prev => [session, ...prev])
    setActiveSessionId(id)
  }

  function deleteSession(id: string) {
    setSessions(prev => prev.filter(s => s.id !== id))
    if (activeSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id)
      setActiveSessionId(remaining[0]?.id)
    }
  }

  async function handleSendMessage(content: string, service: ServiceType) {
    if (!activeSession) return

    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).slice(2),
      role: 'user',
      type: 'text',
      content,
      timestamp: new Date(),
      service,
    }

    setSessions(prev =>
      prev.map(s =>
        s.id === activeSessionId
          ? {
              ...s,
              messages: [...s.messages, userMessage],
              updatedAt: new Date(),
            }
          : s
      )
    )

    setIsLoading(true)

    try {
      const response = await sendMessage(content, service)

      // Update session title if it's still "New Conversation"
      if (activeSession.title === 'New Conversation') {
        const newTitle = content.slice(0, 50).trim()
        setSessions(prev =>
          prev.map(s =>
            s.id === activeSessionId ? { ...s, title: newTitle } : s
          )
        )
      }

      // Add AI response
      const aiMessage: Message = {
        id: Math.random().toString(36).slice(2),
        role: 'assistant',
        type: response.code ? 'code' : 'text',
        content: response.content,
        code: response.code,
        language: response.language,
        timestamp: new Date(),
        service,
      }

      setSessions(prev =>
        prev.map(s =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, aiMessage],
                updatedAt: new Date(),
              }
            : s
        )
      )
    } catch (error) {
      console.error('[v0] Failed to get response:', error)

      const errorMessage: Message = {
        id: Math.random().toString(36).slice(2),
        role: 'assistant',
        type: 'error',
        content: 'Failed to get response. Please make sure the backend is running.',
        timestamp: new Date(),
      }

      setSessions(prev =>
        prev.map(s =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, errorMessage],
                updatedAt: new Date(),
              }
            : s
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={createNewSession}
        onSelectSession={setActiveSessionId}
        onDeleteSession={deleteSession}
      />

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-border bg-background px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">
            {activeSession?.title || 'Chat'}
          </h1>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto space-y-4 p-6">
          {!activeSession || activeSession.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome to Code Assistant
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Start by selecting a service above and typing your request. 
                  I can generate code, explain it, optimize it, or help debug.
                </p>
              </div>
            </div>
          ) : (
            <>
              {activeSession.messages.map(msg => (
                <MessageComponent key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
