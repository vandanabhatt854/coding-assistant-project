import { Message, AIResponse, ServiceType } from './types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function sendMessage(
  message: string,
  service: ServiceType,
  code?: string
): Promise<AIResponse> {
  try {
    // For explain, optimize, debug - use code as the main input
    // For generate - use message as the prompt
    const payload = service === 'generate' 
      ? { prompt: message }
      : { code: code || message }

    console.log('[v0] API Call:', { service, API_BASE, payload })

    const response = await fetch(`${API_BASE}/api/${service}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('[v0] API error:', { status: response.status, data: errorData })
      throw new Error(`API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[v0] API call failed:', error)
    throw error
  }
}

export async function generateCode(prompt: string): Promise<AIResponse> {
  return sendMessage(prompt, 'generate')
}

export async function explainCode(code: string): Promise<AIResponse> {
  return sendMessage('Please explain this code:', 'explain', code)
}

export async function optimizeCode(code: string): Promise<AIResponse> {
  return sendMessage('Please optimize this code:', 'optimize', code)
}

export async function debugCode(code: string, error?: string): Promise<AIResponse> {
  const message = error
    ? `Debug this code (error: ${error}):`
    : 'Please identify and fix any issues in this code:'
  return sendMessage(message, 'debug', code)
}
