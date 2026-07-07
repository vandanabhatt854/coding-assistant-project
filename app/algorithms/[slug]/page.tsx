'use client'

import { algorithms, algorithmKeys } from '@/lib/sortingAlgorithms'
import { SortingVisualizer } from '@/components/SortingVisualizer'
import { AlgorithmCodeDisplay } from '@/components/AlgorithmCodeDisplay'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function AlgorithmDetailsPage() {
  const params = useParams()
  const slug = params?.slug as string

  const currentIndex = useMemo(
    () => algorithmKeys.findIndex(key => key === slug),
    [slug]
  )

  const currentAlgo = algorithms[slug as keyof typeof algorithms]
  const prevAlgo = currentIndex > 0 ? algorithmKeys[currentIndex - 1] : null
  const nextAlgo = currentIndex < algorithmKeys.length - 1 ? algorithmKeys[currentIndex + 1] : null

  if (!currentAlgo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Algorithm not found</h1>
          <Link href="/algorithms">
            <Button>Back to Algorithms</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/algorithms">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Algorithms
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">{currentAlgo.name}</h1>
          <p className="text-muted-foreground mt-2">{currentAlgo.description}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Visualizer */}
          <SortingVisualizer algorithmKey={slug} />

          {/* Key Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-card border border-border rounded-lg space-y-4">
              <h2 className="text-xl font-semibold">Time Complexity</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Best Case</p>
                  <p className="text-lg font-mono">{currentAlgo.timeComplexity.best}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Case</p>
                  <p className="text-lg font-mono">{currentAlgo.timeComplexity.average}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Worst Case</p>
                  <p className="text-lg font-mono">{currentAlgo.timeComplexity.worst}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg space-y-4">
              <h2 className="text-xl font-semibold">Characteristics</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Space Complexity</p>
                  <p className="text-lg font-mono">{currentAlgo.spaceComplexity}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Stable</p>
                    <p className="text-lg font-mono">
                      {currentAlgo.stable ? '✓ Yes' : '✗ No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In-Place</p>
                    <p className="text-lg font-mono">
                      {currentAlgo.inPlace ? '✓ Yes' : '✗ No'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Implementation */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <AlgorithmCodeDisplay algorithmKey={slug} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {prevAlgo ? (
              <Link href={`/algorithms/${prevAlgo}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {algorithms[prevAlgo].name}
                </Button>
              </Link>
            ) : (
              <div />
            )}

            <Link href="/algorithms">
              <Button variant="outline">View All</Button>
            </Link>

            {nextAlgo ? (
              <Link href={`/algorithms/${nextAlgo}`}>
                <Button variant="outline" className="gap-2">
                  {algorithms[nextAlgo].name}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
