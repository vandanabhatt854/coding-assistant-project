'use client'

import { useState, useEffect } from 'react'
import { algorithms, algorithmKeys } from '@/lib/sortingAlgorithms'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw } from 'lucide-react'
import { AlgorithmCodeDisplay } from './AlgorithmCodeDisplay'

interface SortingVisualizerProps {
  algorithmKey?: string
}

export function SortingVisualizer({ algorithmKey = 'bubbleSort' }: SortingVisualizerProps) {
  const [arraySize, setArraySize] = useState(20)
  const [array, setArray] = useState<number[]>([])
  const [isSorting, setIsSorting] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithmKey)

  useEffect(() => {
    generateRandomArray()
  }, [arraySize])

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    )
    setArray(newArray)
  }

  const handleSort = async () => {
    setIsSorting(true)
    const algorithm = algorithms[selectedAlgorithm as keyof typeof algorithms]
    if (algorithm) {
      const sorted = algorithm.algorithm([...array])
      setArray(sorted)
    }
    setIsSorting(false)
  }

  const maxValue = Math.max(...array, 100)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Algorithm</label>
          <select
            value={selectedAlgorithm}
            onChange={e => setSelectedAlgorithm(e.target.value)}
            disabled={isSorting}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            {algorithmKeys.map(key => (
              <option key={key} value={key}>
                {algorithms[key].name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={e => setArraySize(Number(e.target.value))}
            disabled={isSorting}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSort}
            disabled={isSorting}
            className="flex-1 gap-2"
          >
            <Play className="h-4 w-4" />
            {isSorting ? 'Sorting...' : 'Sort'}
          </Button>
          <Button
            onClick={generateRandomArray}
            disabled={isSorting}
            variant="outline"
            className="flex-1 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-end justify-center gap-1 h-64 bg-background rounded-lg p-4">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="flex-1 bg-primary rounded-sm transition-all"
              style={{
                height: `${(value / maxValue) * 100}%`,
              }}
              title={`${value}`}
            />
          ))}
        </div>
      </div>

      {/* Algorithm Info */}
      {algorithms[selectedAlgorithm as keyof typeof algorithms] && (
        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-lg space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {algorithms[selectedAlgorithm as keyof typeof algorithms].name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {algorithms[selectedAlgorithm as keyof typeof algorithms].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Time Complexity:</span>
                <div className="text-muted-foreground">
                  <div>Best: {algorithms[selectedAlgorithm as keyof typeof algorithms].timeComplexity.best}</div>
                  <div>Avg: {algorithms[selectedAlgorithm as keyof typeof algorithms].timeComplexity.average}</div>
                  <div>Worst: {algorithms[selectedAlgorithm as keyof typeof algorithms].timeComplexity.worst}</div>
                </div>
              </div>
              <div>
                <span className="font-medium">Space Complexity:</span>
                <div className="text-muted-foreground">
                  {algorithms[selectedAlgorithm as keyof typeof algorithms].spaceComplexity}
                </div>
                <span className="font-medium mt-2 block">Properties:</span>
                <div className="text-muted-foreground">
                  <div>Stable: {algorithms[selectedAlgorithm as keyof typeof algorithms].stable ? 'Yes' : 'No'}</div>
                  <div>In-Place: {algorithms[selectedAlgorithm as keyof typeof algorithms].inPlace ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <AlgorithmCodeDisplay algorithmKey={selectedAlgorithm} />
          </div>
        </div>
      )}
    </div>
  )
}
