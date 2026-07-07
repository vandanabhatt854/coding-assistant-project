'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ServiceType } from '@/lib/types'
import { Send, Zap, BookOpen, Gauge, Bug, Search } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string, service: ServiceType) => void
  onCodeInput?: (code: string) => void
  isLoading?: boolean
}

const services: { type: ServiceType; label: string; icon: React.ReactNode }[] = [
  { type: 'generate', label: 'Generate', icon: <Zap className="h-4 w-4" /> },
  { type: 'explain', label: 'Explain', icon: <BookOpen className="h-4 w-4" /> },
  { type: 'optimize', label: 'Optimize', icon: <Gauge className="h-4 w-4" /> },
  { type: 'debug', label: 'Debug', icon: <Bug className="h-4 w-4" /> },
  { type: 'generate', label: 'Algorithms', icon: <Search className="h-4 w-4" />, isAlgorithm: true },
]

export function ChatInput({
  onSendMessage,
  onCodeInput,
  isLoading = false,
}: ChatInputProps) {
  const [input, setInput] = useState('')
  const [selectedService, setSelectedService] = useState<ServiceType>('generate')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input, selectedService)
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="border-t border-border bg-background p-4">
      {/* Service selector */}
      <div className="mb-3 flex gap-2">
        {services.map(service => (
          <Button
            key={service.type}
            size="sm"
            variant={selectedService === service.type ? 'default' : 'outline'}
            onClick={() => setSelectedService(service.type)}
            className="gap-2"
            disabled={isLoading}
          >
            {service.icon}
            {service.label}
          </Button>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedService === 'generate' && services.some(s => (s as any).isAlgorithm && s.type === 'generate') ? "Try: bubble sort, quick sort, merge sort..." : "Ask a question or paste code..."}
          disabled={isLoading}
          className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          rows={1}
        />
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          size="sm"
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          {isLoading ? 'Processing...' : 'Send'}
        </Button>
      </form>
    </div>
  )
}
