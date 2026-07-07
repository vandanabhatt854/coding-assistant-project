'use client'

import { algorithms as sortingAlgorithms, algorithmKeys as sortingKeys } from '@/lib/sortingAlgorithms'
import { algorithms as searchingAlgorithms, algorithmKeys as searchingKeys } from '@/lib/searchingAlgorithms'
import { algorithms as treeAlgorithms, algorithmKeys as treeKeys } from '@/lib/treeAlgorithms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AlgorithmsCatalogAllProps {
  onSelectAlgorithm?: (algorithmKey: string, category: string) => void
}

export function AlgorithmsCatalogAll({ onSelectAlgorithm }: AlgorithmsCatalogAllProps) {
  const renderAlgorithmCard = (key: string, algorithm: any, category: string) => (
    <Card key={key} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{algorithm.name}</CardTitle>
        <CardDescription>{algorithm.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm space-y-2">
          {algorithm.timeComplexity && (
            <div>
              <span className="font-medium">Time Complexity:</span>
              <div className="text-muted-foreground ml-2">
                {typeof algorithm.timeComplexity === 'string' ? (
                  <div>{algorithm.timeComplexity}</div>
                ) : (
                  <>
                    {algorithm.timeComplexity.best && <div>Best: {algorithm.timeComplexity.best}</div>}
                    {algorithm.timeComplexity.average && <div>Avg: {algorithm.timeComplexity.average}</div>}
                    {algorithm.timeComplexity.worst && <div>Worst: {algorithm.timeComplexity.worst}</div>}
                    {algorithm.timeComplexity.search && <div>Search: {algorithm.timeComplexity.search}</div>}
                    {algorithm.timeComplexity.insert && <div>Insert: {algorithm.timeComplexity.insert}</div>}
                    {algorithm.timeComplexity.delete && <div>Delete: {algorithm.timeComplexity.delete}</div>}
                  </>
                )}
              </div>
            </div>
          )}
          <div>
            <span className="font-medium">Space Complexity:</span>
            <div className="text-muted-foreground">{algorithm.spaceComplexity}</div>
          </div>
        </div>

        <div className="flex gap-2">
          {onSelectAlgorithm && (
            <Button
              onClick={() => onSelectAlgorithm(key, category)}
              variant="ghost"
              className="flex-1 justify-between"
            >
              Visualize
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <Link href={`/algorithms/${category}/${key}`} className="flex-1">
            <Button variant="ghost" className="w-full justify-between">
              Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Sorting Algorithms */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Sorting Algorithms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortingKeys.map(key => renderAlgorithmCard(key, sortingAlgorithms[key], 'sorting'))}
        </div>
      </section>

      {/* Searching Algorithms */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Searching Algorithms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchingKeys.map(key => renderAlgorithmCard(key, searchingAlgorithms[key], 'searching'))}
        </div>
      </section>

      {/* Tree Algorithms */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Tree Data Structures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {treeKeys.map(key => renderAlgorithmCard(key, treeAlgorithms[key], 'tree'))}
        </div>
      </section>
    </div>
  )
}
