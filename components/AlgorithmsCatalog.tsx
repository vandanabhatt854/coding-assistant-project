'use client'

import { algorithms, algorithmKeys } from '@/lib/sortingAlgorithms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AlgorithmsCatalogProps {
  onSelectAlgorithm?: (algorithmKey: string) => void
}

export function AlgorithmsCatalog({ onSelectAlgorithm }: AlgorithmsCatalogProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sorting Algorithms</h1>
        <p className="text-muted-foreground">
          Explore 10 different sorting algorithms with visualizations and complexity analysis
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {algorithmKeys.map(key => {
          const algo = algorithms[key]
          return (
            <Card key={key} className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{algo.name}</CardTitle>
                <CardDescription>{algo.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Time Complexity:</span>
                    <span className="text-muted-foreground">
                      {algo.timeComplexity.average}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Space Complexity:</span>
                    <span className="text-muted-foreground">{algo.spaceComplexity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Stable:</span>
                    <span className="text-muted-foreground">{algo.stable ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">In-Place:</span>
                    <span className="text-muted-foreground">
                      {algo.inPlace ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {onSelectAlgorithm && (
                    <Button
                      onClick={() => onSelectAlgorithm(key)}
                      variant="ghost"
                      className="flex-1 justify-between"
                    >
                      Visualize
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  <Link href={`/algorithms/${key}`} className="flex-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-between"
                    >
                      Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
