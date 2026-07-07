'use client'

import { useState } from 'react'
import { algorithms as sortingAlgorithms, algorithmKeys as sortingKeys } from '@/lib/sortingAlgorithms'
import { algorithms as searchingAlgorithms, algorithmKeys as searchingKeys } from '@/lib/searchingAlgorithms'
import { algorithms as treeAlgorithms, algorithmKeys as treeKeys } from '@/lib/treeAlgorithms'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AlgorithmComparisonAll() {
  const [selectedCategory, setSelectedCategory] = useState<'sorting' | 'searching' | 'tree'>('sorting')

  const getCategoryData = () => {
    switch (selectedCategory) {
      case 'searching':
        return {
          keys: searchingKeys,
          algorithms: searchingAlgorithms,
          title: 'Searching Algorithms Comparison',
        }
      case 'tree':
        return {
          keys: treeKeys,
          algorithms: treeAlgorithms,
          title: 'Tree Data Structures Comparison',
        }
      default:
        return {
          keys: sortingKeys,
          algorithms: sortingAlgorithms,
          title: 'Sorting Algorithms Comparison',
        }
    }
  }

  const data = getCategoryData()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>Compare complexity and characteristics across all algorithms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setSelectedCategory('sorting')}
              variant={selectedCategory === 'sorting' ? 'default' : 'outline'}
              className="flex-1"
            >
              Sorting
            </Button>
            <Button
              onClick={() => setSelectedCategory('searching')}
              variant={selectedCategory === 'searching' ? 'default' : 'outline'}
              className="flex-1"
            >
              Searching
            </Button>
            <Button
              onClick={() => setSelectedCategory('tree')}
              variant={selectedCategory === 'tree' ? 'default' : 'outline'}
              className="flex-1"
            >
              Trees
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Algorithm</TableHead>
                  {selectedCategory === 'sorting' && (
                    <>
                      <TableHead>Best</TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Worst</TableHead>
                      <TableHead>Space</TableHead>
                      <TableHead>Stable</TableHead>
                      <TableHead>In-Place</TableHead>
                    </>
                  )}
                  {selectedCategory === 'searching' && (
                    <>
                      <TableHead>Best</TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Worst</TableHead>
                      <TableHead>Space</TableHead>
                    </>
                  )}
                  {selectedCategory === 'tree' && (
                    <>
                      <TableHead>Search/Insert/Delete</TableHead>
                      <TableHead>Space</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.keys.map(key => {
                  const algorithm = data.algorithms[key]

                  return (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{algorithm.name}</TableCell>
                      {selectedCategory === 'sorting' && (
                        <>
                          <TableCell>{algorithm.timeComplexity.best}</TableCell>
                          <TableCell>{algorithm.timeComplexity.average}</TableCell>
                          <TableCell>{algorithm.timeComplexity.worst}</TableCell>
                          <TableCell>{algorithm.spaceComplexity}</TableCell>
                          <TableCell>{algorithm.stable ? '✓' : '✗'}</TableCell>
                          <TableCell>{algorithm.inPlace ? '✓' : '✗'}</TableCell>
                        </>
                      )}
                      {selectedCategory === 'searching' && (
                        <>
                          <TableCell>{algorithm.timeComplexity.best}</TableCell>
                          <TableCell>{algorithm.timeComplexity.average}</TableCell>
                          <TableCell>{algorithm.timeComplexity.worst}</TableCell>
                          <TableCell>{algorithm.spaceComplexity}</TableCell>
                        </>
                      )}
                      {selectedCategory === 'tree' && (
                        <>
                          <TableCell>
                            {algorithm.timeComplexity.search
                              ? `${algorithm.timeComplexity.search || '—'} / ${algorithm.timeComplexity.insert || '—'} / ${algorithm.timeComplexity.delete || '—'}`
                              : '—'}
                          </TableCell>
                          <TableCell>{algorithm.spaceComplexity}</TableCell>
                        </>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
