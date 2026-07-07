import { algorithms } from './sortingAlgorithms'

export interface DetectedAlgorithm {
  found: boolean
  algorithmKey?: string
  algorithmName?: string
  code?: string
  description?: string
}

const algorithmAliases: Record<string, string> = {
  'bubble sort': 'bubbleSort',
  'bubble': 'bubbleSort',
  'selection sort': 'selectionSort',
  'selection': 'selectionSort',
  'insertion sort': 'insertionSort',
  'insertion': 'insertionSort',
  'merge sort': 'mergeSort',
  'merge': 'mergeSort',
  'quick sort': 'quickSort',
  'quicksort': 'quickSort',
  'quick': 'quickSort',
  'heap sort': 'heapSort',
  'heapsort': 'heapSort',
  'heap': 'heapSort',
  'counting sort': 'countingSort',
  'counting': 'countingSort',
  'radix sort': 'radixSort',
  'radix': 'radixSort',
  'bucket sort': 'bucketSort',
  'bucket': 'bucketSort',
  'shell sort': 'shellSort',
  'shell': 'shellSort',
}

export function detectAlgorithm(message: string): DetectedAlgorithm {
  const lowerMessage = message.toLowerCase().trim()

  // Check for direct algorithm name matches
  for (const [alias, key] of Object.entries(algorithmAliases)) {
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
      const algorithm = algorithms[key as keyof typeof algorithms]
      if (algorithm) {
        return {
          found: true,
          algorithmKey: key,
          algorithmName: algorithm.name,
          code: algorithm.code,
          description: algorithm.description,
        }
      }
    }
  }

  return { found: false }
}
