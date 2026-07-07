'use client'

import { algorithms, algorithmKeys } from '@/lib/sortingAlgorithms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AlgorithmComparison() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Algorithm Comparison</h2>
        <p className="text-muted-foreground">
          Compare time complexity, space complexity, and characteristics of all sorting algorithms
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complexity Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Best</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Worst</TableHead>
                  <TableHead>Space</TableHead>
                  <TableHead>Stable</TableHead>
                  <TableHead>In-Place</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {algorithmKeys.map(key => {
                  const algo = algorithms[key]
                  return (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{algo.name}</TableCell>
                      <TableCell>{algo.timeComplexity.best}</TableCell>
                      <TableCell>{algo.timeComplexity.average}</TableCell>
                      <TableCell>{algo.timeComplexity.worst}</TableCell>
                      <TableCell>{algo.spaceComplexity}</TableCell>
                      <TableCell>{algo.stable ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{algo.inPlace ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Algorithm Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Simple Sorts (O(n²) average)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Good for small datasets or nearly sorted data:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Bubble Sort - Simple but inefficient</li>
              <li>Selection Sort - Predictable performance</li>
              <li>Insertion Sort - Efficient for small or nearly sorted arrays</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Efficient Sorts (O(n log n))</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Best for large datasets:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Merge Sort - Stable, guaranteed O(n log n)</li>
              <li>Quick Sort - Average case O(n log n), very practical</li>
              <li>Heap Sort - O(n log n) guaranteed, in-place</li>
              <li>Shell Sort - Optimized insertion sort with gap sequence</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Specialized Sorts</h3>
            <p className="text-sm text-muted-foreground mb-2">
              For specific data types or distributions:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Counting Sort - O(n + k) for non-negative integers</li>
              <li>Radix Sort - O(nk) for multi-digit numbers</li>
              <li>Bucket Sort - O(n + k) average, good for uniform distributions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
