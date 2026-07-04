'use client'

import { useRef, useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  code: string
  language?: string
  fileName?: string
}

export function CodeBlock({ code, language = 'javascript', fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('[v0] Failed to copy:', err)
    }
  }

  return (
    <div className="relative my-4 overflow-hidden rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between bg-muted px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">
          {fileName || language}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-7 w-7 p-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Code */}
      <div ref={codeRef} className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          showLineNumbers
          lineNumberStyle={{
            color: '#6e7681',
            paddingRight: '16px',
            minWidth: '40px',
            textAlign: 'right',
          }}
          customStyle={{
            margin: 0,
            padding: '16px',
            backgroundColor: 'transparent',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
          wrapLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
