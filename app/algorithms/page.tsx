'use client'

import { useState } from 'react'
import { SortingVisualizer } from '@/components/SortingVisualizer'
import { AlgorithmsCatalogAll } from '@/components/AlgorithmsCatalogAll'
import { AlgorithmComparisonAll } from '@/components/AlgorithmComparisonAll'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function AlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Chat
              </Button>
            </Link>
            {!selectedAlgorithm && (
              <Button
                onClick={() => setShowComparison(!showComparison)}
                variant={showComparison ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                {showComparison ? 'View Catalog' : 'Compare All'}
              </Button>
            )}
          </div>
          <h1 className="text-3xl font-bold">Data Structures & Algorithms</h1>
          <p className="text-muted-foreground mt-1">
            Interactive visualizations and complexity analysis of sorting, searching, and tree algorithms
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {selectedAlgorithm && selectedCategory === 'sorting' ? (
          <div className="space-y-6">
            <Button
              onClick={() => {
                setSelectedAlgorithm(null)
                setSelectedCategory(null)
              }}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Algorithms
            </Button>
            <SortingVisualizer algorithmKey={selectedAlgorithm} />
          </div>
        ) : showComparison ? (
          <AlgorithmComparisonAll />
        ) : (
          <AlgorithmsCatalogAll onSelectAlgorithm={(key, category) => {
            setSelectedAlgorithm(key)
            setSelectedCategory(category)
          }} />
        )}
      </div>
    </div>
  )
}
