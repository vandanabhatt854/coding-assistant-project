export interface SearchAlgorithm {
  name: string
  description: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  code: string
  algorithm: (arr: number[], target: number) => number
}

// Linear Search
export const linearSearch = (arr: number[], target: number): number => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}

// Binary Search
export const binarySearch = (arr: number[], target: number): number => {
  let left = 0
  let right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}

// Jump Search
export const jumpSearch = (arr: number[], target: number): number => {
  const n = arr.length
  let step = Math.floor(Math.sqrt(n))
  let prev = 0
  
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step
    step += Math.floor(Math.sqrt(n))
    if (prev >= n) return -1
  }
  
  while (arr[prev] < target) {
    prev++
    if (prev === Math.min(step, n)) return -1
  }
  
  if (arr[prev] === target) return prev
  return -1
}

// Interpolation Search
export const interpolationSearch = (arr: number[], target: number): number => {
  let left = 0
  let right = arr.length - 1
  
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    const pos = left + Math.floor((right - left) * (target - arr[left]) / (arr[right] - arr[left]))
    
    if (arr[pos] === target) return pos
    if (arr[pos] < target) left = pos + 1
    else right = pos - 1
  }
  
  return -1
}

// Exponential Search
export const exponentialSearch = (arr: number[], target: number): number => {
  const n = arr.length
  
  if (arr[0] === target) return 0
  
  let i = 1
  while (i < n && arr[i] <= target) {
    i *= 2
  }
  
  let left = Math.floor(i / 2)
  let right = Math.min(i, n - 1)
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  
  return -1
}

export const algorithms: Record<string, SearchAlgorithm> = {
  linearSearch: {
    name: 'Linear Search',
    description: 'A simple search algorithm that checks each element sequentially from start to end until the target is found or the array ends.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i
    }
  }
  return -1
}

// Example usage
const arr = [5, 2, 8, 1, 9, 3]
console.log(linearSearch(arr, 8))  // Output: 2
console.log(linearSearch(arr, 4))  // Output: -1`,
    algorithm: linearSearch,
  },
  binarySearch: {
    name: 'Binary Search',
    description: 'Efficiently searches a sorted array by repeatedly dividing the search space in half. Requires the input array to be sorted.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    code: `function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    
    if (arr[mid] === target) {
      return mid
    }
    
    if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  
  return -1
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13]
console.log(binarySearch(arr, 7))  // Output: 3
console.log(binarySearch(arr, 6))  // Output: -1`,
    algorithm: binarySearch,
  },
  jumpSearch: {
    name: 'Jump Search',
    description: 'Works on sorted arrays by jumping k steps and then linearly searching. Optimal jump size is √n. Faster than linear search but slower than binary search.',
    timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
    spaceComplexity: 'O(1)',
    code: `function jumpSearch(arr, target) {
  const n = arr.length
  const step = Math.floor(Math.sqrt(n))
  let prev = 0
  
  // Jump to find the block where element is present
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step
    step += Math.floor(Math.sqrt(n))
    if (prev >= n) return -1
  }
  
  // Linear search in the block
  while (arr[prev] < target) {
    prev++
    if (prev === Math.min(step, n)) return -1
  }
  
  if (arr[prev] === target) return prev
  return -1
}

// Example usage
const arr = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
console.log(jumpSearch(arr, 13))  // Output: 7
console.log(jumpSearch(arr, 4))   // Output: -1`,
    algorithm: jumpSearch,
  },
  interpolationSearch: {
    name: 'Interpolation Search',
    description: 'Improves binary search by using the value of the target to guess its position. Works best for uniformly distributed sorted arrays.',
    timeComplexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    code: `function interpolationSearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  
  while (
    left <= right &&
    target >= arr[left] &&
    target <= arr[right]
  ) {
    // Estimate position using linear interpolation
    const pos = left + Math.floor(
      (right - left) * (target - arr[left]) / (arr[right] - arr[left])
    )
    
    if (arr[pos] === target) return pos
    
    if (arr[pos] < target) {
      left = pos + 1
    } else {
      right = pos - 1
    }
  }
  
  return -1
}

// Example usage
const arr = [10, 12, 13, 16, 18, 19, 20, 21, 22]
console.log(interpolationSearch(arr, 18))  // Output: 4
console.log(interpolationSearch(arr, 15))  // Output: -1`,
    algorithm: interpolationSearch,
  },
  exponentialSearch: {
    name: 'Exponential Search',
    description: 'Finds the range where the element is present by checking at exponentially increasing indices, then performs binary search.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    code: `function exponentialSearch(arr, target) {
  const n = arr.length
  
  if (arr[0] === target) return 0
  
  // Find the range where element is present
  let i = 1
  while (i < n && arr[i] <= target) {
    i *= 2
  }
  
  // Binary search in the found range
  let left = Math.floor(i / 2)
  let right = Math.min(i, n - 1)
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    
    if (arr[mid] === target) return mid
    
    if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  
  return -1
}

// Example usage
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(exponentialSearch(arr, 6))  // Output: 5
console.log(exponentialSearch(arr, 11)) // Output: -1`,
    algorithm: exponentialSearch,
  },
}

export const algorithmKeys = Object.keys(algorithms) as Array<keyof typeof algorithms>
