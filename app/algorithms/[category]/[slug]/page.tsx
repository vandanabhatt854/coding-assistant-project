'use client'

import { algorithms as sortingAlgorithms, algorithmKeys as sortingKeys } from '@/lib/sortingAlgorithms'
import { algorithms as searchingAlgorithms, algorithmKeys as searchingKeys } from '@/lib/searchingAlgorithms'
import { algorithms as treeAlgorithms, algorithmKeys as treeKeys } from '@/lib/treeAlgorithms'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface DetailPageProps {
  params: {
    category: 'sorting' | 'searching' | 'tree'
    slug: string
  }
}

export default function AlgorithmDetailsPage({ params }: DetailPageProps) {
  const [copied, setCopied] = useState(false)
  const { category, slug } = params

  // Get the algorithm based on category
  let algorithm: any = null
  let allKeys: string[] = []

  if (category === 'sorting') {
    algorithm = sortingAlgorithms[slug as keyof typeof sortingAlgorithms]
    allKeys = sortingKeys
  } else if (category === 'searching') {
    algorithm = searchingAlgorithms[slug as keyof typeof searchingAlgorithms]
    allKeys = searchingKeys
  } else if (category === 'tree') {
    algorithm = treeAlgorithms[slug as keyof typeof treeAlgorithms]
    allKeys = treeKeys
  }

  if (!algorithm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Algorithm not found</h1>
          <Link href="/algorithms">
            <Button>Back to Algorithms</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(algorithm.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currentIndex = allKeys.indexOf(slug)
  const previousKey = currentIndex > 0 ? allKeys[currentIndex - 1] : null
  const nextKey = currentIndex < allKeys.length - 1 ? allKeys[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/algorithms">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Algorithms
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{algorithm.name}</h1>
          <p className="text-muted-foreground mt-2">{algorithm.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Complexity Analysis */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Complexity Analysis</h2>

          {algorithm.timeComplexity && (
            <div>
              <h3 className="font-semibold mb-2">Time Complexity</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {typeof algorithm.timeComplexity === 'string' ? (
                  <div className="text-sm text-muted-foreground">{algorithm.timeComplexity}</div>
                ) : (
                  <>
                    {algorithm.timeComplexity.best && (
                      <div>
                        <div className="text-xs text-muted-foreground">Best</div>
                        <div className="font-mono text-lg">{algorithm.timeComplexity.best}</div>
                      </div>
                    )}
                    {algorithm.timeComplexity.average && (
                      <div>
                        <div className="text-xs text-muted-foreground">Average</div>
                        <div className="font-mono text-lg">{algorithm.timeComplexity.average}</div>
                      </div>
                    )}
                    {algorithm.timeComplexity.worst && (
                      <div>
                        <div className="text-xs text-muted-foreground">Worst</div>
                        <div className="font-mono text-lg">{algorithm.timeComplexity.worst}</div>
                      </div>
                    )}
                    {algorithm.timeComplexity.search && (
                      <div>
                        <div className="text-xs text-muted-foreground">Search</div>
                        <div className="font-mono text-lg">{algorithm.timeComplexity.search}</div>
                      </div>
                    )}
                    {algorithm.timeComplexity.insert && (
                      <div>
                        <div className="text-xs text-muted-foreground">Insert</div>
                        <div className="font-mono text-lg">{algorithm.timeComplexity.insert}</div>
                      </div>
                    )}
                    {algorithm.timeComplexity.delete && (
                      <div>
                        <div className="text-xs text-muted-foreground">Delete</div>
                        <div className="font-mono text-lg">{algorithm.timeComplexity.delete}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Space Complexity</h3>
            <div className="font-mono text-lg">{algorithm.spaceComplexity}</div>
          </div>

          {algorithm.stable !== undefined && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Stable</div>
                <div className="text-sm text-muted-foreground">{algorithm.stable ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-sm font-medium">In-Place</div>
                <div className="text-sm text-muted-foreground">{algorithm.inPlace ? 'Yes' : 'No'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Code Implementation */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Implementation</h2>
            <Button
              onClick={handleCopyCode}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
            <code>{algorithm.code}</code>
          </pre>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {previousKey ? (
            <Link href={`/algorithms/${category}/${previousKey}`}>
              <Button variant="outline">← Previous</Button>
            </Link>
          ) : (
            <div />
          )}
          {nextKey ? (
            <Link href={`/algorithms/${category}/${nextKey}`}>
              <Button variant="outline">Next →</Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
