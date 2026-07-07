import { algorithms as sortingAlgorithms } from './sortingAlgorithms'
import { algorithms as searchingAlgorithms } from './searchingAlgorithms'
import { algorithms as treeAlgorithms } from './treeAlgorithms'

export interface DetectedAlgorithm {
  found: boolean
  algorithmKey?: string
  algorithmName?: string
  category?: 'sorting' | 'searching' | 'tree'
  code?: string
  description?: string
}

const algorithmAliases: Record<string, { key: string; category: 'sorting' | 'searching' | 'tree' }> = {
  // Sorting Algorithms
  'bubble sort': { key: 'bubbleSort', category: 'sorting' },
  'bubble': { key: 'bubbleSort', category: 'sorting' },
  'selection sort': { key: 'selectionSort', category: 'sorting' },
  'selection': { key: 'selectionSort', category: 'sorting' },
  'insertion sort': { key: 'insertionSort', category: 'sorting' },
  'insertion': { key: 'insertionSort', category: 'sorting' },
  'merge sort': { key: 'mergeSort', category: 'sorting' },
  'merge': { key: 'mergeSort', category: 'sorting' },
  'quick sort': { key: 'quickSort', category: 'sorting' },
  'quicksort': { key: 'quickSort', category: 'sorting' },
  'quick': { key: 'quickSort', category: 'sorting' },
  'heap sort': { key: 'heapSort', category: 'sorting' },
  'heapsort': { key: 'heapSort', category: 'sorting' },
  'heap': { key: 'heapSort', category: 'sorting' },
  'counting sort': { key: 'countingSort', category: 'sorting' },
  'counting': { key: 'countingSort', category: 'sorting' },
  'radix sort': { key: 'radixSort', category: 'sorting' },
  'radix': { key: 'radixSort', category: 'sorting' },
  'bucket sort': { key: 'bucketSort', category: 'sorting' },
  'bucket': { key: 'bucketSort', category: 'sorting' },
  'shell sort': { key: 'shellSort', category: 'sorting' },
  'shell': { key: 'shellSort', category: 'sorting' },
  
  // Searching Algorithms
  'linear search': { key: 'linearSearch', category: 'searching' },
  'linear': { key: 'linearSearch', category: 'searching' },
  'binary search': { key: 'binarySearch', category: 'searching' },
  'binary': { key: 'binarySearch', category: 'searching' },
  'jump search': { key: 'jumpSearch', category: 'searching' },
  'jump': { key: 'jumpSearch', category: 'searching' },
  'interpolation search': { key: 'interpolationSearch', category: 'searching' },
  'interpolation': { key: 'interpolationSearch', category: 'searching' },
  'exponential search': { key: 'exponentialSearch', category: 'searching' },
  'exponential': { key: 'exponentialSearch', category: 'searching' },
  
  // Tree Algorithms
  'binary tree': { key: 'binaryTree', category: 'tree' },
  'binary tree traversal': { key: 'binaryTree', category: 'tree' },
  'bst': { key: 'bst', category: 'tree' },
  'binary search tree': { key: 'bst', category: 'tree' },
  'avl tree': { key: 'avlTree', category: 'tree' },
  'avl': { key: 'avlTree', category: 'tree' },
  'segment tree': { key: 'segmentTree', category: 'tree' },
  'segment': { key: 'segmentTree', category: 'tree' },
  'fenwick tree': { key: 'fenwickTree', category: 'tree' },
  'fenwick': { key: 'fenwickTree', category: 'tree' },
  'binary indexed tree': { key: 'fenwickTree', category: 'tree' },
  'bit': { key: 'fenwickTree', category: 'tree' },
  'trie': { key: 'trie', category: 'tree' },
  'prefix tree': { key: 'trie', category: 'tree' },
}

export function detectAlgorithm(message: string): DetectedAlgorithm {
  const lowerMessage = message.toLowerCase().trim()

  // Check for direct algorithm name matches
  for (const [alias, { key, category }] of Object.entries(algorithmAliases)) {
    if (
      lowerMessage === alias ||
      lowerMessage.includes(`code of ${alias}`) ||
      lowerMessage.includes(`${alias} code`) ||
      lowerMessage.includes(`show me ${alias}`) ||
      lowerMessage.includes(`what is ${alias}`) ||
      lowerMessage.includes(`how to ${alias}`) ||
      lowerMessage.includes(`${alias}?`) ||
      lowerMessage === key
    ) {
      let algorithm: any
      
      if (category === 'sorting') {
        algorithm = sortingAlgorithms[key as keyof typeof sortingAlgorithms]
      } else if (category === 'searching') {
        algorithm = searchingAlgorithms[key as keyof typeof searchingAlgorithms]
      } else if (category === 'tree') {
        algorithm = treeAlgorithms[key as keyof typeof treeAlgorithms]
      }
      
      if (algorithm) {
        return {
          found: true,
          algorithmKey: key,
          algorithmName: algorithm.name,
          category,
          code: algorithm.code,
          description: algorithm.description,
        }
      }
    }
  }

  return { found: false }
}
