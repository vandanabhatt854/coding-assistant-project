'use client'

import { algorithms, algorithmKeys } from '@/lib/sortingAlgorithms'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function AlgorithmReference() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-t border-sidebar-border p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm font-medium text-sidebar-foreground hover:text-sidebar-foreground/80 transition-colors"
      >
        <span>Quick Reference</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
          {algorithmKeys.map(key => {
            const algo = algorithms[key]
            return (
              <div
                key={key}
                className="text-xs p-2 rounded bg-sidebar-accent/20 border border-sidebar-accent/30"
              >
                <div className="font-semibold text-sidebar-foreground">{algo.name}</div>
                <div className="text-sidebar-foreground/70 text-xs mt-1">
                  <div>Avg: {algo.timeComplexity.average}</div>
                  <div>Space: {algo.spaceComplexity}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
