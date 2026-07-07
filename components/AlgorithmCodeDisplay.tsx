'use client'

import { useState } from 'react'
import { algorithms } from '@/lib/sortingAlgorithms'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface AlgorithmCodeDisplayProps {
  algorithmKey: string
}

export function AlgorithmCodeDisplay({ algorithmKey }: AlgorithmCodeDisplayProps) {
  const [copied, setCopied] = useState(false)
  const algorithm = algorithms[algorithmKey as keyof typeof algorithms]

  if (!algorithm) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(algorithm.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Implementation</h3>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      <div className="bg-slate-950 text-slate-50 rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed">
        <pre>{algorithm.code}</pre>
      </div>
    </div>
  )
}
