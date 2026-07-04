export type MessageRole = 'user' | 'assistant'
export type MessageType = 'text' | 'code' | 'error' | 'success'
export type ServiceType = 'generate' | 'explain' | 'optimize' | 'debug'

export interface Message {
  id: string
  role: MessageRole
  type: MessageType
  content: string
  code?: string
  language?: string
  timestamp: Date
  service?: ServiceType
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface CodeBlock {
  language: string
  code: string
  lineNumbers?: boolean
}

export interface AIResponse {
  content: string
  code?: string
  language?: string
  explanation?: string
}
